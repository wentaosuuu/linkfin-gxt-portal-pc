import React from 'react';
import './index.scss';

export default props => {
  const { infoData = [{}], titles, type } = props;

  return <div styleName="item-wrap">
    <div styleName="title">
      <h3>{titles[0]}</h3>
      <span>{titles[1]}</span>
    </div>
    <div styleName="img-box" title={infoData[0] && infoData[0].title}>
      <a href={`info/detail/${infoData[0].id}?type=${type}`}>
        <img src={infoData[0] && infoData[0].topImage} />
        <div>{infoData[0] && infoData[0].title}</div>
      </a>
    </div>
    <ul styleName="list">
      {
        infoData.map((v, i) => {
          if (i > 0)
            return <li title={v.title} key={i}><a href={`info/detail/${v.id}?type=${type}`}><i></i><span>{v.title}</span></a></li>;
          return;
        })
      }
    </ul>
    <div styleName="more">
      <a href={`info?type=${type}`}>更多>></a>
    </div>
  </div>
}
