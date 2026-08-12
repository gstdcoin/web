'use client';

import { useLanguage } from './LanguageProvider';
import { Globe2, Network, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const ICONS = [Globe2, Network, Zap];

export function CoreMessage() {
  const { t } = useLanguage();
  const cm = t('coreMessage') as any;
  const body = (cm?.body as string[]) || [];
  const pillars = (cm?.pillars as { title: string; description: string }[]) || [];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A0A0A] via-[#111114] to-[#0A0A0A]">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            <span className="text-gradient-gold">{cm?.title || 'The Network Is the Infrastructure'}</span>
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {body.map((line, i) => (
              <p key={i} className={i === body.length - 1 ? 'text-slate-100 font-medium text-lg' : 'text-slate-400 text-base'}>
                {line}
              </p>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((pillar, i) => {
            const Icon = ICONS[i] || Globe2;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-institutional rounded-2xl border border-[#D4AF37]/20 p-6 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#0A0A0A]" />
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-2 uppercase tracking-wide">{pillar.title}</h3>
                <p className="text-slate-400 text-sm">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
