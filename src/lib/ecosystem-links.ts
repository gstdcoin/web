import { LINKS } from '@/content/config';
export type WebsiteLanguage = 'ru' | 'en';
export type AppDestination = '/chat' | '/nodes' | '/payments';
/** Public navigation only. Never copy wallet sessions or demo conversation data. */
export function appUrl(language: WebsiteLanguage, destination: AppDestination = '/chat', model?: string): string {
  if (!['/chat', '/nodes', '/payments'].includes(destination)) throw new Error('Unsupported app destination');
  const url = new URL(`${language === 'ru' ? '/ru' : ''}${destination}`, LINKS.app);
  if (model) url.searchParams.set('model', model);
  return url.toString();
}
/** Cross-domain return links use ?lang=ru|en; stored preference remains the fallback. */
export function websiteLanguage(search: string, saved: string | null): WebsiteLanguage {
  const requested = new URLSearchParams(search).get('lang');
  if (requested === 'ru' || requested === 'en') return requested;
  return saved === 'en' ? 'en' : 'ru';
}
