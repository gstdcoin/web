const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const ts=require('typescript');
const {runInNewContext}=require('node:vm');
const code=ts.transpileModule(fs.readFileSync('src/lib/ecosystem-links.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const exported={};
runInNewContext(code,{exports:exported,URL,URLSearchParams,require:()=>({LINKS:{app:'https://app.gstdtoken.com'}})});
test('website to app navigation preserves locale and exact model without transferring other data',()=>{
 const model='custom/model:tag&session=not-a-session';
 const url=new URL(exported.appUrl('ru','/chat',model));
 assert.equal(url.origin,'https://app.gstdtoken.com');assert.equal(url.pathname,'/ru/chat');
 assert.equal(url.searchParams.get('model'),model);assert.equal(url.searchParams.size,1);
 assert.equal(exported.appUrl('en','/payments'),'https://app.gstdtoken.com/payments');
 assert.equal(exported.appUrl('ru','/nodes'),'https://app.gstdtoken.com/ru/nodes');
 assert.throws(()=>exported.appUrl('en','//other.example'));
});
test('return link language wins over saved preference and ignores unsupported languages',()=>{
 assert.equal(exported.websiteLanguage('?lang=en','ru'),'en');
 assert.equal(exported.websiteLanguage('?lang=ru','en'),'ru');
 assert.equal(exported.websiteLanguage('?lang=invalid','en'),'en');
 assert.equal(exported.websiteLanguage('?model=qwen3.5%3A0.8b',null),'ru');
});
