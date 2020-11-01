"use strict";
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webPagePath = "app/web/page";

module.exports = {
  imageHash: true,
  entry: {
    home: "app/web/page/home/index.jsx", // 首页
    productList: "app/web/page/product/list.jsx", // 金融产品列表
    productDetail: "app/web/page/product/detail.jsx", // 金融产品详情
    productApplication: "app/web/page/product/application.jsx", // 金融产品申请
    financeList: "app/web/page/finance/list.jsx", // 金融机构列表
    financeDetail: "app/web/page/finance/detail.jsx", // 金融机构详情
    info: `${webPagePath}/info/index.jsx`, // 资讯服务（政策法规、资讯公告、融资案例）
    infoDetail: `${webPagePath}/info/detail.jsx`, // 资讯详情
    help: `${webPagePath}/help/index.jsx`, // 帮助中心
    credit: `app/web/page/credit/index.jsx`, // 联合征信
    creditList: `app/web/page/credit/creditList.jsx`, //联合征信搜索结果
    creditDetail: `app/web/page/credit/creditDetail.jsx`, //征信详情
    pdf: `app/web/page/cpdf/index.jsx`, //pdf生成页
  },
  module: {
    rules: [
      {
        scss: false,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]-[hash:base64:10]",
                getLocalIdent: (context, localIdentName, localName) => {
                  const path = context._module.context;
                  if (
                    /^((?!node_modules).)*(web){1}.*(components|page){1}.*$/.test(
                      path
                    )
                  ) {
                    return;
                  }
                  return localName;
                },
              },
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
          },
          {
            loader: "sass-resources-loader", // 全局scss变量插件
            options: {
              resources: path.join(__dirname, "./app/web/styles/variable.scss"),
            },
          },
        ],
      },
      {
        babel: {
          include: [
            (filename) => {
              return /^(((?!node_modules).)*(js|jsx))|(.*(node_modules).*(strict-uri-encode|react-hook-form|query-string|split-on-first|swiper|dom7\.modular).*(\.js))$/.test(
                filename
              );
            },
          ],
          exclude: [],
        },
      },
    ],
  },
  plugins: [
    { extract: false },
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[name].[contenthash].css",
      // filename: 'css/[name].css',
      // chunkFilename: 'css/[name].css',
    }),
  ],
  alias: {
    "@root": "",
    "@src": "app/web",
  },
};
