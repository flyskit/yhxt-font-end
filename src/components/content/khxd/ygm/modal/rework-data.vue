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
              Option(v-for="item in typeDdlx" :value="item.value" :key="item.value") {{ item.label }}
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
          template(slot="hjpf" slot-scope="{ row, index }")
            Input(v-model="row.hjpf" readonly=true  @on-change="change(row)")
          template(slot="hjsl" slot-scope="{ row, index }")
            Input(v-model="row.hjsl" readonly=true  @on-change="change(row)")
          template(slot="je" slot-scope="{ row, index }")
            Input(v-model="row.je"  @on-change="change(row)")
          template(slot="xbpf" slot-scope="{ row, index }")
            Input(v-model="row.xbpf" readonly=true @on-change="change(row)")
          template(slot="yjdb" slot-scope="{ row, index }")
            Input(v-model="row.yjdb" @on-change="change(row)")
              span(slot="append") 件
          template(slot="bz" slot-scope="{ row, index }")
            Input(v-model="row.bz"  @on-change="change(row)")
        Divider 尺寸信息
        editWardrobeSlideSize(ref="editWardrobeSlideSize" :boardInfo.sync="boardInfo" :boardShapeInfo.sync="boardShapeInfo" @submitData="submitData" @computeTotal="computeTotal")
      div(slot="footer")
        Button(@click="ok") 关闭
</template>

<script>
import { mapGetters } from 'vuex';
import { mixin } from '@component/mixins/mixin';
import { KHXD_YGM_DDXX } from '@store/common/khxd/ygm/xjbd/module';
import { ORDER_DDLX, ORDER_SCSL, ORDER_DDLY } from '@store/common/common/module';
import { ADD_DATA } from '@store/common/khxd/ygm/xjbd/index';
import { GET_ORDER_NUMBER, GET_CUSTOMER_BY_NAME, GET_BOARD_BY_TYPE, GET_HANDLE_BY_TYPE, GETTER_HANDLE_BY_TYPE, GETTER_BOARD_BY_TYPE, GETTER_ORDER_NUMBER, GETTER_CUSTOMER_BY_NAME } from '@store/common/common/index';
export default {
  inject: ['reload'],
  mixins: [mixin],
  components: {
    'editWardrobeSlideSize': (resolve) => require(['@component_table/edit/edit-wardrobe-slide-size.vue'], resolve)
  },
  data () {
    return {
      orderDetail: [{
        ddbh: '',
        ddlx: 2,
        ddly: 0,
        scsl: 0,
        gq: 12,
        khxm: '',
        dz: '',
        dh: '',
        hjpf: '',
        xbpf: '',
        hjsl: '',
        je: '',
        yjdb: '',
        bz: '',
        ddzt: ''
      }],
      orderColumns: KHXD_YGM_DDXX,
      typeDdlx: ORDER_DDLX,
      typeScsl: ORDER_SCSL,
      typeDdly: ORDER_DDLY,
      wardrobeSlideType: 6,
      customerInfo: [],
      boardInfo: [],
      boardShapeInfo: [],
      visible: false
    };
  },
  computed: {
    ...mapGetters({
      orderNumber: 'commonCommonIndex/' + GETTER_ORDER_NUMBER,
      boardList: 'commonCommonIndex/' + GETTER_BOARD_BY_TYPE,
      boardShapeList: 'commonCommonIndex/' + GETTER_HANDLE_BY_TYPE,
      customerList: 'commonCommonIndex/' + GETTER_CUSTOMER_BY_NAME
    })
  },
  methods: {
    /** 显示 */
    show(wardrobeSlideDetail, orderDetail, orderSizes) {
      this.orderDetail[0].ddly = orderDetail.ddly;
      this.orderDetail[0].scsl = orderDetail.scsl;
      this.orderDetail[0].khxm = orderDetail.khxm;
      this.orderDetail[0].dz = orderDetail.dz;
      this.orderDetail[0].dh = orderDetail.dh;
      this.orderDetail[0].gq = orderDetail.gq;
      this.$refs.editWardrobeSlideSize.showSize(orderSizes);
      this.getBh();
      this.getBc();
      this.getBk();
      this.$refs.editWardrobeSlideSize.computeDataAgain();
      this.visible = true;
    },
    /** 获取编号 */
    getBh() {
      this.$store.dispatch('commonCommonIndex/' + GET_ORDER_NUMBER).then(res => {
        this.orderDetail[0].ddbh = this.orderNumber;
      });
    },
    /** 根据商品类型，获取板材列表 */
    getBc() {
      this.$store.dispatch('commonCommonIndex/' + GET_BOARD_BY_TYPE, this.wardrobeSlideType).then(() => {
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
          row.dj = e.bcdj;
          this.computeMoney(row);
        }
      });
      this.orderDetail[0] = row;
    },
    /** 获取边框列表 */
    getBk() {
      this.$store.dispatch('commonCommonIndex/' + GET_HANDLE_BY_TYPE, this.wardrobeSlideType).then(() => {
        this.boardShapeInfo = this.boardShapeList.map(item => {
          return {
            value: item.id,
            label: item.mc,
            kd: item.kd
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
      this.orderDetail[0].xbpf = totalData.xbpf.toFixed(3);
      this.orderDetail[0].hjsl = totalData.hjsl;
      this.orderDetail[0].je = totalData.hjje.toFixed(1);
      // 额外配件轨道
      this.orderDetail[0].yjdb = parseFloat(Math.ceil(this.orderDetail[0].hjsl / 2)) + 1;
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
      this.$store.dispatch('commonKhxdYgmXjbdIndex/' + ADD_DATA, {...this.orderDetail[0], wardrobeSlideSizes: sizeDetail}).then(res => {
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
