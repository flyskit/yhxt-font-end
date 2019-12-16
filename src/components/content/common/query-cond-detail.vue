<template lang='pug'>
  div.common-query-cond-detail
    Form(ref="orderQueryCond" :model="orderQueryCond" :label-width="80" inline)
      FormItem(label="客户姓名" prop="khxm")
        Input.input-small(v-model="orderQueryCond.khxm" placeholder="输入客户姓名" @on-change="doSelect")
      FormItem(label="商品类型" prop="splx" :style="{display: isShowAll ? '' : 'none'}")
        Select.input-small(v-model="orderQueryCond.splx" transfer=true  @on-change="doSelect" placeholder="选择商品类型")
          Option(v-for="item in typeSplx" :value="item.value" :key="item.value") {{ item.label }}
      FormItem(label="订单编号" prop="ddbh")
        Input.input-small(v-model="orderQueryCond.ddbh" @on-change="doSelect" placeholder="输入订单编号")
      FormItem(label="订单类型" prop="ddlx")
        Select.input-small(v-model="orderQueryCond.ddlx" transfer=true  @on-change="doSelect" placeholder="选择订单类型")
          Option(v-for="item in typeDdlx" :value="item.value" :key="item.value") {{ item.label }}
      FormItem(label="订单来源" prop="ddly")
        Select.input-small(v-model="orderQueryCond.ddly" transfer=true  @on-change="doSelect" placeholder="选择订单来源")
          Option(v-for="item in typeDdly" :value="item.value" :key="item.value") {{ item.label }}
      FormItem(label="订单状态" prop="ddzt")
        Select.input-small(v-model="orderQueryCond.ddzt" transfer=true  @on-change="doSelect" placeholder="选择订单状态")
          Option(v-for="item in typeDdzt" :value="item.value" :key="item.value") {{ item.label }}
      FormItem(label="有效状态" prop="yxzt")
        Select.input-small(v-model="orderQueryCond.yxzt" transfer=true  @on-change="doSelect" placeholder="选择有效状态：")
          Option(v-for="item in typeYxzt" :value="item.value" :key="item.value") {{ item.label }}
      FormItem(label="开始日期")
        DatePicker.input-small(type="date" @on-change="changeStartTime" transfer=true placeholder="选择查询开始日期")
      FormItem(label="截止日期")
        DatePicker.input-small(type="date" @on-change="changeEndTime" transfer=true placeholder="选择查询截止日期")
</template>

<script>
import { mixin } from '@component/mixins/mixin';
import { ORDER_DDLX, ORDER_SPLX, ORDER_DDLY, ORDER_DDZT, ORDER_YXZT } from '@store/common/common/module.js';
export default {
  mixins: [mixin],
  props: ['isShowAll'],
  data () {
    return {
      typeDdlx: ORDER_DDLX,
      typeSplx: ORDER_SPLX,
      typeDdly: ORDER_DDLY,
      typeDdzt: ORDER_DDZT,
      typeYxzt: ORDER_YXZT
    };
  },
  methods: {
    changeStartTime(value) {
      this.orderQueryCond.startTime = value;
      this.doSelect();
    },
    changeEndTime(value) {
      this.orderQueryCond.endTime = value;
      this.doSelect();
    },
    doSelect() {
      this.$emit('doSelect', this.orderQueryCond);
    }
  }
};
</script>
<style lang='less' scoped>

</style>
