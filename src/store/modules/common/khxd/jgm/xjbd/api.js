import axios from 'axios';

export default {
  /** 获取编号 */
  getBh() {
    return axios.post('/finance-management/getBh');
  },
  addData(params) {
    console.log(params);
    return axios.post('/finance-management/addData', params);
  }
};
