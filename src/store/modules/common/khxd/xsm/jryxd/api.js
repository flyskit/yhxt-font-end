import axios from 'axios';

export default {
  /** 获取今日记录 */
  getDataByToDay() {
    return axios.post('/khxd/xsm/getDataByToDay');
  },
  /** 根据编号获取详细信息 */
  getDataByBh(param) {
    return axios.post('/khxd/xsm/getDataByBh/' + param);
  },
  /** 修改记录 */
  updateData(param) {
    return axios.post('/khxd/xsm/updateData', param);
  }
};
