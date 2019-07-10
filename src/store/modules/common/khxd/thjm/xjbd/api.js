import axios from 'axios';

export default {
  /** --------------------------创建订单--------------------------- */
  /** 平开门-添加订单 */
  addDataSwing(param) {
    return axios.post('/khxd/thjm/addDataSwing', param);
  },
  /** 吊趟门-添加订单 */
  addDataHanging(param) {
    return axios.post('/khxd/thjm/addDataHanging', param);
  },
  /** --------------------------返工订单--------------------------- */
  /** 条件查询记录 */
  condData(param) {
    return axios.post('/khxd/thjm/condData', param);
  }
};
