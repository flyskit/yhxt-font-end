<template lang='pug'>
  div.print-data
    Modal(v-model="visible" width="80vw" fullscreen @on-ok="ok" @on-cancel="ok")
      p(slot="header" style="color:#f60" class="noprint")
        Icon(type="ios-information-circle")
        span 预览
      div(class="print")
        Keep-alive
          summaryJgm(ref="summaryJgm")
      div(slot="footer" class="noprint")
        Button(type="primary" @click="printPage") 打印
        Button(type="error" @click="ok") 关闭
</template>

<script>
export default {
  inject: ['reload'],
  components: {
    'summaryJgm': (resolve) => require(['@component_table/summary/sum-jgm.vue'], resolve)
  },
  data () {
    return {
      visible: false
    };
  },
  methods: {
    show(data) {
      this.visible = true;
      this.$refs.summaryJgm.show(data);
    },
    printPage() {
      window.print();
    },
    ok() {
      this.visible = false;
      this.reload();
    }
  }
};
</script>
<style lang='less' scoped>
@media print {
  .noprint {
    display:none;
  }
  .print {
    display:block;
  }
  @page {
    size: auto;
    margin: 0mm;
  }
}
</style>
