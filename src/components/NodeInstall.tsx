'use client';

import { useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { Button } from '@/components/ui/button';
import { Copy, Check, Terminal, Github, ExternalLink } from 'lucide-react';
import { LINKS } from '@/content/config';
import { motion } from 'framer-motion';

const INSTALL_CMD = 'curl -fsSL https://raw.githubusercontent.com/gstdcoin/gstdbot/main/install.sh | bash';

export function NodeInstall() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(INSTALL_CMD).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const ni = t('nodeInstall') as any;

  return (
    <section id="install" className="py-16 md:py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full glass-institutional border-[#D4AF37]/30 text-[#D4AF37] text-xs font-medium mb-6">
            <Terminal className="w-3 h-3 mr-2" />
            {ni?.badge || 'One-line install'}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">{ni?.title || 'Run a Node in 60 Seconds'}</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
            {ni?.subtitle || 'Deploy on any Linux, macOS or Windows (WSL) machine. The node auto-starts, updates itself, and earns GSTD for every task it completes.'}
          </p>
        </motion.div>

        {/* Install command box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          <div className="glass-institutional border border-[#D4AF37]/30 rounded-2xl overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-[#D4AF37]/10">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-xs text-slate-500">terminal</span>
            </div>
            {/* Command */}
            <div className="flex items-center justify-between gap-3 px-5 py-4 bg-[#0d0d0d]">
              <code className="text-[#D4AF37] text-sm md:text-base font-mono break-all">
                $ {INSTALL_CMD}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={copy}
                className="flex-shrink-0 text-slate-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
              >
                {copied
                  ? <Check className="w-4 h-4 text-green-400" />
                  : <Copy className="w-4 h-4" />
                }
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Modes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
        >
          {(ni?.modes || [
            { title: 'Cloud AI', desc: 'Instant. Uses cloud inference. Free. Default.', badge: 'Default' },
            { title: 'Hybrid', desc: 'Local + cloud. Better privacy.', badge: 'Balanced' },
            { title: 'Sovereign', desc: 'Fully local. ~10 GB. Max privacy.', badge: 'Advanced' },
          ]).map((mode: any, i: number) => (
            <div key={i} className="glass-institutional border border-[#D4AF37]/20 rounded-xl p-4 text-center">
              <div className="inline-block px-2 py-0.5 rounded text-xs bg-[#D4AF37]/10 text-[#D4AF37] mb-2">{mode.badge}</div>
              <p className="text-slate-100 font-semibold mb-1">{mode.title}</p>
              <p className="text-slate-400 text-sm">{mode.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Requirements + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-slate-500 text-sm">
            {ni?.requirements || 'Requires: Node.js ≥ 20 • Linux / macOS / Windows WSL • Raspberry Pi supported'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30 hover:bg-[#D4AF37]/30 hover:border-[#D4AF37]/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]" asChild>
              <a href={`${LINKS.github}/gstdbot`} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                {ni?.ctaGithub || 'View on GitHub'}
              </a>
            </Button>
            <Button variant="outline" className="border-white/10 text-white/70 hover:bg-white/5 hover:text-white" asChild>
              <a href={LINKS.telegram} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                {ni?.ctaTelegram || 'Node Operators Chat'}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
