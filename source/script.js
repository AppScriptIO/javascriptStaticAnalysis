const path = require('path'),
  { addModuleResolutionPathMultiple } = require(`@dependency/handleModuleSystem`), 
  eslintJSLinterFunc = require('./eslint.config.js'), 
  prettierJSFormatter = require('./prettier.config.js')

module.exports = {
  prettierJSFormatter, // prettier is being integrated from within eslint config.
  eslintJSLinterFunc,
}
