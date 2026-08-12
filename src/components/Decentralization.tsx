'use client';

import { useLanguage } from './LanguageProvider';
import { motion } from 'framer-motion';

const NODE_COUNT = 24;

export function Decentralization() {
  const { t } = useLanguage();
  const d = t('decentralization') as any;

  return (
    <section className="py-16 md:py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-gold">{d?.title || 'No Single Computer Is the Network'}</span>
          </h2>

          {/* Node mesh visual — decorative, count is illustrative, not a live figure */}
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-3 max-w-lg mx-auto my-10">
            {Array.from({ length: NODE_COUNT }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (i % 12) * 0.04 }}
                className="aspect-square rounded-lg bg-gradient-to-br from-[#D4AF37]/30 to-[#D4AF37]/5 border border-[#D4AF37]/30"
              />
            ))}
          </div>

          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {d?.body}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
