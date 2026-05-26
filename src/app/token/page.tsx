'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, Coins, Shield, Zap, TrendingUp } from 'lucide-react';
import { TOKEN_INFO, LINKS, PROOF_OF_RESERVE } from '@/content/config';
import { copyToClipboard } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function TokenPage() {
  const { t } = useLanguage();
  const [proofData, setProofData] = useState(PROOF_OF_RESERVE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch Proof of Reserve data from StonFi pool
    const fetchProofData = async () => {
      try {
        const response = await fetch('/api/stonfi-pool');
        const result = await response.json();
        
        if (result.success && result.data) {
          setProofData({
            ...PROOF_OF_RESERVE,
            goldBackingRatio: result.data.goldBackingRatio || PROOF_OF_RESERVE.goldBackingRatio,
            physicalGoldReserveOz: result.data.physicalGoldReserveOz || PROOF_OF_RESERVE.physicalGoldReserveOz,
            reserveValueUSD: result.data.reserveValueUSD || PROOF_OF_RESERVE.reserveValueUSD,
          });
        }
      } catch (error) {
        console.error('Error fetching proof data:', error);
        // Keep default values on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchProofData();
    // Refresh every 5 minutes
    const interval = setInterval(fetchProofData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyContract = async () => {
    await copyToClipboard(TOKEN_INFO.contractAddress);
  };

  const tokenFeatures = [
    {
      icon: Coins,
      title: t('token.features')[0],
      description: t('token.featureDescriptions')[0],
    },
    {
      icon: Shield,
      title: t('token.features')[1],
      description: t('token.featureDescriptions')[1],
    },
    {
      icon: Zap,
      title: t('token.features')[2],
      description: t('token.featureDescriptions')[2],
    },
    {
      icon: TrendingUp,
      title: t('token.features')[3],
      description: t('token.featureDescriptions')[3],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]">
      <PageHeader 
        title={t('tokenSectionTitle')} 
        subtitle={t('tokenBullets')[0]}
      />
      
      <main className="container mx-auto px-4 py-12">
        {/* Token Overview */}
        <section className="mb-16">
          <Card className="glass-institutional border-[#D4AF37]/20 shadow-gold card-mobile-full">
            <CardHeader>
              <CardTitle className="text-3xl text-[#D4AF37] flex items-center gap-2">
                {t('tokenSectionTitle')}
                <Badge className="bg-[#D4AF37] text-[#0A0A0A]">{TOKEN_INFO.symbol}</Badge>
              </CardTitle>
              <CardDescription className="text-slate-200 text-lg">
                {t('tokenBullets')[0]}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Token Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 glass-institutional border-[#D4AF37]/20 rounded-lg">
                  <p className="text-sm text-slate-200 mb-1 font-medium">{t('tokenInfo.network')}</p>
                  <p className="font-semibold text-[#D4AF37]">{TOKEN_INFO.network}</p>
                </div>
                <div className="text-center p-4 glass-institutional border-[#D4AF37]/20 rounded-lg">
                  <p className="text-sm text-slate-200 mb-1 font-medium">{t('tokenInfo.decimals')}</p>
                  <p className="font-semibold text-[#D4AF37]">{TOKEN_INFO.decimals}</p>
                </div>
                <div className="text-center p-4 glass-institutional border-[#D4AF37]/20 rounded-lg">
                  <p className="text-sm text-slate-200 mb-1 font-medium">{t('tokenInfo.totalSupply')}</p>
                  <p className="font-semibold text-[#D4AF37]">{TOKEN_INFO.totalSupply}</p>
                </div>
                <div className="text-center p-4 glass-institutional border-[#D4AF37]/20 rounded-lg">
                  <p className="text-sm text-slate-200 mb-1 font-medium">{t('tokenInfo.utility')}</p>
                  <p className="font-semibold text-[#D4AF37]">{t('tokenInfo.utilityValue')}</p>
                </div>
              </div>

              {/* Contract Address */}
              <div>
                <p className="text-sm text-slate-200 mb-2 font-medium">{t('tokenInfo.contractAddress')}</p>
                <div className="flex items-center space-x-2 p-3 glass-institutional border-[#D4AF37]/20 rounded-lg">
                  <code className="flex-1 text-sm font-mono text-[#D4AF37] break-all">
                    {TOKEN_INFO.contractAddress}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCopyContract}
                    className="text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 hover:border-green-500/50 flex-1" asChild>
                  <a href={LINKS.buyGSDT} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t('tokenInfo.buyGSTD')}
                  </a>
                </Button>
                <Button variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 hover:border-green-500/50 flex-1" asChild>
                  <Link href="/advantages">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t('tokenInfo.advantages')}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Token Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-gradient-gold">{t('token.featuresTitle')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tokenFeatures.map((feature, index) => (
              <Card key={index} className="glass-institutional border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 card-mobile-full text-center">
                <CardHeader className="text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B8860B] flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-[#0A0A0A]" />
                    </div>
                    <CardTitle className="text-xl text-slate-100">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-200 leading-relaxed text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Proof of Reserve */}
        <section className="mb-16">
          <Card className="glass-institutional border-[#D4AF37]/20 hover:border-[#D4AF37]/40 shadow-lg card-mobile-full">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-100 flex items-center gap-2">
                <Shield className="w-6 h-6 text-[#D4AF37]" />
                {t('tokenInfo.proofOfReserve')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-slate-200 leading-relaxed" style={{ lineHeight: '1.7' }}>
                  {t('tokenInfo.proofOfReserveDescription')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 glass-institutional border-[#D4AF37]/20 rounded-lg">
                  <div className="text-center relative">
                    {isLoading ? (
                      <div className="text-2xl font-bold text-[#D4AF37] mb-1">...</div>
                    ) : (
                      <div className="text-2xl font-bold text-[#D4AF37] mb-1">{proofData.goldBackingRatio.toFixed(2)}%</div>
                    )}
                    <div className="text-sm text-slate-200 mb-2 font-medium">
                      {t('tokenInfo.goldBackingRatio') || 'Коэффициент золотого обеспечения'}
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mt-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400 font-medium">{t('tokenInfo.verifiedViaOracle') || 'Verified via Oracle'}</span>
                    </div>
                  </div>
                  <div className="text-center relative">
                    {isLoading ? (
                      <div className="text-2xl font-bold text-[#D4AF37] mb-1">...</div>
                    ) : (
                      <div className="text-2xl font-bold text-[#D4AF37] mb-1">{proofData.physicalGoldReserveOz.toLocaleString('en-US', { maximumFractionDigits: 1 })} oz</div>
                    )}
                    <div className="text-sm text-slate-200 mb-2 font-medium">
                      {t('tokenInfo.physicalGoldReserve') || 'Физический золотой резерв'}
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mt-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400 font-medium">{t('tokenInfo.verifiedViaOracle') || 'Verified via Oracle'}</span>
                    </div>
                  </div>
                  <div className="text-center relative">
                    {isLoading ? (
                      <div className="text-2xl font-bold text-[#D4AF37] mb-1">...</div>
                    ) : (
                      <div className="text-2xl font-bold text-[#D4AF37] mb-1">
                        ${(proofData.reserveValueUSD / 1000000).toFixed(2)}M
                      </div>
                    )}
                    <div className="text-sm text-slate-200 mb-2 font-medium">
                      {t('tokenInfo.reserveValue') || 'Стоимость резерва (USD)'}
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mt-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400">{t('tokenInfo.verifiedViaOracle') || 'Verified via Oracle'}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 glass-institutional border-[#D4AF37]/20 rounded-lg">
                    <p className="text-xs font-semibold text-[#D4AF37] mb-1">
                      {t('tokenInfo.proofOfReserveAuditor') || 'Independent Custodian Audit (Tether Gold Support)'}
                    </p>
                    <p className="text-xs text-slate-200" style={{ lineHeight: '1.7' }}>
                      {t('tokenInfo.proofOfReserveUpdate') || 'Обновляется каждые 24 часа. Все активы верифицированы в сетях TON, Solana и XRPL.'}
                    </p>
                  </div>
                  <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-lg">
                    <p className="text-sm text-slate-200 italic" style={{ lineHeight: '1.7' }}>
                      {t('tokenInfo.proofOfReserveNote')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Token Economics */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-gradient-gold">{t('tokenInfo.tokenEconomics')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-institutional border-[#D4AF37]/20 hover:border-[#D4AF37]/40 card-mobile-full">
              <CardHeader>
                <CardTitle className="text-lg text-slate-100">{t('tokenInfo.supplyDistribution')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-200">{t('tokenInfo.liquidity')}</span>
                    <span className="font-semibold text-[#D4AF37]">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-200">{t('tokenInfo.community')}</span>
                    <span className="font-semibold text-[#D4AF37]">40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-200">{t('tokenInfo.team')}</span>
                    <span className="font-semibold text-[#D4AF37]">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-200">{t('tokenInfo.reserve')}</span>
                    <span className="font-semibold text-[#D4AF37]">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-institutional border-[#D4AF37]/20 hover:border-[#D4AF37]/40 card-mobile-full">
              <CardHeader>
                <CardTitle className="text-lg text-slate-100">{t('tokenInfo.useCases')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                    <span className="text-slate-200">{t('tokenInfo.collateralForLoans')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                    <span className="text-slate-200">{t('tokenInfo.governanceVoting')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                    <span className="text-slate-200">{t('tokenInfo.feeDiscounts')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                    <span className="text-slate-200">{t('tokenInfo.stakingRewards')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-institutional border-[#D4AF37]/20 hover:border-[#D4AF37]/40 card-mobile-full">
              <CardHeader>
                <CardTitle className="text-lg text-slate-100">{t('tokenInfo.keyMetrics')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-200">{t('tokenInfo.maxSupply')}</span>
                    <span className="font-semibold text-[#D4AF37]">{t('tokenInfo.maxSupplyValue')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-200">{t('tokenInfo.solana')}</span>
                    <span className="font-semibold text-[#D4AF37]">{t('tokenInfo.solanaValue')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-200">{t('tokenInfo.xrpl')}</span>
                    <span className="font-semibold text-[#D4AF37]">{t('tokenInfo.xrplValue')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-200">{t('tokenInfo.network')}</span>
                    <span className="font-semibold text-[#D4AF37]">{t('tokenInfo.multichain')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
