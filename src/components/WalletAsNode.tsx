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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">{walletAsNode?.title || 'Wallet-as-Node'}</span>
          </h2>
          <p className="text-xl text-muted-light max-w-3xl mx-auto mb-8">
            {walletAsNode?.subtitle || 'Майнинг в один клик'}
          </p>
          <p className="text-lg text-muted-light max-w-3xl mx-auto mb-8" style={{ lineHeight: '1.7' }}>
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
                <Card className="bg-white/40 backdrop-blur-md border-white/10 hover:border-amber-500/30 text-center h-full">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm text-muted-light">{benefit}</p>
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
                <Card className="bg-white/40 backdrop-blur-md border-white/10 hover:border-amber-500/30 h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-slate-900 to-slate-700 flex items-center justify-center text-white font-bold text-xl mb-4">
                      {index + 1}
                    </div>
                    <CardTitle className="text-lg text-light-bg mb-2">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-light" style={{ lineHeight: '1.7' }}>
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
          <Button size="lg" className="btn-gold" asChild>
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
