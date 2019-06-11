<template lang='pug'>
  div.stm
    Form(ref="data" :model="data" :rules="ruleValidate" :label-width="80" inline)
      FormItem(label="下单类型" prop="xdlx")
        Input.input-form(v-model="data.xdlx" readonly)
      FormItem(label="加工方式" prop="jgfs")
        Select.input-form(v-model="data.jgfs" clearable)
          Option(v-for="item of processType" :value="item.value" :key="item.key") {{item.label}}
      FormItem(label="花型" prop="hx")
        Input.input-form(v-model="data.hx" placeholder="输入花型")
      FormItem(label="颜色" prop="ys")
        Input.input-form(v-model="data.ys" placeholder="输入颜色编号")
      FormItem(label="颜色类型" prop="yslx")
        Select.input-form(v-model="data.yslx" clearable)
          Option(v-for="item of colorType" :value="item.value" :key="item.key") {{item.label}}
      FormItem(label="悬挂方式" prop="xgfs")
        Select.input-form(v-model="data.xgfs" clearable)
          Option(v-for="item of hangType" :value="item.value" :key="item.key") {{item.label}}
      FormItem(label="造型" prop="zx")
        Input.input-form(v-model="data.zx" placeholder="输入造型")
      FormItem(label="洞口尺寸" prop="dkcc")
        Input.input-form(v-model="data.dkcc" placeholder="输入尺寸")
      FormItem(label="门扇尺寸" prop="mscc")
        Input.input-form(v-model="data.mscc" placeholder="输入尺寸")
      FormItem(label="数量" prop="sl")
        Input.input-form(v-model="data.sl" placeholder="输入数量")
      FormItem(label="套板" prop="tb")
        Select.input-form(v-model="data.tb" clearable)
          Option(v-for="item in 10" :key="item" :value="item") {{item}}
      FormItem(label="线条类型" prop="xtlx")
        Select.input-form(v-model="data.xtlx" clearable)
          Option(v-for="item of lineType" :value="item.value" :key="item.key") {{item.label}}
      FormItem(label="线条宽度" prop="xtkd")
        Select.input-form(v-model="data.xtkd" clearable)
          Option(v-for="item of lineWidth" :value="item.value" :key="item.key") {{item.label}}
      FormItem(label="线条数量" prop="xtsl")
        Input.input-form(v-model="data.xtsl" placeholder="请输入线条数量")
      FormItem(label="面板" prop="mb")
        Input.input-form(v-model="data.mb" placeholder="输入面板")
      FormItem
        Button.button-position-in-form(@click="reset('data')") 重置
        Button(type="primary" @click="ok") 添加
</template>

<script>
import { GET_COLOR_TYPE, GET_PROCESS_TYPE, GET_LINE_TYPE } from '@store/common/static-fields/index';
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      data: {
        xdlx: '双推门'
      },
      ruleValidate: {

      },
      lineWidth: [
        {
          value: '60',
          label: '60'
        },
        {
          value: '70',
          label: '70'
        }
      ],
      hangType: [
        {
          value: 'wg',
          label: '外挂'
        },
        {
          value: 'ng',
          label: '内挂'
        }
      ]
    };
  },
  components: {

  },
  computed: {
    ...mapGetters({
      colorType: GET_COLOR_TYPE,
      processType: GET_PROCESS_TYPE,
      lineType: GET_LINE_TYPE
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
      // 重置表单
      this.reset('data');
    }
  }
};
</script>
<style lang='less' scoped>

</style>
