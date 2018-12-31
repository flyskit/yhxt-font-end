// 收入类型
import { MRSZ_SR_LX, MRSZ_SR_COLUMNS } from './sr';
// 支出类型
import { MRSZ_ZC_LX } from './zc';

import api from './api';

// getters
export const GET_MRSZ_SR_LX = 'GET_MRSZ_SR_LX';
export const GET_MRSZ_ZC_LX = 'GET_MRSZ_ZC_LX';
export const GET_MRSZ_SR_COLUMNS = 'GET_MRSZ_SR_COLUMNS';
export const GET_DATA = 'GET_DATA';
export const GET_TABLE_DATA = 'GET_TABLE_DATA';
export const GET_TOTAL_PAGE = 'GET_TOTAL_PAGE';
export const GET_TOTAL_ELEMENT = 'GET_TOTAL_ELEMENT';

// actions
export const GET_ADD_INCOME = 'GET_ADD_INCOME';
export const GET_MRSZ_SR_DATA = 'GET_MRSZ_SR_DATA';
export const GET_BH = 'GET_BH';

// mutations
export const SET_BH = 'SET_BH';
export const SET_MRSZ_SR_DATA = 'SET_MRSZ_SR_DATA';

export default {
  state: {
    data: '',
    tableData: [],
    totalPage: 0,
    totalElement: 0
  },
  getters: {
    GET_MRSZ_SR_LX: (state) => MRSZ_SR_LX,
    GET_MRSZ_ZC_LX: (state) => MRSZ_ZC_LX,
    GET_MRSZ_SR_COLUMNS: (state) => MRSZ_SR_COLUMNS,
    GET_DATA: (state) => state.data,
    GET_TABLE_DATA: (state) => state.tableData,
    GET_TOTAL_PAGE: (state) => state.totalPage,
    GET_TOTAL_ELEMENT: (state) => state.totalElement
  },
  mutations: {
    [SET_BH](state, data) {
      state.data = data;
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
      commit(SET_MRSZ_SR_DATA, res.data.map.data);
    },
    // 查询-编号
    async [GET_BH]({ commit }) {
      let res = await api.getBh();
      console.log(res.data);
      commit(SET_BH, res.data);
    }
  }
};
