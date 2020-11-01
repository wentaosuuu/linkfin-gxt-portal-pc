'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  session: true,
  redis: {
    enable: false,
    package: 'egg-redis',
  },
  sessionRedis: {
    enable: false,
    package: 'egg-session-redis',
  },
  reactssr: {
    enable: true,
    package: 'egg-view-react-ssr',
  },
  mongoose: {
    enable: false,
    package: 'egg-mongoose',
  },
};
