'use client';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import {useLanguage} from './LanguageProvider';
import {serviceState} from '@/lib/service-state';
import {LINKS} from '@/content/config';

export function ServiceAvailability({id = 'channels'}: {id?: string}) {
  const ru = useLanguage().language !== 'en';
  const [report, setReport] = useState<unknown>(null), [now, setNow] = useState(Date.now());
  const [busy, setBusy] = useState(false), [revision, setRevision] = useState(0);
  useEffect(() => {
    const controller = new AbortController(); let running = false;
    const load = async () => {
      if (running || document.hidden) return;
      running = true; setBusy(true); setNow(Date.now());
      try {
        const r = await fetch('/api/network/passport', {signal: AbortSignal.any([controller.signal, AbortSignal.timeout(8000)])});
        if (!r.ok) throw Error('unavailable');
        const data: unknown = await r.json();
        if (!controller.signal.aborted) { setReport(data); setNow(Date.now()); }
      } catch { if (!controller.signal.aborted) setReport(null); }
      finally { running = false; if (!controller.signal.aborted) setBusy(false); }
    };
    void load(); const timer = setInterval(() => void load(), 60000);
    document.addEventListener('visibilitychange', load); window.addEventListener('online', load);
    return () => { controller.abort(); clearInterval(timer); document.removeEventListener('visibilitychange', load); window.removeEventListener('online', load); };
  }, [revision]);
  const state = serviceState(report, now);
  const unknown = ru ? 'Не удалось проверить' : 'Could not verify';
  return <section id={id} className="max-w-6xl mx-auto px-4 py-10" aria-labelledby={id + '-title'}>
    <div className="flex justify-between items-center gap-4 mb-5">
      <h2 id={id + '-title'} className="text-xl font-semibold">{ru ? 'Что сейчас доступно' : 'What is available now'}</h2>
      <button type="button" disabled={busy} onClick={() => setRevision(value => value + 1)} className="text-sm text-[#D4AF37] disabled:opacity-50">{busy ? (ru ? 'Проверяем…' : 'Checking…') : (ru ? 'Проверить снова' : 'Check again')}</button>
    </div>
    <div className="grid sm:grid-cols-3 gap-4">
      <article className="rounded-2xl border border-white/15 p-5 bg-white/[0.025]">
        <h3 className="font-medium">{ru ? 'Приложение GSTD' : 'GSTD platform'}</h3>
        <p className="text-sm text-slate-300 mt-3">{state.platform === null ? unknown : state.platform ? (ru ? 'Платформа отвечает' : 'Platform is responding') : (ru ? 'Временно недоступна' : 'Temporarily unavailable')}</p>
        <p className="text-xs text-slate-400 mt-3">{ru ? 'Статус платформы не гарантирует ответ каждой модели.' : 'Platform health does not guarantee an answer from every model.'}</p>
      </article>
      <article className="rounded-2xl border border-white/15 p-5 bg-white/[0.025]">
        <h3 className="font-medium">{ru ? 'Компьютеры участников' : 'Network computers'}</h3>
        <p className="text-sm text-slate-300 mt-3">{state.online === null ? unknown : state.online === 0 ? (ru ? 'Сейчас нет участников на связи' : 'No computers are online right now') : `${ru ? 'На связи' : 'Online'}: ${state.online}`}</p>
        <Link href="/ai#chat" className="text-sm text-[#D4AF37] underline inline-block mt-3">{ru ? 'Попробовать чат' : 'Try the chat'} →</Link>
      </article>
      <article className="rounded-2xl border border-white/15 p-5 bg-white/[0.025]">
        <h3 className="font-medium">Telegram</h3>
        <p className="text-sm text-slate-300 mt-3">{state.telegram === null ? unknown : state.telegram ? (ru ? 'Бот подключён' : 'Bot is connected') : (ru ? 'Временно недоступен. Используйте чат на сайте.' : 'Temporarily unavailable. Use the website chat.')}</p>
        {state.telegram === true && <a href={LINKS.telegramBot} target="_blank" rel="noopener noreferrer" className="text-sm text-[#D4AF37] underline inline-block mt-3">{ru ? 'Открыть бота' : 'Open the bot'} ↗</a>}
      </article>
    </div>
    <p role="status" aria-live="polite" className="text-xs text-slate-400 mt-4">{state.checkedAt ? `${ru ? 'Проверено' : 'Checked'} ${new Date(state.checkedAt).toLocaleTimeString(ru ? 'ru-RU' : 'en-GB')}` : (ru ? 'Подтверждённого статуса пока нет.' : 'No confirmed status yet.')} · <Link href="/network" className="underline">{ru ? 'Подробные данные сети' : 'Network details'}</Link></p>
  </section>;
}
