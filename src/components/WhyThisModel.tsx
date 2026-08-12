'use client';

import { useLanguage } from './LanguageProvider';
import { X, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export function WhyThisModel() {
  const { t } = useLanguage();
  const w = t('whyThisModel') as any;
  const traditional = (w?.traditional as string[]) || [];
  const protocol = (w?.protocol as string[]) || [];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A0A0A] via-[#111114] to-[#0A0A0A]">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-center mb-12"
        >
          <span className="text-gradient-gold">{w?.title || 'From Speculation to Network Utility'}</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
          >
            <h3 className="text-sm uppercase tracking-widest text-slate-500 mb-4">{w?.traditionalTitle || 'Traditional Token'}</h3>
            <ul className="space-y-3">
              {traditional.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-slate-400">
                  <X className="w-4 h-4 text-slate-600 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-6"
          >
            <h3 className="text-sm uppercase tracking-widest text-[#D4AF37] mb-4">{w?.protocolTitle || 'GSTD Protocol'}</h3>
            <ul className="space-y-3">
              {protocol.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-slate-100 font-medium">
                  <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
