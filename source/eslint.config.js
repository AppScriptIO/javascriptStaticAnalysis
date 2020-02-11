module.exports.nodejsEnvironment = ({ babelConfigPath = './configuration/babel.config.js', typescriptConfigPath = './configuration/typescript.config.json' } = {}) => {
  let typescriptEslintRecommended = require('@typescript-eslint/eslint-plugin/dist/configs/recommended.json')
  let prettierTypescriptEslint = require('eslint-config-prettier/@typescript-eslint')
  let prettierConfig = require('./prettier.config.js')

  let vscodeBuildInFormater = {
    // NOTE: Using VSCode builtin formatter instead
    files: ['**.json', '**.jsonc'],
    plugins: ['eslint-plugin-json'], // build-in plugins.
  }

  let nodejsFile = {
    files: ['**.js'],
    // "excludedFiles": "*.test.js",
    parser: 'babel-eslint',
    parserOptions: {
      babelOptions: {
        configFile: babelConfigPath,
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
  }

  let typescriptFile = {
    files: ['**.ts'],
    // correctly parse typescript with babel parser - https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/typescript-estree/tests/ast-alignment/parse.ts#L16
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      project: typescriptConfigPath, // Follows the path should be consumed by a function and replaced.
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
    rules: Object.assign(
      typescriptEslintRecommended.rules,
      prettierTypescriptEslint.rules, // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
      // prettier Eslint Recommended are `prettier` plugin and `error` rule // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
      {
        'prettier/prettier': 'warn',
      },
    ),
  }

  // eslint combined config with prettier integration.
  let eslintConfig = {
    root: true,
    overrides: [
      // specific different parser according to file extension.
      // vscodeBuildInFormater,
      nodejsFile,
      typescriptFile,
    ],
    rules: {},
    env: {
      node: true,
    },
  }

  console.log(`• ESlint config used:`)
  console.log(eslintConfig)

  return eslintConfig
}

module.exports.browserEnvironment = () => {  
  /*
  *https://github.com/open-wc/open-wc/blob/master/packages/prettier-config/prettier.config.js
    Apply formatting to JS files
    Apply formatting to HTML inside of html tagged template literals used by lit-html
    Apply formatting to CSS inside of css tagged template literals used by lit-element
    Integration with ESLint to prevent potentially conflicting rules

  */
  let prettierConfig = require('@open-wc/eslint-config') // https://github.com/open-wc/open-wc/ > eslint-config

  /*
  *https://github.com/open-wc/open-wc/blob/master/packages/eslint-config/index.js
    Apply linting to js and html files
    Apply linting for best practices
    Allow dynamic module imports
    Allow imports in test/demos from devDependencies
    Allow underscore dangle
    Do not prefer default exports
    Do not prefer no file extension

  USAGE: 
    • require directly and make sure internal plugin names are resolved correctly (./@open-wc/eslint-config/node_modules/<plugins...>) 
  OR
    • use eslint config: (which may resolve dependent plugins correctly) https://github.com/open-wc/open-wc/blob/master/packages/eslint-config/package.json
      "@open-wc/eslint-config",
      "eslint-config-prettier"

  */
  let openWebcomponentEslintConfig = require('@open-wc/eslint-config') // https://github.com/open-wc/open-wc/ > eslint-config

  let eslintConfig = {
    extends: [       
      "@open-wc/eslint-config",
      "eslint-config-prettier"
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
  } 

  console.log(`• ESlint config used:`)
  console.log(eslintConfig)

  return eslintConfig
}
