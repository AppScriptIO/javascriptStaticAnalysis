const path = require('path'),
  { addModuleResolutionPathMultiple } = require(`@dependency/handleModuleSystem`)

module.exports = {
  registerPluginPathToRequireHook: ({additionalNodeModulePath = []} = {}) => {
    // register reqiure hook to include the node_moduels path of plugins.
    const nodeModulesPath = path.dirname(path.dirname(path.dirname(require.resolve('eslint/package.json')))) // get the node_modules folder where plugins are installed. Could be own package root or parent packages root (when this modules is installed as a pacakge)
    addModuleResolutionPathMultiple({ pathArray: [nodeModulesPath, ...additionalNodeModulePath] }) // Add own node_modules to module resolving paths
  }
}