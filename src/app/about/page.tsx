'use client';

import { useLanguage } from '@/components/LanguageProvider';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Zap, Target } from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: t('about.features')[0],
      description: t('about.featureDescriptions')[0],
    },
    {
      icon: Users,
      title: t('about.features')[1],
      description: t('about.featureDescriptions')[1],
    },
    {
      icon: Zap,
      title: t('about.features')[2],
      description: t('about.featureDescriptions')[2],
    },
    {
      icon: Target,
      title: t('about.features')[3],
      description: t('about.featureDescriptions')[3],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title={t('about.title')} 
        subtitle={t('about.subtitle')}
      />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-gold">{t('about.title')}</span>
          </h1>
          <p className="text-xl text-muted-light max-w-3xl mx-auto">
            {t('about.description')}
          </p>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-gradient-gold">{t('about.featuresTitle')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white border-gold-200 hover:border-gold-300 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-light-bg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-light leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* What We Build */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-gradient-gold">{t('whatWeBuildTitle')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(t('about.buildBullets') as string[]).map((bullet, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-slate-50 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>
                <p className="text-muted-light">{bullet}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Statement */}
        <section className="text-center">
          <Card className="bg-gradient-to-br from-gold-500/10 to-gold-600/5 border-gold-200">
            <CardHeader>
              <CardTitle className="text-2xl text-light-bg">{t('about.missionTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-light leading-relaxed">
                {t('about.missionDescription')}
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
