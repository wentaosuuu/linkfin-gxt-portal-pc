import React from 'react';
import './table.scss';
export default props => {
  const {
    showIndex,
    listData,
    columns,
    noDataText,
    pageNo,
    pageSize,
    createPdf = false
  } = props;

  const MatchColums = props => {
    const {
      rowData
    } = props;

    return <>
      {
        columns.map((item, index) => {
          const cellType = typeof item.key;
          return <td key={index}>{
            cellType === 'function' ?
              <MatchCell index={index} rowData={rowData} renderFuntion={item.key} />
              :
              rowData[item.key]
          }</td>;
        })
      }
    </>
  };

  const MatchCell = props => {
    const {
      index,
      rowData,
      renderFuntion
    } = props;
    return <>
      {renderFuntion(rowData, index)}
    </>
  }

  return <table styleName={createPdf ? "pdf-table-wrap table-wrap" : 'table-wrap'}>
    <thead>
      <tr>
        {
          showIndex ? <td width="60px">序号</td> : <></>
        }
        {
          columns.map((item, index) => <td key={index} {...item.attr}>{item.name}</td>)
        }
      </tr>
    </thead>
    <tbody>
      {
        listData.map((item, index) => {
          return <tr key={index}>
            {
              showIndex ? <td>{pageSize * (pageNo - 1) + (index + 1)}</td> : <></>
            }
            {
              <MatchColums rowData={item} />
            }
          </tr>
        })
      }
    </tbody>
  </table>
}
