"use strict";

const Controller = require("egg").Controller;
var URL = require("url");
class Credit extends Controller {
  async main(ctx) {
    const res = await ctx.helper.promiseAll([
      ctx.service.user.getContactInfo(),
      ctx.service.home.getProductList(),
      { title: "联合征信" },
    ]);
    await ctx.render("credit.js", res);
  }

  async creditList(ctx) {
    const key = ctx.query.keyword;
    const res = await ctx.helper.promiseAll([
      ctx.service.user.getContactInfo(),
      ctx.service.home.getProductList(),
      // ctx.service.credit.getReportData(key, 1),
      { title: decodeURIComponent(key) },
    ]);
    await ctx.render("creditList.js", res);
  }

  async detail(ctx) {
    const res = await ctx.helper.promiseAll([
      ctx.service.user.getContactInfo(),
      ctx.service.home.getProductList(),
      // ctx.service.credit.getReportDetail(ctx.query),
      { title: decodeURIComponent(ctx.query.keyword) },
      { query: ctx.query },
    ]);
    await ctx.render("creditDetail.js", res);
  }
}

module.exports = Credit;
