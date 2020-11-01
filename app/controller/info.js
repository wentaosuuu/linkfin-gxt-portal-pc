'use strict';

const Constroller = require('egg').Controller;

class Info extends Constroller {
  constructor(props) {
    super(props);
    const { ctx } = this;
    this.type = ctx.query.type;
    this.headerData = { isHome: false, menuIndex: 3, tabIndex: 1 };
    this.title = '政策法规';
    if (this.type === '2') {
      this.headerData.menuIndex = 4;
      this.title = '资讯公告';
    } else if (this.type === '4') {
      this.headerData.menuIndex = 5;
      this.title = '融资案例';
    }
  }

  // 加载资讯列表
  async getInfo() {
    const { ctx } = this;
    const res = await ctx.helper.promiseAll([
      ctx.service.info.getHotInfoList(),
      ctx.service.user.getContactInfo(),
      ctx.service.home.getProductList(),
      { headerData: this.headerData },
      { title: this.title },
    ]);
    await ctx.render('info.js', res);
  }

  // 加载资讯详情
  async getInfoDetail() {
    const { ctx } = this;
    const id = ctx.params.id;
    const res = await ctx.helper.promiseAll([
      ctx.service.info.getInfoDetail({ id }),
      ctx.service.user.getContactInfo(),
      ctx.service.home.getProductList(),
      { headerData: this.headerData },
      { title: this.title },
      { type: this.type },
    ]);
    await ctx.render('infoDetail.js', res);
  }
}

module.exports = Info;
