'use client';

import { useLanguage } from '@/components/LanguageProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, FileText, Scale, AlertTriangle } from 'lucide-react';

interface LegalDocSection {
  heading: string;
  body: string;
}
interface LegalDoc {
  title: string;
  sections: LegalDocSection[];
}

function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <Card className="glass-institutional border-[#D4AF37]/20 card-mobile-full">
      <CardHeader>
        <CardTitle className="text-2xl text-slate-100">{doc.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {doc.sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h3 className="font-semibold text-slate-100 mb-2">{section.heading}</h3>
              )}
              <p className="text-slate-300 leading-relaxed text-sm">{section.body}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function LegalPage() {
  const { t } = useLanguage();

  const termsOfService = t('legal.termsOfService') as unknown as LegalDoc;
  const privacyPolicy = t('legal.privacyPolicy') as unknown as LegalDoc;
  const riskDisclaimers = t('legal.riskDisclaimers') as unknown as LegalDoc;
  const riskWarnings = t('legal.riskWarnings') as unknown as LegalDoc;

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
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]">
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-gold">{t('legal.title')}</span>
          </h1>
          <p className="text-sm md:text-base text-slate-200 max-w-3xl mx-auto">
            {t('legal.description')}
          </p>
        </section>

        {/* Legal Sections */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {legalSections.map((section, index) => (
              <Card key={index} className="glass-institutional border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 card-mobile-full">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B8860B] flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-[#0A0A0A]" />
                    </div>
                    <CardTitle className="text-xl text-slate-100">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300 leading-relaxed">
                    {section.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Important Notice */}
        <section className="mb-16">
          <Card className="glass-institutional border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 card-mobile-full">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-100 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-[#D4AF37]" />
                {t('legal.importantNotice')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-slate-300">
                <p>
                  <strong className="text-slate-100">{t('legal.riskWarning')}</strong> {t('legal.riskWarningText')}
                </p>
                <p>
                  <strong className="text-slate-100">{t('legal.regulatoryNotice')}</strong> {t('legal.regulatoryNoticeText')}
                </p>
                <p>
                  <strong className="text-slate-100">{t('legal.noFinancialAdvice')}</strong> {t('legal.noFinancialAdviceText')}
                </p>
                <p>
                  <strong className="text-slate-100">{t('legal.noWarrantyNotice')}</strong> {t('legal.noWarrantyNoticeText')}
                </p>
                <p>
                  <strong className="text-slate-100">{t('legal.userResponsibilityNotice')}</strong> {t('legal.userResponsibilityNoticeText')}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Full Legal Documents */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-4">
            <span className="text-gradient-gold">{t('legal.fullDocsTitle')}</span>
          </h2>
          <p className="text-sm text-slate-400 text-center max-w-2xl mx-auto mb-4">
            {t('legal.fullDocsSubtitle')}
          </p>
          <p className="text-xs text-slate-500 text-center mb-10">
            {t('legal.lastUpdated')}
          </p>
          <div className="space-y-8">
            <LegalDocument doc={termsOfService} />
            <LegalDocument doc={privacyPolicy} />
            <LegalDocument doc={riskDisclaimers} />
            <LegalDocument doc={riskWarnings} />
          </div>
        </section>

        {/* Compliance Information */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-gradient-gold">{t('legal.complianceSecurity')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-institutional border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 text-center card-mobile-full">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] flex items-center justify-center">
                    <Shield className="w-8 h-8 text-[#0A0A0A]" />
                  </div>
                  <CardTitle className="text-lg text-slate-100">{t('legal.securityAudits')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300">
                    {t('legal.securityAuditsDescription')}
                  </CardDescription>
                </CardContent>
              </Card>

            <Card className="glass-institutional border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 text-center card-mobile-full">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] flex items-center justify-center">
                    <Scale className="w-8 h-8 text-[#0A0A0A]" />
                  </div>
                  <CardTitle className="text-lg text-slate-100">{t('legal.legalCompliance')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300">
                    {t('legal.legalComplianceDescription')}
                  </CardDescription>
                </CardContent>
              </Card>

            <Card className="glass-institutional border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 text-center card-mobile-full">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] flex items-center justify-center">
                    <FileText className="w-8 h-8 text-[#0A0A0A]" />
                  </div>
                  <CardTitle className="text-lg text-slate-100">{t('legal.transparency')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300">
                    {t('legal.transparencyDescription')}
                  </CardDescription>
                </CardContent>
              </Card>
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <Card className="glass-institutional border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 card-mobile-full">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-100">{t('legal.supportContact')}</CardTitle>
              <CardDescription className="text-slate-300">
                {t('legal.supportContactDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-100 mb-2">{t('legal.supportProjectInquiries')}</h3>
                  <p className="text-slate-300">{t('legal.telegramCommunity')}</p>
                  <p className="text-slate-300">https://t.me/gstdtoken</p>
                  <p className="text-slate-300">{t('legal.responseTime')}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 mb-2">{t('legal.developmentTeam')}</h3>
                  <p className="text-slate-300">Telegram: https://t.me/gstdtoken</p>
                  <p className="text-slate-300">{t('legal.responseTime')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
