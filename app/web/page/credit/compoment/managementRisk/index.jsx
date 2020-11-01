import React, { Component } from "react";
import TableReport from "@src/components/tableReport/index";
import ReportWrap from "@src/components/tableReport/reportWrap";
import moment from 'moment';
/** 抽查检查 */
// const {
//   checkDate, // 日期
//   checkOrg, // 检查实施机关
//   checkResult, // 结果
//   checkType, // 类型
// } = checkInfoBeanList[0];
const checkInfoBeanColumns = [
  { name: "日期", key: (item) => item.checkDate || "-" },
  { name: "类型", key: (item) => item.checkType || "-" },
  { name: "结果", key: (item) => item.checkResult || "-" },
  { name: "检查实施机关", key: (item) => item.checkOrg || "-" },
];
/** 经营异常 */
// const {
//   putDate, // 列入日期
//   putDepartment, // 列入决定机关
//   putReason, // 列入异常名录原因
//   removeDate, // 移出日期
//   removeDepartment, // 移除决定机关
//   removeReason // 移除异常名录原因
// } = compAbnormalRpDTOList[0];
const compAbnormalRpDTOColumns = [
  { name: "列入日期", key: (item) => item.putDate || "-" },
  { name: "列入异常名录原因", key: (item) => item.putReason || "-" },
  { name: "列入决定机关", key: (item) => item.putDepartment || "-" },
  { name: "移出日期", key: (item) => item.removeDate || "-" },
  { name: "移除异常名录原因", key: (item) => item.removeReason || "-" },
  { name: "移除决定机关", key: (item) => item.removeDepartment || "-" },
];
/** 行政处罚（信用中国） */
// const {
//   areaName, // 区域
//   decisionDate, // 作出行政处罚决定日期
//   departmentName, // 作出行政处罚决定机关名称
//   evidence, // 处罚依据
//   punishName, // 处罚名称
//   punishNumber, // 行政处罚决定书文号
//   reason, // 处罚事由
//   result, // 处罚结果
//   type // 处罚类别
// } = compCreditChinaBean2List[0];
const compCreditChinaBean2Columns = [
  { name: "决定日期", key: (item) => item.decisionDate || "-" },
  { name: "决定书文号", key: (item) => item.punishNumber || "-" },
  { name: "处罚事由", key: (item) => item.reason || "-" },
  { name: "处罚结果", key: (item) => item.result || "-" },
  { name: "处罚机关", key: (item) => item.departmentName || "-" },
];
/** 失信被执行人情况 */
// const {
//   caseCode, // 案号
//   caseCreateTime, // 立案日期
//   execCourtName, // 执行法院
//   execMoney // 执行标的（元）
// } = compDishonestvExcBeanList[0];
/** 环保处罚 */
// const {
//   publishTime, // 处罚时间
//   punishContent, // 处罚结果
//   punishDepartment, // 处罚单位
//   punishNumber, // 决定书文号
//   punishReason // 处罚事由
// } = compEnvPenaltyRpDTOList[0];
const compEnvPenaltyRpDTOColumns = [
  { name: "处罚日期", key: (item) => item.publishTime || "-" },
  { name: "决定书文号", key: (item) => item.punishNumber || "-" },
  { name: "处罚事由", key: (item) => item.punishReason || "-" },
  { name: "处罚结果", key: (item) => item.punishContent || "-" },
  { name: "处罚单位", key: (item) => item.punishDepartment || "-" },
];
/** 股权出质 */
// const {
//   equityAmount, // 出质股权数额
//   pledgee, // 质权人
//   pledgor, // 出质人
//   putDate, // 股权出质设立发布日期
//   regDate, // 股权出质设立登记日期
//   regNumber, // 登记编号
//   state // 状态
// } = compEquityinfoRpDTOList[0];
const compEquityinfoRpDTOColumns = [
  { name: "登记日期", key: (item) => item.regDate || "-" },
  { name: "登记编号", key: (item) => item.regNumber || "-" },
  { name: "出质人", key: (item) => item.pledgor || "-" },
  { name: "质权人", key: (item) => item.pledgee || "-" },
  { name: "发布日期", key: (item) => item.putDate || "-" },
  { name: "状态", key: (item) => item.state || "-" },
  { name: "出质股权数额(万元)", key: (item) => item.equityAmount || "-" },
];
/** 严重违法 */
// const {
//   index = 0,
//   putDate, // 列入日期
//   putDepartment, // 决定列入部门(作出决定机关)
//   putReason, // 列入原因
//   removeDate, // 移除日期
//   removeDepartment, // 决定移除部门
//   removeReason // 移除原因
// } = compIllegalinfoRpDTOList[0];
const compIllegalinfoRpDTOColumns = [
  { name: "列入日期", key: (item) => item.putDate || "-" },
  { name: "列入原因", key: (item) => item.putReason || "-" },
  { name: "列入决定机关", key: (item) => item.putDepartment || "-" },
  { name: "移除日期", key: (item) => item.removeDate || "-" },
  { name: "移除原因", key: (item) => item.removeReason || "-" },
  { name: "移除决定部门", key: (item) => item.removeDepartment || "-" },
];
/** 动产抵押 */
// const {
//   index = 0,
//   amount, // 被担保债权数额
//   publishDate, // 公示日期
//   regDate, // 登记日期
//   regDepartment, // 登记机关
//   regNum, // 登记编号
//   scope, // 担保范围
//   status, // 状态
//   term, // 债务人履行债务的期限
//   type // 被担保债券种类
// } = compMortgageInfoBeansList[0];
const compMortgageInfoBeansColumns = [
  { name: "登记日期", key: (item) => item.regDate || "-" },
  { name: "登记编号", key: (item) => item.regNum || "-" },
  { name: "担保范围", key: (item) => item.scope || "-" },
  { name: "被担保债权类型", key: (item) => item.type || "-" },
  { name: "被担保债权数额(万元)", key: (item) => item.amount || "-" },
  { name: "登记机关", key: (item) => item.regDepartment || "-" },
  { name: "状态", key: (item) => item.status || "-" },
  { name: "债务人履行债务的期限", key: (item) => item.term || "-" },
];
/** 欠税报告 */
// const {
//   index = 0,
//   department, // 税务机关（部门）
//   newOwnTaxBalance, // 当前新发生欠税余额
//   ownTaxBalance, // 欠税余额
//   publishDate, // 发布时间
//   taxCategory, // 欠税税种
//   taxIdNumber // 纳税人识别号
// } = compOwntaxRpDTOList[0];
const compOwntaxRpDTOColumns = [
  { name: "发布日期", key: (item) => item.publishDate || "-" },
  { name: "纳税人识别号", key: (item) => item.taxIdNumber || "-" },
  { name: "欠税税种", key: (item) => item.taxCategory || "-" },
  {
    name: "当前新发生欠税余额(万元)",
    key: (item) => item.newOwnTaxBalance || "-",
  },
  { name: "欠税余额(万元)", key: (item) => item.ownTaxBalance || "-" },
  { name: "税务机关", key: (item) => item.department || "-" },
];
/** 行政处罚（工商数据） */
// const {
//   index = 0,
//   content, // 行政处罚内容
//   decisionDate, // 作出行政处罚决定日期
//   departmentName, // 决定机构名称
//   publishDate, // 公示日期
//   punishNumber // 决定书文号
// } = compPunishmentInfoRpDTOList[0];

const compPunishmentInfoRpDTOColumns = [
  { name: "处罚决定日期", key: (item) => item.decisionDate || "-" },
  { name: "决定书文号", key: (item) => item.punishNumber || "-" },
  { name: "行政处罚内容", key: (item) => item.content || "-" },
  { name: "决定机构名称", key: (item) => item.departmentName || "-" },
  { name: "公示日期", key: (item) => item.publishDate || "-" },
];

const compTaxContraventionRpDTOColumns = [
  { name: "纳税人名称", key: (item) => item.taxpayerName || "-" },
  { name: "所属税务机关", key: (item) => item.department || "-" },
  { name: "案件性质", key: (item) => item.caseType || "-" },
];
class ManagementRisk extends Component {
  state = {};
  render() {
    const { compBusiRiskInfoGxtRpVO } = this.props;
    const {
      checkInfoBeanList, // 抽查检查
      compAbnormalRpDTOList, // 经营异常
      compCreditChinaBean2List, // 行政处罚（信用中国）
      compDishonestvExcBeanList, // 失信被执行人情况
      compEnvPenaltyRpDTOList, // 环保处罚
      compEquityinfoRpDTOList, // 股权出质
      compIllegalinfoRpDTOList, // 严重违法
      compMortgageInfoBeansList, // 动产抵押
      compOwntaxRpDTOList, // 欠税报告
      compPunishmentInfoRpDTOList, // 行政处罚（工商数据）
      compTaxContraventionRpDTOList, // 税收违法
      // compBriefCancelRpDTO = {}, // 简易注销
    } = compBusiRiskInfoGxtRpVO;
    const compBriefCancelRpDTO = compBusiRiskInfoGxtRpVO.compBriefCancelRpDTO || {}; // 简易注销
    const { index, mainNo } = this.props;
    const _mainNo = this.props.createPdf ? `${mainNo}` : `${index + 1}`;
    return (
      <div>
        <TableReport
          title={`${_mainNo}.1经营异常`}
          listData={compAbnormalRpDTOList}
          listColumns={compAbnormalRpDTOColumns}
          time={this.props.time}
          createPdf={this.props.createPdf}
        ></TableReport>
        <TableReport
          title={`${_mainNo}.2行政处罚【工商数据】`}
          listData={compPunishmentInfoRpDTOList}
          listColumns={compPunishmentInfoRpDTOColumns}
          time={this.props.time}
          createPdf={this.props.createPdf}
        ></TableReport>
        <TableReport
          title={`${_mainNo}.3行政处罚【信用中国】`}
          listData={compCreditChinaBean2List}
          listColumns={compCreditChinaBean2Columns}
          time={this.props.time}
          createPdf={this.props.createPdf}
        ></TableReport>
        <TableReport
          title={`${_mainNo}.4严重违法`}
          listData={compIllegalinfoRpDTOList}
          listColumns={compIllegalinfoRpDTOColumns}
          time={this.props.time}
          createPdf={this.props.createPdf}
        ></TableReport>
        <TableReport
          title={`${_mainNo}.5抽查检查`}
          listData={checkInfoBeanList}
          listColumns={checkInfoBeanColumns}
          time={this.props.time}
          createPdf={this.props.createPdf}
        ></TableReport>
        <TableReport
          title={`${_mainNo}.6股权出质`}
          listData={compEquityinfoRpDTOList}
          listColumns={compEquityinfoRpDTOColumns}
          time={this.props.time}
          createPdf={this.props.createPdf}
        ></TableReport>
        <TableReport
          title={`${_mainNo}.7动产抵押`}
          listData={compMortgageInfoBeansList}
          listColumns={compMortgageInfoBeansColumns}
          time={this.props.time}
          createPdf={this.props.createPdf}
        ></TableReport>
        <TableReport
          title={`${_mainNo}.8欠税公告`}
          listData={compOwntaxRpDTOList}
          listColumns={compOwntaxRpDTOColumns}
          time={this.props.time}
          createPdf={this.props.createPdf}
        ></TableReport>
        <TableReport
          title={`${_mainNo}.9环保处罚`}
          listData={compEnvPenaltyRpDTOList}
          listColumns={compEnvPenaltyRpDTOColumns}
          time={this.props.time}
          createPdf={this.props.createPdf}
        ></TableReport>
        <div style={{ pageBreakAfter: "always" }}>
          <TableReport
            title={`${_mainNo}.10税收违法`}
            listData={compTaxContraventionRpDTOList}
            listColumns={compTaxContraventionRpDTOColumns}
            time={this.props.time}
            createPdf={this.props.createPdf}
            dataSource="国家税务局"
          ></TableReport>
        </div>
        <ReportWrap createPdf={this.props.createPdf}
          title={`${_mainNo}.11简易注销`}
          showTotal={false}
          showfoot={compBriefCancelRpDTO && Boolean(Object.keys(compBriefCancelRpDTO).length)}
        >
          <BriefCancel
            createPdf={this.props.createPdf}
            time={this.props.time}
            compBriefCancelRpDTO={compBriefCancelRpDTO}
          />
        </ReportWrap>
      </div>
    );
  }
}

const BriefCancel = props => {
  const { time, createPdf, compBriefCancelRpDTO } = props;
  const len = Object.keys(compBriefCancelRpDTO).length;
  return <>
    {compBriefCancelRpDTO && Object.keys(compBriefCancelRpDTO).length ? <table className={createPdf ? "vertical-table-wrap pdf-vertical-table-wrap" : "vertical-table-wrap"}>
      <tbody>
        <tr>
          <td rowSpan={5} width="150">企业公告信息</td>
          <td>企业名称</td>
          <td>{compBriefCancelRpDTO.companyName || '-'}</td>
        </tr>
        <tr>
          <td>统一社会信用代码/注册号</td>
          <td>{compBriefCancelRpDTO.creditCode || '-'}</td>
        </tr>
        <tr>
          <td>登记机关</td>
          <td>{compBriefCancelRpDTO.regAuthority || '-'}</td>
        </tr>
        <tr>
          <td>公告期</td>
          <td>{compBriefCancelRpDTO.announcementTerm || '-'}</td>
        </tr>
        <tr>
          <td>全体投资人承诺书</td>
          <td>{compBriefCancelRpDTO.ossPath || '-'}</td>
        </tr>
        <tr>
          <td rowSpan={3}>异议信息</td>
          <td>异议申请人</td>
          <td>{compBriefCancelRpDTO.objectionApplyPerson || '-'}</td>
        </tr>
        <tr>
          <td>异议时间</td>
          <td>{compBriefCancelRpDTO.objectionDate || '-'}</td>
        </tr>
        <tr>
          <td>异议内容</td>
          <td>{compBriefCancelRpDTO.objectionContent || '-'}</td>
        </tr>
        <tr>
          <td>简易注销结果</td>
          <td>简易注销结果</td>
          <td>{compBriefCancelRpDTO.briefCancelResult || '-'}</td>
        </tr>
      </tbody>
    </table> : <p style={{ fontSize: '14px', color: "#333" }}>
        截止{moment(time).format('YYYY年MM月DD日')}，未查询到相关信息。不排除因信息公开来源尚未公开、公开形式存在差异等情况导致的信息与客观事实不完全一致的情形。仅供参考。
    </p>
    }
  </>;
};

export default ManagementRisk;
