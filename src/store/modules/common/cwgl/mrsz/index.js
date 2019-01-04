// 收入类型
import { MRSZ_SR_COLUMNS } from './sr';

import api from './api';

// getters
export const GET_MRSZ_SR_COLUMNS = 'GET_MRSZ_SR_COLUMNS';
export const GET_BH = 'GET_BH';
export const GET_TABLE_DATA = 'GET_TABLE_DATA';
export const GET_TOTAL_PAGE = 'GET_TOTAL_PAGE';
export const GET_TOTAL_ELEMENT = 'GET_TOTAL_ELEMENT';

// actions
export const GET_ADD_INCOME = 'GET_ADD_INCOME';
export const GET_MRSZ_SR_DATA = 'GET_MRSZ_SR_DATA';
export const GET_BH_DATA = 'GET_BH_DATA';

// mutations
export const SET_BH = 'SET_BH';
export const SET_MRSZ_SR_DATA = 'SET_MRSZ_SR_DATA';

export default {
  state: {
    data: '',
    bh: '',
    tableData: [],
    totalPage: 0,
    totalElement: 0
  },
  getters: {
    GET_MRSZ_SR_COLUMNS: (state) => MRSZ_SR_COLUMNS,
    GET_BH: (state) => state.bh,
    GET_TABLE_DATA: (state) => state.tableData,
    GET_TOTAL_PAGE: (state) => state.totalPage,
    GET_TOTAL_ELEMENT: (state) => state.totalElement
  },
  mutations: {
    [SET_BH](state, res) {
      state.bh = res;
    },
    [SET_MRSZ_SR_DATA](state, res) {
      state.tableData = res.content;
      state.totalPage = res.totalPages;
      state.totalElement = res.totalElements;
    }
  },
  actions: {
    // 添加-收入账单
    async [GET_ADD_INCOME]({ commit }, param) {
      let res = await api.addIncome(param);
      console.log(res.data);
    },
    // 查询-根据条件查询记录
    async [GET_MRSZ_SR_DATA]({ commit }, param) {
      let res = await api.getDataByCond(param);
      console.log(res.data.map.data.content);
      commit(SET_MRSZ_SR_DATA, res.data.map.data);
    },
    // 查询-编号
    async [GET_BH_DATA]({ commit }) {
      let res = await api.getBh();
      console.log(res);
      commit(SET_BH, res.data.map.data);
    }
  }
};
