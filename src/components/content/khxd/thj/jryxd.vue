<template lang='pug'>
  div.khxd-jgm-jryxd
    table
      tr
        td
          span.span-color 正常-平开门订单数：
        td
          span.span-content {{ totalSwingNum }}
        td
          Divider(type="vertical")
          span.span-color 正常-平开门平方：
        td
          span.span-content {{ totalSwingSquare }}
        td
          Divider(type="vertical")
          span.span-color 正常-平开门数量：
        td
          span.span-content {{ totalSwingDoorNum }}
        td
          Divider(type="vertical")
          span.span-color 正常-吊趟门订单数：
        td
          span.span-content {{ totalHangingNum }}
        td
          Divider(type="vertical")
          span.span-color 正常-吊趟门平方：
        td
          span.span-content {{ totalHangingSquare }}
        td
          Divider(type="vertical")
          span.span-color 正常-吊趟门数量：
        td
          span.span-content {{ totalHangingDoorNum }}
      tr
        td
          span.span-color 返工-平开门订单数：
        td
          span.span-content {{ totalReworkSwingNum }}
        td
          Divider(type="vertical")
          span.span-color 返工-平开门平方：
        td
          span.span-content {{ totalReworkSwingSquare }}
        td
          Divider(type="vertical")
          span.span-color 返工-平开门数量：
        td
          span.span-content {{ totalReworkSwingDoorNum }}
        td
          Divider(type="vertical")
          span.span-color 返工-吊趟门订单数：
        td
          span.span-content {{ totalReworkHangingNum }}
        td
          Divider(type="vertical")
          span.span-color 返工-吊趟门平方：
        td
          span.span-content {{ totalReworkHangingSquare }}
        td
          Divider(type="vertical")
          span.span-color 返工-吊趟门数量：
        td
          span.span-content {{ totalReworkHangingDoorNum }}
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
    editPkmDataModal(ref="editPkmDataModal")
    editDtmDataModal(ref="editDtmDataModal")
    accessoryModal(ref="accessoryModal")
    delModal(ref="delModal")
</template>

<script>
import { mapGetters } from 'vuex';
import { THJ_XDXX_COLUMNS } from '@store/common/khxd/thjm/jryxd/module.js';
import { ORDER_DDLX, ORDER_DDLY } from '@store/common/common/module.js';
import { GET_DATA, GETTER_DATA, GET_DATA_BY_BH } from '@store/common/khxd/thjm/jryxd/index';
export default {
  inject: ['reload'],
  components: {
    'printModal': (resolve) => require(['./modal/print-data'], resolve),
    'editPkmDataModal': (resolve) => require(['./modal/edit-pkm-data'], resolve),
    'editDtmDataModal': (resolve) => require(['./modal/edit-dtm-data'], resolve),
    'accessoryModal': (resolve) => require(['../../common/accessory-detail'], resolve),
    'delModal': (resolve) => require(['../../common/del-detail'], resolve)
  },
  data () {
    return {
      data: [],
      columns: THJ_XDXX_COLUMNS,
      typeDdlx: ORDER_DDLX,
      typeDdly: ORDER_DDLY,
      totalSwingNum: 0,
      totalSwingSquare: 0,
      totalSwingDoorNum: 0,
      totalHangingNum: 0,
      totalHangingSquare: 0,
      totalHangingDoorNum: 0,
      totalReworkSwingNum: 0,
      totalReworkSwingSquare: 0,
      totalReworkSwingDoorNum: 0,
      totalReworkHangingNum: 0,
      totalReworkHangingSquare: 0,
      totalReworkHangingDoorNum: 0,
      isTemporary: false
    };
  },
  computed: {
    ...mapGetters({
      mapData: 'commonKhxdThjmJryxdIndex/' + GETTER_DATA
    })
  },
  mounted() {
    this.getDataByToDay();
  },
  methods: {
    /** 获取-今日下单列表 */
    getDataByToDay() {
      this.$store.dispatch('commonKhxdThjmJryxdIndex/' + GET_DATA).then(res => {
        if (this.mapData.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.totalSwingNum = this.mapData.map.data.totalSwingNum;
          this.totalSwingSquare = this.mapData.map.data.totalSwingSquare;
          this.totalSwingDoorNum = this.mapData.map.data.totalSwingDoorNum;
          this.totalHangingNum = this.mapData.map.data.totalHangingNum;
          this.totalHangingSquare = this.mapData.map.data.totalHangingSquare;
          this.totalHangingDoorNum = this.mapData.map.data.totalHangingDoorNum;
          this.totalReworkSwingNum = this.mapData.map.data.totalReworkSwingNum;
          this.totalReworkSwingSquare = this.mapData.map.data.totalReworkSwingSquare;
          this.totalReworkSwingDoorNum = this.mapData.map.data.totalReworkSwingDoorNum;
          this.totalReworkHangingNum = this.mapData.map.data.totalReworkHangingNum;
          this.totalReworkHangingSquare = this.mapData.map.data.totalReworkHangingSquare;
          this.totalReworkHangingDoorNum = this.mapData.map.data.totalReworkHangingDoorNum;
          this.data = this.mapData.map.data.list;
        }
      });
    },
    /** 查看详细信息 */
    viewInfo(row) {
      this.$store.dispatch('commonKhxdThjmJryxdIndex/' + GET_DATA_BY_BH, row.ddbh).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.showPrintPage(res.data.map.data);
        }
      });
    },
    /** 修改记录 */
    editInfo(row) {
      this.$store.dispatch('commonKhxdThjmJryxdIndex/' + GET_DATA_BY_BH, row.ddbh).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          if (row.splx === 3) {
            // 编辑-平开门
            this.$refs.editPkmDataModal.show(res.data.map.data, this.isTemporary);
          } else {
            // 编辑-吊趟门
            this.$refs.editDtmDataModal.show(res.data.map.data, this.isTemporary);
          }
        }
      });
    },
    /** 查看配件 */
    viewAccessory(row) {
      this.$refs.accessoryModal.show(row.ddbh);
    },
    /** 删除记录 */
    delInfo(row) {
      this.$refs.delModal.show(row.ddbh);
    },
    /** 打印页面 */
    printInfo(row) {
      this.$store.dispatch('commonKhxdThjmJryxdIndex/' + GET_DATA_BY_BH, row.ddbh).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.$refs.printModal.show(res.data.map.data, row.czr, row.czsj, row.splx);
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>

</style>
