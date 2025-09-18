'use client';

import { useLanguage } from './LanguageProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, Download, ArrowRight, Star } from 'lucide-react';

export function HowToSteps() {
  const { t } = useLanguage();

  const steps = [
    {
      number: 1,
      title: t('buySteps')[0],
      description: 'Choose from Telegram Wallet Tonkeeper or other TON-compatible wallets.',
      icon: Download,
    },
    {
      number: 2,
      title: t('buySteps')[1],
      description: 'Get TON tokens through exchanges on-ramps or peer-to-peer transfers.',
      icon: Wallet,
    },
    {
      number: 3,
      title: t('buySteps')[2],
      description: 'Use our pre-filled STON.fi link for seamless TON to GSTD swapping.',
      icon: ArrowRight,
    },
    {
      number: 4,
      title: t('buySteps')[3],
      description: 'Add GSTD to your wallet favorites for easy access and tracking.',
      icon: Star,
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">{t('buyTitle')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative bg-white border-gold-200 hover:border-gold-300 transition-all duration-300 group"
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-white font-bold text-sm">
                  {step.number}
                </div>
                <CardTitle className="text-xl font-bold text-gold-600">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-light">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
