import axios from 'axios';

export default {
  /** 查询-暂存列表 */
  getDataByTemporary() {
    return axios.post('/khxd/xsm/getDataByTemporary');
  },
  /** 提交订单 */
  submitOrder(param) {
    return axios.post('/ddcl/orderUpdateStatus', param);
  }
};
