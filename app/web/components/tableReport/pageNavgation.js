import React, { useState, useEffect, useRef } from 'react';
import DropList from '@src/components/dropList';
import queryString from 'query-string';
import './pageNavgation.scss';

export default props => {
  const {
    pageSize,
    totalRecord,
    pageNo,
    setPageNo
  } = props;

  const [pageArray, setPageArray] = useState([]);

  const totalPages = () => {
    return parseInt((totalRecord + pageSize - 1) / pageSize);
  }

  /**
   * 生成页面数组
   * @param {Number} total 总页数
   * @param {Number} cur 当前页码
   * @param {Numbre} around 当前页旁边显示的页面数量
   */
  const makePage = (total = 0, cur = 1, around = 2) => {
    let result = [];
    let baseCount = around * 2 + 1 + 2 + 2 + 2; //总共元素个数
    let surplus = baseCount - 4; //只出现一个省略号 剩余元素个数
    let startPosition = 1 + 2 + around + 1;//前面出现省略号的临界点
    let endPosition = total - 2 - around - 1;//后面出现省略号的临界点

    if (total <= baseCount - 2) { // 全部显示 不出现省略号
      result = Array.from({ length: total }, (v, i) => i + 1);
    } else { // 需要出现省略号
      if (cur < startPosition) { // 1.只有后面出现省略号
        result = [...Array.from({ length: surplus }, (v, i) => i + 1), "...", total]
      } else if (cur > endPosition) { // 2.只有前边出现省略号
        result = [1, '...', ...Array.from({ length: surplus }, (v, i) => total - surplus + i + 1)]
      } else { // 3.两边都有省略号
        result = [1, '...', ...Array.from({ length: around * 2 + 1 }, (v, i) => cur - around + i), '...', total]
      }
    }
    return result;
  }

  const changePage = (item) => {
    if (item == '...') return false;
    if (item < 1) item = 1;
    if (item > totalPages()) item = totalPages();
    setPageNo && setPageNo(item);
  };

  useEffect(() => {
    setPageArray(makePage(totalPages(), pageNo, 2));
  }, [pageNo, totalRecord, pageSize]);

  return <div styleName="pageNavgation-wrap">
    <ul>
      <li styleName={`page btn-prev ${pageNo > 1 ? 'clickable' : ''}`} onClick={() => changePage(pageNo - 1)}>上一页</li>
      {
        pageArray.map((item, index) =>
          <li
            styleName={`page ${pageNo == item ? 'active' : ''}`}
            key={index}
            onClick={() => changePage(item)}
          >{item}
          </li>)
      }
      <li styleName={`page btn-next ${pageNo < totalPages() ? 'clickable' : ''}`} onClick={() => changePage(pageNo + 1)}>下一页</li>
    </ul>
  </div>
}