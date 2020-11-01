import React, { Component } from "react";
import echarts from "echarts";
import ComprehensiveCredit from './comprehensiveCredit';
import IndustryRanking from './industryRanking';
import RuleHitStatistics from './ruleHitStatistics';
import RuleHitResult from './ruleHitResult';
import "./index.scss";

class ComprehensiveStrategy extends Component {
  render() {
    const { index, comprehensiveStrategyRpVO } = this.props;
    const {
      industryRankingDTO, // 行业排名
      comprehensiveCreditDTO, // 综合信用
      ruleHitResultDTOList, // 规则命中结果
      ruleHitStatisticsDTOList, // 规则命中统计
    } = comprehensiveStrategyRpVO;
    return <div styleName="comprehensive-strategy-wrap">
      <div styleName="item">
        <h2>{index + 1}.1综合信用</h2>
        <ComprehensiveCredit comprehensiveCreditDTO={comprehensiveCreditDTO} />
      </div>
      <div styleName="item">
        <h2>{index + 1}.2行业排名情况</h2>
        <IndustryRanking industryRankingDTO={industryRankingDTO} />
      </div>
      <div styleName="item">
        <h2>{index + 1}.3规则命中统计</h2>
        <div styleName="remark">备注：评分高于等于85分，模块建议为通过；评分为84.99-60，模块建议为复议；评分为60分以下，模块建议为拒绝。</div>
        <RuleHitStatistics ruleHitStatisticsDTOList={ruleHitStatisticsDTOList} />
      </div>
      <div styleName="item">
        <h2>{index + 1}.4企业规则验证结果</h2>
        <RuleHitResult ruleHitResultDTOList={ruleHitResultDTOList} index={index} />
      </div>
    </div>;
  }
}

export default ComprehensiveStrategy;
