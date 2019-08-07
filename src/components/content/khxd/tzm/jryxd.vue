<template lang='pug'>
  div.khxd-jgm-jryxd
    table
      tr
        td
          span.span-color 正常-平开门套数：
        td
          span.span-content {{ totalSwingNum }}
        td
          Divider(type="vertical")
          span.span-color 正常-平开门扇数：
        td
          span.span-content {{ totalSwingDoorNum }}
        td
          Divider(type="vertical")
          span.span-color 正常-推门套数：
        td
          span.span-content {{ totalHangingNum }}
        td
          Divider(type="vertical")
          span.span-color 正常-推门扇数：
        td
          span.span-content {{ totalHangingDoorNum }}
        td
          Divider(type="vertical")
          span.span-color 正常-合计空套：
        td
          span.span-content {{ totalPocketNum }}
        td
          Divider(type="vertical")
          span.span-color 正常-合计线条
        td
          span.span-content {{ totalLineNum }}
      tr
        td
          span.span-color 返工-平开门套数：
        td
          span.span-content {{ totalReworkSwingNum }}
        td
          Divider(type="vertical")
          span.span-color 返工-平开门扇数：
        td
          span.span-content {{ totalReworkSwingDoorNum }}
        td
          Divider(type="vertical")
          span.span-color 返工-推门套数：
        td
          span.span-content {{ totalReworkHangingNum }}
        td
          Divider(type="vertical")
          span.span-color 返工-推门扇数：
        td
          span.span-content {{ totalReworkHangingDoorNum }}
        td
          Divider(type="vertical")
          span.span-color 返工-合计空套：
        td
          span.span-content {{ totalReworkPocketNum }}
        td
          Divider(type="vertical")
          span.span-color 返工-合计线条
        td
          span.span-content {{ totalReworkLineNum }}
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
        Tooltip(placement="top" content="打印主单" transfer)
          Button(@click="printMainInfo(row, index)" style="padding: 6px 4px;" type="text")
            Icon(type="md-print")
        Tooltip(placement="top" content="打印次单" transfer)
          Button(@click="printNextInfo(row, index)" style="padding: 6px 4px;" type="text")
            Icon(type="md-print")
        Tooltip(placement="top" content="删除" transfer)
          Poptip(@on-ok="delInfo(row, index)" confirm title="是否删除?" transfer)
            Button(style="padding: 6px 4px;" type="text")
              Icon(type="md-close")
    printModal(ref="printModal")
    editSuitModal(ref="editSuitModal")
    accessoryModal(ref="accessoryModal")
    delModal(ref="delModal")
</template>

<script>
import { mapGetters } from 'vuex';
import { TZM_XDXX_COLUMNS } from '@store/common/khxd/tzm/jryxd/module.js';
import { ORDER_DDLX, ORDER_DDLY } from '@store/common/common/module.js';
import { GET_DATA, GETTER_DATA, GET_DATA_BY_BH } from '@store/common/khxd/tzm/jryxd/index';
export default {
  inject: ['reload'],
  components: {
    'printModal': (resolve) => require(['./modal/print-data'], resolve),
    'editSuitModal': (resolve) => require(['./modal/edit-data'], resolve),
    'accessoryModal': (resolve) => require(['../../common/accessory-detail'], resolve),
    'delModal': (resolve) => require(['../../common/del-detail'], resolve)
  },
  data () {
    return {
      data: [],
      columns: TZM_XDXX_COLUMNS,
      typeDdlx: ORDER_DDLX,
      typeDdly: ORDER_DDLY,
      totalSwingNum: 0,
      totalSwingDoorNum: 0,
      totalHangingNum: 0,
      totalHangingDoorNum: 0,
      totalPocketNum: 0,
      totalLineNum: 0,
      totalReworkSwingNum: 0,
      totalReworkSwingDoorNum: 0,
      totalReworkHangingNum: 0,
      totalReworkHangingDoorNum: 0,
      totalReworkPocketNum: 0,
      totalReworkLineNum: 0,
      isTemporary: false
    };
  },
  computed: {
    ...mapGetters({
      mapData: 'commonKhxdTzmJryxdIndex/' + GETTER_DATA
    })
  },
  mounted() {
    this.getDataByToDay();
  },
  methods: {
    /** 获取-今日下单列表 */
    getDataByToDay() {
      this.$store.dispatch('commonKhxdTzmJryxdIndex/' + GET_DATA).then(res => {
        if (this.mapData.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.totalSwingNum = this.mapData.map.data.totalSwingNum;
          this.totalSwingDoorNum = this.mapData.map.data.totalSwingDoorNum;
          this.totalHangingNum = this.mapData.map.data.totalHangingNum;
          this.totalHangingDoorNum = this.mapData.map.data.totalHangingDoorNum;
          this.totalPocketNum = this.mapData.map.data.totalPocketNum;
          this.totalLineNum = this.mapData.map.data.totalLineNum;
          this.totalReworkSwingNum = this.mapData.map.data.totalReworkSwingNum;
          this.totalReworkSwingDoorNum = this.mapData.map.data.totalReworkSwingDoorNum;
          this.totalReworkHangingNum = this.mapData.map.data.totalReworkHangingNum;
          this.totalReworkHangingDoorNum = this.mapData.map.data.totalReworkHangingDoorNum;
          this.totalReworkPocketNum = this.mapData.map.data.totalReworkPocketNum;
          this.totalReworkLineNum = this.mapData.map.data.totalReworkLineNum;
          this.data = this.mapData.map.data.list;
        }
      });
    },
    /** 查看详细信息 */
    viewInfo(row) {
      this.$store.dispatch('commonKhxdTzmJryxdIndex/' + GET_DATA_BY_BH, row.ddbh).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.showPrintPage(res.data.map.data);
        }
      });
    },
    /** 修改记录 */
    editInfo(row) {
      this.$store.dispatch('commonKhxdTzmJryxdIndex/' + GET_DATA_BY_BH, row.ddbh).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.$refs.editSuitModal.show(res.data.map.data, this.isTemporary);
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
    /** 打印主单 */
    printMainInfo(row) {
      this.$store.dispatch('commonKhxdTzmJryxdIndex/' + GET_DATA_BY_BH, row.ddbh).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.$refs.printModal.show(res.data.map.data, row.czr, row.czsj, true);
        }
      });
    },
    /** 打印次单 */
    printNextInfo(row) {
      this.$store.dispatch('commonKhxdTzmJryxdIndex/' + GET_DATA_BY_BH, row.ddbh).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.$refs.printModal.show(res.data.map.data, row.czr, row.czsj, false);
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>

</style>
