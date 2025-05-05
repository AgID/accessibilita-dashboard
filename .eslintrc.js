module.exports = {
  overrides: [
    {
      files: ['**/*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      rules: {
        // Le tue regole ESLint per i file Svelte
      },
    },
    {
      files: ['**/*.js', '**/*.ts'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      rules: {
        // Le tue regole ESLint per i file JavaScript e TypeScript
      },
    },
  ],
};
