/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');
const fs = require('fs-extra');
const EasyWebpack = require("@easy-team/easywebpack-react");

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1573185417913_1241';

  // add your middleware config here
  config.middleware = [
    'logs',
    // 'user',
  ];

  // config.logger = {
  //   level: 'DEBUG',
  //   allowDebugAtProd: true,
  // }

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: null,
      db: 0,
    },
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/egg',
    options: {
      useUnifiedTopology: true,
    },
  };

  config.httpclient = {
    request: {
      timeout: 10000,
    },
  }

  config.session = {
    key: 'SESSION_ID',
    // maxAge: 24 * 3600 *1000,
    maxAge: 10 * 1000,
    httpOnly: true,
    encrypt: true,
    renew: true,
  };

  config.static = {
    prefix: '/public/',
    dir: [path.join(appInfo.baseDir, 'public'), {
      prefix: '/ueditor',
      dir: path.join(appInfo.baseDir, 'ueditor_temp'),
    }],
  };

  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(appInfo.baseDir, 'app/web/assets/img/favicon.ico')),
    '/robots.txt': fs.readFileSync(path.join(appInfo.baseDir, 'robots.txt')),
  };

  config.serverTimeout = 0;

  config.reactssr = {
    // renderOptions: {
    //   basedir: path.join(appInfo.baseDir, 'app/view'),
    // },
    layout: path.join(appInfo.baseDir, 'app/web/view/layout.html'),
    // injectCss: true,
  };

  // config.multipart = {
  //   mode: 'file',
  // };

  // add your user config here
  const userConfig = {
    webpack: {
      webpackConfigList: EasyWebpack.getWebpackConfig(),
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
