import React, { Component } from "react";
import Layout from "@src/components/layout/index";
import Alert from "@src/components/alert";
import "./styles/index.scss";

export default class Credit extends Component {
  state = { keyWord: "" };
  searchSubmit() {
    let keyWord = this.state.keyWord;
    keyWord = keyWord.replace(/^(\s*)|(\s*$)/g, "").replace(/%/g, "%25");
    if (!keyWord) {
      Alert.warn({ msg: "请输入企业名称" });
      return;
    }
    window.location.href = `/credit/creditList?keyword=${encodeURIComponent(
      keyWord
    )}`;
  }
  keyWord = "";
  inputChange(e) {
    e.persist();
    this.setState({
      keyWord: e.target.value,
    });
  }
  onEnterPress(e) {
    if (e.keyCode === 13) {
      this.searchSubmit();
    }
  }
  render() {
    const { keyWord } = this.state;
    const { getContactInfo, title, productList, reportData } = this.props;
    const headerData = {
      isHome: false,
      menuIndex: 0,
      tabIndex: 0,
      contactInfo: getContactInfo,
    };
    return (
      <Layout
        footerData={getContactInfo}
        headerData={headerData}
        title={title}
        menuData={productList}
      >
        <div styleName="search-Wrapper">
          <div styleName="content">
            <div styleName="sentence1">科技金融 企业征信查询平台</div>
            <div styleName="separator">
              <img
                src={require("../../assets/img/credit_search/separator.png")}
              />
            </div>
            <div styleName="sentence2">
              为金融机构提供场景+数据+获客+风控 一站式解决方案
            </div>
            <div styleName="search-bar-Wrapper">
              <div styleName="search-icon" />
              <input
                styleName="input"
                onChange={this.inputChange.bind(this)}
                placeholder='请输入注册地在广西壮族自治区范围内的企业, 如 "联合征信"'
                value={keyWord}
                onKeyUp={this.onEnterPress.bind(this)}
              />
              <input
                type="button"
                styleName="button"
                value="搜索"
                onClick={this.searchSubmit.bind(this)}
              />
              {/* 搜索 */}
              {/* </input> */}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
