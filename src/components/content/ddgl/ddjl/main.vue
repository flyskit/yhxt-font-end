<template lang='pug'>
  div.ddgl-ddjl
    queryCondDetail(ref="queryCondDetail" :isShowAll="isShowAll" @doSelect="doSelect")
</template>

<script>
export default {
  components: {
    'queryCondDetail': (resolve) => require(['../../common/query-cond-detail'], resolve)
  },
  data () {
    return {
      isShowAll: true
    };
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    /** 根据客户姓名查找订单列表 */
    doSelect(orderQueryCond) {
      console.log(orderQueryCond);
    }
  }
};
</script>
<style lang='less' scoped>

</style>
