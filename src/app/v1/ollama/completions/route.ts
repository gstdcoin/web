import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import {
  allowChatRequest,
  readJsonBody,
  validateChatBody,
  type RateLimiterBinding,
} from '@/lib/chat-request-guard';

// This makes gstdtoken.com a real peer in the node network's own protocol --
// not a special-cased fallback bolted onto a proxy. gstdbot's own
// src/p2p/peers.ts (forwardToPeer) POSTs exactly this shape to exactly this
// path on any peer it knows about: { model, messages, stream, max_tokens,
// temperature } -> { choices: [{ message: { content } }], model, usage }.
// Any real gstdbot node that has this URL in its known peers (see
// gstd-seed-peers.txt) can route inference requests here through the SAME
// mechanism it uses to route to any other node -- no special integration on
// the node side needed. Backed by Cloudflare Workers AI, same account
// already hosting this Worker.
//
// This is the same pattern real P2P networks use for bootstrap/seed nodes
// (e.g. IPFS's Protocol-Labs-run bootstrap peers): an always-on node that
// keeps the network reachable while remaining architecturally open for
// anyone else to also run one -- not a replacement for that, a floor
// under it.
const WORKERS_AI_MODELS = [
  '@cf/meta/llama-3.2-3b-instruct',
  '@cf/meta/llama-3.1-8b-instruct',
  '@cf/mistralai/mistral-small-3.1-24b-instruct',
];

type ChatEnvironment = {
  AI?: { run(model: string, input: Record<string, unknown>): Promise<any> };
  CHAT_RATE_LIMITER?: RateLimiterBinding;
};

export async function POST(req: Request) {
  let env: ChatEnvironment;
  try {
    const context = await getCloudflareContext({ async: true });
    env = context.env as ChatEnvironment;
  } catch (e) {
    console.error('[ollama/completions] Cloudflare context unavailable', e);
    return NextResponse.json({ error: { message: 'Inference service unavailable', type: 'internal_error' } }, { status: 503 });
  }
  if (process.env.NODE_ENV === 'production' && !env.CHAT_RATE_LIMITER) {
    console.error('[ollama/completions] required Cloudflare rate limiter binding is unavailable');
    return NextResponse.json({ error: { message: 'Rate limiting unavailable', type: 'internal_error' } }, { status: 503 });
  }

  try {
    if (!(await allowChatRequest(req, env.CHAT_RATE_LIMITER))) {
      return NextResponse.json({ error: { message: 'Rate limit exceeded', type: 'rate_limit' } }, { status: 429 });
    }
  } catch (e) {
    console.error('[ollama/completions] Rate limiter failed', e);
    return NextResponse.json({ error: { message: 'Rate limiting unavailable', type: 'internal_error' } }, { status: 503 });
  }

  const parsed = await readJsonBody(req);
  if (parsed.status) {
    const message = parsed.status === 413 ? 'Request body too large' : 'Invalid JSON body';
    return NextResponse.json({ error: { message, type: 'invalid_request' } }, { status: parsed.status });
  }
  const body = validateChatBody(parsed.body);
  if (!body) {
    return NextResponse.json({ error: { message: 'Invalid chat request', type: 'invalid_request' } }, { status: 400 });
  }
  if (body.stream) {
    return NextResponse.json({ error: { message: 'Streaming is not supported by this endpoint', type: 'invalid_request' } }, { status: 400 });
  }

  try {
    const ai = env.AI;
    if (!ai) {
      return NextResponse.json({ error: { message: 'AI binding not configured', type: 'internal_error' } }, { status: 503 });
    }

    for (const model of WORKERS_AI_MODELS) {
      try {
        const result = await ai.run(model, {
          messages: body.messages,
          max_tokens: body.max_tokens ?? 512,
          ...(body.temperature === undefined ? {} : { temperature: body.temperature }),
        });
        if (result?.response) {
          return NextResponse.json({
            id: `chatcmpl-${Date.now()}`,
            object: 'chat.completion',
            created: Math.floor(Date.now() / 1000),
            model,
            choices: [{ index: 0, message: { role: 'assistant', content: result.response }, finish_reason: 'stop' }],
            usage: { completion_tokens: result.usage?.completion_tokens || 0 },
          });
        }
      } catch {
        // try the next model
      }
    }
    return NextResponse.json({ error: { message: 'All Workers AI models unavailable', type: 'internal_error' } }, { status: 503 });
  } catch (e) {
    return NextResponse.json(
      { error: { message: e instanceof Error ? e.message : 'internal error', type: 'internal_error' } },
      { status: 500 },
    );
  }
}
