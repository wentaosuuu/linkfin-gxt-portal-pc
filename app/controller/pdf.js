"use strict";

const Constroller = require("egg").Controller;

class Pdf extends Constroller {
  async index(ctx) {
    const { loginuserid, compUscc, compName } = ctx.query;
    /**
     * query
     * loginuserid:用户登录token
     * state: 1前台报告，0后台报告
     * userType: 用户身份: 1运营 0admin
     * compUscc: 统一信用代码
     * compName: 企业名称
     * reportNo: 报告编号
     */
    const parmas = {
      compUscc: compUscc,
      compName: compName,
      loginuserid: loginuserid,
    };
    const res = await ctx.service.credit.getReportDetail(parmas);
    await ctx.render("pdf.js", {
      reportData: res.reportData,
      query: ctx.query
    });
  }
}

module.exports = Pdf;
