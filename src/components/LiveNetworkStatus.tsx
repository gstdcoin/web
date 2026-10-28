'use client';

import { useLanguage } from './LanguageProvider';
import { Server, Coins, ExternalLink, Copy, AlertTriangle, Activity, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TOKEN_INFO, LINKS } from '@/content/config';

const PLATFORM_API = 'https://app.gstdtoken.com/api/v1';

interface NetworkStats {
  active_workers: number;
  total_nodes: number;
  total_tasks: number;
  total_users: number;
  total_earned_gstd: number;
}

const TEXT = {
  ru: {
    title: 'Статус сети',
    subtitle: 'Данные берутся из API платформы. Если API недоступен, цифры не показываются.',
    apiOnline: 'API доступен',
    apiDown: 'API недоступен',
    apiChecking: 'Проверка API',
    unavailable: 'Данные API сейчас недоступны. Симулированные цифры не показываются.',
    nodes: 'Нод онлайн',
    registered: 'зарегистрировано',
    earlyNote: 'Сейчас нет нод онлайн. Облачный резервный ИИ доступен только с вашего отдельного согласия.',
    activity: 'Выполнено задач',
    usersPaid: 'пользователей · выплачено GSTD:',
    supply: 'Максимальный выпуск',
    contract: 'Контракт (TON)',
    buy: 'Купить GSTD',
    copied: 'Скопировано',
  },
  en: {
    title: 'Network status',
    subtitle: 'Figures come from the platform API. If the API is unavailable, no numbers are shown.',
    apiOnline: 'API online',
    apiDown: 'API unavailable',
    apiChecking: 'Checking API',
    unavailable: 'API data is currently unavailable. No simulated values are shown.',
    nodes: 'Nodes online',
    registered: 'registered',
    earlyNote: 'No nodes are online. Cloud fallback is available only with your explicit consent.',
    activity: 'Tasks completed',
    usersPaid: 'users · GSTD paid out:',
    supply: 'Max supply',
    contract: 'Contract (TON)',
    buy: 'Buy GSTD',
    copied: 'Copied',
  },
} as const;

function CopyButton({ text, done }: { text: string; done: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="ml-1 text-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors"
      title="Copy"
    >
      {copied
        ? <span className="text-emerald-400 text-[10px] font-bold">{done}</span>
        : <Copy className="w-3 h-3" />
      }
    </button>
  );
}

export function LiveNetworkStatus() {
  const { language } = useLanguage();
  const tx = TEXT[language === 'en' ? 'en' : 'ru'];
  const [stats, setStats] = useState<NetworkStats | null>(null);
  const [serviceAvailable, setServiceAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let disposed = false;
    let inFlight = false;
    const fetchStats = async () => {
      if (document.hidden || inFlight) return;
      inFlight = true;
      try {
        const signal = AbortSignal.timeout(8000);
        const statsResponse = await fetch(`${PLATFORM_API}/network/stats`, { signal });
        if (!statsResponse.ok) throw new Error(`Network statistics returned HTTP ${statsResponse.status}`);
        const data = await statsResponse.json();
        if (!Number.isFinite(data.active_workers) || !Number.isFinite(data.total_nodes)) {
          throw new Error('Network statistics response is missing node counts');
        }
        if (disposed) return;
        setStats({
          active_workers: data.active_workers,
          total_nodes: data.total_nodes,
          total_tasks: Number.isFinite(data.total_tasks) ? data.total_tasks : 0,
          total_users: Number.isFinite(data.total_users) ? data.total_users : 0,
          total_earned_gstd: Number.isFinite(data.total_gstd_paid) ? data.total_gstd_paid : 0,
        });
        setServiceAvailable(true);
      } catch {
        if (!disposed) { setStats(null); setServiceAvailable(false); }
      } finally { inFlight = false; }
    };
    void fetchStats();
    const interval = setInterval(fetchStats, 120_000);
    return () => {
      disposed = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="py-12 md:py-16 bg-[#0A0A0A] border-y border-[#D4AF37]/10">
      <div className="container mx-auto px-4 max-w-7xl">

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100">{tx.title}</h2>
            <p className="text-sm text-slate-400 mt-1">{tx.subtitle}</p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full glass-institutional border text-xs ${
            serviceAvailable === true ? 'border-emerald-500/20 text-emerald-400'
            : serviceAvailable === false ? 'border-amber-500/20 text-amber-300'
            : 'border-white/10 text-slate-400'
          }`}>
            {serviceAvailable === true ? <CheckCircle2 className="w-3.5 h-3.5" />
              : serviceAvailable === false ? <AlertTriangle className="w-3.5 h-3.5" />
              : <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />}
            {serviceAvailable === true ? tx.apiOnline : serviceAvailable === false ? tx.apiDown : tx.apiChecking}
          </div>
        </div>

        {serviceAvailable === false && (
          <div className="flex items-start gap-2.5 mb-6 rounded-xl border border-amber-500/25 bg-amber-500/5 px-4 py-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-amber-200/90 text-sm">{tx.unavailable}</p>
          </div>
        )}

        {stats && stats.active_workers === 0 && (
          <div className="flex items-start gap-2.5 mb-6 rounded-xl border border-amber-500/25 bg-amber-500/5 px-4 py-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-amber-200/90 text-sm">{tx.earlyNote}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="glass-institutional rounded-2xl border border-[#D4AF37]/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                <Server className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <span className="text-xs text-slate-400 uppercase tracking-wide">{tx.nodes}</span>
            </div>
            <div className="text-3xl font-black text-[#D4AF37] mb-1">{stats ? stats.active_workers : '—'}</div>
            <div className="text-xs text-slate-500">{stats ? `${stats.total_nodes} ${tx.registered}` : ''}</div>
          </div>

          <div className="glass-institutional rounded-2xl border border-[#D4AF37]/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                <Activity className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <span className="text-xs text-slate-400 uppercase tracking-wide">{tx.activity}</span>
            </div>
            <div className="text-3xl font-black text-slate-100 mb-1">{stats ? stats.total_tasks.toLocaleString() : '—'}</div>
            <div className="text-xs text-slate-500">
              {stats ? `${stats.total_users.toLocaleString()} ${tx.usersPaid} ${stats.total_earned_gstd.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : ''}
            </div>
          </div>

          <div className="glass-institutional rounded-2xl border border-[#D4AF37]/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                <Coins className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <span className="text-xs text-slate-400 uppercase tracking-wide">{tx.supply}</span>
            </div>
            <div className="text-2xl font-black text-slate-100 mb-1">1,000,000,000</div>
            <div className="text-xs text-slate-500">{TOKEN_INFO.symbol} · {TOKEN_INFO.decimals} {language === 'en' ? 'decimals' : 'знаков после запятой'} · {TOKEN_INFO.network}</div>
          </div>
        </div>

        <div className="glass-institutional rounded-2xl border border-[#D4AF37]/15 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-0 flex-1">
            <span className="text-xs text-slate-500 uppercase tracking-wide flex-shrink-0">{tx.contract}</span>
            <div className="flex items-center gap-1 min-w-0">
              <code className="font-mono text-xs text-[#D4AF37]/80 truncate">{TOKEN_INFO.contractAddress}</code>
              <CopyButton text={TOKEN_INFO.contractAddress} done={tx.copied} />
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <a
              href={`https://tonviewer.com/${TOKEN_INFO.contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors border border-[#D4AF37]/20 rounded-lg px-3 py-1.5"
            >
              <ExternalLink className="w-3 h-3" /> TON Viewer
            </a>
            <a
              href={LINKS.stonfiSwap}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-semibold text-[#0A0A0A] bg-[#D4AF37] hover:bg-[#B8860B] transition-colors rounded-lg px-3 py-1.5"
            >
              {tx.buy} →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
