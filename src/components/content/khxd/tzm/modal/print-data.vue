<template lang='pug'>
  div.khxd-tzm-print-data
    Modal(v-model="visible"
      width="90vw"
      @on-ok="ok"
      @on-cancel="ok"
      :closable="false"
      footer-hide=true)
      div(class="print" id="print" style="width:100%;height:100%;page-break-before:always;")
        printTzmDetail(ref="printTzmDetail" style="text-align:center")
      div(style="text-align:center" class="noprint")
        Button(type="primary" v-print="'#print'") 打印
        Button(@click="ok") 关闭
</template>

<script>
export default {
  inject: ['reload'],
  components: {
    'printTzmDetail': (resolve) => require(['@component_table/print/print-tzm.vue'], resolve)
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
    show(data, czr, czsj, isMain) {
      this.visible = true;
      this.$refs.printTzmDetail.show(data, czr, czsj, isMain);
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
<style lang='less'>
@media print {
  .noprint {
    display:none;
  }
  .print {
    display:block;
  }
  @page {
    size: A4 auto;
    margin: 50mm;
    @bottom-center {
      content: "第" counter(page) "页";
    }
  }
}
</style>
