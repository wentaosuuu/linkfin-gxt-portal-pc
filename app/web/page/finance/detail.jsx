import React, { useState, useEffect } from 'react';
import Layout from '@src/components/layout/index';
import BreadCrumps from '@src/components/breadCrumps';
import ProductOrderTool from '@src/components/productOrderTool';
import PageNavgation from '@src/components/pageNavgation';
import Alert from '@src/components/alert';
import './styles/detail.scss';

import Axios from 'axios';
import queryString from 'query-string';

import star0 from '@src/assets/img/organ/star0.png';
import star1 from '@src/assets/img/organ/star1.png';
import star2 from '@src/assets/img/organ/star2.png';
import jinrongLogo from '@src/assets/img/jinrongLog.png';

const breadCrumps = [
  {
    href: '/finance',
    name: '金融机构'
  },
  {
    href: '#',
    name: '机构详情'
  }
];

const sizeList = [
  {
    value: '10',
    name: '10条/页'
  },
  {
    value: '25',
    name: '25条/页'
  },
  {
    value: '50',
    name: '50条/页'
  },
];

const orderList = [
  {
    name: '利率',
    order: {
      up: 'rateUp',
      down: 'rateDown',
    }
  },
  {
    name: '额度',
    order: {
      up: 'loanUp',
      down: 'loanDown',
    }
  },
  {
    name: '期限',
    order: {
      up: 'maturityUp',
      down: 'maturityDown',
    }
  }
];

const query = {
  pageNum: 1,
  pageSize: 10,
  orderType: 'rateDown'
};

export default props => {
  const { getContactInfo, title, productList, id } = props;
  const headerData = { isHome: false, menuIndex: 2, tabIndex: 1, contactInfo: getContactInfo };
  const [condition, setCondition] = useState(query);
  const [userInfo, setUserInfo] = useState({});
  const [accountInfo, setAccountInfo] = useState({});
  const [clickable, setClickable] = useState(true);
  const [response, setResponse] = useState({});
  const [loadText, setLoadingText] = useState("正在查询...");

  useEffect(() => {
    getList();
    const info = localStorage.getItem("userInfo");
    if (info) { // 已登录
      const infoJson = JSON.parse(info);
      setUserInfo(infoJson);
      if (infoJson.type === 2) { // 企业用户
        setClickable(true);
        getAccountBasicInfo(infoJson.phone);
      } else {
        setClickable(false);
      }
    }
  }, []);

  // 判断是否可以申请相应产品
  const canApply = async (e, id) => {
    const currentBtn = e.target;
    currentBtn.setAttribute('disabled', true);
    if (!accountInfo.id) {
      currentBtn.setAttribute('disabled', false);
      location.href = `/admin/#/login?notLogin=true&id=${id}`;
      return false;
    }
    if (accountInfo.attestationState != 1) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
      currentBtn.removeAttribute('disabled');
      location.href = `/admin/#${userInfo.userMenus[0].path}`;
      return false;
    };
    let data = {
      companyId: accountInfo.id,
      productId: id
    };
    Axios
      .post('/financial/enterprise/account/product/canApply', data)
      .then(d => {
        if (d.data !== null) {
          currentBtn.setAttribute('disabled', false);
          Alert.error({ msg: d.message });
          return false;
        }
        location.href = `/products/application/${id}`;
      });
  }

  // 获取账号基本信息
  const getAccountBasicInfo = (phone) => {
    let data = {
      key: phone
    };
    Axios
      .post('/financial/enterprise/account/basic/info', data, {
        headers: {
          'loginUserId': userInfo.id
        }
      })
      .then(d => {
        setAccountInfo(d.data || {});
      });
  }

  const getList = async (payload) => {
    // console.log(payload)
    setLoadingText('请稍等...');
    let query = queryString.parse(location.search);
    if (payload) {
      query[payload.key] = payload.value;
      if (payload.key !== 'pageNum') {
        query.pageNum = 1;
      }
      history.pushState(null, null, `/finance/details/${condition.bankId}?${queryString.stringify(query)}`);
    }
    let params = {
      bankId: id,
      pageNum: +query.pageNum || 1,
      pageSize: +query.pageSize || 10,
      orderType: query.orderType || 'rateDown'
    };
    Axios
      .post('/financial/homePage/queryFinancialInstitutionDetails', params, {
        headers: { 'x-csrf-token': props.csrf }
      })
      .then(d => {
        if (d.data.listData.length < 1) setLoadingText('暂无数据');
        setResponse(d.data);
        setCondition(params);
      });
  };

  const serviceRating = response.serviceRating || '5';
  const stars = {
    yellow: new Array(parseInt(serviceRating)).fill(1),
    harfYellow: serviceRating % 1 > 0 ? new Array(1).fill(1) : new Array(0),
    grey: new Array(Math.floor(5 - serviceRating)).fill(1)
  };

  return (
    <Layout footerData={getContactInfo} headerData={headerData} title={title} showMenu={false} menuData={productList}>
      <div styleName="wrap">
        <div styleName="finance-detail-wrap">
          <div styleName="bread-crumps">
            <BreadCrumps hrefs={breadCrumps} />
          </div>
          <div styleName="finance-details">
            <div styleName="row1">
              <img src={response.logoFilePath ? response.logoFilePath : jinrongLogo} />
              {
                response.productAdvantage && response.productAdvantage.length ? <div styleName="superiority">
                  {
                    response.productAdvantage.map((d, i) => {
                      return <span key={i}>{d}</span>;
                    })
                  }
                </div> : null
              }
            </div>
            <div styleName="row2">
              <div styleName="item rate">
                <span styleName="key">贷款利率低至：</span>
                <p styleName="value">
                  {
                    response.rate ?
                      <>
                        <b>{response.rate}</b>
                        <i>%</i>
                      </>
                      :
                      '-'
                  }
                </p>
              </div>
              <div styleName="item grade">
                <span styleName="key">服务评级：</span>
                <div>
                  {
                    stars.yellow.map((d, i) => {
                      return <img key={i} src={star1} />;
                    })
                  }
                  {
                    stars.harfYellow.map((d, i) => {
                      return <img key={i} src={star2} />;
                    })
                  }
                  {
                    stars.grey.map((d, i) => {
                      return <img key={i} src={star0} />;
                    })
                  }
                </div>
              </div>
            </div>
            <div styleName="row3">
              <div styleName="item loan">
                <span styleName="key">贷款额度高达：</span>
                <p styleName="value">
                  <b>{response.loanLimit}</b>
                  <i>{response.unit}</i>
                </p>
              </div>
              <div styleName="item address">
                <span styleName="key">联系地址：</span>
                <p>{response.contactAddress}</p>
              </div>
            </div>
            <div styleName="row4">
              <p><span styleName="key">机构介绍：</span>{response.financialInstitutionsIntroduce}</p>
            </div>
          </div>
          <div styleName="product-wrap">
            <div styleName="rank">
              <ProductOrderTool
                name="orderType"
                currentValue="rateDown"
                defaultValue="rateDown"
                orderList={orderList}
                callback={getList}
              />
            </div>
            {
              response.listData && response.listData.length ?
                <>
                  <ul>
                    {
                      response.listData.map((d, i) => {
                        return <li styleName="product-item" key={i}>
                          <div styleName="col1">
                            <img src={require('@src/assets/img/logo_background/productBg.png')} />
                            <div styleName="content">
                              <h3>{d.productName}</h3>
                              <div styleName="line"></div>
                              <span>{d.financialInstitutionsName}</span>
                            </div>
                          </div>
                          <div styleName="col2">
                            <div styleName="item">
                              <span styleName="key">贷款利率：</span>
                              <p styleName="value">
                                <b>{d.rateStart}</b>
                                <i>%</i>
                        -
                        <b>{d.rateEnd}</b>
                                <i>%</i>
                              </p>
                            </div>
                            <div styleName="item loan">
                              <span styleName="key">贷款额度：</span>
                              <p styleName="value">
                                <b>{d.loanLimit}</b>
                                <i>{d.unit}</i>
                              </p>
                            </div>
                          </div>
                          <div styleName="col3">
                            <p><span styleName="key">贷款期限：</span>{d.lengthOfMaturity}</p>
                            <p><span styleName="key">担保方式：</span>{d.guarantyStyle}</p>
                            <p><span styleName="key">还款方式：</span>{d.paymentMethod}</p>
                          </div>
                          <div styleName="col4">
                            <div styleName="superiority">
                              {
                                d.advantageJson.map((a, c) => {
                                  return <span key={c}>{a}</span>;
                                })
                              }
                            </div>
                          </div>
                          <div styleName="col5">
                            <button styleName="apply" disabled={!clickable} onClick={(e) => canApply(e, d.id)}>立即申请</button>
                            <a styleName="view" href={`/products/details/${d.id}`}>查看详情</a>
                          </div>
                        </li>;
                      })
                    }
                  </ul>
                  <PageNavgation
                    flag="pageNum"
                    pageSize={condition.pageSize}
                    sizeList={sizeList}
                    totalRecord={response.total || 0}
                    currentPage={condition.pageNum}
                    callback={getList}
                  />
                </>
                :
                <div styleName="no-data">{loadText}</div>
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}