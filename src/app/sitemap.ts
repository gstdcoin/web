import { MetadataRoute } from 'next';
import { SITE } from '@/content/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;

  // Routing is flat -- there is no [locale] segment (language switching is
  // client-side via LanguageProvider + localStorage), so URLs are never
  // prefixed with a locale. Previously this generated /en/* variants that
  // 404 live, and omitted /about and /advantages entirely.
  const routes = [
    '',
    '/token',
    '/buy',
    '/roadmap',
    '/legal',
    '/about',
    '/advantages',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
