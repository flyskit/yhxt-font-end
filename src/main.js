import 'babel-polyfill';
import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import axios from 'axios';

import app from './components/app';
import store from './store';
import router from './router';
import 'iview/dist/styles/iview.css';

Vue.use(VueRouter);
Vue.use(iView);
// 加载axios
Vue.prototype.axios = axios;
axios.defaults.baseURL = 'http://localhost/back-stage';

const debug = process.env.NODE_ENV !== 'production';
Vue.config.debug = debug;
Vue.config.devtools = debug;
window._vueInstance = new Vue({
  components: { app },
  template: '<app/>',
  el: '#app',
  store,
  router
});
