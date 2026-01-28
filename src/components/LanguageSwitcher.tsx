'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from './LanguageProvider';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLocale = () => {
    const newLocale = language === 'en' ? 'ru' : 'en';
    setLanguage(newLocale);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLocale}
      className="bg-[#1a1a1a]/80 backdrop-blur-md border-[#D4AF37]/30 text-slate-100 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50 transition-all duration-300"
    >
      {language === 'en' ? 'RU' : 'EN'}
    </Button>
  );
}
