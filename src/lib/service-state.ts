export type ServiceState = {platform: boolean | null; telegram: boolean | null; online: number | null; checkedAt: number | null};
export function serviceState(value: unknown, now = Date.now()): ServiceState {
  const unknown: ServiceState = {platform: null, telegram: null, online: null, checkedAt: null};
  if (!value || typeof value !== 'object') return unknown;
  const data = value as Record<string, any>;
  if (!Number.isSafeInteger(data.checked_at) || data.checked_at > now + 5000 || now - data.checked_at > 180000) return unknown;
  return {
    platform: data.platform === 'ok' ? true : data.platform === 'unavailable' ? false : null,
    telegram: data.telegram === 'ok' ? true : ['degraded', 'unavailable'].includes(data.telegram) ? false : null,
    online: Number.isSafeInteger(data.stats?.online) && data.stats.online >= 0 ? data.stats.online : null,
    checkedAt: data.checked_at,
  };
}
