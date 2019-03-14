let typescriptEslintRecommended = require('@typescript-eslint/eslint-plugin/dist/configs/recommended.json')
let prettierTypescriptEslint = require('eslint-config-prettier/@typescript-eslint')
let prettierConfig = require('./prettier.config.js')

module.exports = {
  root: true,
  overrides: [
    // { // NOTE: Using VSCode builtin formatter instead
    //   files: ['**.json', '**.jsonc'],
    //   plugins: ['eslint-plugin-json'],
    // },
    // specific different parser according to file extension.
    {
      files: ['**.js'],
      // "excludedFiles": "*.test.js",
      parser: 'babel-eslint',
      parserOptions: {
        babelOptions: {
          configFile: './babel.config.js',
        },
      },
      plugins: [
        'eslint-plugin-babel', // eslint-plugin-babel re-implements (from the base eslint rules) problematic rules so they do not give false positives or negatives
        'prettier',
      ],
      rules: {
        'prettier/prettier': [
          'warn',
          prettierConfig,
          {
            usePrettierrc: true,
          },
        ],
      },
    },
    {
      files: ['**.ts'],
      // correctly parse typescript with babel parser - https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/typescript-estree/tests/ast-alignment/parse.ts#L16
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
      },
      plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
      rules: Object.assign(
        typescriptEslintRecommended.rules,
        prettierTypescriptEslint.rules, // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        // prettier Eslint Recommended are `prettier` plugin and `error` rule // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
        {
          'prettier/prettier': 'error',
        },
      ),
    },
  ],
  rules: {},
  env: {
    node: true,
  },
}
