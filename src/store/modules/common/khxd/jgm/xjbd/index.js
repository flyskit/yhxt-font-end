
import api from './api';

// actions
export const ADD_DATA = 'ADD_DATA';
export const GET_BH = 'GET_BH';
export const GET_LS = 'GET_LS';
export const GET_KH = 'GET_KH';
export const ADD_HANDLE = 'ADD_HANDLE';
export const UPDATE_HANDLE = 'UPDATE_HANDLE';
export const DEL_HANDLE = 'DEL_HANDLE';
export const GET_REWORK_DATA = 'GET_REWORK_DATA';

// mutations
export const SET_BH = 'SET_BH';
export const SET_LS = 'SET_LS';
export const SET_KH = 'SET_KH';
export const SET_REWORK_DATA = 'SET_REWORK_DATA';
// getters
export const GETTER_BH = 'GETTER_BH';
export const GETTER_LS = 'GETTER_LS';
export const GETTER_KH = 'GETTER_KH';
export const GETTER_REWORK_DATA = 'GETTER_REWORK_DATA';

export default {
  state: {
    bh: '',
    ls: [],
    kh: [],
    reworkData: []
  },
  getters: {
    GETTER_BH: (state) => state.bh,
    GETTER_LS: (state) => state.ls,
    GETTER_KH: (state) => state.kh,
    GETTER_REWORK_DATA: (state) => state.reworkData
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
    [SET_REWORK_DATA](state, res) {
      state.reworkData = res;
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
    /** 提交数据 */
    async [ADD_DATA]({ commit }, param) {
      let res = await api.addData(param);
      return res;
    },
    /** --------------------------拉手管理--------------------------- */
    /** 增加拉手 */
    async [ADD_HANDLE]({ commit }, param) {
      let res = await api.addHandle(param);
      return res;
    },
    /** 修改拉手信息 */
    async [UPDATE_HANDLE]({ commit }, param) {
      let res = await api.updateHandle(param);
      return res;
    },
    /** 删除配件 */
    async [DEL_HANDLE]({ commit }, param) {
      let res = await api.delHandle(param);
      return res;
    },
    /** --------------------------返工订单--------------------------- */
    /** 根据客户姓名模糊查询记录 */
    async [GET_REWORK_DATA]({ commit }, param) {
      let res = await api.findDataByName(param);
      res.data.status === 200 ? commit(SET_REWORK_DATA, res.data.map.data) : alert(res.data.info);
    }
  }
};
