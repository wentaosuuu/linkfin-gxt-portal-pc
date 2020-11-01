module.exports = options => {
  return async function isLogin(ctx, next) {
    ctx.session.user = {username: 'aaa'};
    if (!ctx.session.user) {
      if (options.api) {
        ctx.status = 401;
        ctx.body = {
          flag: false,
          message: '请先进行登录',
        };
      } else {
        ctx.status = 302;
        ctx.redirect('/login');
      }
    } else {
      await next();
    }
  };
};
