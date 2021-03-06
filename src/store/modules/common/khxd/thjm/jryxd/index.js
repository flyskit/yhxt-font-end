
import api from './api';

// actions
export const GET_DATA = 'GET_DATA';
export const UPDATE_DATA_SWING = 'UPDATE_DATA_SWING';
export const UPDATE_DATA_HANGING = 'UPDATE_DATA_HANGING';
export const GET_DATA_BY_BH = 'GET_DATA_BY_BH';
// mutations
export const SET_DATA = 'SET_DATA';
// getters
export const GETTER_DATA = 'GETTER_DATA';

export default {
  state: {
    data: {},
    accessoryTable: [],
    accessoryList: []
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
    /** --------------------------记录管理--------------------------- */
    /** 查询今日全部记录 */
    async [GET_DATA]({ commit }) {
      let res = await api.getDataByToDay();
      res && commit(SET_DATA, res.data);
    },
    /** 根据编号查询订单记录 */
    async [GET_DATA_BY_BH]({ commit }, param) {
      let res = await api.getDataByBh(param);
      return res;
    },
    /** 更新记录 */
    async [UPDATE_DATA_SWING]({ commit }, param) {
      let res = await api.updateDataSwing(param);
      return res;
    },
    /** 更新记录 */
    async [UPDATE_DATA_HANGING]({ commit }, param) {
      let res = await api.updateDataHanging(param);
      return res;
    }
  }
};
