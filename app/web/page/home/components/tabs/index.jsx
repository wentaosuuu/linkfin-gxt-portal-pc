import React, { Component } from "react";
import "./index.scss";
class Tabs extends Component {
  state = { activeIndex: 0 };
  static defaultProps = {
    tabs: ["LPR", "Shibor"],
    width: "200px",
    activeIndex: 0,
    sutoSwiper: false,
  };
  timer = null;
  tabClick(i) {
    const { sutoSwiper } = this.props;
    clearInterval(this.timer);
    this.setState({ activeIndex: i }, () => {
      sutoSwiper && this.initSiper();
    });
  }
  initSiper() {
    const { children } = this.props;
    this.timer = setInterval(() => {
      this.setState((state) => {
        return {
          activeIndex:
            state.activeIndex < children.length - 1 ? ++state.activeIndex : 0,
        };
      });
    }, 10000);
  }
  componentDidMount() {
    const { sutoSwiper } = this.props;
    sutoSwiper && this.initSiper();
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const { width, tabs, children } = this.props;
    const { activeIndex } = this.state;
    return (
      <div styleName="tabs-container" style={{ width: width }}>
        <div styleName="header">
          {tabs.map((_tab, i) => {
            return (
              <div
                key={_tab}
                onClick={this.tabClick.bind(this, i)}
                styleName={
                  activeIndex === i
                    ? "header-item header-item-active"
                    : "header-item"
                }
              >
                {_tab}
              </div>
            );
          })}
        </div>
        <div styleName="content">
          {children &&
            React.Children.map(children, (child, i) => {
              return React.cloneElement(child, {
                show: activeIndex === i,
              });
            })}
        </div>
      </div>
    );
  }
}

class TabItem extends Component {
  static defaultProps = {
    show: true,
  };
  render() {
    const { show } = this.props;
    return (
      <div
        style={{
          visibility: show ? "visible" : "hidden",
          height: show ? "" : "0",
        }}
        styleName="tab-item"
      >
        {this.props.children}
      </div>
    );
  }
}

export default {
  Tab: Tabs,
  TabItem: TabItem,
};
