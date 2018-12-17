import axios from 'axios';

const qs = require('qs');

export default {
  addIncome(params) {
    console.log(qs.stringify({ params }));
    return axios.post('/finance-management/addIncome', params);
  }
};
