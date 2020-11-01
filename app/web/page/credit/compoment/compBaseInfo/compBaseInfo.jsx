import React, { Component } from "react";
// import Axios from 'axios';
import Axios from "@src/helpers/http.js";
import qs from 'query-string';
import "./compBaseInfo.scss";
import TagsInfo from "./tagsInfo/tagsInfo";
import classnames from "classnames";
import special from "@src/assets/img/credit_search/trophy_special.png";
import no1 from "@src/assets/img/credit_search/trophy_no1.png";
import stamp0 from "@src/assets/img/credit_search/stamp0.png";
import stamp1 from "@src/assets/img/credit_search/stamp1.png";
import stamp2 from "@src/assets/img/credit_search/stamp2.png";

export default class CompBaseInfo extends Component {
  static defaultProps = {
    data: {
      gxtCompBaseInfoBean: {
        regStatus: null,
        businessScope: ""
      }
    },
    tags: null,
    gjtComp: false
  };
  state = {
    baseInfo_local: {},
    userInfo_local: {},
  };
  stampArr = [stamp2, stamp0, stamp1];
  constructor(props) {
    super(props);
    if (!EASY_ENV_IS_NODE && localStorage) {
      this.state.baseInfo_local = JSON.parse(localStorage.getItem('search_target')) || {};
      this.state.userInfo_local = JSON.parse(localStorage.getItem('userInfo')) || {};
    }
  }

  async download() {
    const { userInfo_local } = this.state;
    const { compName, compUscc, keyword } = qs.parse(location.search);
    const loginuserid = String(userInfo_local.id);
    //登录是否超时
    const res = await Axios.post("/user/isLogin", {
      loginuserid: loginuserid,
    });
    if (res.code === 200) {
      window.open(`/financial/company/report/downloadNew?compName=${encodeURIComponent(compName)}&compUscc=${compUscc}&type=2`);
    } else {
      localStorage.removeItem("userInfo");
      window.location.href = `/admin/#/login?url=/credit/detail?keyword=${encodeURIComponent(keyword)}&compUscc=${compUscc}&compName=${encodeURIComponent(compName)}`;
    }

  }

  render() {
    const { gxtCompBaseInfoBean } = this.props.data;
    const { comprehensiveStrategyRpVO = {}, flag } = this.props;
    const { baseInfo_local, userInfo_local } = this.state;
    const { tags, gjtComp } = this.props;
    const { regStatus, name, creditCode } = baseInfo_local;
    const { id, type } = userInfo_local;
    let strategySuggestion = null;
    if (comprehensiveStrategyRpVO && comprehensiveStrategyRpVO.comprehensiveCreditDTO) {
      strategySuggestion = comprehensiveStrategyRpVO.comprehensiveCreditDTO.strategySuggestion;
    }
    let _tags = [];
    if (tags) {
      let _tags_1 = [];
      let _tags_2 = [];
      let _tags_3 = [];
      tags.forEach((v) => {
        if (v.compTag !== gxtCompBaseInfoBean.regStatus) {
          v.attribute === "中性" && _tags_1.push(v);
          v.attribute === "负面" && _tags_2.push(v);
          v.attribute === "正面" && _tags_3.push(v);
        }
      });
      _tags = [].concat(_tags_1, _tags_2, _tags_3);
    }
    return (
      <>
        <div styleName="container">
          <div styleName="intro">
            <div styleName="brief">
              <div styleName="left">
                <img
                  src={require("@src/assets/img/credit_search/default_company_logo.png")}
                />
              </div>
              <div styleName="right">
                <div styleName="title-wrapper">
                  <h2>{baseInfo_local.name}</h2>
                  <div styleName="tag-wrapper">
                    {regStatus && <div
                      styleName={classnames("tag", {
                        positive:
                          regStatus === "存续" ||
                          regStatus === "在业" ||
                          regStatus === "开业",
                        negative:
                          regStatus === "注销" ||
                          regStatus === "吊销，未注销" ||
                          regStatus === "吊销，已注销" ||
                          regStatus === "吊销",
                        neutral: regStatus === "迁出" || regStatus === "仍注册",
                      })}
                    >
                      {regStatus}
                    </div>}
                  </div>
                </div>
                <div styleName="label-wrapper">
                  {tags && <TagsInfo tags={_tags} />}
                </div>
              </div>
            </div>
            <div styleName="details">
              <div styleName="line">
                <div styleName="item">
                  <span styleName="label">电话：</span>
                  <span styleName="value">
                    {baseInfo_local.phoneNumber || "暂无"}
                  </span>
                </div>
                <div styleName="item">
                  <span styleName="label">官网：</span>
                  {baseInfo_local.websitelist ? (
                    <a
                      href={`http://${gxtCompBaseInfoBean.websitelist}`}
                      target="_blank"
                    >
                      {baseInfo_local.websitelist}
                    </a>
                  ) : (
                      <span styleName="value">{"暂无"}</span>
                    )}
                </div>
              </div>
              <div styleName="line">
                <div styleName="item">
                  <span styleName="label">邮箱：</span>
                  <span styleName="value">
                    {baseInfo_local.email || "暂无"}
                  </span>
                </div>
                <div styleName="item">
                  <span styleName="label">地址：</span>
                  <span styleName="value">
                    {baseInfo_local.regLocation || "暂无"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {gjtComp && strategySuggestion !== null && <div styleName="result">
            <img src={this.stampArr[strategySuggestion]} />
          </div>}
          {(type === 0 || type === 1) && flag && <a onClick={this.download.bind(this)} styleName="download">下载报告</a>}
          {/* {(type === 0 || type === 1) && flag && <a href={`/financial/company/report/downloadNew?compName=${decodeURIComponent(name)}&compUscc=${creditCode}&type=2`} styleName="download" >下载报告</a>} */}
          {/* {gxtCompBaseInfoBean && gxtCompBaseInfoBean.businessScope.indexOf("建筑工程施工总承包特级") !==
            -1 && (
              <div styleName="level">
                <img src={special} />
                <h3>总承包特级</h3>
              </div>
            )}
          {(gxtCompBaseInfoBean && gxtCompBaseInfoBean.businessScope.indexOf(
            "建筑工程施工总承包壹级"
          ) !== -1 ||
            gxtCompBaseInfoBean && gxtCompBaseInfoBean.businessScope.indexOf(
              "建筑工程施工总承包一级"
            ) !== -1) && (
              <div styleName="level">
                <img src={no1} />
                <h3>总承包壹级</h3>
              </div>
            )} */}
        </div>
      </>
    );
  }
}

