'use strict';

const Controller = require('egg').Controller;
var URL = require('url');
class Product extends Controller {

  async list(ctx) {
    const res = await ctx.helper.promiseAll([
      ctx.service.user.getContactInfo(),
      ctx.service.home.getProductList(),
      ctx.service.product.getQueries('financialInstitutionsType'),
      ctx.service.product.getQueries('lengthOfMaturity'),
      ctx.service.product.getQueries('guarantyStyle'),
      ctx.service.product.getQueries('loanLimit'),
      { title: '金融产品列表' },
    ]);
    await ctx.render('productList.js', {...res, query: ctx.query});
  }

  async detail(ctx) {
    const res = await ctx.helper.promiseAll([
      ctx.service.user.getContactInfo(),
      ctx.service.home.getProductList(),
      ctx.service.product.getDetails(ctx.params.id),
      { title: '金融产品详情' },
    ]);
    await ctx.render('productDetail.js', {...res});
  }

  async application(ctx) {
    const res = await ctx.helper.promiseAll([
      ctx.service.user.getContactInfo(),
      ctx.service.home.getProductList(),
      ctx.service.product.getDetails(ctx.params.id),
      ctx.service.product.queryAll('guarantyStyle'),
      { title: '金融产品申请' },
    ]);
    await ctx.render('productApplication.js', {...res});
  }

}

module.exports = Product;
