// 收入类型
import { MRSZ_SR_LX } from './sr';
// 支出类型
import { MRSZ_ZC_LX } from './zc';

import api from './api';

export const GET_MRSZ_SR_LX = 'GET_MRSZ_SR_LX';
export const GET_MRSZ_ZC_LX = 'GET_MRSZ_ZC_LX';
export const GET_ADD_INCOME = 'GET_ADD_INCOME';
// export const SET_ADD_INCOME = 'SET_ADD_INCOME';

export default {
  state: {
  },
  getters: {
    GET_MRSZ_SR_LX: (state) => MRSZ_SR_LX,
    GET_MRSZ_ZC_LX: (state) => MRSZ_ZC_LX
  },
  mutations: {
    // [SET_ADD_INCOME](state, data) {
    // }
  },
  actions: {
    [GET_ADD_INCOME]({ commit }, param) {
      console.log(param);
      let res = api.addIncome(param);
      console.log(res);
    }
  }
};
