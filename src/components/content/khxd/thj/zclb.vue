<template lang='pug'>
  div.khxd-jgm-jryxd
    Table(ref="selection" :columns="columns" :data="data" size="small" highlight-row border @on-row-dblclick="editInfo")
      template(slot="scsl" slot-scope="{ row, index }")
        Button(size="small" v-if="row.scsl === 0") 普通
        Button(type="error" size="small" v-else) 加急
      template(slot="ddly" slot-scope="{ row, index }")
        span(v-for="index of typeDdly" v-if="row.ddly === index.value" :key="index.value") {{ index.label }}
      template(slot="ddlx" slot-scope="{ row, index }")
        span(v-for="index of typeDdlx" v-if="row.ddlx === index.value" :key="index.value") {{ index.label }}
      template(slot="action" slot-scope="{ row, index }")
        Tooltip(placement="top" content="配件" transfer)
          Button(@click="viewAccessory(row, index)" style="padding: 6px 4px;" type="text")
            Icon(type="md-attach")
        Tooltip(placement="top" content="提交" transfer)
          Button(@click="submitInfo(row, index)" style="padding: 6px 4px;" type="text")
            Icon(type="md-checkmark")
        Tooltip(placement="top" content="删除" transfer)
          Poptip(@on-ok="delInfo(row, index)" confirm title="是否删除?" transfer)
            Button(style="padding: 6px 4px;" type="text")
              Icon(type="md-close")
    editPkmDataModal(ref="editPkmDataModal")
    editDtmDataModal(ref="editDtmDataModal")
    accessoryModal(ref="accessoryModal")
    delModal(ref="delModal")
</template>

<script>
import { mapGetters } from 'vuex';
import { THJ_XDXX_COLUMNS } from '@store/common/khxd/thjm/jryxd/module.js';
import { ORDER_DDLX, ORDER_DDLY } from '@store/common/common/module.js';
import { GET_DATA_BY_BH } from '@store/common/khxd/thjm/jryxd/index';
import { GET_DATA, GETTER_DATA, SUBMIT_ORDER_DATA } from '@store/common/khxd/thjm/zclb/index';
export default {
  inject: ['reload'],
  components: {
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
      isTemporary: true
    };
  },
  computed: {
    ...mapGetters({
      mapData: 'commonKhxdThjmZclbIndex/' + GETTER_DATA
    })
  },
  mounted() {
    this.getDataByTemporary();
  },
  methods: {
    /** 获取-暂存列表 */
    getDataByTemporary() {
      this.$store.dispatch('commonKhxdThjmZclbIndex/' + GET_DATA).then(res => {
        if (this.mapData.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.data = this.mapData.data.map.data;
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
    /** 提交-正式下单 */
    submitInfo(row) {
      this.$store.dispatch('commonKhxdThjmZclbIndex/' + SUBMIT_ORDER_DATA, {ddbh: row.ddbh, zt: 1}).then(res => {
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
    /** 查看配件 */
    viewAccessory(row) {
      this.$refs.accessoryModal.show(row.ddbh);
    },
    /** 删除记录 */
    delInfo(row) {
      this.$refs.delModal.show(row.ddbh);
    }
  }
};
</script>
<style lang='less' scoped>

</style>
