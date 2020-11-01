import React, { Component } from "react";
import Table from './table';
import './index.scss';

const columns = [{
  name: '验证规则',
  key: 'title',
  attr: {
    width: '350px',
  }
}, {
  name: '权重',
  key: 'weight'
}, {
  name: '结果',
  key: d => {
    return <span style={{ color: d.result === '是' ? '#2C97DE' : '#333' }}>{d.result}</span>
  }
}];

const splitNum = 2;

class RuleHitResult extends Component {
  static defaultProps = {
    index: 0,
    createPdf: false
  }
  render() {
    const { ruleHitResultDTOList, index, createPdf } = this.props;
    // console.log(ruleHitResultDTOList, 77)
    return <div styleName="rule-hit-result-wrap">
      {
        ruleHitResultDTOList.map((d, i) => {
          return <div styleName="item" key={i}>
            <h3 styleName={createPdf ? 'h3-pdf' : ""}>
              {!createPdf ? `${index + 1}.4.${i + 1}` : `${index}.${i + 1}`}{d.title}验证结果
              {/* {index + 1}.{4}.{i + 1}{d.title}验证结果 */}
            </h3>
            <Table
              splitNum={splitNum}
              columns={columns}
              listData={d.list}
              createPdf={createPdf}
            />
          </div>
        })
      }
    </div >
  }
}

export default RuleHitResult;
