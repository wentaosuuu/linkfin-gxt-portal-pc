import React, {useRef, useEffect, useState, useReducer} from 'react';
import ScrollList from "@src/components/scrollList";
import './index.scss';

export default props => {
  const { data } = props;

  const mockList = [
    {
      companyName: '中石由1',
      auditDate: '2019-09-12',
      statusDesc: '发布融资',
    },
    {
      companyName: '中石由2',
      auditDate: '2019-09-12',
      statusDesc: '发布融资',
    },
    {
      companyName: '中石由3',
      auditDate: '2019-09-12',
      statusDesc: '发布融资',
    },
  ]

  return <div styleName="joint-trend-wrap">
    <div styleName="info-state">
      <div className="title">
        <h4>对接动态</h4>
        {/* <a href="#">更多</a> */}
      </div>
      <div styleName="list-tit">
        <span styleName="name">企业名称</span>
        <span styleName="date">对接日期</span>
        <span styleName="status">对接动态</span>
      </div>
      <ScrollList listHeight={350}>
        <ul>
          {
            data.map((item, index) => {
              return <li key={index} styleName="scroll-li">
                <span styleName="name">{item.companyName || '-'}</span>
                <span styleName="date">{item.auditDate || '-'}</span>
                <span styleName="status">{item.statusDesc || '-'}</span>
              </li>
            })
          }
        </ul>
      </ScrollList>
    </div>
  </div>;
}