<template lang='pug'>
  div.khxd-xsm-xjbd
    Button.khxd-operate-button(@click="getBoard") 板材信息
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
        Input(v-model="row.dh"  @on-change="change(row)" autofocus=true)
      template(slot="bc" slot-scope="{ row, index }")
        Select(v-model="row.bc" transfer=true  @on-change="boardImport(row)")
          Option(v-for="item in boardInfo" :value="item.label" :key="item.value") {{ item.label }}
      template(slot="dj" slot-scope="{ row, index }")
        Input(v-model="row.dj"  @on-change="change(row)")
          span(slot="append") /m²
      template(slot="hjpf" slot-scope="{ row, index }")
        Input(v-model="row.hjpf" readonly=true  @on-change="change(row)")
      template(slot="hjsl" slot-scope="{ row, index }")
        Input(v-model="row.hjsl" readonly=true  @on-change="change(row)")
      template(slot="je" slot-scope="{ row, index }")
        Input(v-model="row.je"  @on-change="change(row)")
      template(slot="yjdb" slot-scope="{ row, index }")
        Input(v-model="row.yjdb" @on-change="change(row)")
          span(slot="append") 件
      template(slot="bz" slot-scope="{ row, index }")
        Input(v-model="row.bz"  @on-change="change(row)")
    Divider 尺寸信息
    editBlisterSize(ref="editBlisterSize" @submitData="submitData" @computeTotal="computeTotal")
    reworkModal(ref="reworkModal")
    boardModal(ref="boardModal")
</template>

<script>
import { mapGetters } from 'vuex';
import { mixin } from '@component/mixins/mixin';
import editBlisterSize from '@component_table/edit/edit-blister-size.vue';
import { KHXD_XSM_DDXX } from '@store/common/khxd/xsm/xjbd/module';
import { ORDER_DDLX, ORDER_SCSL, ORDER_DDLY } from '@store/common/common/module';
import { ADD_DATA } from '@store/common/khxd/xsm/xjbd/index';
import { GET_ORDER_NUMBER, GET_BOARD_BY_TYPE, GET_CUSTOMER_BY_NAME, GETTER_ORDER_NUMBER, GETTER_BOARD_BY_TYPE, GETTER_CUSTOMER_BY_NAME } from '@store/common/common/index';
export default {
  inject: ['reload'],
  mixins: [mixin],
  components: {
    editBlisterSize,
    'reworkModal': (resolve) => require(['./modal/rework-main'], resolve),
    'boardModal': (resolve) => require(['../../common/board-detail'], resolve)
  },
  data () {
    return {
      orderDetail: [{
        ddbh: '',
        ddlx: 0,
        ddly: 0,
        scsl: 0,
        gq: 5,
        khxm: '',
        dz: '',
        dh: '',
        bc: '',
        dj: '',
        hjpf: '',
        hjsl: '',
        je: '',
        yjdb: '',
        bz: '',
        ddzt: ''
      }],
      typeDdlx: ORDER_DDLX,
      typeScsl: ORDER_SCSL,
      typeDdly: ORDER_DDLY,
      orderColumns: KHXD_XSM_DDXX,
      blisterType: 5,
      boardInfo: [],
      customerInfo: []
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
      this.$store.dispatch('commonCommonIndex/' + GET_BOARD_BY_TYPE, this.blisterType).then(() => {
        this.boardInfo = this.boardList.map(item => {
          return {
            value: item.id,
            label: item.mc,
            dj: item.dj
          };
        });
      });
    },
    /** 导入板材单价 */
    boardImport(row) {
      this.boardInfo.forEach((e) => {
        if (e.label === row.bc) {
          row.dj = e.dj;
          row.je = (row.hjpf * parseFloat(row.dj)).toFixed(1);
        }
      });
      this.orderDetail[0] = row;
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
      this.orderDetail[0].yjdb = Math.ceil(this.orderDetail[0].hjsl / 10);
      this.orderDetail[0].je = (this.orderDetail[0].hjpf * parseFloat(this.orderDetail[0].dj)).toFixed(1);
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
      this.$store.dispatch('commonKhxdXsmXjbdIndex/' + ADD_DATA, {...this.orderDetail[0], blisterSizes: sizeDetail}).then(res => {
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
    /** 板材详细信息 */
    getBoard() {
      this.$refs.boardModal.show(this.blisterType);
    },
    /** 创建返工订单-弹窗 */
    createRework() {
      this.$refs.reworkModal.show(this.blisterType);
    }
  }
};
</script>
<style lang='less' scoped>
.khxd-operate-button {
  margin: 0 5px 5px 0;
}
</style>
