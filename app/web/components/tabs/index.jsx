import React, { Component } from "react";
import "./index.scss";
class Tabs extends Component {
  state = { activeIndex: 0 };
  static defaultProps = {
    tabs: ["LPR", "Shibor"],
    width: "200px",
    activeIndex: 0,
    sutoSwiper: false,
    headerStyle: {},
    bodyStyle: {},
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
  renderChild(children) {
    console.log(1);
    const { activeIndex } = this.state;
    let rea_i = -1;
    if (children) {
      React.Children.map(children, (child, i) => {
        rea_i++;
        if (child) {
          return React.cloneElement(child, {
            show: activeIndex === rea_i,
            index: rea_i
          });
        }
      });
    }
  }

  render() {
    const { width, tabs, children, headerStyle, bodyStyle } = this.props;
    const { activeIndex } = this.state;
    let tabIndex = -1;
    return (
      <div styleName="tabs-container" style={{ width: width }}>
        <div styleName="header" style={headerStyle}>
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
                {/* {tabsIcon[i] && (
                  <img
                    styleName="icon"
                    src={tabsIcon[i].src}
                    width={tabsIcon[i].width}
                  />
                )} */}
                {typeof _tab === "function" ? _tab() : _tab}
              </div>
            );
          })}
        </div>
        <div styleName="content" style={bodyStyle}>
          {children &&
            React.Children.map(children, (child, i) => {
              if (child) {
                tabIndex++;
                let _i = tabIndex;
                return React.cloneElement(child, {
                  show: activeIndex === _i,
                  index: _i
                });
              }
            })
          }
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
    const { show, index } = this.props;
    return (
      <div
        key={index}
        style={{
          visibility: show ? "visible" : "hidden",
          height: show ? "" : "0",
        }}
        styleName="tab-item"
      >
        {this.props.children && React.cloneElement(this.props.children, { index: index })}
      </div>
    );
  }
}

export default {
  Tab: Tabs,
  TabItem: TabItem,
};
