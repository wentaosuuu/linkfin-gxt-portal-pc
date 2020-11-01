export default class ProductService {
  constructor(data) {
    if (data) {
      this.originalData = data;
      this.nav = {
        get navIndex() {
          return this._navIndex;
        },
        set navIndex(arg) {
          if (this._navIndex !== null && arg > this.length) {
            this._navIndex = 0;
          } else {
            this._navIndex = arg;
          }
        },
        navList: [],
        _navIndex: null,
      };
      this.product = [];
      this.init();
    }
  }
  init() {
    // const tabList = this.originalData.tabList || [];
    const { tabList = [], hotList = [], otherList = [] } = this.originalData;
    tabList.forEach((d) => {
      this.nav.navList.push(d.tabName);
      this.product[d.tabName] = this.formatData(d.productList, 4);
    });
    this.nav.navList.unshift("热门");
    this.nav.navList.push("其他");
    this.product["热门"] = this.formatData(hotList, 4);
    this.product["其他"] = this.formatData(otherList, 4);
  }
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
  getNextData() {
    this.getNextNotEmptyNavIndex();
    return {
      productList: this.product[this.nav.navList[this.nav.navIndex]] || [],
      index: this.nav.navIndex,
    };
  }
  getTargetData(target) {
    this.nav.navIndex = target;
    return {
      productList: this.product[this.nav.navList[this.nav.navIndex]] || [],
      index: this.nav.navIndex,
    };
  }
  getPrevData() {
    this.getPrevNotEmptyNavIndex();
    return {
      productList: this.product[this.nav.navList[this.nav.navIndex]],
      index: this.nav.navIndex,
    };
  }
  //获取上一个产品列表不为空的Nav下标
  getPrevNotEmptyNavIndex() {
    let index = null;
    //往后找
    let start = this.nav.navIndex;
    for (let i = start - 1; i >= 0; i--) {
      if (this.product[this.nav.navList[i]].length) {
        index = i;
        break;
      }
    }
    //后面没有往前找
    if (index === null) {
      start = this.nav.navList.length - 1;
      for (let i = start; i >= 0; i--) {
        if (this.product[this.nav.navList[i]].length) {
          index = i;
          break;
        }
      }
    }
    this.nav.navIndex = index === null ? this.nav.navIndex : index;
    return this.nav.navIndex;
  }
  //获取下一个产品列表不为空的Nav下标
  getNextNotEmptyNavIndex() {
    let index = null;
    let start = this.nav.navIndex === null ? 0 : this.nav.navIndex + 1;
    //往前找
    for (let i = start; i < this.nav.navList.length; i++) {
      if (this.product[this.nav.navList[i]].length) {
        index = i;
        break;
      }
    }
    //前面没有往后找
    if (index === null) {
      for (let i = 0; i < this.nav.navIndex; i++) {
        if (this.product[this.nav.navList[i]].length) {
          index = i;
          break;
        }
      }
    }
    this.nav.navIndex = index === null ? this.nav.navIndex : index;
    return this.nav.navIndex;
  }
}
