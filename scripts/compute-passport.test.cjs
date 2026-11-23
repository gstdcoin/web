const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),ts=require('typescript');
const {generateKeyPairSync,createHash,sign,webcrypto}=require('node:crypto');
const source=fs.readFileSync('src/lib/compute-passport.ts','utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const exportsObject={};vm.runInNewContext(compiled,{exports:exportsObject,crypto:webcrypto,TextEncoder,TextDecoder,Uint8Array,Response,AbortSignal,Set,Date});
const {passportSoftware,passportNodes,collectComputePassport,RELEASE_ROOT}=exportsObject;
const now=1800000000000;
function signed(){const {publicKey,privateKey}=generateKeyPairSync('ed25519');const root=publicKey.export({type:'spki',format:'der'}).subarray(-32).toString('hex');
 const m={commit:'a'.repeat(40),branch:'main',version:'3.7.3',timestamp:now};m.sig=sign(null,createHash('sha256').update(m.commit+':main:'+m.version+':'+now).digest(),privateKey).toString('hex');return{manifest:m,root};}
const node={node_id:'node-1234',name:'CPU node',version:'3.7.3',cpu_cores:4,has_gpu:false,capabilities:['qwen2.5:0.5b'],last_seen:new Date(now-1000).toISOString(),wallet:'private-omit',node_url:'https://omit.invalid'};
test('verifies the signed payload using the pinned root, rejects wrong roots and ignores the advertised key',async()=>{
 const f=signed();assert.equal((await passportSoftware({manifest:f.manifest},now,f.root)).signature_verified,true);
 assert.equal(await passportSoftware({manifest:f.manifest,public_key:f.root},now),null);
 assert.equal(await passportSoftware({manifest:f.manifest},now,RELEASE_ROOT),null);
 for(const delta of [{commit:'b'.repeat(40)},{version:'3.7.4'},{branch:'other'},{timestamp:now-60001},{timestamp:now+60001},{sig:'0'.repeat(128)},{commit:'https://malicious.invalid'}])
  assert.equal(await passportSoftware({manifest:{...f.manifest,...delta}},now,f.root),null);
});
test('publishes bounded reported capabilities while omitting wallet and endpoint data',()=>{
 const rows=passportNodes({nodes:[node,node]},now);assert.equal(rows.length,1);assert.equal(rows[0].gpu_reported,false);assert.equal(rows[0].cpu_cores,4);
 assert.equal(JSON.stringify(rows).includes('private-omit'),false);assert.equal(JSON.stringify(rows).includes('omit.invalid'),false);
 assert.equal(passportNodes({nodes:[{...node,cpu_cores:2.5}]},now),null);
 assert.equal(passportNodes({nodes:[{...node,last_seen:new Date(now+60000).toISOString()}]},now),null);
 assert.equal(passportNodes({nodes:[{...node,last_seen:new Date(now-600001).toISOString()}]},now).length,0);
});
test('collects only five fixed read-only sources and preserves genuine zero statistics',async()=>{
 const f=signed(),calls=[];
 const get=async(url,options)=>{calls.push({url,options});assert.equal(options.redirect,'manual');assert.equal(options.method,undefined);
  if(url.endsWith('/network/stats'))return Response.json({active_workers:0,total_nodes:0,tasks_completed:0});
  if(url.endsWith('/nodes/list'))return Response.json({nodes:[]});
  if(url.endsWith('/update/manifest'))return Response.json({manifest:f.manifest});
  if(url.endsWith('/telegram/health'))return Response.json({status:'ok',checks:{telegram_api:true,bot_identity:true,webhook:true}});
  if(url.endsWith('/health'))return Response.json({status:'ok',storage:'redis'});
  throw Error('unexpected target');};
 const r=await collectComputePassport(get,now,f.root);assert.equal(r.status,'ok');assert.equal(r.stats.online,0);assert.equal(r.stats.accepted_tasks,0);assert.equal(r.telegram,'ok');assert.equal(r.software.signature_verified,true);
 assert.equal(calls.length,5);assert.equal(calls.every(x=>x.url.startsWith('https://app.gstdtoken.xyz/api/v1/')),true);assert.equal(r.scope.hardware,'node_reported');assert.equal(r.scope.task_metrics,'not_published');
});
test('isolates failures and never converts absent or malformed measurements to zero',async()=>{
 const r=await collectComputePassport(async url=>url.endsWith('/network/stats')?Response.json({active_workers:-1,total_nodes:1,tasks_completed:4}):Promise.reject(Error('private failure')),now);
 assert.equal(r.stats,null);assert.equal(r.nodes,null);assert.equal(r.software,null);assert.equal(r.platform,'unavailable');assert.equal(r.telegram,'unavailable');assert.equal(r.status,'degraded');assert.equal(JSON.stringify(r).includes('private failure'),false);
});
test('distinguishes Telegram degradation from unavailability and rejects redirects or oversized input',async()=>{
 const r=await collectComputePassport(async url=>url.endsWith('/telegram/health')?Response.json({status:'degraded',checks:{telegram_api:true,bot_identity:true,webhook:false}},{status:503}):new Response(null,{status:302,headers:{Location:'https://malicious.invalid'}}),now);
 assert.equal(r.telegram,'degraded');assert.equal(r.stats,null);assert.equal(r.software,null);
 const large=await collectComputePassport(async()=>new Response('x'.repeat(524289)),now);assert.equal(large.stats,null);assert.equal(large.nodes,null);
});
test('new service binding permissions remain public-read-only and exclude admin maintenance',()=>{
 const s=fs.readFileSync('src/lib/platform-fetch.ts','utf8');assert.match(s,/\/api\/v1\/nodes\/update\/manifest/);assert.match(s,/\/api\/v1\/telegram\/health/);
 assert.doesNotMatch(s,/telegram\/admin|finance\/withdraw/);assert.match(s,/method !== 'GET'/);
});
