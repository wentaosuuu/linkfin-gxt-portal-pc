import React, { Component } from "react";
import echarts from "echarts";
import "./index.scss";
export default class Graph extends Component {
  static defaultProps = {
    createPdf: false
  }
  state = {
    pdfSrc: ""
  };
  graphData = {
    nodes: [],
    links: [],
  };
  categories = [
    { name: "自然人", textStyle: { color: "#27AE60" } },
    { name: "企业法人", textStyle: { color: "#2C93F2" } },
    { name: "靶向企业", textStyle: { color: "#FF493F" } },
  ];
  options() {
    const { relations, companyName } = this.props;
    if (!relations) {
      return {};
    }
    const atlas = relations.atlas;
    atlas &&
      atlas.nodes &&
      atlas.nodes.map((item) => {
        this.graphData.nodes.push({
          name: item.properties.name,
          id: item.id,
          category:
            item.properties.name == companyName
              ? 2
              : item.labels[0] == "Human"
                ? 0
                : 1,
          value: 10,
          symbolSize: item.properties.name == companyName ? 20 : 10,
          itemStyle: {
            color:
              item.properties.name == companyName
                ? "#FF493F"
                : item.labels[0] == "Human"
                  ? "#27AE60"
                  : "#2C93F2",
          },
          label: {
            fontSize: 14,
          },
        });
      });
    atlas &&
      atlas.relationships &&
      atlas.relationships.map((item) => {
        this.graphData.links.push({
          source: item.startNode,
          target: item.endNode,
        });
      });
    return {
      legend: {
        show: true,
        data: this.categories,
        top: 5,
        itemWidth: 20,
        itemHeight: 20,
        textStyle: {
          fontSize: 14,
          itemGap: 25,
          padding: [0, 10, 0, 0],
        },
      },
      series: [
        {
          name: "",
          type: "graph",
          layout: "circular",
          animation: false,
          circular: {
            rotateLabel: true,
          },
          left: this.isPDFimage ? "20%" : "25%",
          top: "28%",
          right: this.isPDFimage ? "25%" : "25%",
          bottom: "20%",
          data: this.graphData.nodes,
          links: this.graphData.links,
          categories: this.categories,
          color: ["#27AE60", "#2C93F2", "#FF493F"],
          lineStyle: {
            color: "source",
            curveness: 0.3,
          },
          label: {
            show: true,
            color: "auto",
            lineHeight: 20,
            verticalAlign: "center",
            fontStyle: "normal",
            borderWidth: 0,
            textBorderColor: "transparent",
            textBorderWidth: 0,
            formatter: function (params) {
              if (params.name.length <= 9) return params.name;
              let str1 = params.name.substr(0, 9);
              let str2 = params.name.substr(9);
              return `${str1}\n${str2}`;
            },
          },
        },
      ],
    };
  }
  componentDidMount() {
    const { createPdf } = this.props
    const dom = document.querySelector("#relationMap");
    if (dom) {
      const chart = echarts.init(dom);
      chart.setOption(this.options());
      if (createPdf) {
        this.setState({
          pdfSrc: chart.getDataURL({
            type: 'png',
            pixelRatio: 1,
            backgroundColor: "#fff",
          })
        })
      }
    }
  }
  render() {
    const { pdfSrc } = this.state
    const { createPdf, index, mainNo } = this.props
    const _mainNo = this.props.createPdf ? `${mainNo}` : `${index + 1}`
    return (
      <div styleName="container">
        <p styleName="title">{_mainNo}.1企业关系图谱</p>
        {!pdfSrc && <div styleName="relation-map" id="relationMap"></div>}
        {pdfSrc && createPdf && <img src={pdfSrc} alt="" />}
        <p style={{ color: createPdf && '#333' }} styleName="tip">数据来源：国家信用信息公示系统</p>
      </div>
    );
  }
}
