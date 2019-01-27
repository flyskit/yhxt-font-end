import axios from 'axios';

export default {
  /** 获取编号 */
  getBh() {
    return axios.post('/finance-management/getBh');
  },
  addData(param) {
    console.log(param);
    return axios.post('/khxd/jgm/addData', param);
  }
};
