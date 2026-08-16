import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

// Proxies chat requests directly to a live GSTD node, bypassing
// app.gstdtoken.com entirely. gstdtoken.com runs on Cloudflare Workers,
// independent of the Vercel account that hosts app.gstdtoken.com -- so
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
const NODE_TIMEOUT_MS = 20_000;
const SEED_FETCH_TIMEOUT_MS = 5_000;

async function getSeedNodeUrls(): Promise<string[]> {
  try {
    const resp = await fetch(`${SEED_PEERS_URL}?t=${Math.floor(Date.now() / 60000)}`, {
      signal: AbortSignal.timeout(SEED_FETCH_TIMEOUT_MS),
    });
    if (!resp.ok) return [];
    const text = await resp.text();
    return text
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.startsWith('http'));
  } catch {
    return [];
  }
}

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const seeds = await getSeedNodeUrls();
  if (seeds.length === 0) {
    return NextResponse.json(
      {
        error: 'no_nodes_available',
        message: 'No GSTD nodes are currently reachable. The network needs at least one node operator online -- see /nodes to run one.',
      },
      { status: 503 },
    );
  }

  const errors: string[] = [];
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
      const data = await resp.json();
      return NextResponse.json({ ...data, _servedBy: nodeUrl });
    } catch (e) {
      errors.push(`${nodeUrl}: ${e instanceof Error ? e.message : 'unreachable'}`);
    }
  }

  // Every known seed failed -- try the Workers AI fallback before giving up.
  // Streaming only: node-served responses above are already fast/local-ish
  // relative to a browser round trip and JSON is simpler to keep correct
  // there; this is the path actually active right now (all seeds offline),
  // so it's the one worth the token-by-token UX.
  const wantsStream = body.stream === true;
  try {
    const { env } = await getCloudflareContext({ async: true });
    const ai = (env as any).AI;
    if (ai) {
      for (const model of WORKERS_AI_MODELS) {
        try {
          if (wantsStream) {
            const stream = await ai.run(model, { messages: body.messages, stream: true });
            return new Response(stream as ReadableStream, {
              headers: { 'content-type': 'text/event-stream', 'x-served-by': 'fallback (no node online)', 'x-model': model },
            });
          }
          const result = await ai.run(model, { messages: body.messages });
          if (result?.response) {
            return NextResponse.json({
              id: `chatcmpl-fallback-${Date.now()}`,
              object: 'chat.completion',
              created: Math.floor(Date.now() / 1000),
              model,
              choices: [{ index: 0, message: { role: 'assistant', content: result.response }, finish_reason: 'stop' }],
              _servedBy: 'fallback (no node online)',
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
      message: 'All known GSTD nodes are currently offline. Try again shortly, or run a node yourself at /nodes.',
      attempted: errors,
    },
    { status: 503 },
  );
}
