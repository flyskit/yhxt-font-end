import axios from 'axios';

export default {
  /** --------------------------订单管理--------------------------- */
  /** 删除订单 */
  delOrder(param) {
    return axios.post('/ddcl/delData', param);
  },
  /** 修改订单状态 */
  updateStatus(param) {
    return axios.post('/ddcl/orderUpdateStatus', param);
  },
  /** --------------------------配件管理--------------------------- */
  /** 查询配件列表 */
  getAccessory(param) {
    return axios.post('/ddcl/getAccessory/' + param);
  },
  /** 查询配件列表 */
  getAccessoryByName(param) {
    return axios.post('/sjgl/getAccessoryByName/' + param);
  },
  /** 添加配件 */
  addAccessory(param) {
    return axios.post('/ddcl/addAccessory', param);
  },
  /** 删除配件 */
  delAccessory(param) {
    return axios.post('/ddcl/delAccessory/' + param);
  }
};
