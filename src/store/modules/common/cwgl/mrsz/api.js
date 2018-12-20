import axios from 'axios';

// const qs = require('qs');

export default {
  addIncome(params) {
    console.log({params});
    return axios.post('/finance-management/addIncome', params);
  }
};
