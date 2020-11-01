import React, { useState, useEffect, useRef } from 'react';
import { findDomNode } from 'react-dom';
import Icon from '@src/components/icon';
import './index.scss';

export default (props) => {
  const {
    placeholder,
    formRef,
    width,
    list,
    currentValue = "",
    name,
    label,
    errorFlag,
    required,
    callback
  } = props;
  const [inputValue, setValue] = useState('');
  const [inputText, setText] = useState('');
  const [showList, setShow] = useState(false);
  const dropList = useRef(null);

  useEffect(() => {
    document.body.addEventListener('click', handleBodyClicked);
    return () => {
      document.body.removeEventListener('click', handleBodyClicked);
    }
  }, []);

  useEffect(() => {
    setValue(currentValue);
    setText(list.find(item => item.value == currentValue) && list.find(item => item.value == currentValue).name || placeholder)
  }, [currentValue])

  const handleBodyClicked = (e) => {
    if(dropList.current.contains(e.target)) return false;
    setShow(false);
  };

  const handleChange = (key, value) => {
    setShow(false);
    callback({key, value});
  };

  return <div styleName="gxt-droplist-box">
    {
      label && <label styleName="gxt-label" htmlFor={name}>
        <span styleName={`required ${required ? 'active' : ''}`}>*</span>
        {label}
      </label>
    }
    <div styleName="gxt-droplist" ref={dropList}>
      <div styleName={`current-box ${errorFlag ? 'error' : ''}`} onClick={() => setShow(!showList)}>
        <div style={{width}} styleName={`current-box-input ${showList? 'active' : ''}`}>
          {inputText}
        </div>
        <input hidden readOnly ref={formRef} type="text" value={inputValue} name={name} id={name}/>
        <span styleName={`icon-arrows ${showList ? 'active' : ''}`}>
          <Icon type="arrow_down"></Icon>
        </span>
      </div>
      <div styleName={`list ${showList? 'active' : ''}`}>
        <ul>
          {
            list.map((item, index) => <li styleName={item.value == inputValue ? 'active' : ''} key={index} onClick={() => handleChange(name, item.value)}>{item.name}</li>)
          }
        </ul>
      </div>
    </div>
  </div> 
}