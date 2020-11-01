import React, { useState, useEffect } from 'react';
import Layout from '@src/components/layout/index';
import SearchBanner from '@src/components/searchBanner';
import List from './components/list';
import './styles/index.scss';
import queryString from 'query-string';

export default function Info(props) {
  const { getContactInfo, title, hotInfoData, headerData, productList } = props;
  headerData.contactInfo = getContactInfo;
  const [searchVal, setSearchVal] = useState(null);
  const [queryValue, setQueryValue] = useState({});
  useEffect(() => {
    let query = queryString.parse(location.search);
    setQueryValue(query);
  }, []);
  return (
    <Layout footerData={getContactInfo} headerData={headerData} title={title} menuData={productList}>
      <SearchBanner placeholder="请输入关键词或关键词组合查找信息" defaultValue={queryValue.q || ""} onSubmit={val => setSearchVal(val || "")} />
      <List hotListData={hotInfoData} searchVal={searchVal} />
    </Layout>
  )
};
