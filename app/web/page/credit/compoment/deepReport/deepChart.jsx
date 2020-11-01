import React, { Component } from "react";
import "./styles/deepChart.scss";
import echarts from "echarts";

class DeepChart extends Component {
  state = {};
  componentDidMount() {
    const { chartData } = this.props;
    // echarts
    //   .init(document.querySelector("#chart1"))
    //   .setOption(monthlyPayroll(chartData));
    // echarts
    //   .init(document.querySelector("#chart2"))
    //   .setOption(capitePayroll(chartData));
    // echarts
    //   .init(document.querySelector("#chart3"))
    //   .setOption(projectNumber(chartData));
    echarts
      .init(document.querySelector("#chart4"))
      .setOption(projectType(chartData));
    echarts
      .init(document.querySelector("#chart5"))
      .setOption(turnkeyProject(chartData));
    echarts
      .init(document.querySelector("#chart6"))
      .setOption(ownerProject(chartData));
  }
  render() {
    return (
      <div styleName="container">
        <div styleName="chart">
          {/* <div styleName="row">
            <div styleName="chart-item">
              <div id="chart1" styleName="chart"></div>
            </div>
            <div styleName="chart-item">
              <div id="chart2" styleName="chart"></div>
            </div>
            <div styleName="chart-item">
              <div id="chart3" styleName="chart"></div>
            </div>
          </div> */}
          <div styleName="row">
            <div styleName="chart-item">
              <div id="chart4" styleName="chart"></div>
            </div>
            <div styleName="chart-item">
              <div id="chart5" styleName="chart"></div>
            </div>
            <div styleName="chart-item">
              <div id="chart6" styleName="chart"></div>
            </div>
          </div>
        </div>
        <p styleName="tip">数据来源：住建厅桂建通平台</p>
      </div>
    );
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
      text: "近一个月人均发薪额行业对比",
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

const projectType = (data) => {
  const { compBuildProjectTypeCountCompareDTO: d } = data;
  // console.log(d);
  let arr = [
    {
      name: "市政类占比",
      value: (d && d.szCount) || 0,
    },
    {
      name: "房建类占比",
      value: (d && d.fjCount) || 0,
    },
  ];
  // console.log(arr);
  return {
    animation: false,
    title: {
      text: "企业承接项目类型比例",
      textStyle: {
        fontSize: 16,
        color: "#333",
        fontWeight: "bolder"
      },
      textAlign: "left",
      top: "20",
      left: "20",
    },
    color: ["#6868FE", "#FECC4E"],
    legend: {
      show: false,
      x: "left",
      top: "10%",
      left: "20%",
      itemWidth: 20,
      itemHeight: 10,
      data: ["房建类占比", "市政类占比"],
    },
    label: {
      position: "outside",
      align: "center",
      formatter: ["{tit|{b}}", "{value|{d}%}"].join("\n"),
      rich: {
        tit: {
          color: "#666",
          fontSize: 13,
          align: "center",
        },
        value: {
          fontSize: 16,
          align: "center",
        },
      },
    },
    series: [
      {
        top: "5%",
        bottom: "-15%",
        type: "pie",
        radius: ["25%", "50%"],
        labelLine: {
          show: false,
          length: 8,
          length2: 8,
        },
        data: arr,
      },
    ],
  };
};

const turnkeyProject = (data) => {
  const { projectCategoryDTO: d } = data;
  let arr = [
    {
      name: "国有项目占比",
      value: (d && d.sgSzGovCount) || 0,
    },
    {
      name: "民营项目占比",
      value: (d && d.sgSzPrivateCount) || 0,
    },
  ];
  return {
    animation: false,
    title: {
      text: "总包单位类型占比（市政类）",
      textStyle: {
        fontSize: 16,
        color: "#333",
        fontWeight: "bolder"
      },
      textAlign: "left",
      top: "20",
      left: "20",
    },
    color: ["#6868FE", "#FECC4E"],
    legend: {
      show: false,
      x: "left",
      top: "10%",
      left: "20%",
      itemWidth: 20,
      itemHeight: 10,
      data: ["国有项目占比", "民营项目占比"],
    },
    label: {
      position: "outside",
      align: "center",
      formatter: ["{tit|{b}}", "{value|{d}%}"].join("\n"),
      rich: {
        tit: {
          color: "#666",
          fontSize: 13,
          align: "center",
        },
        value: {
          fontSize: 16,
          align: "center",
        },
      },
    },
    series: [
      {
        top: "5%",
        bottom: "-15%",
        type: "pie",
        radius: ["25%", "50%"],
        labelLine: {
          show: false,
          length: 8,
          length2: 8,
        },
        data: arr,
      },
    ],
  };
};

const ownerProject = (data) => {
  const { projectCategoryDTO: d } = data;
  let arr = [
    {
      name: "国有项目占比",
      value: (d && d.jsFjGovCount) || 0,
    },
    {
      name: "民营项目占比",
      value: (d && d.jsFjPrivateCount) || 0,
    },
  ];
  return {
    animation: false,
    title: {
      text: "业主单位类型占比（房建类）",
      textStyle: {
        fontSize: 16,
        color: "#333",
        fontWeight: "bolder"
      },
      textAlign: "left",
      top: "20",
      left: "20",
    },
    color: ["#6868FE", "#FECC4E"],
    legend: {
      show: false,
      x: "left",
      top: "10%",
      left: "20%",
      itemWidth: 20,
      itemHeight: 10,
      data: ["国有项目占比", "民营项目占比"],
    },
    label: {
      position: "outside",
      align: "center",
      formatter: ["{tit|{b}}", "{value|{d}%}"].join("\n"),
      rich: {
        tit: {
          color: "#666",
          fontSize: 13,
          align: "center",
        },
        value: {
          fontSize: 16,
          align: "center",
        },
      },
    },
    series: [
      {
        top: "5%",
        bottom: "-15%",
        type: "pie",
        radius: ["25%", "50%"],
        labelLine: {
          show: false,
          show: false,
          length: 8,
          length2: 8,
        },
        data: arr,
      },
    ],
  };
};

export default DeepChart;
