import React from 'react';
import './index.scss';
export default props => {

  const {
    showIndex,
    listData,
    columns,
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

  return <table styleName="table-wrap">
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
              showIndex ? <td>{index + 1}</td> : <></>
            }
            {<MatchColums rowData={item} />}
          </tr>
        })
      }
    </tbody>
  </table>
}