<template lang='pug'>
  div.print-data
    Modal(v-model="visible" footer-hide width="80vw")
      p(slot="header" style="color:#f60")
        Icon(type="ios-information-circle")
        span 预览打印
      Keep-alive
        summaryJgm(ref="summaryJgm")
</template>

<script>
export default {
  components: {
    'summaryJgm': (resolve) => require(['@component_table/summary/sum-jgm.vue'], resolve)
  },
  data () {
    return {
      visible: false
    };
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    show(data) {
      this.visible = true;
      this.$refs.summaryJgm.show(data);
    }
  }
};
</script>
<style lang='less' scoped>

</style>
