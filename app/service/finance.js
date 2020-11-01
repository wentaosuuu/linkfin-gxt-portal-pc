const Service = require('egg').Service;
class Finance extends Service {
  async getDetails(params) {
    const res = await this.ctx.curl(`${this.config.proxyHost}/financial/homePage/queryFinancialInstitutionDetails`, {
      method: 'POST',
      dataType: 'json',
      contentType: 'json',
      data: params,
    });
    // res.data.data.logoFilePath = `${res.data.data.logoFilePath}`;
    return this.ctx.helper.serviceFormat(res, 'financialDetailsData');
  };

}

module.exports = Finance;