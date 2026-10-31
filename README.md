# GSTD Web

The public information website for GSTD: understand the project, install a compute node and read the documentation. The [GSTD app](https://app.gstdtoken.com/chat) is the main workspace for chat, model selection, balance and rewards.

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
- **AI demo** — the existing `/ai` free demo remains available; model selection and paid balance belong to the app.
- **Languages** — English and Russian. App return links may pass `?lang=en` or `?lang=ru`; this takes priority over a stored website preference.

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

Source-available under [LICENSE](LICENSE): unmodified PolyForm Noncommercial 1.0.0 plus additional permission for individuals and companies to run nodes, earn accepted-work GSTD and build commercial applications or API/SDK integrations using the GSTD network without separate approval. Paid network-compute charges under that grant settle in canonical GSTD; independent application fees may use other currencies. Installation, free requests and local execution have no added token requirement, and TON may cover gas. Base noncommercial rights, earlier releases and third-party licenses are preserved. This is not OSI open source. See [the practical licensing guide and third-party scope](docs/LICENSING.md).

## Node-backed chat

Chat discovers the operator-approved persistent identities in `GSTD_TRUSTED_NODE_IDS`
through the canonical live registry. Rotating Cloudflare tunnel URLs are resolved
from the canonical registry record for an approved node identity; unrelated registrants and private destinations are rejected.
A named public hostname may be explicitly allowed with `GSTD_SEED_HOSTS`.
The response identifies the actual serving node. Workers AI is optional: it requires explicit consent to send the question and conversation history, and only applies to automatic model selection. It is identified as `cloudflare-workers-ai`; the site never silently substitutes an explicitly requested model. Legacy cloud-peer and peer-heartbeat shims return 410: the website is not a compute node.

## First useful action

The home page has three entry paths: [use the main app](https://app.gstdtoken.com/chat), [connect a node](https://gstdtoken.com/nodes), or [build with its API](https://gstdtoken.com/developers). The [website demo](https://gstdtoken.com/ai) is a separate, optional introduction; its conversation is not copied into the app. Existing routes remain available. [Telegram](https://t.me/gstdaibot) is another interface to the same platform. No wallet is required for the first AI chat. See the [ecosystem contract](https://github.com/gstdcoin/ai/blob/main/docs/ECOSYSTEM.md).
