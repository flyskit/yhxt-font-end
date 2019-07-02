
import api from './api';

// actions
export const GET_DATA = 'GET_DATA';
export const DEL_DATA = 'DEL_DATA';
export const UPDATE_DATA = 'UPDATE_DATA';
export const GET_DATA_BY_BH = 'GET_DATA_BY_BH';
export const GET_PJ_TABLE = 'GET_PJ_TABLE';
export const GET_PJ_LIST = 'GET_PJ_LIST';
export const ADD_ACCESSORY = 'ADD_ACCESSORY';
export const DEL_ACCESSORY = 'DEL_ACCESSORY';

// mutations
export const SET_DATA = 'SET_DATA';
export const SET_PJ_TABLE = 'SET_PJ_TABLE';
export const SET_PJ_LIST = 'SET_PJ_LIST';

// getters
export const GETTER_DATA = 'GETTER_DATA';
export const GETTER_PJ_TABLE = 'GETTER_PJ_TABLE';
export const GETTER_PJ_LIST = 'GETTER_PJ_LIST';

export default {
  state: {
    data: {},
    accessoryTable: [],
    accessoryList: []
  },
  getters: {
    GETTER_DATA: (state) => state.data,
    GETTER_PJ_TABLE: (state) => state.accessoryTable,
    GETTER_PJ_LIST: (state) => state.accessoryList
  },
  mutations: {
    [SET_DATA](state, res) {
      state.data = res;
    },
    [SET_PJ_TABLE](state, res) {
      state.accessoryTable = res;
    },
    [SET_PJ_LIST](state, res) {
      state.accessoryList = res;
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
    async [UPDATE_DATA]({ commit }, param) {
      let res = await api.updateData(param);
      return res;
    },
    /** 删除记录 */
    async [DEL_DATA]({ commit }, param) {
      let res = await api.delData(param);
      return res;
    },
    /** --------------------------配件管理--------------------------- */
    /** 查询配件列表 */
    async [GET_PJ_TABLE]({ commit }, param) {
      let res = await api.getAccessory(param);
      res && commit(SET_PJ_TABLE, res.data.map.data);
    },
    /** 根据配件名称模糊查询配件 */
    async [GET_PJ_LIST]({ commit }, param) {
      let res = await api.getAccessoryByName(param);
      res && commit(SET_PJ_LIST, res.data.map.data);
    },
    /** 增加配件 */
    async [ADD_ACCESSORY]({ commit }, param) {
      let res = await api.addAccessory(param);
      return res;
    },
    /** 删除配件 */
    async [DEL_ACCESSORY]({ commit }, param) {
      let res = await api.delAccessory(param);
      return res;
    }
  }
};
