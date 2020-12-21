<template lang="pug">
  div.layout
    Layout(:style="{minHeight: '100vh'}")
      Sider.sider-style(collapsible :collapsed-width="78" v-model="isCollapsed")
        //- div(style="height:200px;text-align:center;width: 200px; min-width: 200px; max-width: 200px;")
        //-   img(src="../assets/logo.png" style="width:180px;height:180px;box-shadow: 0 1px 2px 1px rgba(105,105,105,1);border-radius:50%;margin-top:10px;")
        div(style="height:120px;width: 200px; min-width: 200px; max-height: 120px;text-align:center;")
          img(src="../assets/logo1.png" style="width:200px;height:120px;")
        div
          appMenu
      //- Sider(style="background:#fff" v-model="isCollapsed")
        appMenu
      Layout
        Header(:style="{background: '#FFFFFF', borderBottom: '1px solid #3CB371', boxShadow: '0 1px 2px 1px rgba(60,179,113,1)',padding: '0px 16px 0px 16px'}")
          appNav
        Content(:style="{padding: '16px 16px 16px 16px', background: '#FFF'}")
          router-view(v-if="isRouterAlive")
</template>
<script>
import appNav from './nav/main';
import appMenu from './menu/main';
export default {
  components: {
    appNav,
    appMenu
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isCollapsed: false,
      isRouterAlive: true
    };
  },
  computed: {
    menuitemClasses: function() {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ];
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style lang="less">
@import '../style/common.less';
.ivu-layout-sider-trigger {
  position: fixed;
  bottom: 0;
  text-align: center;
  cursor: pointer;
  height: 48px;
  line-height: 48px;
  z-index: 1000;
  background: #fff;
  box-shadow: 0 1px 2px 1px rgba(25,190,107,.5);
  color: #000;
}
.sider-style {
   background:#fff;
   // 边框阴影
   box-shadow: 0 1px 2px 1px rgba(25,190,107,1);
}
</style>
