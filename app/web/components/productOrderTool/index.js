import React, { useState, useEffect, useRef } from 'react';
import './index.scss';
export default props => {
  const {
    name = '',
    orderList = [],
    currentValue = '',
    defaultValue = '',
    callback
  } = props;

  const [newValue, setValue] = useState(currentValue);

  useEffect(() => {
    setValue(currentValue);
  }, currentValue)

  const formatClass = (order) => {
    let keyValue = '';
    for(let key in order) {
      if(order[key] == newValue){
        keyValue = key;
      }
    }
    return keyValue;
  };

  const handleChange = (key, value) => {
    setValue(value);
    callback({key, value})
  };

  const formatValue = (order) => {
    if(formatClass(order) == 'down') return order['up'];
    return order['down'];
  };

  return <div styleName="order-box-wrap">
    <div styleName="order-item" onClick={() => handleChange(name, defaultValue)}>默认</div>
    {
      orderList.length > 0 &&
      orderList.map((item, index) => {
        return <div styleName="order-item" key={index} onClick={() => handleChange(name, formatValue(item.order))}>
          <span styleName={`name ${(formatClass(item.order) !== '') ? 'active' : ''}`}>{item.name}</span>
          <span styleName={`icon ${formatClass(item.order)}`}></span>
        </div>
      })
    }
  </div>
}