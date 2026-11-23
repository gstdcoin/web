import { pathToFileURL } from 'node:url';

// Exercise the same URL and counter contract used by LiveNetworkStatus.
export async function checkNetworkStats(baseUrl, request = fetch) {
  const response = await request(new URL('/api/network/stats', baseUrl), {
    headers: { Accept: 'application/json' },
    redirect: 'manual',
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Network statistics returned HTTP ${response.status}`);
  const stats = await response.json();
  if (!stats || ![stats.active_workers, stats.total_nodes, stats.tasks_completed, stats.total_users]
    .every(value => typeof value === 'number' && Number.isSafeInteger(value) && value >= 0) ||
    typeof stats.total_earned_gstd !== 'number' || !Number.isFinite(stats.total_earned_gstd) || stats.total_earned_gstd < 0) {
    throw new Error('Network statistics contract is invalid');
  }
  return stats;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const stats = await checkNetworkStats(process.argv[2] || 'https://gstdtoken.xyz');
    console.log(JSON.stringify({ check: 'website_network_stats', ok: true, ...stats }));
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Network statistics check failed');
    process.exitCode = 1;
  }
}
