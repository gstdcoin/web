'use client';

import { useLanguage } from '@/components/LanguageProvider';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, FileText, Scale, AlertTriangle } from 'lucide-react';

export default function LegalPage() {
  const { t } = useLanguage();

  const legalSections = [
    {
      icon: FileText,
      title: t('legal.sections')[0],
      description: t('legal.sectionDescriptions')[0],
    },
    {
      icon: Shield,
      title: t('legal.sections')[1],
      description: t('legal.sectionDescriptions')[1],
    },
    {
      icon: Scale,
      title: t('legal.sections')[2],
      description: t('legal.sectionDescriptions')[2],
    },
    {
      icon: AlertTriangle,
      title: t('legal.sections')[3],
      description: t('legal.sectionDescriptions')[3],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title={t('legal.title')} 
        subtitle={t('legal.subtitle')}
      />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-gold">{t('legal.title')}</span>
          </h1>
          <p className="text-xl text-muted-light max-w-3xl mx-auto">
            {t('legal.description')}
          </p>
        </section>

        {/* Legal Sections */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {legalSections.map((section, index) => (
              <Card key={index} className="bg-white/40 backdrop-blur-md border-white/10 shadow-xl hover:border-[#D4AF37]/30 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-light-bg">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-light leading-relaxed">
                    {section.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Important Notice */}
        <section className="mb-16">
          <Card className="bg-white/40 backdrop-blur-md border-white/10 shadow-xl hover:border-[#D4AF37]/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-light-bg flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-[#D4AF37]" />
                {t('legal.importantNotice')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-muted-light">
                <p>
                  <strong className="text-light-bg">{t('legal.riskWarning')}</strong> {t('legal.riskWarningText')}
                </p>
                <p>
                  <strong className="text-light-bg">{t('legal.regulatoryNotice')}</strong> {t('legal.regulatoryNoticeText')}
                </p>
                <p>
                  <strong className="text-light-bg">{t('legal.noFinancialAdvice')}</strong> {t('legal.noFinancialAdviceText')}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Compliance Information */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-gradient-gold">{t('legal.complianceSecurity')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/40 backdrop-blur-md border-white/10 shadow-xl hover:border-[#D4AF37]/30 transition-all duration-300 text-center">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg text-light-bg">{t('legal.securityAudits')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-light">
                  {t('legal.securityAuditsDescription')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/40 backdrop-blur-md border-white/10 shadow-xl hover:border-[#D4AF37]/30 transition-all duration-300 text-center">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 flex items-center justify-center">
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg text-light-bg">{t('legal.legalCompliance')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-light">
                  {t('legal.legalComplianceDescription')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/40 backdrop-blur-md border-white/10 shadow-xl hover:border-[#D4AF37]/30 transition-all duration-300 text-center">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg text-light-bg">{t('legal.transparency')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-light">
                  {t('legal.transparencyDescription')}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <Card className="bg-white/40 backdrop-blur-md border-white/10 shadow-xl hover:border-[#D4AF37]/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-light-bg">{t('legal.supportContact')}</CardTitle>
              <CardDescription className="text-muted-light">
                {t('legal.supportContactDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-light-bg mb-2">{t('legal.supportProjectInquiries')}</h3>
                  <p className="text-muted-light">{t('legal.telegramCommunity')}</p>
                  <p className="text-muted-light">https://t.me/gstdtoken</p>
                  <p className="text-muted-light">{t('legal.responseTime')}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-light-bg mb-2">{t('legal.developmentTeam')}</h3>
                  <p className="text-muted-light">Telegram: https://t.me/ipgoldenbit</p>
                  <p className="text-muted-light">{t('legal.responseTime')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
