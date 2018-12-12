<template lang="pug">
  div.layout
    Layout(:style="{minHeight: '100vh'}")
      Sider(collapsible :collapsed-width="78" v-model="isCollapsed")
        appMenu
      Layout
        Header(:style="{background: '#F2F2F2', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)',padding: '0px 16px 0px 16px'}")
          appNav
        Content(:style="{padding: '16px 16px 16px 16px', background: '#FFF'}")
          router-view
</template>
<script>
import appNav from './nav/main';
import appMenu from './menu/main';
export default {
  components: {
    appNav,
    appMenu
  },
  data() {
    return {
      isCollapsed: false
    };
  },
  computed: {
    menuitemClasses: function() {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ];
    }
  }
};
</script>

<style lang="less">
  @import '../style/common.less';
  @import '../style/menu.less';
</style>
