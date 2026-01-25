'use client';

import Link from 'next/link';
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
        const href = SOCIAL_LINKS[social.key as keyof typeof SOCIAL_LINKS];
        const isExternal = href.startsWith('http');
        
        if (isExternal) {
          return (
            <a
              key={social.key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-[#1a1a1a] border border-[#F3E5AB]/20 flex items-center justify-center text-[#F3E5AB] hover:bg-[#F3E5AB]/10 hover:border-[#F3E5AB]/40 transition-all duration-300"
            >
              {IconComponent && <IconComponent className="w-5 h-5" />}
            </a>
          );
        } else {
          return (
            <Link
              key={social.key}
              href={href}
              className="w-10 h-10 rounded-lg bg-[#1a1a1a] border border-[#F3E5AB]/20 flex items-center justify-center text-[#F3E5AB] hover:bg-[#F3E5AB]/10 hover:border-[#F3E5AB]/40 transition-all duration-300"
            >
              {IconComponent && <IconComponent className="w-5 h-5" />}
            </Link>
          );
        }
      })}
    </div>
  );
}
