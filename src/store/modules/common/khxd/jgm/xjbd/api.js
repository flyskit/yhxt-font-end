import axios from 'axios';

export default {
  /** 获取编号 */
  getBh() {
    return axios.post('/khxd/jgm/getBh');
  },
  addData(param) {
    return axios.post('/khxd/jgm/addData', param);
  }
};
