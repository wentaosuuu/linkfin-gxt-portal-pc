module.exports = options => {
  // 抹去host解决容器云访问报404的问题
  return async function isLogin(ctx, next) {
    ctx.request.header.host = '';
    await next();
  };
};
