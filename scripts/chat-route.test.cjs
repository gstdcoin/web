const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),ts=require('typescript');
const compile=path=>ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
function route(bindings) {
 const env=bindings ?? {GSTD_TRUSTED_NODE_IDS:'trusted-runtime',CHAT_RATE_LIMITER:{limit:async()=>({success:true})}};
 const attempts=[],registry={nodes:[{node_id:'trusted-runtime',node_url:'https://current-tunnel.trycloudflare.com',is_online:true,last_seen:new Date().toISOString()}]};
 const load=(path,require)=>{const exports={};vm.runInNewContext(compile(path),{exports,require,process:{env:{NODE_ENV:'production'}},URL,AbortSignal,Response,Request,Date,Set,Map,TextEncoder,TextDecoder,Uint8Array,ReadableStream,console,fetch:async(url,options)=>{
  attempts.push({url,options});return Response.json({model:'qwen2.5:0.5b',choices:[{message:{content:'real fixture response'}}]});
 }});return exports;};
 const discovery=load('src/lib/node-discovery.ts',()=>({platformFetch:async()=>Response.json(registry)}));
 const guard=load('src/lib/chat-request-guard.ts',()=>{}),response=load('src/lib/node-response-guard.ts',()=>{});
 const api=load('src/app/api/chat/route.ts',name=>{
  if(name==='next/server')return {NextResponse:Response};
  if(name==='@/lib/node-discovery')return discovery;
  if(name==='@/lib/node-response-guard')return response;
  if(name==='@/lib/chat-request-guard')return guard;
  if(name==='@opennextjs/cloudflare')return {getCloudflareContext:async()=>({env})};
  throw Error('unexpected dependency');
 });
 return {api,attempts};
}
const request=()=>new Request('https://gstdtoken.xyz/api/chat',{method:'POST',body:JSON.stringify({model:'auto',messages:[{role:'user',content:'test'}],stream:true,allow_cloud_fallback:false})});
test('production route discovers the live trusted node from Worker bindings with an empty process environment',async()=>{
 const {api,attempts}=route();const r=await api.POST(request());assert.equal(r.status,200);
 assert.equal((await r.json()).choices[0].message.content,'real fixture response');
 assert.equal(attempts.length,1);assert.equal(attempts[0].url,'https://current-tunnel.trycloudflare.com/v1/chat/completions');
 assert.equal(attempts[0].options.redirect,'manual');assert.equal(attempts[0].options.signal.aborted,false);
});
test('missing runtime trust or rate limiter cannot open production routing',async()=>{
 for(const env of [{CHAT_RATE_LIMITER:{limit:async()=>({success:true})}},{GSTD_TRUSTED_NODE_IDS:'trusted-runtime'}]){
  const {api,attempts}=route(env),r=await api.POST(request());assert.equal(r.status,503);assert.equal(attempts.length,0);
 }
});
