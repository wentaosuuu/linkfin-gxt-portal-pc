import React, { useState, useEffect } from 'react';
import Icon from '@src/components/icon';
import './index.scss';

export default props => {
  const { hrefs } = props;
  return <div styleName="bread-crumps">
    {
      hrefs.map((item, index) => {
        let href = item.href;
        const flag = typeof href == 'function';
        function handle() {
          href();
        }
      return <div key={index} styleName="bread">
        {
          flag ? <p styleName={index + 1 == hrefs.length ? 'active' : ''} onClick={handle}>{item.name}</p> :
          <a styleName={index + 1 == hrefs.length ? 'active' : ''} href={href}>{item.name}</a>
        }
        <Icon type="sanjiaoleft" styleName={index + 1 == hrefs.length ? 'hidden' : 'ico'}></Icon>
    </div>})
    }
  </div>
}