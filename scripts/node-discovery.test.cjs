const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const { runInNewContext } = require('node:vm');
const code = ts.transpileModule(fs.readFileSync('src/lib/node-discovery.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const exported = {};
runInNewContext(code, { exports: exported, URL, AbortSignal, Date, Set, fetch });
const discover = exported.registeredNodeUrls;
const live = (node_id, node_url, last_seen = new Date().toISOString()) => ({ node_id, node_url, is_online: true, last_seen });
test('routes a trusted persistent identity to its current tunnel and ignores other registrants', async () => {
  const result = await discover(new Set(['trusted']), new Set(), async () => new Response(JSON.stringify({ nodes: [
    live('other', 'https://other.trycloudflare.com'),
    live('trusted', 'https://current-public-tunnel.trycloudflare.com/path'),
  ] })));
  assert.equal(JSON.stringify(result), JSON.stringify(['https://current-public-tunnel.trycloudflare.com']));
});
test('rejects stale, private, credentialed and arbitrary destinations even for a trusted identity', async () => {
  const result = await discover(new Set(['trusted']), new Set(), async () => new Response(JSON.stringify({ nodes: [
    live('trusted', 'http://localhost'),
    live('trusted', 'https://127.0.0.1'),
    live('trusted', 'https://attacker.example'),
    live('trusted', 'https://user:password@safe.trycloudflare.com'),
    live('trusted', 'https://stale.trycloudflare.com', new Date(Date.now()-600001).toISOString()),
  ] })));
  assert.equal(result.length, 0);
});
test('fails closed when the registry is unavailable or no identities are trusted', async () => {
  assert.equal((await discover(new Set(), new Set(), async () => { throw Error('must not fetch'); })).length, 0);
  assert.equal((await discover(new Set(['trusted']), new Set(), async () => new Response('', { status:503 }))).length, 0);
});
