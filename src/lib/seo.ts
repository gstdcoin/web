import { Metadata } from 'next'
import { SITE } from '@/content/config'

export const defaultMetadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: 'Global Supercomputer with Gold Backing. First DePIN network on TON that turns your smartphone power into gold. Wallet-as-Node, Pay-for-Result, Distributed computing.',
  keywords: ['GSTD', 'DePIN', 'TON ecosystem', 'Distributed computing', 'Gold backed RWA', 'AI training on blockchain', 'Wallet-as-Node', 'Pay-for-Result', 'Global supercomputer', 'DePIN 2.0'],
  authors: [{ name: 'GSTD Team' }],
  creator: 'GSTD',
  publisher: 'GSTD',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE.url),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'ru-RU': '/ru',
    },
  },
  openGraph: {
    title: SITE.name,
    description: 'GSTD: Global Supercomputer with Gold Backing. First DePIN network on TON that turns your smartphone power into gold.',
    url: SITE.url,
    siteName: SITE.name,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: 'GSTD: Global Supercomputer with Gold Backing. First DePIN network on TON that turns your smartphone power into gold.',
    images: ['/og-image.png'],
    creator: '@gstdtoken',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
