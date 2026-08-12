'use client';

import { useLanguage } from './LanguageProvider';
import { motion } from 'framer-motion';
import {
  BookOpen, Layers, Server, Cpu, Sparkles, Wallet, Coins,
  ShieldCheck, Landmark, Ticket, Lock, Code2, Users, HelpCircle,
} from 'lucide-react';
import { LINKS } from '@/content/config';

const ICONS = [BookOpen, Layers, Server, Cpu, Sparkles, Wallet, Coins, ShieldCheck, Landmark, Ticket, Lock, Code2, Users, HelpCircle];

export function DocsHub() {
  const { t } = useLanguage();
  const docs = t('docs') as any;
  const sections = (docs?.sections as { title: string; description: string }[]) || [];

  return (
    <section className="py-16 md:py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient-gold">{docs?.title || 'Documentation'}</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">{docs?.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, i) => {
            const Icon = ICONS[i] || BookOpen;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="glass-institutional rounded-2xl border border-[#D4AF37]/20 p-5"
              >
                <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <h3 className="text-slate-100 font-semibold mb-1">{section.title}</h3>
                <p className="text-slate-500 text-sm">{section.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            {(t('openSource.subtitle') as string) || ''}
          </p>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-[#D4AF37] hover:text-[#B8860B] text-sm font-semibold underline underline-offset-4"
          >
            {(t('openSource.ctaGithub') as string) || 'View GitHub'}
          </a>
        </div>
      </div>
    </section>
  );
}
