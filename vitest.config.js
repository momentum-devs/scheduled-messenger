import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['src/tests/setup.ts'],
    passWithNoTests: true,
    include: ['**/*.test.ts'],
    exclude: [...configDefaults.exclude, '**/cdk.out/**'],
    watchExclude: [...configDefaults.watchExclude, '**/cdk.out/**'],
    globals: false,
    environment: 'node',
    outputTruncateLength: 120,
    outputDiffLines: 30,
  },
});
