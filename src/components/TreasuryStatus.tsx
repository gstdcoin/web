'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import {publicFinanceView,type PublicFinance} from '@/lib/publicFinance';

const PLATFORM_API = 'https://app.gstdtoken.com/api/v1';


const TEXT = {
  ru: {
    title: 'Казна',
    subtitle: 'Данные из API платформы. Ничего не симулируется: если API недоступен, цифры не показываются.',
    balance: 'Баланс казны, GSTD',
    reserve: 'Резерв протокола, GSTD',
    payments: 'Платежи и вывод',
    unavailable: 'Данные казны сейчас недоступны.',
    notesTitle: 'Что важно знать',
    notes: [
      'Казна ведётся в учёте платформы (внутренний реестр). Автоматического расчёта через смарт-контракт в сети TON сейчас нет.',
      'Выкуп (buyback) и сжигание токена пока не выполнялись.',
      'За принятую оплаченную работу: 85% исполнителю, 10% протоколу, 5% резерву. Получение и вывод не удерживают дополнительную комиссию GSTD.',
      'Платные балансы обеспечиваются GSTD на кошельке обеспечения. Вывод подписывает его владелец и оплачивает газ TON. Промозапросы не создают выводимые токены.',
    ],
  },
  en: {
    title: 'Treasury',
    subtitle: 'Data from the platform API. Nothing is simulated: if the API is unavailable, no numbers are shown.',
    balance: 'Treasury balance, GSTD',
    reserve: 'Protocol reserve, GSTD',
    payments: 'Payments and withdrawals',
    unavailable: 'Treasury data is currently unavailable.',
    notesTitle: 'Good to know',
    notes: [
      'The treasury is tracked in the platform ledger (internal registry). There is currently no automatic settlement through a TON smart contract.',
      'No token buyback or burn has been executed yet.',
      'Accepted paid work allocates 85% to the executor, 10% to the protocol and 5% to the reserve. There is no additional GSTD claim or withdrawal fee.',
      'Paid credit is backed by GSTD held in custody. The custody owner signs withdrawals and pays TON execution costs. Promo requests do not create withdrawable tokens.',
    ],
  },
} as const;

export function TreasuryStatus() {
  const { language } = useLanguage();
  const tx = TEXT[language === 'en' ? 'en' : 'ru'];
  const [fund, setFund] = useState<PublicFinance | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let disposed = false;
    fetch(`${PLATFORM_API}/fund/status`, { signal: AbortSignal.timeout(8000) })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((d) => {
        if (disposed) return;
        const current=publicFinanceView(d);
        if(!current)throw new Error('Unexpected finance ledger response');
        setFund(current);
      })
      .catch(() => {
        if (!disposed) setFailed(true);
      });
    return () => {
      disposed = true;
    };
  }, []);

  const fmt = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 4 });
  const cards = [
    { label: tx.balance, value: fund?.treasury_gstd },
    { label: tx.reserve, value: fund?.reserve_gstd },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-center">
          <span className="text-gradient-gold">{tx.title}</span>
        </h1>
        <p className="text-slate-400 text-center mb-10">{tx.subtitle}</p>

        {failed && (
          <div className="flex items-start gap-2.5 mb-6 rounded-xl border border-amber-500/25 bg-amber-500/5 px-4 py-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-amber-200/90 text-sm">{tx.unavailable}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {cards.map((c) => (
            <div key={c.label} className="glass-institutional rounded-2xl border border-[#D4AF37]/20 p-5">
              <div className="text-xs text-slate-400 uppercase tracking-wide mb-2">{c.label}</div>
              <div className="text-2xl font-black text-[#D4AF37]">{c.value === undefined ? '—' : fmt(c.value)}</div>
            </div>
          ))}
        </div>

        <a className="inline-block text-[#D4AF37] underline mb-6" href="https://app.gstdtoken.com/payments">{tx.payments} →</a>

        <div className="glass-institutional rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-bold text-slate-100 mb-3">{tx.notesTitle}</h2>
          <ul className="space-y-2 text-sm text-slate-300 list-disc pl-5">
            {tx.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
