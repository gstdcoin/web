const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');
const exported={};
require('node:vm').runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/chat-request-guard.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports:exported,Map,Date,TextDecoder,Uint8Array});
const {allowsCloudFallback,validateChatBody,readJsonBody}=exported;
const message={role:'user',content:'hello'};
test('provider consent does not authorize substitution of a requested model',()=>{
 for(const model of ['llama3.2:3b','qwen3.5:0.8b','unknown-model'])assert.equal(allowsCloudFallback({allow_cloud_fallback:true},{model}),false);
 for(const model of [undefined,'auto']){
  assert.equal(allowsCloudFallback({allow_cloud_fallback:true},{model}),true);
  for(const consent of [undefined,false,'true',1])assert.equal(allowsCloudFallback({allow_cloud_fallback:consent},{model}),false);
 }
});
test('oversized and malformed chat requests fail before upstream inference',async()=>{
 assert.equal(validateChatBody({messages:Array(33).fill(message)}),null);
 assert.equal(validateChatBody({messages:[{...message,content:'x'.repeat(8001)}]}),null);
 assert.equal(validateChatBody({messages:[message],max_tokens:2049}),null);
 assert.equal((await readJsonBody(new Request('https://test/chat',{method:'POST',body:'x'.repeat(32769)}))).status,413);
 assert.equal((await readJsonBody(new Request('https://test/chat',{method:'POST',body:'{'}))).status,400);
});
