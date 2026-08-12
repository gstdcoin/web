'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import { HowToSteps } from '@/components/HowToSteps';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Shield, Zap, Users } from 'lucide-react';
import { LINKS } from '@/content/config';

export default function BuyPage() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Shield,
      title: (t('buy.benefits')[0] as any).title,
      description: (t('buy.benefits')[0] as any).description,
    },
    {
      icon: Zap,
      title: (t('buy.benefits')[1] as any).title,
      description: (t('buy.benefits')[1] as any).description,
    },
    {
      icon: Users,
      title: (t('buy.benefits')[2] as any).title,
      description: (t('buy.benefits')[2] as any).description,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]">
      
      <main className="container mx-auto px-4 py-12">
        {/* Quick Buy Section */}
        <section className="mb-16">
          <Card className="glass-institutional border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 card-mobile-full">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-slate-100 mb-4">
                <span className="text-gradient-gold">{t('buy.quickBuyTitle')}</span>
              </CardTitle>
              <CardDescription className="text-slate-300 text-lg">
                {t('buy.quickBuyDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button size="lg" className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 hover:border-green-500/50 mb-4" asChild>
                <a href={LINKS.buyGSDT} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  {t('buy.buyButtonText')}
                </a>
              </Button>
              <p className="text-sm text-slate-300">
                {t('buy.poweredBy')}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* How to Buy Steps */}
        <HowToSteps />

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-gradient-gold">{t('buyPage.whyChooseGSTD')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="glass-institutional border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 text-center card-mobile-full">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] flex items-center justify-center">
                    <benefit.icon className="w-8 h-8 text-[#0A0A0A]" />
                  </div>
                  <CardTitle className="text-xl text-slate-100">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300 leading-relaxed">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features List */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-gradient-gold">{t('buy.featuresTitle')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(t('buy.features') as string[]).map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 glass-institutional border-[#D4AF37]/20 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#0A0A0A] text-sm font-bold">✓</span>
                </div>
                <p className="text-slate-300">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Resources */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-gradient-gold">{t('buyPage.additionalResources')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-institutional border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 card-mobile-full">
              <CardHeader>
                <CardTitle className="text-lg text-slate-100">{t('buyPage.advantages')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">
                  {t('buyPage.advantagesDescription')}
                </p>
                <Button variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 hover:border-green-500/50" asChild>
                  <Link href={LINKS.docs}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t('buyPage.readDetails')}
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-institutional border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 card-mobile-full">
              <CardHeader>
                <CardTitle className="text-lg text-slate-100">{t('buyPage.community')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">
                  {t('buyPage.communityDescription')}
                </p>
                <Button variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 hover:border-green-500/50" asChild>
                  <a href={LINKS.telegram} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t('buyPage.joinTelegram')}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
