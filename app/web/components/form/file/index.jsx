import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import './index.scss';
const pdfIcon = require('../../../assets/img/pdf_icon.png');

export default props => {

  const {
    csrf,
    url,
    name,
    label,
    required,
    callback,
    fileTypes,
    multiple,
    maxLength,
    ...other
  } = props;

  const fileEl = useRef(null);
  const [files, setPreviewFiles] = useState([]);
  const handleChange = () => {
    if(maxLength && (files.length + fileEl.current.files.length) > maxLength) return alert('超出规定文件数量');
    const windowURL = window.URL || window.webkitURL;
    let appendArray = [];
    for(let file of fileEl.current.files) {
      let fileType = file.type.split('/')[1] || file.type.split('/')[0];
      let imgSrc = '';
      if(fileTypes && fileTypes.indexOf(fileType) > -1) {
        if(fileType == 'pdf') {
          imgSrc = pdfIcon;
        } else {
          imgSrc = windowURL.createObjectURL(file);
        }
        appendArray.push(imgSrc);
        let formData = new FormData();
        formData.append('file', file);
        Axios
          .post(url, formData, {
            headers: {
              'fileUpload': 'true',
              'x-csrf-token': csrf,
              'Content-Type': `multipart/form-data;boundary=${new Date().getTime()}`,
            }
          })
          .then(d => {
            callback(d);
          })
      };
    };
    setPreviewFiles([...files, ...appendArray]);
    fileEl.current.value = '';
  };
  const handleDelete = (index) => {
    callback({type: 'delete', index});
    files.splice(index, 1);
    setPreviewFiles([...files]);
  };

  return <div styleName="gxt-file-box">
    {
      label && <label styleName="gxt-label">
        <span styleName={`required ${required ? 'active' : ''}`}>*</span>
        {label}
      </label>
    }
    <div styleName="gxt-file-wrap">
      <div styleName="file-list">
        {
          files.map((item, index) => <div styleName="preview-item" key={index}>
            <div styleName="preview-box">
              <span styleName="gou-icon">
                <i></i>
              </span>
              <img styleName="preview-file" src={item}/>
            </div>
            <div styleName="mask">
              <span styleName="delete-icon" onClick={() => handleDelete(index)}></span>
            </div>
          </div>
          )
        }
        <label htmlFor={name} styleName="file-input">
          <input
            ref={fileEl}
            type="file"
            name={name}
            id={name}
            onChange={() => handleChange()}
            multiple={multiple}
            hidden
            {...other}
          />
        </label>
      </div>
    </div>
  </div>
}