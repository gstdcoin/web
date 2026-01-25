'use client';

import { useLanguage } from './LanguageProvider';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Users, TrendingUp } from 'lucide-react';
import { LINKS } from '@/content/config';
import Image from 'next/image';

export function Hero() {
  const { t } = useLanguage();

  const features = [
    { icon: Zap, text: t('features.lightningFast') },
    { icon: Shield, text: t('features.secure') },
    { icon: Users, text: t('features.communityDriven') },
    { icon: TrendingUp, text: t('features.scalable') },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-amber-600/10 opacity-20" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <Image
              src="/logogstd.png"
              alt="GSTD Token Logo"
              width={120}
              height={120}
              className="h-16 w-16"
              priority
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-sm font-medium mb-8 animate-fade-in">
            <Zap className="w-4 h-4 mr-2" />
            {t('hero.badge')}
          </div>

          {/* Main Heading */}
          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 animate-slide-up px-4">
            <span className="text-gradient-gold">{t('hero.title')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-light mb-8 max-w-3xl mx-auto animate-slide-up delay-200 px-4">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up delay-400 px-4">
            <Button size="lg" className="btn-gold group w-full sm:w-auto touch-manipulation" asChild>
              <a href={LINKS.getGSDT} target="_blank" rel="noopener noreferrer">
                {t('ctaPrimary')}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="btn-outline-gold w-full sm:w-auto touch-manipulation" asChild>
              <a href={LINKS.launchNodes} target="_blank" rel="noopener noreferrer">
                {t('ctaSecondary')}
              </a>
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 animate-slide-up delay-500 px-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center px-3 sm:px-4 py-2 rounded-full bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 text-amber-600 touch-manipulation"
              >
                <feature.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-500/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-amber-500 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
