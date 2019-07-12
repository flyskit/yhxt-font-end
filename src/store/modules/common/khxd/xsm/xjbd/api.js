import axios from 'axios';

export default {
  /** --------------------------创建订单--------------------------- */
  /** 添加订单 */
  addData(param) {
    return axios.post('/khxd/xsm/addData', param);
  },
  /** --------------------------返工订单--------------------------- */
  /** 条件查询记录 */
  condData(param) {
    return axios.post('/khxd/xsm/condData', param);
  }
};
