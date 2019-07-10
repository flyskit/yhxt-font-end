<template lang='pug'>
  div.khxd-thj-xjbd-pkm
    Button.khxd-operate-button(@click="getBoardSwing") 平开门料型
    Button.khxd-operate-button(@click="createRework") 返工订单
    Table(:columns="orderColumns" :data="orderDetail" size="small" border)
      template(slot="ddbh" slot-scope="{ row, index }")
        Input(v-model="row.ddbh" readonly=true @on-change="change(row)")
      template(slot="ddlx" slot-scope="{ row, index }")
        Select(v-model="row.ddlx" transfer=true  @on-change="change(row)")
          Option(v-for="item in typeDdlx" :value="item.value" :key="item.value" :disabled="item.disabled") {{ item.label }}
      template(slot="ddly" slot-scope="{ row, index }")
        Select(v-model="row.ddly" transfer=true  @on-change="change(row)")
          Option(v-for="item in typeDdly" :value="item.value" :key="item.value") {{ item.label }}
      template(slot="scsl" slot-scope="{ row, index }")
        Select(v-model="row.scsl" transfer=true  @on-change="change(row)")
          Option(v-for="item in typeScsl" :value="item.value" :key="item.value") {{ item.label }}
      template(slot="gq" slot-scope="{ row, index }"  @on-change="change(row)")
        InputNumber(v-model="row.gq" :min="1"  @on-change="change(row)")
      template(slot="khxm" slot-scope="{ row, index }")
        AutoComplete(v-model="row.khxm"  @on-search="getCustomerList" @on-change="customerImport(row)" clearable)
          Option(v-for="item in customerInfo" :value="item.label" :key="item.value") {{ item.label }}
      template(slot="dz" slot-scope="{ row, index }")
        Input(v-model="row.dz"  @on-change="change(row)")
      template(slot="dh" slot-scope="{ row, index }")
        Input(v-model="row.dh"  @on-change="change(row)")
      template(slot="bz" slot-scope="{ row, index }")
        Input(v-model="row.bz"  @on-change="change(row)")
      template(slot="hjpf" slot-scope="{ row, index }")
        Input(v-model="row.hjpf" readonly=true  @on-change="change(row)")
      template(slot="hjsl" slot-scope="{ row, index }")
        Input(v-model="row.hjsl" readonly=true  @on-change="change(row)")
      template(slot="hjje" slot-scope="{ row, index }")
        Input(v-model="row.hjje"  @on-change="change(row)")
      template(slot="yjdb" slot-scope="{ row, index }")
        Input(v-model="row.yjdb" @on-change="change(row)")
          span(slot="append") 件
    Divider 尺寸信息
    editSwingSize(ref="editSwingSize" :boardInfo="boardInfo" @submitData="submitData" @computeTotal="computeTotal")
    reworkModal(ref="reworkModal")
    boardModal(ref="boardModal")
</template>

<script>
import { mapGetters } from 'vuex';
import { mixin } from '@component/mixins/mixin';
import { KHXD_THJ_DDXX } from '@store/common/khxd/thjm/xjbd/module';
import { ORDER_DDLX, ORDER_SCSL, ORDER_DDLY } from '@store/common/common/module';
import { ADD_DATA_SWING } from '@store/common/khxd/thjm/xjbd/index';
import { GET_ORDER_NUMBER, GET_CUSTOMER_BY_NAME, GET_BOARD_BY_TYPE, GETTER_BOARD_BY_TYPE, GETTER_ORDER_NUMBER, GETTER_CUSTOMER_BY_NAME } from '@store/common/common/index';
export default {
  inject: ['reload'],
  mixins: [mixin],
  components: {
    'boardModal': (resolve) => require(['../../common/board-detail'], resolve),
    'reworkModal': (resolve) => require(['./modal/rework-swing-main'], resolve),
    'editSwingSize': (resolve) => require(['@component_table/edit/edit-swing-size.vue'], resolve)
  },
  data () {
    return {
      orderDetail: [{
        ddbh: '',
        ddlx: 0,
        ddly: 0,
        scsl: 0,
        gq: 12,
        khxm: '',
        dz: '',
        dh: '',
        hjpf: '',
        hjsl: '',
        hjje: '',
        yjdb: '',
        bz: '',
        ddzt: ''
      }],
      orderColumns: KHXD_THJ_DDXX,
      typeDdlx: ORDER_DDLX,
      typeScsl: ORDER_SCSL,
      typeDdly: ORDER_DDLY,
      swingType: 3,
      customerInfo: [],
      boardInfo: []
    };
  },
  computed: {
    ...mapGetters({
      orderNumber: 'commonCommonIndex/' + GETTER_ORDER_NUMBER,
      boardList: 'commonCommonIndex/' + GETTER_BOARD_BY_TYPE,
      customerList: 'commonCommonIndex/' + GETTER_CUSTOMER_BY_NAME
    })
  },
  mounted () {
    this.getBh();
    this.getBc();
  },
  methods: {
    /** 获取编号 */
    getBh() {
      this.$store.dispatch('commonCommonIndex/' + GET_ORDER_NUMBER).then(res => {
        this.orderDetail[0].ddbh = this.orderNumber;
      });
    },
    /** 根据商品类型，获取板材列表 */
    getBc() {
      this.$store.dispatch('commonCommonIndex/' + GET_BOARD_BY_TYPE, this.swingType).then(() => {
        this.boardInfo = this.boardList.map(item => {
          return {
            value: item.id,
            label: item.mc,
            dj: item.dj
          };
        });
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
    customerImport(row) {
      this.customerInfo.forEach((e) => {
        if (e.label === row.khxm) {
          row.dz = e.dz;
          row.dh = e.dh;
        }
      });
      this.orderDetail[0] = row;
    },
    /** 更改保证内容不变 */
    change(row) {
      this.orderDetail[0] = row;
    },
    /** 回显统计数值 */
    computeTotal(totalData) {
      this.orderDetail[0].hjpf = totalData.hjpf.toFixed(3);
      this.orderDetail[0].hjsl = totalData.hjsl;
      this.orderDetail[0].hjje = totalData.hjje.toFixed(1);
      this.orderDetail[0].yjdb = Math.ceil(this.orderDetail[0].hjsl / 1);
    },
    /** 获取table表格数据-提交订单 */
    submitData(sizeDetail, orderStatus) {
      this.orderDetail[0].ddzt = orderStatus;
      sizeDetail.forEach((e) => {
        this.defineProperty(e, '_index', '_rowKey');
      });
      this.defineProperty(this.orderDetail[0], '_index', '_rowKey');
      this.addData(sizeDetail);
    },
    /** 提交数据 */
    addData(sizeDetail) {
      this.$store.dispatch('commonKhxdThjmXjbdIndex/' + ADD_DATA_SWING, {...this.orderDetail[0], swingSizes: sizeDetail}).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.$Notice.success({
            title: res.data.info
          });
          this.reload();
        }
      });
    },
    /** 创建返工订单-弹窗 */
    createRework() {
      this.$refs.reworkModal.show(this.swingType);
    },
    getBoardSwing() {
      this.$refs.boardModal.show(this.swingType);
    }
  }
};
</script>
<style lang='less' scoped>
.khxd-operate-button {
  margin: 0 5px 5px 0;
}
</style>
