import axios from 'axios';

export default {
  /** 获取今日记录 */
  getDataByToDay() {
    return axios.post('/khxd/thjm/getDataByToDay');
  },
  /** 根据编号获取详细信息 */
  getDataByBh(param) {
    return axios.post('/khxd/thjm/getDataByBh/' + param);
  },
  /** 修改平开门记录 */
  updateDataSwing(param) {
    return axios.post('/khxd/thjm/updateDataSwing', param);
  },
  /** 修改吊趟门记录 */
  updateDataHanging(param) {
    return axios.post('/khxd/thjm/updateDataHanging', param);
  }
};
