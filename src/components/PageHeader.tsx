'use client';

import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ArrowLeft, Zap } from 'lucide-react';
import Link from 'next/link';
import { LINKS } from '@/content/config';

interface PageHeaderProps {
  title: string | string[];
  subtitle?: string | string[];
  showBackButton?: boolean;
}

export function PageHeader({ title, subtitle, showBackButton = true }: PageHeaderProps) {
  const { t } = useLanguage();

  const titleText = Array.isArray(title) ? title[0] : title;
  const subtitleText = subtitle ? (Array.isArray(subtitle) ? subtitle[0] : subtitle) : undefined;

  return (
    <header className="bg-white border-b border-gold-200">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-gold-500 to-gold-600">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient-gold">GSTD</span>
            </div>
          </Link>

          {/* Page Title */}
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold text-light-bg">{titleText}</h1>
            {subtitleText && (
              <p className="text-sm text-muted-light">{subtitleText}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Button className="btn-gold" size="sm" asChild>
              <a href={LINKS.stonfiSwap} target="_blank" rel="noopener noreferrer">
                {t('ctaPrimary')}
              </a>
            </Button>
            {showBackButton && (
              <Button variant="outline" size="sm" asChild>
                <Link href="/" className="flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('backToHome')}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
