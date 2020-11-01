import React, { Component } from "react";
import "./index.scss";
class Banner extends Component {
  static defaultProps = {
    time: 10000,
    autoSwiper: true,
  };
  constructor(props) {
    super(props);
    this.currentIndex = 0;
    this.timer = null;
    this.imageArr = this.props.data.length
      ? this.props.data
      : [
        {
          id: "default",
          bannerImgPath: require("./../../../../assets/img/banner/banner.jpg"),
        },
      ];
  }
  state = {
    currentIndex: 0,
  };
  componentDidMount() {
    this.props.autoSwiper && this.swiper();
  }
  swiper(index) {
    if (index === undefined) {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (this.currentIndex === this.imageArr.length - 1) {
          this.currentIndex = 0;
        } else {
          this.currentIndex++;
        }
        this.setState({ currentIndex: this.currentIndex });
        for (let i = 0; i < this.imageArr.length; i++) {
          let target = i - this.currentIndex;
          this.refs[`banner-${i}`].style.left = 100 * target + "%";
        }
      }, this.props.time);
    } else {
      this.currentIndex = index;
      this.setState({ currentIndex: this.currentIndex });
      for (let i = 0; i < this.imageArr.length; i++) {
        let target = i - this.currentIndex;
        this.refs[`banner-${i}`].style.left = 100 * target + "%";
      }
    }
  }
  gotoIndex(index) {
    this.setState({ currentIndex: index });
    this.swiper(index); // 跳转到指定banner
    this.swiper(); //重启定时器
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    this.setState({ currentIndex: 0 });
    this.currentIndex = 0;
  }
  render() {
    let { currentIndex } = this.state;
    return (
      <div styleName="banner">
        {this.imageArr.map((img, i) => {
          return (
            <div
              key={img.id}
              ref={`banner-${i}`}
              style={{
                backgroundImage: `url(${encodeURI(img.bannerImgPath)})`,
                left: `${i * 100}%`,
              }}
              styleName="banner-item"
            ></div>
          );
        })}
        <div styleName="toggle-btn">
          {this.imageArr.map((img, i) => {
            return (
              <div
                key={i}
                onClick={this.gotoIndex.bind(this, i)}
                styleName={
                  currentIndex === i
                    ? "toggle-btn-item toggle-btn-item-active"
                    : "toggle-btn-item"
                }
              ></div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Banner;
