'use client';

import { useLanguage } from './LanguageProvider';
import { Badge } from '@/components/ui/badge';
import { Server, Coins, Globe, ExternalLink, Copy, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TOKEN_INFO, LINKS } from '@/content/config';

const PLATFORM_API = 'https://platform.gstdtoken.com/api/v1';

// /api/v1/nodes returns { nodes: [...], count: N }
// never fill with placeholder/simulated numbers if the fetch fails.
interface NetworkStats {
  nodes_online: number;
  total_tasks_completed: number;
}

function CopyButton({ text }: { text: string }) {
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
        ? <span className="text-emerald-400 text-[10px] font-bold">Copied!</span>
        : <Copy className="w-3 h-3" />
      }
    </button>
  );
}

export function LiveNetworkStatus() {
  const { t } = useLanguage();
  const [stats, setStats] = useState<NetworkStats | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${PLATFORM_API}/nodes`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          const nodes: any[] = data.nodes || [];
          const mapped: NetworkStats = {
            nodes_online: data.count ?? nodes.length,
            total_tasks_completed: nodes.reduce((s: number, n: any) => s + (n.tasks_completed || 0), 0),
          };
          setStats(mapped);
          setUnavailable(false);
          setFetchedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        } else {
          setUnavailable(true);
        }
      } catch (_e) {
        setUnavailable(true);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 60_000);
    return () => clearInterval(interval);
  }, []);

  const nodesOnline = stats?.nodes_online ?? null;
  const networkStatusTitle = t('networkStatus.title') as string;

  const CHAINS = [
    { name: 'TON', status: 'active', detail: 'Live — jetton, settlement, treasury' },
    { name: 'Solana', status: 'building', detail: 'Bridge in development, no live vault' },
    { name: 'XRPL', status: 'building', detail: 'Bridge in development, no live vault' },
  ];

  const PROTOCOL_STAGES = [
    { label: 'Node Network', status: 'live', badge: 'Live' },
    { label: 'On-chain Settlement', status: 'live', badge: 'Live (85/10/5)' },
    { label: 'Fine-Tuning Pipeline', status: 'live', badge: 'Live, limited' },
    { label: 'Cross-chain Bridge', status: 'building', badge: 'In Development' },
  ];

  const stageColor = (s: string) =>
    s === 'live' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    : s === 'building' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    : 'bg-slate-500/20 text-slate-400 border-slate-500/30';

  return (
    <section className="py-12 md:py-16 bg-[#0A0A0A] border-y border-[#D4AF37]/10">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100">
              {networkStatusTitle}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Real-time protocol metrics &mdash; Mainnet
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-institutional border-[#D4AF37]/20 text-xs text-[#D4AF37]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D4AF37]" />
            </span>
            Live{fetchedAt ? ` · ${fetchedAt}` : ''}
          </div>
        </div>

        {unavailable && (
          <div className="flex items-start gap-2.5 mb-6 rounded-xl border border-amber-500/25 bg-amber-500/5 px-4 py-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-amber-200/90 text-sm">
              {(t('networkStatus.unavailableNote') as string) || 'The live API is temporarily unreachable. This panel never shows simulated numbers.'}
            </p>
          </div>
        )}

        {/* Main metrics row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          {/* Active Nodes — REAL data */}
          <div className="glass-institutional rounded-2xl border border-[#D4AF37]/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                <Server className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <span className="text-xs text-slate-400 uppercase tracking-wide">Active Nodes</span>
            </div>
            <div className="text-3xl font-black text-[#D4AF37] mb-1">
              {nodesOnline !== null ? nodesOnline : '—'}
            </div>
            <div className="text-xs text-slate-500">Mainnet · distributed</div>
          </div>

          {/* Token Supply — real from config */}
          <div className="glass-institutional rounded-2xl border border-[#D4AF37]/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                <Coins className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <span className="text-xs text-slate-400 uppercase tracking-wide">Max Supply</span>
            </div>
            <div className="text-2xl font-black text-slate-100 mb-1">
              1,000,000,000
            </div>
            <div className="text-xs text-slate-500">{TOKEN_INFO.symbol} · {TOKEN_INFO.decimals} decimals · {TOKEN_INFO.network}</div>
          </div>

          {/* Cross-chain — real from config */}
          <div className="glass-institutional rounded-2xl border border-[#D4AF37]/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                <Globe className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <span className="text-xs text-slate-400 uppercase tracking-wide">Networks</span>
            </div>
            <div className="space-y-1.5 mt-1">
              {CHAINS.map((chain) => (
                <div key={chain.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${chain.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    <span className="text-xs font-semibold text-slate-200">{chain.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{chain.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Protocol Stage — honest transparency */}
          <div className="glass-institutional rounded-2xl border border-[#D4AF37]/20 p-5">
            <div className="text-xs text-slate-400 uppercase tracking-wide mb-3">Protocol Stages</div>
            <div className="space-y-2">
              {PROTOCOL_STAGES.map((stage) => (
                <div key={stage.label} className="flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-300 truncate">{stage.label}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${stageColor(stage.status)}`}>
                    {stage.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contract Address row */}
        <div className="glass-institutional rounded-2xl border border-[#D4AF37]/15 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-0 flex-1">
            <span className="text-xs text-slate-500 uppercase tracking-wide flex-shrink-0">Contract (TON)</span>
            <div className="flex items-center gap-1 min-w-0">
              <code className="font-mono text-xs text-[#D4AF37]/80 truncate">
                {TOKEN_INFO.contractAddress}
              </code>
              <CopyButton text={TOKEN_INFO.contractAddress} />
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
              Buy GSTD →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
