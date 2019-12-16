import axios from 'axios';

export default {
  /** 历史记录-条件查询 */
  pageDataByCond(param) {
    return axios.post('/khxd/jgm/pageDataByCond', param);
  },
  delData(param) {
    return axios.post('/khxd/jgm/delData/' + param);
  }
};
