import { NextResponse } from 'next/server';

/** Retired cloud-backed peer shim. A network model request must not silently
 * become corporate inference. The demo supports explicit consent at /api/chat. */
export async function POST() {
  return NextResponse.json({ error: {
    code: 'legacy_cloud_peer_retired',
    message: 'This endpoint is retired. Use /api/chat; Cloudflare AI requires explicit consent and auto model selection.',
  } }, { status: 410, headers: { 'Cache-Control': 'no-store' } });
}
