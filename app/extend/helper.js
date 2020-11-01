// this.ctx => context 对象
// this.app => application 对象

module.exports = {
  async promiseAll(param = []) {
    const res = await Promise.all(param);
    let out = {};
    res.map(item => {
      out = { ...out, ...item };
    });
    return out;
  },

  serviceFormat(res, name) {
    let data = {};
    const out = {};
    if (res.status == 200 && res.data && res.data.data) {
      data = res.data.data;
    }
    out[name] = data;
    return out;
  },
};
