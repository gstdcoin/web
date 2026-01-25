'use client';

import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
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
          <Link href="/" className="flex items-center space-x-2 min-w-0">
            <div className="flex items-center space-x-2">
              <Image
                src="/logogstd.png"
                alt={t('tokenInfo.logoAlt') as string}
                width={32}
                height={32}
                className="h-8 w-8 flex-shrink-0"
                priority
                unoptimized
              />
            </div>
          </Link>

          {/* Page Title */}
          <div className="flex-1 text-center px-2 min-w-0">
            <h1 className="text-base sm:text-lg font-semibold text-light-bg truncate">{titleText}</h1>
            {subtitleText && (
              <p className="text-xs sm:text-sm text-muted-light truncate">{subtitleText}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1 min-w-0">
            <LanguageSwitcher />
            <Button className="btn-gold hidden sm:inline-flex" size="sm" asChild>
              <a href={LINKS.getGSDT} target="_blank" rel="noopener noreferrer">
                {t('ctaPrimary')}
              </a>
            </Button>
            {showBackButton && (
              <Button variant="outline" size="sm" asChild className="min-w-0 px-2">
                <Link href="/" className="flex items-center">
                  <ArrowLeft className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">{t('backToHome')}</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
