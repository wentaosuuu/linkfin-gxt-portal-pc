import React, { Component } from "react";
import './index.scss';

class RuleHitStatistics extends Component {
  render() {
    const { ruleHitStatisticsDTOList } = this.props;
    return <div styleName="rule-hit-statistics-wrap">
      {
        ruleHitStatisticsDTOList.map((d, i) => {
          return <div styleName="rule-item" key={i}>
            <div styleName="summary">
              <h3>{d.title}风险提醒</h3>
              <p>命中数：<i>{d.hitList.length}</i></p>
              <p>本模块策略建议：
                {
                  d.strategySuggestion === 0 ?
                    <strong styleName="refuse">拒绝</strong> :
                    d.strategySuggestion === 1 ?
                      <strong styleName="pass">通过</strong> :
                      <strong styleName="review">复议</strong>}</p>
            </div>
            {(function () {
              let _tags = [];
              let _tags_1 = []; // 负面
              let _tags_2 = []; // 正面
              for (let i = 0; i < d.hitList.length; i++) {
                if (d.hitList[i].isPositive === 0) {
                  _tags_1.push(d.hitList[i]);
                } else if (d.hitList[i].isPositive === 1) {
                  _tags_2.push(d.hitList[i]);
                }
              }
              _tags = [].concat(_tags_2, _tags_1);
              if (_tags.length === 0) return null;
              return <div styleName="labels">
                {_tags.map((c, a) => {
                  return <p key={a}>
                    <span styleName={c.isPositive === 0 ? 'red' : 'green'}>{c.title}</span>
                  </p>
                })}
              </div>
            })()}

          </div>
        })
      }
    </div>
  }
}

export default RuleHitStatistics;
