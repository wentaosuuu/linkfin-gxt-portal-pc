const Service = require('egg').Service;

class Help extends Service {

  // 获取热门信息列表
  async gethelpData() {
    const res = await this.ctx.curl(`${this.config.proxyHost}/financial/information/getQuestion`, {
      dataType: 'json',
    });
    return this.ctx.helper.serviceFormat(res, 'helpData');
  }
}

module.exports = Help;
