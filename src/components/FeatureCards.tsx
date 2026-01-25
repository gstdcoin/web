'use client';

import { useLanguage } from './LanguageProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Shield, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function FeatureCards() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Zap,
      title: 'DePIN Infrastructure',
      description: 'Физическая инфраструктура, где каждая транзакция создает ценность. Ноды сети генерируют комиссии, которые превращаются в золотой резерв.',
      gradient: 'from-cyan-400 to-cyan-600',
    },
    {
      icon: Shield,
      title: 'Gold-Backed Liquidity',
      description: '70% комиссий автоматически конвертируются в физическое золото (XAUT), формируя прозрачный резерв для кредитной линии платформы.',
      gradient: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: TrendingUp,
      title: 'Low-Interest Access',
      description: 'Держатели GSDT получают доступ к займам под ~1.5% годовых, обеспеченным растущим золотым пулом.',
      gradient: 'from-yellow-500 via-cyan-500 to-yellow-600',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">Ключевые особенности</span>
          </h2>
          <p className="text-xl text-muted-light max-w-3xl mx-auto mt-4">
            DePIN-платформа, создающая золотую ликвидность через каждую транзакцию
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="group hover:shadow-gold-lg transition-all duration-300 border-white/10 hover:border-amber-500/30 bg-white/40 backdrop-blur-md hover:bg-white/60"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
