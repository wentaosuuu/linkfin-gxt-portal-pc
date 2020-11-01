import React, { useState, useEffect } from 'react';
import Button from "@src/components/button";
import './index.scss';
const defaultImg = require('@src/assets/img/jinrongLog.png');

export default props => {
  const { infos } = props;

  return <div styleName="product-list-item">
    <div styleName="item-brand">
      <img src={infos.logoFilePath ? `${infos.logoFilePath}` : defaultImg} alt={infos.productName}/>
      <div styleName="item-brand-text">{infos.productName}</div>
    </div>
    <div styleName="item-infos">
      <ul>
        <li>
          <i></i>
          <span>贷款额度：</span>
          <span>{infos.loanLimit}</span>
        </li>
        <li>
          <i></i>
          <span>贷款期限：</span>
          <span>{infos.lengthOfMaturity}</span>
        </li>
        <li>
          <i></i>
          <span>贷款利率：</span>
          <span>{infos.rateStart}%-{infos.rateEnd}%</span>
        </li>
        <li>
          <i></i>
          <span>担保方式：</span>
          <span>{infos.guarantyStyle}</span>
        </li>
        <li>
          <i></i>
          <span>还款方式：</span>
          <span>{infos.paymentMethod}</span>
        </li>
      </ul>
    </div>
    <div styleName="item-btns">
      <Button shadow href={`/products/details/${infos.id}`}>查看详情</Button>
    </div>
  </div>
}
