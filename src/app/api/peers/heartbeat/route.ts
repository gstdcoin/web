import { NextResponse } from 'next/server';

/** A website is not a compute node. Never acknowledge a heartbeat that would
 * make peers select this site as an available inference executor. */
export async function POST() {
  return NextResponse.json({ error: {
    code: 'website_is_not_compute_peer',
    message: 'This website does not participate as a compute peer. Discover live nodes through the platform registry.',
  } }, { status: 410, headers: { 'Cache-Control': 'no-store' } });
}
