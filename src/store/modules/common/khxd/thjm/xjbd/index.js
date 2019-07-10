
import api from './api';

// actions
export const ADD_DATA_SWING = 'ADD_DATA_SWING';
export const ADD_DATA_HANGING = 'ADD_DATA_HANGING';
export const GET_REWORK_DATA = 'GET_REWORK_DATA';

// mutations
export const SET_REWORK_DATA = 'SET_REWORK_DATA';
// getters
export const GETTER_REWORK_DATA = 'GETTER_REWORK_DATA';
export const GETTER_TOTAL_PAGE = 'GETTER_TOTAL_PAGE';
export const GETTER_TOTAL_ELEMENT = 'GETTER_TOTAL_ELEMENT';

export default {
  state: {
    recordData: [],
    totalPages: 0,
    totalElements: 0
  },
  getters: {
    GETTER_REWORK_DATA: (state) => state.recordData,
    GETTER_TOTAL_PAGE: (state) => state.totalPages,
    GETTER_TOTAL_ELEMENT: (state) => state.totalElements
  },
  mutations: {
    [SET_REWORK_DATA](state, res) {
      state.recordData = res.content;
      state.totalPages = res.totalPages;
      state.totalElements = res.totalElements;
    }
  },
  actions: {
    /** --------------------------创建订单--------------------------- */
    /** 平开门-提交数据 */
    async [ADD_DATA_SWING]({ commit }, param) {
      let res = await api.addDataSwing(param);
      return res;
    },
    /** 吊趟门-提交数据 */
    async [ADD_DATA_HANGING]({ commit }, param) {
      let res = await api.addDataHanging(param);
      return res;
    },
    /** --------------------------返工订单--------------------------- */
    /** 条件查询记录 */
    async [GET_REWORK_DATA]({ commit }, param) {
      let res = await api.condData(param);
      res.data.status === 200 ? commit(SET_REWORK_DATA, res.data.map.data) : alert(res.data.info);
    }
  }
};
