'use strict';

const Controller = require('egg').Controller;
const request = require('request');
const fs = require('fs');
class Forward extends Controller {
  async get(ctx) {
    // ctx.logger.info(ctx.request.header);
    let header = { ...ctx.request.header }
    if (ctx.header.cookie.indexOf('loginUserId') !== -1) {
      let cookieObj = {}
      ctx.header.cookie.split('; ').forEach(v => {
        let cookie = v.split('=');
        cookieObj[cookie[0]] = cookie[1];
      })
      header = Object.assign({}, header, { loginUserId: cookieObj.loginUserId });
    }
    const result = await ctx.curl(`${this.config.proxyHost}${decodeURIComponent(ctx.request.url)}`, {
      headers: header,
      method: 'GET',
      // dataType: 'json',
    });
    ctx.set(result.headers);
    ctx.status = result.status;
    ctx.body = result.data || { message: '系统错误，请联系管理员' };
  }

  async post(ctx) {
    // ctx.logger.info(ctx.request.header);
    const url = `${this.config.proxyHost}${decodeURIComponent(ctx.request.url)}`;
    const { fileupload } = ctx.request.header;
    if (fileupload == 'true') {
      // 写入mongodb
      // const stream = await ctx.getFileStream();
      // const { _id } = await ctx.app.savefile(stream);
      // console.log('_id: ', _id);
      ctx.body = ctx.req.pipe(request.post({ url }));
    } else {
      const result = await ctx.curl(url, {
        headers: { ...ctx.request.header },
        timeout: ctx.request.url = "/financial/company/report/viewFrontCreditReport" ? 60000 : 10000,
        method: 'POST',
        // dataType: 'json',
        data: ctx.request.body,
      });
      if (result.status == '402') {

      }
      // console.log('>>>>>>>>>>>>>', result)
      ctx.set(result.headers);
      ctx.status = result.status;
      ctx.body = result.data || { message: '系统错误，请联系管理员' };
    }
  }
}

module.exports = Forward;
