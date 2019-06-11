
import api from './api';

// actions
export const GET_DATA = 'GET_DATA';

// mutations
export const SET_DATA = 'SET_DATA';

// getters
export const GETTER_TOTAL_PAGE = 'GETTER_TOTAL_PAGE';
export const GETTER_TOTAL_ELEMENT = 'GETTER_TOTAL_ELEMENT';
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
      state.data = res.data.map.data.content;
      state.totalPage = res.data.map.data.totalPages;
      state.totalElement = res.data.map.data.totalElements;
    }
  },
  actions: {
    /** 查询今日全部记录 */
    async [GET_DATA]({ commit }, param) {
      let res = await api.pageDataByCond(param);
      res && commit(SET_DATA, res);
    }
  }
};
