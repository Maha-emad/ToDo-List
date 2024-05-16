import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import jest from 'eslint-plugin-jest';
import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';

export default tseslint.config(
  eslint.configs.recommended,
  {
    files: [
      '**/*.{js,jsx,mjs,cjs,ts,tsx}',
      '**/*.test.{js,jsx,mjs,cjs,ts,tsx}'
    ],
    plugins: {
      react,
      jest,
      jestDom,
      testingLibrary
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json'],
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    files: ['**/*.tsx'],
    plugins: {
      'react-hooks': reactHooks
    },
    rules: reactHooks.configs.recommended.rules
  },
  eslintConfigPrettier,
  {
    ignores: [
      'jest.config.ts',
      'setupTest.ts',
      '**/*.d.ts',
      'eslint.config.mjs',
      '**/scripts/',
      '**/_generated/',
      '**/build/',
      '**/dist/'
    ]
  }
);
