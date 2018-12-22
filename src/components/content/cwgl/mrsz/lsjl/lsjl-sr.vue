<template lang='pug'>
  div.lsjl-sr
    Modal(v-model="visible" width="90vw" @on-ok="ok" @on-cancel="cancel")
      p(slot="header" style="color:#f60")
        Icon(type="ios-information-circle")
        span 历史记录
      div
        div.form-style
          Form(ref="dataModal" :model="dataModal" :label-width="60" inline)
            FormItem(label="编号" prop="bh")
              Input.input-width-in-form(v-model="dataModal.bh" placeholder="输入编号")
            FormItem(label="录入日期" prop="lrrq")
              DatePicker.input-width-in-form(v-model="dataModal.lrrq" format="yyyy-MM-dd" @on-change="dataModal.lrrq=$event" type="date" placeholder="输入录入日期")
            FormItem(label="收账日期" prop="szrq")
              DatePicker.input-width-in-form(v-model="dataModal.szrq" format="yyyy-MM-dd" @on-change="dataModal.szrq=$event" type="date" placeholder="输入收账日期")
            FormItem(label="客户姓名" prop="khxm")
              Input.input-width-in-form(v-model="dataModal.khxm" placeholder="输入客户姓名")
            FormItem(label="收入类型" prop="srlx")
              Select.input-width-in-form(v-model="dataModal.srlx" @on-change="select" clearable filterable remote)
                Option(v-for="item in srlx" :value="item.value" :key="item.value") {{ item.label }}
        div.table-style
          Table(:columns="srColumns" no-data-text="暂无数据显示" border)
      div(slot="footer")
        <Button type="error" @click="cancel">关闭</Button>
</template>

<script>
import { GET_DATA, GET_MRSZ_SR_LX, GET_MRSZ_SR_COLUMNS, GET_MRSZ_SR_DATA } from '@store/common/cwgl/mrsz/index';
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      dataModal: {
        bh: '',
        lrrq: '',
        szrq: '',
        khxm: '',
        srlx: []
      },
      visible: false
    };
  },
  components: {

  },
  computed: {
    ...mapGetters({
      srlx: GET_MRSZ_SR_LX,
      srColumns: GET_MRSZ_SR_COLUMNS,
      dataTable: GET_DATA
    })
  },
  mounted() {
    console.log('测试');
  },
  methods: {
    show() {
      this.visible = true;
    },
    select() {

    },
    ok() {
      this.$store.dispatch(GET_MRSZ_SR_DATA);
      this.$Message.info('点击确认');
    },
    cancel() {
      this.$Message.info('取消');
    }
  }
};
</script>
<style lang='less' scoped>

</style>
