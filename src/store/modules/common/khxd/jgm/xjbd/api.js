import axios from 'axios';

export default {
  // 获取-编号
  getBh() {
    let res = axios.post('/finance-management/getBh');
    return res;
  }
};
