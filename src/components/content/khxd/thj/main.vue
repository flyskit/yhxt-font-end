<template lang='pug'>
  div.khxd-thj
    Tabs(type="card" v-model="currentTab" @on-click="currentTabChange" :animated="false")
      TabPane(v-for="index in tabComponent" :label="index.label" :name="index.key" :icon="index.icon" :key="index.key")
    <keep-alive>
      Component(:is="currentTabComponent")
    </keep-alive>
</template>

<script>
export default {
  components: {
    'xjbd': (resolve) => require(['./xjbd'], resolve),
    'jryxd': (resolve) => require(['./jryxd'], resolve),
    'zclb': (resolve) => require(['./zclb'], resolve)
  },
  data () {
    return {
      currentTab: 'xjbd',
      currentTabComponent: 'xjbd',
      tabComponent: [
        {
          key: 'xjbd',
          label: '创建订单',
          icon: 'md-add'
        },
        {
          key: 'jryxd',
          label: '今日下单记录',
          icon: 'md-trending-down'
        },
        {
          key: 'zclb',
          label: '暂存列表',
          icon: 'md-bookmark'
        }
      ]
    };
  },
  methods: {
    currentTabChange(name) {
      this.currentTab = name;
      this.currentTabComponent = name;
    }
  }
};
</script>
<style lang='less' scoped>

</style>
