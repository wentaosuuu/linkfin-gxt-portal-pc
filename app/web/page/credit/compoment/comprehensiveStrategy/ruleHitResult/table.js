import React, { useState, useEffect } from 'react';
import './table.scss';
export default props => {
  const {
    listData,
    columns,
    splitNum,
    createPdf
  } = props;

  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    const perLength = Math.ceil(listData.length / splitNum);
    const addLength = perLength * splitNum - listData.length;
    const _dataList = [];
    for (var i = 0; i < splitNum; i++) {
      _dataList.push(listData.slice(perLength * i, perLength * i + perLength));
    }
    if (addLength > 0) {
      for (var i = 0; i < addLength; i++) {
        _dataList[_dataList.length - 1].push({});
      }
    }
    // console.log(perLength, addLength)
    // console.log(_dataList)
    setDataList(_dataList);
  }, []);

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
              <MatchCell rowData={rowData} renderFuntion={item.key} />
              :
              rowData[item.key]
          }</td>;
        })
      }
    </>
  };

  const MatchCell = props => {
    const {
      rowData,
      renderFuntion
    } = props;
    return <>
      {renderFuntion(rowData)}
    </>
  }

  // console.log(dataList)
  return <div styleName={createPdf ? "table-wrap table-wrap-pdf" : "table-wrap"} >
    {
      dataList.map((d, i) => {
        return <table key={i}>
          <thead>
            <tr>
              {
                columns.map((item, index) => <th key={index} {...item.attr}>{item.name}</th>)
              }
            </tr>
          </thead>
          <tbody>
            {
              d.map((item, index) => {
                return <tr key={index}>
                  {<MatchColums rowData={item} />}
                </tr>
              })
            }
          </tbody>
        </table>
      })
    }
  </ div>
}