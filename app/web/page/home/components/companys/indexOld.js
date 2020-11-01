import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import './index.scss';

export default props => {
  // const { companyData = [] } = props;
  // const [swiper, updateSwiper] = useState(null);
  // let companyData = [];
  let companyDataBank = [
    require(`@src/assets/img/company/bank_6.png`),
    require(`@src/assets/img/company/bank_5.png`),
    require(`@src/assets/img/company/bank_4.png`),
    require(`@src/assets/img/company/bank_3.png`),
    require(`@src/assets/img/company/bank_16.png`),
    require(`@src/assets/img/company/bank_17.png`),
    require(`@src/assets/img/company/bank_8.png`),
    require(`@src/assets/img/company/bank_9.png`),
    require(`@src/assets/img/company/bank_7.png`),
  ];
  // let l = 1;
  // while (l < 12) {
  //   const img = require(`@src/assets/img/company/bank_${l}.png`);
  //   if (img && l != 1 && l != 2)
  //   companyData.push(img);
  //   l++;
  // }

  // companyData.push(require(`@src/assets/img/company/bank_1.png`));
  // companyData.push(require(`@src/assets/img/company/bank_1.png`));
  // companyData.push(require(`@src/assets/img/company/bank_1.png`));
  // companyData.push(require(`@src/assets/img/company/bank_1.png`));

  //判断数据，如果数量<18，则不显示pagination，否则做分页处理
  // let showPagination = true;
  // const numFlag = 18;
  // const length = companyData.length;
  // let newCompanyData = [];
  // let page = Math.ceil(length/numFlag);
  // if (page < 2) {
  //   showPagination = false;
  //   newCompanyData = [companyData];
  // } else {
  //   while (true) {
  //     const arr = companyData.splice(0, 18);
  //     newCompanyData.push(arr);
  //     if (!companyData.length)
  //       break;
  //   }
  // }

  // const params = {
  //   noSwiping: true,
  //   pagination: {
  //     el: `.swiper-pagination ${!showPagination ? ".swiper-pagination-hidden" : ""}`,
  //     type: 'bullets',
  //     clickable: true
  //   },
  //   containerClass: 'swiper-container company-container',
  // }

  return <div styleName="companys">
    <div styleName="swiper">
      {
        companyDataBank.map((item, i) => {
          return <img styleName="img" key={i} src={item}/>
        })
      }
      {/* <div styleName="img"></div>
      <div styleName="img"></div>
      {
        companyDataGov.map((item, i) => {
          return <img styleName="img" key={i} src={item}/>
        })
      }
      <div styleName="img"></div>
      <div styleName="img"></div>
      <div styleName="img"></div>
      {
        companyDataCom.map((item, i) => {
          return <img styleName="img" key={i} src={item} alt={i}/>
        })
      } */}
      {/* <Swiper {...params} getSwiper={updateSwiper}>
        {
          newCompanyData.map((v, i) => {
            return <div key={i}>
              {
                v.map((nv, ni) => <img src={nv} key={ni} />)
              }
            </div>
          })
        }
      </Swiper> */}
    </div>
  </div>
}
