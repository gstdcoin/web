'use client';

import { useLanguage } from './LanguageProvider';
import { appUrl } from '@/lib/ecosystem-links';

type HardwareCopy = {
  eyebrow: string; title: string; intro: string; hardwareTitle: string;
  rows: Array<{name: string; status: string; detail: string}>;
  stepsTitle: string; steps: string[]; cluster: string; economy: string;
  matrixLink: string; modelLink: string; communityLink: string; registryLink: string;
};

export function NodeHardwareEntry() {
  const { t, language } = useLanguage();
  const copy = t('nodeHardwareEntry') as unknown as HardwareCopy;
  return (
    <section className="py-14 md:py-20 border-b border-white/10" aria-labelledby="hardware-entry-title">
      <div className="container mx-auto px-4 max-w-6xl">
        <p className="text-sm text-[#D4AF37] mb-3">{copy.eyebrow}</p>
        <h1 id="hardware-entry-title" className="text-3xl md:text-5xl font-bold max-w-4xl">{copy.title}</h1>
        <p className="text-slate-300 mt-5 max-w-4xl leading-relaxed">{copy.intro}</p>
        <h2 className="text-xl font-semibold mt-10 mb-5">{copy.hardwareTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {copy.rows.map(row => (
            <article key={row.name} className="rounded-2xl border border-white/10 bg-[#111111] p-5">
              <h3 className="font-semibold text-lg">{row.name}</h3>
              <p className="text-sm text-[#D4AF37] mt-2">{row.status}</p>
              <p className="text-slate-300 text-sm leading-relaxed mt-3">{row.detail}</p>
            </article>
          ))}
        </div>
        <h2 className="text-xl font-semibold mt-10 mb-4">{copy.stepsTitle}</h2>
        <ol className="list-decimal pl-6 space-y-3 text-slate-200 max-w-4xl">
          {copy.steps.map(step => <li key={step} className="pl-1 leading-relaxed">{step}</li>)}
        </ol>
        <p className="text-sm text-slate-300 mt-6 max-w-4xl leading-relaxed">{copy.cluster}</p>
        <p className="text-sm text-slate-300 mt-4 max-w-4xl leading-relaxed">{copy.economy}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6 text-sm text-[#D4AF37]">
          <a href="https://github.com/gstdcoin/gstdbot/blob/main/docs/HARDWARE.md" target="_blank" rel="noreferrer">{copy.matrixLink}</a>
          <a href="https://github.com/gstdcoin/gstdbot/blob/main/docs/HUGGINGFACE.md" target="_blank" rel="noreferrer">{copy.modelLink}</a>
          <a href="https://huggingface.co/hardware" target="_blank" rel="noreferrer">{copy.communityLink}</a>
          <a href={appUrl(language, '/nodes')}>{copy.registryLink}</a>
        </div>
      </div>
    </section>
  );
}
