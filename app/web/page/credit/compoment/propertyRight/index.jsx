import React, { Component } from "react";
import TableReport from "@src/components/tableReport";
const tminfoColumns = [ // 商标信息
  {
    name: '申请日期',
    key: item => item.appDate || '-',
  },
  {
    name: '商标',
    key: item => item.tmPic ? <img src={item.tmPic} width="64" /> : '-',
  },
  {
    name: '商标名称',
    key: item => item.tmName || '-',
  },
  {
    name: '注册号',
    key: item => item.regNo || '-',
  },
  {
    name: '国际分类',
    key: item => item.intCls || '-',
  },
  {
    name: '商标状态',
    key: item => item.status || '-',
  },
];
const patentColumns = [ // 专利信息
  {
    name: '申请公布日',
    key: item => item.applicationPublishTime || '-',
  },
  {
    name: '专利名称',
    key: item => item.patentName || '-',
  },
  {
    name: '申请号/专利号',
    key: item => item.appNumber || '-',
  },
  {
    name: '申请公布号',
    key: item => item.pubNumber || '-',
  },
  {
    name: '专利类型',
    key: item => item.patentType || '-',
  },
];
const copyrightColumns = [ // 软件著作权
  {
    name: '批准日期',
    key: item => item.regtime || '-',
  },
  {
    name: '软件全称',
    key: item => item.fullname || '-',
  },
  {
    name: '登记号',
    key: item => item.regnum || '-',
  },
  {
    name: '分类号',
    key: item => item.catnum || '-',
  },
  {
    name: '版本号',
    key: item => item.version || '-',
  },
];
const copyregworksColumns = [ // 作品著作权
  {
    name: '作品名称',
    key: item => item.fullname || '-',
  },
  {
    name: '登记号',
    key: item => item.regnum || '-',
  },
  {
    name: '登记类别',
    key: item => item.type || '-',
  },
  {
    name: '创作完成日期',
    key: item => item.finishTime || '-',
  },
  {
    name: '登记日期',
    key: item => item.regtime || '-',
  },
  {
    name: '首次发布日期',
    key: item => item.publishtime || '-',
  },
];
const websiteRecordColumns = [ // 网站备案
  {
    name: '审核日期',
    key: item => item.examineDate || '-',
  },
  {
    name: '网站名称',
    key: item => item.webName || '-',
  },
  {
    name: '网站',
    key: item => item.webSite || '-',
  },
  {
    name: '域名',
    key: item => item.ym || '-',
  },
  {
    name: '备案/许可证号',
    key: item => item.liscense || '-',
  },
];
const teleCommunicationLicenseColumns = [ // 电信许可
  {
    name: '许可证号',
    key: item => item.licenseNumber || '-',
  },
  {
    name: '业务及其覆盖范围',
    key: item => item.businessScope || '-',
  },
  {
    name: '是否有效',
    key: item => item.isAvailable || '-',
  },
];
class PropertyRight extends Component {
  state = {};
  static defaultProps = {
    createPdf: false
  };
  render() {
    const {
      compTminfoRpDTOList, // 商标信息
      compPatentRpDTOList, // 专利信息
      compCopyrightRpDTOList, // 软件著作权
      compCopyregworksRpDTOList, // 作品著作权
      compWebsiteRecordRpDTOList, // 网站备案
      compTeleCommunicationLicenseRpDTOList, // 电信许可
    } = this.props.intellecPropetyGxtRpVO;
    const { index, mainNo } = this.props;
    const _mainNo = this.props.createPdf ? `${mainNo}` : `${index + 1}`;
    return <div>
      <TableReport
        title={`${_mainNo}.1商标信息`}
        listData={compTminfoRpDTOList}
        listColumns={tminfoColumns}
        time={this.props.time}
        createPdf={this.props.createPdf}
      />
      <TableReport
        title={`${_mainNo}.2专利信息`}
        listData={compPatentRpDTOList}
        listColumns={patentColumns}
        time={this.props.time}
        createPdf={this.props.createPdf}
      />
      <TableReport
        title={`${_mainNo}.3软件著作权`}
        listData={compCopyrightRpDTOList}
        listColumns={copyrightColumns}
        time={this.props.time}
        createPdf={this.props.createPdf}
      />
      <TableReport
        title={`${_mainNo}.4作品著作权`}
        listData={compCopyregworksRpDTOList}
        listColumns={copyregworksColumns}
        time={this.props.time}
        createPdf={this.props.createPdf}
      />
      <TableReport
        title={`${_mainNo}.5网站备案`}
        listData={compWebsiteRecordRpDTOList}
        listColumns={websiteRecordColumns}
        time={this.props.time}
        createPdf={this.props.createPdf}
      />
      <TableReport
        title={`${_mainNo}.6电信许可`}
        listData={compTeleCommunicationLicenseRpDTOList}
        listColumns={teleCommunicationLicenseColumns}
        time={this.props.time}
        createPdf={this.props.createPdf}
        dataSource="国家工业和信息化部"
      />
    </div>;
  }
}

export default PropertyRight;
