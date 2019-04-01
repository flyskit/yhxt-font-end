import axios from 'axios';

export default {
  /** 获取今日记录 */
  getDataByToDay() {
    return axios.post('/khxd/jgm/getDataByToDay');
  },
  /** 根据编号获取详细信息 */
  getDataByBh(param) {
    return axios.post('/khxd/jgm/getDataByBh/' + param);
  }
};
