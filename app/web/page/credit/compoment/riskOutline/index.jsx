import React, { Component } from "react";
import TableReport from '@src/components/tableReport/index';
import MergeTable from '@src/components/tableReport/mergeTable';

class RiskOutline extends Component {
  static defaultProps = {
    createPdf: false
  }
  constructor(props) {
    super(props);
    const {
      compRiskFirst, // 企业风险
      compHumanRiskFirst, // 企业主风险
    } = this.props.riskProfileGxtRpVO;
    this.compRiskFirstColumns = [ // 企业风险
      {
        title: '风险分类',
        dataIndex: 'name',
        render: (value, row, index) => {
          const obj = {
            content: value,
            span: {
              rowSpan: row.colSpan_name,
            }
          };
          return obj;
        }
      },
      {
        title: '风险总数',
        dataIndex: 'count',
        render: (value, row, index) => {
          const obj = {
            content: value,
            span: {
              rowSpan: row.colSpan_count
            }
          };
          return obj;
        }
      },
      {
        title: '标题',
        dataIndex: 'title',
        render: (value, row, index) => {
          const obj = {
            content: value,
            span: {
              rowSpan: row.colSpan_title
            }
          };
          return obj;
        }
      },
      {
        title: '总数',
        dataIndex: 'total',
        render: (value, row, index) => {
          const obj = {
            content: value,
            span: {
              rowSpan: row.colSpan_total
            }
          };
          return obj;
        }
      },
      {
        title: '风险标签',
        dataIndex: 'tag',
      },
      {
        title: '内容',
        dataIndex: 'contont',
        width: '500px',
      },
      {
        title: '描述',
        dataIndex: 'description',
      },
      {
        title: '类型',
        dataIndex: 'type',
      },
      {
        title: '数量',
        dataIndex: 'riskCount',
      },
    ];
    this.compHumanRiskFirstColumns = [ // 企业主风险
      {
        title: '人名',
        dataIndex: 'humanName',
        render: (value, row, index) => {
          const obj = {
            content: value,
            span: {
              rowSpan: row.colSpan_humanName,
            }
          };
          return obj;
        }
      },
      {
        title: '风险标签',
        dataIndex: 'name',
        render: (value, row, index) => {
          const obj = {
            content: value,
            span: {
              rowSpan: row.colSpan_name
            }
          };
          return obj;
        }
      },
      {
        title: '风险总数',
        dataIndex: 'count',
        render: (value, row, index) => {
          const obj = {
            content: value,
            span: {
              rowSpan: row.colSpan_count
            }
          };
          return obj;
        }
      },
      {
        title: '内容',
        dataIndex: 'title',
        width: '500px',
      },
      {
        title: '描述',
        dataIndex: 'description',
      },
      {
        title: '企业名',
        dataIndex: 'companyName',
        width: '200px',
      },
      {
        title: '类型',
        dataIndex: 'type',
      },
      {
        title: '数量',
        dataIndex: 'riskCount',
      },
    ];
    this.compRiskFirst = compRiskFirst || [];
    this.compHumanRiskFirst = compHumanRiskFirst || [];
    this.dataFormat(this.compRiskFirst, ['name', 'count', 'title', 'total']);
    this.dataFormat(this.compHumanRiskFirst, ['humanName', 'name', 'count', 'total']);
  }

  dataFormat(data = [], typeArr = [], drop = 0) {
    let temp = [];
    let keysObj = {};
    const keys = typeArr[drop];
    const hasDrop = typeArr.length - 1 > drop;
    data.map((item, index) => {
      const isFirst = keysObj[item[keys]] == undefined; // 值是否第一次出现
      if (isFirst) {
        keysObj[item[keys]] = {};
        keysObj[item[keys]].keys = keys;
        keysObj[item[keys]].start = index;
        keysObj[item[keys]].total = 1;
      } else {
        keysObj[item[keys]].total += 1;
      }
      item[`colSpan_${keys}`] = 0;
      // index不为0，意味着不是起始位置，已经有合并项，且有下个待合并的数据
      if (isFirst && index && hasDrop) { // 某个值第一次出现且非第一条数据且层级不是最深
        this.dataFormat(temp, typeArr, drop + 1);
        temp = [];
      } else if (index == data.length - 1 && hasDrop) { // 最后一条且层级不是最深
        temp.push(item);
        this.dataFormat(temp, typeArr, drop + 1);
        temp = [];
        return;
      }
      temp.push(item);
    });
    for (let key in keysObj) {
      const { keys, start, total } = keysObj[key];
      data[start][`colSpan_${keys}`] = total;
    }
    return data;
  }

  render() {
    const { mainNo, index } = this.props;
    const _mainNo = this.props.createPdf ? `${mainNo}` : `${index + 1}`;
    return <div>
      <TableReport
        title={`${_mainNo}.1企业风险`}
        showTotal={false}
        type="mergeTable"
        listData={this.compRiskFirst}
        listColumns={this.compRiskFirstColumns}
        time={this.props.time}
        createPdf={this.props.createPdf}
      />
      <TableReport
        title={`${_mainNo}.2企业主风险`}
        showTotal={false}
        type="mergeTable"
        listData={this.compHumanRiskFirst}
        listColumns={this.compHumanRiskFirstColumns}
        time={this.props.time}
        createPdf={this.props.createPdf}
      />
    </div>
  }
}

// function handleArr(arr, key, subKey) {
//   var map = {}, dest = [];
//   for (var i = 0; i < arr.length; i++) {
//     var ai = arr[i];
//     if (!map[ai[key]]) {
//       dest.push({
//         [key]: ai[key],
//         data: [ai]
//       });
//       map[ai[key]] = ai;
//     } else {
//       for (var j = 0; j < dest.length; j++) {
//         var dj = dest[j];
//         if (dj[key] == ai[key]) {
//           dj.data.push(ai);
//           break;
//         }
//       }
//     }
//   }
//   return dest;
// }

export default RiskOutline;
