import React, { Component } from "react";
import Layout from "@src/components/layout/index";
import EnterpriseUtem from "./compoment/enterpriseItem";
import BreadCrumps from "@src/components/breadCrumps";
import PageNavgation from "@src/components/pageNavgation";
import Axios from "axios";
import queryString from "query-string";
import "./styles/creditList.scss";
const hrefs = [
  {
    href: "/credit",
    name: "联合征信",
  },
  {
    href: "#",
    name: "搜索结果",
  },
];
export default class CreditList extends Component {
  state = {
    currentPage: 1,
    stateCreditList: {
      totalRecords: 0
    },
    pageState: null //页面状态（0：数据加载，1：没有数据，2：数据加载错误）
  };
  pagestateArr = [
    { img: require("@src/assets/img/credit_search/icon_data_upload.png"), msg: "数据获取中..." },
    { img: require("@src/assets/img/credit_search/nosearch.png"), msg: "抱歉，没有搜索到相关结果" },
    { img: require("@src/assets/img/credit_search/icon_data_error.png"), msg: "数据获取失败" }
  ]; //对应不通页面状态显示的图片
  async componentDidMount() {
    const query = queryString.parseUrl(window.location.href);
    this.setState({ pageState: 0 });
    const res = await this.getData(query.query.keyword, 1);
    this.setState((state) => {
      let resObj = {
        currentPage: 1,
        stateCreditList: res.data,
        pageState: null
      };
      res.data === null && (resObj = Object.assign({}, resObj, { pageState: 2 }));
      res.data && !res.data.list.length && (resObj = Object.assign({}, resObj, { pageState: 1 }));
      return resObj;
    });
  }
  async getData(key, i) {
    const res = await Axios.post("/financial/homePage/searchCompanyList", {
      compName: decodeURIComponent(key),
      pageSize: 10,
      pageNo: i,
    });
    return res;
  }
  async pageChange(obj) {
    const query = queryString.parseUrl(window.location.href);
    const res = await this.getData(query.query.keyword, obj.value);
    this.setState((state) => {
      let resObj = {
        currentPage: obj.value,
        stateCreditList: res.data,
        pageState: null
      };
      res.data === null && (resObj = Object.assign({}, resObj, { pageState: 2 }));
      res.data && !res.data.list.length && (resObj = Object.assign({}, resObj, { pageState: 1 }));
      return resObj;
    });
  }
  render() {
    const { getContactInfo, title, productList } = this.props;
    const { stateCreditList, currentPage, pageState } = this.state;
    const headerData = {
      isHome: false,
      menuIndex: 0,
      tabIndex: 0,
      searchKey: title,
      contactInfo: getContactInfo,
    };
    return (
      <Layout
        footerData={getContactInfo}
        headerData={headerData}
        title={title}
        menuData={productList}
      >
        <div
          styleName="container"
          style={{
            backgroundImage: `url(${require("@src/assets/img/credit_search/searchbg.png")})`,
          }}
        >
          <BreadCrumps hrefs={hrefs} />
          <div styleName="content">
            <p styleName="search-num">
              共找到<span styleName="font">
                {stateCreditList && stateCreditList.totalRecords ? stateCreditList.totalRecords : 0}</span>
              家相关公司
            </p>
            {stateCreditList && stateCreditList.list && stateCreditList.list.length > 0 && (
              <>
                {stateCreditList.list.map((v, i) => {
                  return <EnterpriseUtem key={i} data={v} keyword={title} />;
                })}
                <div styleName="bottom">
                  <div styleName="page">
                    <PageNavgation
                      currentPage={currentPage}
                      pageSize={10}
                      totalRecord={stateCreditList.totalRecords}
                      canJump={false}
                      canSetPageSize={false}
                      callback={this.pageChange.bind(this)}
                    />
                  </div>
                </div>
              </>
            )}
            {pageState !== null &&
              <>
                <div styleName="no-search">
                  <img
                    src={this.pagestateArr[pageState].img}
                    width="150"
                    alt=""
                  />
                  <p>{this.pagestateArr[pageState].msg}</p>
                </div>
              </>
            }
          </div>
        </div>
      </Layout>
    );
  }
}
