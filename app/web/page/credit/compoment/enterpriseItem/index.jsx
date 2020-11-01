import React, { Component } from "react";
import Cookie from 'js-cookie';
import Axios from "axios";
import "./index.scss";
const type = {};
type["存续"] = "type1";
type["在业"] = "type2";
type["开业"] = "type3";
type["迁出"] = "type4";
type["仍注册"] = "type5";
type["吊销"] = "type6";
type["吊销未注销"] = "type7";
type["吊销已注销"] = "type8";
type["注销"] = "type9";
class EnterpriseUtem extends Component {
  state = {};
  logo = null;
  constructor() {
    super();
    this.logo = React.createRef();
  }
  async detail(data) {
    console.log(data);
    localStorage.setItem('search_target', JSON.stringify(data));
    const { keyword } = this.props;
    let sesstion = JSON.parse(localStorage.getItem("userInfo"));
    if (!sesstion || !sesstion.id) {
      //未登录
      window.location.href = `/admin/#/login?url=/credit/detail?` +
        `keyword=${encodeURIComponent(keyword)}&compUscc=${data.creditCode}&compName=${encodeURIComponent(data.name)}`;
      return false;
    }
    const loginuserid = String(sesstion.id);
    //登录是否超时
    const res = await Axios.post("/user/isLogin", {
      loginuserid: loginuserid,
    });
    if (res.code === 200) {
      window.location.href = `/credit/detail?` + `keyword=${encodeURIComponent(keyword)}&compUscc=${data.creditCode}&compName=${encodeURIComponent(data.name)}`;
    } else {
      localStorage.removeItem("userInfo");
      window.location.href =
        "/admin/#/login?url=/credit/detail?" +
        `keyword=${encodeURIComponent(keyword)}&compUscc=${data.creditCode}&compName=${encodeURIComponent(data.name)}`;
    }
  }
  // imgLoadErr(e) {
  //   e.persist();
  //   e.target.src = require("@src/assets/img/credit_search/default_company_logo.png");
  //   e.target.onerror = null;
  // }
  componentDidMount() {
    const { data } = this.props;
    // this.logo.current.src = data.logo;
  }
  render() {
    const { data } = this.props;
    return (
      <div styleName="container" onClick={this.detail.bind(this, data)}>
        <div styleName="left">
          <img
            src={require("@src/assets/img/credit_search/default_company_logo.png")}
            ref={this.logo}
            width="80"
          // onLoad={this.imgLoadErr.bind(this)}
          // onError={this.imgLoadErr.bind(this)}
          />
        </div>
        <div styleName="middle">
          <p styleName="one">
            <span
              dangerouslySetInnerHTML={{ __html: data.highLightEntName || "" }}
            ></span>
            <span
              styleName={`flg ${
                data.regStatus &&
                (type[data.regStatus.replace(/,|，/g, "")] || "")
                }`}
            >
              {data.regStatus.replace(/,|，/g, "  ")}
            </span>
          </p>
          <p styleName="two">
            <span>
              <span styleName="label">法定代表人：</span>{" "}
              {data.legalPersonName || "-"}
            </span>
            <span>
              <span styleName="label">电话：</span>
              {data.phoneNumber || "-"}
            </span>
            <span>
              <span styleName="label">注册资本：</span>
              {data.regCapital || "-"}
            </span>
            <span>
              <span styleName="label">邮箱：</span>
              {data.email || "-"}
            </span>
            <span>
              <span styleName="label">成立时间：</span>
              {data.estiblishTime || "-"}
            </span>
          </p>
          <p styleName="three">
            <span>
              <span styleName="label">统一社会信用代码：</span>
              {data.creditCode || "-"}
            </span>
            <span>
              <span styleName="label">注册地址：</span>
              {data.regLocation || "-"}
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default EnterpriseUtem;
