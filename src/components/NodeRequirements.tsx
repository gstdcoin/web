'use client';

import { useLanguage } from './LanguageProvider';
import { Cpu, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';
import { NODE_TIERS } from '@/content/config';

export function NodeRequirements() {
  const { t } = useLanguage();
  const nr = t('nodeRequirements') as any;
  const basic = (nr?.basic as string[]) || [];
  const inference = (nr?.inference as string[]) || [];

  return (
    <section className="py-16 md:py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">{nr?.title || 'Node Requirements'}</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">{nr?.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <div className="glass-institutional rounded-2xl border border-[#D4AF37]/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-4 h-4 text-[#D4AF37]" />
              <h3 className="text-sm uppercase tracking-widest text-slate-300">{nr?.basicTitle || 'Basic'}</h3>
            </div>
            <ul className="space-y-2">
              {basic.map((item) => (
                <li key={item} className="text-slate-200 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-institutional rounded-2xl border border-[#D4AF37]/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BrainCircuit className="w-4 h-4 text-[#D4AF37]" />
              <h3 className="text-sm uppercase tracking-widest text-slate-300">{nr?.inferenceTitle || 'For AI Inference'}</h3>
            </div>
            <ul className="space-y-2">
              {inference.map((item) => (
                <li key={item} className="text-slate-200 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="glass-institutional rounded-2xl border border-[#D4AF37]/20 p-6">
          <h3 className="text-sm uppercase tracking-widest text-slate-300 mb-4">{nr?.tiersTitle || 'Hardware Tiers'}</h3>
          <div className="overflow-x-auto -mx-2 px-2">
            <table className="w-full text-sm min-w-[420px]">
              <thead>
                <tr className="text-left text-slate-500 text-xs uppercase tracking-wide">
                  <th className="pb-3 font-medium">Tier</th>
                  <th className="pb-3 font-medium">Multiplier</th>
                  <th className="pb-3 font-medium">Modules</th>
                </tr>
              </thead>
              <tbody>
                {NODE_TIERS.map((tier) => (
                  <tr key={tier.name} className="border-t border-white/5">
                    <td className="py-3 text-slate-100 font-semibold">{tier.name}</td>
                    <td className="py-3 text-[#D4AF37] font-mono">{tier.multiplier}</td>
                    <td className="py-3 text-slate-400">{tier.modules}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-500 text-xs mt-4">{nr?.tiersNote}</p>
        </div>
      </div>
    </section>
  );
}
