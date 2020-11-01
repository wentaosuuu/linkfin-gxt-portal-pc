import React, { Component } from "react";
import echarts from "echarts";
import "./index.scss";
import pass from '@src/assets/img/credit_search/certificate0.png';
import review from '@src/assets/img/credit_search/certificate1.png';
import refuse from '@src/assets/img/credit_search/certificate2.png';
import DashBoard from './dashBoard';

class ComprehensiveCredit extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    createPdf: false
  };

  componentDidMount() {
    const { createPdf } = this.props;
    if (!createPdf) {
      const canvas = document.querySelector('#myCanvas');
      const dashBoard = new DashBoard(canvas, 2, 167, 150, 130, 2);
      dashBoard.init(this.props.comprehensiveCreditDTO.creditScore || '');
    }
    const {
      companyCredit, // 企业信誉
      stableQuota, // 稳定指标
      companyCredentials, // 企业资历
      developEnergy, // 发展势能
      managementEnergy, // 经营势能
    } = this.props.comprehensiveCreditDTO;
    const data = [companyCredit, stableQuota, companyCredentials, developEnergy, managementEnergy];

    echarts
      .init(document.querySelector('#riskRadar'))
      .setOption(riskRadar(data));
  }

  render() {
    const { createPdf } = this.props;
    const { strategySuggestion } = this.props.comprehensiveCreditDTO;
    return <div styleName="comprehensive-credit-wrap">
      {!createPdf && <div styleName="credit-item">
        <h3>策略建议</h3>
        {
          strategySuggestion === 0 ?
            <img src={refuse} /> :
            strategySuggestion === 1 ?
              <img src={pass} /> :
              strategySuggestion === 2 ?
                <img src={review} /> :
                null
        }
      </div>}
      {!createPdf && <div styleName="credit-item">
        <h3>信用评分</h3>
        <canvas id="myCanvas" width="334" height="218">
          Your browser does not support the HTML5 canvas tag.
        </canvas>
      </div>}
      <div styleName="credit-item" style={{ margin: createPdf && "0 auto" }}>
        <h3>风险雷达</h3>
        <div id="riskRadar" style={{ width: '334px', height: '218px' }}></div>
      </div>
    </div>;
  }
}

const riskRadar = (data) => {
  return {
    animation: false,
    radar: {
      name: {
        textStyle: {
          color: '#999',
          fontSize: 12
        }
      },
      nameGap: 10,
      radius: '85%',
      center: ['50%', '60%'],
      splitNumber: 3,
      indicator: [
        { name: '企业信誉', max: 100 },
        { name: '稳定指标', max: 100 },
        { name: '企业资历', max: 100 },
        { name: '发展势能', max: 100 },
        { name: '经营势能', max: 100 },
      ],
      splitArea: {
        areaStyle: {
          color: '#fff'
        }
      }
    },
    series: [{
      name: '风险雷达',
      type: 'radar',
      label: {
        show: true,
        color: '#1890FF',
        fontSize: 12,
        position: 'insideBottom'
      },
      data: [
        {
          value: data,
          name: '风险雷达'
        }
      ],
      lineStyle: {
        color: '#1890FF',
        width: 3,
      },
      areaStyle: {
        color: '#D8ECFF'
      },
      itemStyle: {
        borderWidth: 3,
        borderColor: '#1890FF',
      }
    }]
  };
};

export default ComprehensiveCredit;
