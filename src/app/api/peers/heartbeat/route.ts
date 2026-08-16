import { NextResponse } from 'next/server';

// gstdbot's own src/p2p/peers.ts (sendHeartbeatTo) proactively POSTs a
// heartbeat to every known peer, including seeds, and marks a peer "alive"
// (lastSeen = now) purely on getting a response here -- it doesn't need us
// to gossip back a real peer table for gstdtoken.com to become selectable
// by getBestPeer()/forwardToPeer() afterwards. We don't maintain node
// state (this Worker is stateless per-request), so this just acks; the
// real capability lives at /v1/ollama/completions.
export async function POST() {
  return NextResponse.json({ ok: true, peers: [] });
}
