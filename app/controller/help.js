'use strict';

const Constroller = require('egg').Controller;

class Info extends Constroller {
  async getHelpInfo() {
    const { ctx } = this;
    const res = await ctx.helper.promiseAll([
      ctx.service.user.getContactInfo(),
      ctx.service.home.getProductList(),
      ctx.service.help.gethelpData(),
      {title: '帮助中心'},
    ]);
    await ctx.render('help.js', res);
  }
}

module.exports = Info;
