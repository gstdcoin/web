'use client';

import { useLanguage } from './LanguageProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

export function CloudComparison() {
  const { t } = useLanguage();
  const comparison = t('cloudComparison') as any;

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]" style={{ '--section-padding': '5rem' } as React.CSSProperties}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">{comparison?.title || 'Технологическое превосходство'}</span>
          </h2>
          <p className="text-sm md:text-base text-slate-200 max-w-3xl mx-auto mb-4">
            {comparison?.subtitle || 'Зачем платить Amazon за время, когда можно платить GSTD за результат?'}
          </p>
          <p className="text-sm md:text-base text-slate-200 max-w-2xl mx-auto">
            {comparison?.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Cloud Providers */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-institutional border-gradient-gold hover:border-red-500/30 h-full card-mobile-full">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-100 flex items-center justify-between">
                  {comparison?.cloud?.title || 'Облачные провайдеры'}
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Дорого</Badge>
                </CardTitle>
                <div className="text-3xl font-bold text-red-400 mt-4">
                  {comparison?.cloud?.price || '~$0.10/час'}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {(comparison?.cloud?.features || []).map((feature: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* GSTD Network */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-institutional border-[#F3E5AB]/30 hover:border-[#F3E5AB]/50 shadow-lg h-full card-mobile-full">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-100 flex items-center justify-between">
                  {comparison?.gstd?.title || 'GSTD Network'}
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {comparison?.gstd?.savings || 'Экономия 70%'}
                  </Badge>
                </CardTitle>
                <div className="text-3xl font-bold text-[#F3E5AB] mt-4">
                  {comparison?.gstd?.price || '~$0.03/результат'}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {(comparison?.gstd?.features || []).map((feature: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
