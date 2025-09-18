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
      className="border-gold-500/50 text-gold-600 hover:bg-gold-50"
    >
      {language === 'en' ? 'RU' : 'EN'}
    </Button>
  );
}
