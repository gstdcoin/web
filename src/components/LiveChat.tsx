'use client';

import {useEffect, useRef, useState} from 'react';
import {Copy, Square, Send, Check} from 'lucide-react';
import {useLanguage} from './LanguageProvider';
import {appUrl} from '@/lib/ecosystem-links';
import {MAX_CHAT_MESSAGES, MAX_CHAT_MESSAGE_CHARS} from '@/lib/chat-request-guard';
import {ChatResponseError, readChatResponse, type ChatFailure} from '@/lib/chat-response';

type Message = {role: 'user' | 'assistant'; content: string};
type Exchange = {user: string; answer: string};
type Failure = ChatFailure | 'cancelled' | 'network';
const copy = {
  ru: {
    unavailable: 'Сейчас получить ответ не удалось. Ваш вопрос сохранён ниже — попробуйте ещё раз позже.',
    rate_limit: 'Достигнут лимит бесплатных запросов. Подождите минуту и повторите вопрос.',
    too_long: 'Вопрос или история слишком длинные. Сократите вопрос или начните новый диалог.',
    invalid_response: 'Ответ пришёл с ошибкой. Показанная часть может быть неполной. Повторите запрос.',
    incomplete: 'Соединение оборвалось до завершения ответа. Полученный текст сохранён. Можно повторить запрос.',
    timeout: 'Ответ занимает слишком много времени. Ожидание остановлено, вопрос сохранён. Попробуйте снова.',
    cancelled: 'Ожидание остановлено. Полученный текст и ваш вопрос сохранены.',
    network: 'Не удалось связаться с сервисом. Проверьте соединение с интернетом и попробуйте снова.',
  },
  en: {
    unavailable: 'Could not get an answer right now. Your question is preserved below. Try again later.',
    rate_limit: 'The free request limit was reached. Wait a minute and try again.',
    too_long: 'The question or history is too long. Shorten your question or start a new chat.',
    invalid_response: 'The answer failed validation. Any displayed text may be incomplete. Try again.',
    incomplete: 'The connection ended before the answer finished. Received text is preserved. You can try again.',
    timeout: 'The answer took too long. Waiting stopped and your question is preserved. Try again.',
    cancelled: 'Waiting stopped. Received text and your question are preserved.',
    network: 'Could not reach the service. Check your internet connection and try again.',
  },
};

export function LiveChat() {
  const {language} = useLanguage(), ru = language !== 'en';
  // Failed exchanges and error notices never become model conversation history.
  const [messages, setMessages] = useState<Message[]>([]);
  const [pending, setPending] = useState<Exchange | null>(null);
  const [input, setInput] = useState(''), [loading, setLoading] = useState(false);
  const [error, setError] = useState<Failure | null>(null), [cloudConsent, setCloudConsent] = useState(false);
  const [servedBy, setServedBy] = useState<string | null>(null), [seconds, setSeconds] = useState(0);
  const [copied, setCopied] = useState<number | null>(null), [copyError, setCopyError] = useState(false);
  const active = useRef<AbortController | null>(null), mounted = useRef(true);
  const inputRef = useRef<HTMLTextAreaElement>(null), scrollRef = useRef<HTMLDivElement>(null);
  const follow = useRef(true);
  const full = messages.length + 2 > MAX_CHAT_MESSAGES;
  const prompts = ru
    ? ['Помоги написать вежливое письмо клиенту о переносе встречи.', 'Объясни простыми словами, как составить семейный бюджет.', 'Помоги составить план дня: работа, учёба и отдых.']
    : ['Help me write a polite email to reschedule a meeting.', 'Explain how to make a household budget in simple terms.', 'Help me plan a day with work, study and rest.'];

  useEffect(() => { mounted.current = true; return () => { mounted.current = false; active.current?.abort('unmount'); }; }, []);
  useEffect(() => { if (!loading && error) inputRef.current?.focus(); }, [loading, error]);
  useEffect(() => {
    if (!loading) return;
    const started = Date.now();
    const timer = setInterval(() => setSeconds(Math.floor((Date.now() - started) / 1000)), 1000);
    return () => clearInterval(timer);
  }, [loading]);
  useEffect(() => {
    const box = scrollRef.current;
    if (box && follow.current) box.scrollTop = box.scrollHeight;
  }, [messages, pending, loading]);

  async function send(question?: string) {
    const text = (question ?? input).trim();
    if (!text || active.current || full) return;
    const controller = new AbortController(); active.current = controller;
    const next: Message[] = [...messages, {role: 'user', content: text}];
    let timedOut = false;
    const deadline = setTimeout(() => { timedOut = true; controller.abort('timeout'); }, 90_000);
    follow.current = true;
    setPending({user: text, answer: ''}); setInput(''); setError(null); setCopied(null); setCopyError(false);
    setServedBy(null); setSeconds(0); setLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST', headers: {'Content-Type': 'application/json'}, signal: controller.signal,
        body: JSON.stringify({model: 'auto', messages: next, stream: true, max_tokens: 512, allow_cloud_fallback: cloudConsent}),
      });
      const content = await readChatResponse(response, answer => {
        if (mounted.current) setPending({user: text, answer});
      }, controller.signal);
      if (!mounted.current) return;
      setMessages([...next, {role: 'assistant', content}]); setPending(null);
      setServedBy(response.headers.get('x-served-by') === 'cloudflare-workers-ai' ? 'cloud' : 'node');
    } catch (failure) {
      if (!mounted.current) return;
      setInput(text);
      setError(timedOut ? 'timeout' : controller.signal.aborted ? 'cancelled'
        : failure instanceof ChatResponseError ? failure.code : 'network');
    } finally {
      clearTimeout(deadline); active.current = null;
      if (mounted.current) { setLoading(false); inputRef.current?.focus(); }
    }
  }

  const visible: Message[] = [...messages, ...(pending ? [
    {role: 'user' as const, content: pending.user},
    ...(pending.answer ? [{role: 'assistant' as const, content: pending.answer}] : []),
  ] : [])];

  return <section id="chat" className="py-10 md:py-16 bg-[#0A0A0A]">
    <div className="container mx-auto px-4 max-w-3xl">
      <p className="text-[#D4AF37] text-sm mb-3">{ru ? 'GSTD · Бесплатный пробный чат' : 'GSTD · Free trial chat'}</p>
      <h1 className="text-3xl md:text-5xl font-semibold leading-tight">{ru ? 'Начните с обычного вопроса.' : 'Start with a simple question.'}</h1>
      <p className="text-slate-300 mt-4 max-w-xl">{ru ? 'Напишите, с чем нужна помощь. Кошелёк, установка программы и выбор модели для этого чата не нужны.' : 'Tell us what you need help with. This chat needs no wallet, installation or model selection.'}</p>
      <ol className="flex flex-wrap gap-x-6 gap-y-2 my-6 text-sm text-slate-400" aria-label={ru ? 'Как начать' : 'How to start'}>
        <li>1. {ru ? 'Напишите задачу' : 'Describe your task'}</li><li>2. {ru ? 'Получите ответ' : 'Get an answer'}</li><li>3. {ru ? 'Скопируйте результат' : 'Copy the result'}</li>
      </ol>
      <p className="text-sm text-slate-400 mb-4">{ru ? 'Запрос обрабатывает компьютер участника сети. Важные факты в ответе стоит проверить.' : 'A network participant’s computer processes your request. Check important facts in its answer.'}</p>
      {messages.length === 0 && !pending && <div className="flex flex-wrap gap-2 mb-5" aria-label={ru ? 'Примеры вопросов' : 'Example questions'}>
        {prompts.map((prompt, index) => <button key={prompt} type="button" onClick={() => { setInput(prompt); inputRef.current?.focus(); }} className="rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200 hover:border-[#D4AF37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]">
          {(ru ? ['Письмо клиенту', 'Объяснить просто', 'План на день'] : ['Write an email', 'Explain simply', 'Plan my day'])[index]}
        </button>)}
      </div>}
      <div className="rounded-2xl border border-[#D4AF37]/25 bg-white/[0.025] overflow-hidden">
        <div className="flex justify-between gap-3 items-center px-5 py-3 border-b border-white/10">
          <p role="status" aria-live="polite" className="text-sm text-slate-400">{loading ? (ru ? 'Получаем ответ…' : 'Getting an answer…') : servedBy ? (servedBy === 'cloud' ? (ru ? 'Ответ получен от Cloudflare AI' : 'Answered by Cloudflare AI') : (ru ? 'Ответ получен от участника сети' : 'Answered by a network participant')) : (ru ? 'Диалог хранится в этой вкладке' : 'This conversation stays in this tab')}</p>
          <button type="button" disabled={loading || (!messages.length && !pending)} onClick={() => { setMessages([]); setPending(null); setError(null); setInput(''); setServedBy(null); inputRef.current?.focus(); }} className="text-sm text-[#D4AF37] disabled:opacity-40 whitespace-nowrap">{ru ? 'Новый диалог' : 'New chat'}</button>
        </div>
        <div ref={scrollRef} role="log" aria-label={ru ? 'Переписка' : 'Conversation'} aria-live="polite" aria-relevant="additions" onScroll={() => { const box = scrollRef.current; if (box) follow.current = box.scrollHeight - box.scrollTop - box.clientHeight < 70; }} className="h-[320px] sm:h-[380px] overflow-y-auto p-5 space-y-5">
          {!visible.length && <p className="text-slate-500 text-sm mt-10 text-center">{ru ? 'Выберите пример выше или напишите свой вопрос ниже.' : 'Choose an example above or write your question below.'}</p>}
          {visible.map((message, index) => <div key={index} className={message.role === 'user' ? 'ml-auto max-w-[90%]' : 'max-w-[95%]'}>
            <p className="text-xs text-slate-500 mb-1">{message.role === 'user' ? (ru ? 'Вы' : 'You') : (pending && index === visible.length - 1 && error ? (ru ? 'Неполный ответ' : 'Partial answer') : 'GSTD AI')}</p>
            <p className={`rounded-xl px-4 py-3 text-sm whitespace-pre-wrap break-words ${message.role === 'user' ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-slate-100' : 'bg-white/5 text-slate-200'}`}>{message.content}</p>
            {message.role === 'assistant' && !loading && <button type="button" className="flex gap-2 items-center text-xs text-slate-400 mt-1 px-2" onClick={async () => {
              try { await navigator.clipboard.writeText(message.content); setCopied(index); setCopyError(false); } catch { setCopyError(true); }
            }}>{copied === index ? <Check size={14}/> : <Copy size={14}/>} {copied === index ? (ru ? 'Скопировано' : 'Copied') : (ru ? 'Скопировать ответ' : 'Copy answer')}</button>}
          </div>)}
          {loading && <p className="text-sm text-slate-400">{ru ? 'Ожидание' : 'Waiting'}: {seconds} {ru ? 'с' : 's'}. {ru ? 'Можно остановить запрос.' : 'You can stop the request.'}</p>}
        </div>
        <form onSubmit={event => { event.preventDefault(); void send(); }} className="border-t border-white/10 p-4">
          <label htmlFor="gstd-question" className="block text-sm text-slate-200 mb-2">{ru ? 'Ваш вопрос' : 'Your question'}</label>
          <textarea id="gstd-question" ref={inputRef} rows={3} value={input} maxLength={MAX_CHAT_MESSAGE_CHARS} disabled={loading || full} onChange={event => setInput(event.target.value)} onKeyDown={event => {
            if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); void send(); }
          }} aria-describedby="gstd-chat-hint gstd-chat-error" placeholder={ru ? 'Например: помоги написать письмо…' : 'For example: help me write an email…'} className="w-full resize-y min-h-24 bg-black/20 border border-white/20 rounded-lg p-3 text-sm text-slate-100 focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"/>
          <div className="flex flex-wrap items-center justify-between gap-3 mt-2">
            <p id="gstd-chat-hint" className="text-xs text-slate-500">{full ? (ru ? 'Диалог заполнен. Начните новый.' : 'Chat limit reached. Start a new chat.') : (ru ? 'Enter — отправить · Shift+Enter — новая строка' : 'Enter to send · Shift+Enter for a new line')}</p>
            {loading ? <button type="button" onClick={() => active.current?.abort('user')} className="flex gap-2 items-center px-4 py-2 rounded-lg border border-white/25 text-sm"><Square size={14}/>{ru ? 'Остановить' : 'Stop'}</button>
              : <button type="submit" disabled={!input.trim() || full} className="flex gap-2 items-center px-5 py-2 rounded-lg bg-[#D4AF37] text-black font-semibold text-sm disabled:opacity-40"><Send size={15}/>{ru ? 'Отправить' : 'Send'}</button>}
          </div>
        </form>
      </div>
      <div id="gstd-chat-error" role="alert" className={error ? 'mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-200' : ''}>
        {error && <><p>{copy[ru ? 'ru' : 'en'][error]}</p>{pending && !loading && !full && <button type="button" onClick={() => void send(pending.user)} className="underline underline-offset-4 mt-2">{ru ? 'Повторить этот вопрос' : 'Retry this question'}</button>}</>}
      </div>
      {copyError && <p role="status" className="text-sm text-amber-200 mt-3">{ru ? 'Не удалось скопировать. Выделите текст ответа и скопируйте вручную.' : 'Could not copy. Select the answer and copy it manually.'}</p>}
      <label className="flex items-start gap-3 text-sm text-slate-400 mt-5">
        <input type="checkbox" checked={cloudConsent} disabled={loading} onChange={event => setCloudConsent(event.target.checked)} className="mt-1"/>
        {ru ? 'Если участники сети не ответят, разрешаю передать вопрос и историю этого диалога резервному Cloudflare AI. По умолчанию это выключено.' : 'If network participants cannot answer, allow this question and conversation history to be sent to Cloudflare AI. This is off by default.'}
      </label>
      <p className="text-sm text-slate-400 mt-6">{ru ? 'Нужны выбор модели и управление балансом?' : 'Need model selection and balance management?'} <a href={appUrl(language)} className="text-[#D4AF37] underline">{ru ? 'Открыть приложение' : 'Open the app'} →</a> {ru ? 'История этого чата при переходе не переносится.' : 'This chat history is not transferred.'}</p>
    </div>
  </section>;
}
