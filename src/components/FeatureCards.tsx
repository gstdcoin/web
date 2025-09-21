'use client';

import { useLanguage } from './LanguageProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Shield, TrendingUp } from 'lucide-react';

export function FeatureCards() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Zap,
      title: t('whatWeBuildBullets')[0],
      description: t('whatWeBuildDescriptions')[0],
      gradient: 'from-gold-500 to-gold-600',
    },
    {
      icon: Shield,
      title: t('whatWeBuildBullets')[1],
      description: t('whatWeBuildDescriptions')[1],
      gradient: 'from-gold-500 to-gold-600',
    },
    {
      icon: TrendingUp,
      title: t('whatWeBuildBullets')[2],
      description: t('whatWeBuildDescriptions')[2],
      gradient: 'from-gold-500 to-gold-600',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">{t('whatWeBuildTitle')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-gold-lg transition-all duration-300 border-gold-200 hover:border-gold-300 bg-white"
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-gold-600 transition-colors text-light-bg">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-light leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
