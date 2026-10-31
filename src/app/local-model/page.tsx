'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {useLanguage} from '@/components/LanguageProvider';
import {parseModelImport,nodeImportLink,type ModelImport} from '@/lib/local-model';
export default function LocalModel(){
 const {language}=useLanguage(),ru=language==='ru';
 const [model,setModel]=useState<ModelImport|null>(null),[address,setAddress]=useState('http://localhost:8081'),[invalid,setInvalid]=useState(false);
 useEffect(()=>{try{setModel(parseModelImport(window.location.search));}catch{setInvalid(true);}},[]);
 let link='';try{if(model)link=nodeImportLink(address,model);}catch{}
 return <main className="container mx-auto max-w-3xl px-4 py-14 space-y-6">
 <h1 className="text-3xl font-bold">{ru?'Открыть модель в своей ноде GSTD':'Open a model in your GSTD node'}</h1>
 <p>{ru?'Модель будет только подставлена в форму. Проверка лицензии, совместимости и скачивание выполняются в вашей защищённой панели отдельными кнопками.':'This only prefills a form. Review the licence, compatibility and download in your protected node dashboard using separate buttons.'}</p>
 {invalid&&<p role="alert">{ru?'Ссылка модели некорректна. Поддерживаются публичные репозитории и отдельные GGUF-файлы основной ветки.':'Invalid model link. Public repositories and single GGUF files on the default branch are supported.'}</p>}
 {model&&<><p className="break-all">{model.repository}{model.file?' / '+model.file:''}</p><a className="text-[#D4AF37] underline" href={'https://huggingface.co/'+model.repository} target="_blank" rel="noreferrer">{ru?'Проверить источник модели':'Review model source'} ↗</a></>}
 <label className="block">{ru?'Адрес вашей ноды':'Your node address'}<input className="block w-full bg-black border border-white/30 rounded p-3 mt-2" value={address} onChange={e=>setAddress(e.target.value)} placeholder="http://localhost:8081" spellCheck={false}/></label>
 <p className="text-sm text-slate-400">{ru?'localhost — этот компьютер. Для другой машины укажите её адрес. Не вставляйте PIN, пароль или токены. Страница не обращается к ноде автоматически и не сохраняет её адрес.':'localhost means this computer. Enter the address for another machine. Never paste a PIN, password or token. This page neither contacts your node automatically nor saves its address.'}</p>
 {model&&!link&&<p role="alert">{ru?'Укажите HTTPS-адрес или локальный HTTP-адрес без пути, пароля и параметров.':'Enter an HTTPS address or local HTTP address without a path, password or parameters.'}</p>}
 <p><a className="inline-block rounded border border-[#D4AF37] px-5 py-3 text-[#D4AF37]" href={link||undefined} aria-disabled={!link} onClick={e=>{if(!link)e.preventDefault();}} target="_blank" rel="noopener noreferrer">{ru?'Открыть мою ноду':'Open my node'} ↗</a></p>
 {link&&<p className="break-all text-sm text-slate-400">{link}</p>}
 <p>{ru?'Для входа потребуется PIN вашей ноды. Нет установленной ноды?':'Your node PIN is required to sign in. No node installed yet?'} <Link className="text-[#D4AF37] underline" href="/nodes">{ru?'Инструкция установки':'Installation guide'}</Link></p>
 <p className="text-sm text-slate-400">{ru?'Для локального запуска не нужны кошелёк, покупка GSTD или ключ Hugging Face. Закрытые, gated и разбитые GGUF не поддерживаются.':'Local use needs no wallet, GSTD purchase or Hugging Face API key. Private, gated and split GGUF files are unsupported.'}</p>
 </main>;
}
