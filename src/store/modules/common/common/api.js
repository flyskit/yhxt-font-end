import axios from 'axios';

export default {
  /** --------------------------订单管理--------------------------- */
  /** 获取编号 */
  getOrderNumber() {
    console.log('获取编号');
    // return axios.post('/ddcl/getOrderNumber');
  },
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
  },
  /** --------------------------拉手管理--------------------------- */
  /** 获取拉手列表 */
  getHandle(param) {
    return axios.post('/sjgl/getHandleByType/' + param);
  },
  /** 添加拉手 */
  addHandle(param) {
    return axios.post('/sjgl/addHandle', param);
  },
  /** 修改拉手信息 */
  updateHandle(param) {
    return axios.post('/sjgl/updateHandle', param);
  },
  /** 删除拉手 */
  delHandle(param) {
    return axios.post('/sjgl/delHandle/' + param);
  },
  /** --------------------------板材报价管理--------------------------- */
  /** 获取板材信息 */
  getBoardPriceDetailByGoodsType(param) {
    return axios.post('/sjgl/getBoardPriceDetailByGoodsType/' + param);
  },
  /** 添加板材 */
  addBoard(param) {
    return axios.post('/sjgl/addBoardPriceDetail', param);
  },
  /** 修改板材信息 */
  updateBoard(param) {
    return axios.post('/sjgl/updateBoardPriceDetail', param);
  },
  /** 删除板材 */
  delBoard(param) {
    return axios.post('/sjgl/delBoardPriceDetail/' + param);
  },
  /** --------------------------客户管理--------------------------- */
  /** 根据客户姓名模糊查询客户信息 */
  getCustomerByName(param) {
    console.log('根据客户姓名查找信息，参数：');
    console.log(param);
    // return axios.post('/sjgl/getCustomerByName/' + param);
  }
};
