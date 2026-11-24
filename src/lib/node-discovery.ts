/** Discover explicitly trusted node identities through the canonical live registry.
 * Cloudflare public tunnels may rotate; the allowlisted registry identity does not.
 * The registry is trusted here; this does not independently verify node signatures.
 */
import { platformFetch } from './platform-fetch';

/** Read the request's Worker bindings, rather than assuming process.env is
 * populated (our compatibility date predates that Cloudflare behavior). */
export function nodeTrustConfiguration(env: Record<string, unknown>) {
  const values = (name: string) => typeof env[name] === 'string'
    ? (env[name] as string).split(',').map(value => value.trim()).filter(Boolean)
    : [];
  return {
    trustedIds: new Set(values('GSTD_TRUSTED_NODE_IDS')),
    allowedHosts: new Set(values('GSTD_SEED_HOSTS').map(host => host.toLowerCase())),
  };
}

export async function registeredNodeUrls(
  trustedIds: Set<string>,
  allowedHosts: Set<string>,
  request: typeof fetch = platformFetch,
): Promise<string[]> {
  if (!trustedIds.size) return [];
  try {
    const response = await request('https://app.gstdtoken.xyz/api/v1/nodes/list', {
      signal: AbortSignal.timeout(5000), cache: 'no-store', redirect: 'manual',
    });
    if (!response.ok) return [];
    const data = await response.json() as { nodes?: unknown };
    if (!Array.isArray(data.nodes)) return [];
    const urls: string[] = [];
    for (const node of data.nodes) {
      if (!node || !trustedIds.has(node.node_id) || node.is_online !== true) continue;
      const age = Date.now() - Date.parse(node.last_seen || '');
      if (!Number.isFinite(age) || age < 0 || age >= 600000) continue;
      try {
        const url = new URL(node.node_url);
        const host = url.hostname.toLowerCase();
        const allowed = allowedHosts.has(host) || /^[a-z0-9]+(?:-[a-z0-9]+)*\.trycloudflare\.com$/.test(host);
        if (url.protocol !== 'https:' || url.username || url.password || url.port
          || !allowed || host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local')
          || host.endsWith('.internal') || host.includes(':') || /^\d+(?:\.\d+){3}$/.test(host)) continue;
        urls.push(url.origin);
      } catch { /* malformed registry URL is not routable */ }
    }
    return Array.from(new Set(urls));
  } catch {
    return [];
  }
}
