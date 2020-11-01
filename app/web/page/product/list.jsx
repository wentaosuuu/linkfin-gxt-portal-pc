
import React, { useState, useEffect } from 'react';
import Layout from '@src/components/layout/index';
import Button from '@src/components/button/btn';
import ProductItem from '@src/components/productItem';
import CategoryLine from '@src/components/productCategoryLine';
import ProductOrderTool from '@src/components/productOrderTool';
import PageNavgation from '@src/components/pageNavgation';
import Table from '@src/components/table';
import Alert from '@src/components/alert';

import Axios from 'axios';
import queryString from 'query-string';
import './styles/list.scss';

export default props => {
  const { query, getContactInfo = {}, title, productList = {} } = props || {};
  const headerData = { isHome: false, menuIndex: 1, tabIndex: 1, contactInfo: getContactInfo };
  const [condition, setCondition] = useState(query);
  const [response, setResponse] = useState({});
  const [loadText, setLoadingText] = useState("正在查询...");
  const [accountInfo, setAccountInfo] = useState({});
  const [canApplyFlag, setCanApplyFlag] = useState(false);
  const categoryQuery = [
    'loanLimit',
    'lengthOfMaturity',
    'guarantyStyle',
    'financialInstitutionsType',
  ];
  const sizeList = [
    {
      value: 10,
      name: '10条/页'
    },
    {
      value: 25,
      name: '25条/页'
    },
    {
      value: 50,
      name: '50条/页'
    },
  ]
  const orderList = [
    {
      name: '利率',
      order: {
        up: '5',
        down: '6',
      }
    },
    {
      name: '额度',
      order: {
        up: '1',
        down: '2',
      }
    },
    {
      name: '期限',
      order: {
        up: '3',
        down: '4',
      }
    }
  ];

  const columns = [
    {
      name: '产品名称',
      key: 'productName',
      attr: {
        width: '150px',
      }
    },
    {
      name: '机构名称',
      key: 'financialName',
      attr: {
        width: '180px',
      }
    },
    {
      name: '担保方式',
      key: 'guarantyStyle',
      attr: {
        width: '80px',
      }
    },
    {
      name: '贷款利率',
      key: item => {
        return <>
          <span styleName="rate">{item.rateStart}%</span>
          <span styleName="rate">-</span>
          <span styleName="rate">{item.rateEnd}%</span>
        </>
      },
      attr: {
        width: '100px',
      }
    },
    {
      name: '贷款额度',
      key: 'loanLimit',
      attr: {
        width: '100px',
      }
    },
    {
      name: '贷款期限',
      key: 'lengthOfMaturity',
      attr: {
        width: '100px',
      }
    },
    {
      name: '产品优势',
      key: item => {
        const str = item.productAdvantage
        if (item.productAdvantage) {
          const arr = item.productAdvantage.split('/');
          return arr.map((value, index) => <span styleName="tab" key={index}>{value}</span>)
        }
        return <>-</>
        
      },
    },
    {
      name: '操作',
      key: item => {
        return <>
          <Button styleName="handle-btn" href={`/products/details/${item.id}`}>查看详情</Button>
          <Button disabled={canApplyFlag} styleName="handle-btn bold" type="error" onClick={(e) => canApply(e, item.id)}>立即申请</Button>
        </>
      },
      attr: {
        width: '180px',
      }
    }
  ];

  useEffect(() => {
    getList();
    checkAuth();
  },[]);

  // 判断是否登录
  const checkAuth = () => {
    const userInfoStr = localStorage.getItem('userInfo');
    if(userInfoStr) {
      getAccountBasicInfo()
    }
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
        if(userInfo.type == '2') {
          setCanApplyFlag(false);
        } else {
          setCanApplyFlag(true);
        }
        setAccountInfo(d.data || {});
      });
  }

  // 判断是否可以申请相应产品
  const canApply = async (e, id) => {
    const currentBtn = e.target;
    currentBtn.setAttribute('disabled', true);
    if(!accountInfo.id) {
      currentBtn.removeAttribute('disabled');
      location.href = `/admin/#/login?notLogin=true&id=${id}`;
      return false;
    };
    if(accountInfo.attestationState != 1) {
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
        if(d.data !== null) {
          currentBtn.removeAttribute('disabled');
          Alert.error({msg: d.message});
          return false;
        }
        location.href = `/products/application/${id}`;
      });
  }

  const getList = async (payload) => {
    setLoadingText('请稍等...');
    let query = queryString.parse(location.search);
    if (payload && payload.key == 'searchKey') {
      query = {
        searchKey: payload.value,
        pageNum: 1
      }
      history.pushState(null, null, `/products?${queryString.stringify(query)}`);
    } else if (payload && payload.key !== 'pageNum') {
      query[`${payload.key}`] = payload.value;
      query['pageNum'] = 1;
      history.pushState(null, null, `/products?${queryString.stringify(query)}`);
    } else if (payload) {
      query[`${payload.key}`] = payload.value;
      history.pushState(null, null, `/products?${queryString.stringify(query)}`);
    }
    let params = {
      financialInstitutionsType: query.financialInstitutionsType || '',
      lengthOfMaturity: query.lengthOfMaturity || '',
      guarantyStyle: query.guarantyStyle || '',
      loanLimit: query.loanLimit || '',
      pageNum: +query.pageNum || 1,
      pageSize: +query.pageSize || 10,
      characteristicPlate: query.characteristicPlate || '', // 特色板块
      searchKey: query.searchKey || '', // 关键字
      order: +query.order || 6, // 1：额度升序；2：额度额降序；3：期限升序；4：期限降序; 5: 利率升序; 6:利率降序;
      isLoan: query.isLoan || '1' // 贷款类产品和非贷款类产品
    };
    Axios
      .post('/financial/product/search', params, {
        headers: { 'x-csrf-token': props.csrf }
      })
      .then(d => {
        if (d.data.listData.length < 1) setLoadingText('暂无数据');
        setResponse(d.data);
        setCondition(params);
      });
  };

  return (
    <Layout footerData={getContactInfo} headerData={headerData} title={title} menuData={productList}>
      <div styleName="bg-grey">
        <div className="wrap" styleName="product-wrap">
          <div styleName="category-box">
            {
              categoryQuery.map((item, index) =>
                <CategoryLine
                  key={index}
                  type={item}
                  currentValue={condition[item] || ''}
                  title={props[item][0].remark || '机构类型'}
                  list={props[item]}
                  callback={getList}>
                </CategoryLine>)
            }
          </div>
          <div styleName="order-box">
            <ProductOrderTool
              name="order"
              currentValue="6"
              defaultValue="6"
              orderList={orderList}
              callback={getList}
            />
          </div>
          {
            response.listData && response.listData.length ?
              <>
                <div styleName="table-box">
                  <Table
                    listData={response.listData}
                    columns={columns}
                    showIndex
                  />
                </div>
                <div styleName="pagenavgation-box">
                  <PageNavgation
                    flag="pageNum"
                    pageSize={condition.pageSize || 10}
                    sizeList={sizeList}
                    totalRecord={response.total || 0}
                    currentPage={condition.pageNum || 1}
                    callback={getList}
                  ></PageNavgation>
                </div>
              </> :
              <div styleName="no-data">{loadText}</div>
          }
        </div>
      </div>
    </Layout>
  )
};
