import React, { Component } from "react";
import echarts from "echarts";
import { accMul } from "@src/helpers/math";
import "./index.scss";

class IndustryRanking extends Component {
  componentDidMount() {
    const { industryRankingDTO } = this.props;
    echarts
      .init(document.querySelector("#chart_1"))
      .setOption(monthlyPayroll(industryRankingDTO));
    echarts
      .init(document.querySelector("#chart_2"))
      .setOption(capitePayroll(industryRankingDTO));
    echarts
      .init(document.querySelector("#chart_3"))
      .setOption(projectNumber(industryRankingDTO));
  }

  render() {
    const d = this.props.industryRankingDTO.industryRiskDTO || {};
    return <div styleName="industry-ranking-wrap">
      <div styleName="risk-charts">
        <div styleName="chart-item">
          <div id="chart_1" styleName="chart"></div>
        </div>
        <div styleName="chart-item">
          <div id="chart_2" styleName="chart"></div>
        </div>
        <div styleName="chart-item">
          <div id="chart_3" styleName="chart"></div>
        </div>
      </div>
      <div styleName="risk-warn">
        <div styleName="summary">
          <h3>行业风险提醒</h3>
          <p>行业评分排名：<i>前{accMul(d.creditScoreRanking, 100)}%</i></p>
          <p>
            本模块策略建议：
            {
              d.suggestType === 0 ?
                <strong styleName="refuse">拒绝</strong> :
                d.suggestType === 1 ?
                  <strong styleName="pass">通过</strong> :
                  d.suggestType === 2 ?
                    <strong styleName="review">复议</strong> :
                    null
            }
          </p>
        </div>
        <p styleName="details">
          该企业
          {d.compQualifications && <span>建筑企业资质为{d.compQualifications}，资质水平区域内行业排名前<i>{accMul(d.compQualificationsRanking, 100)}%</i>。</span>}
          共承接了{d.projectCount}个建筑项目，其中{d.buildProjectCount}个在建项目，其余已竣工决算；
          {d.buildProjectCount}个在建项目中，{d.fjProjectCount}个房建类项目，{d.szProjectCount}个市政类项目。
          {d.ownerType && <span>其中房建类项目中，项目业主类型包括{d.ownerType}。</span>}
          企业近三月劳务工资代发人均{d.compAverageSalary}元，相较于行业平均代发额{d.industryAverageSalary}元，在有发薪记录的企业中，排名前<i>{accMul(d.compSalaryRanking, 100)}%</i>。
          行业总体排名前<i>{accMul(d.creditScoreRanking, 100)}%</i>。</p>
      </div>
    </div>;
  }
}

const monthlyPayroll = (data) => {
  const { lastSixMonthPaySalaryCompareDTO: d } = data;
  let lastSixMonth = [];
  let lastSixMonthIndustryList = [];
  let lastSixMonthCompanyList = [];
  if (d) {
    d.industryList &&
      d.industryList.forEach((item) => {
        lastSixMonth.push(`${item.month}月`);
        lastSixMonthIndustryList.push((item.salaryNum / 10000).toFixed(2));
      });
    d.companyList &&
      d.companyList.forEach((item) => {
        lastSixMonthCompanyList.push((item.salaryNum / 10000).toFixed(2));
      });
  }
  return {
    animation: false,
    title: {
      text: "近半年月发薪额行业对比",
      textStyle: {
        fontSize: 16,
        color: "#333",
        fontWeight: 'bolder'
      },
      textAlign: "left",
      top: "20",
      left: "20",
    },
    color: ["#439CF6", "#FC6B63"],
    legend: {
      show: true,
      top: "20",
      right: "10",
      itemWidth: 15,
      itemHeight: 8,
      orient: "vertical",
      textStyle: {
        color: "#999",
        fontSize: 11,
      },
    },
    grid: {
      left: "15%",
      right: "5%",
      top: "35%",
      bottom: "15%",
    },
    xAxis: {
      // name: "月份",
      type: "category",
      data: lastSixMonth,
      axisLine: {
        lineStyle: {
          color: "#999",
        },
      },
      axisTick: {
        lineStyle: {
          color: "#999",
        },
        alignWithLabel: true,
      },
      axisLabel: {
        fontSize: 12,
        color: "#999",
      },
    },
    yAxis: {
      name: "万元",
      type: "value",
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: "#999",
          align: "left"
        },
      },
      max: () => {
        let arr = [];
        lastSixMonthIndustryList.forEach(function (item) {
          arr.push(+item);
        });
        lastSixMonthCompanyList.forEach(function (item) {
          arr.push(+item);
        });
        return Math.ceil(Math.max(...arr) / 1000) * 1000;
      },
      nameTextStyle: {
        color: "#999",
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 12,
        color: "#999",
      },
    },
    tooltip: {
      show: true,
      formatter: (params) => {
        return `${params.seriesName}</br>${params.marker}&nbsp;${params.value}万元`;
      },
    },
    series: [
      {
        name: "当前企业月发薪额",
        data: lastSixMonthCompanyList,
        type: "line",
        lineStyle: {
          color: "#439CF6",
        },
      },
      {
        name: "行业平均月发薪额",
        data: lastSixMonthIndustryList,
        type: "line",
        lineStyle: {
          color: "#FC6B63",
        },
      },
    ],
  };
};

const capitePayroll = (data) => {
  const { averagePaySalaryCompareDTO: d } = data;
  let currentValue = (d && d.compAverageSalary) || 0;
  let industryValue = (d && d.industryAverageSalary) || 0;
  let month = (d && d.month) || '';
  return {
    animation: false,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: function (obj) {
        const params = obj[0];
        let str = `${params.name}</br>${params.marker}&nbsp;${params.value}元`;
        return str;
      },
    },
    title: {
      text: `近一个月人均发薪额行业对比（${month}月）`,
      textStyle: {
        fontSize: 16,
        color: "#333",
        fontWeight: 'bolder'
      },
      textAlign: "left",
      top: "20",
      left: "20",
    },
    grid: {
      left: "18%",
      right: "5%",
      top: "35%",
      bottom: "15%",
    },
    xAxis: {
      type: "category",
      data: ["当前企业人均发薪额", "行业人均发薪额"],
      boundaryGap: ["10%", "10%"],
      axisLabel: {
        fontSize: 10,
        color: "#999",
      },
      axisLine: {
        lineStyle: {
          color: "#999",
        },
      },
      axisTick: {
        lineStyle: {
          color: "#999",
        },
        alignWithLabel: true,
      },
    },
    yAxis: {
      name: "元          ",
      type: "value",
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: "#999",
        },
      },
      max: () => {
        return Math.ceil(Math.max(currentValue, industryValue) / 1000) * 1000;
      },
      splitNumber: 3,
      nameTextStyle: {
        color: "#999",
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 12,
        color: "#999",
      },
    },
    series: [
      {
        data: [
          {
            name: "当前企业人均发薪额",
            value: currentValue,
            itemStyle: {
              color: "#439CF6",
            },
          },
          {
            name: "行业人均发薪额",
            value: industryValue,
            itemStyle: {
              color: "#FC6B63",
            },
          },
        ],
        type: "bar",
        barWidth: "30",
      },
    ],
  };
};

const projectNumber = (data) => {
  const { buildProjectCountCompareDTO: d } = data;
  let compSzNumberArr = [
    (d && d.compFjNumber) || 0, // 企业房建项目数量
    (d && d.compSzNumber) || 0, // 企业市政项目数量
  ];
  let industryAverageArr = [
    (d && d.industryAverageFjNumber) || 0, // 行业平均房建项目数量
    (d && d.industryAverageSzNumber) || 0, // 行业平均市政项目数量
  ];
  return {
    animation: false,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: function (obj) {
        const params0 = obj[0];
        const params1 = obj[1];
        let str = `${params0.name}</br>${params0.marker}&nbsp;${params0.value}个</br>${params1.marker}&nbsp;${params1.value}个`;
        return str;
      },
    },
    title: {
      text: "承接项目数量行业比较",
      textStyle: {
        fontSize: 16,
        color: "#333",
        fontWeight: 'bolder'
      },
      textAlign: "left",
      top: "20",
      left: "20",
    },
    legend: {
      show: true,
      top: "20",
      right: "10",
      itemWidth: 11,
      itemHeight: 11,
      orient: "vertical",
      textStyle: {
        color: "#999",
        fontSize: 11,
      },
    },
    color: ["#439CF6", "#FC6B63"],
    grid: {
      left: "12%",
      right: "5%",
      top: "35%",
      bottom: "15%",
    },
    xAxis: {
      type: "category",
      data: ["房建类", "市政类"],
      axisLine: {
        lineStyle: {
          color: "#999",
        },
      },
      axisTick: {
        lineStyle: {
          color: "#999",
        },
        alignWithLabel: true,
      },
      axisLabel: {
        fontSize: 11,
        color: "#999",
      },
    },
    yAxis: {
      name: "个          ",
      type: "value",
      minInterval: 1,
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: "#999",
        },
      },
      splitNumber: 3,
      nameTextStyle: {
        color: "#999",
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 12,
        color: "#999",
      },
    },
    series: [
      {
        name: "当前企业项目数",
        data: compSzNumberArr,
        type: "bar",
        barWidth: "30",
      },
      {
        name: "行业平均项目数",
        data: industryAverageArr,
        type: "bar",
        barWidth: "30",
      },
    ],
  };
};

export default IndustryRanking;
