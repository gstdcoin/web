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
      items: [
        t('investors.sections.documentation.items.whitepaper'),
        t('investors.sections.documentation.items.technical'),
        t('investors.sections.documentation.items.api'),
        t('investors.sections.documentation.items.audit'),
      ],
    },
    {
      title: t('investors.sections.developers.title'),
      description: t('investors.sections.developers.description'),
      items: [
        t('investors.sections.developers.items.sdk'),
        t('investors.sections.developers.items.integration'),
        t('investors.sections.developers.items.examples'),
        t('investors.sections.developers.items.support'),
      ],
    },
    {
      title: t('investors.sections.partners.title'),
      description: t('investors.sections.partners.description'),
      items: [
        t('investors.sections.partners.items.program'),
        t('investors.sections.partners.items.requirements'),
        t('investors.sections.partners.items.benefits'),
        t('investors.sections.partners.items.contact'),
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
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
          <p className="text-xl text-muted-light max-w-4xl mx-auto mb-8">
            {t('investors.description')}
          </p>
          <div className="bg-gradient-to-r from-gold-500/10 to-gold-600/5 border border-gold-200 rounded-2xl p-8 max-w-4xl mx-auto">
            <p className="text-lg text-muted-light leading-relaxed">
              {t('investors.summary')}
            </p>
          </div>
        </section>

        {/* Key Advantages */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-gradient-gold">{t('investors.advantagesTitle')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="bg-white border-gold-200 hover:border-gold-300 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg ${advantage.color} flex items-center justify-center`}>
                      <advantage.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-light-bg">{advantage.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-light leading-relaxed">
                    {advantage.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Information Sections */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-gradient-gold">{t('investors.sectionsTitle')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <Card key={index} className="bg-white border-gold-200 hover:border-gold-300 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-light-bg mb-2">{section.title}</CardTitle>
                  <CardDescription className="text-muted-light">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-gold-500 rounded-full flex-shrink-0 mt-2"></div>
                        <span className="text-muted-light">{item}</span>
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
          <div className="bg-gradient-to-r from-gold-500/10 to-gold-600/5 border border-gold-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-light-bg mb-4">
              {t('investors.cta.title')}
            </h3>
            <p className="text-muted-light mb-6 max-w-2xl mx-auto">
              {t('investors.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-gold" asChild>
                <a href={LINKS.stonfiSwap} target="_blank" rel="noopener noreferrer">
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

