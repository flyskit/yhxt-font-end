import axios from 'axios';

export default {
  /** --------------------------创建订单--------------------------- */
  /** 获取编号 */
  getOrderNumber() {
    return axios.post('/ddcl/getOrderNumber');
  },
  /** 获取拉手列表 */
  getHandle(param) {
    return axios.post('/sjgl/getHandleByType/' + param);
  },
  /** 获取客户信息 */
  getCustomerByName(param) {
    return axios.post('/sjgl/getCustomerByName/' + param);
  },
  /** 获取板材信息 */
  getBoardPriceDetailByGoodsType(param) {
    return axios.post('/sjgl/getBoardPriceDetailByGoodsType/' + param);
  },
  /** 添加订单 */
  addData(param) {
    return axios.post('/khxd/ykl/addData', param);
  },
  /** --------------------------返工订单--------------------------- */
  /** 根据客户姓名模糊查询记录 */
  getDataByCond(param) {
    return axios.post('/khxd/ykl/condData', param);
  }
};
