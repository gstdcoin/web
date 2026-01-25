'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { LINKS } from '@/content/config';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about' },
    { key: 'token', href: '/token' },
    { key: 'buy', href: '/buy' },
    { key: 'roadmap', href: '/roadmap' },
    { key: 'docs', href: LINKS.docs },
    { key: 'legal', href: '/legal' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/40">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Image
                src="/logogstd.png"
                alt={t('tokenInfo.logoAlt') as string}
                width={32}
                height={32}
                className="h-8 w-8"
                priority
                unoptimized
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between w-full max-w-4xl mx-auto px-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm font-medium text-slate-600 hover:text-gold-600 transition-colors whitespace-nowrap"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>

          {/* Language Switcher & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Button className="btn-gold" size="sm" asChild>
              <Link href={LINKS.getGSDT}>
                {t('ctaPrimary')}
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-1">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden min-w-0 px-2"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t bg-white">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="block px-3 py-3 text-base font-medium text-slate-600 hover:text-gold-600 hover:bg-gold-50 rounded-md transition-colors touch-manipulation"
                  onClick={() => setIsOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
              <div className="px-3 py-2 border-t border-gold-200 mt-2">
                <Button className="btn-gold w-full" size="sm" asChild>
                  <Link href={LINKS.getGSDT}>
                    {t('ctaPrimary')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
