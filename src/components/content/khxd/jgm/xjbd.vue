<template lang='pug'>
  div.khxd-jgm-xjbd
    Form(ref="data" :model="data" :label-width="80" inline)
      FormItem(label="编号" prop="bh")
        Input.input-width-in-form(v-model="data.bh" clearable  placeholder="输入编号")
      FormItem(label="客户" prop="khxm")
        Input.input-width-in-form(v-model="data.khxm" placeholder="输入客户名称")
      FormItem(label="地址" prop="dz")
        Input.input-width-in-form(v-model="data.dz" placeholder="输入客户地址")
      FormItem(label="电话" prop="dh")
        Input.input-width-in-form(v-model="data.dh" placeholder="输入联系方式")
      pre
      FormItem(label="下单类型" prop="xdlx")
        Select.input-width-in-form(v-model="data.xdlx" @on-change="changeXdlx" clearable)
          Option(v-for="item in xdlx" :value="item.value" :key="item.value") {{ item.label }}
      FormItem(label="工期" prop="gq")
        Input.input-width-in-form(v-model="data.gq" placeholder="输入工期")
      FormItem(label="备注" prop="bz")
        Input.input-width-in-form(v-model="data.bz" placeholder="备注")
      Divider 尺寸信息
    tableJgm(refs="tableJgm" @getTableData="getTableData")
</template>

<script>
import { mapGetters } from 'vuex';
import tableJgm from '@component_table/summary/editJgm.vue';
import { KHXD_JGM_COLUMNS, KHXD_JGM_CCLX, KHXD_JGM_XDLX } from '@store/common/khxd/jgm/xjbd/module';
export default {
  components: {
    tableJgm
  },
  data () {
    return {
      data: {
        bh: '',
        khxm: '',
        dz: '',
        dh: '',
        xdlx: '',
        gh: '',
        bz: '',
        ccxx: []
      },
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
      this.data.xdlx = value;
    },
    /** 将表格数据放入data */
    pushData(tableData) {
      this.data.ccxx.push(tableData);
    },
    /** 获取table表格数据-提交订单 */
    getTableData(tableData) {
      console.log(tableData);
    },
    /** 重置表单 */
    reset(name) {
      this.$refs[name].resetField();
    },
    ok() {
      console.log(this.ccxx);
      this.pushData(this.ccxx);
    }
  }
};
</script>
<style lang='less' scoped>

</style>
