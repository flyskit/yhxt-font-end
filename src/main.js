import 'babel-polyfill';
import Vue from 'vue';
import iView from 'view-design';
import axios from 'axios';

import store from './store';
import router from './router';
import 'iview/dist/styles/iview.css';
import '../src/style/index.less';
import '../src/style/mixin.less';
import Print from 'vue-print-nb';
import app from './components/app';
import VueRouter from 'vue-router';

Vue.use(Print);
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
