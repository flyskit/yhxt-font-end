import axios from 'axios';

export default {
  /** --------------------------创建订单--------------------------- */
  /** 添加订单 */
  addData(param) {
    return axios.post('/khxd/ykl/addData', param);
  },
  /** --------------------------返工订单--------------------------- */
  /** 模糊查询记录 */
  condData(param) {
    return axios.post('/khxd/ykl/condData', param);
  }
};
