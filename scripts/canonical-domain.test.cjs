const { test } = require('node:test');
const assert = require('node:assert/strict');
test('website aliases redirect to a fixed canonical origin without matching lookalike hosts', async () => {
  const config = (await import('../next.config.mjs')).default;
  const redirects = await config.redirects();
  for (const host of ['www.gstdtoken.xyz', 'gstdtoken.com', 'www.gstdtoken.com']) {
    const rule = redirects.find(rule => new RegExp(`^${rule.has[0].value}$`).test(host));
    assert.equal(rule.destination, 'https://gstdtoken.xyz/:path*'); assert.equal(rule.permanent, true);
  }
  for (const host of ['gstdtoken.xyz', 'app.gstdtoken.xyz', 'gstdtokenXcom', 'gstdtoken.com.attacker.test']) {
    assert.equal(redirects.some(rule => new RegExp(`^${rule.has[0].value}$`).test(host)), false);
  }
});
