import { COLUMNS, rules } from './modules';
export const GET_DATA = 'GET_DATA';
export const SET_DATA = 'SET_DATA';
export const GETTER_DATA = 'GETTER_DATA';
export const GETTER_COLUMNS = 'GETTER_COLUMNS';
export const GETTER_DOWNTYPE = 'GETTER_DOWNTYPE';
export const GETTER_RULES = 'GETTER_RULES';

export default {
  state: {
    data: '',
    columns: COLUMNS
  },
  getters: {
    GETTER_DATA: (state) => state.data,
    GETTER_COLUMNS: (state) => state.columns,
    GETTER_RULES: (state) => rules
  },
  mutations: {
    [SET_DATA](state, res) {
      state.data = res;
    }
  },
  actions: {
    // 必须使用异步，不然data无法传递到mutations
    async [GET_DATA]({commit}) {
      console.log(COLUMNS);
      await commit(SET_DATA, '00000');
      // let res = await api.getData();
      // res.commit(SET_DATA, res);
    }
  }
};
