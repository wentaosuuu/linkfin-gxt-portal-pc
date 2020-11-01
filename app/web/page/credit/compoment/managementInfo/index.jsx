import React, { Component } from "react";
import TableReport from "@src/components/tableReport";
const taxColumns = [ // 税务评级
  {
    name: '评价年度',
    key: item => item.year || '-',
  },
  {
    name: '纳税等级',
    key: item => item.grade || '-',
  },
  {
    name: '类型',
    key: item => item.type || '-',
  },
  {
    name: '纳税人识别号',
    key: item => item.idNumber || '-',
  },
  {
    name: '评价单位',
    key: item => item.evalDepartment || '-',
  },
];
const newsColumns = [ // 新闻舆情
  {
    name: '新闻标题',
    key: item => item.title || '-',
  },
  {
    name: '发布时间',
    key: item => item.rtm || '-',
    attr: {
      width: '180px',
    }
  },
  {
    name: '数据来源',
    key: item => item.website || '-',
    attr: {
      width: '150px',
    }
  },
  {
    name: '操作',
    key: item => item.uri ? <a href={item.uri} target="_blank" style={{ color: '#2C97DE' }}>查看</a> : '-',
    attr: {
      width: '80px',
    }
  },
];
const bidsColumns = [ // 招投标
  {
    name: '发布日期',
    key: item => item.publishTime || '-',
    attr: {
      width: '120px',
    }
  },
  {
    name: '标题',
    key: item => item.title || '-',
  },
  {
    name: '采购人',
    key: item => item.purchaser || '-',
    attr: {
      width: '180px',
    }
  },
  {
    name: '操作',
    key: item => item.link ? <a href={item.link} target="_blank" style={{ color: '#2C97DE' }}>查看</a> : '-',
    attr: {
      width: '80px',
    }
  },
];
const certificateColumns = [ // 证书信息
  {
    name: '发证日期',
    key: item => item.startDate || '-',
  },
  {
    name: '证书类型',
    key: item => item.certificateName || '-',
  },
  {
    name: '证书编号',
    key: item => item.certNo || '-',
  },
  {
    name: '截止日期',
    key: item => item.endDate || '-',
  },
];

const licenseGSColumns = [ // 行政许可【工商数据】
  {
    name: '许可书文编号',
    key: item => item.licenceNumber || '-',
  },
  {
    name: '许可文件名称',
    key: item => item.licenceName || '-',
  },
  {
    name: '有效期自',
    key: item => item.fromDate || '-',
  },
  {
    name: '有效期至',
    key: item => item.toDate || '-',
  },
  {
    name: '许可机关',
    key: item => item.department || '-',
  },
  {
    name: '许可内容',
    key: item => item.scope || '-',
  },
];
const licenseCreditchinaColumns = [ // 行政许可【信用中国】
  {
    name: '行政许可文书号',
    key: item => item.licenceNumber || '-',
  },
  {
    name: '许可决定机关',
    key: item => item.department || '-',
  },
  {
    name: '许可决定日期',
    key: item => item.decisionDate || '-',
  },
];
const importAndExportColumns = [ // 进出口信用
  {
    name: '注册海关',
    key: item => item.customsRegisteredAddress || '-',
  },
  {
    name: '海关编码',
    key: item => item.crCode || '-',
  },
  {
    name: '经营类别',
    key: item => item.managementCategory || '-',
  },
  {
    name: '信用等级',
    key: item => item.creditRating || '-',
  },
];
const rmploymentsColumns = [ // 招聘信息
  {
    name: '发布时间',
    key: item => item.startdate || '-',
  },
  {
    name: '招聘职位',
    key: item => item.title || '-',
  },
  {
    name: '薪资',
    key: item => item.oriSalary || '-',
  },
  {
    name: '工作经验',
    key: item => item.experience || '-',
  },
  {
    name: '所在城市',
    key: item => item.city || '-',
  },
  {
    name: '来源',
    key: item => item.source || '-',
  },
];
class ManagementInfo extends Component {
  state = {};
  render() {
    const {
      compTaxCreditRpDTOList, // 税务评级
      compNewsBeanlist, // 新闻舆情 
      compBidsRpDTOList, // 招投标 
      compCertificateRpDTOList, // 证书信息
      compLicenseGSRpDTOList, // 行政许可【工商数据】
      compLicenseCreditchinaRpDTOList, // 行政许可【信用中国】
      compImportAndExportRpDTOList, // 进出口信用
      compRmploymentsRpDTOList, // 招聘信息
    } = this.props.compBusiInfoGxtRpVO;
    const { index, mainNo } = this.props;
    const _mainNo = this.props.createPdf ? `${mainNo}` : `${index + 1}`;
    return <div>
      <TableReport
        title={`${_mainNo}.1税务评级`}
        listData={compTaxCreditRpDTOList}
        listColumns={taxColumns}
        time={this.props.time}
        createPdf={this.props.createPdf}
      />
      <TableReport
        title={`${_mainNo}.2新闻舆情`}
        listData={compNewsBeanlist}
        listColumns={newsColumns}
        time={this.props.time}
        createPdf={this.props.createPdf}
      />
      <TableReport
        title={`${_mainNo}.3招投标`}
        listData={compBidsRpDTOList}
        listColumns={bidsColumns}
        time={this.props.time}
        createPdf={this.props.createPdf}
      />
      <TableReport
        title={`${_mainNo}.4证书信息`}
        listData={compCertificateRpDTOList}
        listColumns={certificateColumns}
        time={this.props.time}
        createPdf={this.props.createPdf}
      />
      <TableReport
        title={`${_mainNo}.5行政许可【工商数据】`}
        listData={compLicenseGSRpDTOList}
        listColumns={licenseGSColumns}
        time={this.props.time}
        createPdf={this.props.createPdf}
      />
      <TableReport
        title={`${_mainNo}.6行政许可【信用中国】`}
        listData={compLicenseCreditchinaRpDTOList}
        listColumns={licenseCreditchinaColumns}
        time={this.props.time}
        createPdf={this.props.createPdf}
        dataSource="信用中国"
      />
      <TableReport
        title={`${_mainNo}.7进出口信用`}
        listData={compImportAndExportRpDTOList}
        listColumns={importAndExportColumns}
        time={this.props.time}
        createPdf={this.props.createPdf}
        dataSource="海关总署"
      />
      <TableReport
        title={`${_mainNo}.8招聘信息`}
        listData={compRmploymentsRpDTOList}
        listColumns={rmploymentsColumns}
        time={this.props.time}
        createPdf={this.props.createPdf}
        dataSource="互联网信息"
      />
    </div>;
  }
}

export default ManagementInfo;
