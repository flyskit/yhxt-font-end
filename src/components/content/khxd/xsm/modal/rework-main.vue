<template lang='pug'>
  div.khxd-xsm-rework-main
    Modal(v-model="visible" width="90vw" @on-ok="ok" @on-cancel="ok")
      p(slot="header" style="color:#f60" class="noprint")
        Icon(type="ios-information-circle")
        span 返工订单-查询订单
      div
        queryCondDetail(ref="queryCondDetail" @doSelect="doSelect")
        Divider 订单记录
        Table(ref="selection" :columns="orderColumns" :data="orderDetailList" size="small" highlight-row border @on-row-dblclick="getSizeDetail")
          template(slot="scsl" slot-scope="{ row, index }")
            Button(size="small" v-if="row.scsl === 0") 普通
            Button(type="error" size="small" v-else) 加急
          template(slot="ddlx" slot-scope="{ row, index }")
            span(v-for="index of typeDdlx" v-if="row.ddlx === index.value" :key="index.value") {{ index.label }}
          template(slot="ddly" slot-scope="{ row, index }")
            span(v-for="index of typeDdly" v-if="row.ddly === index.value" :key="index.value") {{ index.label }}
          template(slot="action" slot-scope="{ row, index }")
            Button(@click="getSizeDetail(row)" style="padding: 6px 4px;" type="text")
              Icon(type="md-checkmark")
        div(style="text-align:right;margin-top:10px;")
          Page(:total="totalElement" @on-change="pageChange" show-total)
        Divider 尺寸信息
        Table(ref="selection" :columns="orderSizeColumns" :data="orderSizeList" size="small" highlight-row border @on-selection-change="selectChange" @on-row-dblclick="selectChange")
          template(slot="wz" slot-scope="{ row, index }")
            span {{ row.wz }}
          template(slot="zx" slot-scope="{ row, index }")
            span {{ row.zx }}
          template(slot="ys" slot-scope="{ row, index }")
            span {{ row.ys }}
          template(slot="gd" slot-scope="{ row, index }")
            span {{ row.gd }}
          template(slot="kd" slot-scope="{ row, index }")
            span {{ row.kd }}
          template(slot="sl" slot-scope="{ row, index }")
            span {{ row.sl }}
          template(slot="pf" slot-scope="{ row, index }")
            span {{ row.pf }}
          template(slot="bz" slot-scope="{ row, index }")
            span {{ row.bz }}
          template(slot="action" slot-scope="{ row, index }")
      reworkDataModal(ref="reworkDataModal")
      div(slot="footer" class="noprint")
        Button(type="error" @click="createRework") 创建返工订单
        Button(@click="ok") 关闭
</template>

<script>
import { mapGetters } from 'vuex';
import { XSM_XDXX_COLUMNS } from '@store/common/khxd/xsm/jryxd/module.js';
import { KHXD_XSM_CCXX } from '@store/common/khxd/xsm/xjbd/module';
import { ORDER_DDLX, ORDER_DDLY } from '@store/common/common/module.js';
import { GET_REWORK_DATA, GETTER_REWORK_DATA, GETTER_TOTAL_ELEMENT } from '@store/common/khxd/xsm/xjbd/index';
import { GET_DATA_BY_BH } from '@store/common/khxd/xsm/jryxd/index';
export default {
  inject: ['reload'],
  components: {
    'queryCondDetail': (resolve) => require(['../../../common/query-cond-detail'], resolve),
    'reworkDataModal': (resolve) => require(['./rework-data'], resolve)
  },
  data () {
    return {
      orderDetailList: [],
      orderSizeList: [],
      orderSize: [],
      acrylicDetail: {},
      orderDetail: {},
      orderColumns: XSM_XDXX_COLUMNS,
      orderSizeColumns: KHXD_XSM_CCXX,
      typeDdlx: ORDER_DDLX,
      typeDdly: ORDER_DDLY,
      splx: '',
      orderQueryCond: {},
      visible: false
    };
  },
  computed: {
    ...mapGetters({
      totalElement: 'commonKhxdXsmXjbdIndex/' + GETTER_TOTAL_ELEMENT,
      mapOrderDetailList: 'commonKhxdXsmXjbdIndex/' + GETTER_REWORK_DATA
    })
  },
  methods: {
    /** 显示 */
    show(type) {
      this.splx = type;
      this.visible = true;
    },
    /** 条件查询 */
    doSelect(orderQueryCond) {
      orderQueryCond.splx = this.splx;
      this.orderQueryCond = orderQueryCond;
      this.select();
    },
    /** 页码查询 */
    pageChange(value) {
      this.orderQueryCond.page.page = value;
      this.select();
    },
    /** 查询 */
    select() {
      this.$store.dispatch('commonKhxdXsmXjbdIndex/' + GET_REWORK_DATA, this.orderQueryCond).then(() => {
        this.orderDetailList = this.mapOrderDetailList;
      });
    },
    /** 选中尺寸列表 */
    selectChange(selectinos) {
      if (this.orderQueryCond.yxzt !== 0 && this.orderQueryCond.ddlx !== 2) {
        this.orderSize = selectinos;
      } else {
        this.$Message.error('所选订单无效或者订单为返工单，无法再返工！');
      }
    },
    /** 获取订单尺寸详细信息 */
    getSizeDetail(row) {
      this.$store.dispatch('commonKhxdXsmJryxdIndex/' + GET_DATA_BY_BH, row.ddbh).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.blisterDetail = res.data.map.data.blisterDetail;
          this.orderDetail = res.data.map.data.orderDetail;
          this.orderSizeList = res.data.map.data.blisterSizes;
        }
      });
    },
    /** 提交数据 */
    createRework() {
      if (this.orderSize.length === 0) {
        this.$Message.error('请勾选尺寸!');
      } else {
        this.$refs.reworkDataModal.show(this.blisterDetail, this.orderDetail, this.orderSize);
      }
    },
    /** 关闭 */
    ok() {
      this.reload();
      this.visible = false;
    }
  }
};
</script>
<style lang='less' scoped>

</style>
