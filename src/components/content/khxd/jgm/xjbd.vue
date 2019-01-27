<template lang='pug'>
  div.khxd-jgm-xjbd
    Form(ref="data" :model="data" :label-width="80" inline)
      FormItem(label="编号" prop="bh")
        Input.input-width-in-form(v-model="data.xdxx.bh" clearable  placeholder="输入编号")
      FormItem(label="客户" prop="khxm")
        Input.input-width-in-form(v-model="data.xdxx.khxm" placeholder="输入客户名称")
      FormItem(label="地址" prop="dz")
        Input.input-width-in-form(v-model="data.xdxx.dz" placeholder="输入客户地址")
      FormItem(label="电话" prop="dh")
        Input.input-width-in-form(v-model="data.xdxx.dh" placeholder="输入联系方式")
      pre
      FormItem(label="下单类型" prop="xdlx")
        Select.input-width-in-form(v-model="data.xdxx.xdlx" @on-change="changeXdlx" clearable)
          Option(v-for="item in xdlx" :value="item.value" :key="item.value") {{ item.label }}
      FormItem(label="工期" prop="gq")
        Input.input-width-in-form(v-model="data.xdxx.gq" placeholder="输入工期")
      FormItem(label="备注" prop="bz")
        Input.input-width-in-form(v-model="data.xdxx.bz" placeholder="备注")
      Divider 尺寸信息
    tableJgm(refs="tableJgm" @getTableData="getTableData")
</template>

<script>
import { mapGetters } from 'vuex';
import tableJgm from '@component_table/summary/editJgm.vue';
import _ from 'lodash';
import { KHXD_JGM_COLUMNS, KHXD_JGM_CCLX, KHXD_JGM_XDLX } from '@store/common/khxd/jgm/xjbd/module';
import { ADD_DATA } from '@store/common/khxd/jgm/xjbd/index';
export default {
  inject: ['reload'],
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
          gq: '',
          bz: '',
          hjlhjpf: 0.000,
          hjblpf: 0.000,
          hjps: 0,
          zt: ''
        },
        ccxx: []
      },
      hjpf: '',
      hjps: '',
      xdlx: KHXD_JGM_XDLX,
      cclx: KHXD_JGM_CCLX,
      tableColumns: KHXD_JGM_COLUMNS
    };
  },
  computed: {
    ...mapGetters({
      // tableColumns: GETTER_TABLE_COLUMNS
    })
  },
  mounted() {

  },
  methods: {
    /** 更改下单类型 */
    changeXdlx(value) {
      this.data.xdxx.xdlx = value;
    },
    /** 获取table表格数据-提交订单 */
    getTableData(tableData, status) {
      this.data.xdxx.zt = status;
      tableData.forEach((e) => {
        this.data.xdxx.hjlhjpf = ((this.data.xdxx.hjlhjpf - 0) + (e.lhjpf - 0)).toFixed(3);
        this.data.xdxx.hjblpf = ((this.data.xdxx.hjblpf - 0) + (e.blpf - 0)).toFixed(3);
        this.data.xdxx.hjps = (this.data.xdxx.hjps - 0) + (e.ps - 0);
      });
      this.data.ccxx = _.cloneDeep(tableData);
      console.log(this.data);
      // this.addData();
    },
    /** 提交数据 */
    addData() {
      this.$store.dispatch(ADD_DATA, this.data).then(res => {
        this.reload();
      });
    }
  }
};
</script>
<style lang='less' scoped>

</style>
