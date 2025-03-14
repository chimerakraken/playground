import { FlatCompat } from '@eslint/eslintrc';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsEslintParser from '@typescript-eslint/parser';

const compat = new FlatCompat();

export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    name: 'custom-config',
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
    },
    languageOptions: {
      parser: tsEslintParser,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
