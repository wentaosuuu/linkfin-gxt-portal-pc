import React, { useState, useEffect, useRef } from 'react';
import Icon from '@src/components/icon';
import './index.scss';

export default props => {

  const {
    name,
    type,
    disabled,
    required, // 是否显示必填提示
    formRef, // 直接控制input的ref
    label, // String，为空不显示label
    defaultValue = '', // 初始值
    errorFlag, // 表单验证是否通过
    iconType = '', // 自定义icon类型
    iconColor = '#333', // 自定义IIcon 颜色
    iconClass = '', // 自定义Icon的类名
    ...other 
  } = props;

  const inputBox = useRef(null);
  const [showCleanBtn, setCleanFlag] = useState(false);
  const [isInputZh, setInputZh] = useState(false);
  const [currentValue, setValue] = useState('');
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue])

  const clean = () => {
    const input = inputBox.current.children[0];
    input.value = '';
    input.focus();
  };
  const handleCompositionEnd = () =>{
    if(inputBox.current.children[0].value.length) setCleanFlag(true);
    setInputZh(false);
  };
  const handleCompositionStart = () =>{
    setInputZh(true);
  };
  const handleInput = (e) => {
    if(isInputZh) return false;
    if(inputBox.current.children[0].value.length) setCleanFlag(true);
  };
  const handleFocus = (e) => {
    if(inputBox.current.children[0].value.length) setCleanFlag(true);
  };
  const handleBlur = (e) => {
    setCleanFlag(false);
  };
  const handleMouseover = (e) => {
    if(inputBox.current.children[0].value.length) setCleanFlag(true);
  };


  return <div styleName="gxt-input-box">
    {
      label && <label styleName="gxt-label" htmlFor={name}>
        <span styleName={`required ${required ? 'active' : ''}`}>*</span>
        {label}
      </label>
    }
    <div
      styleName={`gxt-input-wrap ${errorFlag ? 'error' : ''} ${disabled ? 'disabled' : ''}`}
      ref={inputBox}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseOver={handleMouseover}>
      <input
        ref={formRef}
        styleName="gxt-input"
        id={name}
        name={name}
        defaultValue={currentValue}
        type={type}
        disabled={disabled}
        required={required}
        onInput={handleInput}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        {...other}/>
      <span styleName={`icon-close ${ (showCleanBtn && !disabled) ? 'active' : ''}`}  onClick={clean}></span>
    </div>
    <div styleName="custom-icon" style={{color: iconColor}}>
      {
        iconType != '' && <Icon type={iconType} className={iconClass}/>
      }
    </div>
  </div>
}