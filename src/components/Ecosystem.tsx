'use client';

import { useLanguage } from './LanguageProvider';
import { ArrowUpRight, Cpu, Activity, MessageSquare, Brain } from 'lucide-react';
import { LINKS } from '@/content/config';
import { cn } from '@/lib/utils';

export function Ecosystem() {
    const { t } = useLanguage();

    const apps = [
        {
            title: t('ecosystem.app.title'),
            description: t('ecosystem.app.description'),
            cta: t('ecosystem.app.cta') as string,
            url: LINKS.app,
            icon: Cpu,
            color: "from-blue-500/20 to-cyan-500/20",
            borderColor: "group-hover:border-blue-500/50",
            textColor: "text-blue-400"
        },
        {
            title: t('ecosystem.monitor.title'),
            description: t('ecosystem.monitor.description'),
            cta: t('ecosystem.monitor.cta') as string,
            url: LINKS.monitor,
            icon: Activity,
            color: "from-[#D4AF37]/20 to-yellow-500/20",
            borderColor: "group-hover:border-[#D4AF37]/50",
            textColor: "text-[#D4AF37]"
        },
        {
            title: t('ecosystem.chat.title'),
            description: t('ecosystem.chat.description'),
            cta: t('ecosystem.chat.cta') as string,
            url: LINKS.chat,
            icon: MessageSquare,
            color: "from-purple-500/20 to-pink-500/20",
            borderColor: "group-hover:border-purple-500/50",
            textColor: "text-purple-400"
        },
        {
            title: t('ecosystem.finetune.title'),
            description: t('ecosystem.finetune.description'),
            cta: t('ecosystem.finetune.cta') as string,
            url: 'https://app.gstdtoken.com/training',
            icon: Brain,
            color: "from-violet-500/20 to-indigo-500/20",
            borderColor: "group-hover:border-violet-500/50",
            textColor: "text-violet-400",
            badge: '✨ New',
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-[#0A0A0A]">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#D4AF37]/5 to-transparent opacity-50 pointer-events-none" />

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="text-center mb-16 animate-slide-up">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        <span className="text-gradient-gold">{t('ecosystem.title')}</span>
                    </h2>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        {t('ecosystem.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {apps.map((app, index) => (
                        <a
                            key={index}
                            href={app.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "group relative block overflow-hidden rounded-2xl p-1 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)]",
                                "bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] border border-white/5",
                                app.borderColor
                            )}
                            style={{ animationDelay: `${index * 0.15 + 0.2}s` }}
                        >
                            {/* Animated Glow */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none">
                                <div className={cn("absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-current to-transparent", app.textColor)} />
                                <div className={cn("absolute -inset-1 blur-2xl opacity-20 bg-gradient-to-r", app.color)} />
                            </div>

                            <div className="relative h-full bg-[#111]/80 backdrop-blur-xl rounded-xl p-8 border border-white/5 flex flex-col items-start z-10">
                                <div className={cn("mb-6 p-4 rounded-xl bg-gradient-to-br border border-white/5", app.color)}>
                                    <app.icon className={cn("w-8 h-8", app.textColor)} />
                                </div>

                                <div className="flex items-center gap-3 mb-3">
                                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">
                                        {app.title}
                                    </h3>
                                    {(app as any).badge && (
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30">
                                            {(app as any).badge}
                                        </span>
                                    )}
                                </div>

                                <p className="text-slate-400 text-sm md:text-base mb-8 leading-relaxed flex-grow">
                                    {app.description}
                                </p>

                                <div className="mt-auto flex items-center text-sm font-semibold tracking-wide uppercase text-white/50 group-hover:text-white transition-colors duration-300">
                                    {app.cta}
                                    <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
