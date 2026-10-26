"use client";
import {useEffect,useState} from 'react';
import {useLanguage} from './LanguageProvider';
type Model={model_id:string;nodes_count:number;price_gstd:number};
export function AiMarketplace(){
 const ru=useLanguage().language!=='en';
 const [models,setModels]=useState<Model[]|null>(null),[error,setError]=useState(false);
 async function load(){try{
  const r=await fetch('https://app.gstdtoken.com/api/v1/models/available',{signal:AbortSignal.timeout(8000)});
  if(!r.ok)throw new Error();const data=await r.json();
  if(!Array.isArray(data.models))throw new Error();
  setModels(data.models.filter((m:Model)=>m.nodes_count>0));setError(false);
 }catch{setError(true);}}
 useEffect(()=>{void load();},[]);
 return <section className="py-16 px-4 max-w-4xl mx-auto space-y-5">
  <h1 className="text-4xl font-bold">{ru?'Доступные модели':'Available models'}</h1>
  <p className="text-slate-400">{ru?'Модели из живого реестра нод. Прямой бесплатный чат и платный API имеют отдельные квоты. Качество зависит от выбранной модели.':'Models from the live node registry. The free demo and paid API have separate quotas. Quality depends on the selected model.'}</p>
  {error?<p>{ru?'Реестр недоступен':'Registry unavailable'}</p>:models===null?<p>…</p>:models.length===0?<p>{ru?'Нет доступных моделей':'No available models'}</p>:<table className="w-full text-left"><thead><tr><th>{ru?'Модель':'Model'}</th><th>{ru?'Ноды':'Nodes'}</th><th>GSTD / {ru?'запрос':'request'}</th></tr></thead><tbody>{models.map(m=><tr key={m.model_id}><td className="py-3 font-mono">{m.model_id}</td><td>{m.nodes_count}</td><td>{m.price_gstd}</td></tr>)}</tbody></table>}
  <button className="underline" onClick={()=>void load()}>{ru?'Обновить':'Refresh'}</button>
 </section>;
}
