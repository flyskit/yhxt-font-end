<template lang='pug'>
  div.khxd-jgm-jryxd
    p
      span.span-color 新订单：
      span {{ totalNum }}
      Divider(type="vertical")
      span.span-color 门板平方：
      span {{ totalDoorSquare }}
      Divider(type="vertical")
      span.span-color 玻璃平方：
      span {{ totalGlassSquare }}
      Divider(type="vertical")
      span.span-color 门板数量：
      span {{ totalDoorNum }}
      Divider(type="vertical")
      span.span-color 返工订单：
      span {{ totalReworkNum }}
      Divider(type="vertical")
      span.span-color 返工平方：
      span {{ totalReworkDoorSquare }}
      Divider(type="vertical")
      span.span-color 返工玻璃：
      span {{ totalReworkGlassSquare }}
      Divider(type="vertical")
      span.span-color 返工门板：
      span {{ totalReworkDoorNum }}
    Table(ref="selection" :columns="columns" :data="data" size="small" highlight-row border @on-row-dblclick="editInfo")
      template(slot="scsl" slot-scope="{ row, index }")
        Button(size="small" v-if="row.scsl === 0") 普通
        Button(type="error" size="small" v-else) 加急
      template(slot="ddly" slot-scope="{ row, index }")
        span(v-for="index of typeDdly" v-if="row.ddly === index.value" :key="index.value") {{ index.label }}
      template(slot="ddlx" slot-scope="{ row, index }")
        span(v-for="index of typeXdlx" v-if="row.ddlx === index.value" :key="index.value") {{ index.label }}
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
import { JGM_XDXX_COLUMNS } from '@store/common/khxd/jgm/jryxd/module.js';
import { ORDER_DDLX, ORDER_DDLY } from '@store/common/common/module.js';
import { GET_DATA, GETTER_DATA, GET_DATA_BY_BH } from '@store/common/khxd/jgm/jryxd/index';
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
      columns: JGM_XDXX_COLUMNS,
      typeXdlx: ORDER_DDLX,
      typeDdly: ORDER_DDLY,
      totalNum: 0,
      totalDoorSquare: 0,
      totalGlassSquare: 0,
      totalDoorNum: 0,
      totalReworkNum: 0,
      totalReworkDoorSquare: 0,
      totalReworkGlassSquare: 0,
      totalReworkDoorNum: 0
    };
  },
  computed: {
    ...mapGetters({
      mapData: 'commonKhxdJgmJryxdIndex/' + GETTER_DATA
    })
  },
  mounted() {
    this.getDataByToDay();
  },
  methods: {
    /** 获取-今日下单列表 */
    getDataByToDay() {
      this.$store.dispatch('commonKhxdJgmJryxdIndex/' + GET_DATA).then(res => {
        if (this.mapData.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.totalNum = this.mapData.map.data.totalNum;
          this.totalDoorSquare = this.mapData.map.data.totalDoorSquare;
          this.totalGlassSquare = this.mapData.map.data.totalGlassSquare;
          this.totalDoorNum = this.mapData.map.data.totalDoorNum;
          this.totalReworkNum = this.mapData.map.data.totalReworkNum;
          this.totalReworkDoorSquare = this.mapData.map.data.totalReworkDoorSquare;
          this.totalReworkGlassSquare = this.mapData.map.data.totalReworkGlassSquare;
          this.totalReworkDoorNum = this.mapData.map.data.totalReworkDoorNum;
          this.data = this.mapData.map.data.list;
        }
      });
    },
    /** 查看详细信息 */
    viewInfo(row) {
      this.$store.dispatch('commonKhxdJgmJryxdIndex/' + GET_DATA_BY_BH, row.ddbh).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.showPrintPage(res.data.map.data);
        }
      });
    },
    /** 修改记录 */
    editInfo(row) {
      this.$store.dispatch('commonKhxdJgmJryxdIndex/' + GET_DATA_BY_BH, row.ddbh).then(res => {
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
      this.$refs.editDataModal.show(data);
    },
    /** 删除记录 */
    delInfo(row) {
      this.$refs.delModal.show(row.ddbh);
    },
    /** 打印页面 */
    printInfo(row) {
      this.$store.dispatch('commonKhxdJgmJryxdIndex/' + GET_DATA_BY_BH, row.ddbh).then(res => {
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
