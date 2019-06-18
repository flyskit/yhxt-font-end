<template lang='pug'>
  div.khxd-jgm-print-data
    Modal(v-model="visible" width="80vw" fullscreen @on-ok="ok" @on-cancel="ok")
      p(slot="header" style="color:#f60" class="noprint")
        Icon(type="ios-information-circle")
        span 预览
      div(class="print")
        Keep-alive
          summaryJgm(ref="summaryJgm" style="text-align:center")
      div(slot="footer" class="noprint")
        Button(type="primary" @click="printPage" :style="{ display: isPrint ? '' : 'none' }") 打印
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
      visible: false,
      isReload: false,
      isPrint: false
    };
  },
  methods: {
    /** 显示 */
    show(data, isReload, isPrint) {
      this.visible = true;
      this.isReload = isReload;
      this.isPrint = isPrint;
      this.$refs.summaryJgm.show(data);
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
  }
  @page {
    size: auto;
    margin: 0mm;
  }
}
</style>
