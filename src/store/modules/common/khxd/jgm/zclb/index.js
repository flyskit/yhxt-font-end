
import api from './api';

// actions
export const GET_DATA = 'GET_DATA';
export const SUBMIT_ORDER_DATA = 'SUBMIT_ORDER_DATA';

// mutations
export const SET_DATA = 'SET_DATA';

// getters
export const GETTER_DATA = 'GETTER_DATA';

export default {
  state: {
    data: []
  },
  getters: {
    GETTER_DATA: (state) => state.data
  },
  mutations: {
    [SET_DATA](state, res) {
      state.data = res;
    }
  },
  actions: {
    /** 查询数据 */
    async [GET_DATA]({ commit }) {
      let res = await api.getDataByTemporary();
      res && commit(SET_DATA, res);
    },
    /** 提交数据 */
    async [SUBMIT_ORDER_DATA]({ commit }, param) {
      let res = await api.submitOrder(param);
      return res;
    }
  }
};
