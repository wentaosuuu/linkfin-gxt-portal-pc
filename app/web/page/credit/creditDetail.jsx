import React, { Component, PureComponent } from "react";
import Layout from "@src/components/layout/index";
import Tabs from "@src/components/tabs";
import BaseInfo from "./compoment/baseInfo";
import DeepReport from "./compoment/deepReport";
import JudicialRisk from "./compoment/judicialRisk";
import ManagementInfo from "./compoment/managementInfo";
import ManagementRisk from "./compoment/managementRisk";
import PropertyRight from "./compoment/propertyRight";
import RiskOutline from "./compoment/riskOutline";
import EnterpriseMap from "./compoment/enterpriseMap";
import ComprehensiveStrategy from "./compoment/comprehensiveStrategy";
import CompBaseInfo from "./compoment/compBaseInfo/compBaseInfo";
import BreadCrumps from "@src/components/breadCrumps";
import Axios from "@src/helpers/http.js";
import "./styles/creditDetail.scss";
const { Tab, TabItem } = Tabs;

class CreditDetail extends PureComponent {
  state = {
    hrefs: [
      {
        href: "/credit",
        name: "联合征信",
      },
      {
        href: `/credit/creditList?keyword=${encodeURIComponent(
          this.props.title
        )}`,
        name: "搜索结果",
      },
      {
        href: "#",
        name: "企业信用报告",
      },
    ],
    swiperIndex: 0,
    depthReport: { data: null, msg: "数据请求中..." },
    pageState: null, //页面状态（0：数据加载，1：数据加载错误）
    flag: false, // 报告请求是否完成
  };

  constructor(props) {
    super(props);
    if (!EASY_ENV_IS_NODE && localStorage) {
      this.search_target = JSON.parse(localStorage.getItem('search_target')) || null;
      this.loginInfo = JSON.parse(localStorage.getItem('userInfo')) || null;
      this.compHumanRiskBean = 0; // 企业主风险
      this.compRiskBean = 0; // 企业风险
      this.timer = null;
    }
  }

  regLogin(rej) {
    if (!this.loginInfo || !this.loginInfo.id) {
      rej({
        code: "300004",
        msg: "请登录后查看"
      });
      return false;
    }
    let { compUscc, compName, keyword } = this.props.query;
    if (!this.search_target) {
      window.location.href = keyword ? `/credit/creditList?keyword=${encodeURIComponent(keyword)}` : "/credit";
      return false;
    }
    let { name, creditCode } = this.search_target;
    //验证url中穿过来的参数和本地参数是否一致不一致跳转到搜索结果页
    if (compUscc != creditCode) {
      window.location.href = `/credit/creditList?keyword=${encodeURIComponent(keyword)}`;
    }
  }
  getData() {
    return new Promise((res, rej) => {
      this.regLogin(rej);
      let parmas = {
        compName: this.search_target.name,
        compUscc: this.search_target.creditCode,
      };
      let url = `/financial/company/report/viewFrontCreditReport`;
      Axios.post(url, parmas, {
        timeout: 60000
      }).then(d => {
        if (d.code == '200') {
          res(d.data.depthReport);
        } else {
          rej({
            code: d.code,
            msg: d.message
          });
        }
      });
    });
  }

  componentDidMount() {
    this.setState({
      pageState: 0
    });
    this.getData().then(res => {
      this.compChangeInfoBeanList = res.compBaseInfoBean.compChangeInfoRpDTOList || [];
      res.riskProfileGxtRpVO.compHumanRiskFirst && res.riskProfileGxtRpVO.compHumanRiskFirst.forEach((item) => {
        this.compHumanRiskBean += +item.riskCount;
      });
      res.riskProfileGxtRpVO.compRiskFirst && res.riskProfileGxtRpVO.compRiskFirst.forEach((item) => {
        this.compRiskBean += +item.riskCount;
      });
      this.initSwiper();
      this.setState((state) => {
        return {
          depthReport: { data: res, msg: "" },
          flag: true,
          pageState: null
        };
      }, () => {
        console.log(this.state);
      });
    }).catch(err => {
      this.setState({
        depthReport: { data: null, msg: err.msg },
        pageState: 1
      });
      let { compUscc, compName, keyword } = this.props.query;
      //未登录
      if (err.code == '300004') {
        localStorage.removeItem("userInfo");
        window.location = `/admin/#/login?url=/credit/detail?` +
          `keyword=${encodeURIComponent(keyword)}&compUscc=${compUscc}&compName=${encodeURIComponent(compName)}`;
      }
    });
  }

  initSwiper() {
    this.timer = setInterval(() => {
      this.setState((state) => {
        let index = state.swiperIndex;
        return {
          swiperIndex:
            index + 1 === this.compChangeInfoBeanList.length ? 0 : ++index,
        };
      });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { getContactInfo, title, productList } = this.props;
    const { swiperIndex, depthReport, hrefs, flag, pageState } = this.state;
    const headerData = {
      isHome: false,
      menuIndex: 0,
      searchKey: title,
      tabIndex: 0,
      contactInfo: getContactInfo,
    };
    if (!depthReport.data) {
      return (
        <Layout
          footerData={getContactInfo}
          headerData={headerData}
          title={title}
          menuData={productList}
        >
          <div styleName="credit-detail-wrap">
            <BreadCrumps hrefs={hrefs} />
            {/* <CompBaseInfo /> */}
            <div
              styleName="no-data"
              style={{
                backgroundImage: `url(${require("@src/assets/img/credit_search/searchbg.png")})`,
              }}
            >
              <img
                src={pageState === 1 ? require("@src/assets/img/credit_search/icon_data_error.png") : require("@src/assets/img/credit_search/icon_data_upload.png")}
                width="150"
                alt=""
              />
              <p>{depthReport.msg}</p>
            </div>
          </div>
        </Layout>
      );
    }
    const { data } = depthReport;
    const {
      comprehensiveStrategyRpVO = {}, // 综合策略
      compBaseInfoBean = {}, // 基本信息
      compBusiInfoGxtRpVO = {}, // 企业经营信息
      compBusiRiskInfoGxtRpVO = {}, // 企业经营风险
      compRelationshipAndAtlasGxtRpVO = {}, // 企业图谱和股权结构
      compTagInfoRpDTOList = [], // 标签列表
      industryDepthInfoBean = {}, // 行业深度信息
      intellecPropetyGxtRpVO = {}, // 知识产权
      judicialInfoGxtRpVO = {}, // 司法风险
      riskProfileGxtRpVO = {}, // 风险概要
      reportTimeStamp, // 报告生成时间
      gjtComp = false, // 是否桂建通企业
    } = data;
    let tabs = [
      "基本信息",
      "司法风险",
      "经营风险",
      "经营信息",
      "知识产权",
      "企业图谱",
      "风险概要",
    ];
    if (gjtComp) {
      tabs.push(() => {
        return (
          <span style={{ position: "relative", color: "#e12936" }}>
            行业深度信息
            <img
              style={{
                position: "absolute",
                top: "-15px",
                left: "calc(100% - 20px)",
              }}
              width="40px"
              src={require("@src/assets/img/credit_search/vip.png")}
              alt=""
            />
          </span>
        );
      });
      tabs.unshift('综合策略');
    }
    return (
      <Layout
        footerData={getContactInfo}
        headerData={headerData}
        title={title}
        menuData={productList}
      >
        <div styleName="credit-detail-wrap">
          <BreadCrumps hrefs={this.state.hrefs} />
          <CompBaseInfo
            flag={flag}
            data={compBaseInfoBean}
            tags={compTagInfoRpDTOList}
            comprehensiveStrategyRpVO={comprehensiveStrategyRpVO}
            gjtComp={gjtComp}
          />
          <div styleName="con">
            <div styleName="con-item">
              <img
                src={require("@src/assets/img/credit_search/enterprise_risk.png")}
              />
              <span styleName="tip">
                企业主风险{" "}
                <span styleName="color-FF3B31">{this.compHumanRiskBean}</span>{" "}
                条
              </span>
              <span styleName="tip">
                企业风险{" "}
                <span styleName="color-FF3B31">{this.compRiskBean}</span> 条
              </span>
            </div>
            <div styleName="con-item">
              <img
                src={require("@src/assets/img/credit_search/enterprise_info.png")}
              />
              <ul
                styleName="ul"
                style={{ marginTop: `${swiperIndex * -40}px` }}
              >
                {this.compChangeInfoBeanList.map((v, i) => {
                  return (
                    <li styleName="list" key={i}>
                      <span styleName="tip">{v.changeTime}</span>
                      <span styleName="tip color-2C97DE">
                        {v.changeItem.substr(0, 15)}
                        {v.changeItem.length > 15 && <>...</>}
                      </span>
                    </li>
                  );
                })}
                <li></li>
              </ul>
            </div>
          </div>
          <Tab
            tabs={tabs}
            width={"auto"}
            headerStyle={{
              padding: "0px 30px 0 20px",
              justifyContent: "space-between",
              height: "50px",
              fontSize: "16px",
            }}
            bodyStyle={{
              padding: 0,
            }}
          >
            {gjtComp && (
              <TabItem>
                <ComprehensiveStrategy
                  comprehensiveStrategyRpVO={comprehensiveStrategyRpVO}
                  time={reportTimeStamp}
                ></ComprehensiveStrategy>
              </TabItem>
            )}
            <TabItem >
              <BaseInfo
                compBaseInfoBean={compBaseInfoBean}
                time={reportTimeStamp}
              ></BaseInfo>
            </TabItem>
            <TabItem>
              <JudicialRisk
                judicialInfoGxtRpVO={judicialInfoGxtRpVO}
                time={reportTimeStamp}
              ></JudicialRisk>
            </TabItem>
            <TabItem>
              <ManagementRisk
                compBusiRiskInfoGxtRpVO={compBusiRiskInfoGxtRpVO}
                time={reportTimeStamp}
              ></ManagementRisk>
            </TabItem>
            <TabItem>
              <ManagementInfo
                compBusiInfoGxtRpVO={compBusiInfoGxtRpVO}
                time={reportTimeStamp}
              ></ManagementInfo>
            </TabItem>
            <TabItem>
              <PropertyRight
                intellecPropetyGxtRpVO={intellecPropetyGxtRpVO}
                time={reportTimeStamp}
              ></PropertyRight>
            </TabItem>
            <TabItem>
              <EnterpriseMap
                relations={compRelationshipAndAtlasGxtRpVO}
                companyName={compBaseInfoBean.gxtCompBaseInfoBean.name}
              ></EnterpriseMap>
            </TabItem>
            <TabItem>
              <RiskOutline
                riskProfileGxtRpVO={riskProfileGxtRpVO}
                time={reportTimeStamp}
              ></RiskOutline>
            </TabItem>
            {gjtComp && (
              <TabItem>
                <DeepReport
                  industryDepthInfoBean={industryDepthInfoBean}
                  time={reportTimeStamp}
                ></DeepReport>
              </TabItem>
            )}
          </Tab>
        </div>
      </Layout >
    );
  }
}

export default CreditDetail;
