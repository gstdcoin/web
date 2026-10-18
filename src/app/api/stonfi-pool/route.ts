import { NextResponse } from 'next/server';
import { GSTD_TON_CONTRACT } from '../../../content/config';

const STONFI_API_BASE = 'https://api.ston.fi';
const NODE_API_BASE = 'https://app.gstdtoken.com/api/v1';

function toFiniteNumber(value: unknown): number | null {
  if (typeof value !== 'number' && typeof value !== 'string') return null;
  if (typeof value === 'string' && !value.trim()) return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

async function getJson(url: string, revalidate: number): Promise<unknown> {
  const response = await fetch(url, {
    next: { revalidate },
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
  return response.json();
}

export async function GET() {
  const [assetResult, poolsResult, networkResult] = await Promise.allSettled([
    getJson(`${STONFI_API_BASE}/v1/assets/${GSTD_TON_CONTRACT}`, 300),
    getJson(`${STONFI_API_BASE}/v1/pools`, 300),
    getJson(`${NODE_API_BASE}/network/stats`, 60),
  ]);

  const assetData = assetResult.status === 'fulfilled' ? assetResult.value : null;
  const asset = isRecord(assetData) && isRecord(assetData.asset) ? assetData.asset : null;
  const gstdPriceUSD = toFiniteNumber(
    asset?.dex_usd_price ?? asset?.dex_price_usd
  );

  const poolsData = poolsResult.status === 'fulfilled' ? poolsResult.value : null;
  const poolList = isRecord(poolsData) && Array.isArray(poolsData.pool_list)
    ? poolsData.pool_list
    : null;
  const poolRecords = poolList?.filter(isRecord) ?? [];
  const gstdPools = poolRecords.filter(pool =>
    pool.deprecated !== true &&
    (pool.token0_address === GSTD_TON_CONTRACT || pool.token1_address === GSTD_TON_CONTRACT)
  );
  const poolValues = gstdPools
    .map(pool => toFiniteNumber(pool.lp_total_supply_usd))
    .filter((value): value is number => value !== null && value >= 0);
  const poolTVL = poolList !== null && poolValues.length === gstdPools.length && gstdPools.length > 0
    ? poolValues.reduce((total, value) => total + value, 0)
    : null;

  const networkData = networkResult.status === 'fulfilled' ? networkResult.value : null;
  const activeWorkers = toFiniteNumber(isRecord(networkData) ? networkData.active_workers : undefined);
  const totalTasks = toFiniteNumber(isRecord(networkData) ? networkData.total_tasks : undefined);
  const nodesOnline = activeWorkers !== null && activeWorkers >= 0 ? activeWorkers : null;
  const requestsServed = totalTasks !== null && totalTasks >= 0 ? totalTasks : null;

  const sources = {
    stonfiAsset: gstdPriceUSD !== null && gstdPriceUSD >= 0,
    stonfiPools: poolTVL !== null,
    network: nodesOnline !== null && requestsServed !== null,
  };

  if (assetResult.status === 'rejected') console.error('STON.fi asset request failed:', assetResult.reason);
  if (poolsResult.status === 'rejected') console.error('STON.fi pools request failed:', poolsResult.reason);
  if (networkResult.status === 'rejected') console.error('Network stats request failed:', networkResult.reason);

  return NextResponse.json({
    success: Object.values(sources).every(Boolean),
    data: {
      gstdPriceUSD: sources.stonfiAsset ? gstdPriceUSD : 0,
      poolTVL: poolTVL ?? 0,
      nodesOnline: nodesOnline ?? 0,
      requestsServed: requestsServed ?? 0,
      treasuryBalance: null,
      poolFound: gstdPools.length > 0,
    },
    sources,
  });
}
