'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { LINKS } from '@/content/config';
import { ArrowRight, MessageSquare, Server, Code2 } from 'lucide-react';

export function Hero() {
  const { language } = useLanguage();
  const ru = language !== 'en';
  const actions = [
    { href: '/ai', icon: MessageSquare, title: ru ? 'Спросить ИИ' : 'Ask AI',
      text: ru ? 'Откройте чат и задайте вопрос. Для первого запроса кошелёк не нужен.' : 'Open the chat and ask a question. No wallet is needed to try it.' },
    { href: '/nodes', icon: Server, title: ru ? 'Подключить ноду' : 'Run a node',
      text: ru ? 'Подключите свой компьютер: выполняйте задачи сети на установленной модели.' : 'Connect your computer and execute network tasks with an installed model.' },
    { href: '/developers', icon: Code2, title: ru ? 'Использовать API' : 'Build with the API',
      text: ru ? 'Добавьте ИИ в своё приложение через знакомый API. Начните с одного запроса.' : 'Add AI to your app through a familiar API. Start with one request.' },
  ];
  return (
    <section className="bg-gradient-to-br from-[#0A0A0A] via-[#0f0f1a] to-[#0A0A0A] py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <p className="text-[#D4AF37] font-semibold mb-4">GSTD · {ru ? 'Открытая сеть ИИ-вычислений' : 'An open AI compute network'}</p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
          {ru ? 'Пользуйтесь ИИ. Подключайте свой компьютер. Создавайте полезные приложения.' : 'Use AI. Connect your computer. Build useful apps.'}
        </h1>
        <p className="text-slate-300 text-lg max-w-3xl mt-6">
          {ru ? 'Одна сеть для пользователей, разработчиков и операторов нод. GSTD — токен оплаты вычислений; начать знакомство с сетью можно с бесплатного чата.' : 'One network for users, developers and node operators. GSTD is the compute payment token; start exploring with the free chat.'}
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-10">
          {actions.map(({href,icon: Icon,title,text},index) => (
            <Link key={href} href={href} className={`rounded-2xl border p-6 transition-colors ${index === 0 ? 'border-[#D4AF37]/60 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/15' : 'border-white/15 bg-white/5 hover:border-[#D4AF37]/40'}`}>
              <Icon className="text-[#D4AF37] mb-4" size={26} />
              <h2 className="font-bold text-xl flex items-center gap-2">{title}<ArrowRight size={18}/></h2>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">{text}</p>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-5 text-sm mt-7">
          <a className="text-[#D4AF37] underline underline-offset-4" href={LINKS.telegramBot} target="_blank" rel="noopener noreferrer">{ru ? 'Тот же ИИ в Telegram' : 'Use AI in Telegram'} ↗</a>
          <Link className="text-slate-400 underline underline-offset-4" href="/docs">{ru ? 'Как устроена сеть' : 'How the network works'}</Link>
          <Link className="text-slate-400 underline underline-offset-4" href="/token">{ru ? 'Роль GSTD' : 'The role of GSTD'}</Link>
        </div>
      </div>
    </section>
  );
}
