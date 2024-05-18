import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ['**/build/**', '**/node_modules/**'],
    coverage: {
      provider: 'v8',
      all: false,
    },
  },
})
