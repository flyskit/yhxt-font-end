<template lang='pug'>
  div.khxd-xsm-print-data
    Modal(v-model="visible"
      width="90vw"
      height="90vw"
      @on-ok="ok"
      @on-cancel="ok"
      :closable="false"
      footer-hide=true)
      div(class="print")
        Keep-alive
          printXsmDetail(ref="printXsmDetail" style="text-align:center")
      div(style="text-align:center" class="noprint")
        Button(type="primary" @click="printPage") 打印
        Button(@click="ok") 关闭
</template>

<script>
export default {
  inject: ['reload'],
  components: {
    'printXsmDetail': (resolve) => require(['@component_table/print/print-xsm.vue'], resolve)
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
      this.$refs.printXsmDetail.show(data, czr, czsj);
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
