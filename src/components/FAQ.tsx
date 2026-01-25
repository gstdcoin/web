'use client';

import { useLanguage } from './LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = t('faq') as any;
  const items = faqData?.items || [];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a]" style={{ '--section-padding': '5rem' } as React.CSSProperties}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            <span className="text-gradient-gold">{faqData?.title || 'Часто задаваемые вопросы'}</span>
          </h2>
          <p className="text-sm md:text-base text-slate-200 max-w-3xl mx-auto">
            {faqData?.subtitle || 'Ответы на ключевые вопросы о GSDT'}
          </p>
        </div>

        {/* Two columns on desktop, single on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-7xl mx-auto">
          {items.map((item: any, index: number) => {
            const isOpen = openIndex === index;
            
            return (
              <Card
                key={index}
                className="glass-institutional border-[#D4AF37]/20 hover:border-[#D4AF37]/40 rounded-2xl transition-all duration-300 card-mobile-full"
              >
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-slate-100 pr-8">
                      {item.question}
                    </CardTitle>
                    <div className="flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#D4AF37]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#D4AF37]" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                {isOpen && (
                  <CardContent>
                    <p className="text-slate-300 leading-relaxed" style={{ lineHeight: '1.7' }}>
                      {item.answer}
                    </p>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
