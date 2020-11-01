'use strict';

const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha');

class Home extends Controller {
  async home(ctx) {
    // ctx.logger.info(ctx.request.header);
    // console.log(this.ctx.request.header)
    // console.log(this.ctx.cookies.get('csrfToken'))
    // this.ctx.cookies.set('aaaa','1231231')
    const res = await ctx.helper.promiseAll([
      ctx.service.home.getBanner(),
      ctx.service.home.getStatistics(),
      ctx.service.home.getNews(),
      ctx.service.home.getPolicies(),
      ctx.service.home.getDockingData(),
      ctx.service.home.getFinancingCase(),
      ctx.service.user.getContactInfo(),
      ctx.service.home.getShibor(),
      ctx.service.home.getLPR(),
      ctx.service.home.getProductList(),
      ctx.service.home.getFinancialOrgans(),
      { title: '首页' },
    ]);
    await ctx.render('home.js', res);
  }

  async captcha(ctx) {
    const cap = svgCaptcha.create({
      noise: 2,
    });
    ctx.body = cap.data;
  }
}

module.exports = Home;
    