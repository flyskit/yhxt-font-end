
import api from './api';

// actions
export const ADD_DATA = 'ADD_DATA';
export const GET_BH = 'GET_BH';
export const GET_LS = 'GET_LS';
export const GET_KH = 'GET_KH';
export const GET_BC = 'GET_BC';
export const ADD_BOARD = 'ADD_BOARD';
export const UPDATE_BOARD = 'UPDATE_BOARD';
export const DEL_BOARD = 'DEL_BOARD';
export const GET_REWORK_DATA = 'GET_REWORK_DATA';
// mutations
export const SET_BH = 'SET_BH';
export const SET_LS = 'SET_LS';
export const SET_KH = 'SET_KH';
export const SET_BC = 'SET_BC';
export const SET_REWORK_DATA = 'SET_REWORK_DATA';
// getters
export const GETTER_BH = 'GETTER_BH';
export const GETTER_LS = 'GETTER_LS';
export const GETTER_KH = 'GETTER_KH';
export const GETTER_BC = 'GETTER_BC';
export const GETTER_REWORK_DATA = 'GETTER_REWORK_DATA';
export const GETTER_TOTAL_PAGE = 'GETTER_TOTAL_PAGE';
export const GETTER_TOTAL_ELEMENT = 'GETTER_TOTAL_ELEMENT';

export default {
  state: {
    bh: '',
    ls: [],
    kh: [],
    bc: [],
    recordData: [],
    totalPages: 0,
    totalElements: 0
  },
  getters: {
    GETTER_BH: (state) => state.bh,
    GETTER_LS: (state) => state.ls,
    GETTER_KH: (state) => state.kh,
    GETTER_BC: (state) => state.bc,
    GETTER_REWORK_DATA: (state) => state.recordData,
    GETTER_TOTAL_PAGE: (state) => state.totalPages,
    GETTER_TOTAL_ELEMENT: (state) => state.totalElements
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
    [SET_REWORK_DATA](state, res) {
      state.recordData = res.content;
      state.totalPages = res.totalPages;
      state.totalElements = res.totalElements;
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
    /** 获取全部板材信息 */
    async [GET_BC]({ commit }, param) {
      let res = await api.getBoardPriceDetailByGoodsType(param);
      res.data.status === 200 ? commit(SET_BC, res.data.map.data) : alert(res.data.info);
    },
    /** 根据客户名称模糊查询客户列表 */
    async [GET_KH]({ commit }, param) {
      let res = await api.getCustomerByName(param);
      res.data.status === 200 ? commit(SET_KH, res.data.map.data) : alert(res.data.info);
    },
    /** 提交数据 */
    async [ADD_DATA]({ commit }, param) {
      let res = await api.addData(param);
      return res;
    },
    /** --------------------------板材管理--------------------------- */
    /** 增加板材 */
    async [ADD_BOARD]({ commit }, param) {
      let res = await api.addBoard(param);
      return res;
    },
    /** 修改拉手信息 */
    async [UPDATE_BOARD]({ commit }, param) {
      let res = await api.updateBoard(param);
      return res;
    },
    /** 删除拉手信息 */
    async [DEL_BOARD]({ commit }, param) {
      let res = await api.delBoard(param);
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
