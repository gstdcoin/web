'use client';

import { useLanguage } from './LanguageProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone, Zap, Coins, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { LINKS } from '@/content/config';

const icons = {
  Smartphone,
  Zap,
  Coins,
  TrendingUp,
};

export function WalletAsNode() {
  const { t } = useLanguage();
  const walletAsNode = t('walletAsNode') as any;
  const steps = walletAsNode?.flow?.steps || [];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]" style={{ '--section-padding': '5rem' } as React.CSSProperties}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">{walletAsNode?.title || 'Wallet-as-Node'}</span>
          </h2>
          <p className="text-sm md:text-base text-slate-200 max-w-3xl mx-auto mb-8">
            {walletAsNode?.subtitle || 'Майнинг в один клик'}
          </p>
          <p className="text-sm md:text-base text-slate-200 max-w-3xl mx-auto mb-8" style={{ lineHeight: '1.7' }}>
            {walletAsNode?.description}
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {(walletAsNode?.benefits || []).map((benefit: string, index: number) => {
            const IconComponent = icons[Object.keys(icons)[index] as keyof typeof icons] || Smartphone;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass-institutional border-gradient-gold hover:border-[#D4AF37]/30 text-center h-full card-mobile-full">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B8860B] flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-[#0A0A0A]" />
                    </div>
                    <p className="text-sm text-slate-300">{benefit}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Flow Steps */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="text-gradient-gold">{walletAsNode?.flow?.title || 'Как это работает'}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass-institutional border-gradient-gold hover:border-[#D4AF37]/30 h-full card-mobile-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] flex items-center justify-center text-[#D4AF37] font-bold text-xl mb-4">
                      {index + 1}
                    </div>
                    <CardTitle className="text-lg text-slate-100 mb-2">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-300" style={{ lineHeight: '1.7' }}>
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 hover:border-green-500/50" asChild>
            <a href={LINKS.telegram} target="_blank" rel="noopener noreferrer">
              {walletAsNode?.cta || 'Подключить кошелек'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
