import axios from 'axios';

// const qs = require('qs');

export default {
  // 添加-收入账单
  addIncome(param) {
    let res = axios.post('/finance-management/addIncome', param);
    return res;
  },
  // 获取-收入账单
  getIncome(param) {
    let res = axios.post('/finance-management/getIncome', param);
    return res;
  },
  getBh() {
    let res = axios.post('/finance-management/getBh');
    return res;
  }
};
