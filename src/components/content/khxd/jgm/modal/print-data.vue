<template lang='pug'>
  div.khxd-jgm-print-data
    Modal(v-model="visible" width="90vw" height="90vw" @on-ok="ok" @on-cancel="ok")
      p(slot="header" style="color:#f60" class="noprint")
        Icon(type="ios-information-circle")
        span 预览
      div(class="print")
        Keep-alive
          printJgm(ref="printJgm" style="text-align:center")
      div(slot="footer" class="noprint")
        Button(type="primary" @click="printPage" :style="{ display: isPrint ? '' : 'none' }") 打印
        Button(type="error" @click="ok") 关闭
</template>

<script>
export default {
  inject: ['reload'],
  components: {
    'printJgm': (resolve) => require(['@component_table/print/print-jgm.vue'], resolve)
  },
  data () {
    return {
      visible: false,
      isReload: false,
      isPrint: true
    };
  },
  methods: {
    /** 显示 */
    show(data, czr, czsj) {
      this.visible = true;
      this.$refs.printJgm.show(data, czr, czsj);
    },
    /** 打印 */
    printPage() {
      window.print();
    },
    /** 关闭页面 */
    ok() {
      this.visible = false;
      if (this.isReload) {
        this.reload();
      }
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
    margin-top: -8%;
  }
  @page {
    size: auto;
    margin: 0mm;
  }
}
</style>
