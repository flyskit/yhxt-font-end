<template lang='pug'>
  div.mrsz
    Button(type="primary" @click="ok" style="float: right") 历史记录
    Form(ref="data" :model="data" :label-width="80" inline)
      FormItem(label="日期" prop="cjrq")
        DatePicker.input-width-in-form(v-model="data.cjrq" type="date" placeholder="输入创建日期")
      FormItem(label="类型" prop="lx")
        Select.input-width-in-form(v-model="data.lx" @on-change="select" clearable filterable remote)
          Option(v-for="item in lx" :value="item.value" :key="item.value") {{ item.label }}
      FormItem(label="金额" prop="je")
        Input.input-width-in-form(v-model="data.je" placeholder="输入金额")
      FormItem(label="商家" prop="sj")
        Input.input-width-in-form(v-model="data.sj" placeholder="输入客户姓名")
      pre
      FormItem(label="备注" prop="bz")
        Input.input-width-in-form(v-model="data.bz" type="textarea" :rows="3" style="width: 68vw" placeholder="备注")
      pre
      FormItem
        Button.button-position-in-form(@click="reset('data')") 重置
        Button(type="primary" @click="ok") 添加

</template>

<script>
import { MRSZ_ZC_LX } from '@store/common/cwgl/mrsz/zc';
import { mapGetters } from 'vuex';
export default {
  components: {

  },
  data () {
    return {
      data: {
        cjrq: '',
        lx: [],
        je: '',
        sj: '',
        bz: ''
      },
      lx: MRSZ_ZC_LX
    };
  },
  computed: {
    ...mapGetters({

    })
  },
  mounted() {

  },
  methods: {
    select(value) {
      console.log(value);
    },
    reset(name) {
      this.$refs[name].resetFields();
    },
    ok() {
      console.log(this.data);
      // this.$store.dispatch(GET_DATA).then(() => {
      //   console.log(this.testData);
      // });
    }
  }
};
</script>
<style lang='less' scoped>
@import '../../../../style/mixin.less';
</style>
