<template lang='pug'>
  div.mrsz
    Button(type="primary" @click="historyButton" style="float: right") 历史记录
    Form(ref="data" :model="data" :label-width="80" inline)
      FormItem(label="编号" prop="bh")
        Input.input-width-in-form(v-model="data.bh" placeholder="输入编号")
      FormItem(label="录入日期" prop="lrrq")
        DatePicker.input-width-in-form(v-model="data.lrrq" format="yyyy-MM-dd" @on-change="data.lrrq=$event" type="date" placeholder="输入录入日期")
      FormItem(label="收账日期" prop="szrq")
        DatePicker.input-width-in-form(v-model="data.szrq" format="yyyy-MM-dd" @on-change="data.szrq=$event" type="date" placeholder="输入收账日期")
      FormItem(label="客户姓名" prop="khxm")
        Input.input-width-in-form(v-model="data.khxm" placeholder="输入客户姓名")
      pre
      FormItem(label="收入类型" prop="srlx")
        Select.input-width-in-form(v-model="data.srlx" @on-change="select" clearable filterable remote)
          Option(v-for="item in srlx" :value="item.value" :key="item.value") {{ item.label }}
      FormItem(label="收入金额" prop="srje")
        Input.input-width-in-form(v-model="data.srje" placeholder="输入金额")
      pre
      FormItem(label="备注" prop="bz")
        Input.input-width-in-form(v-model="data.bz" type="textarea" :rows="3" style="width: 68vw" placeholder="备注")
      pre
      FormItem
        Button.button-position-in-form(@click="reset('data')") 重置
        Button(type="primary" @click="ok") 添加
    lsjl(ref="lsjl")
</template>

<script>
import { GET_MRSZ_SR_LX, GET_ADD_INCOME, GET_BH, GET_DATA } from '@store/common/cwgl/mrsz/index';
import { mapGetters } from 'vuex';
import lsjl from './lsjl/lsjl-sr';
export default {
  data () {
    return {
      data: {
        bh: '',
        lrrq: '',
        szrq: '',
        khxm: '',
        srlx: '',
        srje: '',
        bz: ''
      }
    };
  },
  components: {
    lsjl
  },
  computed: {
    ...mapGetters({
      srlx: GET_MRSZ_SR_LX,
      bh: GET_DATA
    })
  },
  mounted() {
    this.getBh();
  },
  methods: {
    getBh() {
      this.$store.dispatch(GET_BH).then(res => {
        // 回显赋值
        this.data.bh = this.bh;
      });
    },
    select(value) {
      console.log(value);
    },
    historyButton() {
      this.$refs.lsjl.show();
    },
    reset(name) {
      this.$refs[name].resetFields();
    },
    ok() {
      this.$store.dispatch(GET_ADD_INCOME, this.data).then(res => {
        // 重置表单
        this.reset('data');
        // 获取新的编号
        this.getBh();
      });
    }
  }
};
</script>
<style lang='less' scoped>
@import '../../../../style/mixin.less';
</style>
