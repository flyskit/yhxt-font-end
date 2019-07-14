<template lang='pug'>
  div.khxd-ygm-jryxd
    table
      tr
        td
          span.span-color 正常-订单数：
        td
          span.span-content {{ totalNum }}
        td
          Divider(type="vertical")
          span.span-color 正常-门板平方：
        td
          span.span-content {{ totalDoorSquare }}
        td
          Divider(type="vertical")
          span.span-color 正常-芯板平方：
        td
          span.span-content {{ totalCoreBoardSquare }}
        td
          Divider(type="vertical")
          span.span-color 返工-订单数：
        td
          span.span-content {{ totalReworkNum }}
        td
          Divider(type="vertical")
          span.span-color 返工-门板平方：
        td
          span.span-content {{ totalReworkDoorSquare }}
        td
          Divider(type="vertical")
          span.span-color 返工-芯板平方
        td
          span.span-content {{ totalReworkCoreBoardSquare }}
    Table(ref="selection" :columns="columns" :data="data" size="small" highlight-row border @on-row-dblclick="editInfo")
      template(slot="scsl" slot-scope="{ row, index }")
        Button(size="small" v-if="row.scsl === 0") 普通
        Button(type="error" size="small" v-else) 加急
      template(slot="ddly" slot-scope="{ row, index }")
        span(v-for="index of typeDdly" v-if="row.ddly === index.value" :key="index.value") {{ index.label }}
      template(slot="ddlx" slot-scope="{ row, index }")
        span(v-for="index of typeDdlx" v-if="row.ddlx === index.value" :key="index.value") {{ index.label }}
      template(slot="action" slot-scope="{ row, index }")
        Tooltip(placement="top" content="查看详细信息" transfer)
          Button(@click="viewInfo(row, index)" style="padding: 6px 4px;" type="text")
            Icon(type="ios-more")
        Tooltip(placement="top" content="配件" transfer)
          Button(@click="viewAccessory(row, index)" style="padding: 6px 4px;" type="text")
            Icon(type="md-attach")
        Tooltip(placement="top" content="打印" transfer)
          Button(@click="printInfo(row, index)" style="padding: 6px 4px;" type="text")
            Icon(type="md-print")
        Tooltip(placement="top" content="删除" transfer)
          Poptip(@on-ok="delInfo(row, index)" confirm title="是否删除?" transfer)
            Button(style="padding: 6px 4px;" type="text")
              Icon(type="md-close")
    printModal(ref="printModal")
    editDataModal(ref="editDataModal")
    accessoryModal(ref="accessoryModal")
    delModal(ref="delModal")
</template>

<script>
import { mapGetters } from 'vuex';
import { YGM_XDXX_COLUMNS } from '@store/common/khxd/ygm/jryxd/module.js';
import { ORDER_DDLX, ORDER_DDLY } from '@store/common/common/module.js';
import { GET_DATA, GETTER_DATA, GET_DATA_BY_BH } from '@store/common/khxd/ygm/jryxd/index';
export default {
  inject: ['reload'],
  components: {
    'printModal': (resolve) => require(['./modal/print-data'], resolve),
    'editDataModal': (resolve) => require(['./modal/edit-data'], resolve),
    'accessoryModal': (resolve) => require(['../../common/accessory-detail'], resolve),
    'delModal': (resolve) => require(['../../common/del-detail'], resolve)
  },
  data () {
    return {
      data: [],
      columns: YGM_XDXX_COLUMNS,
      typeDdlx: ORDER_DDLX,
      typeDdly: ORDER_DDLY,
      totalNum: 0,
      totalDoorSquare: 0,
      totalCoreBoardSquare: 0,
      totalReworkNum: 0,
      totalReworkDoorSquare: 0,
      totalReworkCoreBoardSquare: 0,
      isTemporary: false
    };
  },
  computed: {
    ...mapGetters({
      mapData: 'commonKhxdYgmJryxdIndex/' + GETTER_DATA
    })
  },
  mounted() {
    this.getDataByToDay();
  },
  methods: {
    /** 获取-今日下单列表 */
    getDataByToDay() {
      this.$store.dispatch('commonKhxdYgmJryxdIndex/' + GET_DATA).then(res => {
        if (this.mapData.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.totalNum = this.mapData.map.data.totalNum;
          this.totalDoorSquare = this.mapData.map.data.totalDoorSquare;
          this.totalCoreBoardSquare = this.mapData.map.data.totalCoreBoardSquare;
          this.totalReworkNum = this.mapData.map.data.totalReworkNum;
          this.totalReworkDoorSquare = this.mapData.map.data.totalReworkDoorSquare;
          this.totalReworkCoreBoardSquare = this.mapData.map.data.totalReworkCoreBoardSquare;
          this.data = this.mapData.map.data.list;
        }
      });
    },
    /** 查看详细信息 */
    viewInfo(row) {
      this.$store.dispatch('commonKhxdYgmJryxdIndex/' + GET_DATA_BY_BH, row.ddbh).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.showPrintPage(res.data.map.data);
        }
      });
    },
    /** 修改记录 */
    editInfo(row) {
      this.$store.dispatch('commonKhxdYgmJryxdIndex/' + GET_DATA_BY_BH, row.ddbh).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.showEditPage(res.data.map.data);
        }
      });
    },
    /** 查看配件 */
    viewAccessory(row) {
      this.$refs.accessoryModal.show(row.ddbh);
    },
    /** 编辑页面 */
    showEditPage(data) {
      this.$refs.editDataModal.show(data, this.isTemporary);
    },
    /** 删除记录 */
    delInfo(row) {
      this.$refs.delModal.show(row.ddbh);
    },
    /** 打印页面 */
    printInfo(row) {
      this.$store.dispatch('commonKhxdYgmJryxdIndex/' + GET_DATA_BY_BH, row.ddbh).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.$refs.printModal.show(res.data.map.data, row.czr, row.czsj);
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>

</style>
