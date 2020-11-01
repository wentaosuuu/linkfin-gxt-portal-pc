export const isMoneyNumber = (number) => {
  // 6位整数以及2位小数
  return  /(^[0-9]{1,6}$)|(^[0-9]{1,6}[\.]{1}[0-9]{1,2}$)/.test(number);
}

export const maxLength3Number = (number) => {
  // 3位整数
  return /^[0-9]{1,3}$/.test(number);
}

export const isPhone = (value) => {
  // 中国手机号(宽松), 只要是13,14,15,16,17,18,19开头即可
  return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value) || /\d{3}-\d{8}|\d{4}-\d{7}/.test(value);
} 