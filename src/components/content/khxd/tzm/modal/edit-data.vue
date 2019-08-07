<template lang='pug'>
  div.khxd-ykl-edit-data
    Modal(v-model="visible" width="90vw" @on-ok="ok" @on-cancel="ok")
      p(slot="header" style="color:#f60" class="noprint")
        Icon(type="ios-information-circle")
        span 修改
      div(class="edit")
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
          template(slot="mblx" slot-scope="{ row, index }")
            Select(v-model="row.mblx" transfer=true  @on-change="getBc(row)")
              Option(v-for="item in typeMblx" :value="item.value" :key="item.value") {{ item.label }}
          template(slot="pkmms" slot-scope="{ row, index }")
            Input(v-model="row.pkmms" @on-change="change(row)")
          template(slot="pkmts" slot-scope="{ row, index }")
            Input(v-model="row.pkmts" @on-change="change(row)")
          template(slot="tmms" slot-scope="{ row, index }")
            Input(v-model="row.tmms" @on-change="change(row)")
          template(slot="tmts" slot-scope="{ row, index }")
            Input(v-model="row.tmts" @on-change="change(row)")
          template(slot="hjmt" slot-scope="{ row, index }")
            Input(v-model="row.hjmt" @on-change="change(row)")
          template(slot="hjxt" slot-scope="{ row, index }")
            Input(v-model="row.hjxt" @on-change="change(row)")
          template(slot="je" slot-scope="{ row, index }")
            Input(v-model="row.je"  @on-change="change(row)")
          template(slot="yjdb" slot-scope="{ row, index }")
            Input(v-model="row.yjdb"  @on-change="change(row)")
              span(slot="append") 件
          template(slot="bz" slot-scope="{ row, index }")
            Input(v-model="row.bz"  @on-change="change(row)")
        div(style="text-align:right;margin-top:20px;")
          Button(type="success" @click="updateData" ghost) 修改订单
        Divider 尺寸信息
        editSuit(ref="editSuit" :boardInfo="boardInfo" @submitData="submitData" @computeTotal="computeTotal")
      div(slot="footer" class="noprint")
        Button(@click="ok") 关闭
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';
import { mixin } from '@component/mixins/mixin';
import editSuit from '@component_table/edit/edit-suit-size.vue';
import { KHXD_TZM_DDXX, KHXD_TZM_MBLX } from '@store/common/khxd/tzm/xjbd/module';
import { ORDER_DDLX, ORDER_SCSL, ORDER_DDLY } from '@store/common/common/module';
import { GET_CUSTOMER_BY_NAME, GET_BOARD_BY_TYPE, GETTER_CUSTOMER_BY_NAME, GETTER_BOARD_BY_TYPE } from '@store/common/common/index';
import { UPDATE_DATA } from '@store/common/khxd/tzm/jryxd/index';
export default {
  inject: ['reload'],
  mixins: [mixin],
  components: {
    editSuit
  },
  data () {
    return {
      orderDetail: [{
        ddbh: '',
        ddlx: 0,
        ddly: 0,
        scsl: 0,
        gq: 25,
        khxm: '',
        dz: '',
        dh: '',
        mblx: '',
        pkmms: 0,
        pkmts: 0,
        tmms: 0,
        tmts: 0,
        hjmt: 0,
        hjxt: 0,
        je: 0.00,
        yjdb: '',
        bz: '',
        ddzt: ''
      }],
      typeDdlx: ORDER_DDLX,
      typeScsl: ORDER_SCSL,
      typeDdly: ORDER_DDLY,
      typeMblx: KHXD_TZM_MBLX,
      orderColumns: KHXD_TZM_DDXX,
      customerInfo: [],
      boardInfo: [],
      sizeDetail: {},
      visible: false
    };
  },
  computed: {
    ...mapGetters({
      customerList: 'commonCommonIndex/' + GETTER_CUSTOMER_BY_NAME,
      boardList: 'commonCommonIndex/' + GETTER_BOARD_BY_TYPE
    })
  },
  methods: {
    /** 显示 */
    show(data, isTemporary) {
      this.orderDetail[0].ddbh = data.orderDetail.ddbh;
      this.orderDetail[0].ddlx = data.orderDetail.ddlx;
      this.orderDetail[0].ddly = data.orderDetail.ddly;
      this.orderDetail[0].scsl = data.orderDetail.scsl;
      this.orderDetail[0].khxm = data.orderDetail.khxm;
      this.orderDetail[0].dz = data.orderDetail.dz;
      this.orderDetail[0].dh = data.orderDetail.dh;
      this.orderDetail[0].gq = data.orderDetail.gq;
      this.orderDetail[0].bz = data.orderDetail.bz;
      this.orderDetail[0].ddzt = data.orderDetail.ddzt;

      this.orderDetail[0].mblx = data.suitDetail.mblx;
      this.orderDetail[0].pkmms = data.suitDetail.pkmms;
      this.orderDetail[0].pkmts = data.suitDetail.pkmts;
      this.orderDetail[0].tmms = data.suitDetail.tmms;
      this.orderDetail[0].tmts = data.suitDetail.tmts;
      this.orderDetail[0].hjmt = data.suitDetail.hjmt;
      this.orderDetail[0].hjxt = data.suitDetail.hjxt;
      this.orderDetail[0].je = data.suitDetail.je;
      this.orderDetail[0].yjdb = data.suitDetail.yjdb;
      this.$refs.editSuit.showEdit(isTemporary, data.swingSizeList, data.hangingSizeList, data.suitPocketDetailList, data.suitLineDetailsList);
      this.getBc(this.orderDetail[0]);
      this.visible = true;
    },
    /** 根据商品类型，获取板材列表 */
    getBc(row) {
      if (row.mblx === 10) {
        // 非常规门，不存入数据表
        this.boardInfo = [];
        this.orderDetail[0] = row;
      } else {
        this.$store.dispatch('commonCommonIndex/' + GET_BOARD_BY_TYPE, row.mblx).then(() => {
          this.boardInfo = this.boardList.map(item => {
            return {
              value: item.id,
              label: item.mc,
              bcdj: item.dj
            };
          });
        });
        this.orderDetail[0] = row;
      }
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
      this.orderDetail[0].pkmms = totalData.pkmms;
      this.orderDetail[0].pkmts = totalData.pkmts;
      this.orderDetail[0].tmms = totalData.tmms;
      this.orderDetail[0].tmts = totalData.tmts;
      this.orderDetail[0].hjmt = totalData.hjmt;
      this.orderDetail[0].hjxt = totalData.hjxt;
      this.orderDetail[0].je = totalData.je;
      this.orderDetail[0].yjdb = this.orderDetail[0].pkmms + this.orderDetail[0].tmms + Math.ceil(this.orderDetail[0].hjmt / 3);
    },
    /** 获取table表格数据-提交订单 */
    submitData(sizeDetail) {
      sizeDetail.swingSizes.forEach((e) => {
        this.defineProperty(e, '_index', '_rowKey');
      });
      sizeDetail.hangingSizes.forEach((e) => {
        this.defineProperty(e, '_index', '_rowKey');
      });
      sizeDetail.pocketDetails.forEach((e) => {
        this.defineProperty(e, '_index', '_rowKey');
      });
      sizeDetail.lineDetails.forEach((e) => {
        this.defineProperty(e, '_index', '_rowKey');
      });
      this.defineProperty(this.orderDetail[0], '_index', '_rowKey');
      this.sizeDetail = _.cloneDeep(sizeDetail);
    },
    /** 提交数据 */
    updateData(sizeDetail) {
      this.$store.dispatch('commonKhxdTzmJryxdIndex/' + UPDATE_DATA, { ...this.orderDetail[0], ...this.sizeDetail }).then(res => {
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
