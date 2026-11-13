const assert = require('node:assert/strict');
const fs = require('node:fs');
const { test } = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

const source = fs.readFileSync('src/app/api/network/stats/route.ts', 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;

function handler(fetch) {
  const exports = {};
  vm.runInNewContext(compiled, { exports, fetch, Response, AbortSignal });
  return exports.GET;
}

test('serves only validated canonical counters through the site origin', async () => {
  const get = handler(async (url, options) => {
    assert.equal(url, 'https://app.gstdtoken.com/api/v1/network/stats');
    assert.equal(options.redirect, 'error');
    return Response.json({ active_workers: 1, total_nodes: 2, tasks_completed: 23, total_tasks: 25,
      total_users: 3, total_gstd_paid: 0.125, internal: 'omit' });
  });
  const response = await get();
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { active_workers: 1, total_nodes: 2, tasks_completed: 23,
    total_users: 3, total_earned_gstd: 0.125 });
});

test('does not display invented counters when the platform response is invalid or unavailable', async () => {
  for (const fetch of [async () => Response.json({ active_workers: 1 }),
    async () => new Response(null, { status: 502 }), async () => { throw new Error('timeout'); }]) {
    const response = await handler(fetch)();
    assert.equal(response.status, 503);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
  }
});
