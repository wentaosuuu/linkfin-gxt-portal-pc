import React, {useRef, useEffect, useState, useReducer} from 'react';
import ScrollList from "@src/components/scrollList";
import './index.scss';

export default props => {
  
  const mockList = [
    {
      company: '中石油哈哈哈',
      date: '2019-09-12',
      status: '发布融资',
    },
    {
      company: '中石油哈哈哈',
      date: '2019-09-12',
      status: '发布融资',
    },
    {
      company: '中石油哈哈哈',
      date: '2019-09-12',
      status: '发布融资',
    },
    {
      company: '中石油哈哈哈',
      date: '2019-09-30',
      status: '发布融资',
    },
  ]
 
  return <div styleName="scroll-wrap">
    <div styleName="info-state">
      <div styleName="section-header">
        <span styleName="tit"><img src={require('@src/assets/img/banner/title_line.png')} alt=""/>对接动态</span>
        {/* <span styleName="more">更多<img src={require('@src/assets/img/banner/more.png')} alt=""/></span> */}
      </div>
      <div styleName="list-tit">
        <span>企业名称</span>
        <span>对接日期</span>
        <span>对接动态</span>
      </div>
      <ScrollList listHeight={350}>
        <ul>
          {
            mockList.map((item, index) => {
              return <li key={index} styleName="scroll-li">
                <span styleName="name">{item.company}</span>
                <span styleName="date">{item.date}</span>
                <span styleName="status">{item.status}</span>
              </li>
            })
          }
        </ul>
      </ScrollList>
    </div>
  </div>;
}