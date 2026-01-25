'use client';

import { useLanguage } from './LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Coins, Network, Server, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';

// Mock data - в будущем заменить на реальные API вызовы
const mockMetrics = {
  hashrate: { value: 1247.5, change: 5.2, unit: 'TH/s' },
  goldPool: { oz: 1247.5, usd: 2850000, changeOz: 12.5, changeUsd: 28500 },
  bridge: { status: 'operational', lastTx: '2 min ago' },
  nodes: { count: 247, uptime: 99.9, countries: 12 },
  tvl: { value: 12500000, change: 3.5, unit: 'USD' },
  goldBackingRatio: { value: 2.85, change: 0.15 },
  computationalPressure: { value: 68.5, change: 2.3, unit: '%' },
  pflopsPower: { value: 12.47, change: 0.52, unit: 'PFLOPS' },
  activeWorkers: { count: 12475, change: 247 },
};

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K';
  }
  return num.toFixed(2);
}

// Generate sparkline data (mock trend)
function generateSparklineData(value: number, change: number): number[] {
  const points = 20;
  const data: number[] = [];
  const baseValue = value * (1 - Math.abs(change) / 100);
  
  for (let i = 0; i < points; i++) {
    const progress = i / (points - 1);
    const variation = (Math.random() - 0.5) * 0.1;
    data.push(baseValue * (1 + progress * (change / 100) + variation));
  }
  
  return data;
}

// Render sparkline SVG
function Sparkline({ data, color = '#D4AF37' }: { data: number[]; color?: string }) {
  const width = 60;
  const height = 20;
  const padding = 2;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <svg width={width} height={height} className="opacity-70">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LiveNetworkStatus() {
  const { t } = useLanguage();
  const [metrics, setMetrics] = useState(mockMetrics);
  
  // Get network status translations
  const networkStatusTitle = t('networkStatus.title') as string;
  const networkStatusSubtitle = t('networkStatus.subtitle') as string;

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        hashrate: {
          ...prev.hashrate,
          value: prev.hashrate.value + (Math.random() - 0.5) * 10,
        },
        goldPool: {
          ...prev.goldPool,
          oz: prev.goldPool.oz + Math.random() * 0.5,
          usd: prev.goldPool.usd + Math.random() * 1000,
        },
        computationalPressure: {
          ...prev.computationalPressure,
          value: Math.max(0, Math.min(100, prev.computationalPressure.value + (Math.random() - 0.5) * 2)),
        },
        pflopsPower: {
          ...prev.pflopsPower,
          value: prev.pflopsPower.value + (Math.random() - 0.5) * 0.1,
        },
        activeWorkers: {
          ...prev.activeWorkers,
          count: prev.activeWorkers.count + Math.floor((Math.random() - 0.5) * 10),
        },
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Get metric labels from translations
  const metricLabels = t('networkStatus.metrics') as any;
  
  const metricsCards = [
    {
      icon: Activity,
      title: metricLabels?.hashrate?.label || 'Network Hashrate',
      value: `${metrics.hashrate.value.toFixed(1)} ${metrics.hashrate.unit}`,
      change: `+${metrics.hashrate.change}%`,
      changeType: 'positive' as const,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      sparklineData: generateSparklineData(metrics.hashrate.value, metrics.hashrate.change),
    },
    {
      icon: Coins,
      title: metricLabels?.goldPool?.label || 'Gold Pool',
      value: `${metrics.goldPool.oz.toFixed(2)} ${metricLabels?.goldPool?.unitOz || 'oz'}`,
      subValue: `$${formatNumber(metrics.goldPool.usd)}`,
      change: `+${metrics.goldPool.changeOz.toFixed(2)} ${metricLabels?.goldPool?.unitOz || 'oz'} (+$${formatNumber(metrics.goldPool.changeUsd)})`,
      changeType: 'positive' as const,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      sparklineData: generateSparklineData(metrics.goldPool.oz, metrics.goldPool.changeOz),
    },
    {
      icon: Network,
      title: metricLabels?.bridge?.label || 'Bridge Status',
      value: metrics.bridge.status,
      subValue: `${(t('networkStatus.lastTx') as string) || 'Last TX'}: ${metrics.bridge.lastTx}`,
      changeType: 'positive' as const,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
    },
    {
      icon: Server,
      title: metricLabels?.nodes?.label || 'Active Nodes',
      value: metrics.nodes.count.toString(),
      subValue: `${metrics.nodes.uptime}% ${(t('networkStatus.uptime') as string) || 'uptime'}`,
      change: `${metrics.nodes.countries} ${(t('networkStatus.countries') as string) || 'countries'}`,
      changeType: 'neutral' as const,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
    {
      icon: TrendingUp,
      title: metricLabels?.tvl?.label || 'Total Value Locked',
      value: `$${formatNumber(metrics.tvl.value)}`,
      change: `+${metrics.tvl.change}%`,
      changeType: 'positive' as const,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      sparklineData: generateSparklineData(metrics.tvl.value, metrics.tvl.change),
    },
    {
      icon: Coins,
      title: metricLabels?.goldBackingRatio?.label || 'Gold Backing Ratio',
      value: `${metrics.goldBackingRatio.value}%`,
      subValue: (t('networkStatus.perToken') as string) || 'per token',
      change: `+${metrics.goldBackingRatio.change}%`,
      changeType: 'positive' as const,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      sparklineData: generateSparklineData(metrics.goldBackingRatio.value, metrics.goldBackingRatio.change),
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">{networkStatusTitle}</span>
          </h2>
          <p className="text-xl text-muted-light max-w-3xl mx-auto">
            {networkStatusSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {metricsCards.map((metric, index) => {
            const IconComponent = metric.icon;
            
            return (
              <Card
                key={index}
                className={`group hover:shadow-gold-lg transition-all duration-300 border-white/10 hover:border-amber-500/30 bg-white/40 backdrop-blur-md`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${metric.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    {metric.changeType === 'positive' && (
                      <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Live
                      </Badge>
                    )}
                  </div>
                  
                  <CardTitle className="text-sm font-medium text-muted-light mb-2">
                    {metric.title}
                  </CardTitle>
                  
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-light-bg">
                      {metric.value}
                    </div>
                    {metric.subValue && (
                      <div className="text-sm text-muted-light">
                        {metric.subValue}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      {metric.change && (
                        <div className={`text-xs font-medium ${
                          metric.changeType === 'positive' ? 'text-green-600' : 'text-muted-light'
                        }`}>
                          {metric.change}
                        </div>
                      )}
                      {(metric as any).sparklineData && (
                        <Sparkline data={(metric as any).sparklineData} color="#D4AF37" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Live indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-sm">
            <div className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></div>
            Обновление в реальном времени • Последнее обновление: только что
          </div>
        </div>
      </div>
    </section>
  );
}
