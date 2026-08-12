'use client';

import { useLanguage } from './LanguageProvider';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function FineTuning() {
  const { t } = useLanguage();
  const ft = t('fineTuning') as any;
  const steps = (ft?.steps as string[]) || [];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-center mb-12"
        >
          <span className="text-gradient-gold">{ft?.title || 'Distributed Fine-Tuning'}</span>
        </motion.h2>

        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-14">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-2 md:gap-3">
              <div className="px-4 py-2.5 rounded-xl glass-institutional border-[#D4AF37]/25 text-sm text-slate-100">
                {step}
              </div>
              {i < steps.length - 1 && <ArrowRight className="w-4 h-4 text-[#D4AF37]/50 flex-shrink-0" />}
            </div>
          ))}
        </div>

        <div className="glass-institutional rounded-2xl border border-[#D4AF37]/20 p-6 mb-6">
          <h3 className="text-lg font-bold text-slate-100 mb-2">{ft?.loraTitle || 'What is LoRA?'}</h3>
          <p className="text-slate-300 text-sm leading-relaxed">{ft?.loraExplainer}</p>
        </div>

        <p className="text-slate-500 text-sm text-center max-w-2xl mx-auto">{ft?.note}</p>
      </div>
    </section>
  );
}
