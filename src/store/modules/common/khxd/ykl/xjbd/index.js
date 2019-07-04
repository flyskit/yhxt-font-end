
import api from './api';

// actions
export const ADD_DATA = 'ADD_DATA';
export const GET_BH = 'GET_BH';
export const GET_LS = 'GET_LS';
export const GET_KH = 'GET_KH';
export const GET_BC = 'GET_BC';
export const ADD_HANDLE = 'ADD_HANDLE';
export const UPDATE_HANDLE = 'UPDATE_HANDLE';
export const DEL_HANDLE = 'DEL_HANDLE';
export const GET_DATA_BY_COND = 'GET_REWORK_DATA';
// mutations
export const SET_BH = 'SET_BH';
export const SET_LS = 'SET_LS';
export const SET_KH = 'SET_KH';
export const SET_BC = 'SET_BC';
export const SET_DATA_BY_COND = 'SET_DATA_BY_COND';
// getters
export const GETTER_BH = 'GETTER_BH';
export const GETTER_LS = 'GETTER_LS';
export const GETTER_KH = 'GETTER_KH';
export const GETTER_BC = 'GETTER_BC';
export const GETTER_DATA_BY_COND = 'GETTER_DATA_BY_COND';

export default {
  state: {
    bh: '',
    ls: [],
    kh: [],
    bc: [],
    recordData: []
  },
  getters: {
    GETTER_BH: (state) => state.bh,
    GETTER_LS: (state) => state.ls,
    GETTER_KH: (state) => state.kh,
    GETTER_BC: (state) => state.bc,
    GETTER_REWORK_DATA: (state) => state.recordData
  },
  mutations: {
    [SET_BH](state, res) {
      state.bh = res;
    },
    [SET_LS](state, res) {
      state.ls = res;
    },
    [SET_KH](state, res) {
      state.kh = res;
    },
    [SET_BC](state, res) {
      state.bc = res;
    },
    [SET_DATA_BY_COND](state, res) {
      state.recordData = res;
    }
  },
  actions: {
    /** --------------------------创建订单--------------------------- */
    /** 获取编号 */
    async [GET_BH]({ commit }) {
      let res = await api.getOrderNumber();
      res.data.status === 200 ? commit(SET_BH, res.data.map.data) : alert(res.data.info);
    },
    /** 获取全部拉手 */
    async [GET_LS]({ commit }, param) {
      let res = await api.getHandle(param);
      res.data.status === 200 ? commit(SET_LS, res.data.map.data) : alert(res.data.info);
    },
    /** 根据客户名称模糊查询客户列表 */
    async [GET_KH]({ commit }, param) {
      let res = await api.getCustomerByName(param);
      res.data.status === 200 ? commit(SET_KH, res.data.map.data) : alert(res.data.info);
    },
    /** 获取全部板材信息 */
    async [GET_BC]({ commit }, param) {
      let res = await api.getBoardPriceDetailByGoodsType(param);
      res.data.status === 200 ? commit(SET_BC, res.data.map.data) : alert(res.data.info);
    },
    /** 提交数据 */
    async [ADD_DATA]({ commit }, param) {
      let res = await api.addData(param);
      return res;
    },
    /** --------------------------返工订单--------------------------- */
    /** 条件查询记录 */
    async [GET_DATA_BY_COND]({ commit }, param) {
      let res = await api.getDataByCond(param);
      res.data.status === 200 ? commit(SET_DATA_BY_COND, res.data.map.data) : alert(res.data.info);
    }
  }
};
