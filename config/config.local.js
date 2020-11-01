const EasyWebpack = require("@easy-team/easywebpack-react");
module.exports = () => {
  const exports = {};

  exports.reactssr = {
    injectCss: true,
  };
  exports.webpack = {
    // webpackConfigList: EasyWebpack.getWebpackConfig(),
  };

  exports.proxyHost = "http://gxt.dev.linkfin.caih.local";

  return exports;
};
