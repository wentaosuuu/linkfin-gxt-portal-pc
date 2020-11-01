const Service = require('egg').Service;
class Product extends Service {
  async getQueries(type) {
    let data = {};
    if(type == 'financialInstitutionsType' || type == 'guarantyStyle') {
      data = {
        type,
        mark: 1
      }
    } else {
      data = {type}
    };
    const res = await this.ctx.curl(`${this.config.proxyHost}/financial/sysDynamic/queryAll`, {
      method: 'POST',
      dataType: 'json',
      contentType: 'json',
      data,
    });
    let remark = res.data.data[0].remark || '';
    // res.data.remark = res.data.data[0].remark || '';
    if(res.data.data && res.data.data[0] && res.data.data[0].value !== '全部') {
      res.data.data.unshift({id: '', remark, code: type, value: '全部'});
    } else {
      res.data.data[0].id = '';
      res.data.data[0].code = type;
      res.data.data[0].remark = remark;
    }
    return this.ctx.helper.serviceFormat(res, type);
  };

  async getDetails(id) {
    const res = await this.ctx.curl(`${this.config.proxyHost}/financial/product/selectByIdDetail`, {
      method: 'POST',
      dataType: 'json',
      contentType: 'json',
      data: {
        id
      },
    });
    if(res.data.data) {
      res.data.data.logoFilePath = `${res.data.data && res.data.data.logoFilePath}`;
    }
    return this.ctx.helper.serviceFormat(res, 'details');
  };
  
  async company(phone) {
    const res = await this.ctx.curl(`${this.config.proxyHost}/financial/contact/company`, {
      method: 'POST',
      dataType: 'json',
      contentType: 'json',
      data: {
        phone
      },
    });
    return this.ctx.helper.serviceFormat(res, 'companyInfo');
  };

  async queryAll(type) {
    const res = await this.ctx.curl(`${this.config.proxyHost}/financial/sysDynamic/queryAll`, {
      method: 'POST',
      dataType: 'json',
      contentType: 'json',
      data: {
        type
      },
    });
    res.data.data.map(item => {
      item.name = item.value;
      item.value = item.id;
      return item;
    });
    return this.ctx.helper.serviceFormat(res, 'guarantyStyle');
  };

  async accountBasicInfo(key) {
    const res = await this.ctx.curl(`${this.config.proxyHost}/financial/enterprise/account/basic/info`, {
      method: 'POST',
      dataType: 'json',
      contentType: 'json',
      data: {
        key
      },
    });
    return this.ctx.helper.serviceFormat(res, 'accountBasicInfo');
  };


}

module.exports = Product;