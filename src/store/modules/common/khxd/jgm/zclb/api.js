import axios from 'axios';

export default {
  /** 查询-暂存列表 */
  getDataByTemporary() {
    return axios.post('/khxd/jgm/getDataByTemporary');
  },
  /** 提交订单 */
  submitOrder(param) {
    return axios.post('/khxd/jgm/subDataByTemporary/' + param);
  }
};
