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

const valid = { active_workers: 0, total_nodes: 0, tasks_completed: 0, total_users: 0, total_gstd_paid: 0 };

test('preserves genuine zero counters without inventing activity', async () => {
  const response = await handler(async () => Response.json(valid))();
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { active_workers: 0, total_nodes: 0, tasks_completed: 0,
    total_users: 0, total_earned_gstd: 0 });
});

test('rejects malformed JSON, missing fields, negative, fractional and unsafe counters', async () => {
  const malformed = [null, [], {}, { ...valid, tasks_completed: undefined },
    { ...valid, active_workers: -1 }, { ...valid, total_nodes: 0.5 },
    { ...valid, total_users: Number.MAX_SAFE_INTEGER + 1 }, { ...valid, tasks_completed: '67' },
    { ...valid, total_gstd_paid: -0.01 }, { ...valid, total_gstd_paid: '0' }];
  for (const body of malformed) {
    assert.equal((await handler(async () => Response.json(body))()).status, 503);
  }
  assert.equal((await handler(async () => new Response('invalid json'))()).status, 503);
});

test('release smoke check exercises the browser route and rejects unavailable or invented counters', async () => {
  const { checkNetworkStats } = await import('./check-network-stats.mjs');
  const stats = { active_workers: 1, total_nodes: 1, tasks_completed: 67, total_users: 3, total_earned_gstd: 0 };
  assert.deepEqual(await checkNetworkStats('https://preview.workers.dev/path', async (url, options) => {
    assert.equal(url.href, 'https://preview.workers.dev/api/network/stats');
    assert.equal(options.redirect, 'error');
    return Response.json(stats);
  }), stats);
  for (const body of [null, {}, { ...stats, tasks_completed: '67' }, { ...stats, total_earned_gstd: -1 }]) {
    await assert.rejects(() => checkNetworkStats('https://gstdtoken.com', async () => Response.json(body)));
  }
  await assert.rejects(() => checkNetworkStats('https://gstdtoken.com', async () => new Response(null, { status: 503 })));
});
