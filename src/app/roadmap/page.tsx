'use client';

import { useLanguage } from '@/components/LanguageProvider';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Target, Zap, Shield, Users, TrendingUp } from 'lucide-react';

export default function RoadmapPage() {
  const { t } = useLanguage();

  const phases = [
    {
      id: 1,
      title: t('roadmap.phases')[0],
      status: 'completed',
      icon: CheckCircle,
      description: t('roadmap.phaseDescriptions')[0],
      features: t('roadmap.phaseFeatures')[0] as unknown as string[],
      color: 'bg-green-500',
    },
    {
      id: 2,
      title: t('roadmap.phases')[1],
      status: 'completed',
      icon: Clock,
      description: t('roadmap.phaseDescriptions')[1],
      features: t('roadmap.phaseFeatures')[1] as unknown as string[],
      color: 'bg-gold-500',
    },
    {
      id: 3,
      title: t('roadmap.phases')[2],
      status: 'current',
      icon: Target,
      description: t('roadmap.phaseDescriptions')[2],
      features: t('roadmap.phaseFeatures')[2] as unknown as string[],
      color: 'bg-blue-500',
    },
    {
      id: 4,
      title: t('roadmap.phases')[3],
      status: 'future',
      icon: Zap,
      description: t('roadmap.phaseDescriptions')[3],
      features: t('roadmap.phaseFeatures')[3] as unknown as string[],
      color: 'bg-purple-500',
    },
  ];

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
        return <Badge className="bg-green-500 text-white">{t('roadmap.completed')}</Badge>;
      case 'current':
        return <Badge className="bg-gold-500 text-white">{t('roadmap.inProgress')}</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-500 text-white">{t('roadmap.upcoming')}</Badge>;
      case 'future':
        return <Badge className="bg-purple-500 text-white">{t('roadmap.future')}</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title={t('roadmap.title')} 
        subtitle={t('roadmap.subtitle')}
      />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-gold">{t('roadmap.title')}</span>
          </h1>
          <p className="text-xl text-muted-light max-w-3xl mx-auto">
            {t('roadmap.description')}
          </p>
        </section>

        {/* Roadmap Timeline */}
        <section className="mb-16">
          <div className="space-y-8">
            {phases.map((phase, index) => (
              <div key={phase.id} className="relative">
                {/* Timeline Line - removed for first 3 sections */}
                
                <Card className={`bg-white border-gold-200 hover:border-gold-300 transition-all duration-300 ${
                  phase.status === 'current' ? 'ring-2 ring-gold-500/20' : ''
                }`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 rounded-full ${phase.color} flex items-center justify-center`}>
                          <phase.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl text-light-bg flex items-center gap-3">
                            {phase.title}
                            {getStatusBadge(phase.status)}
                          </CardTitle>
                          <CardDescription className="text-muted-light text-lg mt-2">
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
                          <div className={`w-2 h-2 rounded-full ${phase.color} flex-shrink-0 mt-2`}></div>
                          <p className="text-muted-light">{feature}</p>
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
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-gradient-gold">{t('roadmap.keyMilestones')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => (
              <Card key={index} className="bg-white border-gold-200 hover:border-gold-300 transition-all duration-300 text-center">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 flex items-center justify-center">
                    <milestone.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-light-bg">{milestone.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-light leading-relaxed">
                    {milestone.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Progress Overview */}
        <section>
          <Card className="bg-gradient-to-br from-gold-500/10 to-gold-600/5 border-gold-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-light-bg">{t('roadmap.developmentProgress')}</CardTitle>
              <CardDescription className="text-muted-light">
                {t('roadmap.developmentProgressDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-600 mb-2">100%</div>
                  <div className="text-sm text-muted-light">{t('roadmap.phaseComplete')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-600 mb-2">100%</div>
                  <div className="text-sm text-muted-light">{t('roadmap.phaseProgress')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-600 mb-2">25%</div>
                  <div className="text-sm text-muted-light">{t('roadmap.phasePlanning')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-600 mb-2">0%</div>
                  <div className="text-sm text-muted-light">{t('roadmap.phaseResearch')}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </main>
    </div>
  );
}
