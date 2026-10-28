'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import { appUrl } from '@/lib/ecosystem-links';
import { LINKS } from '@/content/config';

const EXAMPLE = `curl http://127.0.0.1:8081/v1/chat/completions \\
  -H 'Content-Type: application/json' \\
  -d '{"model":"auto","messages":[{"role":"user","content":"Explain solar energy in one sentence."}],"max_tokens":128,"stream":false}'`;

export default function DevelopersPage() {
  const { language } = useLanguage();
  const ru = language !== 'en';
  return (
    <main className="container mx-auto max-w-4xl px-4 py-14 space-y-8">
      <header>
        <p className="text-[#D4AF37] font-semibold mb-3">GSTD API</p>
        <h1 className="text-4xl font-bold">{ru ? 'От одного запроса к своему приложению' : 'From one request to your own app'}</h1>
        <p className="text-slate-300 mt-5">{ru ? 'Чат, поиск по документам, помощник для кода или автоматизация — используйте существующую ноду через OpenAI-совместимый HTTP API.' : 'Chat, document search, coding assistance or automation: use an existing node through an OpenAI-compatible HTTP API.'}</p>
      </header>
      <section className="rounded-2xl border border-white/15 bg-white/5 p-6">
        <h2 className="font-bold text-xl">{ru ? '1. Подключите ноду' : '1. Connect a node'}</h2>
        <p className="text-slate-400 mt-3">{ru ? 'Запустите ноду с установленной моделью Ollama. Откройте её панель и убедитесь, что модель доступна. В примере используется локальный gateway на порту 8081; если порт изменён, возьмите адрес из панели.' : 'Start a node with an installed Ollama model. Check model availability in its dashboard. This example uses the local gateway on port 8081; use your dashboard address if the port differs.'}</p>
        <Link className="inline-block text-[#D4AF37] mt-4 underline" href="/nodes">{ru ? 'Инструкция подключения' : 'Node setup guide'} →</Link>
      </section>
      <section>
        <h2 className="font-bold text-xl mb-4">{ru ? '2. Отправьте первый запрос' : '2. Send your first request'}</h2>
        <pre className="bg-black/60 border border-white/15 rounded-2xl p-5 overflow-x-auto text-sm text-emerald-300"><code>{EXAMPLE}</code></pre>
        <p className="text-slate-400 text-sm mt-3">{ru ? 'Ответ: choices[0].message.content. Параметр model: auto выбирает модель; stream: true включает потоковый формат SSE. Не отправляйте секреты ноды или ключи кошелька в клиентский код.' : 'Read choices[0].message.content. model: auto selects a model; stream: true enables SSE. Keep node secrets and wallet keys out of client-side code.'}</p>
      </section>
      <section className="rounded-2xl border border-white/15 p-6">
        <h2 className="font-bold text-xl">{ru ? '3. Используйте тот же путь в своём продукте' : '3. Use the same path in your product'}</h2>
        <p className="text-slate-400 mt-3">{ru ? 'Укажите URL gateway своего оператора вместо локального адреса. Не закрепляйте временный tunnel URL в приложении: оператор публикует актуальный адрес в каноническом реестре платформы. Доступ к чужой ноде, ограничения нагрузки и оплата согласуются с оператором.' : 'Replace the local address with your operator’s gateway URL. Do not hardcode a temporary tunnel: operators publish their current address in the canonical platform registry. Agree access, rate limits and payment with the operator.'}</p>
        <p className="text-slate-400 mt-3">{ru ? 'Без своей ноды сначала попробуйте публичный чат. Он не требует установки, а источник ответа отмечен в интерфейсе.' : 'Without a node, try the public chat first. Nothing to install; the interface identifies the serving source.'}</p>
      </section>
      <div className="flex flex-wrap gap-5 text-[#D4AF37]">
        <a href={appUrl(language)}>{ru ? 'Открыть приложение' : 'Open app'} →</a>
        <a href={LINKS.telegramBot} target="_blank" rel="noopener noreferrer">Telegram ↗</a>
        <a href="https://github.com/gstdcoin/gstdbot" target="_blank" rel="noopener noreferrer">{ru ? 'Исходный код ноды' : 'Node source'} ↗</a>
        <a href="https://github.com/gstdcoin/A2A" target="_blank" rel="noopener noreferrer">A2A SDK ↗</a>
      </div>
    </main>
  );
}
