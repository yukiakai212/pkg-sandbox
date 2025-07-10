import path from 'node:path';
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import { findUp } from '@yukiakai/find-up';
import { consola } from 'consola';

import { Agent, agents } from './types.js';

function isAgent(value: string): value is Agent {
  return (agents as readonly string[]).includes(value);
}

const detectAgent = (dir: string): Agent | 'unknown' => {
  const existsFile = (name: string) => {
    return fs.existsSync(path.join(dir, name));
  };
  if (existsFile('deno.json') || existsFile('deno.jsonc')) return 'deno';

  if (existsFile('bun.lockb')) return 'bun';
  if (existsFile('pnpm-lock.yaml')) return 'pnpm';
  if (existsFile('yarn.lock')) return 'yarn';
  if (existsFile('package-lock.json')) return 'npm';
  return 'unknown';
};
export const installPackage = (basedir: string | undefined, agent: Agent | undefined) => {
  const pathInstall = findUp('package.json', { basedir: path.resolve(basedir || process.cwd()) });
  if (!pathInstall) {
    throw new Error('Cannot find root project. Make sure you are inside a valid project.');
  }
  const agentInstall = agent || detectAgent(pathInstall);
  if (agentInstall === 'unknown') {
    throw new Error(
      '❌ Unable to detect the package manager automatically. Please specify it explicitly using the --agent <package-manager> option.',
    );
  }
  if (!isAgent(agentInstall) || agentInstall === 'deno') {
    throw new Error('This package manager is not supported.');
  }
  consola.info('Folder:', pathInstall);
  consola.info('Agent:', agentInstall);
  const packedFile = execSync('npm pack ', { cwd: pathInstall, stdio: 'pipe' }).toString().trim();
  if (!packedFile) {
    throw new Error('Cant pack your project');
  }
  consola.start('Installing – please wait, this may take a bit...');
  const optionsInstall = { cwd: pathInstall };
  if (agentInstall === 'npm') {
    execSync(`npm i "${packedFile}" --no-save --no-package-lock`, optionsInstall);
  } else if (agentInstall === 'pnpm') {
    execSync(`pnpm add "${packedFile}" --no-save --lockfile=false`, optionsInstall);
  } else if (agentInstall === 'yarn') {
    execSync(`yarn add "${packedFile}" --no-save --no-lockfile`, optionsInstall);
  } else if (agentInstall === 'bun') {
    execSync(`bun add "${packedFile}" --no-save`, optionsInstall);
  }

  consola.info('Cleaned up packed file.');
  fs.unlinkSync(path.join(pathInstall, packedFile));
};
