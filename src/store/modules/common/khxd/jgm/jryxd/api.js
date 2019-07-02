import axios from 'axios';

export default {
  /** 获取今日记录 */
  getDataByToDay() {
    return axios.post('/khxd/jgm/getDataByToDay');
  },
  /** 根据编号获取详细信息 */
  getDataByBh(param) {
    return axios.post('/khxd/jgm/getDataByBh/' + param);
  },
  /** 修改记录 */
  updateData(param) {
    return axios.post('/khxd/jgm/updateData', param);
  },
  /** 删除订单 */
  delData(param) {
    return axios.post('/ddcl/delData', param);
  },
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
