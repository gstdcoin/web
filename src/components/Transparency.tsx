'use client';

import { useLanguage } from './LanguageProvider';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { LINKS, TOKEN_INFO } from '@/content/config';

export function Transparency() {
  const { t } = useLanguage();
  const tr = t('transparency') as any;
  const items = (tr?.items as { label: string; description: string }[]) || [];

  const links: Record<string, string> = {
    'Token Contract (TON)': `https://tonviewer.com/${TOKEN_INFO.contractAddress}`,
    'Контракт токена (TON)': `https://tonviewer.com/${TOKEN_INFO.contractAddress}`,
    'GitHub': LINKS.github,
    'Protocol Documentation': '/docs',
    'Документация протокола': '/docs',
    'On-Chain Transactions': `https://tonviewer.com/${TOKEN_INFO.contractAddress}`,
    'Транзакции на блокчейне': `https://tonviewer.com/${TOKEN_INFO.contractAddress}`,
    'Network Metrics': '/',
    'Метрики сети': '/',
    'Node Software': `${LINKS.github}/gstdbot`,
    'ПО ноды': `${LINKS.github}/gstdbot`,
    'Smart Contracts': `${LINKS.github}/contracts`,
    'Смарт-контракты': `${LINKS.github}/contracts`,
  };

  return (
    <section className="py-16 md:py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">{tr?.title || 'Transparency'}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{tr?.subtitle}</p>
        </motion.div>

        <div className="space-y-3 mb-10">
          {items.map((item) => (
            <a
              key={item.label}
              href={links[item.label] || '#'}
              target={links[item.label]?.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 glass-institutional border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 rounded-xl px-5 py-4 transition-colors group"
            >
              <div>
                <div className="text-slate-100 font-semibold group-hover:text-[#D4AF37] transition-colors">{item.label}</div>
                <div className="text-slate-500 text-sm">{item.description}</div>
              </div>
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]/50 flex-shrink-0" />
            </a>
          ))}
        </div>

        <p className="text-slate-500 text-xs text-center max-w-xl mx-auto">{tr?.disclaimer}</p>
      </div>
    </section>
  );
}
