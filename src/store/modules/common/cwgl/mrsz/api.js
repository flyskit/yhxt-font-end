import axios from 'axios';

// const qs = require('qs');

export default {
  // 添加-收入账单
  addIncome(param) {
    let res = axios.post('/finance-management/addIncome', param);
    return res;
  },
  // 获取-编号
  getBh() {
    let res = axios.post('/finance-management/getBh');
    return res;
  },
  // 获取-根据条件查询记录
  getDataByCond(param) {
    let res = axios.post('/finance-management/getDataByCond', param);
    return res;
  }
};
