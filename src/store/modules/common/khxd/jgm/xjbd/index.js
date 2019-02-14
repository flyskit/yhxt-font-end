
import api from './api';

import { KHXD_JGM_COLUMNS } from './module';

// actions
export const GET_DATA = 'GET_DATA';
export const ADD_DATA = 'ADD_DATA';
export const GET_BH_DATA = 'GET_BH_DATA';

// mutations
export const SET_DATA = 'SET_DATA';
export const SET_BH = 'SET_BH';

// getters
export const GETTER_NORMAL_DATA = 'GETTER_NORMAL_DATA';
export const GETTER_TABLE_COLUMNS = 'GETTER_TABLE_COLUMNS';
export const GETTER_TOTAL_PAGE = 'GETTER_TOTAL_PAGE';
export const GETTER_TOTAL_ELEMENT = 'GETTER_TOTAL_ELEMENT';
export const GET_KHXD_BH = 'GET_KHXD_BH';

export default {
  namespaced: true,
  state: {
    data: '',
    bh: '',
    totalPage: 0,
    totalElement: 0
  },
  getters: {
    GETTER_NORMAL_DATA: (state) => state.data,
    GETTER_TABLE_COLUMNS: (state) => KHXD_JGM_COLUMNS,
    GETTER_TOTAL_PAGE: (state) => state.totalPage,
    GETTER_TOTAL_ELEMENT: (state) => state.totalElement,
    GET_KHXD_BH: (state) => state.bh
  },
  mutations: {
    [SET_DATA](state, res) {
      state.data = res.content;
      state.totalPage = res.totalPages;
      state.totalElement = res.totalElements;
    },
    [SET_BH](state, res) {
      state.bh = res;
    }
  },
  actions: {
    /** 获取编号 */
    async [GET_BH_DATA]({ commit }) {
      let res = await api.getBh();
      res.data.status === 200 ? commit(SET_BH, res.data.map.data) : alert(res.data.info);
    },
    /** 查询数据 */
    async [GET_DATA]({ commit }) {
      let res = await api.getBh();
      res.data.status === 200 ? commit(SET_DATA, res.data.map.data) : alert(res.data.info);
    },
    /** 提交数据 */
    async [ADD_DATA]({ commit }, param) {
      let res = await api.addData(param);
      alert(res.data.info);
    }
  }
};
