const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');
function loadRoute(path){
 const exported={};
 require('node:vm').runInNewContext(ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports:exported,require(name){
  // Importing cloud inference, node state or networking here would reintroduce
  // the old unconsented executor / fake-live-peer behaviour.
  assert.equal(name,'next/server');return{NextResponse:{json:(body,options)=>({body,...options})}};
 }});
 return exported;
}
test('legacy cloud peer cannot execute an inference request or replace a named model',async()=>{
 const {POST}=loadRoute('src/app/v1/ollama/completions/route.ts');
 const response=await POST(new Request('https://site/v1/ollama/completions',{method:'POST',body:JSON.stringify({model:'qwen:7b',messages:[{role:'user',content:'private question'}]})}));
 assert.equal(response.status,410);assert.equal(response.body.error.code,'legacy_cloud_peer_retired');assert.ok(!response.body.choices);assert.ok(!JSON.stringify(response).includes('private question'));
});
test('website heartbeat does not advertise a live inference executor',async()=>{
 const {POST}=loadRoute('src/app/api/peers/heartbeat/route.ts');
 const response=await POST();assert.equal(response.status,410);assert.equal(response.body.error.code,'website_is_not_compute_peer');assert.notEqual(response.body.ok,true);
});
