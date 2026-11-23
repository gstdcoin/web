import { getCloudflareContext } from '@opennextjs/cloudflare';

const ORIGIN = 'https://app.gstdtoken.xyz';
const PUBLIC_PATHS = new Set(['/api/v1/health', '/api/v1/network/stats', '/api/v1/nodes/list']);

/** Public read-only platform calls use a Worker binding, independent of public DNS. */
export const platformFetch: typeof fetch = async (input, init) => {
  const url = new URL(typeof input === 'string' || input instanceof URL ? String(input) : input.url, ORIGIN);
  const method = init?.method || (typeof input === 'object' && 'method' in input ? input.method : 'GET');
  if (url.origin !== ORIGIN || !PUBLIC_PATHS.has(url.pathname) || url.username || url.password || method !== 'GET') {
    throw new Error('Unexpected platform request');
  }
  let binding: { fetch: typeof fetch } | undefined;
  try {
    const { env } = await getCloudflareContext({ async: true });
    binding = (env as unknown as { GSTD_PLATFORM?: { fetch: typeof fetch } }).GSTD_PLATFORM;
  } catch { /* Local Node.js tests and development have no Worker context. */ }
  if (binding) return binding.fetch(url.toString(), { ...init, redirect: 'manual' });
  if (process.env.NODE_ENV === 'production') throw new Error('GSTD_PLATFORM service binding is unavailable');
  return fetch(url, { ...init, redirect: 'manual' });
};
