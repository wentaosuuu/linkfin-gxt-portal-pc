"use strict";

const Controller = require("egg").Controller;

class User extends Controller {
  async isLogin(ctx) {
    const res = await ctx.service.user.isLogin(ctx.request.body);
    ctx.body = { code: res.status, msg: res.data.message };
  }
}

module.exports = User;
