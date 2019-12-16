<template lang='pug'>
  div.khxd-jgm-rework-main
    Modal(v-model="visible" width="90vw" @on-ok="ok" @on-cancel="ok")
      p(slot="header" style="color:#f60" class="noprint")
        Icon(type="ios-information-circle")
        span 返工订单-查询订单
      div
        queryCondDetail(ref="queryCondDetail" :isShowAll="isShowAll" @doSelect="doSelect")
        Divider 订单记录
        Table(ref="selection" :columns="orderColumns" :data="orderDetailList" size="small" highlight-row border @on-row-dblclick="getSizeDetail")
          template(slot="scsl" slot-scope="{ row, index }")
            Button(size="small" v-if="row.scsl === 0") 普通
            Button(type="error" size="small" v-else) 加急
          template(slot="ddly" slot-scope="{ row, index }")
            span(v-for="index of typeDdly" v-if="row.ddly === index.value" :key="index.value") {{ index.label }}
          template(slot="ddlx" slot-scope="{ row, index }")
            span(v-for="index of typeDdlx" v-if="row.ddlx === index.value" :key="index.value") {{ index.label }}
          template(slot="action" slot-scope="{ row, index }")
            Button(@click="getSizeDetail(row)" style="padding: 6px 4px;" type="text")
              Icon(type="md-checkmark")
        div(style="text-align:right;margin-top:10px;")
          Page(:total="totalElement" @on-change="pageChange" show-total)
        Divider 尺寸信息
        Table(ref="selection" :columns="orderSizeColumns" :data="orderSizeList" size="small" border @on-selection-change="selectChange")
          template(slot="lx" slot-scope="{ row, index }")
            span {{ row.lx === 0 ? '地柜' : '吊柜' }}
          template(slot="mbgd" slot-scope="{ row, index }")
            span {{ row.mbgd }}
          template(slot="mbkd" slot-scope="{ row, index }")
            span {{ row.mbkd }}
          template(slot="sl" slot-scope="{ row, index }")
            span {{ row.sl }}
          template(slot="mbpf" slot-scope="{ row, index }")
            span {{ row.mbpf }}
          template(slot="bz" slot-scope="{ row, index }")
            span {{ row.bz }}
          template(slot="blgd" slot-scope="{ row, index }")
            span {{ row.blgd }}
          template(slot="blkd" slot-scope="{ row, index }")
            span {{ row.blkd }}
          template(slot="blpf" slot-scope="{ row, index }")
            span {{ row.blpf }}
          template(slot="action" slot-scope="{ row, index }")
      reworkDataModal(ref="reworkDataModal")
      div(slot="footer" class="noprint")
        Button(type="error" @click="createRework") 创建返工订单
        Button(@click="ok") 关闭
</template>

<script>
import { mapGetters } from 'vuex';
import { JGM_XDXX_COLUMNS } from '@store/common/khxd/jgm/jryxd/module.js';
import { KHXD_JGM_CCXX } from '@store/common/khxd/jgm/xjbd/module';
import { ORDER_DDLX, ORDER_DDLY } from '@store/common/common/module';
import { GET_REWORK_DATA, GETTER_REWORK_DATA, GETTER_TOTAL_ELEMENT } from '@store/common/khxd/jgm/xjbd/index';
import { GET_DATA_BY_BH } from '@store/common/khxd/jgm/jryxd/index';
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
      crystalSteelDoorDetail: {},
      orderDetail: {},
      orderColumns: JGM_XDXX_COLUMNS,
      orderSizeColumns: KHXD_JGM_CCXX,
      typeDdlx: ORDER_DDLX,
      typeDdly: ORDER_DDLY,
      splx: '',
      isShowAll: false,
      orderQueryCond: {},
      visible: false
    };
  },
  computed: {
    ...mapGetters({
      totalElement: 'commonKhxdJgmXjbdIndex/' + GETTER_TOTAL_ELEMENT,
      mapOrderDetailList: 'commonKhxdJgmXjbdIndex/' + GETTER_REWORK_DATA
    })
  },
  methods: {
    /** 显示 */
    show(type) {
      this.splx = type;
      this.visible = true;
    },
    /** 根据客户姓名查找订单列表 */
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
      this.$store.dispatch('commonKhxdJgmXjbdIndex/' + GET_REWORK_DATA, this.orderQueryCond).then(() => {
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
      this.$store.dispatch('commonKhxdJgmJryxdIndex/' + GET_DATA_BY_BH, row.ddbh).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.crystalSteelDoorDetail = res.data.map.data.crystalSteelDoorDetail;
          this.orderDetail = res.data.map.data.orderDetail;
          this.orderSizeList = res.data.map.data.cupboardDoorSizes;
        }
      });
    },
    /** 提交数据 */
    createRework() {
      if (this.orderSize.length === 0) {
        this.$Message.error('请勾选尺寸!');
      } else {
        this.$refs.reworkDataModal.show(this.crystalSteelDoorDetail, this.orderDetail, this.orderSize);
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
