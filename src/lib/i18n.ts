import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {SITE} from '@/content/config';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!SITE.locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../content/copy.${locale}.ts`)).default
  };
});
