import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginImport from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

/**
 * We want @typescript-eslint/naming-convention to enforce different naming
 * naming conventions in React frontend code (which lives in the ./frontend or
 * ./client directory) and backend/other code. These are common naming
 * conventions between the two.
 */
const commonNamingConventions = [
  {
    // Variables and functions, are camelCase: nimGameService, isDone
    selector: 'variable',
    format: ['camelCase'],
    leadingUnderscore: 'allow',
  },
  {
    // Types and class names are PascalCase: GameService, NimState
    selector: 'typeLike',
    format: ['PascalCase'],
  },
  {
    // Global constants are UPPER_CASE: PORT, THREAD_API_URL, DEBUG_SOCKETS
    selector: 'variable',
    modifiers: ['global', 'const'],
    types: ['boolean', 'number', 'string', 'array'],
    format: ['UPPER_CASE'],
  },
  {
    // Private methods and fields must have a leading underscore: this._count
    selector: 'memberLike',
    modifiers: ['private'],
    format: ['camelCase'],
    leadingUnderscore: 'require',
  },
];

export default defineConfig([
  globalIgnores([
    // Includes some ignores that aren't used in all projects
    '**/build', // legacy output directory
    '**/dist', // vite's output directory
    '**/.stryker-tmp/', // stryker mutation reports
    '**/coverage', // istanbul coverage reports
    '**/playwright-report/', // playwright test reports
  ]),
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    extends: [
      js.configs.recommended,
      eslintPluginImport.flatConfigs.recommended,
      eslintPluginImport.flatConfigs.typescript,
    ],
    settings: {
      'import/resolver': { typescript: true },
    },
    rules: {
      'eqeqeq': 'error',
      'import/no-amd': 'error',
      'import/no-commonjs': 'error',
      'import/no-empty-named-blocks': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        {
          // devDependencies can be imported in config and test files
          devDependencies: [
            '**/*.config.mjs',
            '**/*.{spec,test}.{ts,tsx}',
            '**/tests/**/*.{ts,tsx}',
          ],
          includeInternal: true,
        },
      ],
      'import/no-import-module-exports': 'error',
      'import/no-named-as-default': 'error',
      'import/no-named-as-default-member': 'off',
      'no-console': 'warn',
      'no-param-reassign': 'error',
      'no-plusplus': 'error',
      'no-throw-literal': 'error',
      'no-unused-vars': ['error', { args: 'none', caughtErrors: 'none' }],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: tseslint.configs.recommendedTypeChecked,
    languageOptions: { parserOptions: { projectService: true } },
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        ...commonNamingConventions,
        {
          // keyv repository models are more like classes with static methods
          // than other constants, so this rule makes them PascalCase
          // (`GameRepo`) instead of the default camelCase.
          selector: 'variable',
          modifiers: ['global'],
          filter: { regex: 'Repo$', match: true },
          format: ['PascalCase'],
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { args: 'none', varsIgnorePattern: '^_', caughtErrors: 'none' },
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            arguments: false,
            attributes: false,
          },
        },
      ],
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-unsafe-member-access': ['error', { allowOptionalChaining: true }],
    },
  },
  {
    files: ['{client,frontend}/**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.recommended],
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        ...commonNamingConventions,
        {
          // React components are functions, so they want to be PascalCase;
          selector: 'variable',
          types: ['function'],
          format: ['camelCase', 'PascalCase'],
        },
      ],
      // It is difficult to totally avoid floating promises in certain React
      // contexts, but they can nevertheless be a source of errors, so it may
      // be worth removing this exception and explicitly marking such promises
      // with 'void', or to make them warnings
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },
  {
    // Test files may need to make more use of the any type
    files: ['**/*.{spec,test}.{ts,tsx}', '**/tests'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/unbound-method': 'off',
    },
  },
  {
    extends: [eslintPluginPrettierRecommended],
    rules: { 'prettier/prettier': 'warn' },
  },
]);
