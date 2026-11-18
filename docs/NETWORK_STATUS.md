# Website network statistics

The browser reads `/api/network/stats` on the website origin. The website Worker fetches the fixed canonical platform endpoint `https://app.gstdtoken.com/api/v1/network/stats`; it does not proxy caller-selected URLs or require a private credential.

The route validates every displayed counter, uses `tasks_completed` for completed work, and maps `total_gstd_paid` to the website's `total_earned_gstd` response field. Genuine zero values remain zero. Missing, malformed, negative or unsafe counters, redirects, timeouts and upstream HTTP errors return HTTP 503 with `Cache-Control: no-store`. No simulated counters are substituted.

Successful responses use a short public cache to limit platform requests. The browser refreshes every two minutes and when the page becomes visible or connectivity returns. Unavailability remains visible if a refresh fails.

The direct cross-origin browser request failed on 2026-11-18 because the platform statistics response lacked an `Access-Control-Allow-Origin` header, even though its health endpoint supplied one. A healthy `/api/health` alone did not exercise that browser data path.

Run `npm test`, `npm run type-check` and `npm run lint`. For a deployed preview or production website, run `node scripts/check-network-stats.mjs https://gstdtoken.com` (replace the origin for preview). The Cloudflare workflow checks this contract in preview before production and again after production deployment.

This correction is independent of the installer proposal in PR #12. It neither promotes a signed node release nor updates installed nodes.
