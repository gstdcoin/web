const ORIGIN='https://app.gstdtoken.xyz';
export const RELEASE_ROOT='82a7b29cca0bff9cdd7ac285277af45287bce77066cf40548ca16ab34a63f30e';
type ObjectValue=Record<string,unknown>;
const object=(v:unknown):v is ObjectValue=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const counter=(v:unknown):v is number=>typeof v==='number'&&Number.isSafeInteger(v)&&v>=0;

export type PassportNode={id:string;name:string;version:string;cpu_cores:number;gpu_reported:boolean;models:string[];last_seen:string};
export type PassportSoftware={version:string;commit:string;signed_at:number;signature_verified:true};
export type ComputePassport={checked_at:number;status:'ok'|'degraded';stats:{online:number;registered:number;accepted_tasks:number}|null;
 nodes:PassportNode[]|null;software:PassportSoftware|null;platform:'ok'|'unavailable';telegram:'ok'|'degraded'|'unavailable';
 scope:{hardware:'node_reported';task_metrics:'not_published'}};

export function passportNodes(value:unknown,now:number):PassportNode[]|null{
 if(!object(value)||!Array.isArray(value.nodes)||value.nodes.length>10000)return null;
 const result:PassportNode[]=[];const ids=new Set<string>();
 for(const row of value.nodes.slice(0,128)){
  if(!object(row)||typeof row.node_id!=='string'||!/^[A-Za-z0-9_.-]{1,100}$/.test(row.node_id)||
   typeof row.name!=='string'||row.name.length>120||typeof row.version!=='string'||!/^[0-9A-Za-z.+-]{1,40}$/.test(row.version)||
   !counter(row.cpu_cores)||row.cpu_cores<1||row.cpu_cores>65536||typeof row.has_gpu!=='boolean'||
   !Array.isArray(row.capabilities)||row.capabilities.length>1000||typeof row.last_seen!=='string')return null;
  const seen=Date.parse(row.last_seen);
  if(!Number.isFinite(seen)||seen>now+30000)return null;
  if(now-seen>600000||ids.has(row.node_id))continue;
  const models=row.capabilities.filter((m):m is string=>typeof m==='string'&&/^[A-Za-z0-9][A-Za-z0-9._:/-]{0,159}$/.test(m));
  ids.add(row.node_id);result.push({id:row.node_id,name:row.name,version:row.version,cpu_cores:row.cpu_cores,gpu_reported:row.has_gpu,
   models:[...new Set(models)].slice(0,20),last_seen:row.last_seen});
 }
 return result;
}

/** The response's advertised public_key cannot select the trust root. */
export async function passportSoftware(value:unknown,now:number,root=RELEASE_ROOT):Promise<PassportSoftware|null>{
 try{
  if(!object(value)||!object(value.manifest))return null;const m=value.manifest;
  if(typeof m.commit!=='string'||!/^[a-f0-9]{40}$/.test(m.commit)||m.branch!=='main'||
   typeof m.version!=='string'||!/^\d{1,4}\.\d{1,4}\.\d{1,4}$/.test(m.version)||!counter(m.timestamp)||Math.abs(now-m.timestamp)>60000||
   typeof m.sig!=='string'||!/^[a-f0-9]{128}$/.test(m.sig)||!/^[a-f0-9]{64}$/.test(root))return null;
  const bytes=(hex:string)=>Uint8Array.from(hex.match(/../g)!,v=>parseInt(v,16));
  const key=await crypto.subtle.importKey('raw',bytes(root),{name:'Ed25519'},false,['verify']);
  const message=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(m.commit+':main:'+m.version+':'+m.timestamp));
  if(!await crypto.subtle.verify('Ed25519',key,bytes(m.sig),message))return null;
  return{version:m.version,commit:m.commit,signed_at:m.timestamp,signature_verified:true};
 }catch{return null;}
}

async function readJson(response:Response):Promise<unknown>{
 if(!response.ok&&response.status!==503)return null;
 const reader=response.body?.getReader();if(!reader)return null;let size=0,text='';const decoder=new TextDecoder();
 try{for(;;){const part=await reader.read();if(part.done)break;size+=part.value.byteLength;if(size>524288)throw Error('response_too_large');text+=decoder.decode(part.value,{stream:true});}
  return JSON.parse(text+decoder.decode());
 }finally{await reader.cancel().catch(()=>undefined);}
}

export async function collectComputePassport(request:typeof fetch,now=Date.now(),root=RELEASE_ROOT):Promise<ComputePassport>{
 const paths=['/api/v1/network/stats','/api/v1/nodes/list','/api/v1/nodes/update/manifest','/api/v1/health','/api/v1/telegram/health'];
 const results=await Promise.allSettled(paths.map(async path=>{
  const response=await request(ORIGIN+path,{redirect:'manual',signal:AbortSignal.timeout(5000),headers:{Accept:'application/json'}});
  return{status:response.status,body:await readJson(response)};
 }));
 const get=(index:number)=>{const r=results[index];return r.status==='fulfilled'?r.value:null;};
 const raw=get(0),s=raw?.body;
 const stats=raw?.status===200&&object(s)&&counter(s.active_workers)&&counter(s.total_nodes)&&counter(s.tasks_completed)?
  {online:s.active_workers,registered:s.total_nodes,accepted_tasks:s.tasks_completed}:null;
 const nodeResponse=get(1),nodes=nodeResponse?.status===200?passportNodes(nodeResponse.body,now):null;
 const release=get(2),software=release?.status===200?await passportSoftware(release.body,now,root):null;
 const health=get(3),h=health?.body,platform=health?.status===200&&object(h)&&h.status==='ok'&&h.storage==='redis'?'ok':'unavailable';
 const bot=get(4),b=bot?.body;
 const telegram=object(b)&&object(b.checks)&&b.checks.telegram_api===true&&b.checks.bot_identity===true?
  (bot?.status===200&&b.status==='ok'&&b.checks.webhook===true?'ok':'degraded'):'unavailable';
 return{checked_at:now,status:stats&&nodes&&software&&platform==='ok'&&telegram==='ok'?'ok':'degraded',stats,nodes,software,platform,telegram,
  scope:{hardware:'node_reported',task_metrics:'not_published'}};
}
