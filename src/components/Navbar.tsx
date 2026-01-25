'use client';

import { useState, useEffect } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  // Adaptive glass header based on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        "border-b border-[#D4AF37]/10",
        "glass-institutional",
        isScrolled 
          ? "bg-[#0A0A0A]/90 backdrop-blur-xl" 
          : "bg-[#0A0A0A]/60 backdrop-blur-md"
      )}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex items-center space-x-2">
              <Image
                src="/logogstd.png"
                alt={t('tokenInfo.logoAlt') as string}
                width={32}
                height={32}
                className="h-8 w-8 transition-transform group-hover:scale-110"
                priority
                unoptimized
              />
            </div>
          </Link>

          {/* Desktop Navigation - Classic Gold Stroke */}
          <div className="hidden md:flex items-center justify-between w-full max-w-4xl mx-auto px-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-all duration-300 whitespace-nowrap",
                  "text-[#FAEBD7] hover:text-[#D4AF37]",
                  "border-b border-transparent hover:border-[#D4AF37]/30",
                  "pb-1 hover:pb-0.5"
                )}
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
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden min-w-0 px-2 text-[#FAEBD7] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Bento Style Grid */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-4 pb-4 border-t border-[#D4AF37]/10">
              {/* Bento Grid Layout */}
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={cn(
                      "block px-3 py-3 text-sm font-medium rounded-lg transition-all duration-300 touch-manipulation",
                      "glass-institutional border-gradient-gold",
                      "text-[#FAEBD7] hover:text-[#D4AF37]",
                      "hover:border-[#D4AF37]/40 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]",
                      "active:scale-95"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                ))}
              </div>
              {/* CTA Button in Grid */}
              <div className="mt-3">
                <Button className="btn-gold w-full" size="sm" asChild>
                  <Link href={LINKS.getGSDT} onClick={() => setIsOpen(false)}>
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
