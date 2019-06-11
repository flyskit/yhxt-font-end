<template lang='pug'>
  div.khxd-jgm-xjbd
    p
      span.span-color 下单类型：
      RadioGroup(v-model="data.xdxx.xdlx")
        Radio(v-for="index of typeXdlx" :label="index.value" :key="index.value") {{ index.label }}
      Divider(type="vertical")
      span.span-color 生产速率：
      RadioGroup(v-model="data.xdxx.scsl")
        Radio(v-for="index of typeScsl" :label="index.value" :key="index.value") {{ index.label }}
      Divider(type="vertical")
      span.span-color 订单来源：
      RadioGroup(v-model="data.xdxx.ddly")
        Radio(v-for="index of typeDdly" :label="index.value" :key="index.value") {{ index.label }}
    br
    Form(ref="data" :model="data" :label-width="60" inline)
      FormItem(label="编号" prop="bh")
        Input.input-form(v-model="data.xdxx.bh" disabled placeholder="输入编号")
      FormItem(label="客户" prop="khxm")
        Input.input-form(v-model="data.xdxx.khxm" placeholder="输入客户名称")
      FormItem(label="地址" prop="dz")
        Input.input-form(v-model="data.xdxx.dz" placeholder="输入客户地址")
      FormItem(label="电话" prop="dh")
        Input.input-form(v-model="data.xdxx.dh" placeholder="输入联系方式")
      FormItem(label="工期" prop="gq")
        Input.input-form(v-model="data.xdxx.gq" placeholder="输入工期")
      FormItem(label="备注" prop="bz")
        Input.input-form(v-model="data.xdxx.bz" placeholder="备注")
    Divider 尺寸信息
    tableJgm(ref="tableJgm" @getTableData="getTableData")
    printModal(ref="printModal")
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';
import { mixin } from '@component/mixins/mixin';
import tableJgm from '@component_table/summary/edit-jgm.vue';
import { KHXD_JGM_XDLX, KHXD_JGM_SCSL, KHXD_JGM_DDLY } from '@store/common/khxd/jgm/xjbd/module';
import { ADD_DATA, GET_BH, GETTER_BH } from '@store/common/khxd/jgm/xjbd/index';
export default {
  inject: ['reload'],
  mixins: [mixin],
  components: {
    tableJgm,
    'printModal': (resolve) => require(['./modal/print-data'], resolve)
  },
  data () {
    return {
      data: {
        xdxx: {
          bh: '',
          khxm: '',
          dz: '',
          dh: '',
          xdlx: '',
          ddly: '',
          scsl: '',
          gq: '',
          bz: '',
          hjlhjpf: 0.000,
          hjblpf: 0.000,
          hjps: 0,
          cjr: '',
          cjsj: '',
          zt: ''
        },
        ccxx: []
      },
      typeXdlx: KHXD_JGM_XDLX,
      typeScsl: KHXD_JGM_SCSL,
      typeDdly: KHXD_JGM_DDLY,
      isReload: true,
      isPrint: true
    };
  },
  computed: {
    ...mapGetters({
      bh: 'commonKhxdJgmXjbdIndex/' + GETTER_BH
    })
  },
  mounted () {
    this.getBh();
  },
  methods: {
    /** 获取编号 */
    getBh() {
      this.$store.dispatch('commonKhxdJgmXjbdIndex/' + GET_BH).then(res => {
        this.data.xdxx.bh = this.bh;
      });
    },
    /** 获取table表格数据-提交订单 */
    getTableData(tableData, status) {
      this.data.xdxx.zt = status;
      tableData.forEach((e) => {
        // 去除多余字段
        this.defineProperty(e, '_index', '_rowKey');
      });
      this.data.ccxx = _.cloneDeep(tableData);
      this.addData();
    },
    /** 提交数据 */
    addData() {
      this.$store.dispatch('commonKhxdJgmXjbdIndex/' + ADD_DATA, this.data).then(res => {
        if (res.data.status !== 200) {
          this.$Notice.error({
            title: '晶钢门新建表单',
            desc: '失败原因：' + res.data.info,
            duration: 0
          });
        } else {
          this.$Notice.success({
            title: res.data.info
          });
          this.showPrintPage(res.data.map.data);
        }
      });
    },
    /** 打印页面 */
    showPrintPage(data) {
      this.$refs.printModal.show(data, this.isReload, this.isPrint);
    }
  }
};
</script>
<style lang='less' scoped>

</style>
