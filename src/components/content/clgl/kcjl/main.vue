<template lang='pug'>
  div.kcjl
    div.span-style
      span 搜索条件:
    div.select-style
      Select(v-model="data" clearable :remote-method="search" style="width:200px" placeholder="请选择门类型")
        Option(v-for="item of dataList" :value="item.value" :key="item.key") {{item.label}}
    Button(type="primary" @click="viewModal") 表单弹框
    div.input-vague-style
      Input(placeholder="搜索门名字" clearable search style="width:auto;" @on-change="searchData")
        Icon(type="ios-search" slot="suffix")
    modalView(ref="modalView")
</template>

<script>
import modalView from './modal';
export default {
  components: {
    modalView
  },
  data () {
    return {
      dataList: [
        {
          value: 'cgm',
          label: '橱柜门'
        },
        {
          value: 'jgm',
          label: '晶钢门'
        },
        {
          value: 'thjm',
          label: '钛合金门'
        },
        {
          value: 'smm',
          label: '实木门'
        },
        {
          value: 'ygm',
          label: '衣柜门'
        },
        {
          value: 'ysm',
          label: '浴室门'
        }
      ],
      data: ''
    };
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    search(value) {
      // 默认返回value
      alert(value);
    },
    searchData(data) {
      // 返回搜索值
      console.log(data);
    },
    viewModal() {
      this.$refs.modalView.cil();
    }
  }
};
</script>
<style lang='less' scoped>
@import '../../../../style/mixin.less';
</style>
