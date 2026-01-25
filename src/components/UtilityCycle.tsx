'use client';

import { useLanguage } from './LanguageProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, Coins, Waves, CreditCard, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const icons = {
  Network,
  Coins,
  Pool: Waves,
  CreditCard,
};

export function UtilityCycle() {
  const { t } = useLanguage();
  const steps = (t('utilityCycle.steps') as any) || [];

  const iconColors = [
    'from-[#D4AF37] to-[#B8860B]', // Classic Gold gradient
    'from-[#D4AF37] to-[#B8860B]',
    'from-[#D4AF37] to-[#B8860B]',
    'from-[#D4AF37] to-[#B8860B]',
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]" style={{ '--section-padding': '5rem' } as React.CSSProperties}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">{t('utilityCycle.title')}</span>
          </h2>
          <p className="text-sm md:text-base text-slate-200 max-w-3xl mx-auto">
            {t('utilityCycle.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connection arrows - hidden on mobile, visible on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D4AF37] via-[#F4C430] to-[#D4AF37] opacity-30 -translate-y-1/2" style={{ marginTop: '60px' }} />
          
          {steps.map((step: any, index: number) => {
            const IconComponent = icons[step.icon as keyof typeof icons] || Network;
            const isLast = index === steps.length - 1;
            
            return (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-gold-lg transition-all duration-300 glass-institutional border-gradient-gold hover:border-[#D4AF37]/30 h-full card-mobile-full">
                  <CardHeader className="text-center">
                    {/* Step Number Badge */}
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] flex items-center justify-center text-[#D4AF37] font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                      {step.number}
                    </div>
                    
                    {/* Icon */}
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <IconComponent className="w-10 h-10 text-[#0A0A0A]" />
                    </div>
                    
                    <CardTitle className="text-xl font-bold group-hover:text-[#D4AF37] transition-colors text-slate-100 mb-2">
                      {step.title}
                    </CardTitle>
                    
                    {/* Metric Badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-medium">
                      {step.metric}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <CardDescription className="text-center text-slate-300 leading-relaxed">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>

                {/* Arrow between steps - hidden on mobile */}
                {!isLast && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 items-center justify-center z-10">
                    <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border-2 border-[#D4AF37]/30 flex items-center justify-center shadow-lg">
                      <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Protocol layers indicator */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-institutional border-[#D4AF37]/20 text-slate-300 text-sm">
            <div className="w-2 h-2 bg-[#D4AF37] rounded-full mr-2 animate-pulse"></div>
            {t('utilityCycle.protocolIndicator') || 'Institutional-Grade Protocol • Three-Tier Utility Model'}
          </div>
        </div>
      </div>
    </section>
  );
}
