"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  // const isLoginForApi = app.middleware.isLogin({ api: true });
  // const isLoginForView = app.middleware.isLogin({ api: false });

  // router.get("/financial/company/report/downloadNew", controller.forward.get)

  /** 请求数据 **/
  router.get(
    "/financial/*",
    app.middleware.devDocker(),
    controller.forward.get
  );
  router.post(
    "/financial/*",
    app.middleware.devDocker(),
    controller.forward.post
  );

  /** 请求页面 **/
  // 首页
  router.get("/", controller.home.home);
  router.get("/home", controller.home.home);
  router.get("/captcha", controller.home.captcha);

  // 金融产品
  router.get("/products", controller.product.list);
  router.get("/products/details/:id", controller.product.detail);
  router.get("/products/application/:id", controller.product.application);

  // 金融机构
  router.get("/finance", controller.finance.list);
  router.get("/finance/details/:id", controller.finance.detail);

  // 资讯服务
  router.get("/info", controller.info.getInfo);
  router.get("/info/detail/:id", controller.info.getInfoDetail);

  // 帮助中心
  router.get("/help", controller.help.getHelpInfo);

  //联合征信
  router.get("/credit", controller.credit.main);
  router.get("/credit/creditList", controller.credit.creditList);
  router.get("/credit/detail", controller.credit.detail);

  //api:验证是否登录，或者登录是否过期
  router.post("/user/isLogin", controller.user.isLogin);

  //pdf页面
  router.get("/page/createPdf", controller.pdf.index);
};
