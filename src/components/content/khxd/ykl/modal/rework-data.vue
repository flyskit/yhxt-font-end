<template lang='pug'>
  div.khxd-jgm-rework-data
    Modal(v-model="visible" width="90vw" @on-ok="ok" @on-cancel="ok")
      p(slot="header" style="color:#f60")
        Icon(type="ios-information-circle")
        span 返工订单-详细信息
      div
        Table(:columns="orderColumns" :data="orderDetail" size="small" border)
          template(slot="ddbh" slot-scope="{ row, index }")
            Input(v-model="row.ddbh" readonly=true @on-change="change(row)")
          template(slot="ddlx" slot-scope="{ row, index }")
            Select(v-model="row.ddlx" transfer=true  @on-change="change(row)" disabled)
              Option(v-for="item in typeXdlx" :value="item.value" :key="item.value") {{ item.label }}
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
            Input(v-model="row.yjdb" readonly=true  @on-change="change(row)")
              span(slot="append") 件
          template(slot="bz" slot-scope="{ row, index }")
            Input(v-model="row.bz"  @on-change="change(row)")
        Divider 尺寸信息
        tableJgm(ref="tableJgm" @submitData="submitData" @computeTotal="computeTotal")
      div(slot="footer")
        Button(@click="ok") 关闭
</template>

<script>
import { mapGetters } from 'vuex';
import { mixin } from '@component/mixins/mixin';
import tableJgm from '@component_table/summary/edit-jgm.vue';
import { KHXD_YKL_DDXX } from '@store/common/khxd/ykl/xjbd/module';
import { ORDER_DDLX, ORDER_SCSL, ORDER_DDLY } from '@store/common/common/module';
import { ADD_DATA } from '@store/common/khxd/ykl/xjbd/index';
import { GET_ORDER_NUMBER, GET_HANDLE_BY_TYPE, GET_CUSTOMER_BY_NAME, GET_BOARD_BY_TYPE, GETTER_ORDER_NUMBER, GETTER_HANDLE_BY_TYPE, GETTER_CUSTOMER_BY_NAME, GETTER_BOARD_BY_TYPE } from '@store/common/common/index';
export default {
  inject: ['reload'],
  mixins: [mixin],
  components: {
    tableJgm
  },
  data () {
    return {
      orderDetail: [{
        ddbh: '',
        ddlx: 2,
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
      orderColumns: KHXD_YKL_DDXX,
      typeXdlx: ORDER_DDLX,
      typeScsl: ORDER_SCSL,
      typeDdly: ORDER_DDLY,
      handleSize: {
        handleHeight: '',
        handleWidth: ''
      },
      handleType: 2,
      handleLength: 0.00,
      handleInfo: [],
      customerInfo: [],
      boardInfo: [],
      visible: false
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
  methods: {
    /** 显示 */
    show(acrylicDetail, orderDetail, cupboardDoorSizes) {
      this.orderDetail[0].ddly = orderDetail.ddly;
      this.orderDetail[0].scsl = orderDetail.scsl;
      this.orderDetail[0].khxm = orderDetail.khxm;
      this.orderDetail[0].dz = orderDetail.dz;
      this.orderDetail[0].dh = orderDetail.dh;
      this.orderDetail[0].gq = orderDetail.gq;

      this.orderDetail[0].lsmc = acrylicDetail.lsmc;
      this.orderDetail[0].lsdj = acrylicDetail.lsdj;
      this.orderDetail[0].bcmc = acrylicDetail.bcmc;
      this.orderDetail[0].bcdj = acrylicDetail.bcdj;
      this.orderDetail[0].ys = acrylicDetail.ys;
      this.$refs.tableJgm.showInnerSize(cupboardDoorSizes);
      this.getBh();
      this.getLs();
      this.getBc();
      this.findHandle();
      this.visible = true;
    },
    /** 获取编号 */
    getBh() {
      this.$store.dispatch('commonCommonIndex/' + GET_ORDER_NUMBER).then(res => {
        this.orderDetail[0].ddbh = this.orderNumber;
      });
    },
    /** 获取拉手列表 */
    getLs() {
      this.$store.dispatch('commonCommonIndex/' + GET_HANDLE_BY_TYPE, this.handleType);
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
          this.$refs.tableJgm.getHandleSize(this.handleSize);
        }
      });
      this.computeMoney(row);
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
    /** 根据拉手名称查询拉手尺寸 */
    findHandle() {
      this.handleList.forEach((e) => {
        if (e.mc === this.orderDetail[0].lsmc) {
          this.handleSize.handleHeight = e.gd;
          this.handleSize.handleWidth = e.kd;
          // 重新渲染尺寸表格
          this.$refs.tableJgm.getHandleSize(this.handleSize);
        }
      });
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
    /** 关闭 */
    ok() {
      this.visible = false;
    }
  }
};
</script>
<style lang='less' scoped>

</style>
