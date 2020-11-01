import React, {useState, useEffect, useRef} from 'react';
import './index.scss';


export default props => {
  const {
    duration,
    children
  } = props;

  return <div styleName="scroll-box">
    <div styleName="list-wrap">
      {children}
    </div>
  </div>
}