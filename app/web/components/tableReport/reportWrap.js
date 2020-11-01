import React, { useState } from 'react';
import './index.scss';

export default props => {
  let {
    style,
    title,
    showTotal = true,
    totalRecord = 0,
    showfoot = true,
    createPdf = false, //是否
    dataSource = '国家信用信息公示系统',
  } = props;
  return <div styleName={createPdf ? 'table-report-wrap pdf-table-report-wrap' : "table-report-wrap"} style={style}>
    {title && <div styleName="title">
      <h3>{title}</h3>
      {showTotal && !createPdf && <span>{totalRecord}</span>}
    </div>}
    {props.children}
    {showfoot && <div styleName="source" style={{ color: createPdf && '#333' }}>
      数据来源：<a style={{ color: createPdf && '#333' }}>{dataSource}</a>
    </div>}
  </div>
}
