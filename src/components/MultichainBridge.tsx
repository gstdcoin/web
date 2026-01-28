'use client';

import { useLanguage } from './LanguageProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowLeftRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function MultichainBridge() {
  const { t } = useLanguage();
  
  // Get multichain translations
  const title = t('multichain.title') as string;
  const subtitle = t('multichain.subtitle') as string;
  const networks = (t('multichain.networks') as any) || [];
  const bridge = (t('multichain.bridge') as any) || { status: 'Operational', networks: 'TON ↔ SOL ↔ XRPL', time: '~2-5 минут' };

  const networkColors = {
    TON: 'from-[#D4AF37] to-[#B8860B]',
    Solana: 'from-blue-500 to-blue-600',
    XRPL: 'from-green-500 to-green-600',
  };

  const networkIcons = {
    TON: '⚡',
    Solana: '◎',
    XRPL: '✕',
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]" style={{ '--section-padding': '5rem' } as React.CSSProperties}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">
              {title}
            </span>
          </h2>
          <p className="text-sm md:text-base text-slate-200 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {networks.map((network: any, index: number) => {
            const colorClass = networkColors[network.name as keyof typeof networkColors] || 'from-gray-500 to-gray-600';
            const icon = networkIcons[network.name as keyof typeof networkIcons] || '●';
            
            return (
              <motion.div
                key={network.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className="group hover:shadow-gold-lg transition-all duration-300 glass-institutional border-[#D4AF37]/20 hover:border-[#D4AF37]/40 rounded-2xl card-mobile-full"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${colorClass} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        {icon}
                      </div>
                      {network.status === 'active' && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          {(t('networkStatus.active') as string) || 'Active'}
                        </Badge>
                      )}
                    </div>
                    
                    <CardTitle className="text-xl font-bold text-slate-100 mb-2">
                      {network.name}
                    </CardTitle>
                    <CardDescription className="text-slate-200 font-medium mb-2">
                      {network.title}
                    </CardDescription>
                    <CardDescription className="text-slate-200 text-sm">
                      {network.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-2">
                      {(Array.isArray(network.features) ? network.features : []).map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full flex-shrink-0 mt-2"></div>
                          <span className="text-slate-200 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bridge Status */}
        <div className="glass-institutional border-[#D4AF37]/20 rounded-2xl p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] flex items-center justify-center shadow-lg">
                <ArrowLeftRight className="w-8 h-8 text-[#0A0A0A]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-100 mb-2">
                  {bridge.title || 'Interoperability Hub'}
                </h3>
                <p className="text-slate-200">
                  {bridge.networks}
                </p>
                <p className="text-sm text-slate-200 mt-2">
                  {bridge.unifiedLiquidity || 'Unified liquidity layer across chains'}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-center md:text-right">
                <div className="text-sm text-slate-200 mb-1">Status</div>
                <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30 text-lg px-4 py-2">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {bridge.status}
                </Badge>
              </div>
              
              <div className="text-center md:text-right">
                <div className="text-sm text-slate-200 mb-1">Transaction Time</div>
                <div className="text-2xl font-bold text-[#D4AF37]">
                  {bridge.time}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
