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
      className="border-[#F3E5AB]/30 text-[#FAEBD7] hover:text-[#F3E5AB] hover:bg-[#F3E5AB]/10 hover:border-[#F3E5AB]/50 transition-all duration-300"
    >
      {language === 'en' ? 'RU' : 'EN'}
    </Button>
  );
}
