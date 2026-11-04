'use client';
import {useLanguage} from './LanguageProvider';
import {appUrl} from '@/lib/ecosystem-links';

const copy = {
 ru: {
  title:'С чего начать', intro:'Выберите свою задачу. Для бесплатного чата и локального запуска модели покупать GSTD не нужно.',
  cards:[
   {title:'Пользоваться ИИ',steps:['Для старта без кошелька выберите бесплатный режим и базовую модель auto. Доступ зависит от квоты и свободной ноды.','Выберите модель. Если её нет в сети, установите локально или выберите другую самостоятельно.','Перед сетевым запросом проверьте исполнителя и цену. Передавайте запрос только с явным согласием.'],action:'Открыть чат',path:'/chat'},
   {title:'Запустить свою ноду',steps:['На Linux x86-64/ARM64 или WSL2 откройте страницу установки. Установщик напечатает адрес вашей панели.','В панели настройте PIN и привяжите свой публичный TON-адрес в разделе «Кошелёк начислений». Seed-фраза не нужна.','В «Каталоге моделей» выберите совместимый по оценке ресурсов вариант или публичный GGUF из Hugging Face, скачайте и проверьте локальным запросом.','Проверьте регистрацию, heartbeat и свободный слот. Нода получает задания при наличии спроса; установка и онлайн сами по себе не оплачиваются.'],action:'Установить ноду',path:'/nodes'},
   {title:'Создать приложение',steps:['Начните с документации API и доступных моделей. Список моделей не означает наличие свободного исполнителя.','Укажите точную модель и обрабатывайте недоступность, лимиты и ошибки. Не подменяйте модель без согласия пользователя.','Для интеграции работника используйте постоянную подписывающую идентичность. A2A SDK экспериментальный; кошелёк не заменяет авторизацию ноды.'],action:'Документация API',path:'/developers'}
  ],
  paymentTitle:'Два способа оплаты — разные балансы',
  creditTitle:'Баланс платформы',credit:'Пополнение, начисления за принятую оплаченную работу и заявка на вывод. Вывод отправляет владелец кошелька обеспечения своей подписью. Заявка сама по себе не является переводом.',creditAction:'Баланс и награды',
  escrowTitle:'Прямой расчёт через контракт · бета',escrow:'Отдельное задание: плательщик подписывает резервирование и принятие, получатели сами подписывают получение. Баланс платформы сюда не переносится. Нужны GSTD и TON; суммы видны до подписи. Реальная mainnet-выплата ещё требует проверки.',escrowAction:'Открыть mainnet escrow',
  split:'Только принятая оплаченная работа: 85% исполнителю, 10% протоколу, 5% резерву. Дополнительной комиссии GSTD за получение нет; комиссии сети TON оплачивает подписант. Доход не гарантирован.',
  helpTitle:'Если не получилось',
  help:['Кошелёк: проверьте TON mainnet; testnet — отдельная сеть. Подтвердите владение адресом в приложении. Ввод адреса в панели ноды не даёт приложению доступ к кошельку.','Модель: оценка RAM/диска не гарантирует поддержку архитектуры. Сначала проверьте локальный ответ и доступную версию Ollama.','Нет заданий: проверьте регистрацию и доступную модель. Пустая очередь при отсутствии оплаченного спроса нормальна.','Неясен исход перевода: не подписывайте повторно. Сохраните данные восстановления и проверьте состояние контракта.'],
  boundaries:'Сейчас сеть работает на одной физической ноде. Несколько независимых операторов, Telegram на устройстве пользователя и восстановление на другой машине требуют отдельной практической проверки.',
 },
 en: {
  title:'Start here',intro:'Choose what you want to do. Free chat and local model execution do not require buying GSTD.',
  cards:[
   {title:'Use AI',steps:['To start without a wallet, choose Free and Auto in the app chat. Access depends on quota and a free node.','Choose a model. If it is unavailable in the network, install it locally or choose another yourself.','Before a network request, check the executor and price. Share your prompt only with explicit consent.'],action:'Open chat',path:'/chat'},
   {title:'Run a node',steps:['On Linux x86-64/ARM64 or WSL2, open the installation page. The installer prints your dashboard address.','Set a dashboard PIN and bind your public TON address under Reward wallet. No seed phrase is needed.','In Model directory, choose a resource-compatible estimate or public Hugging Face GGUF, download it and test a local prompt.','Check registration, heartbeat and a free compute slot. Work depends on demand; installation and being online do not earn rewards.'],action:'Install a node',path:'/nodes'},
   {title:'Build an application',steps:['Start with the API documentation and available models. A listed model does not guarantee a free executor.','Request an exact model and handle unavailability, limits and errors. Never substitute without user consent.','Worker integrations use a persistent signing identity. The A2A SDK is experimental; a wallet does not replace node authentication.'],action:'API documentation',path:'/developers'}
  ],
  paymentTitle:'Two payment paths — separate balances',
  creditTitle:'Platform balance',credit:'Deposits, accepted paid-work credits and withdrawal requests. The custody wallet owner signs the payout. A withdrawal request alone does not transfer tokens.',creditAction:'Balance and rewards',
  escrowTitle:'Direct contract settlement · beta',escrow:'A separate job: the payer signs funding and acceptance; beneficiaries sign their own claims. Platform balances are not moved here. GSTD and TON are required; amounts appear before signing. A real mainnet payout still needs verification.',escrowAction:'Open mainnet escrow',
  split:'Accepted paid work only: 85% executor, 10% protocol, 5% reserve. No extra GSTD claim fee; the signer pays TON network fees. Earnings are not guaranteed.',
  helpTitle:'If something goes wrong',
  help:['Wallet: check TON mainnet; testnet is a separate network. Verify address ownership in the app. Pasting an address in the node dashboard does not authenticate that wallet in the app.','Model: RAM/disk estimates do not guarantee architecture support. First check a local response and the installed Ollama version.','No work: check registration and an available model. An empty queue is normal when there is no funded demand.','Uncertain transfer: do not sign again. Keep recovery details and check contract state.'],
  boundaries:'The deployment currently has one physical node. Independent operators, Telegram on a user device and recovery on another machine need separate practical verification.',
 }
} as const;

export function GettingStarted(){
 const {language}=useLanguage(),c=copy[language];
 return <section id="get-started" className="py-10 text-slate-200" aria-labelledby="getting-started-title">
  <h2 id="getting-started-title" className="text-3xl font-semibold text-[#D4AF37]">{c.title}</h2>
  <p className="mt-3 text-slate-300">{c.intro}</p>
  <div className="mt-6 grid gap-4 md:grid-cols-3">{c.cards.map(card=><article key={card.title} className="rounded-xl border border-[#D4AF37]/25 p-5 flex flex-col">
   <h3 className="text-xl font-semibold text-white">{card.title}</h3>
   <ol className="mt-4 list-decimal pl-5 space-y-3 text-sm leading-relaxed">{card.steps.map(step=><li key={step}>{step}</li>)}</ol>
   <a className="mt-auto pt-5 text-[#D4AF37] underline underline-offset-4" href={card.path==='/chat'?appUrl(language,'/chat'):card.path+'?lang='+language}>{card.action}</a>
  </article>)}</div>
  <h3 className="mt-9 text-xl font-semibold text-white">{c.paymentTitle}</h3>
  <div className="mt-4 grid gap-4 md:grid-cols-2">
   <article className="rounded-xl border border-white/15 p-5"><h4 className="font-semibold">{c.creditTitle}</h4><p className="mt-2 text-sm leading-relaxed">{c.credit}</p><a className="mt-3 inline-block text-[#D4AF37] underline" href={appUrl(language,'/payments')}>{c.creditAction}</a></article>
   <article className="rounded-xl border border-white/15 p-5"><h4 className="font-semibold">{c.escrowTitle}</h4><p className="mt-2 text-sm leading-relaxed">{c.escrow}</p><a className="mt-3 inline-block text-[#D4AF37] underline" href={appUrl(language,'/escrow-mainnet')}>{c.escrowAction}</a></article>
  </div>
  <p className="mt-4 text-sm leading-relaxed">{c.split}</p>
  <h3 className="mt-8 text-xl font-semibold text-white">{c.helpTitle}</h3>
  <ul className="mt-3 list-disc pl-5 space-y-2 text-sm leading-relaxed">{c.help.map(item=><li key={item}>{item}</li>)}</ul>
  <p className="mt-5 text-sm text-amber-200">{c.boundaries}</p>
 </section>;
}
