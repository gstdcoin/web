'use client';

import { useLanguage } from './LanguageProvider';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Cpu, Network, CheckCircle, Circle } from 'lucide-react';
import { LINKS, TOKEN_INFO } from '@/content/config';
import Link from 'next/link';

const STATUS_ITEMS = [
  { icon: CheckCircle, color: 'text-emerald-400', label: 'Node Network', sub: 'Live on Mainnet' },
  { icon: CheckCircle, color: 'text-emerald-400', label: 'On-Chain Settlement', sub: 'Live (SettlementMaster)' },
  { icon: CheckCircle, color: 'text-emerald-400', label: 'Fine-Tuning Pipeline', sub: 'Live, limited models' },
  { icon: Circle, color: 'text-slate-500', label: 'Cross-Chain Bridge', sub: 'In development' },
];

export function Hero() {
  const { t } = useLanguage();
  const tags = (t('hero.tags') as unknown as string[]) || [];
  const tagIcons = [Network, Network, Cpu, Cpu, Github];

  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#0f0f1a] to-[#0A0A0A]">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#D4AF37]/3 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 max-w-7xl py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Left: Content */}
          <div className="text-left space-y-7 md:space-y-8">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-institutional border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold tracking-wide">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D4AF37]" />
              </span>
              {t('hero.badge')}
            </div>

            {/* Main Heading */}
            <h1 className="hero-title text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gradient-gold">{t('hero.title')}</span>
            </h1>

            {/* Quote line */}
            <p className="text-lg md:text-xl text-slate-200 max-w-xl italic border-l-2 border-[#D4AF37]/40 pl-4">
              {t('hero.quote')}
            </p>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-slate-300 max-w-xl leading-relaxed font-medium">
              {t('hero.subtitle')}
            </p>
            <p className="text-sm md:text-base text-slate-400 max-w-xl leading-relaxed">
              {t('hero.longDescription')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Button
                className="bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#B8860B] font-semibold group w-full sm:w-auto shadow-[0_0_24px_rgba(212,175,55,0.3)] hover:shadow-[0_0_32px_rgba(212,175,55,0.5)] transition-all"
                asChild
              >
                <Link href="/nodes">
                  {t('hero.deployNode')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50 w-full sm:w-auto"
                asChild
              >
                <a href={LINKS.platform} target="_blank" rel="noopener noreferrer">
                  {t('hero.useNetwork')}
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-white/15 text-white/80 hover:bg-white/5 hover:border-white/30 w-full sm:w-auto"
                asChild
              >
                <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  {t('hero.viewGithub')}
                </a>
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => {
                const IconComponent = tagIcons[index] || Network;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-institutional border-[#D4AF37]/15 text-slate-300 text-xs font-medium"
                  >
                    <IconComponent className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
                    <span>{tag}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Token Overview Card */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-full max-w-sm glass-institutional rounded-2xl border border-[#D4AF37]/20 p-6 space-y-5 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">

              {/* Card header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center shadow-md">
                    <span className="text-[#0A0A0A] font-black text-sm">G</span>
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">GSTD Token</div>
                    <div className="text-xs text-[#D4AF37]/80">DePIN · AI Compute</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/20 uppercase tracking-wide">
                  Phase 1
                </span>
              </div>

              <div className="border-t border-[#D4AF37]/10" />

              {/* Key metrics grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: 'Max Supply', value: '1,000,000,000', unit: 'GSTD' },
                  { label: 'Network', value: TOKEN_INFO.network, unit: 'Blockchain' },
                  { label: 'Category', value: 'AI Compute', unit: 'Sector' },
                  { label: 'Live Chain', value: 'TON', unit: 'Bridge in dev.' },
                ].map((item) => (
                  <div key={item.label} className="bg-[#111111] rounded-xl p-3 border border-white/5">
                    <div className="text-[10px] text-slate-500 mb-0.5 uppercase tracking-wide">{item.label}</div>
                    <div className="font-bold text-[#D4AF37] text-sm leading-tight">{item.value}</div>
                    <div className="text-[10px] text-slate-600">{item.unit}</div>
                  </div>
                ))}
              </div>

              {/* Protocol Status — honest, no fake data */}
              <div className="space-y-2">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Protocol Status</div>
                {STATUS_ITEMS.map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5 py-1.5 border-b border-white/5 last:border-0">
                    <item.icon className={`w-3.5 h-3.5 flex-shrink-0 ${item.color}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-slate-300 font-medium">{item.label}</div>
                    </div>
                    <span className={`text-[10px] font-semibold ${item.color} whitespace-nowrap`}>{item.sub}</span>
                  </div>
                ))}
              </div>

              {/* Contract address */}
              <div className="bg-[#111111] rounded-xl px-3 py-2 border border-white/5">
                <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-wide">Contract (TON)</div>
                <div className="font-mono text-[10px] text-[#D4AF37]/80 truncate">{TOKEN_INFO.contractAddress}</div>
              </div>

              {/* Buy button */}
              <a
                href={LINKS.stonfiSwap}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#0A0A0A] font-bold text-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all hover:opacity-90"
              >
                Buy GSTD on STON.fi →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
