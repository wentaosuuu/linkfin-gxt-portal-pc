import React, { useState, useEffect, useRef, createRef } from 'react';
import Html from './default.jsx';
import Footer from '../footer';
import Header from '../header';
import Alert from '@src/components/alert';

export default props => {
  const { footerData, title, headerData, showMenu, menuData } = props;

  return (
    <Html title={title} className="layout">
      <Header headerData={headerData} showMenu={showMenu} menuData={menuData} className="header" />
      <div className="content">{props.children}</div>
      <Footer footerData={footerData} className="footer" />
    </Html>
  );
};
