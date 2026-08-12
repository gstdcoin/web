# Deploying to Cloudflare Workers

This site runs on Cloudflare Workers via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare), which builds the full Next.js app (including the `/api/health` and `/api/stonfi-pool` server routes) into a single Worker. This preserves 100% of the app's functionality — nothing was made static-only.

Free tier covers this site comfortably: 100,000 requests/day, 10ms CPU time per request, unlimited bandwidth.

## Already deployed once

The site was deployed directly via `wrangler deploy` and is live at:
**https://gstd-web.gstdtoken-site.workers.dev**

Verified working: homepage, `/about`, `/api/health`, `/api/stonfi-pool`, and the security headers all respond correctly in production.

## Option A — GitHub Actions (recommended, auto-deploys on push)

`.github/workflows/deploy.yml` is already in the repo — it builds with `opennextjs-cloudflare` and deploys with `wrangler` on every push to `main`. To activate it once the code is pushed:

1. Get a Cloudflare API Token (Workers Scripts:Edit template) from https://dash.cloudflare.com/profile/api-tokens and your Account ID from the dashboard's main page.
2. In the GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**, add:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
3. Push to `main` — the workflow builds and deploys automatically.
4. **Custom domain**: in the Cloudflare dashboard, open the `gstd-web` Worker → **Settings → Domains & Routes** → add `gstdtoken.com` (and `www.gstdtoken.com` if used). If the domain's DNS is already on Cloudflare, this is one click; otherwise Cloudflare will prompt you to update nameservers or add a CNAME.

Build-time env vars (`NEXT_PUBLIC_*`) are already baked in from `.env.production` — no extra config needed unless you change them.

## Option B — CLI deploy (manual, from your own machine)

```bash
npm install
npx wrangler login      # opens a browser to authorize once
npm run cf:deploy        # builds + deploys in one step
```

To preview the production Worker build locally before deploying:

```bash
npm run cf:preview
```

## Notes on what changed for this migration

- **Removed** the custom `webpack.optimization.splitChunks` override in `next.config.mjs` — it was added for Vercel's low-memory free-tier builds, but it broke OpenNext's single-file Worker bundler (`Error: Unknown chunk N`). Standard Next.js chunking works fine and produced a *smaller* bundle.
- **`images.unoptimized: true`** — Cloudflare's on-the-fly image resizing (`next/image` optimization) requires the paid Cloudflare Images add-on. Since site images are already pre-built as `webp`/`svg` in `/public`, this is off to avoid any billing surprise. If you later want automatic resizing, see https://opennext.js.org/cloudflare/howtos/image and add an `images.binding` to `wrangler.jsonc`.
- **`vercel.json` removed** — its security headers were moved into `next.config.mjs`'s native `headers()` function, which Cloudflare's build respects the same way Vercel did.
- Both API routes (`/api/health`, `/api/stonfi-pool`) run as real server functions inside the Worker (Node.js-compatible runtime via the `nodejs_compat` flag in `wrangler.jsonc`) — not converted to client-side fetch, not static. Full parity with the current Vercel behavior.
