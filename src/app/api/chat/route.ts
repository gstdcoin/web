import { NextResponse } from 'next/server';
import { registeredNodeUrls } from '@/lib/node-discovery';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import {
  allowChatRequest,
  readJsonBody,
  validateChatBody,
  type RateLimiterBinding,
} from '@/lib/chat-request-guard';

// Proxies chat requests directly to a live GSTD node, bypassing
// app.gstdtoken.com entirely. gstdtoken.com runs on Cloudflare Workers,
// independent of the Cloudflare deployment that hosts app.gstdtoken.com -- so
// this keeps working even during a platform-side outage there.
//
// Seed source is the same GitHub-raw peer list gstdbot's own
// src/p2p/peers.ts already bootstraps from (not app.gstdtoken.com), kept
// in sync with that file's SEED_PEERS_URL. A node's own peer-gossip mesh
// (see peers.ts) is the real source of truth once you're inside the
// network; this is just how a browser, which isn't part of that mesh,
// finds a first node to talk to.
//
// A P2P network with zero volunteer nodes online can't serve anyone --
// that's a real gap no amount of proxy code fixes by itself. So if every
// seed node is unreachable, this falls back to Cloudflare Workers AI
// (same account already hosting this Worker, no new vendor/credentials).
// Real nodes are always tried first and preferred -- this fallback exists
// so "talk to the network" is never just dead air waiting for a volunteer
// to come online, not to replace node-served inference as the intended
// path.
// Cloudflare deprecates Workers AI model IDs fairly often (already hit once:
// llama-3.1-8b-instruct-fast turned out to alias a deprecated backend despite
// docs listing it as current). Try a short list in order instead of betting
// on one ID staying valid.
const WORKERS_AI_MODELS = [
  '@cf/meta/llama-3.2-3b-instruct',
  '@cf/meta/llama-3.1-8b-instruct',
  '@cf/mistralai/mistral-small-3.1-24b-instruct',
];
const SEED_PEERS_URL =
  'https://raw.githubusercontent.com/gstdcoin/ai/main/gstd-seed-peers.txt';
const NODE_TIMEOUT_MS = 60_000;
const SEED_FETCH_TIMEOUT_MS = 5_000;

type ChatEnvironment = {
  AI?: { run(model: string, input: Record<string, unknown>): Promise<any> };
  CHAT_RATE_LIMITER?: RateLimiterBinding;
};

function normalizeSeedUrl(raw: string, allowedHosts: Set<string>): string | null {
  try {
    const url = new URL(raw);
    const host = url.hostname.toLowerCase();
    if (url.protocol !== 'https:' || url.username || url.password
      || (url.port !== '' && url.port !== '443')
      || !allowedHosts.has(host)
      || host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local')
      || host.endsWith('.internal') || /^\d{1,3}(?:\.\d{1,3}){3}$/.test(host) || host.includes(':')) {
      return null;
    }
    return url.toString().replace(/\/$/, '');
  } catch {
    return null;
  }
}

async function getSeedNodeUrls(): Promise<string[]> {
  const allowedHosts = new Set(
    (process.env.GSTD_SEED_HOSTS || '')
      .split(',')
      .map((host) => host.trim().toLowerCase())
      .filter(Boolean),
  );
  const trustedIds = new Set((process.env.GSTD_TRUSTED_NODE_IDS || '')
    .split(',').map(id => id.trim()).filter(Boolean));
  const registered = await registeredNodeUrls(trustedIds, allowedHosts);
  if (registered.length > 0) return registered;
  if (allowedHosts.size === 0) return [];

  try {
    const resp = await fetch(`${SEED_PEERS_URL}?t=${Math.floor(Date.now() / 60000)}`, {
      signal: AbortSignal.timeout(SEED_FETCH_TIMEOUT_MS),
    });
    if (!resp.ok) {
      console.warn(`[chat] seed list request failed with HTTP ${resp.status}`);
      return [];
    }
    const text = await resp.text();
    return text
      .split('\n')
      .map((s) => s.trim())
      .map((s) => normalizeSeedUrl(s, allowedHosts))
      .filter((url): url is string => !!url);
  } catch (error) {
    console.warn('[chat] seed list request failed', error);
    return [];
  }
}

export async function POST(req: Request) {
  let chatEnv: ChatEnvironment = {};
  let contextError = '';
  try {
    const { env } = await getCloudflareContext({ async: true });
    chatEnv = env as ChatEnvironment;
  } catch (error) {
    contextError = error instanceof Error ? error.message : 'Cloudflare context unavailable';
    console.warn('[chat] Cloudflare context unavailable', error);
  }
  if (process.env.NODE_ENV === 'production' && !chatEnv.CHAT_RATE_LIMITER) {
    console.error('[chat] required Cloudflare rate limiter binding is unavailable', contextError);
    return NextResponse.json({ error: 'Chat rate limiter unavailable' }, { status: 503 });
  }
  try {
    if (!(await allowChatRequest(req, chatEnv.CHAT_RATE_LIMITER))) {
      return NextResponse.json({ error: 'Chat rate limit exceeded' }, { status: 429 });
    }
  } catch (error) {
    console.error('[chat] rate limiter failed', error);
    return NextResponse.json({ error: 'Rate limiting unavailable' }, { status: 503 });
  }

  const parsed = await readJsonBody(req);
  if (parsed.status) {
    return NextResponse.json(
      { error: parsed.status === 413 ? 'Request body too large' : 'Invalid JSON body' },
      { status: parsed.status },
    );
  }
  const body = validateChatBody(parsed.body);
  if (!body) {
    return NextResponse.json({ error: 'Invalid chat request' }, { status: 400 });
  }

  const seeds = await getSeedNodeUrls();
  const errors: string[] = contextError ? [`Cloudflare context: ${contextError}`] : [];
  if (seeds.length === 0) errors.push('no allowed seed nodes configured or reachable');
  for (const nodeUrl of seeds) {
    try {
      const resp = await fetch(`${nodeUrl.replace(/\/$/, '')}/v1/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(NODE_TIMEOUT_MS),
      });
      if (!resp.ok) {
        errors.push(`${nodeUrl}: HTTP ${resp.status}`);
        continue;
      }
      // gstdbot's own /v1/chat/completions honors `stream` and returns real
      // SSE (see gstdbot-full/src/gateway/server.ts) -- pass it straight
      // through rather than trying to json-parse a streaming body.
      if (resp.headers.get('content-type')?.includes('text/event-stream')) {
        return new Response(resp.body, {
          headers: { 'content-type': 'text/event-stream', 'x-served-by': nodeUrl },
        });
      }
      const data = await resp.json();
      return NextResponse.json({ ...data, _servedBy: nodeUrl });
    } catch (e) {
      errors.push(`${nodeUrl}: ${e instanceof Error ? e.message : 'unreachable'}`);
    }
  }

  // Every known seed failed -- try the Workers AI fallback before giving up.
  // Streaming only: node-served responses above are already fast/local-ish
  // relative to a browser round trip and JSON is simpler to keep correct
  // there; Cloudflare AI remains an explicitly identified fallback
  // and is explicitly identified as Cloudflare AI in response metadata.
  if ((parsed.body as Record<string,unknown>).allow_cloud_fallback !== true) {
    return NextResponse.json({error:'node_unavailable',message:'No node answered. Cloudflare AI fallback requires your explicit consent.'},{status:503});
  }
  const wantsStream = body.stream === true;
  try {
    const ai = chatEnv.AI;
    if (ai) {
      const fallbackInput = {
          messages: body.messages,
          max_tokens: body.max_tokens ?? 512,
          ...(body.temperature === undefined ? {} : { temperature: body.temperature }),
      };
      for (const model of WORKERS_AI_MODELS) {
          try {
          if (wantsStream) {
              const stream = await ai.run(model, { ...fallbackInput, stream: true });
              return new Response(stream as ReadableStream, {
                headers: { 'content-type': 'text/event-stream', 'x-served-by': 'cloudflare-workers-ai', 'x-model': model },
              });
            }
            const result = await ai.run(model, fallbackInput);
          if (result?.response) {
            return NextResponse.json({
              id: `chatcmpl-fallback-${Date.now()}`,
              object: 'chat.completion',
              created: Math.floor(Date.now() / 1000),
              model,
              choices: [{ index: 0, message: { role: 'assistant', content: result.response }, finish_reason: 'stop' }],
              _servedBy: 'cloudflare-workers-ai',
            });
          }
        } catch (e) {
          errors.push(`workers-ai ${model}: ${e instanceof Error ? e.message : 'failed'}`);
        }
      }
    }
  } catch (e) {
    errors.push(`workers-ai fallback: ${e instanceof Error ? e.message : 'failed'}`);
  }

  // Fallback unavailable too -- be honest about it rather than faking a reply.
  return NextResponse.json(
    {
      error: 'all_nodes_unreachable',
      message: 'Node routing and the Cloudflare AI fallback are currently unavailable. Try again shortly.',
      attempted: errors,
    },
    { status: 503 },
  );
}
