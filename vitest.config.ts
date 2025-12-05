'use strict';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    testTimeout: 160000,
    include: ['__tests__/*.test.ts'],
    coverage: {
      provider: 'v8',
    },
  },
});
