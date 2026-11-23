const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const compiled = ts.transpileModule(fs.readFileSync('src/lib/platform-fetch.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
function platform(context, fallback = () => { throw Error('Public DNS must not be used'); }, production = true) {
  const exports = {};
  vm.runInNewContext(compiled, { exports, URL, Set, fetch: fallback,
    process: { env: { NODE_ENV: production ? 'production' : 'development' } },
    require: () => ({ getCloudflareContext: context }) });
  return exports.platformFetch;
}
test('uses the configured Worker binding without relying on public DNS and keeps redirects manual', async () => {
  let calls = 0;
  const request = platform(async () => ({ env: { GSTD_PLATFORM: { fetch: async (url, options) => {
    calls++; assert.equal(url, 'https://app.gstdtoken.xyz/api/v1/network/stats');
    assert.equal(options.redirect, 'manual'); return Response.json({ status: 'actual upstream' });
  } } } }));
  assert.equal((await request('https://app.gstdtoken.xyz/api/v1/network/stats')).status, 200);
  assert.equal(calls, 1);
});
test('rejects other origins, non-public paths and writes before contacting any service', async () => {
  const request = platform(() => { throw Error('must not access binding'); });
  for (const url of ['https://untrusted.example/api/v1/health', '/api/v1/finance/withdraw', 'https://user:password@app.gstdtoken.xyz/api/v1/health']) {
    await assert.rejects(() => request(url), /Unexpected platform request/);
  }
  await assert.rejects(() => request('/api/v1/health', { method: 'POST' }), /Unexpected platform request/);
});
test('fails closed on a missing production binding or an upstream failure; only local development falls back', async () => {
  await assert.rejects(() => platform(async () => ({ env: {} }))('/api/v1/health'), /binding is unavailable/);
  await assert.rejects(() => platform(async () => ({ env: { GSTD_PLATFORM: { fetch: async () => { throw Error('upstream down'); } } } }))('/api/v1/health'), /upstream down/);
  const response = await platform(async () => { throw Error('local'); }, async () => new Response(null, { status: 503 }), false)('/api/v1/health');
  assert.equal(response.status, 503);
});
