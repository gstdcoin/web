'use client';

import { useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { Button } from '@/components/ui/button';
import { Copy, Check, Terminal, Github, ExternalLink } from 'lucide-react';
import { LINKS } from '@/content/config';
import { motion } from 'framer-motion';

const INSTALL_CMD = 'curl -fsSL https://raw.githubusercontent.com/gstdcoin/gstdbot/main/install.sh | bash';

export function NodeInstall() {
  const { t, language } = useLanguage();
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
            <span className="text-gradient-gold">{ni?.title || 'Run a Node'}</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
            {ni?.subtitle || 'Install on Linux or WSL2. Model download time depends on your connection. Rewards require funded accepted work.'}
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
                aria-label={language === 'ru' ? 'Скопировать команду установки' : 'Copy installation command'}
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

        <div className="glass-institutional rounded-2xl border border-[#D4AF37]/20 p-6 mb-8">
          <h3 className="text-xl font-semibold mb-3">{language === 'ru' ? 'После установки' : 'After installation'}</h3>
          <ol className="list-decimal pl-5 space-y-2 text-slate-300 text-sm">
            <li>{language === 'ru' ? 'Откройте адрес панели, указанный установщиком. По умолчанию: http://localhost:8080; на существующей установке порт может отличаться.' : 'Open the dashboard address printed by the installer. Default: http://localhost:8080; an existing installation may use another port.'}</li>
            <li>{language === 'ru' ? 'Настройте PIN с токеном первого запуска на машине. В панели укажите публичный TON-адрес для новых начислений. Seed-фраза не нужна.' : 'Set up a PIN using the machine’s first-run setup token. Enter a public TON address for future earnings in the dashboard. No seed phrase is needed.'}</li>
            <li>{language === 'ru' ? 'В разделе «Локальные модели» скачайте модель Ollama по имени и проверьте её в чате. Загрузка расходует трафик, диск и RAM при запуске.' : 'Download an Ollama model by name under Local models and test it in chat. Downloads use bandwidth and disk; running models use RAM.'}</li>
            <li>{language === 'ru' ? 'Панель показывает CPU, RAM, занятые слоты и регистрацию. Обновление ноды запускается вручную; учёт наград и вывод находятся на платформе.' : 'The dashboard shows CPU, RAM, active slots and registration. Node updates are manual; reward accounting and withdrawals are on the platform.'}</li>
          </ol>
          <a className="inline-block mt-4 text-[#D4AF37] underline" href="https://github.com/gstdcoin/gstdbot/blob/main/docs/OPERATOR_PANEL.md" target="_blank" rel="noreferrer">{language === 'ru' ? 'Подробная инструкция оператора ↗' : 'Detailed operator guide ↗'}</a>
        </div>

        {/* Modes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
        >
          {(ni?.modes || [
            { title: 'Local AI', desc: 'Run an installed model locally.', badge: 'Default' },
            { title: 'GSTD network', desc: 'Allow another node explicitly.', badge: 'Optional' },
            { title: 'Paid work', desc: '85% of funded accepted work.', badge: 'GSTD' },
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
