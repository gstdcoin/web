const STATS_URL = 'https://app.gstdtoken.com/api/v1/network/stats';

function counter(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
}

export async function GET() {
  const unavailable = () => Response.json({ error: 'network_stats_unavailable' }, {
    status: 503,
    headers: { 'Cache-Control': 'no-store' },
  });

  try {
    const upstream = await fetch(STATS_URL, {
      headers: { Accept: 'application/json' },
      redirect: 'error',
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 60 },
    });
    if (!upstream.ok) return unavailable();

    const { active_workers, total_nodes, tasks_completed, total_users, total_gstd_paid } = await upstream.json();
    if (!counter(active_workers) || !counter(total_nodes) || !counter(tasks_completed) || !counter(total_users) ||
        typeof total_gstd_paid !== 'number' || !Number.isFinite(total_gstd_paid) || total_gstd_paid < 0) {
      return unavailable();
    }

    return Response.json({ active_workers, total_nodes, tasks_completed, total_users, total_earned_gstd: total_gstd_paid }, {
      headers: { 'Cache-Control': 'public, max-age=30, s-maxage=60' },
    });
  } catch {
    return unavailable();
  }
}
