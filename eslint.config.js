import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  files: ['**/*.ts'],
  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommended,
  ],
  rules: {
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ["error", { "varsIgnorePattern": "^_", "argsIgnorePattern": "^_" }],
    'no-console': 'error',
    'prefer-const': 'error'
  },
});