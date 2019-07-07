
import api from './api';

/** ---------------------- actions ------------------- */
/** 订单管理 */
export const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER';
export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS';
export const DEL_ORDER = 'DEL_ORDER';
/** 配件管理 */
export const GET_ACCESSORY_TABLE = 'GET_ACCESSORY_TABLE';
export const GET_ACCESSORY_BY_NAME = 'GET_ACCESSORY_BY_NAME';
export const ADD_ACCESSORY = 'ADD_ACCESSORY';
export const DEL_ACCESSORY = 'DEL_ACCESSORY';
/** 拉手管理 */
export const GET_HANDLE_BY_TYPE = 'GET_HANDLE_BY_TYPE';
export const ADD_HANDLE = 'ADD_HANDLE';
export const UPDATE_HANDLE = 'UPDATE_HANDLE';
export const DEL_HANDLE = 'DEL_HANDLE';
/** 板材报价管理 */
export const GET_BOARD_BY_TYPE = 'GET_BOARD_BY_TYPE';
export const ADD_BOARD = 'ADD_BOARD';
export const UPDATE_BOARD = 'UPDATE_BOARD';
export const DEL_BOARD = 'DEL_BOARD';
/** 客户管理 */
export const GET_CUSTOMER_BY_NAME = 'GET_CUSTOMER_BY_NAME';

/** ---------------------- mutations ------------------- */
export const SET_ORDER_NUMBER = 'SET_ORDER_NUMBER';
export const SET_ACCESSORY_TABLE = 'SET_ACCESSORY_TABLE';
export const SET_ACCESSORY_BY_NAME = 'SET_ACCESSORY_BY_NAME';
export const SET_HANDLE_BY_TYPE = 'SET_HANDLE_BY_TYPE';
export const SET_BOARD_BY_TYPE = 'SET_BOARD_BY_TYPE';
export const SET_CUSTOMER_BY_NAME = 'SET_CUSTOMER_BY_NAME';

/** ---------------------- getters ------------------- */
export const GETTER_ORDER_NUMBER = 'GETTER_ORDER_NUMBER';
export const GETTER_ACCESSORY_TABLE = 'GETTER_ACCESSORY_TABLE';
export const GETTER_ACCESSORY_BY_NAME = 'GETTER_ACCESSORY_BY_NAME';
export const GETTER_HANDLE_BY_TYPE = 'GETTER_HANDLE_BY_TYPE';
export const GETTER_BOARD_BY_TYPE = 'GETTER_BOARD_BY_TYPE';
export const GETTER_CUSTOMER_BY_NAME = 'GETTER_CUSTOMER_BY_NAME';

export default {
  state: {
    orderNumber: '',
    accessoryTable: [],
    accessoryDetailList: [],
    handleList: [],
    boardList: [],
    customerList: []
  },
  getters: {
    GETTER_ORDER_NUMBER: (state) => state.orderNumber,
    GETTER_ACCESSORY_TABLE: (state) => state.accessoryTable,
    GETTER_ACCESSORY_BY_NAME: (state) => state.accessoryDetailList,
    GETTER_HANDLE_BY_TYPE: (state) => state.handleList,
    GETTER_BOARD_BY_TYPE: (state) => state.boardList,
    GETTER_CUSTOMER_BY_NAME: (state) => state.customerList
  },
  mutations: {
    [SET_ORDER_NUMBER](state, res) {
      state.orderNumber = res;
    },
    [SET_ACCESSORY_TABLE](state, res) {
      state.accessoryTable = res;
    },
    [SET_ACCESSORY_BY_NAME](state, res) {
      state.accessoryDetailList = res;
    },
    [SET_HANDLE_BY_TYPE](state, res) {
      state.handleList = res;
    },
    [SET_BOARD_BY_TYPE](state, res) {
      state.boardList = res;
    },
    [SET_CUSTOMER_BY_NAME](state, res) {
      state.customerList = res;
    }
  },
  actions: {
    /** --------------------------订单管理--------------------------- */
    /** 获取编号 */
    async [GET_ORDER_NUMBER]({ commit }) {
      let res = await api.getOrderNumber();
      res.data.status === 200 ? commit(SET_ORDER_NUMBER, res.data.map.data) : alert(res.data.info);
    },
    /** 删除订单 */
    async [DEL_ORDER]({ commit }, param) {
      let res = await api.delOrder(param);
      return res;
    },
    /** 提交数据 */
    async [UPDATE_ORDER_STATUS]({ commit }, param) {
      let res = await api.updateStatus(param);
      return res;
    },
    /** --------------------------配件管理--------------------------- */
    /** 查询配件列表 */
    async [GET_ACCESSORY_TABLE]({ commit }, param) {
      let res = await api.getAccessory(param);
      res && commit(SET_ACCESSORY_TABLE, res.data.map.data);
    },
    /** 根据配件名称模糊查询配件 */
    async [GET_ACCESSORY_BY_NAME]({ commit }, param) {
      let res = await api.getAccessoryByName(param);
      res && commit(SET_ACCESSORY_BY_NAME, res.data.map.data);
    },
    /** 增加配件 */
    async [ADD_ACCESSORY]({ commit }, param) {
      let res = await api.addAccessory(param);
      return res;
    },
    /** 删除配件 */
    async [DEL_ACCESSORY]({ commit }, param) {
      let res = await api.delAccessory(param);
      return res;
    },
    /** --------------------------拉手管理--------------------------- */
    /** 获取全部拉手 */
    async [GET_HANDLE_BY_TYPE]({ commit }, param) {
      let res = await api.getHandle(param);
      res.data.status === 200 ? commit(SET_HANDLE_BY_TYPE, res.data.map.data) : alert(res.data.info);
    },
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
    /** 删除拉手信息 */
    async [DEL_HANDLE]({ commit }, param) {
      let res = await api.delHandle(param);
      return res;
    },
    /** --------------------------板材报价管理--------------------------- */
    /** 根据类型获取板材报价信息 */
    async [GET_BOARD_BY_TYPE]({ commit }, param) {
      let res = await api.getBoardPriceDetailByGoodsType(param);
      res.data.status === 200 ? commit(SET_BOARD_BY_TYPE, res.data.map.data) : alert(res.data.info);
    },
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
    /** --------------------------客户管理--------------------------- */
    /** 根据客户名称模糊查询客户列表 */
    async [GET_CUSTOMER_BY_NAME]({ commit }, param) {
      let res = await api.getCustomerByName(param);
      res.data.status === 200 ? commit(SET_CUSTOMER_BY_NAME, res.data.map.data) : alert(res.data.info);
    }
  }
};
