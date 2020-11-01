import React, { useState, useRef } from "react";
import Popup from "../popup";
import "./index.scss";

export default (props) => {
  const { footerData, className } = props;
  // console.log(footerData)
  const [popupEl, updatePopup] = useState(null);
  const option = {
    canClickClose: true,
    title: "免责声明",
    showCloseBtn: true,
  };
  function showPopup() {
    popupEl.setDisplay(true);
  }
  return (
    <div styleName="footer-wrap" className={className}>
      <Popup ref={(el) => updatePopup(el)} option={option}>
        <div className="popup-content">
          <p>
            感谢您访问、浏览或使用广西中小企业融资信用信息平台(以下简称平台)，
            用户应当按照平台的有关管理规则提交注册信息并保证注册信息的真实性和完整性。
          </p>
          <p>
            一、平台不对其用户发布在平台上的任何信息和资料的真实性和有效性负责，获得及使用这些信息的用户应自行核实。
            <strong>
              因为信息虚假或者失效而引起的问题及其后果，平台不承担任何责任。
            </strong>
          </p>
          <p>
            二、平台上关于用户发布的任何信息(包括但不限于注册信息、企业/机构信息、名称、联系人及联络信息、融资申请、产品的描述和说明、图片、视频、言论等)均由用户自行提供，
            <strong>
              因此而产生的责任均由用户提供者本人全部承担，与平台无关。
            </strong>
          </p>
          <p>
            三、用户对平台的使用不得违反法律、法规、社会道德及本平台的相关规定，谢绝出于其他目的的使用行为。
          </p>
          <p>
            四、平台因维护、升级可能会不定期的中断提供服务；因您操作不当、电脑病毒或黑客攻击可能也会引发暂时的服务中断。您接受本声明，视为同意上述单方面的服务中断。本平台将会对可预料的中断服务提供告知(如在平台上公告或以电子邮件或短信等方式通知)。如发生服务中断，本平台会争取在最短的时间内恢复服务。但是，
            <strong>因上述原因导致您遭受的损失，由您本人承担。</strong>
          </p>
          <p>五、关于数据使用的声明</p>
          <p>1）平台对非平台运营方过错造成的数据误差不承担责任；</p>
          <p>
            2）平台对用户非法取得、授权过期、未经授权或未经转授权等行为不承担责任，客户因上述原因提起索赔的，过错方承担违约责任，并向平台偿付索赔款；
          </p>
          <p>
            3）平台提供的企业征信数据信息是基于乙方复杂数据分析技术处理形成的结果，无法对该技术分析结果的真实性与客观实际情况一致性负责，不保证其内容的准确性、全面性和辅助决策的价值性，仅作为金融机构判断结果的参考依据项之一，若任何人通过使用该数据分析结果做出任何行为，该行为相关权利义务由行为人自行承担，平台对金融机构运用上述数据与信息所做判断及后果不承担责任；
          </p>
          <p>
            4）查询人必须依法使用查询信息，不得用于非法目的和不正当用途。非法使用本网站信息给他人造成损害的，由使用人自行承担相应责任。
          </p>
        </div>
      </Popup>
      <div styleName="main">
        <span onClick={showPopup}>免责声明</span>
        客户服务热线：
        <i>{footerData.contactPhoneOne && footerData.contactPhoneOne}</i>
      </div>
      <div styleName="content">
        <div>
          <span>{footerData.recordInformation}</span>
          {/* <img src={require('../../assets/img/common/badge.png')} /> */}
          <a
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=45010802000178"
            target="_blank"
          >
            桂公网安备 45010802000178号
          </a>
        </div>
        <div>
          <p>地址：{footerData.contactAddress}</p>
          <p style={{ marginLeft: "10px" }}>
            传真：{footerData.contactPhoneTwo}
          </p>
          <p style={{ marginLeft: "10px" }}>Email：{footerData.contactEmail}</p>
        </div>
        <div>
          <p>技术支持：广西联合征信有限公司</p>
          <p style={{ marginLeft: "20px" }}>
            指导单位：中国人民银行南宁中心支行
          </p>
        </div>
      </div>
    </div>
  );
};
