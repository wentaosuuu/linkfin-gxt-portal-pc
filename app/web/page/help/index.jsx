import React, { Component, useState, useEffect, useRef } from 'react';
import Layout from '@src/components/layout/index';
import Popup from '@src/components/popup';
import './styles/index.scss';

export default function Policy(props) {
  const { getContactInfo, helpData = [], title, productList } = props;
  const headerData = { isHome: false, menuIndex: 6, tabIndex: 1, contactInfo: getContactInfo };
  const [moreText, setMoreText] = useState("");
  const [popupEl, updatePopup] = useState(null);
  const option = {
    canClickClose: true,
    showCloseBtn: true
  }
  function filterAnswer(text = "") {
    const reg = /<p(([\s\S])*?)<\/p>/g;
    const result = text.match(reg);
    let el = text;
    if (result.length > 1) {
      el = `${result[0]}<em>...</em>`;
    }
    return el;
  }
  // function moreClick(text) {
  //   setMoreText(text);
  //   popupEl.setDisplay(true);
  // }
  return (
    <Layout footerData={getContactInfo} headerData={headerData} title={title} menuData={productList}>
      <div styleName="helper">
        <img styleName="banner" src={require('@src/assets/img/news/banner_0.jpg')} />
        <div styleName="container">
          <div styleName="title">
            <h3>常见问题</h3>
            <i></i>
            <p>FREQUENTLY ASKED QUESTIONS</p>
          </div>
          <ul styleName="content">
            {
              helpData.map((v, i) => {
                const text = filterAnswer(v.answer);
                return <li key={i}>
                  <p styleName="question"><i></i>{v.question}</p>
                  <div styleName="answer">
                    <i></i>
                    <div styleName="a1">
                      <div styleName="html" dangerouslySetInnerHTML={{ __html: v.answer }}></div>
                      {/* <div styleName="more" style={{ display: text == v.answer ? 'none' : 'block' }} onClick={moreClick.bind(this, v.answer)}>查看更多>></div> */}
                    </div>
                  </div>
                </li>
              })
            }
          </ul>
        </div>
        <Popup ref={el => updatePopup(el)} option={option}>
          <div styleName="popup-body">
            <h3>查看详情</h3>
            <div dangerouslySetInnerHTML={{ __html: moreText }}></div>
          </div>
        </Popup>
      </div>
    </Layout>
  )
};
