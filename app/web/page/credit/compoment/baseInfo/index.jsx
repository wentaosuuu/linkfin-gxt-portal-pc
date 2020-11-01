import React, { PureComponent } from 'react';
import TableReport from '@src/components/tableReport';
import ReportWrap from '@src/components/tableReport/reportWrap';
import Table from './table/table';
import moment from 'moment';
import './index.scss';

const StockHolderColumns = [
  // 股东信息
  {
    name: '股东名称',
    key: (item) => item.name || '-',
  },
  {
    name: '股东类型',
    key: (item) => item.type || '-',
  },
  {
    name: '出资额(万元)',
    key: (item) => item.capitalAmomon || '-',
  },
  {
    name: '持股比例',
    key: (item) => item.capitalPercent || '-',
  },
  {
    name: '认缴出资时间',
    key: (item) => item.capitalTime || '-',
  },
];
const KeyPersonColumns = [
  // 主要人员
  {
    name: '姓名',
    key: (item) => item.name || '-',
  },
  {
    name: '职务',
    key: (item) => item.typeJoin || '-',
  },
];
const InvestmentColumns = [
  // 对外投资
  {
    name: '被投资企业名称',
    key: (item) => item.name || '-',
  },
  {
    name: '被投资法定代表人',
    key: (item) => item.legalPersonName || '-',
  },
  {
    name: '投资占比',
    key: (item) => item.percent || '-',
  },
  {
    name: '注册资本(万元)',
    key: (item) => (item.regCapital ? item.regCapital : '-' || '-'),
  },
  {
    name: '投资金额(万元)',
    key: (item) => item.amount || '-',
  },
  {
    name: '成立日期',
    key: (item) => item.estiblishTime || '-',
  },
  {
    name: '经营状态',
    key: (item) => item.regStatus || '-',
  },
  {
    name: '拥有公司数量',
    key: (item) => item.toco || '-',
  },
];
const ChangeLogColumns = [
  // 变更记录
  {
    name: '变更日期',
    key: (item) => item.changeTime || '-',
    attr: {
      width: '80px',
    },
  },
  {
    name: '变更项目',
    key: (item) => item.changeItem || '-',
    attr: {
      width: '120px',
    },
  },
  {
    name: '变更前',
    key: (item) => item.contentBefore || '-',
  },
  {
    name: '变更后',
    key: (item) => item.contentAfter || '-',
  },
];
const BranchColumns = [
  // 分支机构
  {
    name: '企业名称',
    key: (item) => item.name || '-',
  },
  {
    name: '负责人',
    key: (item) => item.legalpersonname || '-',
  },
  {
    name: '成立日期',
    key: (item) => item.estiblishTime || '-',
  },
  {
    name: '经营状态',
    key: (item) => item.regStatus || '-',
  },
  {
    name: '拥有公司数量',
    key: (item) => item.toco || '-',
  },
];
const Humanholding = [ // 疑似最终受益人
  {
    name: '最终受益人名称',
    key: (item) => item.name || '-',
  }, {
    name: '持股比例',
    key: (item) => <span>{item.percent}</span> || '-',
  }, {
    name: '股权链',
    key: (item) => {
      return <>
        {item.chainlistSelf && item.chainlistSelf.map((v, i) => {
          return <div style={{ textAlign: 'left' }} key={i}>
            <p styleName="title">路径{i + 1}（占比约{v[0].percent}）</p>
            {v.map((_v, _i, _arr) => {
              return <div styleName="line-box" key={_i}>
                {_v.name}
                {_arr[_i + 1] && <div styleName="line">
                  <div styleName="cret">
                    <span styleName="top">{_arr[_i + 1].percent}</span>
                    <div styleName="bottom"></div>
                  </div>
                </div>}
              </div>;
            })}
          </div>;
        })}
      </>;
    }
  }
];
const Companyholding = [ // 疑似实际控制权
  {
    name: '控股企业名称',
    key: (item) => item.name || '-',
  }, {
    name: '持股比例',
    key: (item) => <span>{item.percent}</span> || '-',
  }, {
    name: '股权链',
    key: (item) => {
      return <>
        {item.chainlistSelf && item.chainlistSelf.map((v, i) => {
          return <div style={{ textAlign: 'left' }} key={i}>
            <p styleName="title">路径{i + 1}（占比约{v[0].percent}）</p>
            {v.map((_v, _i, _arr) => {
              return <div styleName="line-box" key={_i}>
                {_v.name}
                {_arr[_i + 1] && <div styleName="line">
                  <div styleName="cret">
                    <span styleName="top">{_arr[_i + 1].percent}</span>
                    <div styleName="bottom"></div>
                  </div>
                </div>}
              </div>;
            })}
          </div>;
        })}
      </>;
    }
  }
];

const CompOutInvestColumns = [ // 企业对外投资
  {
    name: '被投资企业名称',
    key: (item) => item.name || '-'
  },
  {
    name: '被投资法定代表人',
    key: (item) => item.legalPersonName || '-'
  },
  {
    name: '投资占比',
    key: (item) => item.percent || '-'
  },
  {
    name: '注册资本(万元)',
    key: (item) => item.regCapital || '-'
  },
  {
    name: '投资金额(万元)',
    key: (item) => item.amount || '-'
  },
  {
    name: '成立日期',
    key: (item) => item.estiblishTime || '-'
  },
  {
    name: '经营状态',
    key: (item) => item.regStatus || '-'
  }
];
const LegalPersonneOutInvestColumns = [ // 法人对外投资
  {
    name: '被投资企业名称',
    key: (item) => item.name || '-'
  },
  {
    name: '被投资法定代表人',
    key: (item) => item.legalPersonName || '-'
  },
  {
    name: '投资占比',
    key: (item) => item.percent || '-'
  },
  {
    name: '注册资本(万元)',
    key: (item) => item.regCapital || '-'
  },
  {
    name: '投资金额(万元)',
    key: (item) => item.amount || '-'
  },
  {
    name: '成立日期',
    key: (item) => item.estiblishTime || '-'
  },
  {
    name: '经营状态',
    key: (item) => item.regStatus || '-'
  }
];
const LegalPersonneOutServeColumns = [ // 法人对外任职
  {
    name: '担任职位',
    key: (item) => item.type || '-'
  },
  {
    name: '任职企业名称',
    key: (item) => item.name || '-'
  },
  {
    name: '任职企业法定代表人',
    key: (item) => item.legalPersonName || '-'
  },
  {
    name: '注册资本(万元)',
    key: (item) => item.regCapital || '-'
  },
  {
    name: '成立日期',
    key: (item) => item.estiblishTime || '-'
  },
  {
    name: '经营状态',
    key: (item) => item.regStatus || '-'
  }
];

class BaseInfo extends PureComponent {
  state = {};
  static defaultProps = {
    createPdf: false
  };

  render() {
    const {
      compStockStructureBeanList, // 股东信息
      compPryStaflistRpDTOList, // 主要人员
      compInverstRpDTOList, // 对外投资
      compChangeInfoRpDTOList, // 变更记录
      compBranchRpDTOList, // 分支机构
      gxtCompBaseInfoBean, //基本信息
      compLiquidatingRpDTOList, // 清算信息
      compHumanholdingRpDTOList, // 疑似最终受益人
      compCompanyholdingRpDTOList  //疑似实际控制权
    } = this.props.compBaseInfoBean;

    console.log(compInverstRpDTOList);

    const { mainNo, index } = this.props;
    const _mainNo = this.props.createPdf ? `${mainNo}` : `${index + 1}`;
    return (
      <>
        <Table title={`${_mainNo}.1营业执照信息`} data={gxtCompBaseInfoBean} createPdf={this.props.createPdf}/>
        <TableReport
          createPdf={this.props.createPdf}
          title={`${_mainNo}.2股东信息`}
          listData={compStockStructureBeanList}
          listColumns={StockHolderColumns}
          time={this.props.time}
        />
        <TableReport
          createPdf={this.props.createPdf}
          title={`${_mainNo}.3主要人员`}
          listData={compPryStaflistRpDTOList}
          listColumns={KeyPersonColumns}
          time={this.props.time}
        />
        <TableReport
          createPdf={this.props.createPdf}
          title={`${_mainNo}.4对外投资`}
          listData={compInverstRpDTOList}
          listColumns={InvestmentColumns}
          time={this.props.time}
        />

        <TableReport
          createPdf={this.props.createPdf}
          title={`${_mainNo}.4.1企业对外投资`}
          listData={compInverstRpDTOList} // 先这样填着
          listColumns={CompOutInvestColumns}
          time={this.props.time}
        />
        <TableReport
          createPdf={this.props.createPdf}
          title={`${_mainNo}.4.2法人对外投资`}
          listData={compInverstRpDTOList} // 先这样填着
          listColumns={LegalPersonneOutInvestColumns}
          time={this.props.time}
        />
        <TableReport
          createPdf={this.props.createPdf}
          title={`${_mainNo}.4.1法人对外责任`}
          listData={compInverstRpDTOList} // 先这样填着
          listColumns={LegalPersonneOutServeColumns}
          time={this.props.time}
        />


        <TableReport
          createPdf={this.props.createPdf}
          title={`${_mainNo}.5变更记录`}
          listData={compChangeInfoRpDTOList}
          listColumns={ChangeLogColumns}
          time={this.props.time}
        />
        <TableReport
          createPdf={this.props.createPdf}
          title={`${_mainNo}.6分支机构`}
          listData={compBranchRpDTOList}
          listColumns={BranchColumns}
          time={this.props.time}
        />
        <ReportWrap
          createPdf={this.props.createPdf}
          title={`${_mainNo}.7清算信息`}
          showTotal={false}
          showfoot={Boolean(compLiquidatingRpDTOList[0])}
        >
          <Liquidating
            createPdf={this.props.createPdf}
            compLiquidatingRpDTOList={compLiquidatingRpDTOList[0] ? compLiquidatingRpDTOList[0] : {}}
            time={this.props.time}
          />
        </ReportWrap>
        <TableReport
          createPdf={this.props.createPdf}
          title={`${_mainNo}.8疑似最终受益人`}
          listData={compHumanholdingRpDTOList}
          listColumns={Humanholding}
          time={this.props.time}
        />
        <TableReport
          createPdf={this.props.createPdf}
          title={`${_mainNo}.9疑似实际控制权`}
          listData={compCompanyholdingRpDTOList}
          listColumns={Companyholding}
          time={this.props.time}
        />
      </>
    );
  }
}

const Liquidating = props => {
  const { compLiquidatingRpDTOList, createPdf, time } = props;
  return Object.keys(compLiquidatingRpDTOList).length ?
    <table className={!createPdf ? 'vertical-table-wrap' : 'pdf-vertical-table-wrap'}>
      <tbody>
      <tr>
        <th width="150">清算组负责人</th>
        <td>{compLiquidatingRpDTOList.manager || '-'}</td>
      </tr>
      <tr>
        <th>清算组成员</th>
        <td>{compLiquidatingRpDTOList.member || '-'}</td>
      </tr>
      </tbody>
    </table> : <p style={{ fontSize: '14px', color: '#333' }}>
      截止{moment(time)
      .format('YYYY年MM月DD日')}，未查询到相关信息。不排除因信息公开来源尚未公开、公开形式存在差异等情况导致的信息与客观事实不完全一致的情形。仅供参考。
    </p>;
};

export default BaseInfo;
