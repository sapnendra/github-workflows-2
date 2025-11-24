export default [
  {
    files: ['**/*.js', '**/*.jsx'],     // only apply to JavaScript files
    rules: {
      semi: 'error',                    // force semicolons at the end of statements
      quotes: ['error', 'single'],      // force single quotes for strings
      'no-unused-vars': 'warn',         // warn about unused variables
    },
  },
];