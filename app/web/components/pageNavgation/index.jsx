import React, { useState, useEffect, useRef } from "react";
import DropList from "@src/components/dropList";
import queryString from "query-string";
import "./index.scss";

export default (props) => {
  const {
    pageSize, //每页条数
    sizeList, //每页条数设置列表
    totalRecord, //数据总长度
    currentPage, //当前页
    flag, //不知到干啥用的-ccy
    callback,
    showTotal = true, // 是否显示总条数
    canJump = true, //是否可以直接跳转至某页
    canSetPageSize = true, //是否可以设置每页条数
  } = props;

  const [pageArray, setPageArray] = useState([]);
  const jumpInput = useRef(null);

  const totalPages = () => {
    let _maxTotal = totalRecord > 10000 ? 10000 : totalRecord;
    return parseInt(
      (Number(_maxTotal) + Number(pageSize) - 1) / Number(pageSize)
    );
  };

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
    let startPosition = 1 + 2 + around + 1; //前面出现省略号的临界点
    let endPosition = total - 2 - around - 1; //后面出现省略号的临界点

    if (total <= baseCount - 2) {
      //全部显示 不出现省略号
      result = Array.from({ length: total }, (v, i) => i + 1);
    } else {
      //需要出现省略号
      if (cur < startPosition) {
        //1.只有后面出现省略号
        result = [
          ...Array.from({ length: surplus }, (v, i) => i + 1),
          "...",
          total,
        ];
      } else if (cur > endPosition) {
        //2.只有前边出现省略号
        result = [
          1,
          "...",
          ...Array.from({ length: surplus }, (v, i) => total - surplus + i + 1),
        ];
      } else {
        //3.两边都有省略号
        result = [
          1,
          "...",
          ...Array.from({ length: around * 2 + 1 }, (v, i) => cur - around + i),
          "...",
          total,
        ];
      }
    }
    return result;
  };

  const scrollToTop = () => {
    // const y = document.documentElement.scrollTop || document.body.scrollTop;
    // if(y > 0) {
    //   window.requestAnimationFrame(scrollToTop);
    //   window.scrollTo(0, y - y / 3);
    // }
  };

  const changePage = (item) => {
    jumpInput.current && (jumpInput.current.value = "");
    if (item == "...") return false;
    if (item < 1) item = 1;
    if (item > totalPages()) item = totalPages();
    scrollToTop();
    callback({ key: flag, value: item });
  };

  const setJumpPage = () => {
    let currentValue = jumpInput.current.value;
    let reg = /^\+?[1-9][0-9]*$/;
    if (!reg.test(currentValue)) {
      jumpInput.current.value = "";
    } else {
      if (currentValue > totalPages()) {
        jumpInput.current.value = totalPages();
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && /^\+?[1-9][0-9]*$/.test(jumpInput.current.value)) {
      callback({ key: flag, value: jumpInput.current.value });
    }
  };

  const handleJump = () => {
    scrollToTop();
    callback({ key: flag, value: jumpInput.current.value });
  };

  const changeSize = (payload) => {
    jumpInput.current.value = "";
    scrollToTop();
    callback(payload);
  };

  useEffect(() => {
    setPageArray(makePage(totalPages(), currentPage, 2));
  }, [currentPage, totalRecord, pageSize]);

  return (
    <div styleName="gxt-pagination">
      {showTotal && (
        <div>
          <p styleName="page-info">
            共{totalRecord || 0}条记录，第{currentPage || 1}/{totalPages() || 1}
            页
          </p>
        </div>
      )}
      <div styleName="right">
        {canSetPageSize && (
          <div styleName="page-size">
            <DropList
              name="pageSize"
              width="88px"
              currentValue={pageSize}
              list={sizeList}
              callback={changeSize}
            />
          </div>
        )}
        <div styleName="pages">
          <ul>
            <li
              styleName={`page btn-prev ${currentPage > 1 ? "clickable" : ""}`}
              onClick={() => changePage(currentPage - 1)}
            >
              上一页
            </li>
            {pageArray.map((item, index) => (
              <li
                styleName={`page ${currentPage == item ? "active" : ""}`}
                key={index}
                onClick={() => changePage(item)}
              >
                {item}
              </li>
            ))}
            <li
              styleName={`page btn-next ${
                currentPage < totalPages() ? "clickable" : ""
              }`}
              onClick={() => changePage(currentPage + 1)}
            >
              下一页
            </li>
          </ul>
        </div>
        {canJump && (
          <div styleName="jump">
            <span>跳至</span>
            <input
              type="text"
              onChange={setJumpPage}
              ref={jumpInput}
              onKeyDown={handleKeyDown}
            />
            <span>页</span>
            <button styleName="btn" onClick={handleJump}>
              确定
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
