
import React, { useState, useEffect } from 'react';
import Layout from '@src/components/layout/index';
import Button from '@src/components/button';
import SearchBanner from '@src/components/searchBanner';
import ProductItem from '@src/components/productItem';
import CategoryLine from '@src/components/productCategoryLine';
import PageNavgation from '@src/components/pageNavgation';
import DropList from '@src/components/dropList';

import Axios from 'axios';
import queryString from 'query-string';
import './styles/list.scss';

import jinrongLogo from '@src/assets/img/jinrongLog.png';

export default props => {
  const { query, getContactInfo, title, productList } = props || {};
  const headerData = { isHome: false, menuIndex: 2, tabIndex: 1, contactInfo: getContactInfo };
  const [response, setResponse] = useState([]);
  const [loadText, setLoadingText] = useState("正在加载...");
  useEffect(() => {
    getList();
  }, []);

  const getList = async (payload) => {
    let params = {};
    Axios
      .post('/financial/homePage/queryFinancialInstitutions', params, {
        headers: { 'x-csrf-token': props.csrf }
      })
      .then(d => {
        if (d.data.length < 1) setLoadingText('暂无数据');
        setResponse(d.data || []);
      });
  };

  return (
    <Layout footerData={getContactInfo} headerData={headerData} title={title} menuData={productList}>
      <div styleName="finance-wrap">
        {
          response && response.length > 0 ?
            <ul>
              {
                response.map((d, i) => {
                  return <li key={i}>
                    <a href={`/finance/details/${d.id}`}>
                      <img src={d.logoFilePath ? d.logoFilePath : jinrongLogo} />
                    </a>
                  </li>;
                })
              }
            </ul>
            :
            <div styleName="no-data">{loadText}</div>
        }
      </div>
    </Layout>
  );
};
