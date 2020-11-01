import React, { Component } from "react";
import "./index.scss";
const down = require("@src/assets/img/banner/down.png");
const up = require("@src/assets/img/banner/up.png");
// const down = require('"@src/assets/img/banner/down.png');

class Shibor extends Component {
  state = {};
  render() {
    const { shiborRecords, dataDate } = this.props.data;
    return (
      <div styleName="shibor">
        <ul>
          <li styleName="title">
            <span>期限</span>
            <span>Shibor(%)</span>
            <span>涨跌(BP)</span>
          </li>
          {shiborRecords && shiborRecords.map((data, i) => {
            return (
              <li
                key={i}
                styleName="data-list"
                style={{ background: i % 2 !== 0 ? "#F7F9FA" : "" }}
              >
                <span styleName="name">{data.term}</span>
                <span styleName="d-shibor">{data.shibor}</span>
                <span styleName="bp">
                  {data.bp}
                  <img src={data.status === "up" ? up : down} />
                </span>
              </li>
            );
          })}
        </ul>
        <p styleName="date">{dataDate}</p>
      </div>
    );
  }
}

export default Shibor;
