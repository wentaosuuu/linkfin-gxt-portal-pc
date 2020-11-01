import React from 'react';
import '../../assets/iconfont/iconfont.css';
// import './index.scss';

export default props => {
  const { type = "", className = "", ...rest } = props;
  return <span className={`iconfont icon-${type} ${className}`} {...rest}></span>;
};
