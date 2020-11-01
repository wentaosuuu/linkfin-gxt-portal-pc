import React, { useState, useEffect, useRef } from 'react';
import './index.scss';

export default props => {

  const {
    name,
    rows,
    cols,
    required, // 是否显示必填提示
    formRef, // 直接控制input的ref
    label, // String，为空不显示label
    value, // 初始值
    errorFlag, // 表单验证是否通过
    ...other 
  } = props;

  const inputBox = useRef(null);
  const [showCleanBtn, setCleanFlag] = useState(false);
  const [isInputZh, setInputZh] = useState(false);

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
      styleName={`gxt-input-wrap ${errorFlag ? 'error' : ''}`}
      ref={inputBox}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseOver={handleMouseover}>
      <textarea
        name={name}
        id={name}
        cols={cols}
        rows={rows}
        ref={formRef}
        styleName="gxt-textarea"
        defaultValue={value}
        required={required}
        onInput={handleInput}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        {...other}
      ></textarea>
      <span styleName={`icon-close ${ showCleanBtn ? 'active' : ''}`}  onClick={clean}></span>
    </div>
  </div>
}