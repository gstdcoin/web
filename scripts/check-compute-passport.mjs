export async function checkComputePassport(origin,request=fetch){
 const url=new URL('/api/network/passport',origin);
 const r=await request(url,{redirect:'manual',signal:AbortSignal.timeout(20000)});
 if(!r.ok)throw Error('compute_passport_unavailable');const d=await r.json();
 if(!Number.isSafeInteger(d.checked_at)||Math.abs(Date.now()-d.checked_at)>180000||!['ok','degraded'].includes(d.status)||
  d.scope?.hardware!=='node_reported'||d.scope?.task_metrics!=='not_published'||!d.stats||
  !['online','registered','accepted_tasks'].every(k=>Number.isSafeInteger(d.stats[k])&&d.stats[k]>=0)||!Array.isArray(d.nodes)||
  d.software?.signature_verified!==true||!/^[a-f0-9]{40}$/.test(d.software.commit)||typeof d.software.version!=='string'||d.platform!=='ok')throw Error('compute_passport_invalid_or_unverified');
 return{status:d.status,online:d.stats.online,version:d.software.version,software_verified:true,telegram:d.telegram};
}
if(process.argv[1]&&import.meta.url===(await import('node:url')).pathToFileURL(process.argv[1]).href){
 try{console.log(JSON.stringify(await checkComputePassport(process.argv[2])));}catch{console.error('Compute Passport smoke check failed');process.exitCode=1;}
}
