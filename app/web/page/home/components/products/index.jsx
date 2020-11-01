import React, { Component } from "react";
import SpecialAreaCom from "@src/components/specialAreaCom";
import ProductService from "./productService";
import "./index.scss";
class Products extends Component {
  constructor(props) {
    super(props);
    if (props.productData) {
      this.productService = new ProductService(props.productData);
      const obj = this.productService.getNextData();
      this.totalNum = obj.productList.length;
      this.state = {
        productData: obj.productList,
        navIndex: obj.index,
        navList: this.productService.nav.navList,
        targetSwiper: 0,
      };
    }

  }
  navClick(index) {
    const obj = this.productService.getTargetData(index);
    this.totalNum = obj.productList.length;
    this.setState({
      productData: obj.productList,
      navIndex: obj.index,
      targetSwiper: 0,
    });
  }
  swipering() {
    const { targetSwiper } = this.state;
    const { totalNum } = this;
    //当前页数等于最大可翻页数
    if (targetSwiper === totalNum - 1) {
      const obj = this.productService.getNextData();
      this.totalNum = obj.productList.length;
      this.setState({
        productData: obj.productList,
        navIndex: obj.index,
        targetSwiper: 0,
      });
    } else {
      this.setState((state) => {
        let target = ++state.targetSwiper;
        return { targetSwiper: target };
      });
    }
  }
  prev() {
    const { targetSwiper } = this.state;
    //当前页数等于最大可翻页数
    if (targetSwiper === 0) {
      const obj = this.productService.getPrevData();
      this.totalNum = obj.productList.length;
      this.setState({
        productData: obj.productList,
        navIndex: obj.index,
        targetSwiper: this.totalNum - 1,
      });
    } else {
      this.setState((state) => {
        let target = --state.targetSwiper;
        return { targetSwiper: target };
      });
    }
  }
  next() {
    this.swipering();
  }
  render() {
    const { productData, targetSwiper, navList, navIndex } = this.state;
    return (
      <div styleName="container">
        <SpecialAreaCom
          nav={true}
          title={`产品专区`}
          scroll={true}
          autoScroll={true}
          sliderImg={require("@src/assets/img/product/banner.png")}
          onNavClick={this.navClick.bind(this)}
          onSwiper={this.swipering.bind(this)}
          navList={navList}
          navIndex={navIndex}
          onPrev={this.prev.bind(this)}
          onNext={this.next.bind(this)}
          moreUrl="/products"
          imgTitle={{ title: "推荐产品", subTitle: "贷款审批快 还款方式灵活" }}
        >
          {productData && productData.map((v, i) => {
            return (
              <Swiper
                product={v}
                target={targetSwiper}
                index={i}
                key={i}
              ></Swiper>
            );
          })}
        </SpecialAreaCom>
      </div>
    );
  }
}

function Swiper(props) {
  const left = `${(props.index - props.target) * 100}%`;
  return (
    <div styleName="product-com" style={{ left: left }}>
      {props.product.map((v, i) => {
        return (
          <div styleName="product" key={v.productName + i}>
            <p styleName="title">{v.productName}</p>
            <p styleName="logo">
              <img
                src={
                  v.bankLogoPath
                    ? v.bankLogoPath
                    : require("@src/assets/img/jinrongLog.png")
                }
              />
            </p>
            <p styleName="rate">
              <span>{v.rateStart}</span>
              <span styleName="present">%</span>-<span>{v.rateEnd}</span>
              <span styleName="present">%</span>
            </p>
            <p styleName="ls">
              <span>贷款额度：</span>
              {v.loanLimit}
            </p>
            <p styleName="ls">
              <span>贷款期限：</span>
              {v.lengthOfMaturity}
            </p>
            <p styleName="ls">
              <span>担保方式：</span>
              {v.guarantyStyle}
            </p>
            <a styleName="btn" href={`/products/details/${v.productId}`}>
              查看详情
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default Products;
