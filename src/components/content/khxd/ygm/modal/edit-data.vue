<template lang='pug'>
  div.khxd-jgm-edit-data
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
      div(slot="footer" class="noprint")
        Button(@click="ok") 关闭
</template>

<script>
import { mapGetters } from 'vuex';
import { mixin } from '@component/mixins/mixin';
import { KHXD_YGM_DDXX } from '@store/common/khxd/ygm/xjbd/module';
import { ORDER_DDLX, ORDER_SCSL, ORDER_DDLY } from '@store/common/common/module';
import { UPDATE_DATA } from '@store/common/khxd/ygm/jryxd/index';
import { GET_CUSTOMER_BY_NAME, GET_BOARD_BY_TYPE, GET_HANDLE_BY_TYPE, GETTER_HANDLE_BY_TYPE, GETTER_BOARD_BY_TYPE, GETTER_CUSTOMER_BY_NAME } from '@store/common/common/index';
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
        ddlx: 0,
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
      boardInfo: [],
      customerInfo: [],
      boardShapeInfo: [],
      visible: false
    };
  },
  computed: {
    ...mapGetters({
      boardList: 'commonCommonIndex/' + GETTER_BOARD_BY_TYPE,
      boardShapeList: 'commonCommonIndex/' + GETTER_HANDLE_BY_TYPE,
      customerList: 'commonCommonIndex/' + GETTER_CUSTOMER_BY_NAME
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

      this.orderDetail[0].hjpf = data.wardrobeSlideDetail.hjpf;
      this.orderDetail[0].xbpf = data.wardrobeSlideDetail.xbpf;
      this.orderDetail[0].hjsl = data.wardrobeSlideDetail.hjsl;
      this.orderDetail[0].je = data.wardrobeSlideDetail.je;
      this.orderDetail[0].yjdb = data.wardrobeSlideDetail.yjdb;
      if (isTemporary) {
        this.$refs.editWardrobeSlideSize.showSize(data.wardrobeSlideSizes);
      } else {
        this.$refs.editWardrobeSlideSize.showEdit(data.wardrobeSlideSizes);
      }
      this.getBc();
      this.getBk();
      this.visible = true;
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
    submitData(sizeDetail) {
      sizeDetail.forEach((e) => {
        this.defineProperty(e, '_index', '_rowKey');
      });
      this.defineProperty(this.orderDetail[0], '_index', '_rowKey');
      this.updateData(sizeDetail);
    },
    /** 关闭 */
    ok() {
      this.visible = false;
    },
    /** 提交数据 */
    updateData(sizeDetail) {
      this.$store.dispatch('commonKhxdYgmJryxdIndex/' + UPDATE_DATA, {...this.orderDetail[0], wardrobeSlideSizes: sizeDetail}).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.$Notice.success({
            title: res.data.info
          });
          this.reload();
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>

</style>
