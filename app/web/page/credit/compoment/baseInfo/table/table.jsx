import React, { useEffect } from "react";
import "./table.scss";
export default function (props) {
  const { data, createPdf, title } = props;
  useEffect(() => {
  });
  return (
    <div styleName={createPdf ? 'pdf-container container' : 'container'}>
      <p styleName="title">{title}</p>
      <table styleName="table">
        <tbody>
          <tr styleName="tr">
            <td width="230" styleName="td bloder">
              企业名称
            </td>
            <td styleName="td">{data.name || "暂无数据"}</td>
            <td width="230" styleName="td bloder">
              统一社会信用代码
            </td>
            <td styleName="td">{data.creditCode || "暂无数据"}</td>
          </tr>
          <tr styleName="tr">
            <td width="230" styleName="td bloder">
              企业类型
            </td>
            <td styleName="td">{data.companyOrgType || "暂无数据"}</td>
            <td width="230" styleName="td bloder">
              近一年税务评级
            </td>
            <td styleName="td">{data.lastTaxCredit || "暂无数据"}</td>
          </tr>
          <tr styleName="tr">
            <td width="230" styleName="td bloder">
              法定代表人
            </td>
            <td styleName="td">{data.legalPersonName || "暂无数据"}</td>
            <td width="230" styleName="td bloder">
              核准日期
            </td>
            <td styleName="td">{data.approvedTime || "暂无数据"}</td>
          </tr>
          <tr styleName="tr">
            <td width="230" styleName="td bloder">
              登记机关
            </td>
            <td styleName="td">{data.regInstitute || "暂无数据"}</td>
            <td width="230" styleName="td bloder">
              注册资本(万元)
            </td>
            <td styleName="td">{data.regCapital || "暂无数据"}</td>
          </tr>
          <tr styleName="tr">
            <td width="230" styleName="td bloder">
              登记状态
            </td>
            <td styleName="td">{data.regStatus || "暂无数据"}</td>
            <td width="230" styleName="td bloder">
              人员规模
            </td>
            <td styleName="td">{data.staffNumRange || "暂无数据"}</td>
          </tr>
          <tr styleName="tr">
            <td width="230" styleName="td bloder">
              注册地址
            </td>
            <td styleName="td">{data.regLocation || "暂无数据"}</td>
            <td width="230" styleName="td bloder">
              持续经营年限(年)
            </td>
            <td styleName="td">{typeof data.busiLifeTime === 'number' ? data.busiLifeTime : "暂无数据"}</td>
          </tr>
          <tr styleName="tr">
            <td width="230" styleName="td bloder">
              行业分类
            </td>
            <td styleName="td">{data.industry || "暂无数据"}</td>
            <td width="230" styleName="td bloder">
              成立日期
            </td>
            <td styleName="td">{data.estiblishTime || "暂无数据"}</td>
          </tr>
          <tr styleName="tr">
            <td width="230" styleName="td bloder">
              经营范围
            </td>
            <td styleName="td" colSpan="3">
              {data.businessScope || "暂无数据"}
            </td>
          </tr>
        </tbody>
      </table>
      <p style={{ height: createPdf && 'auto' }} styleName="footer">数据来源：国家信用信息公示系统</p>
    </div>
  );
}
