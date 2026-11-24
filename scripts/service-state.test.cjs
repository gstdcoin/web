const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');
const exported={};require('node:vm').runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/service-state.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports:exported,Date});
const {serviceState}=exported,now=1800000000000;
test('fresh observations keep platform, node presence and Telegram independent',()=>{
 const s=serviceState({checked_at:now,platform:'ok',telegram:'degraded',stats:{online:1}},now);
 assert.equal(s.platform,true);assert.equal(s.telegram,false);assert.equal(s.online,1);
 assert.equal(serviceState({checked_at:now,stats:{online:0}},now).online,0);
});
test('stale, absent, future and malformed statuses never become green or zero',()=>{
 for(const input of [null,{}, {checked_at:now-180001,platform:'ok'}, {checked_at:now+5001,telegram:'ok'}]) {
  const s=serviceState(input,now);assert.equal(s.checkedAt,null);assert.equal(s.platform,null);assert.equal(s.telegram,null);assert.equal(s.online,null);
 }
 const s=serviceState({checked_at:now,platform:'working',telegram:true,stats:{online:-1}},now);
 assert.equal(s.platform,null);assert.equal(s.telegram,null);assert.equal(s.online,null);
});
