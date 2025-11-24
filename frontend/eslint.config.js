import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      ...js.configs.recommended.rules,                                // includes eslint:recommended rules
      ...reactHooks.configs['recommended-latest'].rules,              // includes react-hooks/recommended rules
      ...reactRefresh.configs.vite.rules,                             // includes react-refresh/vite rules
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],  // allow unused vars that start with uppercase or underscore
      "react-refresh/only-export-components": [                       // customize react-refresh rule
        "warn",                                                       // warn when non-component is exported
        { allowConstantExport: true }                                 // allow export const MyComponent = () => {}
      ],
    },
  },
])