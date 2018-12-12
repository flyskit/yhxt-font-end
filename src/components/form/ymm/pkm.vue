<template lang='pug'>
  div.pkm
    Form(ref="dataYmm" :model="dataYmm" :rules="ruleValidate" :label-width="80" inline)
      FormItem(label="分类" prop="fl")
        Select.input-width-in-form(v-model="dataYmm.fl" clearable)
          Option(v-for="item of classifyType" :value="item.value" :key="item.key") {{item.label}}
      FormItem(label="颜色" prop="ys")
        Input.input-width-in-form(v-model="dataYmm.ys" placeholder="输入颜色编号")
      FormItem(label="颜色类型" prop="yslx")
        Select.input-width-in-form(v-model="dataYmm.yslx" clearable)
          Option(v-for="item of processType" :value="item.value" :key="item.key" ) {{item.label}}
      FormItem(label="造型" prop="zx")
        Input.input-width-in-form(v-model="dataYmm.zx" placeholder="输入造型")
      FormItem(label="数量" prop="sl")
        Input.input-width-in-form(v-model="dataYmm.sl" placeholder="输入数量")
      FormItem(label="高(毫米)" prop="ccHigh")
        Input.input-width-in-form(v-model="dataYmm.ccHigh" placeholder="输入高")
      FormItem(label="宽(毫米)" prop="ccWidth")
        Input.input-width-in-form(v-model="dataYmm.ccWidth" placeholder="输入宽" )
      pre
      FormItem
        Button.button-position-in-form(@click="reset('dataYmm')") 重置
        Button(type="primary" @click="ok") 添加
</template>

<script>
import {GET_CLASSIFY_YMM_PKM, GET_COLOR_TYPE} from '@store/common/static-fields/index';
// import {GET_COLUMNS_YMM_PKM} from '@store/common/static-data/index';
import { mapGetters } from 'vuex';
// import _ from 'lodash';
export default {
  data () {
    return {
      data: {

      },
      ruleValidate: {

      },
      dataYmm: {
        fl: '',
        yslx: '',
        ys: '',
        zx: '',
        sl: '',
        ccHigh: '',
        ccWidth: ''
      }
      // model: _.cloneDeep(this.dataYmm)
    };
  },
  components: {

  },
  computed: {
    ...mapGetters({
      classifyType: GET_CLASSIFY_YMM_PKM,
      processType: GET_COLOR_TYPE
      // dataYmm: _.cloneDeep(GET_COLUMNS_YMM_PKM)
    })
  },
  mounted() {

  },
  methods: {
    getData(data) {
      console.log('data；' + data);
    },
    reset(name) {
      this.$refs[name].resetFields();
    },
    ok() {
      console.log(this.dataYmm);
      this.$emit('getFormData', this.dataYmm);
      // // 重置表单
      // this.reset('dataYmm');
      // 打印 https://segmentfault.com/q/1010000011527757/a-1020000011527810
      // window.print();
      // 重新加载页面，以刷新数据
      // window.location.reload()
    }
  }
};
</script>
<style lang='less' scoped>

</style>
