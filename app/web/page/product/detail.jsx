import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Layout from '@src/components/layout/index';
import BreadCrumps from '@src/components/breadCrumps';
import Axios from 'axios';
import './styles/detail.scss';
import Popup from '@src/components/popup';
import Alert from '@src/components/alert';
const productInfoIcon1 = require('@src/assets/img/product_brief/intro_3.png');
const productInfoIcon2 = require('@src/assets/img/product_brief/intro_0.png');
const productInfoIcon3 = require('@src/assets/img/product_brief/intro_2.png');
const productInfoIcon4 = require('@src/assets/img/product_brief/intro_1.png');
const defaultImg = require('@src/assets/img/jinrongLog.png');
export default props => {

  const popUpOption = {
    canClickClose: true,
    title: "",
    showCloseBtn: true
  };

  const breadCrumps = [
    {
      href: '/products',
      name: '金融产品'
    },
    {
      href: '#',
      name: '产品详情'
    }
  ];
  const {
    details,
    getContactInfo,
    title,
    productList
  } = props;
  const headerData = { isHome: false, menuIndex: 1, tabIndex: 1, contactInfo: getContactInfo };
  const [accountInfo, setAccountInfo] = useState({});
  const [popupEl, updatePopup] = useState(null);
  const [popupInfo, setPopupInfo] = useState({});
  const [canApplyFlag, setCanApplyFlag] = useState(true);
  const forTheCustomer = useRef();
  const productTrait = useRef();
  const applicationCondition = useRef();
  const submitMaterial = useRef();
  const productIntroduce = useRef();

  const [te1, setTe1] = useState(false);
  const [te2, setTe2] = useState(false);
  const [te3, setTe3] = useState(false);
  const [te4, setTe4] = useState(false);

  useEffect(() => {
    showTeBtn();
    checkAuth();
  }, []);

  const showPopup = (info) => {
    setPopupInfo(info);
    popupEl.setDisplay(true);
  };
  const showProductIntroduceMore = (words) => {
    return words.length > 152;
  };
  const showTeBtn = () => {
    const heightNum = 160;
    if (forTheCustomer.current && forTheCustomer.current.clientHeight > heightNum) {
      setTe1(true);
    }
    if (productTrait.current && productTrait.current.clientHeight > heightNum) {
      setTe2(true);
    }
    if (applicationCondition.current && applicationCondition.current.clientHeight > heightNum) {
      setTe3(true);
    }
    if (submitMaterial.current && submitMaterial.current.clientHeight > heightNum) {
      setTe4(true);
    }
  };

  const productAdvantage = () => {
    if (!details.productAdvantage) return <></>;
    const arr = details.productAdvantage.split('/');
    return arr.map((value, index) => <span key={index}>{value}</span>);
  };

  const stringOmitFormat = (string, showDotter = true) => {
    if (string) {
      let strArr = string.split('\n');
      let newArr = strArr.map(item => {
        if (showDotter) {
          return `${item}`;
        }
        return `${item}`;
      });
      let newString = newArr.join('\n');
      let prueString = newString.replace(/\n/g, '');
      let htmlString = newString.replace(/\n/g, "<br>");
      if (prueString.length <= 152) return htmlString;
      return newString.substring(0, 152).replace(/\n/g, "<br>");
    }
    return '';
  };

  // 判断是否可以点击申请
  const checkAuth = () => {
    const userInfoStr = localStorage.getItem('userInfo');
    if (userInfoStr) {
      getAccountBasicInfo();
      return false;
    }
    setCanApplyFlag(false);
  };

  // 获取账号基本信息
  const getAccountBasicInfo = () => {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    let data = {
      key: userInfo.phone
    };
    Axios
      .post('/financial/enterprise/account/basic/info', data, {
        headers: {
          'loginUserId': userInfo.id
        }
      })
      .then(d => {
        if (userInfo.type == '2') {
          setCanApplyFlag(false);
        } else {
          setCanApplyFlag(true);
        }
        setAccountInfo(d.data || {});
      });
  };

  // 判断是否可以申请相应产品
  const canApply = async (e) => {
    const currentBtn = e.target;
    currentBtn.setAttribute('disabled', true);
    if (!accountInfo.id) {
      currentBtn.removeAttribute('disabled');
      location.href = `/admin/#/login?notLogin=true&id=${details.id}`;
      return false;
    };
    if (accountInfo.attestationState != 1) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
      currentBtn.removeAttribute('disabled');
      location.href = `/admin/#${userInfo.userMenus[0].path}`;
      return false;
    };
    let data = {
      companyId: accountInfo.id,
      productId: details.id
    };
    Axios
      .post('/financial/enterprise/account/product/canApply', data)
      .then(d => {
        if (d.data !== null) {
          currentBtn.removeAttribute('disabled');
          Alert.error({ msg: d.message });
          return false;
        }
        location.href = `/products/application/${details.id}`;
      });
  };

  console.log(details);

  return (
    <Layout footerData={getContactInfo} headerData={headerData} title={title} menuData={productList}>
      <Popup ref={el => updatePopup(el)} option={popUpOption}>
        <div className="popup-content">
          <h3 className="title">{popupInfo.title}</h3>
          <p>{popupInfo.text}</p>
        </div>
      </Popup>
      <div styleName="bg-grey">
        <div className="wrap">
          <BreadCrumps hrefs={breadCrumps}></BreadCrumps>
          <div styleName="goods-top-outer">
            <div styleName="goods-top-content">
              <div styleName="col1">
                <img src={require('@src/assets/img/logo_background/productBg.png')} />
                <div styleName="content">
                  <h3>{details.productName}</h3>
                  <div styleName="line"></div>
                  <span>{details.financialInstitutionsName}</span>
                </div>
              </div>
              <div styleName="col2">
                <div styleName="item">
                  <span styleName="key">贷款利率：</span>
                  <p styleName="value">
                    <b>{details.rateStart}</b>
                    <i>%</i>
                    -
                    <b>{details.rateEnd}</b>
                    <i>%</i>
                  </p>
                </div>
                <div styleName="item loan">
                  <span styleName="key">贷款额度：</span>
                  <p styleName="value">
                    <b>{details.loanLimit}</b>
                    <i>{details.unit}</i>
                  </p>
                </div>
              </div>
              <div styleName="col3">
                <p><span styleName="key">贷款期限：</span>{details.lengthOfMaturity}</p>
                <p><span styleName="key">担保方式：</span>{details.guarantyStyle}</p>
                <p><span styleName="key">还款方式：</span>{details.paymentMethod}</p>
              </div>
              <div styleName="col4">
                <div styleName="superiority">
                  {
                    productAdvantage()
                  }
                </div>
              </div>
              <div styleName="col5">
                <button
                  styleName="apply"
                  disabled={canApplyFlag}
                  onClick={(e) => canApply(e)}
                >立即申请</button>
              </div>
            </div>
            <div styleName="subinfo">
              <div styleName="goods-introduce">
                <p styleName="words">
                  <span styleName="key">产品介绍：</span>
                  <span
                    ref={productIntroduce}
                    dangerouslySetInnerHTML={{ __html: stringOmitFormat(details.productIntroduce, false) }}
                  >
                  </span>
                  {
                    showProductIntroduceMore(details.productIntroduce) ? <span styleName="ellipsis">...</span> : <></>
                  }
                </p>
                <p styleName={showProductIntroduceMore(details.productIntroduce) ? 'more' : 'more hidden'}>
                  <span onClick={() => showPopup({ title: '产品介绍', text: details.productIntroduce })}>更多</span>
                  <i styleName=""></i>
                </p>
              </div>
            </div>
          </div>
          <div styleName="goods-middle-outer">
            <div styleName="com">
              <div styleName="com-wrap">
                <img src={productInfoIcon1} alt="客户" />
                <p styleName="tit">适用客户</p>
                <div styleName="cont" >
                  <p styleName="words">
                    <span ref={forTheCustomer} dangerouslySetInnerHTML={{ __html: stringOmitFormat(details.forTheCustomer) }}></span>
                  </p>
                  {
                    te1 ? <p styleName="ellipsis">...</p> : <></>
                  }
                </div>
                <p styleName={te1 ? 'more' : 'more hidden'}>
                  <span onClick={() => showPopup({ title: '适用客户', text: details.forTheCustomer })}>更多</span>
                  <i styleName=""></i>
                </p>
              </div>
              <div styleName="line"></div>
            </div>
            <div styleName="com">
              <div styleName="com-wrap">
                <img src={productInfoIcon2} alt="特点" />
                <p styleName="tit">产品特点</p>
                <div styleName="cont">
                  <p styleName="words">
                    <span ref={productTrait} dangerouslySetInnerHTML={{ __html: stringOmitFormat(details.productTrait) }}></span>
                  </p>
                  {
                    te2 ? <p styleName="ellipsis">...</p> : <></>
                  }
                </div>
                <p styleName={te2 ? 'more' : 'more hidden'}>
                  <span onClick={() => showPopup({ title: '产品特点', text: details.productTrait })}>更多</span>
                  <i styleName=""></i>
                </p>
              </div>
              <div styleName="line"></div>
            </div>
            <div styleName="com">
              <div styleName="com-wrap">
                <img src={productInfoIcon3} alt="条件" />
                <p styleName="tit">申请条件</p>
                <div styleName="cont">
                  <p styleName="words">
                    <span ref={applicationCondition} dangerouslySetInnerHTML={{ __html: stringOmitFormat(details.applicationCondition) }}></span>
                  </p>
                  {
                    te3 ? <p styleName="ellipsis">...</p> : <></>
                  }
                </div>
                <p styleName={te3 ? 'more' : 'more hidden'}>
                  <span onClick={() => showPopup({ title: '申请条件', text: details.applicationCondition })}>更多</span>
                  <i styleName=""></i>
                </p>
              </div>
              <div styleName="line"></div>
            </div>
            <div styleName="com">
              <div styleName="com-wrap">
                <img src={productInfoIcon4} alt="材料" />
                <p styleName="tit">审核需提交材料</p>
                <div styleName="cont">
                  <p styleName="words">
                    <span ref={submitMaterial} dangerouslySetInnerHTML={{ __html: stringOmitFormat(details.submitMaterial) }}></span>
                  </p>
                  {
                    te4 ? <p styleName="ellipsis">...</p> : <></>
                  }
                </div>
                <p styleName={te4 ? 'more' : 'more hidden'}>
                  <span onClick={() => showPopup({ title: '线下审核需提交材料', text: details.submitMaterial })}>更多</span>
                  <i></i>
                </p>
              </div>
            </div>
          </div>
          <div styleName="goods-bottom-outer">
            <div styleName="tit-box">
              <div styleName="tit">办理流程</div>
              <div styleName="hen"></div>
              <div styleName="sub">HANDLING PROCEDURES</div>
            </div>
            <div styleName="ullit">
              <div styleName="li">
                <div styleName="li-left">
                  <span styleName="gxt-icon shenqing"></span>
                  <p styleName="tit">提交申请</p>
                </div>
                <div styleName="icon-liucheng"></div>
              </div>
              <div styleName="li">
                <div styleName="li-left">
                  <span styleName="gxt-icon chushen"></span>
                  <p styleName="tit">线上初审</p>
                </div>
                <div styleName="icon-liucheng"></div>
              </div>
              <div styleName="li">
                <div styleName="li-left">
                  <span styleName="gxt-icon shenhe"></span>
                  <p styleName="tit">线下审核</p>
                </div>
                <div styleName="icon-liucheng"></div>
              </div>
              <div styleName="li">
                <div styleName="li-left">
                  <span styleName="gxt-icon fangkuan"></span>
                  <p styleName="tit">授信放款</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
};
