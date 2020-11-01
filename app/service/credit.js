const Service = require("egg").Service;

class Credit extends Service {
  async getReportData(key, page) {
    const url = `${this.config.proxyHost}/financial/homePage/searchCompanyList`;
    const res = await this.ctx.curl(url, {
      method: "POST",
      dataType: "json",
      contentType: "json",
      data: {
        compName: decodeURIComponent(key),
        pageSize: 10,
        pageNo: page,
      },
    });
    return this.ctx.helper.serviceFormat(res, "creditList");
  }
  async getReportDetail(parmas) {
    const url = `${this.config.proxyHost}/financial/company/report/viewFrontCreditReport`;
    const res = await this.ctx.curl(url, {
      method: "POST",
      dataType: "json",
      contentType: "json",
      headers: {
        loginUserId: parmas.loginuserid,
      },
      data: {
        compUscc: parmas.compUscc,
        compName: decodeURIComponent(parmas.compName),
      },
      timeout: 600000,
    });
    return { reportData: res.data };
    // return this.ctx.helper.serviceFormat(res, "reportData");
  }
}

module.exports = Credit;
