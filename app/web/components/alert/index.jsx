import React from "react";
import Cookie from 'js-cookie';
import ReactDOM from "react-dom";
import "./index.scss";
let defaultArg = {
  cancelBtn: false,
  confirmBtn: false,
  closeIcon: false,
  cancelCallback: null,
  confirmCallback: null,
  msg: "",
  title: "",
  time: 3000,
};
const render = (props, type) => {
  props.msg = props.msg || Cookie.get("toastMsg");
  if (!props.msg) {
    return;
  }
  Cookie.set("toastMsg", "");
  ReactDOM.render(
    <AletDom props={props} type={type} />,
    document.querySelector("#model")
  );
};
function AletDom(propsArg) {
  const props = propsArg.props;
  const type = propsArg.type;
  if (!props.cancelBtn && !props.confirmBtn && !props.closeIcon) {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(document.querySelector("#model"));
    }, props.time);
  }
  return (
    <div styleName="alert">
      <div styleName={`alert-body ${type}`}>{props.msg}</div>
    </div>
  );
}
const succ = (arg) => {
  let props = Object.assign({}, defaultArg, arg);
  render(props, "succ");
};
const error = (arg) => {
  let props = Object.assign({}, defaultArg, arg);
  render(props, "error");
};
const info = (arg) => {
  let props = Object.assign({}, defaultArg, arg);
  render(props, "info");
};
const warn = (arg) => {
  let props = Object.assign({}, defaultArg, arg);
  render(props, "warning");
};

const Alert = {
  succ,
  warn,
  error,
  info,
};

export default Alert;
