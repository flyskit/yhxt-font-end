import 'babel-polyfill';
import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import axios from 'axios';

import app from './components/app';
import store from './store';
import router from './router';
import 'iview/dist/styles/iview.css';
import '../src/style/index.less';
import Print from 'vue-print-nb';

Vue.use(Print);
Vue.use(VueRouter);
Vue.use(iView);
// 加载axios
Vue.prototype.axios = axios;
axios.defaults.baseURL = 'http://192.168.3.250/back-stage';

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
