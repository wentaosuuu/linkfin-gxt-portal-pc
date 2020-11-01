import React from 'react';
import './index.scss';

export default props => {
  const { productData = {} } = props;
  
  return <div styleName="item-wrap">
    <div styleName="img-box" title={productData && productData.title}>
      <img src={productData && productData.topImage} />
      <div>
        <h3>{productData.productName || "-"}</h3>
        <p>服务机构：{productData.financialInstitutionsName || "-"}</p>
      </div>
    </div>
    <div styleName="item-content">
      <div>
        <p>贷款额度：{productData.loanLimit || "-"}</p>
        <p>贷款期限：{productData.lengthOfMaturity || "-"}</p>
        <p>贷款利率：{(parseFloat(productData.rateStart)!=NaN || parseFloat(productData.rateEnd)!=NaN) ? `${productData.rateStart}%-${productData.rateEnd}%` : "-"}</p>
        <p>担保方式：{productData.guarantyStyle || "-"}</p>
        <p>还款方式：{productData.paymentMethod || "-"}</p>
      </div>
      <a href={`products/details/${productData.id}`}>立即申请</a>
    </div>
  </div>
}