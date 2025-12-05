import { describe, it, expect } from 'vitest';
import { installPackage } from './src/index.js';

describe('pkg-sandbox (real install)', () => {
  it('should install package successfully', async () => {
    installPackage();
    const lib = await import('pkg-sandbox');
    console.log(lib);
    expect(typeof lib.installPackage).toBe('function');
  });
});
