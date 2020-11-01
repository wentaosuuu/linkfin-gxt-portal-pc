'use strict';

const Controller = require('egg').Controller;
var URL = require('url');
class Finance extends Controller {

  async list(ctx) {
    const res = await ctx.helper.promiseAll([
      ctx.service.user.getContactInfo(),
      ctx.service.home.getProductList(),
      { title: '金融机构列表' },
    ]);
    await ctx.render('financeList.js', {...res, query: ctx.query});
  }

  async detail(ctx) {
    // const params = {
    //   bankId: ctx.params.id,
    //   pageNum: 1,
    //   pageSize: 10,
    //   orderType: 'rateDown'
    // }
    const res = await ctx.helper.promiseAll([
      ctx.service.user.getContactInfo(),
      ctx.service.home.getProductList(),
      // ctx.service.finance.getDetails(params),
      { title: '金融机构详情' },
    ]);
    await ctx.render('financeDetail.js', {...res, isSsr: true, id: ctx.params.id});
  }

}

module.exports = Finance;
