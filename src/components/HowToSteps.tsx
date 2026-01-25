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
      description: t('buyStepsDescriptions')[0],
      icon: Download,
    },
    {
      number: 2,
      title: t('buySteps')[1],
      description: t('buyStepsDescriptions')[1],
      icon: Wallet,
    },
    {
      number: 3,
      title: t('buySteps')[2],
      description: t('buyStepsDescriptions')[2],
      icon: ArrowRight,
    },
    {
      number: 4,
      title: t('buySteps')[3],
      description: t('buyStepsDescriptions')[3],
      icon: Star,
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]" style={{ '--section-padding': '5rem' } as React.CSSProperties}>
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
              className="relative glass-institutional border-gradient-gold hover:border-[#D4AF37]/40 transition-all duration-300 group card-mobile-full"
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-8 w-8 text-[#0A0A0A]" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#0A0A0A] font-bold text-sm">
                  {step.number}
                </div>
                <CardTitle className="text-xl font-bold text-[#D4AF37]">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-300">
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
