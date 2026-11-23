# gstdtoken.xyz website cutover

Canonical website: `https://gstdtoken.xyz`. Website alias: `https://www.gstdtoken.xyz`. Platform/API: `https://app.gstdtoken.xyz`. Worker names and the existing Cloudflare account remain unchanged.

The website config permanently redirects `www.gstdtoken.xyz` and recognized former website hosts to the fixed canonical origin while preserving paths. Lookalike hosts and the platform subdomain are not matched. Redirects from an old hostname can work only if its DNS/HTTPS and route still deliver the request to this Worker; application code cannot redirect an unresolved or externally controlled domain.

The `GSTD_PLATFORM` service binding targets the existing `gstd-ai-platform` Worker for public GET health/statistics/node-discovery calls. Preview uses the same read-only data paths. Production fails closed if that binding is absent; it does not invent statistics or silently fall back to a different control plane. Only local development may use public HTTP fetches.

The registrar must delegate the domain to the exact Cloudflare-assigned nameservers before the custom domains can serve valid HTTPS. Domain registration and a successful CI build alone do not complete that step. The migration proposal was prepared while DNS returned NXDOMAIN; it must not be described as a verified production launch.

After zone activation, deploy the platform first and website second. The website workflow exercises real statistics in preview before publishing and repeats that check on the new production origin. Verify `/api/health`, `/api/network/stats`, visible Russian/English network counters, application handoff links, canonical metadata and the TonConnect manifest. Preserve honest unavailable states if any upstream check fails.

See the [ecosystem domain migration](https://github.com/gstdcoin/ai/blob/main/docs/DOMAIN_MIGRATION.md) for wallet, node, connector and owner-managed Telegram cutover steps. Archived evidence remains historical. This change does not promote an installer or a signed node release.
