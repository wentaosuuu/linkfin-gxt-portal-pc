const Service = require("egg").Service;
const transactionData = require("./testData").data;

const dockingDynamicList = [
  {
    companyName: "广西******技术有限公司",
    auditDate: "2019/12/30",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/12/30",
  },
  {
    companyName: "广西******集团有限公司",
    auditDate: "2019/12/30",
  },
  {
    companyName: "恩施******劳务有限公司",
    auditDate: "2019/12/30",
  },
  {
    companyName: "广西******劳务有限公司",
    auditDate: "2019/12/30",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/12/30",
  },
  {
    companyName: "广西******劳务有限公司",
    auditDate: "2019/12/29",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/12/29",
  },
  {
    companyName: "广西******技术有限公司",
    auditDate: "2019/12/29",
  },
  {
    companyName: "广西******劳务有限公司",
    auditDate: "2019/12/29",
  },
  {
    companyName: "河池******有限责任公司",
    auditDate: "2019/12/29",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/12/28",
  },
  {
    companyName: "广西******集团有限公司",
    auditDate: "2019/12/28",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/12/28",
  },
  {
    companyName: "广西******建设有限公司",
    auditDate: "2019/12/27",
  },
  {
    companyName: "广西******劳务有限公司",
    auditDate: "2019/12/27",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/12/26",
  },
  {
    companyName: "广西******发展有限公司",
    auditDate: "2019/12/26",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/12/26",
  },
  {
    companyName: "广西******发展有限公司",
    auditDate: "2019/12/26",
  },
  {
    companyName: "广西******集团有限公司",
    auditDate: "2019/12/26",
  },
  {
    companyName: "广西******有限责任公司",
    auditDate: "2019/12/25",
  },
  {
    companyName: "南宁******有限责任公司",
    auditDate: "2019/12/25",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/12/25",
  },
  {
    companyName: "广西******投资有限公司",
    auditDate: "2019/12/24",
  },
  {
    companyName: "宁夏******分包有限公司",
    auditDate: "2019/12/24",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/12/22",
  },
  {
    companyName: "广西******有限责任公司",
    auditDate: "2019/12/21",
  },
  {
    companyName: "广西******施工有限公司",
    auditDate: "2019/12/21",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/12/21",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/12/20",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/12/19",
  },
  {
    companyName: "广西******服务有限公司",
    auditDate: "2019/12/19",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/12/19",
  },
  {
    companyName: "广西******劳务有限公司",
    auditDate: "2019/12/19",
  },
  {
    companyName: "广西******分包有限公司 ",
    auditDate: "2019/12/19",
  },
  {
    companyName: "南宁******有限责任公司",
    auditDate: "2019/12/17",
  },
  {
    companyName: "广西******有限责任公司",
    auditDate: "2019/12/17",
  },
  {
    companyName: "广西******有限责任公司",
    auditDate: "2019/12/17",
  },
  {
    companyName: "南宁******租赁有限公司",
    auditDate: "2019/12/16",
  },
  {
    companyName: "广西******建设有限公司",
    auditDate: "2019/12/16",
  },
  {
    companyName: "南宁******劳务有限公司",
    auditDate: "2019/12/16",
  },
  {
    companyName: "南宁******分包有限公司",
    auditDate: "2019/12/15",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/12/15",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/12/15",
  },
  {
    companyName: "南宁******有限责任公司",
    auditDate: "2019/12/14",
  },
  {
    companyName: "广西******有限责任公司",
    auditDate: "2019/12/14",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/12/14",
  },
  {
    companyName: "广西******分包有限公司",
    auditDate: "2019/12/13",
  },
  {
    companyName: "广西******建设有限公司",
    auditDate: "2019/12/13",
  },
  {
    companyName: "广西******有限责任公司",
    auditDate: "2019/12/13",
  },
  {
    companyName: "广西******有限责任公司",
    auditDate: "2019/12/12",
  },
  {
    companyName: "广西******劳务有限公司",
    auditDate: "2019/12/12",
  },
  {
    companyName: "广西******集团有限公司",
    auditDate: "2019/12/12",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/12/11",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/12/11",
  },
  {
    companyName: "广西******劳务有限公司",
    auditDate: "2019/12/10",
  },
  {
    companyName: "南宁******分包有限公司",
    auditDate: "2019/12/10",
  },
  {
    companyName: "广西******投资有限公司",
    auditDate: "2019/12/10",
  },
  {
    companyName: "广西******科技有限公司",
    auditDate: "2019/12/10",
  },
  {
    companyName: "广西******集团有限公司",
    auditDate: "2019/12/9",
  },
  {
    companyName: "诚鑫******集团有限公司",
    auditDate: "2019/12/9",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/12/9",
  },
  {
    companyName: "隆林******开发有限公司",
    auditDate: "2019/12/9",
  },
  {
    companyName: "广西******劳务有限公司",
    auditDate: "2019/12/9",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/12/8",
  },
  {
    companyName: "广西******建设有限公司",
    auditDate: "2019/12/7",
  },
  {
    companyName: "广西******有限责任公司",
    auditDate: "2019/12/7",
  },
  {
    companyName: "广西******劳务有限公司",
    auditDate: "2019/12/7",
  },
  {
    companyName: "广西******设计有限公司",
    auditDate: "2019/12/6",
  },
  {
    companyName: "广西******铁塔有限公司",
    auditDate: "2019/12/5",
  },
  {
    companyName: "广西******有限责任公司",
    auditDate: "2019/12/5",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/12/4",
  },
  {
    companyName: "广西******劳务有限公司",
    auditDate: "2019/12/4",
  },
  {
    companyName: "广西******集团有限公司",
    auditDate: "2019/12/4",
  },
  {
    companyName: "广西******租赁有限公司",
    auditDate: "2019/12/4",
  },
  {
    companyName: "广西******服务有限公司",
    auditDate: "2019/12/4",
  },
  {
    companyName: "南宁******有限责任公司",
    auditDate: "2019/12/3",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/12/2",
  },
  {
    companyName: "广西******劳务有限公司",
    auditDate: "2019/12/2",
  },
  {
    companyName: "广西******集团有限公司",
    auditDate: "2019/12/2",
  },
  {
    companyName: "广西******建设有限公司",
    auditDate: "2019/12/1",
  },
  {
    companyName: "广西******有限责任公司",
    auditDate: "2019/12/1",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/11/30",
  },
  {
    companyName: "广西******集团有限公司",
    auditDate: "2019/11/30",
  },
  {
    companyName: "广西******集团有限公司",
    auditDate: "2019/11/29",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/11/29",
  },
  {
    companyName: "广西******集团有限公司",
    auditDate: "2019/11/29",
  },
  {
    companyName: "广西******建设有限公司",
    auditDate: "2019/11/27",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/11/27",
  },
  {
    companyName: "广西******劳务有限公司",
    auditDate: "2019/11/27",
  },
  {
    companyName: "广西******有限责任公司",
    auditDate: "2019/11/27",
  },
  {
    companyName: "广西******投资有限公司",
    auditDate: "2019/11/26",
  },
  {
    companyName: "广西******有限责任公司",
    auditDate: "2019/11/25",
  },
  {
    companyName: "广西******劳务有限公司",
    auditDate: "2019/11/25",
  },
  {
    companyName: "广西******有限责任公司",
    auditDate: "2019/11/23",
  },
  {
    companyName: "广西******劳务有限公司",
    auditDate: "2019/11/22",
  },
  {
    companyName: "广西******有限责任公司",
    auditDate: "2019/11/22",
  },
  {
    companyName: "广西******建设有限公司",
    auditDate: "2019/11/21",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/11/21",
  },
  {
    companyName: "广西******工程有限公司",
    auditDate: "2019/11/21",
  },
];
class Home extends Service {
  async indexCount() {
    const res = await this.ctx.curl(
      `${this.config.proxyHost}/financial/financialUserInfo/indexCount`,
      {
        dataType: "json",
      }
    );
    return this.ctx.helper.serviceFormat(res, "indexCount");
  }

  async getShibor() {
    const res = await this.ctx.curl(
      `${this.config.proxyHost}/financial/homePage/queryShibor`,
      {
        dataType: "json",
      }
    );
    return this.ctx.helper.serviceFormat(res, "shibor");
  }

  //获取导航，产品信息
  async getProductList() {
    const res = await this.ctx.curl(
      `${this.config.proxyHost}/financial/homePage/getHomeProductList`,
      {
        dataType: "json",
        method: "post",
      }
    );
    return this.ctx.helper.serviceFormat(res, "productList");
  }

  async getLPR() {
    const res = await this.ctx.curl(
      `${this.config.proxyHost}/financial/homePage/queryLPR`,
      {
        dataType: "json",
      }
    );
    return this.ctx.helper.serviceFormat(res, "LPR");
  }

  // 金融产品
  async recommend() {
    const res = await this.ctx.curl(
      `${this.config.proxyHost}/financial/product/recommend`,
      {
        dataType: "json",
      }
    );
    return this.ctx.helper.serviceFormat(res, "recommend");
  }

  // 获取banner数据
  async getBanner() {
    const res = await this.ctx.curl(
      `${this.config.proxyHost}/financial/product/getBanner`,
      {
        dataType: "json",
      }
    );
    return this.ctx.helper.serviceFormat(res, "bannerData");
  }

  // 获取统计数据
  async getStatistics() {
    const res = await this.ctx.curl(
      `${this.config.proxyHost}/financial/homePage/queryPlatformData`,
      {
        dataType: "json",
      }
    );
    return this.ctx.helper.serviceFormat(res, "statisticsData");
  }

  // 行业资讯
  async getNews() {
    const res = await this.ctx.curl(`${this.config.proxyHost}/financial/business/selectBusinessTopFive`, {
      dataType: 'json',
      method: 'post',
      data: { infoType: 2, number: 2 },
      contentType: 'json',
    });
    return this.ctx.helper.serviceFormat(res, 'newsData');
  }

  // 政策法规
  async getPolicies() {
    const res = await this.ctx.curl(`${this.config.proxyHost}/financial/business/selectBusinessTopFive`, {
      dataType: 'json',
      method: 'post',
      data: { infoType: 1, number: 8 },
      contentType: 'json',
    });
    return this.ctx.helper.serviceFormat(res, 'policiesData');
  }

  // 对接动态
  async getDockingData() {
    const res = await this.ctx.curl(`${this.config.proxyHost}/financial/homePage/queryDockingData`, {
      dataType: 'json',
      // contentType: 'json',
    });
    return this.ctx.helper.serviceFormat(res, 'dockingData');
  }

  // 融资案例
  async getFinancingCase() {
    const res = await this.ctx.curl(`${this.config.proxyHost}/financial/business/selectBusinessTopFive`, {
      dataType: 'json',
      method: 'post',
      data: { infoType: 4, number: 1 },
      contentType: 'json',
    });
    return this.ctx.helper.serviceFormat(res, 'financingCaseData');
  }

  // // 获取对接动态数据
  // async getTransaction() {
  //   const res = await this.ctx.curl(
  //     `${this.config.proxyHost}/financial/financialUserInfo/financingDocking`,
  //     {
  //       dataType: "json",
  //     }
  //   );
  //   const testRes = transactionData;
  //   testRes.map((item) => {
  //     if (item.companyName.length > 8) {
  //       item.companyName = item.companyName.replace(
  //         /^(.{2}).*(.{6})$/,
  //         "$1******$2"
  //       );
  //     } else {
  //       item.companyName = item.companyName.replace(/^(.{4}).*/, "$1******");
  //     }
  //     return item;
  //   });
  //   return { transactionData: dockingDynamicList };
  //   // return this.ctx.helper.serviceFormat(res, 'transactionData');
  // }

  // 获取金融机构
  async getFinancialOrgans() {
    const res = await this.ctx.curl(
      `${this.config.proxyHost}/financial/homePage/queryFinancialInstitutions`,
      {
        dataType: "json",
        contentType: "json",
        method: "post",
        data: {},
      }
    );
    return this.ctx.helper.serviceFormat(res, "financialOrgans");
  }
}

module.exports = Home;
