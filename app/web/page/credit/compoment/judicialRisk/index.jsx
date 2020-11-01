import React, { Component } from "react";
import TableReport from "@src/components/tableReport";

const KtannouncementColumns = [
  // 开庭公告
  {
    name: "开庭日期",
    key: (item) => item.startDate || "-",
  },
  {
    name: "案号",
    key: (item) => item.caseNo || "-",
  },
  {
    name: "案由",
    key: (item) => item.caseReason || "-",
  },
  {
    name: "公诉人/原告/上诉人/申请人",
    key: (item) => item.plaintiff || "-",
  },
  {
    name: "被告人/被告/被上诉人/被申请人",
    key: (item) => item.defendant || "-",
  },
  {
    name: "法院",
    key: (item) => item.court || "-",
  },
];

const LawSuitColumns = [
  // 法律诉讼
  {
    name: "日期",
    key: (item) => item.submittime || "-",
    attr: {
      width: "100px",
    },
  },
  {
    name: "案件名称",
    key: (item) => item.title || "-",
    attr: {
      width: "270px",
    },
  },
  {
    name: "案由",
    key: (item) => item.casereason || "-",
    attr: {
      width: "130px",
    },
  },
  {
    name: "案件身份",
    key: (item) => {
      return item.plaintiffs || item.defendants ? (
        <>
          <p>{item.plaintiffs}</p>
          <p>{item.defendants}</p>
        </>
      ) : (
          "-"
        );
    },
  },
  {
    name: "案号",
    key: (item) => item.caseno || "-",
    attr: {
      width: "200px",
    },
  },
  {
    name: "查看详情",
    key: (item) =>
      item.url ? (
        <a href={item.url} target="_blank" style={{ color: "#2C97DE" }}>
          详情
        </a>
      ) : (
          "-"
        ),
    attr: {
      width: "80px",
    },
  },
];

const CourAnnouncementColumns = [
  // 法院公告
  {
    name: "刊登日期",
    key: (item) => item.publishdate || "-",
    attr: {
      width: "80px",
    },
  },
  {
    name: "上诉方",
    key: (item) => item.party1 || "-",
    attr: {
      width: "80px",
    },
  },
  {
    name: "被诉方",
    key: (item) => item.party2 || "-",
    attr: {
      width: "80px",
    },
  },
  {
    name: "公告类型",
    key: (item) => item.bltntypename || "-",
    attr: {
      width: "80px",
    },
  },
  {
    name: "案件内容",
    key: (item) => item.content || "-",
  },
  {
    name: "法院",
    key: (item) => item.courtcode || "-",
    attr: {
      width: "80px",
    },
  },
];

const ExecutorColumns = [
  // 被执行人
  {
    name: "立案日期",
    key: (item) => item.caseCreateTime || "-",
  },
  {
    name: "执行标的(元)",
    key: (item) => item.execMoney || "-",
  },
  {
    name: "案号",
    key: (item) => item.caseCode || "-",
  },
  {
    name: "执行法院",
    key: (item) => item.execCourtName || "-",
  },
];

const DishonestColumns = [
  // 失信信息
  {
    name: "发布日期",
    key: (item) => item.publishdate || "-",
  },
  {
    name: "案号",
    key: (item) => item.casecode || "-",
  },
  {
    name: "执行法院",
    key: (item) => item.courtname || "-",
  },
  {
    name: "履行情况",
    key: (item) => item.performance || "-",
    attr: {
      width: 60,
    },
  },
  {
    name: "执行依据文号",
    key: (item) => item.gistid || "-",
  },
  {
    name: "失信人",
    key: (item) => item.iname || "-",
  },
  {
    name: "失信人类型",
    key: (item) => item.type || "-",
    attr: {
      width: 60,
    },
  },
  {
    name: "义务",
    key: (item) => item.duty || "-",
    attr: {
      width: 400,
    },
  },
  {
    name: "失信被执行人行为具体情形",
    key: (item) => item.disrupttypename || "-",
  },
  {
    name: "立案日期",
    key: (item) => item.regdate || "-",
  },
];


const JudicialColumns = [
  // 司法协助
  {
    name: "被执行人",
    key: (item) => item.executedPerson || "-",
  },
  {
    name: "股权数额",
    key: (item) => item.equityAmount || "-",
  },
  {
    name: "执行法院",
    key: (item) => item.executiveCourt || "-",
  },
  {
    name: "执行通知文号",
    key: (item) => item.executeNoticeNum || "-",
  },
  {
    name: "类型|状态",
    key: (item) => item.typeState || "-",
  },
];

class JudicialRisk extends Component {
  state = {};

  render() {
    const {
      compKtannouncementRpDTOList, // 开庭公告
      compLawSuitRpDTOList, // 法律诉讼
      compCourtAnnouncementRpDTOList, // 法院公告
      compExecutorRpDTOList, // 被执行人
      compDishonestvRpDTOList, // 失信信息
      compJudicialRpDTOList, // 司法协助
    } = this.props.judicialInfoGxtRpVO;
    const { mainNo, index } = this.props;
    const _mainNo = this.props.createPdf ? `${mainNo}` : `${index + 1}`;
    return (
      <>
        <TableReport
          title={`${_mainNo}.1开庭公告`}
          createPdf={this.props.createPdf}
          listData={compKtannouncementRpDTOList}
          listColumns={KtannouncementColumns}
          time={this.props.time}
        />
        <TableReport
          title={`${_mainNo}.2法律诉讼`}
          createPdf={this.props.createPdf}
          listData={compLawSuitRpDTOList}
          listColumns={LawSuitColumns}
          time={this.props.time}
        />
        <TableReport
          title={`${_mainNo}.3法院公告`}
          createPdf={this.props.createPdf}
          listData={compCourtAnnouncementRpDTOList}
          listColumns={CourAnnouncementColumns}
          time={this.props.time}
        />
        <TableReport
          title={`${_mainNo}.4被执行人`}
          createPdf={this.props.createPdf}
          listData={compExecutorRpDTOList}
          listColumns={ExecutorColumns}
          time={this.props.time}
        />
        <TableReport
          title={`${_mainNo}.5失信信息`}
          createPdf={this.props.createPdf}
          listData={compDishonestvRpDTOList}
          listColumns={DishonestColumns}
          time={this.props.time}
        />
        <TableReport
          title={`${_mainNo}.6司法协助`}
          createPdf={this.props.createPdf}
          listData={compJudicialRpDTOList}
          listColumns={JudicialColumns}
          time={this.props.time}
        />
      </>
    );
  }
}

export default JudicialRisk;
