'use client';

import { useLanguage } from './LanguageProvider';
import Link from 'next/link';
import { SITE, LINKS } from '@/content/config';
import { SocialLinks } from '@/components/SocialLinks';
import Image from 'next/image';

export function Footer() {
  const { t } = useLanguage();

  const footerLinks = [
    { key: 'token', href: '/token' },
    { key: 'buy', href: '/buy' },
    { key: 'roadmap', href: '/roadmap' },
    { key: 'docs', href: LINKS.docs },
    { key: 'legal', href: '/legal' },
  ];

  return (
    <footer className="bg-slate-900 border-t border-gold-500/20">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/logogstd.png"
                alt="GSTD Token Logo"
                width={40}
                height={40}
                className="h-10 w-10 flex-shrink-0"
              />
            </div>
            <p className="text-muted-dark mb-6 max-w-md text-sm sm:text-base">
              {t('footer.description')}
            </p>

            {/* Social Links */}
            <div>
              <h3 className="text-sm font-semibold text-gold-400 mb-4">
                {t('footer.followUs')}
              </h3>
              <SocialLinks />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gold-400 mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-muted-dark hover:text-gold-400 transition-colors"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gold-400 mb-4">
              {t('footer.contact')}
            </h3>
            <div className="space-y-3 text-muted-dark">
              <p>Telegram: @goldstandardcoin</p>
              <p>X: @gstdtoken</p>
              <p>GitHub: @gstdcoin</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gold-500/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2025 {SITE.name}. {t('footer.allRightsReserved')}.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/legal"
                className="text-slate-400 hover:text-gold-400 text-sm transition-colors"
              >
                {t('footer.privacyPolicy')}
              </Link>
              <Link
                href="/legal"
                className="text-slate-400 hover:text-gold-400 text-sm transition-colors"
              >
                {t('footer.termsOfService')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
