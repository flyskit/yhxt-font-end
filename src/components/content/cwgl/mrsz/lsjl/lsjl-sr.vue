<template lang='pug'>
  div.lsjl-sr
    Modal(v-model="visible" width="90vw" height="60vh" @on-ok="ok" @on-cancel="cancel" scrollable=true)
      p(slot="header" style="color:#f60")
        Icon(type="ios-information-circle")
        span 历史记录
      div
        div.form-style
          Form(ref="dataModal" :model="dataModal" :label-width="60" inline)
            FormItem(label="编号" prop="bh")
              Input.input-form(v-model="dataModal.bh" @on-change="select" clearable  placeholder="输入编号")
            FormItem(label="录入日期" prop="lrrq")
              DatePicker.input-form(v-model="dataModal.lrrq" format="yyyy-MM-dd" @on-change="chooseDateLrrq" type="date" placeholder="输入录入日期")
            FormItem(label="收账日期" prop="szrq")
              DatePicker.input-form(v-model="dataModal.szrq" format="yyyy-MM-dd" @on-change="chooseDateSzrq" type="date" placeholder="输入收账日期")
            FormItem(label="客户姓名" prop="khxm")
              Input.input-form(v-model="dataModal.khxm" @on-change="select" clearable placeholder="输入客户姓名")
            FormItem(label="收入类型" prop="srlx")
              Select.input-form(v-model="dataModal.srlx" @on-change="select" clearable filterable remote)
                Option(v-for="item in srlx" :value="item.value" :key="item.value") {{ item.label }}
        div.table-style
          Table(:columns="srColumns" ref="selection" :data="dataTable" height="400" no-data-text="暂无数据显示" border)
          pre
          Page(:total="totalElement" @on-change="pageChange" show-total)
      div(slot="footer")
        <Button type="error" @click="cancel">关闭</Button>
</template>

<script>
import { GET_TABLE_DATA, GET_MRSZ_SR_COLUMNS, GET_MRSZ_SR_DATA, GET_TOTAL_PAGE, GET_TOTAL_ELEMENT } from '@store/common/cwgl/mrsz/index';
import { MRSZ_SR_LX } from '@store/common/cwgl/mrsz/sr';
import { mapGetters } from 'vuex';
export default {
  inject: ['reload'],
  data () {
    return {
      dataModal: {
        bh: '',
        lrrq: '',
        szrq: '',
        khxm: '',
        srlx: null
      },
      page: {
        pageSize: 10,
        page: 1
      },
      visible: false,
      srlx: MRSZ_SR_LX
    };
  },
  components: {

  },
  computed: {
    ...mapGetters({
      srColumns: GET_MRSZ_SR_COLUMNS,
      dataTable: GET_TABLE_DATA,
      totalElement: GET_TOTAL_ELEMENT,
      totalPage: GET_TOTAL_PAGE
    })
  },
  mounted() {

  },
  methods: {
    show() {
      this.visible = true;
    },
    // 获取后台数据
    select() {
      // 重置页码
      this.page.page = 1;
      // 搜索
      this.$store.dispatch(GET_MRSZ_SR_DATA, {...this.dataModal, page: this.page});
    },
    // 录入日期-修改时间格式
    chooseDateLrrq(value) {
      this.dataModal.lrrq = value;
      this.select();
    },
    // 收账日期-修改时间格式
    chooseDateSzrq(value) {
      this.dataModal.szrq = value;
      this.select();
    },
    // 分页
    pageChange(value) {
      this.page.page = value;
      this.$store.dispatch(GET_MRSZ_SR_DATA, {...this.dataModal, page: this.page});
    },
    reset(name) {
      this.$refs[name].resetFields();
      this.select();
    },
    ok() {
      this.reset('dataModal');
      this.reload();
    },
    cancel() {
      this.reset('dataModal');
      // 刷新表单
      this.reload();
      // 关闭弹框
      this.visible = false;
    }
  }
};
</script>
<style lang='less' scoped>

</style>
