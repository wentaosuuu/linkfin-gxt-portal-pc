import React, { useState, useEffect, useRef } from 'react';
import './index.scss';
const titleLineHeight = 24;
const pLineHeight = 24;

export default props => {
  const { data } = props;
  // const [ellipsis, setEllipsis] = useState([]);
  let ref = {};
  for (let i = 0; i < data.length; i++) {
    ref['title-' + i] = useRef();
    ref['brief-' + i] = useRef();
    // ref['p-' + i] = useRef();
  }

  // let text = "通过从后向前逐个删除末尾字符，直至元素的高度小于父元素高度，到达效果，这种方法可以兼容各种浏览器哈哈哈";
  // console.log(text.replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, '...'))

  useEffect(() => {
    // let arr = [];
    for (let i = 0; i < data.length; i++) {
      let titleLineRows = ref['title-' + i].current.clientHeight / titleLineHeight; // 标题行数
      ref['brief-' + i].current.style['-webkit-line-clamp'] = 5 - titleLineRows;
      ref['brief-' + i].current.style['height'] = (5 - titleLineRows) * pLineHeight + 'px';
      // console.log(titleLineRows)
      // let pRows = ref['p-' + i].current.clientHeight / 24; // 内容行数
      // console.log(titleLineRows, pRows)
      // if ((pRows + titleLineRows) > 5) {
      //   arr[i] = true;
      // } else {
      //   arr[i] = false;
      // }
      // console.log(pRows)
      // if(pRows>3) {
      //   ref['p-' + i].current.style.color = '#f00'
      // }
    }
    // console.log(ellipsis)
    // console.log(arr)
    // setEllipsis(arr);
    // console.log(ellipsis)
  }, []);

  return <div styleName="news-wrap">
    <div className="title">
      <h4>行业资讯</h4>
      <a href="/info?type=2">更多</a>
    </div>
    <ul>
      {
        data.map((d, i) => {
          // const detailsStyles = ['details'];
          return <li key={i}>
            <a styleName="link" href={`/info/detail/${d.id}?type=2`}>
              <div styleName="image">
                <img src={d.topImage} />
              </div>
              <div styleName="content">
                <h3 ref={ref['title-' + i]}>{d.title}</h3>
                <div styleName="info">
                  <span>{d.sourceUrl}</span>
                  <span styleName="time">{d.issueTime}</span>
                </div>
                {/* <div styleName="details ellipsis">
                  <p ref={ref['p-' + i]}>{d.infoTopContent}</p>
                </div> */}
                <p styleName="brief" ref={ref['brief-' + i]}>{d.infoTopContent}</p>
              </div>
            </a>
          </li>;
        })
      }
    </ul>
  </div>
}