import { NextResponse } from 'next/server';

const GSTD_CONTRACT = 'EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO';
const STONFI_API_BASE = 'https://api.ston.fi';
const NODE_API_BASE = 'https://app.gstdtoken.com/api/v1';

export async function GET() {
  try {
    // Fetch pool data and network stats in parallel
    const [poolsResponse, networkResponse] = await Promise.allSettled([
      fetch(`${STONFI_API_BASE}/v1/pools`, {
        next: { revalidate: 300 },
        headers: { 'Accept': 'application/json' },
      }),
      fetch(`${NODE_API_BASE}/network/stats`, {
        next: { revalidate: 60 },
        headers: { 'Accept': 'application/json' },
      }),
    ]);

    let gstdPriceUSD = 0;
    let poolTVL = 0;
    let poolFound = false;

    // Parse pool data for GSTD price
    if (poolsResponse.status === 'fulfilled' && poolsResponse.value.ok) {
      const poolsData = await poolsResponse.value.json();
      const gstdPool = Array.isArray(poolsData)
        ? poolsData.find((pool: any) =>
            pool.token0_address === GSTD_CONTRACT ||
            pool.token1_address === GSTD_CONTRACT ||
            pool.token0?.address === GSTD_CONTRACT ||
            pool.token1?.address === GSTD_CONTRACT
          )
        : null;

      if (gstdPool) {
        poolFound = true;
        const reserve0 = parseFloat(gstdPool.reserve0 || gstdPool.token0_reserve || '0');
        const reserve1 = parseFloat(gstdPool.reserve1 || gstdPool.token1_reserve || '0');
        const token0Decimals = parseInt(gstdPool.token0?.decimals || '9');
        const token1Decimals = parseInt(gstdPool.token1?.decimals || '9');
        const gstdAmount = reserve0 / Math.pow(10, token0Decimals);
        const tonAmount = reserve1 / Math.pow(10, token1Decimals);
        const tonPrice = 5; // approximate
        if (gstdAmount > 0 && tonAmount > 0) {
          gstdPriceUSD = (tonAmount * tonPrice) / gstdAmount;
          poolTVL = (gstdAmount * gstdPriceUSD) + (tonAmount * tonPrice);
        }
      }
    }

    // Parse network stats
    let nodesOnline = 0;
    let requestsServed = 0;
    let treasuryBalance = 0;

    if (networkResponse.status === 'fulfilled' && networkResponse.value.ok) {
      const networkData = await networkResponse.value.json();
      nodesOnline = networkData.nodes_online || networkData.active_workers || 0;
      requestsServed = networkData.tasks_completed || networkData.total_requests || 0;
      treasuryBalance = networkData.treasury_balance || 0;
    }

    return NextResponse.json({
      success: true,
      data: {
        gstdPriceUSD,
        poolTVL,
        nodesOnline,
        requestsServed,
        treasuryBalance,
        poolFound,
      },
      source: poolFound ? 'stonfi' : 'default',
    });
  } catch (error) {
    console.error('Error fetching pool data:', error);
    return NextResponse.json({
      success: false,
      data: {
        gstdPriceUSD: 0,
        poolTVL: 0,
        nodesOnline: 0,
        requestsServed: 0,
        treasuryBalance: 0,
        poolFound: false,
      },
      source: 'fallback',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
