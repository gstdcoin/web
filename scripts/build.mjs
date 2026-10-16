import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const nextCli = fileURLToPath(new URL('../node_modules/next/dist/bin/next', import.meta.url));
const nodeOptions = [process.env.NODE_OPTIONS, '--max-old-space-size=2048']
  .filter(Boolean)
  .join(' ');
const result = spawnSync(
  process.execPath,
  ['--max-old-space-size=2048', nextCli, 'build', '--webpack'],
  {
    env: { ...process.env, NODE_OPTIONS: nodeOptions },
    stdio: 'inherit',
  }
);

if (result.error) {
  console.error(result.error);
  process.exitCode = 1;
} else {
  process.exitCode = result.status ?? 1;
}
