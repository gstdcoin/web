# Deploying to Cloudflare Workers

This site runs on Cloudflare Workers via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare), which builds the full Next.js app (including the `/api/health` and `/api/stonfi-pool` server routes) into a single Worker. This preserves 100% of the app's functionality — nothing was made static-only.

Free tier covers this site comfortably: 100,000 requests/day, 10ms CPU time per request, unlimited bandwidth.

## Option A — Git integration (recommended, auto-deploys on push)

1. Go to https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Workers** → **Import a repository** (or **Connect to Git** for Pages — for Next.js apps with API routes, use the **Workers** flow, not classic Pages).
2. Authorize Cloudflare's GitHub App and select `gstdcoin/web`.
3. Build settings:
   - **Build command**: `npx opennextjs-cloudflare build` (produces `.open-next/worker.js`; deploying itself is handled by Cloudflare's own `wrangler deploy` step using `wrangler.jsonc` from the repo — don't use `npm run cf:deploy` here, that's for manual CLI deploys in Option B)
   - **Deploy command**: leave Cloudflare's default
   - **Root directory**: `/` (repo root)
4. Environment variables — add any `NEXT_PUBLIC_*` values you want baked into the build (see `.env.production` in the repo for the current list: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`, `NEXT_PUBLIC_TELEGRAM`, `NEXT_PUBLIC_TWITTER`, `NEXT_PUBLIC_GITHUB`, `NEXT_PUBLIC_STONFI`, `NEXT_PUBLIC_TON_CONTRACT`). These aren't secrets — they're public build-time values — so just paste them into the dashboard's "Variables and Secrets" build settings.
5. Click **Save and Deploy**. Every push to `main` redeploys automatically, same as Vercel.
6. **Custom domain**: in the Worker's **Settings → Domains & Routes**, add `gstdtoken.com` (and `www.gstdtoken.com` if used). If the domain's DNS is already on Cloudflare, this is one click. If it's elsewhere, Cloudflare will ask you to update nameservers or add a CNAME.

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
