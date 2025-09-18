'use client';

import { useLanguage } from './LanguageProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink } from 'lucide-react';
import { TOKEN_INFO, LINKS } from '@/content/config';
import { copyToClipboard } from '@/lib/utils';

export function TokenCard() {
  const { t } = useLanguage();

  const handleCopyContract = async () => {
    await copyToClipboard(TOKEN_INFO.contractAddress);
    // You could add a toast notification here
  };

  return (
    <Card className="bg-white border-gold-200 shadow-gold">
      <CardHeader>
        <CardTitle className="text-2xl text-gold-600 flex items-center gap-2">
          {t('tokenSectionTitle')}
          <Badge className="bg-gold-500 text-white">{TOKEN_INFO.symbol}</Badge>
        </CardTitle>
        <CardDescription className="text-muted-light">
          {t('tokenBullets')[0]}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Token Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-light">Network</p>
            <p className="font-semibold text-gold-600">{TOKEN_INFO.network}</p>
          </div>
          <div>
            <p className="text-sm text-muted-light">Decimals</p>
            <p className="font-semibold text-gold-600">{TOKEN_INFO.decimals}</p>
          </div>
          <div>
            <p className="text-sm text-muted-light">Total Supply</p>
            <p className="font-semibold text-gold-600">{TOKEN_INFO.totalSupply}</p>
          </div>
          <div>
            <p className="text-sm text-muted-light">Utility</p>
            <p className="font-semibold text-gold-600">Collateral & Access</p>
          </div>
        </div>

        {/* Contract Address */}
        <div>
          <p className="text-sm text-muted-light mb-2">Contract Address</p>
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
            <a href="/buy">
              Buy GSTD
            </a>
          </Button>
          <Button variant="outline" className="btn-outline-gold flex-1" asChild>
            <a href={LINKS.stonfiSwap} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Swap on StonFi
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
