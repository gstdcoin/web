'use client';

import { useLanguage } from './LanguageProvider';
import { motion } from 'framer-motion';
import { INFERENCE_MODELS, FINETUNE_MODELS } from '@/content/config';

export function AiMarketplace() {
  const { t } = useLanguage();
  const am = t('aiMarketplace') as any;
  const categories = (am?.categories as string[]) || [];
  const columns = am?.columns || { model: 'Model', provider: 'Provider / Node', availability: 'Availability' };

  return (
    <section className="py-16 md:py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient-gold">{am?.title || 'Decentralized AI Marketplace'}</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">{am?.subtitle}</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {categories.map((cat) => (
            <span key={cat} className="px-4 py-1.5 rounded-full glass-institutional border-[#D4AF37]/25 text-[#D4AF37] text-sm font-semibold">
              {cat}
            </span>
          ))}
        </div>

        {/* Inference models */}
        <div className="glass-institutional rounded-2xl border border-[#D4AF37]/20 p-6 mb-8">
          <h2 className="text-lg font-bold text-slate-100 mb-1">{am?.inferenceTitle || 'Inference Models'}</h2>
          <p className="text-slate-500 text-sm mb-5">{am?.inferenceNote}</p>
          <div className="overflow-x-auto -mx-2 px-2">
            <table className="w-full text-sm min-w-[400px]">
              <thead>
                <tr className="text-left text-slate-500 text-xs uppercase tracking-wide">
                  <th className="pb-3 font-medium">{columns.model}</th>
                  <th className="pb-3 font-medium">{columns.provider}</th>
                  <th className="pb-3 font-medium">{columns.availability}</th>
                </tr>
              </thead>
              <tbody>
                {INFERENCE_MODELS.map((model) => (
                  <tr key={model} className="border-t border-white/5">
                    <td className="py-3 text-slate-100 font-mono">{model}</td>
                    <td className="py-3 text-slate-400">Node network</td>
                    <td className="py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                        Shipped
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fine-tune models */}
        <div className="glass-institutional rounded-2xl border border-[#D4AF37]/20 p-6">
          <h2 className="text-lg font-bold text-slate-100 mb-1">{am?.finetuneTitle || 'Fine-Tuning Models'}</h2>
          <p className="text-slate-500 text-sm mb-5">{am?.finetuneNote}</p>
          <div className="overflow-x-auto -mx-2 px-2">
            <table className="w-full text-sm min-w-[400px]">
              <thead>
                <tr className="text-left text-slate-500 text-xs uppercase tracking-wide">
                  <th className="pb-3 font-medium">{columns.model}</th>
                  <th className="pb-3 font-medium">{columns.provider}</th>
                  <th className="pb-3 font-medium">{columns.availability}</th>
                </tr>
              </thead>
              <tbody>
                {FINETUNE_MODELS.map((model) => {
                  const live = model === 'qwen2.5:0.5b';
                  return (
                    <tr key={model} className="border-t border-white/5">
                      <td className="py-3 text-slate-100 font-mono">{model}</td>
                      <td className="py-3 text-slate-400">Training pipeline</td>
                      <td className="py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${live ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25' : 'bg-amber-500/15 text-amber-400 border-amber-500/25'}`}>
                          {live ? 'Confirmed live' : 'Accepted, unconfirmed'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
