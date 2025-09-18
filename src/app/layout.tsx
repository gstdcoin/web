import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { defaultMetadata } from '@/lib/seo';
import { LanguageProvider } from '@/components/LanguageProvider';

const inter = Inter({ 
  subsets: ['latin'],
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "GSTD Token",
              "url": "https://gstdtoken.net",
              "logo": "https://gstdtoken.net/logogstd.png",
              "description": "Professional crypto-backed lending with GSTD. Borrow without selling your core holdings.",
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
              "url": "https://gstdtoken.net",
              "description": "Professional crypto-backed lending with GSTD. Borrow without selling your core holdings.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://gstdtoken.net/search?q={search_term_string}",
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
