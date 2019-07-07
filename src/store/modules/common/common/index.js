
import api from './api';

/** ---------------------- actions ------------------- */
/** 订单管理 */
export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS';
export const DEL_ORDER = 'DEL_ORDER';
/** 配件管理 */
export const GET_ACCESSORY_TABLE = 'GET_ACCESSORY_TABLE';
export const GET_ACCESSORY_BY_NAME = 'GET_ACCESSORY_BY_NAME';
export const ADD_ACCESSORY = 'ADD_ACCESSORY';
export const DEL_ACCESSORY = 'DEL_ACCESSORY';

/** ---------------------- mutations ------------------- */
export const SET_ACCESSORY_TABLE = 'SET_ACCESSORY_TABLE';
export const SET_ACCESSORY_BY_NAME = 'SET_ACCESSORY_BY_NAME';

/** ---------------------- getters ------------------- */
export const GETTER_ACCESSORY_TABLE = 'GETTER_ACCESSORY_TABLE';
export const GETTER_ACCESSORY_BY_NAME = 'GETTER_ACCESSORY_BY_NAME';

export default {
  state: {
    accessoryTable: [],
    accessoryBY_NAME: []
  },
  getters: {
    GETTER_ACCESSORY_TABLE: (state) => state.accessoryTable,
    GETTER_ACCESSORY_BY_NAME: (state) => state.accessoryBY_NAME
  },
  mutations: {
    [SET_ACCESSORY_TABLE](state, res) {
      state.accessoryTable = res;
    },
    [SET_ACCESSORY_BY_NAME](state, res) {
      state.accessoryBY_NAME = res;
    }
  },
  actions: {
    /** --------------------------配件管理--------------------------- */
    /** 删除订单 */
    async [DEL_ORDER]({ commit }, param) {
      let res = await api.delOrder(param);
      return res;
    },
    /** 提交数据 */
    async [UPDATE_ORDER_STATUS]({ commit }, param) {
      let res = await api.updateStatus(param);
      return res;
    },
    /** --------------------------配件管理--------------------------- */
    /** 查询配件列表 */
    async [GET_ACCESSORY_TABLE]({ commit }, param) {
      let res = await api.getAccessory(param);
      res && commit(SET_ACCESSORY_TABLE, res.data.map.data);
    },
    /** 根据配件名称模糊查询配件 */
    async [GET_ACCESSORY_BY_NAME]({ commit }, param) {
      let res = await api.getAccessoryByName(param);
      res && commit(SET_ACCESSORY_BY_NAME, res.data.map.data);
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
