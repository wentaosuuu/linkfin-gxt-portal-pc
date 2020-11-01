import React, { Component } from "react";
import "./index.scss";

class SpecialAreaCom extends Component {
  static defaultProps = {
    title: "专区名称",
    nav: true,
    sliderImg: null,
    onNavClick: null,
    scroll: false,
    autoScroll: false,
    scrollTime: 10000,
    onSwiper: null,
    navList: ["热门", "信用", "抵押", "担保", "供应链", "其他"],
    navIndex: 0, //autoScroll 时控制激活nav
    onPrev: null,
    onNext: null,
    scrollBtn: true,
    moreUrl: "",
    imgTitle: { title: "", subTitle: "" },
  };
  timer = null;
  state = {
    activeNav: 0, //click 时控制激活nav
    hover: null,
    changeTarget: null,
  };
  navClick(index) {
    clearInterval(this.timer);
    const { nav, onNavClick } = this.props;
    this.setState({ activeNav: index, changeTarget: "click" });
    this.initTimer();
    nav && typeof onNavClick === "function" && onNavClick(index);
  }
  mouseIn(arg) {
    this.setState({
      hover: arg,
    });
  }
  mouseOut() {
    this.setState({
      hover: null,
    });
  }
  initTimer() {
    const { autoScroll, scroll, scrollTime } = this.props;
    if (autoScroll && scroll && typeof this.props.onSwiper === "function") {
      this.timer = setInterval(() => {
        this.props.onSwiper();
        this.setState({ changeTarget: "scroll" });
      }, scrollTime);
    }
  }
  componentDidMount() {
    this.initTimer();
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  prevClick() {
    clearInterval(this.timer);
    this.initTimer();
    this.setState({ changeTarget: "scroll" });
    typeof this.props.onPrev === "function" && this.props.onPrev();
  }
  nextClick() {
    clearInterval(this.timer);
    this.initTimer();
    this.setState({ changeTarget: "scroll" });
    typeof this.props.onNext === "function" && this.props.onNext();
  }
  render() {
    const {
      title,
      nav,
      sliderImg,
      scroll,
      navList,
      navIndex,
      scrollBtn,
      moreUrl,
      imgTitle,
    } = this.props;
    const { activeNav, hover, changeTarget } = this.state;
    const _activeNav = changeTarget === "click" ? activeNav : navIndex;
    return (
      <div styleName="container">
        <div styleName="header">
          <p styleName="title">
            <span>{title}</span>
          </p>
          {nav && (
            <div styleName="nav">
              {navList.map((nav, i) => {
                return (
                  <div
                    onClick={this.navClick.bind(this, i)}
                    styleName={
                      _activeNav === i ? "nav-item-active nav-item" : "nav-item"
                    }
                    key={nav}
                  >
                    {nav}
                  </div>
                );
              })}
            </div>
          )}
          <a styleName="more" href={moreUrl}>
            更多
          </a>
        </div>
        <div styleName="body">
          <div styleName="slider-img">
            <img src={sliderImg} alt={title} />
            <div styleName="img-title">
              <p styleName="main-title">{imgTitle.title}</p>
              <p styleName="sub-title">{imgTitle.subTitle}</p>
            </div>
          </div>
          <div styleName="scroll">
            {scroll && scrollBtn && (
              <div
                onMouseEnter={this.mouseIn.bind(this, "prev")}
                onMouseLeave={this.mouseOut.bind(this)}
                onClick={this.prevClick.bind(this)}
                styleName={"slider prev"}
              ></div>
            )}
            <div styleName="content">{this.props.children}</div>
            {scroll && scrollBtn && (
              <div
                onMouseEnter={this.mouseIn.bind(this, "next")}
                onMouseLeave={this.mouseOut.bind(this)}
                onClick={this.nextClick.bind(this)}
                styleName={"slider next"}
              ></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SpecialAreaCom;
