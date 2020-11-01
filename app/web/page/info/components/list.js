import React, { useState, useEffect } from 'react';
import './list.scss';
import PageNavgation from '@src/components/pageNavgation';
import Axios from '@src/helpers/http';
import queryString from 'query-string';

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

export default props => {
  const { hotListData = [], searchVal } = props;
  const [response, setResponse] = useState({});
  const [condition, setCondition] = useState({});
  const [loadText, setLoading] = useState('正在加载...');

  function getList(payload) {
    let query = queryString.parse(location.search);
    if (payload) {
      query[`${payload.key}`] = payload.value;
      if (payload.key !== 'pageNum') {
        query.pageNum = 1;
      }
      history.pushState(null, null, `?${queryString.stringify(query)}`);
    }
    // 点击搜索时，需重置pageNum和pageSize
    if (searchVal != null && !payload) {
      query.q = searchVal;
      query.pageNum = 1;
      query.pageSize = 10;
      history.pushState(null, null, `?${queryString.stringify(query)}`);
    }

    let req = {
      infoType: query.type || 1,
      pageNum: +query.pageNum || 1,
      pageSize: +query.pageSize || 10,
      title: query.q || '',
      search: query.q ? 1 : 0
    }

    Axios.post(`/financial/business/selAllRegulations`, req).then(res => {
      if (res.code == "200") {
        setResponse(res.data || {});
        setCondition(req);
        if (res.data.listData && res.data.listData.length === 0) {
          setLoading('暂无数据');
        }
      } else {
        setLoading('暂无数据');
      }
    })
  }

  useEffect(() => {
    getList();
  }, [searchVal]);

  useEffect(() => {
    function handle() {
      location.reload();
    }
    // 前进or后退时，主动刷新页面
    window.addEventListener('popstate', handle);
    return () => {
      window.removeEventListener('popstate', handle);
    }
  }, []);

  function transferType(type) {
    if (type == "融资案例")
      return 4;
    else if (type == "资讯公告")
      return 2;
    else if (type == "政策法规")
      return 1;
    else
      return 2;
  }

  return <div styleName="info-list">
    <div styleName="container">
      <div styleName="normal">
        {
          response.listData && response.listData.length > 0 ?
            <>
              <ul>
                {
                  response.listData.map((v, i) => {
                    return <li styleName="n-li" key={i}>
                      <img src={`${v.topImage}`} />
                      <div>
                        <h3>{v.title}</h3>
                        <p>来源：{v.sourceUrl}  {v.issueTime}</p>
                        <p>{v.infoTopContent}</p>
                        <a href={`/info/detail/${v.id}?type=${condition.infoType || "1"}`}>查看详情</a>
                      </div>
                    </li>
                  })
                }
              </ul>
              <PageNavgation
                flag="pageNum"
                pageSize={condition.pageSize || 10}
                sizeList={sizeList}
                totalRecord={response.total || 0}
                currentPage={condition.pageNum || 1}
                callback={getList}
              />
            </>
            :
            <div styleName="no-data">{loadText}</div>
        }
      </div>
      <div styleName="hot">
        {/* <img src={require("@src/assets/img/hot_list.png")} /> */}
        <div styleName="title">
          <h3>热门</h3>
          <img src={require("@src/assets/img/news/hot.png")} />
        </div>
        <ul>
          {
            hotListData.map((v, i) => {
              const type = transferType(v.infoType);
              return <li key={i}>
                <a title={v.title} href={`/info/detail/${v.id}?type=${type}`}>
                  <i></i>
                  <span>{v.title}</span>
                </a>
              </li>
            })
          }
        </ul>
      </div>
    </div>
  </div>
}