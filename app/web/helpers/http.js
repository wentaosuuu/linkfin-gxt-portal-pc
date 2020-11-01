/* eslint no-console: "off" */
import axios from 'axios';
import Cookie from 'js-cookie';
axios.defaults.headers.post['x-csrf-token'] = Cookie.get('csrfToken');
if (!EASY_ENV_IS_NODE && localStorage) {
  if (localStorage.getItem('userInfo')) {
    axios.defaults.headers.common['loginUserId'] = JSON.parse(localStorage.getItem('userInfo')).id;
    Cookie.set('loginUserId', JSON.parse(localStorage.getItem('userInfo')).id);
  }
  //  = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).id;
}

// 请求拦截器
axios.interceptors.request.use(config => {
  config.headers.loginUserId = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).id || null;
  return config;
}, error => {
  // console.log(`axios request error:`, error);
});

// 响应拦截器
axios.interceptors.response.use(response => {
  const res = response.data;
  // console.log('res: ', res);
  // if (res.code == '0003') {
  // console.log(`接口返回未登录`);
  //   clearLoginInfo();
  //   location.reload();
  // }
  return res;
}, error => {
  console.log('error: ', error);
  // console.log(`axios response error:`, error);
  return {};
});

export default axios;
