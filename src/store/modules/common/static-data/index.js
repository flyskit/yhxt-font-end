// 原木门
import { DATA_YMM_PKM, COLUMNS_YMM_PKM } from './ymm';
// 烤漆门
import { DATA_KQM_PKM } from './kqm';
// 套装门
import { DATA_TZM_PKM, DATA_TZM_STM_DDM, DATA_TZM_KT } from './tzm';

export const GET_DATA_YMM_PKM = 'GET_DATA_YMM_PKM';
export const GET_COLUMNS_YMM_PKM = 'GET_COLUMNS_YMM_PKM';
export const GET_DATA_KQM_PKM = 'GET_DATA_KQM_PKM';
export const GET_DATA_TZM_PKM = 'GET_DATA_TZM_PKM';
export const GET_DATA_TZM_STM_DDM = 'GET_DATA_TZM_STM_DDM';
export const GET_DATA_TZM_KT = 'GET_DATA_TZM_KT';

export default {
  state: {
  },
  getters: {
    GET_DATA_YMM_PKM: (state) => DATA_YMM_PKM,
    GET_COLUMNS_YMM_PKM: (state) => COLUMNS_YMM_PKM,
    GET_DATA_KQM_PKM: (state) => DATA_KQM_PKM,
    GET_DATA_TZM_PKM: (state) => DATA_TZM_PKM,
    GET_DATA_TZM_STM_DDM: (state) => DATA_TZM_STM_DDM,
    GET_DATA_TZM_KT: (state) => DATA_TZM_KT
  },
  mutations: {

  },
  actions: {

  }
};
