import js from '@eslint/js'
import globals from 'globals'

export default [
  { ignores: ['dist', 'node_modules'] },

  // Node (for functions and scripts)
  {
    files: ['functions/**/*.{js,jsx,ts,tsx}', 'scripts/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node, ...globals.es2021 },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },

  // Browser (everything else)
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['functions/**/*', 'scripts/**/*'], // Don't double-lint
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.es2021 },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
]
