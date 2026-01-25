'use client';

import { useLanguage } from './LanguageProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Coins, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export function EscrowTreasury() {
  const { t } = useLanguage();
  const escrowTreasury = t('escrowTreasury') as any;

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]" style={{ '--section-padding': '5rem' } as React.CSSProperties}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">{escrowTreasury?.title || 'Escrow 2.0 & Treasury'}</span>
          </h2>
          <p className="text-sm md:text-base text-slate-200 max-w-3xl mx-auto">
            {escrowTreasury?.subtitle || 'Защита и прозрачность'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Escrow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-institutional border-gradient-gold hover:border-[#D4AF37]/30 h-full card-mobile-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B8860B] flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#0A0A0A]" />
                  </div>
                  <CardTitle className="text-2xl text-slate-100">
                    {escrowTreasury?.escrow?.title || 'Escrow: Защита бюджета'}
                  </CardTitle>
                </div>
                <CardDescription className="text-slate-300" style={{ lineHeight: '1.7' }}>
                  {escrowTreasury?.escrow?.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {(escrowTreasury?.escrow?.features || []).map((feature: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full flex-shrink-0 mt-2"></div>
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Treasury */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-institutional border-gradient-gold hover:border-[#D4AF37]/30 h-full card-mobile-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B8860B] flex items-center justify-center">
                    <Coins className="w-6 h-6 text-[#0A0A0A]" />
                  </div>
                  <CardTitle className="text-2xl text-slate-100">
                    {escrowTreasury?.treasury?.title || 'Treasury: Золотой резерв'}
                  </CardTitle>
                </div>
                <CardDescription className="text-slate-300" style={{ lineHeight: '1.7' }}>
                  {escrowTreasury?.treasury?.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {(escrowTreasury?.treasury?.features || []).map((feature: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full flex-shrink-0 mt-2"></div>
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Night Audit */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass-institutional border-[#D4AF37]/30 shadow-lg max-w-3xl mx-auto card-mobile-full">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-slate-100">
                    {escrowTreasury?.nightAudit?.title || 'Night Audit'}
                  </CardTitle>
                  <Badge className="mt-2 bg-purple-500/20 text-purple-400 border-purple-500/30">
                    {escrowTreasury?.nightAudit?.time || 'Каждый день в 00:00 UTC'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-300" style={{ lineHeight: '1.7' }}>
                {escrowTreasury?.nightAudit?.description}
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
