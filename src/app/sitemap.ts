import { MetadataRoute } from 'next';
import { SITE } from '@/content/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;
  const locales = SITE.locales;

  const routes = [
    '',
    '/token',
    '/buy',
    '/roadmap',
    '/legal',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Add routes for each locale
  locales.forEach((locale) => {
    routes.forEach((route) => {
      const url = locale === SITE.localeDefault 
        ? `${baseUrl}${route}` 
        : `${baseUrl}/${locale}${route}`;
      
      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: locales.reduce((acc, loc) => {
            const locUrl = loc === SITE.localeDefault 
              ? `${baseUrl}${route}` 
              : `${baseUrl}/${loc}${route}`;
            acc[loc] = locUrl;
            return acc;
          }, {} as Record<string, string>),
        },
      });
    });
  });

  return sitemap;
}
