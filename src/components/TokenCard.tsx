'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink } from 'lucide-react';
import { TOKEN_INFO, LINKS } from '@/content/config';
import { copyToClipboard } from '@/lib/utils';
import { motion } from 'framer-motion';

export function TokenCard() {
  const { t } = useLanguage();

  const handleCopyContract = async () => {
    await copyToClipboard(TOKEN_INFO.contractAddress);
    // You could add a toast notification here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-institutional border-gradient-gold shadow-gold card-mobile-full">
      <CardHeader>
        <CardTitle className="text-2xl text-[#D4AF37] flex items-center gap-2">
          {t('tokenSectionTitle')}
          <Badge className="bg-[#D4AF37] text-[#0A0A0A]">{TOKEN_INFO.symbol}</Badge>
        </CardTitle>
        <CardDescription className="text-slate-300">
          {t('tokenBullets')[0]}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Token Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-300">{t('tokenInfo.network')}</p>
            <p className="font-semibold text-[#D4AF37]">{TOKEN_INFO.network}</p>
          </div>
          <div>
            <p className="text-sm text-slate-300">{t('tokenInfo.decimals')}</p>
            <p className="font-semibold text-[#D4AF37]">{TOKEN_INFO.decimals}</p>
          </div>
          <div>
            <p className="text-sm text-slate-300">{t('tokenInfo.totalSupply')}</p>
            <p className="font-semibold text-[#D4AF37]">{TOKEN_INFO.totalSupply}</p>
          </div>
          <div>
            <p className="text-sm text-slate-300">{t('tokenInfo.utility')}</p>
            <p className="font-semibold text-[#D4AF37]">{t('tokenInfo.utilityValue')}</p>
          </div>
        </div>

        {/* Contract Address */}
        <div>
          <p className="text-sm text-slate-300 mb-2">{t('tokenInfo.contractAddress')}</p>
          <div className="flex items-center space-x-2 p-3 bg-[#1a1a1a] rounded-lg border border-[#D4AF37]/20">
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
          <Button className="btn-gold flex-1" asChild>
            <a href={LINKS.buyGSDT} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              {t('tokenInfo.buyGSTD')}
            </a>
          </Button>
          <Button variant="outline" className="btn-outline-gold flex-1" asChild>
            <Link href="/advantages">
              <ExternalLink className="w-4 h-4 mr-2" />
              {t('tokenInfo.advantages')}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );
}
