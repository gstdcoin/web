'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight,CheckCircle2,RefreshCw,ShieldCheck,Server,Activity} from 'lucide-react';
import {useLanguage} from './LanguageProvider';
import type {ComputePassport as Passport} from '@/lib/compute-passport';

export function ComputePassport(){
 const ru=useLanguage().language!=='en';
 const [data,setData]=useState<Passport|null>(null),[busy,setBusy]=useState(false),[error,setError]=useState(false);
 const [revision,setRevision]=useState(0);
 useEffect(()=>{
  const controller=new AbortController();let running=false;
  const load=async()=>{
   if(running||document.hidden)return;running=true;setBusy(true);
   try{const r=await fetch('/api/network/passport',{signal:AbortSignal.any([controller.signal,AbortSignal.timeout(8000)])});if(!r.ok)throw Error('unavailable');
    const d=await r.json() as Passport;if(!Number.isSafeInteger(d.checked_at)||!['ok','degraded'].includes(d.status))throw Error('invalid_report');
    if(!controller.signal.aborted){setData(d);setError(false);}
   }catch{if(!controller.signal.aborted){setData(null);setError(true);}}
   finally{running=false;if(!controller.signal.aborted)setBusy(false);}
  };
  void load();const timer=setInterval(()=>void load(),60000);const visible=()=>{if(!document.hidden)void load();};
  document.addEventListener('visibilitychange',visible);
  return()=>{controller.abort();clearInterval(timer);document.removeEventListener('visibilitychange',visible);};
 },[revision]);
 const unavailable=ru?'Нет подтверждённых данных':'No confirmed data';
 return <div className="bg-[#090b10] min-h-screen">
  <section className="max-w-6xl mx-auto px-4 pt-14 md:pt-20 pb-10">
   <div className="flex flex-wrap justify-between items-center gap-4 mb-7">
    <p className="text-xs tracking-[0.22em] uppercase text-[#D4AF37]">GSTD / Compute Passport</p>
    <button onClick={()=>setRevision(x=>x+1)} disabled={busy} className="flex items-center gap-2 text-sm border border-white/20 rounded-full px-4 py-2 disabled:opacity-50"><RefreshCw size={14} className={busy?'animate-spin':''}/>{ru?'Обновить':'Refresh'}</button>
   </div>
   <h1 className="text-4xl md:text-6xl max-w-4xl font-semibold leading-tight">{ru?'Сеть, которую можно проверить.':'A network you can inspect.'}</h1>
   <p className="text-slate-400 text-lg max-w-3xl mt-6">{ru?'Посмотрите, какие ноды доступны, какие модели они объявляют и какая версия ПО одобрена оператором. Источники и границы каждого показателя открыты.':'See available nodes, the models they advertise and the software release approved by the operator. Every indicator has a source and a stated scope.'}</p>
   <p role="status" aria-live="polite" className="text-sm text-slate-400 mt-6">{error?unavailable:data?<>{data.status==='ok'?'●':'◐'} {ru?'Проверено':'Checked'} {new Date(data.checked_at).toLocaleTimeString(ru?'ru-RU':'en-GB')} · {ru?'обновление раз в минуту':'refreshes every minute'}</>:ru?'Проверяем источники…':'Checking sources…'}</p>
  </section>
  <section className="max-w-6xl mx-auto px-4 pb-12 grid md:grid-cols-3 gap-4" aria-label={ru?'Факты сети':'Network facts'}>
   {[[ru?'Нод онлайн':'Online nodes',data?.stats?.online],[ru?'Нод в реестре':'Registered nodes',data?.stats?.registered],[ru?'Принято задач сетью':'Tasks accepted by the network',data?.stats?.accepted_tasks]].map(([label,value])=><article key={String(label)} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6"><p className="text-sm text-slate-400">{label}</p><p className="text-4xl text-[#D4AF37] font-mono mt-4">{typeof value==='number'?value.toLocaleString(): '—'}</p><p className="text-xs text-slate-500 mt-4">{ru?'Источник: реестр платформы':'Source: platform registry'}</p></article>)}
  </section>
  <section className="max-w-6xl mx-auto px-4 pb-12 grid lg:grid-cols-[1.4fr_1fr] gap-6">
   <article className="rounded-2xl border border-white/10 p-6 md:p-8">
    <h2 className="flex gap-3 items-center text-xl font-semibold"><Server className="text-[#D4AF37]" size={22}/>{ru?'Доступное исполнение':'Available execution'}</h2>
    <p className="text-sm text-slate-400 mt-3">{ru?'Конфигурация и модели заявлены нодами. Это не независимая проверка GPU, VRAM или качества модели.':'Configuration and models are reported by nodes. This does not independently verify GPU, VRAM or model quality.'}</p>
    {data?.nodes===null||!data?<p className="text-slate-500 mt-6">{unavailable}</p>:data.nodes.length===0?<p className="text-slate-400 mt-6">{ru?'Свежих нод в реестре нет.':'No recent nodes in the registry.'}</p>:<div className="mt-6 space-y-4">{data.nodes.map(node=><div key={node.id} className="border-l-2 border-[#D4AF37]/50 pl-4 py-1">
     <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-medium break-words">{node.name}</h3><span className="text-xs text-slate-400">v{node.version} · {node.cpu_cores} CPU</span></div>
     <p className="text-xs text-slate-500 mt-2 font-mono break-all">{node.id}</p>
     <p className="text-xs text-[#D4AF37] mt-2">{node.gpu_reported?(ru?'GPU заявлен оператором':'GPU reported by operator'):(ru?'CPU-профиль · GPU не заявлен':'CPU profile · no GPU reported')}</p>
     <ul className="text-sm text-slate-300 mt-3 space-y-2">{node.models.map(model=><li key={model} className="break-all font-mono text-xs">{model}</li>)}</ul>
    </div>)}</div>}
   </article>
   <div className="space-y-6">
    <article className="rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/[0.035] p-6">
     <h2 className="text-xl flex gap-3 items-center font-semibold"><ShieldCheck className="text-[#D4AF37]" size={22}/>{ru?'Подписанное ПО':'Signed software'}</h2>
     {data?.software?<><p className="font-mono text-3xl mt-5">{data.software.version}</p><p className="text-sm text-emerald-400 flex gap-2 items-center mt-3"><CheckCircle2 size={15}/>{ru?'Подпись Ed25519 проверена':'Ed25519 signature verified'}</p>
      <a className="font-mono break-all text-xs text-slate-400 underline mt-4 block" href={'https://github.com/gstdcoin/gstdbot/commit/'+data.software.commit} target="_blank" rel="noreferrer">{data.software.commit}</a></>:<p className="mt-5 text-slate-400">{unavailable}</p>}
     <p className="text-xs text-slate-500 mt-4">{ru?'Одобрение версии отделено от новых коммитов. Подпись проверяется закреплённым публичным ключом.':'Release approval is separate from new commits. The signature is checked against the pinned public key.'}</p>
    </article>
    <article className="rounded-2xl border border-white/10 p-6"><h2 className="text-xl flex gap-3 items-center font-semibold"><Activity className="text-[#D4AF37]" size={22}/>{ru?'Сервисы':'Services'}</h2>
     <dl className="mt-5 space-y-3 text-sm">{[['Platform / Redis',data?.platform],['Telegram',data?.telegram]].map(([name,status])=><div key={name} className="flex justify-between gap-3"><dt className="text-slate-400">{name}</dt><dd className={status==='ok'?'text-emerald-400':'text-amber-300'}>{status==='ok'?(ru?'Доступен':'Available'):status==='degraded'?(ru?'Требует внимания':'Needs attention'):unavailable}</dd></div>)}</dl>
    </article>
   </div>
  </section>
  <section className="max-w-6xl mx-auto px-4 pb-16"><div className="rounded-2xl border border-white/10 p-6 md:p-8"><h2 className="text-xl font-semibold">{ru?'Что ещё нужно измерить':'What still needs measurement'}</h2>
   <p className="text-sm text-slate-400 mt-3 max-w-3xl">{ru?'Цена успешной задачи, p95 времени до первого токена и доля успешных задач требуют квитанций по конкретной модели и сопоставимой нагрузке. Общий счётчик задач и присутствие ноды не заменяют эти измерения. Пока такой выборки нет в публичном API, значения не публикуются.':'Cost per successful task, p95 time to first token and task success rate require receipts for a specific model and comparable workload. Total task counts and node presence do not establish these metrics. Values remain unpublished until a suitable sample is available in the public API.'}</p>
   <div className="flex flex-wrap gap-6 mt-6 text-sm text-[#D4AF37]"><a href="https://github.com/gstdcoin/ai/blob/main/docs/SIGNED_NODE_RELEASES.md" target="_blank" rel="noreferrer">{ru?'Доказательства выпуска':'Release evidence'} ↗</a><Link href="/developers" className="flex gap-1 items-center">{ru?'Интеграция API':'Build with the API'}<ArrowUpRight size={15}/></Link><Link href="/nodes">{ru?'Подключить свою ноду':'Connect your node'} →</Link></div>
  </div></section>
 </div>;
}
