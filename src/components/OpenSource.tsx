'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { Button } from '@/components/ui/button';
import { Github, Star, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { LINKS, GITHUB_ORG, GITHUB_REPOS } from '@/content/config';

interface RepoInfo {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  updatedAt: string;
  url: string;
}

const FALLBACK_REPOS: RepoInfo[] = GITHUB_REPOS.map((name) => ({
  name,
  description: null,
  language: null,
  stars: 0,
  updatedAt: '',
  url: `https://github.com/${GITHUB_ORG}/${name}`,
}));

export function OpenSource() {
  const { t } = useLanguage();
  const [repos, setRepos] = useState<RepoInfo[]>(FALLBACK_REPOS);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch('/api/github-repos', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.repos) && data.repos.length > 0) {
            setRepos(data.repos);
            setLive(true);
          }
        }
      } catch (_e) {
        // keep fallback list — never fabricate stars/descriptions
      }
    };
    fetchRepos();
  }, []);

  const os = t('openSource') as any;
  const labels = os?.repoLabels || { language: 'Language', updated: 'Updated', stars: 'Stars' };

  return (
    <section className="py-16 md:py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full glass-institutional border-[#D4AF37]/30 text-[#D4AF37] text-xs font-medium mb-6">
            <Github className="w-3 h-3 mr-2" />
            {live ? 'Live from GitHub' : 'github.com/' + GITHUB_ORG}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">{os?.title || 'The Protocol Is Open'}</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
            {os?.subtitle}
          </p>
        </motion.div>

        {/* Repo cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="block glass-institutional border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 rounded-2xl p-5 transition-all hover:shadow-gold-lg group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-bold text-slate-100 group-hover:text-[#D4AF37] transition-colors">
                  {GITHUB_ORG}/{repo.name}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#D4AF37] transition-colors flex-shrink-0" />
              </div>
              <p className="text-sm text-slate-400 mb-4 min-h-[2.5rem] line-clamp-2">
                {repo.description || '—'}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {repo.stars} {labels.stars}
                </span>
                {repo.updatedAt && (
                  <span>{labels.updated} {new Date(repo.updatedAt).toLocaleDateString()}</span>
                )}
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3">
          <Button className="bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#B8860B] font-semibold" asChild>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              {os?.ctaGithub || 'View GitHub'}
            </a>
          </Button>
          <Button variant="outline" className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10" asChild>
            <a href="/nodes">{os?.ctaRunNode || 'Run a Node'}</a>
          </Button>
          <Button variant="outline" className="border-white/15 text-white/80 hover:bg-white/5" asChild>
            <a href="/docs">{os?.ctaDocs || 'Read Documentation'}</a>
          </Button>
          <Button variant="outline" className="border-white/15 text-white/80 hover:bg-white/5" asChild>
            <a href="/developers">{os?.ctaBuild || 'Build on GSTD'}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
