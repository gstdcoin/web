'use client';

import { useLanguage } from '@/components/LanguageProvider';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, Coins, Shield, Zap, TrendingUp } from 'lucide-react';
import { TOKEN_INFO, LINKS } from '@/content/config';
import { copyToClipboard } from '@/lib/utils';

export default function TokenPage() {
  const { t } = useLanguage();

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
    <div className="min-h-screen bg-white">
      <PageHeader 
        title={t('tokenSectionTitle')} 
        subtitle={t('tokenBullets')[0]}
      />
      
      <main className="container mx-auto px-4 py-12">
        {/* Token Overview */}
        <section className="mb-16">
          <Card className="bg-white border-gold-200 shadow-gold">
            <CardHeader>
              <CardTitle className="text-3xl text-gold-600 flex items-center gap-2">
                {t('tokenSectionTitle')}
                <Badge className="bg-gold-500 text-white">{TOKEN_INFO.symbol}</Badge>
              </CardTitle>
              <CardDescription className="text-muted-light text-lg">
                {t('tokenBullets')[0]}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Token Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-muted-light mb-1">{t('tokenInfo.network')}</p>
                  <p className="font-semibold text-gold-600">{TOKEN_INFO.network}</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-muted-light mb-1">{t('tokenInfo.decimals')}</p>
                  <p className="font-semibold text-gold-600">{TOKEN_INFO.decimals}</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-muted-light mb-1">{t('tokenInfo.totalSupply')}</p>
                  <p className="font-semibold text-gold-600">{TOKEN_INFO.totalSupply}</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-muted-light mb-1">{t('tokenInfo.utility')}</p>
                  <p className="font-semibold text-gold-600">{t('tokenInfo.utilityValue')}</p>
                </div>
              </div>

              {/* Contract Address */}
              <div>
                <p className="text-sm text-muted-light mb-2">{t('tokenInfo.contractAddress')}</p>
                <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg border border-gold-200">
                  <code className="flex-1 text-sm font-mono text-gold-600 break-all">
                    {TOKEN_INFO.contractAddress}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCopyContract}
                    className="text-gold-600 hover:bg-gold-50"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="btn-gold flex-1" asChild>
                  <a href={LINKS.stonfiSwap} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t('tokenInfo.buyGSTD')}
                  </a>
                </Button>
                <Button variant="outline" className="btn-outline-gold flex-1" asChild>
                  <a href={LINKS.docs} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t('tokenInfo.investor')}
                  </a>
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
              <Card key={index} className="bg-white border-gold-200 hover:border-gold-300 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-light-bg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-light leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Token Economics */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-gradient-gold">{t('tokenInfo.tokenEconomics')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-gold-200">
              <CardHeader>
                <CardTitle className="text-lg text-light-bg">{t('tokenInfo.supplyDistribution')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-light">{t('tokenInfo.liquidity')}</span>
                    <span className="font-semibold text-gold-600">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-light">{t('tokenInfo.community')}</span>
                    <span className="font-semibold text-gold-600">40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-light">{t('tokenInfo.team')}</span>
                    <span className="font-semibold text-gold-600">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-light">{t('tokenInfo.reserve')}</span>
                    <span className="font-semibold text-gold-600">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gold-200">
              <CardHeader>
                <CardTitle className="text-lg text-light-bg">{t('tokenInfo.useCases')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                    <span className="text-muted-light">{t('tokenInfo.collateralForLoans')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                    <span className="text-muted-light">{t('tokenInfo.governanceVoting')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                    <span className="text-muted-light">{t('tokenInfo.feeDiscounts')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                    <span className="text-muted-light">{t('tokenInfo.stakingRewards')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gold-200">
              <CardHeader>
                <CardTitle className="text-lg text-light-bg">{t('tokenInfo.keyMetrics')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-light">{t('tokenInfo.maxSupply')}</span>
                    <span className="font-semibold text-gold-600">{t('tokenInfo.maxSupplyValue')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-light">{t('tokenInfo.solana')}</span>
                    <span className="font-semibold text-gold-600">{t('tokenInfo.solanaValue')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-light">{t('tokenInfo.xrpl')}</span>
                    <span className="font-semibold text-gold-600">{t('tokenInfo.xrplValue')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-light">{t('tokenInfo.network')}</span>
                    <span className="font-semibold text-gold-600">{t('tokenInfo.multichain')}</span>
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
