import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  stylistic.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2024, // поддержка современного синтаксиса
      globals: {
        ...globals.node, // Node.js
        ...globals.browser, // Browser: window, document и т.д.
      },
    },
    // отключить запрет на console
    rules: {
      'no-console': 'off',
    },
  },
])
