const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');
const exported={};
require('node:vm').runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/node-response-guard.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports:exported,ReadableStream,TextDecoder,TextEncoder});
const {assertNodeCompletion,guardNodeStream}=exported;
const reply=(model,content='answer')=>({model,choices:[{message:{content}}]});
const event=(model,content='answer')=>({model,choices:[{delta:{content}}]});
const data=value=>`data: ${JSON.stringify(value)}\n\n`;
const stream=text=>new ReadableStream({start(c){const bytes=new TextEncoder().encode(text);for(let i=0;i<bytes.length;i+=7)c.enqueue(bytes.slice(i,i+7));c.close();}});
const read=upstream=>new Response(upstream).text();
test('completion guard accepts exact models and Ollama latest expansion only',()=>{
 assert.doesNotThrow(()=>assertNodeCompletion(reply('llama3.2:3b'),'llama3.2:3b'));
 assert.doesNotThrow(()=>assertNodeCompletion(reply('qwen:latest'),'qwen'));
 assert.throws(()=>assertNodeCompletion(reply('qwen:7b'),'qwen'));
 assert.throws(()=>assertNodeCompletion(reply('llama3.2:3b'),'qwen:7b'));
 assert.throws(()=>assertNodeCompletion(reply(undefined),'qwen'));
 assert.doesNotThrow(()=>assertNodeCompletion(reply('other'),'auto'));
});
test('completion guard rejects fallback, upstream errors and empty content',()=>{
 for(const value of [{...reply('x'),_gstd:{tier:'fallback'}},{...reply('x'),error:'failed'},{...reply('x'),_gstd:{error:'failed'}},reply('x','  ')])assert.throws(()=>assertNodeCompletion(value,'auto'));
});
test('stream checks model before exposing response text across split events',async()=>{
 const result=await read(guardNodeStream(stream(data(event('wrong','MUST_NOT_LEAK'))+'data: [DONE]\n\n'),'qwen:7b'));
 assert.ok(result.includes('node_response_invalid'));assert.ok(!result.includes('MUST_NOT_LEAK'));
});
test('stream accepts one model announcement and equivalent latest tag',async()=>{
 const result=await read(guardNodeStream(stream(data(event('qwen:latest','first'))+data(event(undefined,' second'))+'data: [DONE]\n\n'),'qwen'));
 assert.ok(result.includes('first'));assert.ok(result.includes(' second'));assert.ok(result.includes('[DONE]'));assert.ok(!result.includes('node_response_invalid'));
});
test('stream errors, model changes and incomplete replies are terminal failures',async()=>{
 for(const text of [data({...event('qwen'),error:{code:'failed'}})+'data: [DONE]\n\n',data(event('qwen','first'))+data(event('wrong','MUST_NOT_LEAK'))+'data: [DONE]\n\n',data(event('qwen','first')),'data: [DONE]\n\n']){
  const result=await read(guardNodeStream(stream(text),'qwen'));
  assert.ok(result.includes('node_response_invalid'));assert.ok(!result.includes('MUST_NOT_LEAK'));assert.ok(!result.includes('[DONE]'));
 }
});
