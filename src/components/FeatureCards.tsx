'use client';

import { useLanguage } from './LanguageProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Shield, TrendingUp, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

export function FeatureCards() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Zap,
      title: t('featureCards.infrastructure.title'),
      description: t('featureCards.infrastructure.description'),
      gradient: 'from-[#D4AF37] to-[#B8860B]',
      href: null as string | null,
      badge: null as string | null,
    },
    {
      icon: Shield,
      title: t('featureCards.goldLiquidity.title'),
      description: t('featureCards.goldLiquidity.description'),
      gradient: 'from-[#D4AF37] to-[#B8860B]',
      href: null as string | null,
      badge: null as string | null,
    },
    {
      icon: TrendingUp,
      title: t('featureCards.lowInterest.title'),
      description: t('featureCards.lowInterest.description'),
      gradient: 'from-[#D4AF37] via-[#F4C430] to-[#B8860B]',
      href: null as string | null,
      badge: null as string | null,
    },
    {
      icon: Brain,
      title: t('ecosystem.finetune.title'),
      description: t('ecosystem.finetune.description'),
      gradient: 'from-violet-500 to-indigo-600',
      href: '/ai',
      badge: null as string | null,
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a]" style={{ '--section-padding': '5rem' } as React.CSSProperties}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            <span className="text-gradient-gold">{t('featureSection.title')}</span>
          </h2>
          <p className="text-sm md:text-base text-slate-200 max-w-3xl mx-auto">
            {t('featureSection.subtitle')}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {feature.href ? (
                <a href={feature.href} target="_blank" rel="noopener noreferrer" className="block h-full no-underline">
                  <Card className="group hover:shadow-gold-lg transition-all duration-300 glass-institutional border-violet-500/20 hover:border-violet-500/40 rounded-2xl card-mobile-full h-full cursor-pointer">
                    <CardHeader className="text-center">
                      <div className="relative inline-block mx-auto mb-4">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <feature.icon className="w-8 h-8 text-white" />
                        </div>
                        {feature.badge && (
                          <span className="absolute -top-2 -right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-violet-500/30 text-violet-300 border border-violet-500/40">
                            {feature.badge}
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-xl font-bold group-hover:text-violet-400 transition-colors text-slate-100">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-slate-200 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </a>
              ) : (
                <Card className="group hover:shadow-gold-lg transition-all duration-300 glass-institutional border-[#D4AF37]/20 hover:border-[#D4AF37]/40 rounded-2xl card-mobile-full">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-[#0A0A0A]" />
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-[#D4AF37] transition-colors text-slate-100">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-slate-200 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
