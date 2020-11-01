import React, {useState, useEffect, useRef} from 'react';
import './settled.scss';
import DropList from '@src/components/dropList';
import Button from '@src/components/button/btn';
import { Input, TextArea } from '@src/components/form';
import { useForm } from 'react-hook-form';
// import { useForm } from 'react-hook-form/dist/react-hook-form.ie11';
import Alert from '@src/components/alert';
import { isMoneyNumber, maxLength3Number, isPhone } from '@src/helpers/validate';
import Axios from 'axios';
export default props => {
  const { phone, callback } = props;
  const { register, handleSubmit, errors, clearError } = useForm({mode: "onBlur"});
  const [isSubmited, setSubmitFlag] = useState(false);
  const [guarantyStyle, setGuarantyStyle] = useState([]);
  const [orgCheckType, setOrgCheckType] = useState('');
  const [creditCode, setCreditCode] = useState('');
  const [compNameTips, setCompNameTips] = useState('');
  const [typeInput, setTypeValue] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    getTypes();
  }, []);

  // 获取机构类型枚举
  const getTypes = () => {
    const params = {
      "type": "financialInstitutionsType"
    }
    Axios
      .post('/financial/sysDynamic/queryAll', params)
      .then(d => {
        if(d.code !== '200') return false;
        let types = [];
        d.data.forEach(item => {
          types.push({
            name: item.value,
            value: item.id
          })
        })
        setGuarantyStyle(types);
      });
  };

  // 校验机构信用代码
  const checkOrg = (e) => {
    const name = document.querySelector('#name').value.trim();
    if(!name || name.length < 4) return false;
    const params = {
      compName:name,
    }
    Axios
      .post('/financial/business/activity/accurateCompCodeTyc', params)
      .then(d => {
        if (d.code !== '200') return alert(d.data.message);
        if(d.data.code == '1') {
          setCompNameTips('请确认您填写的金融机构名称是否有误');
          return false;
        }
        setOrgCheckType('gou');
        setCompNameTips('');
        clearError('creditCode');
        setCreditCode(d.data.creditCode);
      });
  };

  const changeOrg = () => {
    setOrgCheckType('');
    setCreditCode('');
    clearError('creditCode');
  };

  // 提交表单
  const onSubmit = data => {
    if(compNameTips !== '') return false;
    Axios
      .post('/financial/homePage/addBusinessFinancialInstitutionsApply', data)
      .then(d => {
        if (d.code !== '200'){
          Alert.error({msg: d.message});
          return false;
        }
        Alert.succ({msg: '您的申请信息已提交成功，感谢您的支持！'});
        handleCancel();
      });
  };

  const cleanAll = () => {
    setCreditCode('');
    setOrgCheckType('');
    setCompNameTips('');
    setTypeValue('');
    clearError();
    formRef.current.reset();
  };

  // 关闭弹窗
  const handleCancel = () => {
    cleanAll();
    callback();
  };

  const getType = (payload) => {
    clearError('type');
    setTypeValue(payload.value);
  }

  return <div>
    <div styleName="form-box">
      <form ref={formRef}>
        <div styleName="line">
          <div styleName="form-group">
            <DropList
              errorFlag={errors.type}
              placeholder="请选择机构类型"
              formRef={register({required: true})}
              label="机构类型："
              name="type"
              width="308px"
              currentValue={typeInput}
              list={guarantyStyle}
              callback={getType}
              required
            ></DropList>
            <p styleName="error-tip">{errors.type && errors.type.type == 'required' &&  <span>请选择机构类型</span>}</p>
          </div>
        </div>
        <div styleName="line">
          <div styleName="form-group">
            <Input
              formRef={register({required: true})}
              errorFlag={errors.name}
              placeholder="请输入机构名称"
              type="text"
              label="金融机构名称："
              name="name"
              iconType={orgCheckType}
              iconColor="#17ca1e"
              onBlur={checkOrg}
              onChange={changeOrg}
              required
            ></Input>
            <p styleName="error-tip">{errors.name && errors.name.type === 'required' && <span>请输入机构名称</span>}</p>
            <p styleName="error-tip">{compNameTips !== '' && <span>{compNameTips}</span>}</p>
          </div>
        </div>
        <div styleName="line">
          <div styleName="form-group">
            <Input
              formRef={register({required: true})}
              errorFlag={errors.creditCode}
              placeholder=""
              type="text"
              label="统一社会信用代码："
              name="creditCode"
              defaultValue={creditCode}
              disabled
              required
            ></Input>
            <p styleName="error-tip">{errors.creditCode && errors.creditCode.type === 'required' && <span>请先输入机构名称</span>}</p>
          </div>
        </div>
        <div styleName="line">
          <div styleName="form-group">
            <Input
              formRef={register({required: true})}
              errorFlag={errors.financialInstitutionsPerson}
              placeholder="请输入联系人姓名"
              type="text"
              label="联系人姓名："
              name="financialInstitutionsPerson"
              maxLength="20"
              required
            ></Input>
            <p styleName="error-tip">{errors.financialInstitutionsPerson && <span>请输入联系人姓名</span>}</p>
          </div>
        </div>
        <div styleName="line">
          <div styleName="form-group">
            <Input
              formRef={register({required: true, validate: value => isPhone(value)})}
              errorFlag={errors.phone}
              required
              placeholder="请输入联系电话"
              type="text"
              label="联系电话："
              name="phone"
              maxLength={12}
            ></Input>
            <p styleName="error-tip">{errors.phone && errors.phone.type === 'required' && <span>请输入手机号码</span>}</p>
            <p styleName="error-tip">{errors.phone && errors.phone.type === 'validate' && <span>手机号码格式不正确</span>}</p>
          </div>
        </div>
        <div styleName="line">
          <div styleName="form-group">
            <TextArea
              formRef={register({required: false})}
              cols="43"
              rows="3"
              placeholder="请输入联系地址"
              label="联系地址："
              name="address"
              maxLength="50"
            ></TextArea>
          </div>
        </div>
        <div styleName="line">
          <div styleName="form-group">
            <TextArea
              formRef={register({required: false})}
              cols="43"
              rows="3"
              placeholder="请输入机构介绍"
              label="机构介绍："
              name="financialInstitutionsIntroduce"
              maxLength="500"
            ></TextArea>
          </div>
        </div>
      </form>
      <div styleName="btns">
        <Button type="primary" disabled={isSubmited} onClick={handleSubmit(onSubmit)}>提交</Button>
        <Button onClick={handleCancel}>取消</Button>
      </div>
      <p styleName="our-phone">欢迎致电：{phone}</p>
    </div>
  </div>
}