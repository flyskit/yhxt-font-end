// 收入类型
import { MRSZ_SR_LX, MRSZ_SR_COLUMNS } from './sr';
// 支出类型
import { MRSZ_ZC_LX } from './zc';

import api from './api';

export const GET_MRSZ_SR_LX = 'GET_MRSZ_SR_LX';
export const GET_MRSZ_SR_COLUMNS = 'GET_MRSZ_SR_COLUMNS';
export const GET_MRSZ_ZC_LX = 'GET_MRSZ_ZC_LX';

export const GET_ADD_INCOME = 'GET_ADD_INCOME';
export const GET_MRSZ_SR_DATA = 'GET_MRSZ_SR_DATA';
export const GET_BH = 'GET_BH';
export const SET_BH = 'SET_BH';

export const GET_DATA = 'GET_DATA';
// export const SET_ADD_INCOME = 'SET_ADD_INCOME';

export default {
  state: {
    data: '',
    pageIndex: undefined,
    pageNum: 10
  },
  getters: {
    GET_MRSZ_SR_LX: (state) => MRSZ_SR_LX,
    GET_MRSZ_ZC_LX: (state) => MRSZ_ZC_LX,
    GET_MRSZ_SR_COLUMNS: (state) => MRSZ_SR_COLUMNS,
    GET_DATA: (state) => state.data
  },
  mutations: {
    [SET_BH](state, data) {
      state.data = data;
    }
  },
  actions: {
    // 添加-收入账单
    async [GET_ADD_INCOME]({ commit }, param) {
      let res = await api.addIncome(param);
      console.log(res.data);
    },
    // 获取历时记录
    async [GET_MRSZ_SR_DATA]({ commit }, param) {
      let res = await api.getIncome(param);
      console.log(res.data);
    },
    async [GET_BH]({ commit }) {
      let res = await api.getBh();
      console.log(res.data);
      commit(SET_BH, res.data);
    }
  }
};
