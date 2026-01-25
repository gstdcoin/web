'use client';

import { useLanguage } from '@/components/LanguageProvider';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Eye, TrendingUp, Users, DollarSign, Globe, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LINKS } from '@/content/config';

export default function InvestorsPage() {
  const { t } = useLanguage();

  const advantages = [
    {
      icon: Shield,
      title: t('investors.advantages.reliability.title'),
      description: t('investors.advantages.reliability.description'),
      color: 'bg-green-500',
    },
    {
      icon: Zap,
      title: t('investors.advantages.interest.title'),
      description: t('investors.advantages.interest.description'),
      color: 'bg-yellow-500',
    },
    {
      icon: Eye,
      title: t('investors.advantages.transparency.title'),
      description: t('investors.advantages.transparency.description'),
      color: 'bg-blue-500',
    },
    {
      icon: TrendingUp,
      title: t('investors.advantages.dca.title'),
      description: t('investors.advantages.dca.description'),
      color: 'bg-purple-500',
    },
    {
      icon: Users,
      title: t('investors.advantages.antiwhale.title'),
      description: t('investors.advantages.antiwhale.description'),
      color: 'bg-orange-500',
    },
    {
      icon: DollarSign,
      title: t('investors.advantages.income.title'),
      description: t('investors.advantages.income.description'),
      color: 'bg-emerald-500',
    },
    {
      icon: Globe,
      title: t('investors.advantages.growth.title'),
      description: t('investors.advantages.growth.description'),
      color: 'bg-cyan-500',
    },
  ];

  const sections = [
    {
      title: t('investors.sections.documentation.title'),
      description: t('investors.sections.documentation.description'),
      items: t('investors.sections.documentation.items') as string[],
    },
    {
      title: t('investors.sections.developers.title'),
      description: t('investors.sections.developers.description'),
      items: t('investors.sections.developers.items') as string[],
    },
    {
      title: t('investors.sections.partners.title'),
      description: t('investors.sections.partners.description'),
      items: t('investors.sections.partners.items') as string[],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]">
      <PageHeader 
        title={t('investors.title')} 
        subtitle={t('investors.subtitle')}
      />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-gold">{t('investors.title')}</span>
          </h1>
          <p className="text-sm md:text-base text-slate-200 max-w-4xl mx-auto mb-8">
            {t('investors.description')}
          </p>
          <div className="glass-institutional border-[#D4AF37]/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              {t('investors.summary')}
            </p>
          </div>
        </section>

        {/* Key Advantages */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 px-4">
            <span className="text-gradient-gold">{t('investors.advantagesTitle')}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4">
            {advantages.map((advantage, index) => (
              <Card key={index} className="glass-institutional border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 card-mobile-full">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B8860B] flex items-center justify-center flex-shrink-0">
                      <advantage.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#0A0A0A]" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl text-slate-100">{advantage.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300 leading-relaxed">
                    {advantage.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Information Sections */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 px-4">
            <span className="text-gradient-gold">{t('investors.sectionsTitle')}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4">
            {sections.map((section, index) => (
              <Card key={index} className="glass-institutional border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 card-mobile-full">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl text-slate-100 mb-2">{section.title}</CardTitle>
                  <CardDescription className="text-slate-300 text-sm sm:text-base">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-[#D4AF37] rounded-full flex-shrink-0 mt-2"></div>
                        <span className="text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="glass-institutional border-[#D4AF37]/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-100 mb-4">
              {t('investors.cta.title')}
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              {t('investors.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 hover:border-green-500/50" asChild>
                <a href={LINKS.buyGSDT} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t('investors.cta.badge')}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

