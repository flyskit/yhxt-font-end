<template lang='pug'>
  div.khxd-jgm-rework-main
    Modal(v-model="visible" width="90vw" @on-ok="ok" @on-cancel="ok")
      p(slot="header" style="color:#f60" class="noprint")
        Icon(type="ios-information-circle")
        span 返工订单-查询订单
      div
        span.span-color 客户：
        Input.input-small(v-model="khxm" placeholder="输入客户姓名" @on-change="doSelect")
        Divider 订单记录
        Table(ref="selection" :columns="orderColumns" :data="orderDetailList" size="small" highlight-row border @on-row-dblclick="getSizeDetail")
          template(slot="scsl" slot-scope="{ row, index }")
            Button(size="small" v-if="row.scsl === 0") 普通
            Button(type="error" size="small" v-else) 加急
          template(slot="ddly" slot-scope="{ row, index }")
            span(v-for="index of typeDdly" v-if="row.ddly === index.value" :key="index.value") {{ index.label }}
          template(slot="ddlx" slot-scope="{ row, index }")
            span(v-for="index of typeXdlx" v-if="row.ddlx === index.value" :key="index.value") {{ index.label }}
          template(slot="action" slot-scope="{ row, index }")
            Button(@click="getSizeDetail(row)" style="padding: 6px 4px;" type="text")
              Icon(type="md-checkmark")
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
import { KHXD_JGM_CCLX, KHXD_JGM_CCXX, KHXD_JGM_XDLX, KHXD_JGM_DDLY } from '@store/common/khxd/jgm/xjbd/module';
import { GET_REWORK_DATA, GETTER_REWORK_DATA } from '@store/common/khxd/jgm/xjbd/index';
import { GET_DATA_BY_BH } from '@store/common/khxd/jgm/jryxd/index';
export default {
  inject: ['reload'],
  components: {
    'reworkDataModal': (resolve) => require(['./rework-data'], resolve)
  },
  data () {
    return {
      orderDetailList: [],
      orderSizeList: [],
      orderSize: [],
      crystalSteelDoorDetail: {},
      orderDetail: {},
      khxm: '',
      orderColumns: JGM_XDXX_COLUMNS,
      orderSizeColumns: KHXD_JGM_CCXX,
      typeColumns: KHXD_JGM_CCLX,
      typeXdlx: KHXD_JGM_XDLX,
      typeDdly: KHXD_JGM_DDLY,
      visible: false
    };
  },
  computed: {
    ...mapGetters({
      mapOrderDetailList: 'commonKhxdJgmXjbdIndex/' + GETTER_REWORK_DATA
    })
  },
  methods: {
    /** 显示 */
    show(data) {
      this.visible = true;
    },
    /** 根据客户姓名查找订单列表 */
    doSelect() {
      if (this.khxm !== '') {
        this.$store.dispatch('commonKhxdJgmXjbdIndex/' + GET_REWORK_DATA, this.khxm).then(() => {
          this.orderDetailList = this.mapOrderDetailList;
        });
      } else {
        this.orderDetailList = [];
        this.orderSizeList = [];
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
    /** 选中尺寸列表 */
    selectChange(selectinos) {
      this.orderSize = selectinos;
    },
    remove() {},
    add() {},
    /** 关闭 */
    ok() {
      this.khxm = '';
      this.orderDetailList = [];
      this.orderSizeList = [];
      this.visible = false;
    },
    /** 提交数据 */
    createRework() {
      if (this.orderSize.length === 0) {
        this.$Message.error('请勾选尺寸!');
      } else {
        this.$refs.reworkDataModal.show(this.crystalSteelDoorDetail, this.orderDetail, this.orderSize);
      }
    }
  }
};
</script>
<style lang='less' scoped>

</style>
