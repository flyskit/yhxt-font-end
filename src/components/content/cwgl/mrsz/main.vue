<template lang='pug'>
  div.mrsz
    Tabs(value="sr" v-model="currentTab" @on-click="currentTabChange" type="line")
      TabPane(name="sr" label="收入" icon="md-trending-down")
        sr
      TabPane(name="zc" label="支出" icon="md-trending-up")
        zc
      TabPane(name="jrmx" label="今日明细" icon="logo-tux") 标签三的内容
</template>

<script>
import sr from './sr.vue';
import zc from './zc.vue';
export default {
  components: {
    sr, zc
  },
  data () {
    return {
      currentTab: 'sr'
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
