// 收入类型
import { MRSZ_SR_LX } from './sr';
// 支出类型
import { MRSZ_ZC_LX } from './zc';

import api from './api';

export const GET_MRSZ_SR_LX = 'GET_MRSZ_SR_LX';
export const GET_MRSZ_ZC_LX = 'GET_MRSZ_ZC_LX';
export const GET_ADD_INCOME = 'GET_ADD_INCOME';

export default {
  state: {
  },
  getters: {
    GET_MRSZ_SR_LX: (state) => MRSZ_SR_LX,
    GET_MRSZ_ZC_LX: (state) => MRSZ_ZC_LX
  },
  mutations: {

  },
  actions: {
    [GET_ADD_INCOME](data) {
      console.log('----请求参数' + data);
      let res = api.addIncome(data);
      console.log('----反馈结果' + res);
    }
  }
};
