import React, { useState, useEffect } from 'react';
import Layout from '@src/components/layout/index';
import BreadCrumps from '@src/components/breadCrumps';
import Button from '@src/components/button/btn';
import DropList from '@src/components/dropList';
import { Input, TextArea, File } from '@src/components/form';
import Alert from '@src/components/alert';
import Cookie from 'js-cookie';
import { useForm } from 'react-hook-form';
// import { useForm } from 'react-hook-form/dist/react-hook-form.ie11';
import { isMoneyNumber, maxLength3Number, isPhone } from '@src/helpers/validate';
import Axios from 'axios';
import './styles/application.scss';

const defaultImg = require('@src/assets/img/jinrongLog.png');

export default props => {
  const { details, getContactInfo, guarantyStyle, title, productList } = props;
  const breadCrumps = [
    {
      href: '/products',
      name: '金融产品'
    },
    {
      href: `/products/details/${details.id}`,
      name:'产品详情'
    },
    {
      href: '#',
      name:'产品申请'
    },
  ];
  const headerData = { isHome: false, menuIndex: 1, tabIndex: 1, contactInfo: getContactInfo };
  const { register, handleSubmit, errors, clearError } = useForm({mode: "onBlur"});
  const [isSubmited, setSubmitFlag] = useState(false);
  const [files, setFiles] = useState([]);
  const [companyInfo, setCompanyInfo] = useState({});
  const [accountInfo, setAccountInfo] = useState({});
  const [guarantyStyleValue, setGuarantyValue] = useState('');
  
  useEffect(() => {
    getCompanyInfo();
    getAccountBasicInfo();
  }, []);


  // 获取账号公司信息
  const getCompanyInfo = () => {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    let data = {
      phone: userInfo.phone
    };
    Axios
      .post('/financial/contact/company', data, {
        headers: {
          'loginUserId': userInfo.id
        }
      })
      .then(d => {
        if(d.code !== '200') return false;
        setCompanyInfo(d.data);
      });
  };
  // 获取账号基本信息
  const getAccountBasicInfo = () => {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    let data = {
      key: JSON.parse(localStorage.getItem('userInfo')).phone
    };
    Axios
      .post('/financial/enterprise/account/basic/info', data, {
        headers: {
          'loginUserId': userInfo.id
        }
      })
      .then(d => {
        if(d.data && d.data.attestationState === 1) {
          setSubmitFlag(true);
        } else {
          setSubmitFlag(false);
        }
        setAccountInfo(d.data || {});
        checkApplyed(d.data.id);
      });
  }

  // 判断是否可以申请相应产品
  const checkApplyed = async (id) => {
    let data = {
      companyId: id,
      productId: details.id
    };
    Axios
      .post('/financial/enterprise/account/product/canApply', data)
      .then(d => {
        if(d.data !== null){
          Alert.warn({msg: d.message});
          setSubmitFlag(true);
          return false;
        }
        setSubmitFlag(false);
      });
  }

  // 表单提交
  const onSubmit = data => {
    setSubmitFlag(true);
    data.guarantyStyle = +data.guarantyStyle;
    let params = {
      ...data,
      filePath: files.length && files.join(',') || '',
      id: details.id,
      companyId: accountInfo.id,
    }
    if(!params.guarantyStyle){
      Alert.warn({msg: '请选择担保方式'});
      setSubmitFlag(false);
      return false;
    }
    Axios
      .post('/financial/enterprise/account/needs/add', params)
      .then(d => {
        if(d.code !== '200') {
          Alert.error({msg: '申请失败，请联系管理员'});
          setSubmitFlag(false);
          return false;
        }
        Cookie.set("toastMsg", "申请成功");
        location.href = '/products';
      });
    
  };
  // 处理上传文件回调
  const handleUpload = (data) => {
    if(data.type === 'delete') {
      files.splice(data.index, 1);
      setFiles([...files]);
    } else {
      setFiles([...files, data.data]);
    }
  };
  // 获取担保方式下拉值
  const getGuarantyStyle = (payload) => {
    clearError('guarantyStyle');
    setGuarantyValue(payload.value);
  };

  return (
    <Layout footerData={getContactInfo} headerData={headerData} title={title} menuData={productList}>
      <div styleName="bg-grey">
        <div className="wrap">
          <BreadCrumps hrefs={breadCrumps}></BreadCrumps>
          <div styleName="goods-top-outer">
            <div styleName="logo">
              <p styleName="p-name">{details.productName}</p>
              <span styleName="line"></span>
              <p styleName="c-name">{details.financialInstitutionsName}</p>
            </div>
            <div styleName="infos">
              <div styleName="line">
                <div styleName="item">
                  <img src={require('@src/assets/img/organ_brief/enterprise_info_3.png')} alt=""/>
                  <div styleName="text">
                    <p styleName="sub">企业名称</p>
                    <p styleName="val">{accountInfo.companyName}</p>
                  </div>
                </div>
                <div styleName="item">
                  <img src={require('@src/assets/img/organ_brief/enterprise_info_0.png')} alt=""/>
                  <div styleName="text">
                    <p styleName="sub">注册区域</p>
                    <p styleName="val">{`${accountInfo.provinces || ''}-${accountInfo.provincesAndCities || ''}-${accountInfo.area || ''}`}</p>
                  </div>
                </div>
              </div>
              <div styleName="line">
              <div styleName="item">
                <img src={require('@src/assets/img/organ_brief/enterprise_info_2.png')} alt=""/>
                  <div styleName="text">
                    <p styleName="sub">统一社会信用代码</p>
                    <p styleName="val">{accountInfo.unifiedSocialCreditCode}</p>
                  </div>
                </div>
                <div styleName="item">
                  <img src={require('@src/assets/img/organ_brief/enterprise_info_1.png')} alt=""/>
                  <div styleName="text">
                    <p styleName="sub">法定代表人姓名</p>
                    <p styleName="val">{accountInfo.contactName}</p>
                  </div>
                </div>
              </div>
              <div styleName="line tip">
                <p>※ 具体产品信息、申请条件、提交材料、办理流程等以金融机构有关规定为准。</p>
              </div>
            </div>
          </div>
          <div styleName="form-box">
            <form>
              <div styleName="line">
                <div styleName="form-group">
                  <Input
                    formRef={register({required: true, validate: value => isMoneyNumber(value) && +value > 0})}
                    errorFlag={errors.financingMoney}
                    placeholder="请填写申请金额，如50,200"
                    type="text"
                    label="贷款金额(万元)："
                    name="financingMoney"
                    required
                  ></Input>
                  <p styleName="error-tip">{errors.financingMoney && errors.financingMoney.type === 'required' && <span>请输入申请金额</span>}</p>
                  <p styleName="error-tip">{errors.financingMoney && errors.financingMoney.type === 'validate' && <span>最多允许输入6位整数及2位小数</span>}</p>
                </div>
                <div styleName="form-group">
                  <Input
                    formRef={register({required: true, validate: value => maxLength3Number(value) && +value > 0})}
                    errorFlag={errors.financingTimeLimit}
                    required
                    placeholder="请填写申请期限"
                    type="text"
                    label="贷款期限(月)："
                    name="financingTimeLimit"
                  ></Input>
                  <p styleName="error-tip">{errors.financingTimeLimit && errors.financingTimeLimit.type === 'required' && <span>请填写申请期限</span>}</p>
                  <p styleName="error-tip">{errors.financingTimeLimit && errors.financingTimeLimit.type === 'validate' && <span>期限输入错误，最多允许输入3位整数</span>}</p>
                </div>
              </div>
              <div styleName="line">
                <div styleName="form-group">
                  <DropList
                    errorFlag={errors.guarantyStyle}
                    placeholder="请选择担保方式"
                    formRef={register({required: true})}
                    label="担保方式："
                    name="guarantyStyle"
                    width="310px"
                    currentValue={guarantyStyleValue}
                    list={guarantyStyle}
                    callback={getGuarantyStyle}
                    required
                  ></DropList>
                  <p styleName="error-tip">{errors.guarantyStyle && <span>请选择担保方式</span>}</p>
                </div>
              </div>
              <div styleName="line">
                <div styleName="form-group">
                  <TextArea
                    formRef={register({required: true})}
                    errorFlag={errors.financingPurpose}
                    cols="130"
                    rows="3"
                    required
                    placeholder="请填写贷款用途"
                    label="贷款用途："
                    name="financingPurpose"
                  ></TextArea>
                  <p styleName="error-tip">{errors.financingPurpose && <span>请填写贷款用途</span>}</p>
                </div>
              </div>
              <div styleName="line">
                <div styleName="form-group">
                  <Input
                    defaultValue={companyInfo.contactName}
                    formRef={register({required: true})}
                    errorFlag={errors.ee}
                    placeholder="请填写联系人"
                    type="text"
                    label="联系人："
                    name="contactPerson"
                    maxLength="10"
                    required
                  ></Input>
                  <p styleName="error-tip">{errors.contactPerson && <span>请填写联系人</span>}</p>
                </div>
                <div styleName="form-group">
                  <Input
                    defaultValue={companyInfo.contactPhone}
                    formRef={register({required: true, validate: value => isPhone(value)})}
                    errorFlag={errors.contactPhone}
                    required
                    placeholder="请填写联系电话"
                    type="text"
                    label="联系电话："
                    name="contactPhone"
                  ></Input>
                  <p styleName="error-tip">{errors.contactPhone && errors.contactPhone.type === 'required' && <span>请输入手机号码</span>}</p>
                  <p styleName="error-tip">{errors.contactPhone && errors.contactPhone.type === 'validate' && <span>手机号码格式不正确</span>}</p>
                </div>
              </div>
              <div styleName="line">
                <div styleName="form-group">
                  <File
                    csrf={props.csrf}
                    url="/financial/enterprise/account/upload/file"
                    label="提交材料："
                    name="file"
                    multiple
                    fileTypes={[
                      "jpg",
                      "jpeg",
                      "png",
                      "bmp",
                      "pdf"
                    ]}
                    callback={handleUpload}
                    maxLength={10}
                  ></File>
                  <p styleName="notice-tip"><span>* 请点击"+"上传材料，所有上传文件需加盖公司公章，支持jpg/jpeg/png/bmp/pdf格式，最大上传个数为10个</span></p>
                </div>
              </div>
            </form>
            <div styleName="btns">
              <Button disabled={isSubmited} type="error" onClick={handleSubmit(onSubmit)}>立即申请</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
