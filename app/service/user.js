const Service = require("egg").Service;

class User extends Service {
  // 获取网站信息
  async getContactInfo() {
    const res = await this.ctx.curl(
      `${this.config.proxyHost}/financial/information/getContactWay`,
      {
        dataType: "json",
      }
    );
    return this.ctx.helper.serviceFormat(res, "getContactInfo");
  }
  //是否登录
  async isLogin(parmas) {
    const res = await this.ctx.curl(
      `${this.config.proxyHost}/financial/sysUser/checkAuthor`,
      {
        method: "POST",
        dataType: "json",
        contentType: "json",
        headers: {
          loginUserId: parmas.loginuserid,
        },
        data: {},
      }
    );
    return res;
  }
}

module.exports = User;
