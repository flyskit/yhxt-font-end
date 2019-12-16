import Vue from 'vue';
import Router from 'vue-router';

import home from '@/components/content/home/main';
import cgrk from '@/components/content/clgl/cgrk/main';
import kcjl from '@/components/content/clgl/kcjl/main';
import khxd from '@/components/content/sclc/khxd/main';
import mrsz from '@/components/content/cwgl/mrsz/main';
import jgm from '@/components/content/khxd/jgm/main';
import ykl from '@/components/content/khxd/ykl/main';
import xsm from '@/components/content/khxd/xsm/main';
import thj from '@/components/content/khxd/thj/main';
import ygm from '@/components/content/khxd/ygm/main';
import tzm from '@/components/content/khxd/tzm/main';
import ddjl from '@/components/content/ddgl/ddjl/main';

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
      path: '/khxd-xsm',
      name: 'xsm',
      component: xsm
    },
    {
      path: '/khxd-thj',
      name: 'thj',
      component: thj
    },
    {
      path: '/khxd-ygm',
      name: 'ygm',
      component: ygm
    },
    {
      path: '/khxd-tzm',
      name: 'tzm',
      component: tzm
    },
    {
      path: '/ddgl-ddjl',
      name: 'ddjl',
      component: ddjl
    },
    {
      path: '/finance-everyday',
      name: 'mrsz',
      component: mrsz
    }
  ]
});
