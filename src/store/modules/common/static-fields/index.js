// 门类型
import {DOOR_TYPE} from './door_type';
// 颜色类型
import { COLOR_TYPE } from './classify_type';
// 原木门
import { CLASSIFY_YMM_PKM } from './ymm';
// 烤漆门
import { CLASSIFY_KQM_PKM } from './kqm';
// 套装门
import { PROCESS_TYPE, LINE_TYPE } from './tzm';

export const GET_DOOR_TYPE = 'GET_DOOR_TYPE';
export const GET_CLASSIFY_YMM_PKM = 'GET_CLASSIFY_YMM_PKM';
export const GET_CLASSIFY_KQM_PKM = 'GET_CLASSIFY_KQM_PKM';
export const GET_COLOR_TYPE = 'GET_COLOR_TYPE';
export const GET_PROCESS_TYPE = 'GET_PROCESS_TYPE';
export const GET_LINE_TYPE = 'GET_LINE_TYPE';

export default {
  state: {
  },
  getters: {
    GET_DOOR_TYPE: (state) => DOOR_TYPE,
    GET_CLASSIFY_YMM_PKM: (state) => CLASSIFY_YMM_PKM,
    GET_COLOR_TYPE: (state) => COLOR_TYPE,
    GET_CLASSIFY_KQM_PKM: (state) => CLASSIFY_KQM_PKM,
    GET_PROCESS_TYPE: (state) => PROCESS_TYPE,
    GET_LINE_TYPE: (state) => LINE_TYPE
  },
  mutations: {

  },
  actions: {

  }
};
