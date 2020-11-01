import React, { Component } from "react";
import HTML from "@src/components/layout/default.jsx";
import BaseInfo from './../credit/compoment/baseInfo';
import JudicialRisk from "./../credit/compoment/judicialRisk";
import ManagementRisk from "./../credit/compoment/managementRisk";
import ManagementInfo from "./../credit/compoment/managementInfo";
import PropertyRight from "./../credit/compoment/propertyRight";
import EnterpriseMap from "./../credit/compoment/enterpriseMap";
import RiskOutline from "./../credit/compoment/riskOutline";
import DeepReport from "./../credit/compoment/deepReport";
import ComprehensiveCredit from './../credit/compoment/comprehensiveStrategy/comprehensiveCredit';
import RuleHitStatistics from './../credit/compoment/comprehensiveStrategy/ruleHitStatistics';
import IndustryRanking from './../credit/compoment/comprehensiveStrategy/industryRanking';
import RuleHitResult from './../credit/compoment/comprehensiveStrategy/ruleHitResult';
import ComprehensiveStrategy from "./../credit/compoment/comprehensiveStrategy";
import "./index.scss";

export default class Credit extends Component {
  componentDidMount() {
  }
  render() {
    const { depthReport: data } = this.props.reportData.data;
    const { query } = this.props;
    const {
      compBaseInfoBean, // 基本信息
      compBusiInfoGxtRpVO, // 企业经营信息
      compBusiRiskInfoGxtRpVO, // 企业经营风险
      compRelationshipAndAtlasGxtRpVO, // 企业图谱和股权结构
      compTagInfoRpDTOList, // 标签列表
      industryDepthInfoBean, // 行业深度信息
      intellecPropetyGxtRpVO, // 知识产权
      judicialInfoGxtRpVO, // 司法风险
      riskProfileGxtRpVO, // 风险概要
      reportTimeStamp, // 报告生成时间
      comprehensiveStrategyRpVO = {}, // 综合策略 
      gjtComp
    } = data;
    // console.log(compBaseInfoBean, 666)
    const {
      comprehensiveCreditDTO, // 综合信用
      ruleHitStatisticsDTOList, // 规则命中统计
      industryRankingDTO, // 行业排名
      ruleHitResultDTOList, // 规则命中结果
    } = comprehensiveStrategyRpVO;
    return <HTML>
      <div styleName="pdf">
        <div styleName="header">
          {query.reportNo && <span styleName="report-no">{query.reportNo}</span>}
          <img src={require('@src/assets/img/pdfimg.png')} alt="" />
          <p styleName="title">企业信用报告</p>
          <table styleName="table">
            <tbody>
              <tr><td>企业名称</td><td>{compBaseInfoBean.gxtCompBaseInfoBean.name}</td></tr>
              <tr><td>机构信用代码</td><td>{compBaseInfoBean.gxtCompBaseInfoBean.creditCode}</td></tr>
              <tr><td>报告生成日期</td><td>{reportTimeStamp}</td></tr>
            </tbody>
          </table>
          <p styleName="tip center">您所看到的报告内容为截止至该时间点该公司的数据快照</p>
          <p styleName="tip">声明：本报告仅供商业决策参考，因使用该报告产生的任何后果，本公司概不承担任何责任。未经本公司许可，不得向第三方透漏本报告的任何内容，亦不得以此作为法律诉讼之依据。如缺失某项数据，不排除存在时间相对滞后或相关机关未公示的情况。</p>
          <div styleName="footer">
            <p styleName="small-title">广西联合征信有限公司</p>
            <p>地址：中国广西南宁市良庆区平乐大道18号（530200）</p>
            <p>传真：0771-2501111</p>
            <p>Email：lhzxservice1@caih.com</p>
          </div>
        </div>
        {gjtComp && <section styleName="section">
          <p styleName="title ali-center">综合策略建议</p>
          <p styleName="title-second">1.1综合信用评分</p>
          <div styleName="p-1-1 mr-t-30">
            <p styleName="score">
              <span styleName="score-item">评分模型名称</span>
              <span styleName="score-item">评分</span>
              <span styleName="score-item">策略建议</span>
            </p>
            <p styleName="content">
              <span styleName="content-item">中小微企业模型场景</span>
              <span styleName="content-item">{comprehensiveCreditDTO.creditScore ? comprehensiveCreditDTO.creditScore.toFixed(2) : '-'}</span>
              <span styleName="content-item">
                {
                  comprehensiveCreditDTO.strategySuggestion === 0 ?
                    '拒绝' :
                    comprehensiveCreditDTO.strategySuggestion === 1 ?
                      '通过' :
                      comprehensiveCreditDTO.strategySuggestion === 2 ?
                        '复议' :
                        '-'
                }
              </span>
              {/* {comprehensiveCreditDTO.strategySuggestion ?
                <span styleName="content-item">
                  {comprehensiveCreditDTO.strategySuggestion === 0 ? '拒绝' : comprehensiveCreditDTO.strategySuggestion === 1 ? "通过" : "复议"}
                </span> : <span styleName="content-item">-</span>} */}
            </p>
          </div>
          <p styleName="title-second">1.2规则命中统计</p>
          <p styleName="title-three mr-l-r-20 mr-t-30">1.2.1企业规则命中统计</p>
          <ComprehensiveCredit createPdf={true} comprehensiveCreditDTO={comprehensiveCreditDTO} />
          <div styleName="stastics">
            <RuleHitStatistics ruleHitStatisticsDTOList={ruleHitStatisticsDTOList} />
          </div>
          <p styleName="title-three mr-l-r-20 mr-t-30">1.2.2行业排名情况</p>
          <div styleName="ranking">
            <IndustryRanking industryRankingDTO={industryRankingDTO} />
          </div>
          <p styleName="title-second">1.3规则命中结果</p>
          <div styleName="ruleHit-result">
            <RuleHitResult
              ruleHitResultDTOList={ruleHitResultDTOList}
              createPdf={true}
              index="1.3"
            />
          </div>
        </section>
        }
        <section styleName="section">
          <p styleName="title ali-center">企业基础信息详情</p>
          <p styleName="title-second">{gjtComp ? '2.1基本信息' : "1.1基本信息"}</p>
          <BaseInfo
            mainNo={gjtComp ? '2.1' : "1.1"}
            compBaseInfoBean={compBaseInfoBean}
            time={reportTimeStamp}
            createPdf={true}
          ></BaseInfo>
          <p styleName="title-second">{gjtComp ? '2.2司法风险' : "1.2司法风险"}</p>
          <JudicialRisk
            mainNo={gjtComp ? '2.2' : "1.2"}
            judicialInfoGxtRpVO={judicialInfoGxtRpVO}
            time={reportTimeStamp}
            createPdf={true}
          ></JudicialRisk>
          <p styleName="title-second">{gjtComp ? '2.3经营风险' : "1.3经营风险"}</p>
          <ManagementRisk
            mainNo={gjtComp ? '2.3' : "1.3"}
            compBusiRiskInfoGxtRpVO={compBusiRiskInfoGxtRpVO}
            time={reportTimeStamp}
            createPdf={true}
          ></ManagementRisk>
          <p styleName="title-second">{gjtComp ? '2.4经营信息' : "1.4经营信息"}</p>
          <ManagementInfo
            mainNo={gjtComp ? '2.4' : "1.4"}
            compBusiInfoGxtRpVO={compBusiInfoGxtRpVO}
            time={reportTimeStamp}
            createPdf={true}
          ></ManagementInfo>
          <div styleName="break-page">
            <p styleName="title-second">{gjtComp ? '2.5知识产权' : "1.5知识产权"}</p>
            <PropertyRight
              mainNo={gjtComp ? '2.5' : "1.5"}
              intellecPropetyGxtRpVO={intellecPropetyGxtRpVO}
              time={reportTimeStamp}
              createPdf={true}
            ></PropertyRight>
          </div>
          <div styleName="break-page">
            <p styleName="title-second">{gjtComp ? '2.6企业图谱' : "1.6企业图谱"}</p>
            <EnterpriseMap
              mainNo={gjtComp ? '2.6' : "1.6"}
              relations={compRelationshipAndAtlasGxtRpVO}
              companyName={compBaseInfoBean.gxtCompBaseInfoBean.name}
              createPdf={true}
            ></EnterpriseMap>
          </div>
          <div styleName="break-page">
            <p styleName="title-second">{gjtComp ? '2.7风险概要' : "1.7风险概要"}</p>
            <RiskOutline
              mainNo={gjtComp ? '2.7' : "1.7"}
              riskProfileGxtRpVO={riskProfileGxtRpVO}
              time={reportTimeStamp}
              createPdf={true}
            ></RiskOutline>
          </div>
        </section>
        {gjtComp && <section styleName="section">
          <p styleName="title ali-center">行业深度信息</p>
          {/* <p styleName="title-second">3.1基本信息</p> */}
          <DeepReport
            index={2}
            industryDepthInfoBean={industryDepthInfoBean}
            time={reportTimeStamp}
            createPdf={true}
            userType={query.userType}
          ></DeepReport>
        </section>}
        <section styleName="section">
          <p styleName="title ali-center">报告使用说明</p>
          <article styleName="use-explain">
            <p styleName="paragraph-1">感谢您访问、浏览或使用广西中小企业融资信用服务平台(以下简称平台)。</p>
            <p styleName="paragraph-1">用户应当按照平台的有关管理规则提交注册信息并保证注册信息的真实性和完整性。用户对平台的使用不得违反法律、法规、社会道德及本平台的相关规定，谢绝出于其他目的的使用行为。</p>
            <p styleName="paragraph-1">1）平台对非平台运营方过错造成的数据误差不承担责任；</p>
            <p styleName="paragraph-1">2）平台对用户非法取得、授权过期、未经授权或未经转授权等行为不承担责任，客户因上述原因提起索赔的，过错方承担违约责任，并向平台偿付索赔款；</p>
            <p styleName="paragraph-1">3）平台提供的企业征信数据信息是基于平台运营商复杂数据分析技术处理形成的结果，无法对该技术分析结果的真实性与客观实际情况一致性负责，不保证其内容的准确性、全面性和辅助决策的价值性，仅作为金融机构判断结果的参考依据项之一。若任何人通过使用该数据分析结果做出任何行为，该行为相关权利义务由行为人自行承担，平台对金融机构运用上述数据与信息所做判断及后果不承担责任；</p>
            <p styleName="paragraph-1">4）查询人必须依法使用查询信息，不得用于非法目的和不正当用途。非法使用本网站信息给他人造成损害的，由使用人自行承担相应责任。</p>
          </article>
        </section>
      </div>
    </HTML >;
  }
}