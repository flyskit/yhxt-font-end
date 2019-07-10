<template lang='pug'>
  div.khxd-ykl-xjbd
    Button.khxd-operate-button(@click="getHandle") 拉手信息
    Button.khxd-operate-button(@click="getBoard") 板材信息
    Button.khxd-operate-button(@click="innerCompute") 内框计算
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
      template(slot="ys" slot-scope="{ row, index }")
        Input(v-model="row.ys"  @on-change="change(row)")
      template(slot="bcmc" slot-scope="{ row, index }")
        Select(v-model="row.bcmc" transfer=true  @on-change="boardImport(row)")
          Option(v-for="item in boardInfo" :value="item.label" :key="item.value") {{ item.label }}
      template(slot="bcdj" slot-scope="{ row, index }")
        Input(v-model="row.bcdj"  @on-change="computeMoney(row)")
          span(slot="append") /m²
      template(slot="lsmc" slot-scope="{ row, index }")
        AutoComplete(v-model="row.lsmc" @on-search="getHandleList" @on-change="handleImport(row)")
          Option(v-for="item in handleInfo" :value="item.label" :key="item.value") {{ item.label }}
      template(slot="lsdj" slot-scope="{ row, index }")
        Input(v-model="row.lsdj"  @on-change="computeMoney(row)")
          span(slot="append") /m
      template(slot="hjpf" slot-scope="{ row, index }")
        Input(v-model="row.hjpf" readonly=true  @on-change="change(row)")
      template(slot="bcpf" slot-scope="{ row, index }")
        Input(v-model="row.bcpf" readonly=true  @on-change="change(row)")
      template(slot="hjsl" slot-scope="{ row, index }")
        Input(v-model="row.hjsl" readonly=true  @on-change="change(row)")
      template(slot="lsms" slot-scope="{ row, index }")
        Input(v-model="handleLength" readonly=true  @on-change="change(row)")
      template(slot="je" slot-scope="{ row, index }")
        Input(v-model="row.je"  @on-change="change(row)")
      template(slot="yjdb" slot-scope="{ row, index }")
        Input(v-model="row.yjdb"  @on-change="change(row)")
          span(slot="append") 件
      template(slot="bz" slot-scope="{ row, index }")
        Input(v-model="row.bz"  @on-change="change(row)")
    Divider 尺寸信息
    editCupboardSize(ref="editCupboardSize" @submitData="submitData" @computeTotal="computeTotal")
    reworkModal(ref="reworkModal")
    innerComputeModal(ref="innerComputeModal" @submitInnerData="submitInnerData")
    boardModal(ref="boardModal")
    handleModal(ref="handleModal")
</template>

<script>
import { mapGetters } from 'vuex';
import { mixin } from '@component/mixins/mixin';
import editCupboardSize from '@component_table/edit/edit-cupboard-size.vue';
import { KHXD_YKL_DDXX } from '@store/common/khxd/ykl/xjbd/module';
import { ADD_DATA } from '@store/common/khxd/ykl/xjbd/index';
import { ORDER_DDLX, ORDER_SCSL, ORDER_DDLY } from '@store/common/common/module';
import { GET_ORDER_NUMBER, GET_HANDLE_BY_TYPE, GET_CUSTOMER_BY_NAME, GET_BOARD_BY_TYPE, GETTER_ORDER_NUMBER, GETTER_HANDLE_BY_TYPE, GETTER_CUSTOMER_BY_NAME, GETTER_BOARD_BY_TYPE } from '@store/common/common/index';
export default {
  inject: ['reload'],
  mixins: [mixin],
  components: {
    editCupboardSize,
    'boardModal': (resolve) => require(['../../common/board-detail'], resolve),
    'reworkModal': (resolve) => require(['./modal/rework-main'], resolve),
    'innerComputeModal': (resolve) => require(['../../common/inner-size-compute'], resolve),
    'handleModal': (resolve) => require(['../../common/handle-detail'], resolve)
  },
  data () {
    return {
      orderDetail: [{
        ddbh: '',
        ddlx: 0,
        ddly: 0,
        scsl: 0,
        gq: 7,
        khxm: '',
        dz: '',
        dh: '',
        bcmc: '',
        bcdj: '',
        lsmc: '',
        lsdj: '',
        hjpf: '',
        bcpf: '',
        hjsl: '',
        je: '',
        yjdb: '',
        bz: '',
        ddzt: ''
      }],
      typeDdlx: ORDER_DDLX,
      typeScsl: ORDER_SCSL,
      typeDdly: ORDER_DDLY,
      orderColumns: KHXD_YKL_DDXX,
      handleSize: {
        handleHeight: '',
        handleWidth: ''
      },
      handleType: 2,
      handleLength: 0.00,
      handleInfo: [],
      customerInfo: [],
      boardInfo: []
    };
  },
  computed: {
    ...mapGetters({
      orderNumber: 'commonCommonIndex/' + GETTER_ORDER_NUMBER,
      handleList: 'commonCommonIndex/' + GETTER_HANDLE_BY_TYPE,
      customerList: 'commonCommonIndex/' + GETTER_CUSTOMER_BY_NAME,
      boardList: 'commonCommonIndex/' + GETTER_BOARD_BY_TYPE
    })
  },
  mounted () {
    /** 获取编号 */
    this.getBh();
    /** 获取板材信息 */
    this.getBc();
    /** 获取拉手信息 */
    this.getLs();
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
      this.$store.dispatch('commonCommonIndex/' + GET_BOARD_BY_TYPE, this.handleType).then(() => {
        this.boardInfo = this.boardList.map(item => {
          return {
            value: item.id,
            label: item.mc,
            bcdj: item.dj
          };
        });
      });
    },
    /** 获取拉手列表 */
    getLs() {
      this.$store.dispatch('commonCommonIndex/' + GET_HANDLE_BY_TYPE, this.handleType);
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
    /** 获取拉手列表信息 */
    getHandleList(value) {
      const list = this.handleList.map(item => {
        return {
          value: item.id,
          label: item.mc,
          lsdj: item.dj,
          gd: item.gd,
          kd: item.kd
        };
      });
      this.handleInfo = list.filter(item => item.label.indexOf(value) > -1);
    },
    /** 导入拉手信息 */
    handleImport(row) {
      this.handleInfo.forEach((e) => {
        if (e.label === row.lsmc) {
          row.lsdj = e.lsdj;
          this.handleSize.handleHeight = e.gd;
          this.handleSize.handleWidth = e.kd;
          // 重新渲染尺寸表格
          this.$refs.editCupboardSize.getHandleSize(this.handleSize);
        }
      });
      this.computeMoney(row);
      this.orderDetail[0] = row;
    },
    /** 金额计算 */
    computeMoney(row) {
      if (row.lsmc !== '') {
        row.je = (row.hjpf * parseFloat(row.bcdj) + this.handleLength * parseFloat(row.lsdj)).toFixed(1);
      } else {
        row.lsdj = '';
        row.je = (row.hjpf * parseFloat(row.bcdj)).toFixed(1);
      }
      this.orderDetail[0] = row;
    },
    /** 导入板材单价 */
    boardImport(row) {
      this.boardInfo.forEach((e) => {
        if (e.label === row.bcmc) {
          row.bcdj = e.bcdj;
          this.computeMoney(row);
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
      this.orderDetail[0].bcpf = totalData.blpf.toFixed(3);
      this.orderDetail[0].hjsl = totalData.hjsl;
      this.handleLength = totalData.kd.toFixed(3);
      this.orderDetail[0].yjdb = Math.ceil(this.orderDetail[0].hjsl / 10);
      if (this.orderDetail[0].lsdj === '') {
        this.orderDetail[0].je = (this.orderDetail[0].hjpf * parseFloat(this.orderDetail[0].bcdj)).toFixed(1);
      } else {
        this.orderDetail[0].je = (this.orderDetail[0].hjpf * parseFloat(this.orderDetail[0].bcdj) + this.handleLength * parseFloat(this.orderDetail[0].lsdj)).toFixed(1);
      }
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
      this.$store.dispatch('commonKhxdYklXjbdIndex/' + ADD_DATA, {...this.orderDetail[0], cupboardDoorSizes: sizeDetail}).then(res => {
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
    /** 拉手详细信息 */
    getHandle() {
      this.$refs.handleModal.show(this.handleType);
    },
    /** 板材详细信息 */
    getBoard() {
      this.$refs.boardModal.show(this.handleType);
    },
    /** 内框计算 */
    innerCompute() {
      this.$refs.innerComputeModal.show();
    },
    /** 内框计算-提交数据 */
    submitInnerData(data) {
      this.$refs.editCupboardSize.showInnerSize(data);
    },
    /** 创建返工订单 */
    createRework() {
      this.$refs.reworkModal.show(this.handleType);
    }
  }
};
</script>
<style lang='less' scoped>
.khxd-operate-button {
  margin: 0 5px 5px 0;
}
</style>
