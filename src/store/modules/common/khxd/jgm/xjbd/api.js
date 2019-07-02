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
  addData(param) {
    return axios.post('/khxd/jgm/addData', param);
  },
  /** --------------------------拉手管理--------------------------- */
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
  /** --------------------------拉手管理--------------------------- */
  /** 根据客户姓名模糊查询记录 */
  findDataByName(param) {
    return axios.post('/khxd/jgm/findDataByName/' + param);
  }
};
