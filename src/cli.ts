#!/usr/bin/env node
import { Command } from 'commander';
import { consola } from 'consola';
import chalk from 'chalk';
import pkg from '../package.json' with { type: 'json' };
import { installPackage } from './index.js';

const cli = new Command();
cli
  .name('pkg-sandbox')
  .description("Test your npm package like it's published")
  .argument('[pkgPath]', 'Path to your package (default: current directory)')
  .option('--agent <npm|pnpm|yarn|bun>', 'Package manager to use')
  .version(pkg.version)
  .action(async (pkgPath, options) => {
    if (options.version) return;
    consola.start('Installing your package......');
    try {
      await installPackage(pkgPath, options.agent);
      consola.success('Installed package successfully — no errors detected during install.');
      consola.info('Your package is now testable exactly like it would be after publishing.');
      consola.success('You can now use your library in tests just like real-world usage:');
      console.log(chalk.gray('```'));
      console.log(chalk.cyan("import { something } from 'your-lib-name'"));
      console.log(chalk.gray('```'));
      consola.success('Run your tests now with vitest, jest, etc.');
      consola.info('Note: The real .tgz was installed — be careful with cache / lockfiles!');
    } catch (e) {
      const err = e as Error;
      consola.error(err.message);
    }
  });
cli.parse();
export { installPackage };
