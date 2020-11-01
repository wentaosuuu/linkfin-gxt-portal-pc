import React, { useState, useEffect, useRef } from 'react';
import queryString from 'query-string';
import './index.scss';

export default props => {
  const listDom = useRef(null);
  const listBoxDom = useRef(null);
  const animateObj = useRef();
  const originWidth = useRef();

  const { 
    direction,
    speed = 0.4,
    listHeight,
    listWidth,
    children
  } = props;

  const [originList, setListArray] = useState(children);
  const originHeight = useRef();
  // const [originWidth, saveOriginWidth] = useState(null);
  
  useEffect(() => {
    init();
  }, [originList]);

  const init = () => {
    if(direction == 'horizontal') {
      const newList = React.cloneElement(children).props.children;
      if(!originWidth.current) {
        originWidth.current = listDom.current.offsetWidth;
      }
      if(listDom.current.offsetWidth < (listBoxDom.current.offsetWidth + originWidth.current)) {
        // cloneHandle(newList);
      } else {
        // eventListenrInit();
      }
    } else {
      // console.log(children);
      const newList = React.cloneElement(children).props.children;
      
      if(!originHeight.current){
        originHeight.current = listDom.current.offsetHeight * 2;
      }
      if(listDom.current.offsetHeight < (listHeight + originHeight.current)){
        cloneHandle(newList);
      } else {
        eventListenrInit();
      }
    }
  };

  const cloneHandle = (list) => {
    const newArray = originList.props.children.concat(list);
    let ary = [];
    newArray.forEach((item, index) => {
      ary.push(React.cloneElement(item,{key: index}));
    });
    setListArray({
      ...originList,
      props: {
        children: ary
      }
    });
  };

  const move = () => {
    if(direction == 'horizontal') {
      let styleLeft = listDom.current.style.left || '0px';
      let leftWidth = parseFloat(styleLeft.replace('px', ''));
      if(Math.abs(leftWidth) < originWidth.current) {
        leftWidth = leftWidth - speed;
        listDom.current.style.left = `${leftWidth}px`;
        animateObj.current = window.requestAnimationFrame(move);
      } else {
        listDom.current.style.left = '0px';
        animateObj.current = window.requestAnimationFrame(move);
      }
    } else {
      let styleTop = listDom.current.style.top || '0px';
      let topHeight = parseFloat(styleTop.replace('px', ''));
      if(Math.abs(topHeight) < originHeight.current) {
        topHeight = topHeight - speed;
        listDom.current.style.top = `${topHeight}px`;
        animateObj.current = window.requestAnimationFrame(move);
      } else {
        listDom.current.style.top = '0px';
        animateObj.current = window.requestAnimationFrame(move);
      }
    }
  };

  const eventListenrInit = () => {
    animateObj.current = window.requestAnimationFrame(move);
    listDom.current.addEventListener('mouseenter', function(){
      window.cancelAnimationFrame(animateObj.current);
    });
    listDom.current.addEventListener('mouseleave', function(){
      animateObj.current = window.requestAnimationFrame(move);
    });
  };

  return <div
            styleName='list-box'
            ref={listBoxDom}
            style={{
              height: listHeight || '100%',
              width: listWidth || '100%'
            }}
          >
          <div styleName={direction == 'horizontal' ? 'list-box-wrap horizontal' : 'list-box-wrap'} ref={listDom}>
            {originList}
          </div>
        </div>
} 