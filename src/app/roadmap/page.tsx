'use client';

import { useLanguage } from '@/components/LanguageProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, Network, Layers, ShieldCheck, Coins, Globe, Bot, Shield, Users, TrendingUp } from 'lucide-react';

const PHASE_ICONS = [Server, Network, Layers, ShieldCheck, Coins, Globe, Bot];
// Status is asserted here from what the repo research actually confirmed —
// not a projection. Keep in sync with copy.*.ts roadmap.phaseFeatures.
const PHASE_STATUS = ['completed', 'completed', 'current', 'current', 'current', 'future', 'current'] as const;

export default function RoadmapPage() {
  const { t } = useLanguage();

  const phaseTitles = t('roadmap.phases') as unknown as string[];
  const phaseDescriptions = t('roadmap.phaseDescriptions') as unknown as string[];
  const phaseFeatures = t('roadmap.phaseFeatures') as unknown as string[][];

  const phases = phaseTitles.map((title, index) => ({
    id: index + 1,
    title,
    status: PHASE_STATUS[index] || 'future',
    icon: PHASE_ICONS[index] || Server,
    description: phaseDescriptions[index],
    features: phaseFeatures[index] || [],
  }));

  const milestones = [
    {
      icon: Shield,
      title: t('roadmap.securityFirst'),
      description: t('roadmap.securityFirstDescription'),
    },
    {
      icon: Users,
      title: t('roadmap.communityDriven'),
      description: t('roadmap.communityDrivenDescription'),
    },
    {
      icon: TrendingUp,
      title: t('roadmap.scalableGrowth'),
      description: t('roadmap.scalableGrowthDescription'),
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-emerald-500 text-white">{t('roadmap.completed')}</Badge>;
      case 'current':
        return <Badge className="bg-[#D4AF37] text-[#0A0A0A]">{t('roadmap.inProgress')}</Badge>;
      case 'future':
        return <Badge className="bg-slate-600 text-white">{t('roadmap.upcoming')}</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]">

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-gold">{t('roadmap.title')}</span>
          </h1>
          <p className="text-sm md:text-base text-slate-200 max-w-3xl mx-auto">
            {t('roadmap.description')}
          </p>
        </section>

        {/* Roadmap Timeline */}
        <section className="mb-16">
          <div className="space-y-8">
            {phases.map((phase) => (
              <div key={phase.id} className="relative">
                <Card className={`glass-institutional border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 card-mobile-full ${
                  phase.status === 'current' ? 'ring-2 ring-[#D4AF37]/20' : ''
                }`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] flex items-center justify-center flex-shrink-0">
                          <phase.icon className="w-8 h-8 text-[#0A0A0A]" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl text-slate-100 flex items-center gap-3 flex-wrap">
                            <span className="text-sm text-slate-500 font-mono">{`0${phase.id}`}</span>
                            {phase.title}
                            {getStatusBadge(phase.status)}
                          </CardTitle>
                          <CardDescription className="text-slate-300 text-lg mt-2">
                            {phase.description}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {phase.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3 p-3 bg-transparent rounded-lg">
                          <div className="w-2 h-2 rounded-full bg-[#D4AF37] flex-shrink-0 mt-2"></div>
                          <p className="text-slate-300">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Key Milestones */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-gradient-gold">{t('roadmap.keyMilestones')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => (
              <Card key={index} className="glass-institutional border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 text-center card-mobile-full">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] flex items-center justify-center">
                    <milestone.icon className="w-8 h-8 text-[#0A0A0A]" />
                  </div>
                  <CardTitle className="text-xl text-slate-100">{milestone.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300 leading-relaxed">
                    {milestone.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
