<template lang='pug'>
  div.khxd-thj
    Tabs(type="card" v-model="currentTab" @on-click="currentTabChange" :animated="false")
      TabPane(v-for="index in tabComponent" :label="index.label" :name="index.key" :key="index.key")
    <keep-alive>
      Component(:is="currentTabComponent")
    </keep-alive>
</template>

<script>
export default {
  components: {
    'xjbd-pkm': (resolve) => require(['./xjbd-pkm'], resolve),
    'xjbd-dtm': (resolve) => require(['./xjbd-dtm'], resolve)
  },
  data () {
    return {
      currentTab: 'xjbd-pkm',
      currentTabComponent: 'xjbd-pkm',
      tabComponent: [
        {
          key: 'xjbd-pkm',
          label: '平开门'
        },
        {
          key: 'xjbd-dtm',
          label: '吊趟门'
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
