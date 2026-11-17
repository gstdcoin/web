Use Node.js 22 and npm 11.13.0, then `npm ci`, `npm run check:matcher`, `npm test`, `npm run build` and `npm audit --audit-level=high`.

The explicitly named MIT Picomatch fork rejects unsafe repeated extglobs while retaining ordinary glob APIs. Complex repeated patterns may now throw. See vendor/picomatch/README.md for scope and provenance. The installed-consumer check and regression tests are required: a local fork has no upstream registry advisory identity, so a clean audit alone cannot prove the patch.

Next.js is updated to 16.4.6 for GHSA-mfr8-8qww-v76h and GHSA-vc7v-qv4w-wrv8. glob and minimatch overrides address GHSA-3g3m-2fjr-6pw4 and GHSA-g3hv-75wg-m249.

Verification on 2026-11-18: clean npm ci completed; all installed Picomatch consumers resolved the fork; 4 matcher regression groups and 21 application tests passed. TypeScript and the Next.js production build passed. ESLint had zero errors and two pre-existing anonymous-default-export warnings. The clean lockfile audit reported zero known vulnerabilities. Publication uses the gstdcoin GitHub App. CI validates the patch branch; production deployment remains restricted to main.
