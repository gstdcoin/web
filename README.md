# GSTD Web

The public website of GSTD — decentralized AI compute on TON. Ask the AI, link a wallet, run a node.

[![Website](https://img.shields.io/badge/site-gstdtoken.com-00d2ff?style=flat-square)](https://gstdtoken.com)
[![App](https://img.shields.io/badge/app-app.gstdtoken.com-0ea5e9?style=flat-square)](https://app.gstdtoken.com)
[![Telegram](https://img.shields.io/badge/Telegram-@gstdaibot-26a5e4?style=flat-square)](https://t.me/gstdaibot)
[![License](https://img.shields.io/badge/license-PolyForm%20NC%201.0.0-orange?style=flat-square)](LICENSE)

Built with Next.js 16 and Tailwind CSS, deployed on Cloudflare Workers (free tier) through OpenNext.

## What you will find on the site

- **Home** — what GSTD is, how a node works, live network counters.
- **Nodes** — hardware requirements and one-command node install.
- **Docs and FAQ** — guides for users and developers, with links to the source repositories.
- **Transparency** — what is deployed, what is experimental, and what is not available yet.
- **Languages** — English and Russian.

Every number on the site comes from the live platform API ([`network/stats`](https://app.gstdtoken.com/api/v1/network/stats)). When the API is unreachable the site shows an "unavailable" notice instead of made-up figures.

> **Status:** early-stage. Whether nodes, tasks or payouts exist at a given moment is shown by the live stats, not by this README. The site describes planned features as plans, and nothing on it is an offer of income or investment advice.

## Quick start

```bash
git clone https://github.com/gstdcoin/web
cd web
npm ci
npm run dev
# http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm run cf:preview` | Preview the Cloudflare Worker build locally |
| `npm run cf:deploy` | Build and deploy to Cloudflare Workers |

## Deploy

A push to `main` runs type checks, routing tests and a production dependency audit, builds with OpenNext, and validates health/pages on the separate `gstd-web-preview` Worker before deploying `gstd-web`. See [docs/CLOUDFLARE_DEPLOY.md](docs/CLOUDFLARE_DEPLOY.md) for secrets and a manual deploy.

## The GSTD ecosystem

| Repository | What it is |
|---|---|
| **gstdcoin/web** | **This repo — the public website** |
| [gstdcoin/ai](https://github.com/gstdcoin/ai) | Platform app and API on Cloudflare Workers, plus the `@gstdaibot` Telegram webhook |
| [gstdcoin/gstdbot](https://github.com/gstdcoin/gstdbot) | Node software: install, heartbeats, tasks, sovereign core |
| [gstdcoin/A2A](https://github.com/gstdcoin/A2A) | Experimental client libraries and agent integration docs |
| [gstdcoin/contracts](https://github.com/gstdcoin/contracts) | TON smart-contract sources (unaudited) |
| [gstdcoin/gstd-bridge](https://github.com/gstdcoin/gstd-bridge) | Cross-chain bridge research scaffold (deferred, not deployed) |

## Contributing and security

Issues and pull requests are welcome. Report vulnerabilities privately through GitHub security advisories rather than public issues.

## License

Source-available under the [PolyForm Noncommercial License 1.0.0](LICENSE), with an additional permission for taking part in the GSTD network (including receiving GSTD rewards). Commercial use by companies needs a separate license. Not an OSI open-source license.

## Node-backed chat

Chat discovers the operator-approved persistent identities in `GSTD_TRUSTED_NODE_IDS`
through the canonical live registry. Rotating Cloudflare tunnel URLs are resolved
from the signed node record; unrelated registrants and private destinations are rejected.
A named public hostname may be explicitly allowed with `GSTD_SEED_HOSTS`.
The response identifies the actual serving node. When node routing fails, Workers AI
is identified as `cloudflare-workers-ai`; that fallback is not evidence that every node is offline.
