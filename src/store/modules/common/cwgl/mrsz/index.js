// 收入类型
import { MRSZ_SR_LX } from './sr';
// 支出类型
import { MRSZ_ZC_LX } from './zc';

export const GET_MRSZ_SR_LX = 'GET_MRSZ_SR_LX';
export const GET_MRSZ_ZC_LX = 'GET_MRSZ_ZC_LX';

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

  }
};
