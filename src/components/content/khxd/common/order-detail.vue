<template lang='pug'>
  div.khxd-common-order-detail
    Form(ref="orderDetail" :model="orderDetail" :label-width="80" inline)
      FormItem(label="订单编号" prop="ddbh")
        Input.input-small(v-model="orderDetail.ddbh" readonly=true @on-change="returnOrderDetail")
      FormItem(label="订单类型" prop="ddlx")
        Select.input-small(v-model="orderDetail.ddlx" transfer=true  @on-change="returnOrderDetail")
          Option(v-for="item in typeDdlx" :value="item.value" :key="item.value") {{ item.label }}
      FormItem(label="订单来源" prop="ddly")
        Select.input-small(v-model="orderDetail.ddly" transfer=true @on-change="returnOrderDetail")
          Option(v-for="item in typeDdly" :value="item.value" :key="item.value") {{ item.label }}
      FormItem(label="生产速率" prop="scsl")
        Select.input-small(v-model="orderDetail.scsl" transfer=true @on-change="returnOrderDetail")
          Option(v-for="item in typeScsl" :value="item.value" :key="item.value") {{ item.label }}
      FormItem(label="工期" prop="gq")
        InputNumber.input-small(v-model="orderDetail.gq" :min="1" @on-change="returnOrderDetail")
      FormItem(label="客户姓名" prop="khxm")
        AutoComplete.input-small(v-model="orderDetail.khxm"  @on-search="getCustomerList"  @on-change="customerImport" clearable)
          Option(v-for="item in customerInfo" :value="item.label" :key="item.value") {{ item.label }}
      FormItem(label="地址" prop="dz")
        Input.input-small(v-model="orderDetail.dz" @on-change="returnOrderDetail")
      FormItem(label="电话" prop="dh")
        Input.input-small(v-model="orderDetail.dh" @on-change="returnOrderDetail")
      FormItem(label="总金额" prop="zje")
        Input.input-small(v-model="orderDetail.zje" @on-change="returnOrderDetail")
      FormItem(label="备注" prop="bz")
        Input.input-small(v-model="orderDetail.bz" style="width: 140px;" @on-change="returnOrderDetail")
</template>

<script>
import { mapGetters } from 'vuex';
import { mixin } from '@component/mixins/mixin';
import { ORDER_DDLX, ORDER_SCSL, ORDER_DDLY } from '@store/common/common/module';
import { GET_ORDER_NUMBER, GET_CUSTOMER_BY_NAME, GETTER_ORDER_NUMBER, GETTER_CUSTOMER_BY_NAME } from '@store/common/common/index';
export default {
  inject: ['reload'],
  mixins: [mixin],
  props: ['totalMoney'],
  watch: {
    totalMoney(totalMoney) {
      this.orderDetail.zje = totalMoney;
      this.returnOrderDetail();
    }
  },
  data () {
    return {
      orderDetail: {
        ddbh: 'JGM-09818',
        ddlx: 0,
        ddly: 0,
        scsl: 0,
        gq: 5,
        khxm: '',
        dz: '',
        dh: '',
        zje: 0.0,
        bz: ''
      },
      typeDdlx: ORDER_DDLX,
      typeScsl: ORDER_SCSL,
      typeDdly: ORDER_DDLY,
      customerInfo: []
    };
  },
  computed: {
    ...mapGetters({
      orderNumber: 'commonCommonIndex/' + GETTER_ORDER_NUMBER,
      customerList: 'commonCommonIndex/' + GETTER_CUSTOMER_BY_NAME
    })
  },
  mounted () {
    this.getBh();
  },
  methods: {
    /** 获取编号 */
    getBh() {
      this.$store.dispatch('commonCommonIndex/' + GET_ORDER_NUMBER).then(res => {
        this.orderDetail.ddbh = this.orderNumber;
      });
    },
    /** 获取客户列表信息 */
    getCustomerList(value) {
      this.$store.dispatch('commonCommonIndex/' + GET_CUSTOMER_BY_NAME, value).then(res => {
        const list = this.customerList.map(item => {
          return {
            value: item.id,
            label: item.khxm,
            dz: item.dz,
            dh: item.dh
          };
        });
        this.customerInfo = list.filter(item => item.label.indexOf(value) > -1);
      });
    },
    /** 导入客户信息 */
    customerImport() {
      this.customerInfo.forEach((e) => {
        if (e.label === this.orderDetail.khxm) {
          this.orderDetail.dz = e.dz;
          this.orderDetail.dh = e.dh;
        }
      });
      this.returnOrderDetail();
    },
    returnOrderDetail() {
      this.$emit('getOrderDetail', this.orderDetail);
    }
  }
};
</script>
<style lang='less' scoped>

</style>
