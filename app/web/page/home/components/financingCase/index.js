import React, { useState, useEffect, useRef } from 'react';
// import '../../styles/global.scss';
import './index.scss';

export default props => {
  const { data } = props;
  return <div styleName="financing-case-wrap">
    <div className="title">
      <h4>融资案例</h4>
      <a href="/info?type=4">更多</a>
    </div>
    <ul>
      {
        data.map((d, i) => {
          return <li key={i}>
            <a styleName="link" href={`/info/detail/${d.id}?type=4`}>
              <div styleName="image">
                <img src={d.topImage} />
                <div styleName="title">
                  <h3>{d.title}</h3>
                </div>
              </div>
              <div styleName="info">
                <span>{d.sourceUrl}</span>
                <span styleName="time">{d.issueTime}</span>
              </div>
              <p styleName="brief">{d.infoTopContent}</p>
            </a>
          </li>;
        })
      }
    </ul>
  </div>
}