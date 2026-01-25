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
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">{faqData?.title || 'Часто задаваемые вопросы'}</span>
          </h2>
          <p className="text-xl text-muted-light max-w-3xl mx-auto">
            {faqData?.subtitle || 'Ответы на ключевые вопросы о GSDT'}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {items.map((item: any, index: number) => {
            const isOpen = openIndex === index;
            
            return (
              <Card
                key={index}
                className="bg-white/40 backdrop-blur-md border-white/10 hover:border-amber-500/30 transition-all duration-300"
              >
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-light-bg pr-8">
                      {item.question}
                    </CardTitle>
                    <div className="flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-amber-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-amber-600" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                {isOpen && (
                  <CardContent>
                    <p className="text-muted-light leading-relaxed" style={{ lineHeight: '1.7' }}>
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
