import React, { useState } from 'react';
import moment from 'moment';
import Table from './table';
import MergeTable from './mergeTable';
import PageNavgation from './pageNavgation';
import './index.scss';

/**
   * 信用报告表格组件说明：
   * @props {String} title 标题，默认空
   * @props {String} type 表格类型，默认空，空渲染普通表格，mergeTable则渲染合并单元格表格
   * @props {Boolean} showIndex 是否显示序号，默认显示
   * @props {Boolean} showTotal 是否显示总条数，默认显示
   * @props {Array} listData 表格全部数据，默认空数组
   * @props {Array} listColumns 表格列选项，默认空数组
   * @props {Number} pageNum 显示第几页，默认1
   * @props {Number} pageSize 每一页显示条数，默认10
   * @props {String} dataSource 数据来源，默认国家信用信息公示系统
   * 其他说明：因信用报告接口返回全部的数据，分页的回调在组件侧完成
   * 
   * 调用示例：
      const listData = [
        { 
          column1: 'column1',
          column2: 'column2',
          column3: 'column3',
        },
        {
          column1: 'column1',
          column2: 'column2',
          column3: 'column3',
        }
      ];
      const listColumns = [
        {
          name: '列一',
          key: 'column1',
          attr: {
            width: '150px',
          }
        },
        {
          name: '列二',
          key: 'column2',
          attr: {
            width: '180px',
          }
        },
        {
          name: '列三',
          key: 'column3',
          attr: {
            width: '80px',
          }
        },
      ];
      <TableReport
        title="标题"
        listData={listData}
        listColumns={listColumns}
      />
   */

export default props => {
  // console.log(props, 888)
  let {
    showfoot = true,
    title,
    type,
    showIndex = true,
    showTotal = true,
    listData = [],
    listColumns = [],
    pageNum = 1,
    pageSize = 10,
    dataSource = '国家信用信息公示系统',
    createPdf = false, //是否
    // noDataText = `截止${}，未查询到相关信息。不排除因信息公开来源尚未公开、公开形式存在差异等情况导致的信息与客观事实不完全一致的情形。仅供参考。`
    time,
    style = {}
  } = props;
  showTotal = createPdf ? false : showTotal;
  const noDataText = `截止${moment(time).format('YYYY年MM月DD日')}，未查询到相关信息。不排除因信息公开来源尚未公开、公开形式存在差异等情况导致的信息与客观事实不完全一致的情形。仅供参考。`;

  const [pageNo, setPageNo] = useState(pageNum);
  const [startAt, setStartAt] = useState(pageSize * (pageNo - 1));
  const [endAt, setEndAt] = useState(pageSize * (pageNo - 1) + pageSize);
  const totalRecord = listData ? listData.length : 0;

  const getList = (pageNo) => {
    setPageNo(pageNo);
    setStartAt(pageSize * (pageNo - 1));
    setEndAt(pageSize * (pageNo - 1) + pageSize)
  }
  return <div styleName={createPdf ? 'pdf-table-report-wrap table-report-wrap' : 'table-report-wrap'} style={style}>
    {title && <div styleName="title">
      <h3>{title}</h3>
      {showTotal && <span>{totalRecord}</span>}
    </div>}
    {
      type === 'mergeTable' ?
        listData && listData.length > 0 ?
          <>
            <MergeTable
              dataSource={listData}
              columns={listColumns}
              createPdf={createPdf}
            />
            {showfoot && <div styleName="source" style={{ color: createPdf && '#333' }}>
              数据来源：<a style={{ color: createPdf && '#333' }}>{dataSource}</a>
            </div>}
          </>
          :
          <p styleName="no-data">{noDataText}</p>
        :
        listData && listData.length > 0 ?
          <>
            <Table
              showIndex={showIndex}
              listData={createPdf ? listData : listData.slice(startAt, endAt)}
              columns={listColumns}
              noDataText={noDataText}
              pageNo={pageNo}
              pageSize={pageSize}
              createPdf={createPdf}
            />
            <div styleName="bottom">
              <div styleName="source" style={{ color: createPdf && '#333' }}>
                数据来源：<a style={{ color: createPdf && '#333' }}>{dataSource}</a>
              </div>
              {!createPdf && <div styleName="pageNavgation">
                <PageNavgation
                  pageNo={pageNo}
                  pageSize={pageSize}
                  totalRecord={totalRecord}
                  setPageNo={getList}
                />
              </div>}
            </div>
          </>
          :
          <p styleName="no-data">{noDataText}</p>
    }
  </div >
}