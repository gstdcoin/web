'use client';

import { useLanguage } from './LanguageProvider';
import { Badge } from '@/components/ui/badge';
import { Server, Coins, Globe, ExternalLink, Copy, AlertTriangle, Activity, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TOKEN_INFO, LINKS } from '@/content/config';

const PLATFORM_API = 'https://app.gstdtoken.com/api/v1';

// /api/v1/nodes returns { nodes: [...], count: N }
// never fill with placeholder/simulated numbers if the fetch fails.
interface NetworkStats {
  active_workers: number;
  total_nodes: number;
  total_tasks: number;
  total_users: number;
  total_earned_gstd: number;
}

interface NodeRecord {
  last_seen?: string | number;
}

function toTimestamp(value: NodeRecord['last_seen']): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value < 1e12 ? value * 1000 : value;
  }
  if (typeof value === 'string' && value.trim()) {
    const numeric = Number(value);
    if (Number.isFinite(numeric)) return numeric < 1e12 ? numeric * 1000 : numeric;
    const parsed = Date.parse(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
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
  const [serviceAvailable, setServiceAvailable] = useState<boolean | null>(null);
  const [lastHeartbeat, setLastHeartbeat] = useState<number | null>(null);
  const [fetchedAt, setFetchedAt] = useState<Date | null>(null);

  useEffect(() => {
    let disposed = false;
    const fetchStats = async () => {
      try {
        const signal = AbortSignal.timeout(8000);
        const [statsResponse, healthResponse, nodesResponse] = await Promise.all([
          fetch(`${PLATFORM_API}/network/stats`, { cache: 'no-store', signal }),
          fetch(`${PLATFORM_API}/health`, { cache: 'no-store', signal }),
          fetch(`${PLATFORM_API}/nodes/list`, { cache: 'no-store', signal }),
        ]);
        if (!statsResponse.ok) throw new Error(`Network statistics returned HTTP ${statsResponse.status}`);
        const data = await statsResponse.json();
        if (!Number.isFinite(data.active_workers) || !Number.isFinite(data.total_nodes)) {
          throw new Error('Network statistics response is missing node counts');
        }
        const nodeData = nodesResponse.ok ? await nodesResponse.json() : null;
        const timestamps = (Array.isArray(nodeData?.nodes) ? nodeData.nodes : [])
          .map((node: NodeRecord) => toTimestamp(node.last_seen))
          .filter((timestamp: number | null): timestamp is number =>
            timestamp !== null && timestamp >= 0 && timestamp <= Date.now() + 60_000
          );
        const mostRecent = timestamps.length ? Math.max(...timestamps) : null;
        if (disposed) return;
        setStats({
          active_workers: data.active_workers,
          total_nodes: data.total_nodes,
          total_tasks: Number.isFinite(data.total_tasks) ? data.total_tasks : 0,
          total_users: Number.isFinite(data.total_users) ? data.total_users : 0,
          total_earned_gstd: Number.isFinite(data.total_gstd_paid) ? data.total_gstd_paid : 0,
        });
        setLastHeartbeat(mostRecent);
        setServiceAvailable(healthResponse.ok);
        setFetchedAt(new Date());
      } catch {
        if (!disposed) setServiceAvailable(false);
      }
    };
    void fetchStats();
    const interval = setInterval(fetchStats, 60_000);
    return () => {
      disposed = true;
      clearInterval(interval);
    };
  }, []);

  const nodesOnline = stats?.active_workers ?? null;
  const formatLastActivity = () => {
    if (lastHeartbeat === null) return 'No heartbeat data';
    const elapsed = Math.max(0, Math.floor((Date.now() - lastHeartbeat) / 60_000));
    if (elapsed < 1) return 'Just now';
    if (elapsed < 60) return `${elapsed} min ago`;
    const hours = Math.floor(elapsed / 60);
    if (hours < 24) return `${hours} hr ago`;
    return `${Math.floor(hours / 24)} d ago`;
  };
  const networkStatusTitle = t('networkStatus.title') as string;

  const CHAINS = [
    { name: 'TON', status: 'active', detail: 'Live — jetton, settlement, treasury' },
    { name: 'Solana', status: 'building', detail: 'Bridge in development, no live vault' },
    { name: 'XRPL', status: 'building', detail: 'Bridge in development, no live vault' },
  ];

  const PROTOCOL_STAGES = [
    { label: 'Node Network', status: 'live', badge: 'Live' },
    { label: 'On-chain Settlement', status: 'building', badge: 'Integration unverified' },
    { label: 'Fine-Tuning Pipeline', status: 'building', badge: 'Not verified' },
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
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full glass-institutional border text-xs ${
            serviceAvailable === true ? 'border-emerald-500/20 text-emerald-400'
            : serviceAvailable === false ? 'border-amber-500/20 text-amber-300'
            : 'border-white/10 text-slate-400'
          }`}>
            {serviceAvailable === true ? <CheckCircle2 className="w-3.5 h-3.5" />
              : serviceAvailable === false ? <AlertTriangle className="w-3.5 h-3.5" />
              : <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />}
            {serviceAvailable === true ? 'API online' : serviceAvailable === false ? 'API unavailable' : 'Checking API'}
            {fetchedAt ? ` · ${fetchedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}
          </div>
        </div>

        {serviceAvailable === false && (
          <div className="flex items-start gap-2.5 mb-6 rounded-xl border border-amber-500/25 bg-amber-500/5 px-4 py-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-amber-200/90 text-sm">
              {(t('networkStatus.unavailableNote') as string) || 'Live API data is unavailable. Previously received figures are retained and no simulated values are shown.'}
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
            <div className="text-xs text-slate-500">
              {stats ? `${stats.total_nodes} registered · heartbeat within platform window` : 'Mainnet · live API'}
            </div>
          </div>

          <div className="glass-institutional rounded-2xl border border-[#D4AF37]/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                <Activity className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <span className="text-xs text-slate-400 uppercase tracking-wide">Network activity</span>
            </div>
            <div className="text-2xl font-black text-slate-100 mb-1">
              {stats ? stats.total_tasks.toLocaleString() : '—'}
            </div>
            <div className="text-xs text-slate-500">
              {stats ? `${stats.total_users.toLocaleString()} registered users · ${stats.total_earned_gstd.toLocaleString(undefined, { maximumFractionDigits: 2 })} GSTD paid out` : 'Awaiting live API data'}
            </div>
            {stats && <div className="text-xs text-slate-500 mt-1">Last node heartbeat: {formatLastActivity()}</div>}
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
