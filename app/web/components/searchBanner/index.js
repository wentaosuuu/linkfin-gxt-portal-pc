import React from 'react';
import './index.scss';
import Icon from '../icon';

export default props => {
  const { onSubmit, nosearch, ...rest } = props;
  let el;
  return (<div styleName="wrap">
    {nosearch ?
      null :
      <form styleName="search" onSubmit={(e = event) => {
        e.preventDefault();
        onSubmit && onSubmit(el.value);
      }}>
        <i styleName="icon"></i>
        <input type="text" ref={input => el = input} {...rest} />
      </form>}
  </div>);
};
