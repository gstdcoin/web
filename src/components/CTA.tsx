'use client';

import { useLanguage } from './LanguageProvider';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { LINKS } from '@/content/config';
import Link from 'next/link';

export function CTA() {
  const { language } = useLanguage();
  const ru = language !== 'en';

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]" style={{ '--section-padding': '5rem' } as React.CSSProperties}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-gold">{ru ? 'Начните с полезного вопроса' : 'Start with a useful question'}</span>
          </h2>
          <p className="text-sm md:text-base text-slate-200 mb-12">
            {ru ? 'Попробуйте ИИ, затем подключите компьютер или создайте своё приложение.' : 'Try AI, then connect a computer or build your own application.'}
          </p>

          <p className="text-slate-300 mb-6">
            {ru?'Круговорот GSTD: оплатить вычисления → выполнить принятое задание → использовать заработанное на других нодах. 85% получает исполнитель, 10% — протокол, 5% — резерв. Бесплатные запросы не создают токены.':'GSTD cycle: pay for compute → complete accepted work → use earned credits on other nodes. Executor 85%, protocol 10%, reserve 5%. Free requests do not create tokens.'}
          </p>
          <p className="mb-6"><a className="text-[#D4AF37] underline" href="https://app.gstdtoken.com/payments">{ru?'Баланс, пополнение и вывод GSTD':'GSTD balance, deposits and withdrawals'} ↗</a></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30 hover:bg-[#D4AF37]/30 hover:border-[#D4AF37]/50 group hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]" asChild>
              <Link href="/ai">
                {ru ? 'Открыть чат' : 'Open chat'}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 text-white/70 hover:bg-white/5 hover:text-white" asChild>
              <a href={LINKS.telegramBot} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                {ru ? 'Открыть Telegram-бота' : 'Open Telegram bot'}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
