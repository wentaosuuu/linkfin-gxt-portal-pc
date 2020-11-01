import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './index.scss';

export default props => {

  const initValue = _.merge({
    name: 'gxtModal',
    visible: false,
    children: '',
    customClass: '',
    title: '提示',
    style: {
      zIndex: 1000,
      color: "#333"
    },
    mask: true,
    confirmText: '确定',
    cancelText: '取消',
  }, props);

  useEffect(() => {
    
  }, []);

  const close = () => {
    initValue.visible = false;
    console.log(initValue);
  };
  const open = () => {
    initValue.visible = open;
  }
  const handleComfirm = () => {

  } 

  return <div styleName={`gxt-modal ${initValue.visible ? 'visible' : ''}`} style={initValue.style}>
    <div styleName={`gxt-modal-mask ${initValue.mask ? 'active' : '' }`}></div>
    <div styleName={`gxt-modal-wrap ${initValue.customClass}`}>
      <div styleName="gxt-modal-box">
        <div styleName="gxt-modal-header">
          <div styleName="title">{initValue.title}</div>
          <span onClick={close} styleName="icon-close"></span>
        </div>
        <div styleName="gxt-modal-content">
          {initValue.children}
        </div>
        <div>
          <button>{initValue.confirmText}</button>
          <button>{initValue.cancelText}</button>
        </div>
      </div>
    </div>
  </div>
}