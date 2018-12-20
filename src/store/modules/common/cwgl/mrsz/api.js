import axios from 'axios';

// const qs = require('qs');

export default {
  addIncome(params) {
    let res = axios.post('/finance-management/addIncome', params);
    return res;
  },
  getBh() {
    let res = axios.post('/finance-management/getBh');
    return res;
  }
};
