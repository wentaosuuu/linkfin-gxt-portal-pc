import React from 'react';
import './btn.scss';

export default props => {
  const { disabled, href, children, type, ...other } = props;
  return disabled ? 
  (<button disabled styleName={`btn ${type || ''} ${disabled ? 'disabled' : ''}`} {...other}>{children}</button>) : 
  href ? (
    <a styleName={`btn ${type || ''} ${disabled ? 'disabled' : ''}`} href={href} {...other}>{children}</a>
  ) : (
    <button disabled={disabled} styleName={`btn ${type || ''}`} {...other}>{children}</button>
    );
};
