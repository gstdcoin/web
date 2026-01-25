'use client';

import { useLanguage } from './LanguageProvider';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Users, TrendingUp } from 'lucide-react';
import { LINKS } from '@/content/config';
import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  const { t } = useLanguage();

  const features = [
    { icon: Zap, text: t('features.lightningFast') },
    { icon: Shield, text: t('features.secure') },
    { icon: Users, text: t('features.communityDriven') },
    { icon: TrendingUp, text: t('features.scalable') },
  ];

  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a]">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-[#D4AF37]/10 opacity-30" />
      
      {/* Animated Background Elements - Right Side */}
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/6 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        {/* Abstract 3D gradient representing supercomputer */}
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-gradient-to-l from-[#D4AF37]/20 via-transparent to-transparent rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Content */}
          <div className="text-left space-y-6 md:space-y-8">
            {/* Logo */}
            <div className="flex justify-start mb-6 animate-fade-in">
              <Image
                src="/logogstd.png"
                alt={t('tokenInfo.logoAlt') as string}
                width={80}
                height={80}
                className="h-12 w-12 md:h-16 md:w-16"
                priority
              />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full glass-institutional border-[#D4AF37]/30 text-[#D4AF37] text-xs md:text-sm font-medium mb-6 animate-fade-in">
              <Zap className="w-3 h-3 md:w-4 md:h-4 mr-2" />
              {t('hero.badge')}
            </div>

            {/* Main Heading */}
            <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 animate-slide-up">
              <span className="text-gradient-gold">{t('hero.title')}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-slate-200 mb-6 md:mb-8 max-w-2xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Button className="btn-gold group w-full sm:w-auto" asChild>
                <Link href={LINKS.getGSDT}>
                  {t('ctaPrimary')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" className="btn-outline-gold w-full sm:w-auto" asChild>
                <a href={LINKS.launchNodes} target="_blank" rel="noopener noreferrer">
                  {t('ctaSecondary')}
                </a>
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 md:gap-3 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center px-3 py-1.5 rounded-full glass-institutional border-[#D4AF37]/20 text-[#D4AF37] text-xs md:text-sm"
                >
                  <feature.icon className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right: Abstract Animation (Desktop only) */}
          <div className="hidden md:flex items-center justify-center relative h-full min-h-[500px]">
            <div className="relative w-full h-full">
              {/* Animated gradient mesh */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-transparent rounded-3xl blur-2xl animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-tl from-[#D4AF37]/10 via-transparent to-transparent rounded-3xl blur-2xl" style={{ animationDelay: '1s' }} />
              {/* Grid pattern overlay */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(rgba(243, 229, 171, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(243, 229, 171, 0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
