const { override, fixBabelImports, addLessLoader } = require('customize-cra');

const theme = require('./antd-theme');

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: theme,
  }),
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: true,
  }),
);
