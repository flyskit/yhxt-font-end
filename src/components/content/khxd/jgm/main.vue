<template lang='pug'>
  div.khxd-jgm
    Tabs(value="xjbd" v-model="currentTab" @on-click="currentTabChange" type="card" :animated="false")
      TabPane(name="xjbd" label="创建订单" icon="md-add")
        xjbd
      TabPane(name="jryxd" label="今日下单记录" icon="md-trending-down")
        jryxd
      TabPane(name="zclb" label="暂存列表" icon="md-bookmark")
        zclb
      TabPane(name="jlcx" label="记录查询" icon="md-recording")
        ddjl
</template>

<script>
export default {
  components: {
    'xjbd': (resolve) => require(['./xjbd'], resolve),
    'jryxd': (resolve) => require(['./jryxd'], resolve),
    'zclb': (resolve) => require(['./zclb'], resolve),
    'ddjl': (resolve) => require(['./ddjl'], resolve)
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
