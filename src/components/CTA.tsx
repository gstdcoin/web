'use client';

import { useLanguage } from './LanguageProvider';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { LINKS } from '@/content/config';

export function CTA() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white/40 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-gold">{t('ctaTitle')}</span>
          </h2>
          <p className="text-xl text-muted-light mb-12">
            {t('ctaDescription')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="btn-gold group" asChild>
              <a href={LINKS.getGSDT} target="_blank" rel="noopener noreferrer">
                {t('ctaPrimary')}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="btn-outline-gold" asChild>
              <a href={LINKS.telegram} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                {t('ctaSecondary')}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
