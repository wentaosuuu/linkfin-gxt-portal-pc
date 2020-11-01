import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import './index.scss';
export default props => {

  const { title, list, currentValue, type, callback } = props;
  return <div styleName="category-line">
    <div styleName="category-title">{title || '机构类型'}：</div>
    <div styleName="category-items">
      <ul>
        {list.map((item, index) => 
          <li styleName={currentValue == item.id && 'active'} key={index} data-value={item.id} onClick={() => callback({key: type, value: item.id})}>{item.value}</li>
        )}
      </ul>
    </div>
  </div>
}