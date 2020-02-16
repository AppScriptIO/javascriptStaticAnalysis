"use strict";const path = require('path'),
{ registerPluginPathToRequireHook } = require('./requireHook.js');







module.exports.templateConfig = {
  root: true,
  overrides: [] };



module.exports.serverSideEnvironment = ({
  basePath,
  babelConfigPath = './configuration/serverSideBabel.config.js', typescriptConfigPath = './configuration/typescript.config.json', shouldRegisterModulePath = true } = {}) => {
  if (shouldRegisterModulePath) registerPluginPathToRequireHook();

  let typescriptEslintRecommended = require('@typescript-eslint/eslint-plugin/dist/configs/recommended.json');
  let prettierTypescriptEslint = require('eslint-config-prettier/@typescript-eslint');
  let prettierConfig = require('./prettier.config.js');


  const vscodeBuildInFormater = {

    files: ['**.json', '**.jsonc'],
    plugins: ['eslint-plugin-json'],
    env: {
      node: true } };



  let nodejsFile = {
    files: ['**.js'],

    parser: 'babel-eslint',
    parserOptions: {
      babelOptions: {
        configFile: babelConfigPath } },


    plugins: [
    'eslint-plugin-babel',
    'prettier'],

    rules: {

      'prettier/prettier': [
      'warn',
      prettierConfig,
      {
        usePrettierrc: true }] },



    env: {
      node: true } };



  let typescriptFile = {
    files: ['**.ts'],

    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      project: typescriptConfigPath },

    plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
    rules: Object.assign(
    typescriptEslintRecommended.rules,

    prettierTypescriptEslint.rules,

    {
      'prettier/prettier': 'warn' }),


    env: {
      node: true } };




  let overrides = [

  vscodeBuildInFormater,
  nodejsFile,
  typescriptFile];


  if (basePath)
  for (let config of overrides)
  if (config.files) config.files = config.files.map(item => path.join(basePath, item));


  let eslintConfig = {
    root: true,
    overrides };






  return eslintConfig;
};

module.exports.clientSideEnvironment = ({
  basePath,
  babelConfigPath = './configuration/clientSideBabel.config.js', shouldRegisterModulePath = true } =
{}) => {
  if (shouldRegisterModulePath) registerPluginPathToRequireHook({

    additionalNodeModulePath: [path.join(path.dirname(require.resolve('@open-wc/eslint-config/package.json')), 'node_modules')] });






























































































  return Object.assign(require('@open-wc/eslint-config'), { parserOptions: {
      babelOptions: {
        configFile: babelConfigPath } } });



};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9lc2xpbnQuY29uZmlnLmpzIl0sIm5hbWVzIjpbInBhdGgiLCJyZXF1aXJlIiwicmVnaXN0ZXJQbHVnaW5QYXRoVG9SZXF1aXJlSG9vayIsIm1vZHVsZSIsImV4cG9ydHMiLCJ0ZW1wbGF0ZUNvbmZpZyIsInJvb3QiLCJvdmVycmlkZXMiLCJzZXJ2ZXJTaWRlRW52aXJvbm1lbnQiLCJiYXNlUGF0aCIsImJhYmVsQ29uZmlnUGF0aCIsInR5cGVzY3JpcHRDb25maWdQYXRoIiwic2hvdWxkUmVnaXN0ZXJNb2R1bGVQYXRoIiwidHlwZXNjcmlwdEVzbGludFJlY29tbWVuZGVkIiwicHJldHRpZXJUeXBlc2NyaXB0RXNsaW50IiwicHJldHRpZXJDb25maWciLCJ2c2NvZGVCdWlsZEluRm9ybWF0ZXIiLCJmaWxlcyIsInBsdWdpbnMiLCJlbnYiLCJub2RlIiwibm9kZWpzRmlsZSIsInBhcnNlciIsInBhcnNlck9wdGlvbnMiLCJiYWJlbE9wdGlvbnMiLCJjb25maWdGaWxlIiwicnVsZXMiLCJ1c2VQcmV0dGllcnJjIiwidHlwZXNjcmlwdEZpbGUiLCJlY21hVmVyc2lvbiIsInNvdXJjZVR5cGUiLCJwcm9qZWN0IiwiT2JqZWN0IiwiYXNzaWduIiwiY29uZmlnIiwibWFwIiwiaXRlbSIsImpvaW4iLCJlc2xpbnRDb25maWciLCJjbGllbnRTaWRlRW52aXJvbm1lbnQiLCJhZGRpdGlvbmFsTm9kZU1vZHVsZVBhdGgiLCJkaXJuYW1lIiwicmVzb2x2ZSJdLCJtYXBwaW5ncyI6ImFBQUEsTUFBTUEsSUFBSSxHQUFHQyxPQUFPLENBQUMsTUFBRCxDQUFwQjtBQUNNLEVBQUVDLCtCQUFGLEtBQXNDRCxPQUFPLENBQUMsa0JBQUQsQ0FEbkQ7Ozs7Ozs7O0FBU0FFLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlQyxjQUFmLEdBQWdDO0FBQzlCQyxFQUFBQSxJQUFJLEVBQUUsSUFEd0I7QUFFOUJDLEVBQUFBLFNBQVMsRUFBRSxFQUZtQixFQUFoQzs7OztBQU1B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QUFDQyxPQUFQLENBQWVtQyxxQkFBZixHQUF1QyxDQUFDO0FBQ3RDOUIsRUFBQUEsUUFEc0M7QUFFdENDLEVBQUFBLGVBQWUsR0FBRywyQ0FGb0IsRUFFeUJFLHdCQUF3QixHQUFHLElBRnBEO0FBR3BDLEVBSG1DLEtBRzVCO0FBQ1QsTUFBR0Esd0JBQUgsRUFBNkJWLCtCQUErQixDQUFDOztBQUUzRHNDLElBQUFBLHdCQUF3QixFQUFFLENBQUN4QyxJQUFJLENBQUNxQyxJQUFMLENBQVVyQyxJQUFJLENBQUN5QyxPQUFMLENBQWF4QyxPQUFPLENBQUN5QyxPQUFSLENBQWdCLHFDQUFoQixDQUFiLENBQVYsRUFBZ0YsY0FBaEYsQ0FBRCxDQUZpQyxFQUFELENBQS9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlHN0IsU0FBT1YsTUFBTSxDQUFDQyxNQUFQLENBQWNoQyxPQUFPLENBQUMsd0JBQUQsQ0FBckIsRUFBdUQsRUFBQ3NCLGFBQWEsRUFBRTtBQUN4RUMsTUFBQUEsWUFBWSxFQUFFO0FBQ1pDLFFBQUFBLFVBQVUsRUFBRWYsZUFEQSxFQUQwRCxFQUFoQixFQUF2RCxDQUFQOzs7O0FBTUQsQ0EzR0QiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpLCBcclxuICAgICAgeyByZWdpc3RlclBsdWdpblBhdGhUb1JlcXVpcmVIb29rIH0gPSByZXF1aXJlKCcuL3JlcXVpcmVIb29rLmpzJylcclxuXHJcbi8qKiBOT1RFOiBPTkxZIGEgc2luZ2xlIG5lc3RlZCBvdmVycmlkZSBsZXZlbCBpcyBzdXBwb3J0ZWQuXHJcbiAgICBFc2xpbnQgb3ZlcnJpZGVzIHdpbGwgYmUgdXNlZCB0byBhcHBseSBtdWx0aXBsZSBlc2xpbnQgY29uZmlncyBpbiB0aGUgcHJvamVjdCBodHRwczovL2VzbGludC5vcmcvZG9jcy91c2VyLWd1aWRlL2NvbmZpZ3VyaW5nI2NvbmZpZ3VyYXRpb24tYmFzZWQtb24tZ2xvYi1wYXR0ZXJuc1xyXG4gICAgRVNsaW50IGFsc28gc3VwcG9ydHMgbmVzdGVkIG92ZXJyaWRlcywgaW4gd2hpY2ggd2lsbCBiZSBhcHBsaWVkIHdoZW4gYm90aCB0aGUgY2hpbGQgYW5kIHBhcmVudCBwYXR0ZXJucyBhcmUgbWF0Y2hlZC4gXHJcbiAgICBodHRwczovL2dpdGh1Yi5jb20vZXNsaW50L2VzbGludC9wdWxsLzExNTU0XHJcbiAgICAvLyBpbXBvcnRhbnQgLSB0aGUgZml4IHRoYXQgYWxsb3dzIG11bHRpcGxlIG5lc3RlZCBleHRlbnNpb25zIGFuZCBvdmVycmlkZXMsIHJlbW92aW5nIHRoZSBlcnJvciB0aHJvdywgaXMgbm90IHlldCBtZXJnZWQsIG5vdCBldmVuIGluIHRoZSBgbmV4dGAgdmVyc2lvbiBwdWJsaXNoZWQuXHJcbiAgICAqL1xyXG5tb2R1bGUuZXhwb3J0cy50ZW1wbGF0ZUNvbmZpZyA9IHtcclxuICByb290OiB0cnVlLCAgLy8gcHJldmVudCBsb29rdXAgZm9yIGVzbGludCBjb25maWcgZmlsZS5cclxuICBvdmVycmlkZXM6IFtdLFxyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMuc2VydmVyU2lkZUVudmlyb25tZW50ID0gKHsgXHJcbiAgYmFzZVBhdGgsIC8vIGJhc2UgcGF0aCBmb3IgZmlsZXMgbWF0Y2hpbmcgcGF0dGVybnNcclxuICBiYWJlbENvbmZpZ1BhdGggPSAnLi9jb25maWd1cmF0aW9uL3NlcnZlclNpZGVCYWJlbC5jb25maWcuanMnLCB0eXBlc2NyaXB0Q29uZmlnUGF0aCA9ICcuL2NvbmZpZ3VyYXRpb24vdHlwZXNjcmlwdC5jb25maWcuanNvbicsIHNob3VsZFJlZ2lzdGVyTW9kdWxlUGF0aCA9IHRydWUgfSA9IHt9KSA9PiB7XHJcbiAgaWYoc2hvdWxkUmVnaXN0ZXJNb2R1bGVQYXRoKSByZWdpc3RlclBsdWdpblBhdGhUb1JlcXVpcmVIb29rKClcclxuXHJcbiAgbGV0IHR5cGVzY3JpcHRFc2xpbnRSZWNvbW1lbmRlZCA9IHJlcXVpcmUoJ0B0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luL2Rpc3QvY29uZmlncy9yZWNvbW1lbmRlZC5qc29uJylcclxuICBsZXQgcHJldHRpZXJUeXBlc2NyaXB0RXNsaW50ID0gcmVxdWlyZSgnZXNsaW50LWNvbmZpZy1wcmV0dGllci9AdHlwZXNjcmlwdC1lc2xpbnQnKVxyXG4gIGxldCBwcmV0dGllckNvbmZpZyA9IHJlcXVpcmUoJy4vcHJldHRpZXIuY29uZmlnLmpzJylcclxuXHJcblxyXG4gIGNvbnN0IHZzY29kZUJ1aWxkSW5Gb3JtYXRlciA9IHtcclxuICAgIC8vIE5PVEU6IFVzaW5nIFZTQ29kZSBidWlsdGluIGZvcm1hdHRlciBpbnN0ZWFkXHJcbiAgICBmaWxlczogWycqKi5qc29uJywgJyoqLmpzb25jJ10sXHJcbiAgICBwbHVnaW5zOiBbJ2VzbGludC1wbHVnaW4tanNvbiddLCAvLyBidWlsZC1pbiBwbHVnaW5zLlxyXG4gICAgZW52OiB7XHJcbiAgICAgIG5vZGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH1cclxuXHJcbiAgbGV0IG5vZGVqc0ZpbGUgPSB7XHJcbiAgICBmaWxlczogWycqKi5qcyddLFxyXG4gICAgLy8gXCJleGNsdWRlZEZpbGVzXCI6IFwiKi50ZXN0LmpzXCIsXHJcbiAgICBwYXJzZXI6ICdiYWJlbC1lc2xpbnQnLFxyXG4gICAgcGFyc2VyT3B0aW9uczoge1xyXG4gICAgICBiYWJlbE9wdGlvbnM6IHtcclxuICAgICAgICBjb25maWdGaWxlOiBiYWJlbENvbmZpZ1BhdGgsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAnZXNsaW50LXBsdWdpbi1iYWJlbCcsIC8vIGVzbGludC1wbHVnaW4tYmFiZWwgcmUtaW1wbGVtZW50cyAoZnJvbSB0aGUgYmFzZSBlc2xpbnQgcnVsZXMpIHByb2JsZW1hdGljIHJ1bGVzIHNvIHRoZXkgZG8gbm90IGdpdmUgZmFsc2UgcG9zaXRpdmVzIG9yIG5lZ2F0aXZlc1xyXG4gICAgICAncHJldHRpZXInLFxyXG4gICAgXSxcclxuICAgIHJ1bGVzOiB7XHJcbiAgICAgIC8vIGFkZCBwcmV0dGllciBpbnRlZ3JhdGlvblxyXG4gICAgICAncHJldHRpZXIvcHJldHRpZXInOiBbXHJcbiAgICAgICAgJ3dhcm4nLFxyXG4gICAgICAgIHByZXR0aWVyQ29uZmlnLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHVzZVByZXR0aWVycmM6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgICBlbnY6IHtcclxuICAgICAgbm9kZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfVxyXG5cclxuICBsZXQgdHlwZXNjcmlwdEZpbGUgPSB7XHJcbiAgICBmaWxlczogWycqKi50cyddLFxyXG4gICAgLy8gY29ycmVjdGx5IHBhcnNlIHR5cGVzY3JpcHQgd2l0aCBiYWJlbCBwYXJzZXIgLSBodHRwczovL2dpdGh1Yi5jb20vdHlwZXNjcmlwdC1lc2xpbnQvdHlwZXNjcmlwdC1lc2xpbnQvYmxvYi9tYXN0ZXIvcGFja2FnZXMvdHlwZXNjcmlwdC1lc3RyZWUvdGVzdHMvYXN0LWFsaWdubWVudC9wYXJzZS50cyNMMTZcclxuICAgIHBhcnNlcjogJ0B0eXBlc2NyaXB0LWVzbGludC9wYXJzZXInLFxyXG4gICAgcGFyc2VyT3B0aW9uczoge1xyXG4gICAgICBlY21hVmVyc2lvbjogMjAxOCxcclxuICAgICAgc291cmNlVHlwZTogJ21vZHVsZScsXHJcbiAgICAgIHByb2plY3Q6IHR5cGVzY3JpcHRDb25maWdQYXRoLCAvLyBGb2xsb3dzIHRoZSBwYXRoIHNob3VsZCBiZSBjb25zdW1lZCBieSBhIGZ1bmN0aW9uIGFuZCByZXBsYWNlZC5cclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbJ0B0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luJywgJ3ByZXR0aWVyJ10sXHJcbiAgICBydWxlczogT2JqZWN0LmFzc2lnbihcclxuICAgICAgdHlwZXNjcmlwdEVzbGludFJlY29tbWVuZGVkLnJ1bGVzLFxyXG4gICAgICAvLyBhZGQgcHJldHRpZXIgaW50ZWdyYXRpb25cclxuICAgICAgcHJldHRpZXJUeXBlc2NyaXB0RXNsaW50LnJ1bGVzLCAvLyBVc2VzIGVzbGludC1jb25maWctcHJldHRpZXIgdG8gZGlzYWJsZSBFU0xpbnQgcnVsZXMgZnJvbSBAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpbiB0aGF0IHdvdWxkIGNvbmZsaWN0IHdpdGggcHJldHRpZXJcclxuICAgICAgLy8gcHJldHRpZXIgRXNsaW50IFJlY29tbWVuZGVkIGFyZSBgcHJldHRpZXJgIHBsdWdpbiBhbmQgYGVycm9yYCBydWxlIC8vIEVuYWJsZXMgZXNsaW50LXBsdWdpbi1wcmV0dGllciBhbmQgZGlzcGxheXMgcHJldHRpZXIgZXJyb3JzIGFzIEVTTGludCBlcnJvcnMuIE1ha2Ugc3VyZSB0aGlzIGlzIGFsd2F5cyB0aGUgbGFzdCBjb25maWd1cmF0aW9uIGluIHRoZSBleHRlbmRzIGFycmF5LlxyXG4gICAgICB7XHJcbiAgICAgICAgJ3ByZXR0aWVyL3ByZXR0aWVyJzogJ3dhcm4nLFxyXG4gICAgICB9LFxyXG4gICAgKSxcclxuICAgIGVudjoge1xyXG4gICAgICBub2RlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9XHJcblxyXG5cclxuICBsZXQgb3ZlcnJpZGVzID0gW1xyXG4gICAgLy8gc3BlY2lmaWMgZGlmZmVyZW50IHBhcnNlciBhY2NvcmRpbmcgdG8gZmlsZSBleHRlbnNpb24uXHJcbiAgICB2c2NvZGVCdWlsZEluRm9ybWF0ZXIsXHJcbiAgICBub2RlanNGaWxlLFxyXG4gICAgdHlwZXNjcmlwdEZpbGUsXHJcbiAgXVxyXG5cclxuICBpZihiYXNlUGF0aCkgXHJcbiAgICBmb3IobGV0IGNvbmZpZyBvZiBvdmVycmlkZXMpIFxyXG4gICAgICBpZihjb25maWcuZmlsZXMpIGNvbmZpZy5maWxlcyA9IGNvbmZpZy5maWxlcy5tYXAoaXRlbSA9PiBwYXRoLmpvaW4oYmFzZVBhdGgsIGl0ZW0pKVxyXG4gICAgXHJcblxyXG4gIGxldCBlc2xpbnRDb25maWcgPSB7XHJcbiAgICByb290OiB0cnVlLCAvLyBwcmV2ZW50IGxvb2t1cCBmb3IgZXNsaW50IGNvbmZpZyBmaWxlLlxyXG4gICAgb3ZlcnJpZGVzLFxyXG4gIH1cclxuXHJcbiAgLy8gZGVidWcgaW4gdnNjb2RlIGVzbGludCBleHRlbnRpb24gKG9wZW46IFZTY29kZSBPVVRQVVQgPiBFU0xpbnQpXHJcbiAgLy8gY29uc29sZS5sb2coYOKAoiBFU2xpbnQgY29uZmlnIHVzZWQ6YClcclxuICAvLyBjb25zb2xlLmxvZyhlc2xpbnRDb25maWcub3ZlcnJpZGVzKVxyXG5cclxuICByZXR1cm4gZXNsaW50Q29uZmlnXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzLmNsaWVudFNpZGVFbnZpcm9ubWVudCA9ICh7IFxyXG4gIGJhc2VQYXRoLCAvLyBiYXNlIHBhdGggZm9yIGZpbGVzIG1hdGNoaW5nIHBhdHRlcm5zXHJcbiAgYmFiZWxDb25maWdQYXRoID0gJy4vY29uZmlndXJhdGlvbi9jbGllbnRTaWRlQmFiZWwuY29uZmlnLmpzJywgc2hvdWxkUmVnaXN0ZXJNb2R1bGVQYXRoID0gdHJ1ZSBcclxufSA9IHt9KSA9PiB7XHJcbiAgaWYoc2hvdWxkUmVnaXN0ZXJNb2R1bGVQYXRoKSByZWdpc3RlclBsdWdpblBhdGhUb1JlcXVpcmVIb29rKHtcclxuICAgIC8vIGltcG9ydGFudDogc2hvdWxkIGFkZCBwbHVnaW5zIHBhdGggdG8gcmVxdWlyZSBob29rLCBhcyB0aGVzZSBhcmUgcmVmZXJlbmNlZCByZWxhdGl2ZSB0byB0aGUgdGFyZ2V0IHByb2plY3QncyBlc2xpbnQuY29uZmlnLmpzIGZpbGUuXHJcbiAgICBhZGRpdGlvbmFsTm9kZU1vZHVsZVBhdGg6IFtwYXRoLmpvaW4ocGF0aC5kaXJuYW1lKHJlcXVpcmUucmVzb2x2ZSgnQG9wZW4td2MvZXNsaW50LWNvbmZpZy9wYWNrYWdlLmpzb24nKSksICdub2RlX21vZHVsZXMnKV1cclxuICB9KVxyXG5cclxuICAvLyAvLyBFU0xpbnQgb3ZlcnJpZGVzIHByb3BlcnR5IHN1cHBvcnRlZCBvbmx5IDEgbmVzdGVkIGxldmVsIChwYXJlbnQtY2hpbGQpLlxyXG4gIC8vIGxldCBvdmVycmlkZXMgPSBbXVxyXG5cclxuICAvLyB7ICBjb25zdCB2c2NvZGVCdWlsZEluRm9ybWF0ZXIgPSB7XHJcbiAgLy8gICAgIC8vIE5PVEU6IFVzaW5nIFZTQ29kZSBidWlsdGluIGZvcm1hdHRlciBpbnN0ZWFkXHJcbiAgLy8gICAgIGZpbGVzOiBbJyoqLmpzb24nLCAnKiouanNvbmMnXSxcclxuICAvLyAgICAgcGx1Z2luczogWydlc2xpbnQtcGx1Z2luLWpzb24nXSwgLy8gYnVpbGQtaW4gcGx1Z2lucy5cclxuICAvLyAgICAgZW52OiB7XHJcbiAgLy8gICAgICAgbm9kZTogdHJ1ZSxcclxuICAvLyAgICAgfSxcclxuICAvLyAgIH1cclxuICAvLyAgIG92ZXJyaWRlcy5wdXNoKHZzY29kZUJ1aWxkSW5Gb3JtYXRlcilcclxuICAvLyB9XHJcbiAgXHJcbiAgLy8ge1xyXG4gIC8vICAgLypcclxuICAvLyAgICpodHRwczovL2dpdGh1Yi5jb20vb3Blbi13Yy9vcGVuLXdjL2Jsb2IvbWFzdGVyL3BhY2thZ2VzL3ByZXR0aWVyLWNvbmZpZy9wcmV0dGllci5jb25maWcuanNcclxuICAvLyAgICAgQXBwbHkgZm9ybWF0dGluZyB0byBKUyBmaWxlc1xyXG4gIC8vICAgICBBcHBseSBmb3JtYXR0aW5nIHRvIEhUTUwgaW5zaWRlIG9mIGh0bWwgdGFnZ2VkIHRlbXBsYXRlIGxpdGVyYWxzIHVzZWQgYnkgbGl0LWh0bWxcclxuICAvLyAgICAgQXBwbHkgZm9ybWF0dGluZyB0byBDU1MgaW5zaWRlIG9mIGNzcyB0YWdnZWQgdGVtcGxhdGUgbGl0ZXJhbHMgdXNlZCBieSBsaXQtZWxlbWVudFxyXG4gIC8vICAgICBJbnRlZ3JhdGlvbiB3aXRoIEVTTGludCB0byBwcmV2ZW50IHBvdGVudGlhbGx5IGNvbmZsaWN0aW5nIHJ1bGVzXHJcblxyXG4gIC8vICAgKi9cclxuICAvLyAgIGxldCBwcmV0dGllckNvbmZpZyA9IHJlcXVpcmUoJ0BvcGVuLXdjL2VzbGludC1jb25maWcnKSAvLyBodHRwczovL2dpdGh1Yi5jb20vb3Blbi13Yy9vcGVuLXdjLyA+IGVzbGludC1jb25maWdcclxuXHJcbiAgLy8gICAvKlxyXG4gIC8vICAgKmh0dHBzOi8vZ2l0aHViLmNvbS9vcGVuLXdjL29wZW4td2MvYmxvYi9tYXN0ZXIvcGFja2FnZXMvZXNsaW50LWNvbmZpZy9pbmRleC5qc1xyXG4gIC8vICAgICBBcHBseSBsaW50aW5nIHRvIGpzIGFuZCBodG1sIGZpbGVzXHJcbiAgLy8gICAgIEFwcGx5IGxpbnRpbmcgZm9yIGJlc3QgcHJhY3RpY2VzXHJcbiAgLy8gICAgIEFsbG93IGR5bmFtaWMgbW9kdWxlIGltcG9ydHNcclxuICAvLyAgICAgQWxsb3cgaW1wb3J0cyBpbiB0ZXN0L2RlbW9zIGZyb20gZGV2RGVwZW5kZW5jaWVzXHJcbiAgLy8gICAgIEFsbG93IHVuZGVyc2NvcmUgZGFuZ2xlXHJcbiAgLy8gICAgIERvIG5vdCBwcmVmZXIgZGVmYXVsdCBleHBvcnRzXHJcbiAgLy8gICAgIERvIG5vdCBwcmVmZXIgbm8gZmlsZSBleHRlbnNpb25cclxuXHJcbiAgLy8gICBVU0FHRTogXHJcbiAgLy8gICAgIOKAoiByZXF1aXJlIGRpcmVjdGx5IGFuZCBtYWtlIHN1cmUgaW50ZXJuYWwgcGx1Z2luIG5hbWVzIGFyZSByZXNvbHZlZCBjb3JyZWN0bHkgKC4vQG9wZW4td2MvZXNsaW50LWNvbmZpZy9ub2RlX21vZHVsZXMvPHBsdWdpbnMuLi4+KSwgYXMgaXQgd2lsbCBiZSByZWZlcmVuY2VkIGJ5IHRoZSBsb2NhdGlvbiBvZiB0aGUgdGFyZ2V0IHByb2plY3QncyBlc2xpbmcgY29uZmlnIGZpbGUgKDx0YXJnZXQgcHJvamVjdD4vY29uZmlndXJhdGlvbi9lc2xpbnQuY29uZmlnLmpzKVxyXG4gIC8vICAgT1JcclxuICAvLyAgICAg4oCiIHVzZSBlc2xpbnQgY29uZmlnOiAobWFrZSBzdXJlIHRvIGFkZCBub2RlX21vZHVsZXMgdG8gcmVxdWlyZSBwYXRoIHRvIHJlc29sdmUgcGx1Z2lucyBjb3JyZWN0bHkpIGh0dHBzOi8vZ2l0aHViLmNvbS9vcGVuLXdjL29wZW4td2MvYmxvYi9tYXN0ZXIvcGFja2FnZXMvZXNsaW50LWNvbmZpZy9wYWNrYWdlLmpzb25cclxuICAvLyAgICAgICBcIkBvcGVuLXdjL2VzbGludC1jb25maWdcIixcclxuICAvLyAgICAgICBcImVzbGludC1jb25maWctcHJldHRpZXJcIlxyXG5cclxuICAvLyAgICovXHJcbiAgLy8gICBsZXQgb3BlbldlYmNvbXBvbmVudEVzbGludENvbmZpZyA9IHJlcXVpcmUoJ0BvcGVuLXdjL2VzbGludC1jb25maWcnKSAvLyBodHRwczovL2dpdGh1Yi5jb20vb3Blbi13Yy9vcGVuLXdjLyA+IGVzbGludC1jb25maWdcclxuICAgIFxyXG4gIC8vICAgb3BlbldlYmNvbXBvbmVudEVzbGludENvbmZpZyA9IE9iamVjdC5hc3NpZ24oe1xyXG4gIC8vICAgICBmaWxlczogWycqKi5qcycsICcqKi50cyddLFxyXG4gIC8vICAgICAvLyBzZXQgYmFiZWwgY29uZmlndXJhdGlvbiBsb2NhdGlvbi5cclxuICAvLyAgICAgcGFyc2VyT3B0aW9uczoge1xyXG4gIC8vICAgICAgIGJhYmVsT3B0aW9uczoge1xyXG4gIC8vICAgICAgICAgY29uZmlnRmlsZTogYmFiZWxDb25maWdQYXRoLFxyXG4gIC8vICAgICAgIH0sXHJcbiAgLy8gICAgIH0sIFxyXG4gIC8vICAgfSwgb3BlbldlYmNvbXBvbmVudEVzbGludENvbmZpZykgXHJcblxyXG4gIC8vICAgLy8gYWRkIHByZXR0aWVyIGludGVncmF0aW9uXHJcbiAgLy8gICBvcGVuV2ViY29tcG9uZW50RXNsaW50Q29uZmlnLnJ1bGVzWydwcmV0dGllci9wcmV0dGllciddID0gW1xyXG4gIC8vICAgICAnd2FybicsXHJcbiAgLy8gICAgIHByZXR0aWVyQ29uZmlnLFxyXG4gIC8vICAgICB7XHJcbiAgLy8gICAgICAgdXNlUHJldHRpZXJyYzogdHJ1ZSxcclxuICAvLyAgICAgfSxcclxuICAvLyAgIF1cclxuXHJcbiAgLy8gICAvLyBleHRyYWN0IG92ZXJyaWRlcyBwcm9wZXJ0eSBhcyBvbmx5IGEgc2luZ2xlIGxldmVsIGlzIHN1cHBvcnRlZCBieSBFU0xpbnQuXHJcbiAgLy8gICBsZXQgYWRkaXRpb25hbE92ZXJyaWRlID0gb3BlbldlYmNvbXBvbmVudEVzbGludENvbmZpZy5vdmVycmlkZXNcclxuXHJcbiAgLy8gICAvLyByZW1vdmUgYHJvb3RgICYgYG92ZXJyaWRlc2Agb3B0aW9uIGFzIGl0IGlzIGludmFsaWQgaW5zaWRlIG92ZXJyaWRlcyBhbmQgd2lsbCB0aHJvdy5cclxuICAvLyAgIGRlbGV0ZSBvcGVuV2ViY29tcG9uZW50RXNsaW50Q29uZmlnLnJvb3RcclxuICAvLyAgIGRlbGV0ZSBvcGVuV2ViY29tcG9uZW50RXNsaW50Q29uZmlnLm92ZXJyaWRlc1xyXG5cclxuICAvLyAgIG92ZXJyaWRlcyA9IFsuLi5vdmVycmlkZXMsIG9wZW5XZWJjb21wb25lbnRFc2xpbnRDb25maWcsIC4uLmFkZGl0aW9uYWxPdmVycmlkZV1cclxuICAvLyB9XHJcblxyXG4gIC8vIGlmKGJhc2VQYXRoKSBcclxuICAvLyAgIGZvcihsZXQgY29uZmlnIG9mIG92ZXJyaWRlcykgXHJcbiAgLy8gICAgIGlmKGNvbmZpZy5maWxlcykgY29uZmlnLmZpbGVzID0gY29uZmlnLmZpbGVzLm1hcChpdGVtID0+IHBhdGguam9pbihiYXNlUGF0aCwgaXRlbSkpXHJcbiAgICBcclxuXHJcbiAgLy8gbGV0IGVzbGludENvbmZpZyA9IHtcclxuICAvLyAgIHJvb3Q6IHRydWUsIC8vIHByZXZlbnQgbG9va3VwIGZvciBlc2xpbnQgY29uZmlnIGZpbGUuXHJcbiAgLy8gICBvdmVycmlkZXMsXHJcbiAgLy8gfVxyXG5cclxuICAvLyAvLyBkZWJ1ZyBpbiB2c2NvZGUgZXNsaW50IGV4dGVudGlvbiAob3BlbjogVlNjb2RlIE9VVFBVVCA+IEVTTGludClcclxuICAvLyAvLyBjb25zb2xlLmxvZyhg4oCiIEVTbGludCBjb25maWcgdXNlZDpgKVxyXG4gIC8vIC8vIGNvbnNvbGUubG9nKGVzbGludENvbmZpZy5vdmVycmlkZXMpXHJcblxyXG4gIC8vIHJldHVybiBlc2xpbnRDb25maWdcclxuXHJcblxyXG4gIC8vIFRlbXBvcmFyeSB1bnRpbCBmZWF0dXJlIGlzIG1lcmdlZCAoY2hlY2sgZm9yIGxpbmsgYWJvdmUpXHJcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24ocmVxdWlyZSgnQG9wZW4td2MvZXNsaW50LWNvbmZpZycpLCAgICAgICB7cGFyc2VyT3B0aW9uczoge1xyXG4gICAgICAgIGJhYmVsT3B0aW9uczoge1xyXG4gICAgICAgICAgY29uZmlnRmlsZTogYmFiZWxDb25maWdQYXRoLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIFxyXG59KVxyXG59XHJcbiJdfQ==