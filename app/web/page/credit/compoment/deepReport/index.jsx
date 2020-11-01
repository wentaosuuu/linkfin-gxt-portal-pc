import React, { Component } from "react";
import TableReport from "@src/components/tableReport";
import DeepChart from "./deepChart";
import "./styles/index.scss";

// 8.1在建工程概览
const buidingDetailColumns = [
  { name: "工程名称", key: (item) => item.projectName || "-" },
  { name: "工程类型", key: (item) => item.projectType || "-" },
  { name: "工程合同金额(万元)", key: (item) => item.projectContractAmt ? item.projectContractAmt : '暂无数据' },
  { name: "建设单位", key: (item) => item.jsUnit || "-" },
  { name: "建设单位性质", key: (item) => item.jsType || "-" },
  { name: "施工总承包单位", key: (item) => item.sgUnit || "-" },
  { name: "施工总承包性质", key: (item) => item.sgType || "-" },
  { name: "施工总承包资质", key: (item) => item.sgQualified || "-" },
];

// 8.3其他项目概览（包含竣工、暂停、未开工）
const historyDetailColumns = [
  { name: "工程名称", key: (item) => item.projectName || "-" },
  { name: "工程类型", key: (item) => item.projectType || "-" },
  { name: "工程合同金额(万元)", key: (item) => item.projectContractAmt ? item.projectContractAmt : '暂无数据' },
  { name: "建设单位", key: (item) => item.projectOwner || "-" },
  { name: "建设单位类型", key: (item) => item.jsType || "-" },
  { name: "施工总承包单位", key: (item) => item.sgUnit || "-" },
  { name: "施工总承包性质", key: (item) => item.sgType || "-" },
  { name: "施工总承包资质", key: (item) => item.sgQualified || "-" },
];

// 8.5企业资质资格
const QualificationColumns = [
  { name: "资质类别", key: (item) => item.type || "-" },
  { name: "资质证书号", key: (item) => item.certificateNum || "-" },
  { name: "资质名称", key: (item) => item.qualificationName || "-" },
  { name: "发证日期", key: (item) => item.issuingCertificateTime || "-" },
  { name: "证书有效期", key: (item) => item.effectiveTime || "-" },
  { name: "发证机关", key: (item) => item.organ || "-" },
];

// 8.6不良行为
const BadBehaviorColumns = [
  { name: "诚信记录编号", key: (item) => item.integrityRecordNo || "-" },
  { name: "诚信记录主体", key: (item) => item.integritySubject || "-" },
  {
    name: "决定内容", key: (item) => {
      return item.decisionContent + item.decisionContent2 || "-";
    }
  },
  { name: "实施部门(文号)", key: (item) => item.implementationDepartment || "-" },
  { name: "发布有效期", key: (item) => item.publishValidityPeriod || "-" }
];

// 8.7失信联合惩戒记录
const PunishColumns = [
  { name: "失信记录编号", key: (item) => item.recordNumber || "-" },
  { name: "列入事由", key: (item) => item.recoderSubject || "-" },
  { name: "认定机构", key: (item) => item.cognizanceDepart || "-" },
  { name: "列入日期", key: (item) => item.startDate || "-" },
];

// 8.8黑名单记录
const BlackListColumns = [
  { name: "黑名单记录编号", key: (item) => item.recordNumber || "-" },
  { name: "黑名单记录主体", key: (item) => item.recoderSubject || "-" },
  { name: "黑名单认定依据", key: (item) => item.recordBasedOn || "-" },
  { name: "认定部门", key: (item) => item.cognizanceDepart || "-" },
  { name: "列入黑名单日期", key: (item) => item.startDate || "-" },
  { name: "移出黑名单日期", key: (item) => item.endDate || "-" },
];
class DeepReport extends Component {
  state = {};
  projBuildingNewStatGxtRpVOColum = [
    {
      title: '工程类型',
      dataIndex: 'projectType',
      render: (value, row, index) => {
        return {
          content: value,
          span: {
            rowSpan: row.rowSpan_projectType,
            colSpan: row.colSpan_projectType,
          }
        };
      }
    },
    {
      title: '总包类型',
      dataIndex: 'projectContractType',
      render: (value, row, index) => {
        return {
          content: value,
          span: {
            rowSpan: row.rowSpan_projectContractType,
            colSpan: row.colSpan_projectContractType,
          }
        };
      }
    },
    {
      title: '建设单位类型',
      dataIndex: 'projectOwnerType',
      render: (value, row, index) => {
        return {
          content: value,
          span: {
            colSpan: row.colSpan_projectOwnerType,
          }
        };
      }
    },
    {
      title: '工程数量',
      dataIndex: 'projectNum',
      render: (value, row, index) => {
        return {
          content: value ? value : '暂无数据',
        };
      }
    },
    {
      title: '总投小计(万元)',
      dataIndex: 'projectTotalAmt',
      render: (value, row, index) => {
        return {
          content: value ? value : '暂无数据',
        };
      }
    },
    {
      dataIndex: "regNum",
      title: "实名制登记人数小计",
      render: (value, row, index) => {
        return {
          content: value ? value : '暂无数据',
        };
      }
    },
    {
      dataIndex: "recentCheck",
      title: "近三月平均考勤人数",
      render: (value, row, index) => {
        return {
          content: value ? value : '暂无数据',
        };
      }
    },
    {
      dataIndex: "recentSalary",
      title: "近三月平均发薪金额(万元)",
      render: (value, row, index) => {
        return {
          content: value ? value : '暂无数据',
        };
      }
    },
    {
      dataIndex: "totalSalaryAmt",
      title: "平台累计发薪金额(万元)",
      render: (value, row, index) => {
        return {
          content: value ? value : '暂无数据',
        };
      }
    }
  ];
  projOtherStatGxtRpVOColum1 = [
    {
      title: '工程类型',
      dataIndex: 'projectType',
      render: (value, row, index) => {
        return {
          content: value,
          span: {
            rowSpan: row.rowSpan_projectType,
            colSpan: row.colSpan_projectType
          }
        };
      }
    },
    {
      title: '总包类型',
      dataIndex: 'projectContractType',
      render: (value, row, index) => {
        return {
          content: value,
          span: {
            rowSpan: row.rowSpan_projectContractType,
            colSpan: row.colSpan_projectContractType,
          }
        };
      }
    },
    {
      title: '建设单位类型',
      dataIndex: 'projectOwnerType',
      render: (value, row, index) => {
        return {
          content: value,
          span: {
            colSpan: row.colSpan_projectOwnerType,
          }
        };
      }
    },
    {
      title: '工程数量',
      dataIndex: 'projectNum',
      render: (value, row, index) => {
        return {
          content: value ? value : '暂无数据',
        };
      }
    },
    {
      dataIndex: 'projectTotalAmt',
      title: '总投小计(万元)',
      render: (value, row, index) => {
        return {
          content: value ? value : '暂无数据',
        };
      }
    }
  ];
  projOtherStatGxtRpVOColum2 = [
    {
      title: '工程类型',
      dataIndex: 'projectType',
      render: (value, row, index) => {
        return {
          content: value,
          span: {
            rowSpan: row.rowSpan_projectType,
            colSpan: row.colSpan_projectType
          }
        };
      }
    },
    {
      title: '业主类型',
      dataIndex: 'projectContractType',
      render: (value, row, index) => {
        return {
          content: value,
          span: {
            rowSpan: row.rowSpan_projectContractType,
            colSpan: row.colSpan_projectContractType,
          }
        };
      }
    },
    {
      title: '建设单位类型',
      dataIndex: 'projectOwnerType',
      render: (value, row, index) => {
        return {
          content: value,
          span: {
            colSpan: row.colSpan_projectOwnerType,
          }
        };
      }
    },
    {
      title: '工程数量',
      dataIndex: 'projectNum',
      render: (value, row, index) => {
        return {
          content: value ? value : '暂无数据',
        };
      }
    },
    {
      dataIndex: 'projectTotalAmt',
      title: '总投小计(万元)',
      render: (value, row, index) => {
        return {
          content: value ? value : '暂无数据',
        };
      }
    }
  ];

  constructor(props) {
    super(props);
    if (!EASY_ENV_IS_NODE && localStorage) {
      this.state.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    }
    if (props.createPdf) {
      this.state.userInfo = { type: props.userType };
    }
  }
  flatten(data) {
    let res = [];
    data.forEach(item_1 => {
      item_1.list.forEach(item_2 => {
        for (let k in item_1) {
          if (!Array.isArray(item_1[k])) {
            item_2[k] = item_1[k];
          }
        }
        item_2.list.forEach(item_3 => {
          for (let k in item_2) {
            if (!Array.isArray(item_2[k])) {
              item_3[k] = item_2[k];
            }
          }
          res.push(item_3);
        });
      });
    });
    return res;
  }

  dataFormat(data = [], typeArr = [], drop = 0) {
    let temp = [];
    let keysObj = {};
    const keys = typeArr[drop];
    const hasDrop = typeArr.length - 1 > drop;
    data.map((item, index) => {
      const isFirst = keysObj[item[keys]] == undefined; // 值是否第一次出现
      if (isFirst) {
        keysObj[item[keys]] = {};
        keysObj[item[keys]].keys = keys;
        keysObj[item[keys]].start = index;
        keysObj[item[keys]].total = 1;
      } else {
        keysObj[item[keys]].total += 1;
      }
      item[`rowSpan_${keys}`] = 0;
      // index不为0，意味着不是起始位置，已经有合并项，且有下个待合并的数据
      if (isFirst && index && hasDrop) { // 某个值第一次出现且非第一条数据且层级不是最深
        this.dataFormat(temp, typeArr, drop + 1);
        temp = [];
      } else if (index == data.length - 1 && hasDrop) { // 最后一条且层级不是最深
        temp.push(item);
        this.dataFormat(temp, typeArr, drop + 1);
        temp = [];
        return;
      }
      temp.push(item);
    });
    for (let key in keysObj) {
      const { keys, start, total } = keysObj[key];
      data[start][`rowSpan_${keys}`] = total;
    }
    return data;
  }

  dataSplice_projBuildingNewStatGxtRpVO(arg, spanName) {
    if(!arg || arg.length === 0) return;
    let data = this.flatten(arg);
    data = this.dataFormat(data, spanName);
    const arr0 = data.splice(0, arg[0].rowNum);
    const arr1 = data;
    arr0.push({
      projectType: '合计',
      colSpan_projectType: 3,
      colSpan_projectContractType: 0,
      colSpan_projectOwnerType: 0,
      projectNum: arg[0].totalNum, 
      projectTotalAmt: arg[0].totalAmt,
      regNum: arg[0].regTotalNum,
      recentCheck: arg[0].recentCheckTotal,
      recentSalary: arg[0].recentSalaryTotal,
      totalSalaryAmt: arg[0].salaryTotal
    });
    arr1.push({
      projectType: '合计',
      colSpan_projectType: 3,
      colSpan_projectContractType: 0,
      colSpan_projectOwnerType: 0,
      projectNum: arg[1].totalNum, 
      projectTotalAmt: arg[1].totalAmt,
      regNum: arg[1].regTotalNum,
      recentCheck: arg[1].recentCheckTotal,
      recentSalary: arg[1].recentSalaryTotal,
      totalSalaryAmt: arg[1].salaryTotal
    });
    return [arr0, arr1];
  }

  dataSplice_projOtherStatGxtRpVO(arg, spanName) {
    if(!arg || arg.length === 0) return;
    let data = this.flatten(arg);
    data = this.dataFormat(data, spanName);
    const arr0 = data.splice(0, arg[0].rowNum);
    const arr1 = data;
    arr0.push({
      projectType: '合计',
      colSpan_projectType: 3,
      colSpan_projectContractType: 0,
      colSpan_projectOwnerType: 0,
      projectNum: arg[0].totalNum,
      projectTotalAmt: arg[0].totalAmt
    });
    arr1.push({
      projectType: '合计',
      colSpan_projectType: 3,
      colSpan_projectContractType: 0,
      colSpan_projectOwnerType: 0,
      projectNum: arg[1].totalNum,
      projectTotalAmt: arg[1].totalAmt
    });
    return [arr0, arr1];
  }

  render() {
    const { industryDepthInfoBean, createPdf, index } = this.props;
    const { userInfo } = this.state;
    const {
      buidingDetailDTOList, // 8.1在建工程概览
      historyDetailRpDTOList, // 8.3其他项目概览（包含竣工、暂停、未开工）
      jzscQualificationBean, // 8.5企业资质资格
      jzscBadBehaviorInfoBean,  // 8.6不良行为
      jzscPunishCompBeanList, // 8.7失信联合惩戒记录
      jzscBlackListCompBeanList,// 8.8黑名单记录
      projBuildingNewStatGxtRpVO, //8.2在建工程考勤发薪统计情况
      projOtherStatGxtRpVO, //8.4其他项目统计数据
    } = industryDepthInfoBean;
    let _projBuildingNewStatGxtRpVO = this.dataSplice_projBuildingNewStatGxtRpVO(projBuildingNewStatGxtRpVO.list, ['projectType', 'projectContractType']);
    let _projOtherStatGxtRpVO = this.dataSplice_projOtherStatGxtRpVO(projOtherStatGxtRpVO.list, ['projectType', 'projectContractType']);
    return (
      <div>
        {<div styleName="padding0-20">
          <DeepChart chartData={industryDepthInfoBean} />
        </div>}
        {userInfo.type != 1 && userInfo.type != 0 && !createPdf && <div styleName="warp">
          <img
            src={require("@src/assets/img/credit_search/enterprise_more.png")}
          />
          <div styleName="center">
            <p styleName="top">— 行业深度信息明细数据仅限VIP客户查询 —</p>
            <img
              styleName="middle"
              src={require("@src/assets/img/credit_search/kin.png")}
            />
            <p styleName="buttom">VIP通道即将上线，敬请期待！</p>
          </div>
        </div>}
        {(userInfo.type == 1 || userInfo.type == 0) && <>
          {createPdf && <p styleName="title-second">3.1在建工程概览</p>}
          <TableReport
            title={!createPdf && `${index + 1}.1在建工程概览`}
            listData={buidingDetailDTOList}
            listColumns={buidingDetailColumns}
            time={this.props.time}
            createPdf={createPdf}
            dataSource="住建厅桂建通平台"
          />
          <div>
            {createPdf && <p styleName="title-second mr-bot-30">3.2在建工程考勤发薪统计情况</p>}
            <TableReport
              style={{ padding: '0 20px', }}
              showfoot={false}
              showTotal={false}
              type="mergeTable"
              title={!createPdf && `${index + 1}.2在建工程考勤发薪统计情况`}
              listData={_projBuildingNewStatGxtRpVO[0]}
              listColumns={this.projBuildingNewStatGxtRpVOColum}
              time={this.props.time}
              createPdf={createPdf}
            />
            <TableReport
              style={{ padding: '0 20px', }}
              type="mergeTable"
              listData={_projBuildingNewStatGxtRpVO[1]}
              listColumns={this.projBuildingNewStatGxtRpVOColum}
              time={this.props.time}
              createPdf={createPdf}
              dataSource="住建厅桂建通平台"
            />
          </div>
          {createPdf && <p styleName="title-second">3.3其他项目概览（包含竣工、暂停、未开工）</p>}
          <TableReport
            title={!createPdf && `${index + 1}.3其他项目概览（包含竣工、暂停、未开工）`}
            listData={historyDetailRpDTOList}
            listColumns={historyDetailColumns}
            time={this.props.time}
            createPdf={createPdf}
            dataSource="住建厅桂建通平台"
          />
          <div styleName="flex-box">
            {createPdf && <p styleName="title-second mr-bot-30">3.4其他项目统计数据</p>}
            {!createPdf && <h3 styleName='title'>{`${index + 1}.4其他项目统计数据 `}</h3>}
            <TableReport
              style={{
                padding: '0 0 0 20px',
                width: 'calc(50% - 25px)',
                display: "inline-block"
              }}
              showfoot={false}
              showTotal={false}
              type="mergeTable"
              listData={_projOtherStatGxtRpVO[0]}
              listColumns={this.projOtherStatGxtRpVOColum1}
              time={this.props.time}
              createPdf={createPdf}
            />
            <TableReport
              style={{
                padding: '0 20px 0 0',
                width: 'calc(50% - 25px)',
                marginLeft: '-2px',
                display: "inline-block"
              }}
              showfoot={false}
              showTotal={false}
              type="mergeTable"
              listData={_projOtherStatGxtRpVO[1]}
              listColumns={this.projOtherStatGxtRpVOColum2}
              time={this.props.time}
              createPdf={createPdf}
            />
            <p styleName="tip">数据来源：住建厅桂建通平台</p>
          </div>
          {createPdf && <p styleName="title-second">3.5企业资质资格</p>}
          <TableReport
            title={!createPdf && `${index + 1}.5企业资质资格`}
            listData={jzscQualificationBean}
            listColumns={QualificationColumns}
            time={this.props.time}
            createPdf={createPdf}
            dataSource="全国建筑市场监管公共服务平台"
          />
          {createPdf && <p styleName="title-second">3.6不良行为</p>}
          <TableReport
            title={!createPdf && `${index + 1}.6不良行为`}
            listData={jzscBadBehaviorInfoBean}
            listColumns={BadBehaviorColumns}
            time={this.props.time}
            createPdf={createPdf}
            dataSource="全国建筑市场监管公共服务平台"
          />
          {createPdf && <p styleName="title-second">3.7失信联合惩戒记录</p>}
          <TableReport
            title={!createPdf && `${index + 1}.7失信联合惩戒记录`}
            listData={jzscPunishCompBeanList}
            listColumns={PunishColumns}
            time={this.props.time}
            createPdf={createPdf}
            dataSource="全国建筑市场监管公共服务平台"
          />
          {createPdf && <p styleName="title-second">3.8黑名单记录</p>}
          <TableReport
            title={!createPdf && `${index + 1}.8黑名单记录`}
            listData={jzscBlackListCompBeanList}
            listColumns={BlackListColumns}
            time={this.props.time}
            createPdf={createPdf}
            dataSource="全国建筑市场监管公共服务平台"
          />
        </>}
      </div >
    );
  }
}

export default DeepReport;
