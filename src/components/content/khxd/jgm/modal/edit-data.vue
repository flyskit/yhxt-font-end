<template lang='pug'>
  div.khxd-jgm-edit-data
    Modal(v-model="visible" fullscreen @on-ok="ok" @on-cancel="ok")
      p(slot="header" style="color:#f60" class="noprint")
        Icon(type="ios-information-circle")
        span 修改
      div(class="edit")
        p
          span.breadcrumb-separator 下单类型：
          RadioGroup(v-model="data.xdxx.xdlx")
            Radio(label="0" :disabled="visible") 新订单
            Radio(label="1" :disabled="visible") 补单
            Radio(label="2" :disabled="visible") 返工重做
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
        Form(ref="data" :model="data" :label-width="80" inline)
          FormItem(label="编号" prop="bh")
            Input.input-width-in-form(v-model="data.xdxx.bh" placeholder="输入编号" disabled)
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
        Divider 尺寸信息
        tableJgm(ref="tableJgm" @getTableData="getTableData")
      div(slot="footer" class="noprint")
        Button(type="error" @click="ok") 关闭
</template>

<script>
import _ from 'lodash';
import { mixin } from '@component/mixins/mixin';
import tableJgm from '@component_table/summary/edit-jgm.vue';
import { KHXD_JGM_XDLX, KHXD_JGM_SCSL } from '@store/common/khxd/jgm/xjbd/module';
import { UPDATE_DATA } from '@store/common/khxd/jgm/jryxd/index';
export default {
  inject: ['reload'],
  mixins: [mixin],
  components: {
    tableJgm
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
      visible: false
    };
  },
  methods: {
    show(data) {
      this.data.xdxx = _.cloneDeep(data.xdxx);
      /** Number转String，不然无法回显 */
      this.data.xdxx.xdlx = String(this.data.xdxx.xdlx);
      this.data.xdxx.scsl = String(this.data.xdxx.scsl);
      this.data.xdxx.ddly = String(this.data.xdxx.ddly);
      this.$refs.tableJgm.showEdit(data);
      this.visible = true;
    },
    ok() {
      this.visible = false;
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
    getTableData(tableData) {
      tableData.forEach((e) => {
        this.defineProperty(e, '_index', '_rowKey');
      });
      this.data.ccxx = _.cloneDeep(tableData);
      this.addData();
    },
    /** 提交数据 */
    addData() {
      console.log(this.data);
      this.$store.dispatch('commonKhxdJgmJryxdIndex/' + UPDATE_DATA, this.data).then(res => {
        if (res.data.status !== 200) {
          this.$Notice.error({
            title: '修改',
            desc: '失败原因：' + res.data.info,
            duration: 0
          });
        } else {
          this.$Notice.success({
            title: res.data.info
          });
          this.reload();
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
.breadcrumb-separator {
  color: #ff5500;
  padding: 0 5px;
}
.span-error-color {
  color: #ff0000;
}
</style>
