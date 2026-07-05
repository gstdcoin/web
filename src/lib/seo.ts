import { Metadata } from 'next'
import { SITE } from '@/content/config'

export const defaultMetadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: 'Decentralized AI Compute & Fine-Tuning Network on TON. Run a node, earn GSTD, fine-tune open-source models 10× cheaper than cloud.',
  keywords: ['GSTD', 'DePIN', 'TON ecosystem', 'Distributed AI computing', 'AI fine-tuning', 'QLoRA training', 'Wallet-as-Node', 'Pay-for-Result', 'decentralized LLM', 'AI inference network'],
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
    description: 'GSTD: Decentralized AI Compute & Fine-Tuning Network on TON. Run a node, earn GSTD, fine-tune AI models 10× cheaper than cloud.',
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
    description: 'GSTD: Decentralized AI Compute & Fine-Tuning Network on TON. Run a node, earn GSTD, fine-tune AI models 10× cheaper than cloud.',
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
