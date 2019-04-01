import Vuex from 'vuex';
import Vue from 'vue';
import camelCase from 'lodash/camelCase';

Vue.use(Vuex);

// 动态引入module
let contexts = require.context('./modules', true, /index+\.js$/);
let modules = {};
contexts.keys().forEach((key) => {
  let name = camelCase(
    key.replace(/^\.\/_/, '').replace(/\.\w+$/, '').split(/\//)
  );
  let module = contexts(key).default;
  name && (modules[name] = { ...module, namespaced: true });
});
let store = new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
});
export default store;
