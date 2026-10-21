import { NextResponse } from 'next/server';

export async function GET() {
  const apiBase = (process.env.GSTD_API_URL || 'https://app.gstdtoken.com/api/v1').replace(/\/+$/, '');
  const healthUrl = apiBase.endsWith('/api/v1') ? `${apiBase}/health` : `${apiBase}/api/v1/health`;

  try {
    const response = await fetch(healthUrl, { signal: AbortSignal.timeout(3000) });
    if (!response.ok) {
      console.warn(`[health] platform readiness check failed with HTTP ${response.status}`);
      return NextResponse.json(
        { ok: false, ready: false, checks: { platform: 'unavailable' }, timestamp: new Date().toISOString() },
        { status: 503 },
      );
    }

    const health = await response.json() as { ok?: boolean; status?: string; kv?: string };
    const platformOk = health.ok === true || health.status === 'ok';
    const ready = platformOk && health.kv === 'ok';
    return NextResponse.json(
      {
        ok: ready,
        ready,
        checks: { platform: platformOk ? 'ok' : 'unavailable', kv: health.kv || 'unknown' },
        timestamp: new Date().toISOString(),
      },
      { status: ready ? 200 : 503 },
    );
  } catch (error) {
    console.error('[health] platform readiness check failed', error);
    return NextResponse.json(
      { ok: false, ready: false, checks: { platform: 'unavailable' }, timestamp: new Date().toISOString() },
      { status: 503 },
    );
  }
}
