const EasyWebpack = require('@easy-team/easywebpack-react');
module.exports = () => {
  const exports = {};

  exports.logger = {
    disableConsoleAfterReady: false,
  };

  exports.webpack = {
    // webpackConfigList: EasyWebpack.getWebpackConfig()
  };

  // exports.proxyHost = 'http://127.0.0.1:8083';
  exports.proxyHost = process.env.LINKFIN_GXT_API_HOST;
  // exports.proxyHost = 'http://api.gxt.test.linkfin.caih.local';

  return exports;
};
