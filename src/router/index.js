import Vue from 'vue';
import Router from 'vue-router';

import home from '@/components/content/home/main';
import cgrk from '@/components/content/clgl/cgrk/main';
import kcjl from '@/components/content/clgl/kcjl/main';
import khxd from '@/components/content/sclc/khxd/main';
import xjbd from '@/components/content/khxd/xjbd/main';
import mrsz from '@/components/content/cwgl/mrsz/main';
import jgm from '@/components/content/khxd/jgm/main';
import ykl from '@/components/content/khxd/ykl/main';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/asset-purchase',
      name: 'cgrk',
      component: cgrk
    },
    {
      path: '/asset-stock',
      name: 'kcjl',
      component: kcjl
    },
    {
      path: '/produce-down',
      name: 'khxd',
      component: khxd
    },
    {
      path: '/order-new',
      name: 'xjbd',
      component: xjbd
    },
    {
      path: '/khxd-jgm',
      name: 'jgm',
      component: jgm
    },
    {
      path: '/khxd-ykl',
      name: 'ykl',
      component: ykl
    },
    {
      path: '/finance-everyday',
      name: 'mrsz',
      component: mrsz
    }
  ]
});
