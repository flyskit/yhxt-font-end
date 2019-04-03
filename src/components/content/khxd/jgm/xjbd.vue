<template lang='pug'>
  div.khxd-jgm-xjbd
    Form(ref="data" :model="data" :label-width="80" inline)
      p
        span.breadcrumb-separator 下单类型：
        RadioGroup(v-model="data.xdxx.xdlx" @on-change="changeRadio")
          Radio(label="0") 新订单
          Radio(label="1") 补单
          Radio(label="2") 返工重做
        Divider(type="vertical")
        span.breadcrumb-separator 生产速率：
        RadioGroup(v-model="data.xdxx.scsl")
          Radio(label="0") 普通
          Radio(label="1") 加急
        Divider(type="vertical")
        span.breadcrumb-separator 订单来源：
        RadioGroup(v-model="data.xdxx.ddly")
          Radio(label="0") 线下
          Radio(label="1") 1688
      br
      FormItem(label="编号" prop="bh")
        Input.input-width-in-form(v-model="data.xdxx.bh" placeholder="输入编号")
      FormItem(label="客户" prop="khxm")
        Input.input-width-in-form(v-model="data.xdxx.khxm" placeholder="输入客户名称")
      FormItem(label="地址" prop="dz")
        Input.input-width-in-form(v-model="data.xdxx.dz" placeholder="输入客户地址")
      FormItem(label="电话" prop="dh")
        Input.input-width-in-form(v-model="data.xdxx.dh" placeholder="输入联系方式")
      FormItem(label="工期" prop="gq")
        Input.input-width-in-form(v-model="data.xdxx.gq" placeholder="输入工期")
      FormItem(label="备注" prop="bz")
        Input.input-width-in-form(v-model="data.xdxx.bz" placeholder="备注")
      FormItem(label="返工原因" prop="bz" :style="{ display: isReturn }")
        Input.input-width-in-form(v-model="data.xdxx.bz" placeholder="备注")
    Divider 尺寸信息
    tableJgm(ref="tableJgm" @getTableData="getTableData")
    printModal(ref="printModal")
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';
import { mixin } from '@component/mixins/mixin';
import tableJgm from '@component_table/summary/edit-jgm.vue';
import { KHXD_JGM_XDLX, KHXD_JGM_SCSL } from '@store/common/khxd/jgm/xjbd/module';
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
      xdlx: KHXD_JGM_XDLX,
      scsl: KHXD_JGM_SCSL,
      isReload: true,
      isPrint: true,
      isReturn: 'none'
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
    /** 动态显示input */
    changeRadio(value) {
      if (value !== '2') {
        this.isReturn = 'none';
      } else {
        this.isReturn = '';
      }
    },
    /** 获取编号 */
    getBh() {
      this.$store.dispatch('commonKhxdJgmXjbdIndex/' + GET_BH).then(res => {
        this.data.xdxx.bh = this.bh;
      });
    },
    /** 更改下单类型 */
    changeXdlx(value) {
      this.data.xdxx.xdlx = value;
    },
    /** 更改生产速率 */
    changeScsl(value) {
      this.data.xdxx.scsl = value;
    },
    /** 获取table表格数据-提交订单 */
    getTableData(tableData, status) {
      this.data.xdxx.zt = status;
      tableData.forEach((e) => {
        this.defineProperty(e, '_index', '_rowKey');
      });
      this.data.ccxx = _.cloneDeep(tableData);
      this.addData(status);
    },
    /** 提交数据 */
    addData(status) {
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
          if (!status === 0) {
            this.showPrintPage(res.data.map.data);
          }
          this.reload();
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
.breadcrumb-separator {
  color: #ff5500;
  padding: 0 30px;
  font-size: 0.8em;
}
</style>
