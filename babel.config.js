module.exports = {
  "env": {
    "node": {
      "presets": [
        "@babel/preset-react",
        [
          "@babel/preset-env",
          {
            "modules": false,
            "targets": {
              "browsers": [
                "last 2 versions",
                "safari >= 7",
                "IE 11"
              ]
            }
          }
        ]
      ],
      "plugins": [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose": true }],
        "@babel/plugin-syntax-dynamic-import",
        ["react-css-modules", {// 达到类似vue的scoped效果
          filetypes: {
            '.scss': {
              syntax: 'postcss-scss',
              plugins: [
                'postcss-nested',
              ],
            },
          },
          generateScopedName: '[local]-[hash:base64:10]',
          webpackHotModuleReloading: true,
        }],
      ]
    },
    "web": {
      "presets": [
        "@babel/preset-react",
        [
          "@babel/preset-env",
          {
            "modules": 'auto',
            "targets": {
              "browsers": [
                "last 2 versions",
                "safari >= 7",
                "IE 11"
              ]
            }
          }
        ]
      ],
      "plugins": [
        'react-hot-loader/babel',
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose": true }],
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-object-rest-spread",
        ["react-css-modules", {// 达到类似vue的scoped效果
          filetypes: {
            '.scss': {
              syntax: 'postcss-scss',
              plugins: [
                'postcss-nested',
              ],
            },
          },
          generateScopedName: '[local]-[hash:base64:10]',
          webpackHotModuleReloading: true,
        }],
      ],
      // "ignore": [filename => {
      //   return /^(((?!node_modules).)*(js|jsx))|(.*(node_modules).*(react-hook-form|query-string|split-on-first|swiper|dom7\.modular).*(\.js))$/.test(filename);
      // }]
    }
  }
}
