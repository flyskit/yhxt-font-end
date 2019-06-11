<template lang='pug'>
  div.form-jgm
    Form(ref="data" :model="data" :rules="ruleValidate" :label-width="80" inline)
      FormItem(label="下单类型" prop="xdlx")
        Input.input-form(v-model="data.xdlx" readonly)
      FormItem(label="分类" prop="fl")
        Select.input-form(v-model="data.fl" clearable)
          Option(v-for="item of classifyType" :value="item.value" :key="item.key") {{item.label}}
      FormItem(label="颜色" prop="ys")
        Input.input-form(v-model="data.ys" placeholder="输入颜色编号")
      FormItem(label="造型" prop="zx")
        Input.input-form(v-model="data.zx" placeholder="输入造型")
      FormItem(label="尺寸" prop="cc")
        Input.input-form(v-model="data.cc" placeholder="输入尺寸")
      FormItem(label="数量" prop="sl")
        Input.input-form(v-model="data.sl" placeholder="输入数量")
      FormItem
        Button.button-position-in-form(@click="reset('data')") 重置
        Button(type="primary" @click="ok") 添加
</template>

<script>
import {GET_CLASSIFY_KQM_PKM} from '@store/common/static-fields/index';
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      data: {
        xdlx: '高密度中纤烤漆门/平开门'
      },
      ruleValidate: {

      }
    };
  },
  components: {

  },
  computed: {
    ...mapGetters({
      classifyType: GET_CLASSIFY_KQM_PKM
    })
  },
  mounted() {

  },
  methods: {
    reset(name) {
      this.$refs[name].resetFields();
    },
    ok() {
      console.log(this.data);
      this.$emit('getFormData', this.data);
      this.reset('data');
    }
  }
};
</script>
<style lang='less' scoped>

</style>
