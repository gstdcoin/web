import { NextResponse } from 'next/server';

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

  // Every known seed failed -- be honest about it rather than faking a reply.
  return NextResponse.json(
    {
      error: 'all_nodes_unreachable',
      message: 'All known GSTD nodes are currently offline. Try again shortly, or run a node yourself at /nodes.',
      attempted: errors,
    },
    { status: 503 },
  );
}
