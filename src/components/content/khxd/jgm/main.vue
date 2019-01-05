<template lang='pug'>
  div.khxd-jgm
    Tabs(value="xjbd" v-model="currentTab" @on-click="currentTabChange" type="line")
      TabPane(name="xjbd" label="新建表单" icon="md-trending-down")
        xjbd
      TabPane(name="jryxd" label="今日已下单" icon="md-trending-up")
        jryxd
      TabPane(name="zclb" label="暂存列表" icon="logo-tux") 标签三的内容
      TabPane(name="jlcx" label="记录查询" icon="logo-tux") 记录查询
</template>

<script>
import xjbd from './xjbd';
import jryxd from './jryxd';
export default {
  components: {
    xjbd, jryxd
  },
  data () {
    return {
      currentTab: 'xjbd'
    };
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    currentTabChange(name) {
      this.changeTab(name);
    },
    changeTab(name) {
      this.currentTab = name;
    }
  }
};
</script>
<style lang='less' scoped>

</style>
