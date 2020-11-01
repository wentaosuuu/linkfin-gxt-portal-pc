import React, { useState, useEffect, useRef } from 'react';
import './index.scss';
import star0 from '@src/assets/img/service/star0.png';
import star1 from '@src/assets/img/service/star1.png';
import star2 from '@src/assets/img/service/star2.png';

export default props => {
  const { data } = props;
  return <div styleName="server-ranking-wrap">
    <div className="title">
      <h4>服务排行</h4>
      <a href="/finance">更多</a>
    </div>
    <ul>
      {
        data.slice(0, 8).map((d, i) => {
          const serviceRating = d.serviceRating || '5';
          const stars = {
            yellow: new Array(parseInt(serviceRating)).fill(1),
            harfYellow: serviceRating % 1 > 0 ? new Array(1).fill(1) : new Array(0),
            grey: new Array(Math.floor(5 - serviceRating)).fill(1)
          };
          return <li key={i}>
            <a href={`/finance/details/${d.id}`} styleName="link">
              <img src={require(`@src/assets/img/service/${i + 1}.png`)} />
              <span styleName="company">{d.financialInstitutionsName}</span>
              <div styleName="stars">
                {
                  stars.yellow.map((d, i) => {
                    return <img key={i} src={star1} />;
                  })
                }
                {
                  stars.harfYellow.map((d, i) => {
                    return <img key={i} src={star2} />;
                  })
                }
                {
                  stars.grey.map((d, i) => {
                    return <img key={i} src={star0} />;
                  })
                }
              </div>
            </a>
          </li>;
        })
      }
    </ul>
  </div>
}