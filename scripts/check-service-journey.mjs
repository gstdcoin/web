import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';

// Read-only checks by default. --inference explicitly opts into one tiny free
// request, with cloud fallback disabled and no wallet, paid tier or retries.
const base = new URL(process.argv[2] || 'https://gstdtoken.xyz');
assert(base.protocol === 'https:' || ['localhost', '127.0.0.1'].includes(base.hostname));
assert(!base.username && !base.password && base.pathname === '/' && !base.search && !base.hash);
const report = {checked_at: new Date().toISOString(), origin: base.origin, checks: [], inference: 'not_requested'};
let failed = false;
for (const path of ['/api/health', '/api/network/passport', '/ai', '/']) {
  const start = performance.now();
  try {
    const r = await fetch(new URL(path, base), {redirect: 'manual', signal: AbortSignal.timeout(15000)});
    assert.equal(r.status, 200);
    if (path === '/api/health') { const h = await r.json(); assert.equal(h.ready, true); }
    else if (path === '/api/network/passport') {
      const p = await r.json();
      assert(Number.isSafeInteger(p.checked_at) && Math.abs(Date.now() - p.checked_at) < 180000);
      report.platform = p.platform; report.telegram = p.telegram; report.online = p.stats?.online ?? null;
      assert.equal(p.platform, 'ok');
    } else { assert.match(await r.text(), /<!doctype html/i); }
    report.checks.push({path, ok: true, elapsed_ms: Math.round(performance.now() - start)});
  } catch { failed = true; report.checks.push({path, ok: false}); }
}
if (process.argv.includes('--inference')) {
  try {
    const source = await readFile(new URL('../src/lib/chat-response.ts', import.meta.url), 'utf8');
    const code = ts.transpileModule(source, {compilerOptions: {module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022}}).outputText;
    const {readChatResponse} = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
    const signal = AbortSignal.timeout(75000), start = performance.now(); let first = null;
    const r = await fetch(new URL('/api/chat', base), {
      method: 'POST', redirect: 'manual', signal, headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({model: 'auto', messages: [{role: 'user', content: 'Reply only: OK'}], max_tokens: 8, stream: true, allow_cloud_fallback: false}),
    });
    const answer = await readChatResponse(r, () => { first ??= performance.now(); }, signal);
    assert(answer.trim());
    report.inference = {ok: true, first_text_ms: Math.round(first - start), elapsed_ms: Math.round(performance.now() - start), sample_size: 1, paid: false, cloud_fallback: false};
  } catch (error) {
    failed = true; report.inference = {ok: false, reason: ['unavailable','rate_limit','too_long','invalid_response','incomplete','timeout'].includes(error?.code) ? error.code : 'request_failed'};
  }
}
console.log(JSON.stringify(report, null, 2));
process.exitCode = failed ? 1 : 0;
