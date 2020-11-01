const Service = require('egg').Service;

class Info extends Service {

  // 获取热门信息列表
  async getHotInfoList() {
    const res = await this.ctx.curl(`${this.config.proxyHost}/financial/business/selectHotBusiness`, {
      dataType: 'json',
    });
    return this.ctx.helper.serviceFormat(res, 'hotInfoData');
  }

  // 获取资讯列表
  async getInfoList(data) {
    const res = await this.ctx.curl(`${this.config.proxyHost}/financial/business/selAllRegulations`, {
      method: 'post',
      dataType: 'json',
      contentType: 'json',
      data,
    });
    return this.ctx.helper.serviceFormat(res, 'infoData');

  }

  // 获取资讯详情
  async getInfoDetail(data) {
    const res = await this.ctx.curl(`${this.config.proxyHost}/financial/business/selectByPrimaryKey`, {
      method: 'post',
      dataType: 'json',
      contentType: 'json',
      data,
    });
    return this.ctx.helper.serviceFormat(res, 'infoDetailData');

  }
}

module.exports = Info;
