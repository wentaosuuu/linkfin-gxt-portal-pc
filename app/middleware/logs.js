module.exports = () => {
  return async function consoleLog(ctx, next) {
    ctx.logger.info();
    await next();
  };
};
