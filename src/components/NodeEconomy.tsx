'use client';

import { useLanguage } from './LanguageProvider';
import { Button } from '@/components/ui/button';
import { Laptop, Monitor, Gamepad2, Cpu, Server, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { NODE_TIERS } from '@/content/config';

const DEVICE_ICONS = [Laptop, Monitor, Gamepad2, Cpu, Server, Zap];

export function NodeEconomy() {
  const { t } = useLanguage();
  const ne = t('nodeEconomy') as any;
  const devices = (ne?.devices as string[]) || [];
  const resources = (ne?.resources as string[]) || [];
  const workflow = (ne?.workflow as string[]) || [];

  return (
    <section className="py-16 md:py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full glass-institutional border-[#D4AF37]/30 text-[#D4AF37] text-xs font-medium mb-6">
            {ne?.badge || 'Node software · open source'}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">{ne?.title || 'Your Hardware Can Become Part of the Network'}</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
            {ne?.subtitle}
          </p>
        </motion.div>

        {/* Devices → Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <div className="glass-institutional rounded-2xl border border-[#D4AF37]/20 p-6">
            <div className="text-xs text-slate-500 uppercase tracking-widest mb-4">Hardware</div>
            <div className="grid grid-cols-2 gap-3">
              {devices.map((device, i) => {
                const Icon = DEVICE_ICONS[i] || Cpu;
                return (
                  <div key={device} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#111111] border border-white/5">
                    <Icon className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span className="text-sm text-slate-200">{device}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="glass-institutional rounded-2xl border border-[#D4AF37]/20 p-6">
            <div className="text-xs text-slate-500 uppercase tracking-widest mb-4">Resources</div>
            <div className="flex flex-wrap gap-2">
              {resources.map((res) => (
                <span key={res} className="px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] text-sm font-medium">
                  {res}
                </span>
              ))}
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-widest mb-3 mt-6">Hardware Tiers</div>
            <div className="space-y-1.5">
              {NODE_TIERS.map((tier) => (
                <div key={tier.name} className="flex items-center justify-between text-sm">
                  <span className="text-slate-200 font-medium">{tier.name}</span>
                  <span className="text-slate-500 font-mono text-xs">{tier.multiplier}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Workflow */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10">
          {workflow.map((step, i) => (
            <div key={step} className="flex items-center gap-2 md:gap-3">
              <div className="px-4 py-2 rounded-full glass-institutional border-[#D4AF37]/25 text-sm text-slate-200 whitespace-nowrap">
                {step}
              </div>
              {i < workflow.length - 1 && <ArrowRight className="w-4 h-4 text-[#D4AF37]/50 flex-shrink-0" />}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#B8860B] font-semibold" asChild>
            <a href="/nodes">{ne?.cta || 'Run a Node'}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
