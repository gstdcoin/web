import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {SITE} from '@/content/config';

export default getRequestConfig(async ({requestLocale}) => {
  const locale = await requestLocale;
  if (!locale || !SITE.locales.includes(locale as any)) notFound();

  return {
    locale,
    messages: (await import(`../content/copy.${locale}.ts`)).default
  };
});
