import Vuex from 'vuex';
import Vue from 'vue';

import sclsModule from './modules/sclc/index';
import doorType from './modules/common/static-fields/index';
import mrsz from './modules/common/cwgl/mrsz/index';
import dataColumns from './modules/common/static-data/index';

Vue.use(Vuex);

let store = new Vuex.Store({
  // 加载组件，否则无法解析store
  modules: {
    sclsModule,
    doorType,
    dataColumns,
    mrsz
  },
  strict: process.env.NODE_ENV !== 'production' // 开启严格模式
});
export default store;
