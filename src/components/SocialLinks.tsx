'use client';

import { SOCIAL_LINKS } from '@/content/config';
import { MessageCircle, Twitter, Github, BookOpen } from 'lucide-react';

const socialIcons = {
  telegram: MessageCircle,
  twitter: Twitter,
  github: Github,
  docs: BookOpen,
};

export function SocialLinks() {
  const socialItems = [
    { key: 'telegram', icon: 'telegram' },
    { key: 'twitter', icon: 'twitter' },
    { key: 'github', icon: 'github' },
    { key: 'docs', icon: 'docs' }
  ];

  return (
    <div className="flex space-x-4">
      {socialItems.map((social) => {
        const IconComponent = socialIcons[social.icon as keyof typeof socialIcons];
        return (
          <a
            key={social.key}
            href={SOCIAL_LINKS[social.key as keyof typeof SOCIAL_LINKS]}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg bg-slate-800 border border-gold-500/20 flex items-center justify-center text-gold-400 hover:bg-gold-500/10 hover:border-gold-500/40 transition-all duration-300"
          >
            {IconComponent && <IconComponent className="w-5 h-5" />}
          </a>
        );
      })}
    </div>
  );
}
