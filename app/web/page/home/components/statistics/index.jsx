import React from "react";
import "./index.scss";

const numberArr = [
  require("@src/assets/img/stats/0.png"),
  require("@src/assets/img/stats/1.png"),
  require("@src/assets/img/stats/2.png"),
  require("@src/assets/img/stats/3.png"),
  require("@src/assets/img/stats/4.png"),
  require("@src/assets/img/stats/5.png"),
  require("@src/assets/img/stats/6.png"),
  require("@src/assets/img/stats/7.png"),
  require("@src/assets/img/stats/8.png"),
  require("@src/assets/img/stats/9.png"),
];

const numberArrHover = [
  require("@src/assets/img/stats/0_hover.png"),
  require("@src/assets/img/stats/1_hover.png"),
  require("@src/assets/img/stats/2_hover.png"),
  require("@src/assets/img/stats/3_hover.png"),
  require("@src/assets/img/stats/4_hover.png"),
  require("@src/assets/img/stats/5_hover.png"),
  require("@src/assets/img/stats/6_hover.png"),
  require("@src/assets/img/stats/7_hover.png"),
  require("@src/assets/img/stats/8_hover.png"),
  require("@src/assets/img/stats/9_hover.png"),
];

const dot = require("@src/assets/img/stats/dot.png");
const dot_hover = require("@src/assets/img/stats/dot_hover.png");
const yi = require("@src/assets/img/stats/yi.png");
const yi_hover = require("@src/assets/img/stats/yi_hover.png");
const backgroundImg = [
  require("@src/assets/img/stats/enterprise_hover.png"),
  require("@src/assets/img/stats/operation_hover.png"),
  require("@src/assets/img/stats/piggy_hover.png"),
  require("@src/assets/img/stats/cashes_hover.png"),
  require("@src/assets/img/stats/creditcard_hover.png"),
];

const smallImg = [
  require("@src/assets/img/stats/enterprise.png"),
  require("@src/assets/img/stats/operation.png"),
  require("@src/assets/img/stats/piggy.png"),
  require("@src/assets/img/stats/cashes.png"),
  require("@src/assets/img/stats/creditcard.png"),
];

export default class Statistics extends React.Component {
  state = {
    hoverIndex: null,
  };
  mouseEnter(index) {
    this.setState({ hoverIndex: index });
  }
  mouseLeave() {
    this.setState({ hoverIndex: null });
  }
  render() {
    const { statisticsData } = this.props;
    const { hoverIndex } = this.state;
    if (!statisticsData) { return <></> }
    const arr = [
      { name: `注册企业数量(家)`, value: statisticsData.companyNum },
      { name: `入驻合作机构(家)`, value: statisticsData.financialOrganNum },
      { name: `上线金融产品(个)`, value: statisticsData.productNum },
      {
        name: `提交融资需求(元)`,
        value: statisticsData.financingNeedsAmount + "亿",
      },
      {
        name: `征信服务规模(元)`,
        value: statisticsData.creditServiceAmount + "亿",
      },
    ];
    return (
      <ul className="wrap" styleName="statistics-list">
        {arr.map((v, i) => {
          let style = {
            backgroundImage: `url(${
              hoverIndex === i ? backgroundImg[i] : smallImg[i]
              })`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: hoverIndex === i ? "center " : "20px 100%",
          };
          return (
            <li
              key={v.name}
              style={style}
              onMouseEnter={this.mouseEnter.bind(this, i)}
              onMouseLeave={this.mouseLeave.bind(this)}
            >
              <div>
                <p styleName="value">
                  {String(v.value)
                    .split("")
                    .map((num, num_i) => {
                      let imgSrc = null;
                      let _num = Number(num);
                      if (hoverIndex === i) {
                        !isNaN(_num) && (imgSrc = numberArrHover[_num]);
                        isNaN(_num) && num === "." && (imgSrc = dot_hover);
                        isNaN(_num) && num === "亿" && (imgSrc = yi_hover);
                      } else {
                        !isNaN(_num) && (imgSrc = numberArr[_num]);
                        isNaN(_num) && num === "." && (imgSrc = dot);
                        isNaN(_num) && num === "亿" && (imgSrc = yi);
                      }
                      return <img key={num_i} src={imgSrc} />;
                    })}
                </p>
                <p styleName="name">{v.name}</p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}