import React, { Component } from "react";
import Axios from "@src/helpers/http.js";
import Menu from "../menu";
import Popup from "../popup";
import Settled from "./settled";
import Cookie from 'js-cookie';
import "./index.scss";
import Alert from "@src/components/alert";

import queryString from "query-string";

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {},
      isLogged: undefined,
      searchKey: "",
      settledPlatformModalOption: {
        canClickClose: false,
        title: "我要入驻",
        showCloseBtn: false,
        size: "middle",
      },
      // tabIndex: this.props.headerData.tabIndex ? this.props.headerData.tabIndex : 0
      tabIndex: this.props.headerData.tabIndex,
    };
    this.tab = [
      {
        name: "企业查询",
      },
      {
        name: "金融产品",
      },

    ];
    this.menu = [
      {
        name: "联合征信",
        path: "/credit ",
      },
      {
        name: "金融产品",
        path: "/products",
      },
      {
        name: "金融机构",
        path: "/finance",
      },
      {
        name: "政策法规",
        path: "/info?type=1",
      },
      {
        name: "资讯公告",
        path: "/info?type=2",
      },
      {
        name: "融资案例",
        path: "/info?type=4",
      },
      {
        name: "帮助中心",
        path: "/help",
      },
    ];
  }

  componentDidMount() {
    let query = queryString.parse(location.search);
    if (this.state.tabIndex == 1) {
      if (query.searchKey) {
        this.setState({ searchKey: query.searchKey });
      }
    } else if (this.state.tabIndex == 0) {
      if (query.keyword) {
        this.setState({ searchKey: query.keyword });
      }
    }
    const isSmallScreen =
      document.documentElement.clientHeight < 900 ||
      document.body.clientHeight < 900;
    this.setState({
      settledPlatformModalOption: Object.assign(
        {},
        this.state.settledPlatformModalOption,
        { smallScreen: isSmallScreen }
      ),
    });
    Axios.post("/financial/sysUser/checkLogin").then((d) => {
      if (d.data) {
        this.setState({
          isLogged: true,
          userInfo: d.data || {},
        });
      } else {
        localStorage.removeItem("userInfo");
        this.setState({
          isLogged: false,
        });
      }
    });
  }

  logout() {
    localStorage.removeItem("userInfo");
    location.href = "/";
  }

  onUserClick() {
    const { userInfo } = this.state;
    if (userInfo.type == 0) {
      location.href = "/admin/#/platform/company";
    } else if (userInfo.type == 1) {
      location.href = "/admin/#/government/index";
    } else if (userInfo.type == 2) {
      location.href = "/admin/#/business/index";
    } else if (userInfo.type == 3) {
      location.href = "/admin/#/financial/index";
    }
  }

  goFinance() {
    const { isLogged, userInfo } = this.state;
    if (!isLogged) {
      // 未登录
      location.href = "/admin/#/login?finance=true";
    } else {
      // 已登录
      Axios.post(
        "/financial/enterprise/account/basic/info",
        { key: userInfo.phone },
        {
          headers: {
            loginUserId: userInfo.id,
          },
        }
      ).then((d) => {
        if (d.data && d.data.attestationState === 1) {
          // 已认证
          location.href =
            "/admin/#/business/releaseRequirement?type=1&cdn=needManage";
        } else {
          // 未认证
          Cookie.set("toastMsg", "您的企业账户未认证，请认证后再重试");
          location.href = "/admin/#/business/index";
        }
      });
    }
  }

  openSettledPlatformModal() {
    this.refs.popupEl.setDisplay(true);
  }

  closeSettledPlatformModal() {
    this.refs.popupEl.setDisplay(false);
  }

  onKeywordChange(e) {
    this.setState({
      searchKey: e.target.value,
    });
  }

  onEnterPress(e) {
    if (e.keyCode === 13) {
      this.onSearchBtnClick();
    }
  }

  onSearchBtnClick() {
    const { tabIndex } = this.state;
    let keyWord = this.refs.searchKey.value
      .replace(/^(\s*)|(\s*$)/g, "")
      .replace(/%/g, "%25");
    if (tabIndex == 1) {
      location.href = `/products?searchKey=${this.refs.searchKey.value}`;
    } else if (tabIndex == 0) {
      if (keyWord) {
        location.href = `/credit/creditList?keyword=${encodeURIComponent(
          keyWord
        )}`;
      } else {
        Alert.warn({ msg: "请输入企业名称" });
      }
    }
  }

  onTabClick(i) {
    this.setState({ tabIndex: i });
  }

  render() {
    const { headerData, showMenu, menuData, ref, className } = this.props;
    const {
      isLogged,
      settledPlatformModalOption,
      searchKey,
      tabIndex,
      userInfo,
    } = this.state;
    let navLis = this.menu.map((v, i) => {
      return (
        <li key={i} styleName={headerData.menuIndex == i && "active"}>
          <a href={v.path}>{v.name}</a>
        </li>
      );
    });

    return (
      <div styleName="header-wrap" ref={ref} className={className}>
        {isLogged === false ? (
          <Popup ref="popupEl" option={settledPlatformModalOption}>
            <Settled
              phone={headerData.contactInfo.contactPhoneOne}
              callback={this.closeSettledPlatformModal.bind(this)}
            />
          </Popup>
        ) : null}
        <div styleName="header-top">
          <div styleName="in-header-top">
            <div styleName="left">
              <i></i>
              <p>为保证更好的使用体验，推荐使用Chrome或Firefox浏览器</p>
            </div>
            <div styleName="right">
              <span>
                客服电话:{" "}
                {headerData.contactInfo &&
                  headerData.contactInfo.contactPhoneOne}
              </span>
              {isLogged ? (
                <div styleName="user">
                  <a onClick={this.onUserClick.bind(this)}>
                    {userInfo.userName}
                  </a>
                  <span>|</span>
                  <a onClick={this.logout.bind(this)}>退出</a>
                </div>
              ) : (
                  <div styleName="user">
                    <a href="/admin/#/login">登录</a>
                    <span>|</span>
                    <a href="/admin/#/login?type=2">注册</a>
                  </div>
                )}
            </div>
          </div>
        </div>
        <div styleName="header-content">
          <a styleName="logo" href="/">
            <img src={require(`@src/assets/img/header/logo2.png`)} />
          </a>
          <div styleName="search-box">
            <div styleName="tab-wrap">
              {this.tab.map((item, index) => (
                <a
                  key={index}
                  styleName={index === tabIndex ? "active" : ""}
                  onClick={this.onTabClick.bind(this, index)}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div styleName="search-wrap">
              <div styleName="search">
                <i></i>
                <input
                  ref="searchKey"
                  type="text"
                  placeholder={
                    tabIndex === 0
                      ? "请输入注册地在广西壮族自治区范围内的企业，如“联合征信”"
                      : "请输入产品名称或机构名称关键词搜索"
                  }
                  defaultValue={searchKey}
                  onKeyUp={this.onEnterPress.bind(this)}
                />
              </div>
              <button onClick={this.onSearchBtnClick.bind(this)}>搜索</button>
            </div>
          </div>
          {isLogged === true ? (
            userInfo.type === 2 ? (
              <div styleName="other">
                <div>
                  <a
                    styleName="finance-btn"
                    onClick={this.goFinance.bind(this)}
                  ></a>
                  <span>企业用户</span>
                </div>
              </div>
            ) : null
          ) : isLogged === false ? (
            <div styleName="other">
              <div>
                <a
                  styleName="finance-btn"
                  onClick={this.goFinance.bind(this)}
                ></a>
                <span>企业用户</span>
              </div>
              <div>
                <a
                  styleName="enter-btn"
                  onClick={this.openSettledPlatformModal.bind(this)}
                ></a>
                <span>金融机构</span>
              </div>
            </div>
          ) : null}
        </div>
        <div styleName="header-nav">
          <Menu showMenu={showMenu} menuData={menuData} />
          <ul styleName="nav-list">{navLis}</ul>
        </div>
      </div>
    );
  }
}