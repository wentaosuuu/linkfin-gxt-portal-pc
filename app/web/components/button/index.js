import React from 'react';
import './index.scss';

export default props => {
  const { href, children, gradient, shadow, radius, hollow, ...other } = props;
  return href ? (
    <a styleName={`btn ${gradient ? 'btn-gradient' : ''} ${shadow ? 'btn-shadow' : ''} ${radius ? 'btn-radius' : ''} ${hollow ? 'btn-hollow' : ''}`} href={href} {...other}>{children}</a>
  ) : (
    <button styleName={`btn ${gradient ? 'btn-gradient' : ''} ${shadow ? 'btn-shadow' : ''} ${radius ? 'btn-radius' : ''} ${hollow ? 'btn-hollow' : ''}`} {...other}>{children}</button>
    );
};
