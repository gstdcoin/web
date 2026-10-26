const assert=require('node:assert/strict'),{test}=require('node:test'),fs=require('node:fs'),ts=require('typescript'),Module=require('node:module');
const filename=require('node:path').join(__dirname,'../src/lib/publicFinance.ts'),compiled=new Module(filename,module);
compiled.filename=filename;compiled.paths=module.paths;compiled._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,filename);
const {publicFinanceView}=compiled.exports;
test('accepts the canonical v2 fund response without removed legacy collection fields',()=>{
 assert.deepEqual(publicFinanceView({ledger_version:2,treasury_gstd:1.25,reserve_gstd:.625,protocol_nano:'1250000000'}),{ledger_version:2,treasury_gstd:1.25,reserve_gstd:.625});
});
test('does not fabricate zero balances for missing, stale or invalid fund data',()=>{
 for(const data of [null,{}, {treasury_gstd:0,total_collected_gstd:0,total_distributed_gstd:0},{ledger_version:2,treasury_gstd:0},{ledger_version:2,treasury_gstd:NaN,reserve_gstd:0},{ledger_version:2,treasury_gstd:0,reserve_gstd:-1}])assert.equal(publicFinanceView(data),null);
});
