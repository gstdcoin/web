# gstdweb Fork-Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make this repo properly forkable (add a license) and remove magic-string duplication of the GSTD token contract address so it has one source of truth.

**Architecture:** Two independent, small tasks. No structural changes.

**Tech Stack:** Next.js (App Router), TypeScript.

## Global Constraints

- The GSTD jetton address is `EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO` -- this is the correct, real value everywhere it currently appears; the fix is consolidation, not correction.
- Match the MIT license format already used by sibling repos (`gstdai`, `gstd-bridge`), copyright holder "GSTD Platform".
- `.env.example`/`.env.production` already define `NEXT_PUBLIC_TON_CONTRACT` and `NEXT_PUBLIC_STONFI` for exactly this purpose -- `src/content/config.ts` should read them (with the current literal as fallback default) instead of hardcoding the address 5 times.

---

## Task 1: Add MIT LICENSE

**Files:**
- Create: `/home/bot/gstdweb/LICENSE`

- [ ] **Step 1: Create the LICENSE file**

```
MIT License

Copyright (c) 2026 GSTD Platform

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- [ ] **Step 2: Commit**

```bash
cd /home/bot/gstdweb
git add LICENSE
git commit -m "$(cat <<'EOF'
chore: add MIT LICENSE

No license file existed, meaning no reuse rights were granted under
default copyright rules -- blocks meaningful forking. Matches the MIT
license already used by sibling repos (gstdai, gstd-bridge, gstd-a2a).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Consolidate the GSTD address into one env-backed constant

**Files:**
- Modify: `/home/bot/gstdweb/src/content/config.ts`
- Modify: `/home/bot/gstdweb/src/app/api/stonfi-pool/route.ts`

**Interfaces:**
- Produces: a single exported constant `GSTD_TON_CONTRACT` in `src/content/config.ts` that everything else in the repo should import, instead of hardcoding the literal.

- [ ] **Step 1: Read the current file to confirm exact content**

```bash
cat /home/bot/gstdweb/src/content/config.ts
```

(Line numbers below are from the audit; confirm they still match before editing -- if they've drifted, find the blocks by content.)

- [ ] **Step 2: Add a single canonical constant and use it everywhere in this file**

At the top of the file (currently after any existing imports, or as the first export if there are none), add:
```typescript
export const GSTD_TON_CONTRACT =
  process.env.NEXT_PUBLIC_TON_CONTRACT || "EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO";
```

Then replace every other literal occurrence of `"EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO"` in this file with a reference to `GSTD_TON_CONTRACT`, using template literals where it's embedded in a URL string. Concretely (currently lines 19-33, exact surrounding content may have shifted slightly -- match by the literal string, not line number):

Replace:
```typescript
  stonfiSwap:
    "https://app.ston.fi/swap?ft=TON&tt=EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO&amount=1",
  tonContract: "EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO",
```
with:
```typescript
  stonfiSwap:
    `https://app.ston.fi/swap?ft=TON&tt=${GSTD_TON_CONTRACT}&amount=1`,
  tonContract: GSTD_TON_CONTRACT,
```

Replace:
```typescript
  getGSDT:
    "https://app.ston.fi/swap?ft=TON&tt=EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO&amount=1",
  buyGSDT:
    "https://app.ston.fi/swap?ft=TON&tt=EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO&amount=1",
```
with:
```typescript
  getGSDT:
    `https://app.ston.fi/swap?ft=TON&tt=${GSTD_TON_CONTRACT}&amount=1`,
  buyGSDT:
    `https://app.ston.fi/swap?ft=TON&tt=${GSTD_TON_CONTRACT}&amount=1`,
```

Replace:
```typescript
  contractAddress: "EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO"
```
with:
```typescript
  contractAddress: GSTD_TON_CONTRACT
```

(these 4 fields sit inside object literals like `LINKS`/`TOKEN_INFO` further down the file -- keep them as object properties, just swap the literal value for the constant reference; do not restructure the objects themselves)

- [ ] **Step 3: Update the one other file with a literal copy**

Read `/home/bot/gstdweb/src/app/api/stonfi-pool/route.ts` (currently line 3):
```typescript
const GSTD_CONTRACT = 'EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO';
```
Replace with an import from the canonical source instead of its own local constant:
```typescript
import { GSTD_TON_CONTRACT } from '../../../content/config';
```
(adjust the relative import path to match this file's actual location relative to `src/content/config.ts` -- verify the path resolves before committing) and replace the 3 remaining uses of `GSTD_CONTRACT` in the rest of that file with `GSTD_TON_CONTRACT`.

- [ ] **Step 4: Verify no remaining literal duplication**

```bash
cd /home/bot/gstdweb
grep -rn "EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO" src/
```

Expected: exactly one hit -- the constant definition itself in `src/content/config.ts`. (`.env.example`/`.env.production` legitimately keep their own copies -- those are outside `src/` and are the env-var source, not code duplication.)

- [ ] **Step 5: Typecheck**

```bash
cd /home/bot/gstdweb
npx tsc --noEmit -p .
```

Expected: no errors (confirms the import path and template-literal changes are valid TypeScript).

- [ ] **Step 6: Build**

```bash
cd /home/bot/gstdweb
npm run build
```

Expected: build succeeds (confirms no runtime import-resolution issues Next.js's stricter bundler might catch beyond tsc).

- [ ] **Step 7: Commit**

```bash
cd /home/bot/gstdweb
git add src/content/config.ts src/app/api/stonfi-pool/route.ts
git commit -m "$(cat <<'EOF'
chore: consolidate GSTD token address into one exported constant

The jetton address EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO was
hardcoded as a literal 6 times across 2 files (5x in config.ts alone),
despite .env.example/.env.production already defining
NEXT_PUBLIC_TON_CONTRACT for exactly this purpose. Added one exported
constant (GSTD_TON_CONTRACT, reading the env var with the current
value as fallback) that both files now import instead of duplicating
the literal -- a fork changing tokens now has one place to edit
instead of six.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Final verification and push

**Files:** none (verification only).

- [ ] **Step 1: Full repo-wide check**

```bash
cd /home/bot/gstdweb
grep -rn "EQDv6cYW9nNiKjN3Nwl8D6ABjUiH1gYfWVGZhfP7-9tZskTO" src/
npx tsc --noEmit -p .
npm run build
```

Expected: one grep hit (the constant definition), tsc clean, build succeeds.

- [ ] **Step 2: Push**

```bash
cd /home/bot/gstdweb
git push origin main
```

(confirm the actual default branch name first with `git branch --show-current` -- do not assume `main` if it's `master` or something else)
