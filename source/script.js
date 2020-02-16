const eslintJSLinter = require('./eslint.config.js'), 
  prettierJSFormatter = require('./prettier.config.js')

module.exports = {
  prettierJSFormatter, // prettier is being integrated from within eslint config.
  eslintJSLinter,
}
