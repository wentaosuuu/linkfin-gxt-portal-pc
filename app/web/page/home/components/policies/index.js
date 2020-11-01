import React, { useState, useEffect, useRef } from 'react';
import './index.scss';

export default props => {
  const { data } = props;

  return <div styleName="policies-wrap">
    <div className="title">
      <h4>政策法规</h4>
      <a href="/info?type=1">更多</a>
    </div>
    <ul>
      {
        data.map((d, i) => {
          return <li key={i}>
            <a styleName="link" href={`/info/detail/${d.id}?type=1`}>
              <p styleName="content">{d.title}</p>
              <span styleName="time">{d.issueTime}</span>
            </a>
          </li>;
        })
      }
    </ul>
  </div>
}