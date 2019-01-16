<template lang='pug'>
  div.mrsz
    Button(type="error" @click="historyButton" style="float: left;margin: 0 10px 15px 0") 历史记录
    Button(type="error" @click="historyButton" style="float: left;margin: 0 10px 15px 0") 图表统计
    Button(type="error" @click="historyButton" style="float: left;margin: 0 10px 15px 0") 图表统计
    Divider
    Form(ref="data" :model="data" :label-width="80" inline)
      FormItem(label="编号" prop="bh")
        Input.input-width-in-form(v-model="data.bh" clearable  placeholder="输入编号")
      FormItem(label="收账日期" prop="szrq")
        DatePicker.input-width-in-form(v-model="data.szrq" format="yyyy-MM-dd" @on-change="chooseDateSzrq" type="date" placeholder="输入收账日期")
      FormItem(label="客户姓名" prop="khxm")
        Input.input-width-in-form(v-model="data.khxm" clearable placeholder="输入客户姓名")
      FormItem(label="收入类型" prop="srlx")
        Select.input-width-in-form(v-model="data.srlx" clearable filterable remote)
          Option(v-for="item in srlx" :value="item.value" :key="item.value") {{ item.label }}
      FormItem(label="收入金额" prop="srje")
        Input.input-width-in-form(v-model="data.srje" clearable placeholder="输入金额")
      pre
      FormItem(label="备注" prop="bz")
        Input.input-width-in-form(v-model="data.bz" type="textarea" :rows="3" style="width: 68vw" placeholder="备注")
      pre
      FormItem
        Button.button-position-in-form(@click="reset()") 重置
        Button(type="primary" @click="ok") 添加
    lsjl(ref="lsjl")
</template>

<script>
import { GET_ADD_INCOME, GET_BH_DATA, GET_BH } from '@store/common/cwgl/mrsz/index';
import { MRSZ_SR_LX } from '@store/common/cwgl/mrsz/sr';
import { mapGetters } from 'vuex';
import lsjl from './lsjl/lsjl-sr';
export default {
  inject: ['reload'],
  data () {
    return {
      data: {
        bh: '',
        szrq: '',
        khxm: '',
        srlx: '',
        srje: '',
        bz: ''
      },
      srlx: MRSZ_SR_LX
    };
  },
  components: {
    lsjl
  },
  computed: {
    ...mapGetters({
      bh: GET_BH
    })
  },
  mounted() {
    this.getBh();
  },
  methods: {
    getBh() {
      this.$store.dispatch(GET_BH_DATA).then(res => {
        // 回显赋值
        this.data.bh = this.bh;
      });
    },
    /** 选择录入日期，修改时间格式 */
    chooseDateLrrq(value) {
      this.data.lrrq = value;
    },
    /** 选择收账日期，修改时间格式 */
    chooseDateSzrq(value) {
      this.data.szrq = value;
    },
    /** 历史记录 */
    historyButton() {
      this.$refs.lsjl.show();
    },
    /** 重置 */
    reset() {
      this.reload();
    },
    /** 提交数据 */
    ok() {
      this.$store.dispatch(GET_ADD_INCOME, this.data).then(res => {
        // 刷新表单
        this.reload();
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
