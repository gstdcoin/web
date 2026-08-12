'use client';

import { useLanguage } from './LanguageProvider';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

export function EconomicFlow() {
  const { t } = useLanguage();
  const ef = t('economicFlow') as any;
  const userLoop = (ef?.userLoop as string[]) || [];
  const feeLoop = ef?.feeLoop || {};
  const allocations = (feeLoop?.allocations as string[]) || [];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">{ef?.title || 'Economic Flow'}</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">{ef?.subtitle}</p>
        </motion.div>

        {/* User loop */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
          {userLoop.map((step, i) => (
            <div key={step} className="flex items-center gap-2 md:gap-3">
              <div className="px-4 py-2.5 rounded-xl glass-institutional border-[#D4AF37]/25 text-sm md:text-base text-slate-100 font-medium whitespace-nowrap">
                {step}
              </div>
              {i < userLoop.length - 1 && <ArrowRight className="w-4 h-4 text-[#D4AF37]/60 flex-shrink-0" />}
            </div>
          ))}
        </div>

        {/* Fee loop → Treasury allocations */}
        <div className="flex flex-col items-center">
          <div className="px-5 py-2.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] font-semibold mb-2">
            {feeLoop?.label || 'Protocol Fee'}
          </div>
          <ArrowDown className="w-5 h-5 text-[#D4AF37]/50 my-1" />
          <div className="px-5 py-2.5 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] font-bold mb-4">
            {feeLoop?.target || 'Treasury'}
          </div>
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
            {allocations.map((a) => (
              <span key={a} className="px-3 py-1.5 rounded-full glass-institutional border-[#D4AF37]/15 text-slate-300 text-sm">
                {a}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-5 py-2.5 rounded-full glass-institutional border-[#D4AF37]/25 text-sm text-slate-300 font-mono">
            {ef?.split || 'Verified on-chain: 85% node · 10% treasury · 5% buyback & burn'}
          </div>
        </div>
      </div>
    </section>
  );
}
