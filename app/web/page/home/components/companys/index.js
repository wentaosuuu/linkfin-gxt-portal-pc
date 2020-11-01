import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import './index.scss';

export default props => {
  return <div styleName="companys-wrap">
    <div className="title" styleName="title">
      <h4>合作机构</h4>
    </div>
    <div styleName="logos">
      <img src={require('@src/assets/img/logo/gongshang.png')} />
      <img src={require('@src/assets/img/logo/nongye.png')} />
      <img src={require('@src/assets/img/logo/zhongguo.png')} />
      <img src={require('@src/assets/img/logo/jianshe.png')} />
      <img src={require('@src/assets/img/logo/jiaotong.png')} />
      <img src={require('@src/assets/img/logo/youchu.png')} />
      <img src={require('@src/assets/img/logo/beibuwan.png')} />
      <img src={require('@src/assets/img/logo/guilin.png')} />
      <img src={require('@src/assets/img/logo/huaxia.png')} />
      <img src={require('@src/assets/img/logo/yirong.png')} />
    </div>
  </div>
}