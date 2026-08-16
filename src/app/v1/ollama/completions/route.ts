import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

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

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: { message: 'Invalid JSON body', type: 'invalid_request' } }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: { message: 'messages array required', type: 'invalid_request' } }, { status: 400 });
  }

  try {
    const { env } = await getCloudflareContext({ async: true });
    const ai = (env as any).AI;
    if (!ai) {
      return NextResponse.json({ error: { message: 'AI binding not configured', type: 'internal_error' } }, { status: 503 });
    }

    for (const model of WORKERS_AI_MODELS) {
      try {
        const result = await ai.run(model, { messages, max_tokens: body.max_tokens || 512 });
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
