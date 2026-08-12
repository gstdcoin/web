'use client';

import { useLanguage } from './LanguageProvider';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function RequestFlow() {
  const { t } = useLanguage();
  const rf = t('requestFlow') as any;
  const steps = (rf?.steps as string[]) || [];

  return (
    <section className="py-16 md:py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-center mb-12"
        >
          <span className="text-gradient-gold">{rf?.title || 'How AI Requests Work'}</span>
        </motion.h2>

        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-center gap-2 md:gap-3"
            >
              <div className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl glass-institutional border-[#D4AF37]/25 min-w-[6.5rem]">
                <span className="text-[10px] text-slate-500 font-mono">{`0${i + 1}`}</span>
                <span className="text-sm text-slate-100 font-semibold text-center">{step}</span>
              </div>
              {i < steps.length - 1 && <ArrowRight className="w-4 h-4 text-[#D4AF37]/50 flex-shrink-0" />}
            </motion.div>
          ))}
        </div>

        <p className="text-slate-400 text-sm md:text-base max-w-3xl mx-auto text-center leading-relaxed">
          {rf?.description}
        </p>
      </div>
    </section>
  );
}
