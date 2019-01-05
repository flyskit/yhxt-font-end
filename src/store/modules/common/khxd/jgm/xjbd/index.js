
import api from './api';

import { KHXD_JGM_COLUMNS } from './module';

// actions
export const GET_DATA = 'GET_DATA';

// mutations
export const SET_DATA = 'SET_DATA';

// getters
export const GETTER_NORMAL_DATA = 'GETTER_NORMAL_DATA';
export const GETTER_TABLE_COLUMNS = 'GETTER_TABLE_COLUMNS';
export const GETTER_TOTAL_PAGE = 'GETTER_TOTAL_PAGE';
export const GETTER_TOTAL_ELEMENT = 'GETTER_TOTAL_ELEMENT';

export default {
  state: {
    data: '',
    totalPage: 0,
    totalElement: 0
  },
  getters: {
    GETTER_NORMAL_DATA: (state) => state.data,
    GETTER_TABLE_COLUMNS: (state) => KHXD_JGM_COLUMNS,
    GETTER_TOTAL_PAGE: (state) => state.totalPage,
    GETTER_TOTAL_ELEMENT: (state) => state.totalElement
  },
  mutations: {
    [SET_DATA](state, res) {
      state.data = res.content;
      state.totalPage = res.totalPages;
      state.totalElement = res.totalElements;
    }
  },
  actions: {
    // 查询
    async [GET_DATA]({ commit }) {
      let res = await api.getBh();
      res.data.status === 200 ? commit(SET_DATA, res.data.map.data) : alert(res.data.info);
    }
  }
};
