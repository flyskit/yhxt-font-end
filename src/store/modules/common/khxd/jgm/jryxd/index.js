
import api from './api';

// actions
export const GET_DATA = 'GET_DATA';
export const ADD_DATA = 'ADD_DATA';
export const GET_BH = 'GET_BH';
export const GET_JRYXD_DATA = 'GET_JRYXD_DATA';
export const GET_DATA_BY_BH = 'GET_DATA_BY_BH';

// mutations
export const SET_DATA = 'SET_DATA';
export const SET_BH = 'SET_BH';

// getters
export const GETTER_TOTAL_PAGE = 'GETTER_TOTAL_PAGE';
export const GETTER_TOTAL_ELEMENT = 'GETTER_TOTAL_ELEMENT';
export const GETTER_JRYXD_DATA = 'GETTER_JRYXD_DATA';
export const GETTER_DATA = 'GETTER_DATA';

export default {
  state: {
    data: [],
    totalPage: 0,
    totalElement: 0
  },
  getters: {
    GETTER_DATA: (state) => state.data,
    GETTER_TOTAL_PAGE: (state) => state.totalPage,
    GETTER_TOTAL_ELEMENT: (state) => state.totalElement
  },
  mutations: {
    [SET_DATA](state, res) {
      state.data = res;
    }
  },
  actions: {
    /** 查询今日全部数据 */
    async [GET_DATA]({ commit }) {
      let res = await api.getDataByToDay();
      res && commit(SET_DATA, res.data.map.data);
    },
    /** 查询数据 */
    async [GET_DATA_BY_BH]({ commit }, param) {
      let res = await api.getDataByBh(param);
      return res;
    }
  }
};
