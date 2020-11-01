import React, { Component } from "react";
import Layout from "@src/components/layout";
import Tabs from '@src/components/tabs';
import Statistics from "./components/statistics";
import Banner from "./components/banner";
import Products from "./components/products";
import InfoScroll from "./components/infoScroll";
import Organs from "./components/organs";
import FinancingCase from "./components/financingCase";
import ServerRanking from "./components/serverRanking";
// import InfoItem from "./components/infoItem";
import Companys from "./components/companys";
import News from "./components/news";
import Policies from "./components/policies";
import JointTrend from "./components/jointTrend";
import Shibor from "./components/shibor";
import MChart from "./components/chart";
import "./styles/index.scss";

class HomeIndex extends Component {
  state = {};
  componentDidMount() { }
  render() {
    const {
      title,
      getContactInfo = {},
      bannerData = [],
      statisticsData = {},
      newsData = [],
      policiesData = [],
      financingCaseData = [],
      dockingData = [],
      shibor = {},
      LPR = [],
      productList,
      financialOrgans = [],
    } = this.props;
    // console.log(productList)
    const headerData = {
      // menuIndex: 0,
      tabIndex: 0,
      contactInfo: getContactInfo,
    };
    const { Tab, TabItem } = Tabs;
    return (
      <Layout
        footerData={getContactInfo}
        headerData={headerData}
        title={title}
        showMenu={true}
        menuData={productList}
      >
        <div styleName="container-1">
          <Banner data={bannerData}></Banner>
          <div styleName="tab-container">
            <Tab sutoSwiper={true}>
              <TabItem>
                <MChart data={LPR}></MChart>
              </TabItem>
              <TabItem>
                <Shibor data={shibor}></Shibor>
              </TabItem>
            </Tab>
          </div>
        </div>
        <div styleName="container-2">
          <Statistics statisticsData={statisticsData} />
        </div>
        <div styleName="container-3">
          {typeof productList === 'object' && Object.keys(productList) && <Products productData={productList}></Products>}
        </div>
        <div styleName="container-4">
          <Organs data={financialOrgans}></Organs>
        </div>
        <div styleName="container-5">
          <img src={require("@src/assets/img/organ/banner2.jpg")} />
        </div>
        <div styleName="container-6">
          <div styleName="news">
            <News data={newsData} />
          </div>
          <div styleName="policies">
            <Policies data={policiesData} />
          </div>
        </div>
        <div styleName="container-7">
          <div styleName="server-ranking">
            <ServerRanking data={financialOrgans} />
          </div>
          <div styleName="joint-trend">
            <JointTrend data={dockingData} />
          </div>
          <div styleName="financing-case">
            <FinancingCase data={financingCaseData} />
          </div>
        </div>
        <div styleName="container-8">
          <Companys />
        </div>
      </Layout>
    );
  }
}

export default HomeIndex;
