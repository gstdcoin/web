import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { defaultMetadata } from '@/lib/seo';
import { LanguageProvider } from '@/components/LanguageProvider';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "GSTD Token",
              "url": "https://gstdtoken.com",
              "logo": "https://gstdtoken.com/logogstd.png",
              "description": "Decentralized AI compute network on TON. Pay GSTD for AI inference. Run a node, earn 90% of fees.",
              "sameAs": [
                "https://t.me/goldstandardcoin",
                "https://x.com/gstdtoken",
                "https://github.com/gstdcoin"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "GSTD Token",
              "url": "https://gstdtoken.com",
              "description": "Decentralized AI compute network on TON. Pay GSTD for AI inference. Run a node, earn 90% of fees.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://gstdtoken.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
