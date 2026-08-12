'use client';

import { useLanguage } from './LanguageProvider';
import Link from 'next/link';
import { SITE, LINKS } from '@/content/config';
import { SocialLinks } from '@/components/SocialLinks';
import Image from 'next/image';

export function Footer() {
  const { t } = useLanguage();

  const footerLinks = [
    { key: 'nodes', href: '/nodes' },
    { key: 'ai', href: '/ai' },
    { key: 'token', href: '/token' },
    { key: 'treasury', href: '/treasury' },
    { key: 'developers', href: '/developers' },
    { key: 'docs', href: '/docs' },
    { key: 'roadmap', href: '/roadmap' },
    { key: 'about', href: '/about' },
    { key: 'legal', href: '/legal' },
  ];

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#D4AF37]/10">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/logogstd.png"
                alt={t('tokenInfo.logoAlt') as string}
                width={56}
                height={56}
                className="h-14 w-14 flex-shrink-0"
              />
            </div>
            <p className="text-slate-300 mb-6 max-w-md text-sm sm:text-base">
              {t('footer.description')}
            </p>

            {/* Social Links */}
            <div>
              <h3 className="text-sm font-semibold text-[#D4AF37] mb-4">
                {t('footer.followUs')}
              </h3>
              <SocialLinks />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-[#D4AF37] mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-[#D4AF37] transition-colors"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-[#D4AF37] mb-4">
              {t('footer.contact')}
            </h3>
            <div className="space-y-3 text-slate-300">
              <p>Telegram: @gstdtoken</p>
              <p>X: @gstdtoken</p>
              <p>GitHub: @gstdcoin</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#D4AF37]/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-300 text-sm">
              © 2025–2026 {SITE.name}. {t('footer.allRightsReserved')}.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/legal"
                className="text-slate-300 hover:text-[#D4AF37] text-sm transition-colors"
              >
                {t('footer.privacyPolicy')}
              </Link>
              <Link
                href="/legal"
                className="text-slate-300 hover:text-[#D4AF37] text-sm transition-colors"
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
