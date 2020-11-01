import React, { Component } from "react";
import SpecialAreaCom from "@src/components/specialAreaCom";
import "./index.scss";
const starlight = require("@src/assets/img/organ/star1.png");
const starDark = require("@src/assets/img/organ/star0.png");
const starHalf = require("@src/assets/img/organ/star2.png");
class Organs extends Component {
  state = { targetIndex: 0 };
  len = null;
  formatData(data, len) {
    let arr = [];
    if (data.length) {
      for (let i = 0; i < data.length; i += len) {
        if (data[i + len]) {
          arr.push(data.slice(i, i + len));
        } else {
          arr.push(data.slice(i));
        }
      }
    }
    return arr;
  }
  swipering() {
    this.setState((state) => {
      if (state.targetIndex === this.len - 1) {
        return { targetIndex: 0 };
      } else {
        return { targetIndex: ++state.targetIndex };
      }
    });
  }
  render() {
    const data = this.formatData(this.props.data, 4);
    this.len = data.length;
    const { targetIndex } = this.state;
    return (
      <div styleName="container">
        <SpecialAreaCom
          nav={false}
          title={`机构专区`}
          scroll={true}
          autoScroll={true}
          sliderImg={require("@src/assets/img/organ/organ-banner.png")}
          onSwiper={this.swipering.bind(this)}
          scrollBtn={false}
          moreUrl="/finance"
          imgTitle={{ title: "推荐机构", subTitle: "资质雄厚 信用等级高" }}
        >
          {data.map((v, i) => {
            const left = `${(i - targetIndex) * 100}%`;
            return (
              <div key={i} styleName="wiper" style={{ left: left }}>
                {v.map((organ, o_i) => {
                  let star = ["", "", "", "", ""];
                  star[
                    Math.ceil(Number(organ.serviceRating)) - 1
                  ] = /^[0-9].[0-9]$/.test(organ.serviceRating);
                  return (
                    <div styleName="organs-item" key={organ.id}>
                      <p styleName="logo">
                        {i === 0 && o_i === 0 && (
                          <img
                            styleName="hot"
                            src={require("@src/assets/img/organ/recommended.png")}
                          />
                        )}
                        <img
                          styleName="img"
                          src={
                            !organ.logoFilePath
                              ? require("@src/assets/img/jinrongLog.png")
                              : organ.logoFilePath
                          }
                        />
                      </p>
                      <div styleName="rate">
                        <p styleName="title align-center">利率低至</p>
                        <p styleName="rate-text">
                          {organ.rate || "-"}
                          <span styleName="present">%</span>
                        </p>
                      </div>
                      <div styleName="serve-star">
                        <p styleName="title">服务评级：</p>
                        <p>
                          {star.map((star, i) => {
                            return (
                              <img
                                key={i}
                                src={
                                  i < Math.floor(Number(organ.serviceRating))
                                    ? starlight
                                    : star === true
                                    ? starHalf
                                    : starDark
                                }
                              />
                            );
                          })}
                        </p>
                      </div>
                      <div styleName="advantage">
                        <p styleName="title">机构特色：</p>
                        <p styleName="content">
                          {organ.institutionsAdvantage &&
                            organ.institutionsAdvantage.substr(0, 27)}
                          {organ.institutionsAdvantage &&
                          organ.institutionsAdvantage.length > 28
                            ? "..."
                            : ""}
                        </p>
                      </div>
                      <a styleName="btn" href={`/finance/details/${organ.id}`}>
                        查看详情
                      </a>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </SpecialAreaCom>
      </div>
    );
  }
}

export default Organs;
