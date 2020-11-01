import React, { Component } from "react";
import "./index.scss";
const echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/component/legend");
require("echarts/lib/component/tooltip");
class MChart extends Component {
  state = { xAxis_data: [] };
  chart = null;
  componentDidMount() {
    const data = this.props.data.splice(-7);
    const xAxis_data = [];
    const series1 = [];
    const series2 = [];
    let min = undefined;
    let max = undefined;
    data.forEach((d) => {
      xAxis_data.push(d.data_date.split(" ")[0].substr(0, 7));
      this.setState({
        xAxis_data: xAxis_data,
      });
      d.y1 ? series1.push(String(d.y1)) : series1.push("");
      d.y5 ? series2.push(String(d.y5)) : series2.push("");
      let minArr = [], maxArr = [];
      d.y1 && minArr.push(d.y1) && maxArr.push(d.y1);
      d.y5 && minArr.push(d.y5) && maxArr.push(d.y5);;
      min && minArr.push(min);
      max && maxArr.push(max);
      min = Number(minArr.sort()[0])
      max = Number(maxArr.sort().slice(-1)[0])
    });
    this.chart = echarts.init(document.querySelector("#m-chart"));
    this.chart.setOption({
      tooltip: {
        show: true,
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: xAxis_data,
        boundaryGap: false,
        splitLine: {
          show: true,
          interval: 1,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#DFE2E6",
            width: 2,
          },
        },
        axisLabel: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        scale: true,
        splitNumber: 2,
        min: min - (max - min) * 0.1,
        max: max + (max - min) * 0.1,
        name: "%",
        nameTextStyle: {
          color: "#333",
        },
        nameGap: 5,
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#DFE2E6",
            width: 2,
          },
        },
        axisLabel: {
          inside: true,
          formatter: function (val, index) {
            if (val != ".") {
              var f = Math.round(val * 100) / 100;
              var s = f.toString();
              var rs = s.indexOf(".");
              if (rs <= 0) {
                rs = s.length;
                s += ".";
              }
              while (s.length <= rs + 2) {
                s += "0";
              }
              return s;
            } else {
              return "0.00";
            }
          },
          textStyle: {
            color: "#333333",
          },
          padding: [0, 0, 15, 0],
        },
      },
      series: [
        {
          name: "1Y",
          data: series1,
          type: "line",
          symbol: "circle",
          lineStyle: {
            color: "#3498DB",
          },
          itemStyle: {
            color: "#3498DB",
          },
        },
        {
          name: "5Y",
          data: series2,
          symbol: "circle",
          type: "line",
          lineStyle: {
            color: "#FF3B30",
          },
          itemStyle: {
            color: "#FF3B30",
          },
        },
      ],
      legend: {
        itemWidth: 14,
        itemHeight: 6,
        top: 15,
      },
      grid: {
        show: true,
        left: "5px",
        top: "45px",
        right: "5px",
        bottom: "20px",
      },
    });
  }
  render() {
    const { xAxis_data } = this.state;
    return (
      <div styleName="m-chart-container">
        <div id="m-chart" styleName="m-chart"></div>
        <div styleName="label">
          {xAxis_data && xAxis_data.map((v, i) => {
            return <span key={i}>{v}</span>;
          })}
        </div>
      </div>
    );
  }
}

export default MChart;
