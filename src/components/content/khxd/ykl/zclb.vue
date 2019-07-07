<template lang='pug'>
  div.khxd-jgm-jryxd
    Table(ref="selection" :columns="columns" :data="data" size="small" highlight-row border @on-row-dblclick="editInfo")
      template(slot="scsl" slot-scope="{ row, index }")
        Button(size="small" v-if="row.scsl === 0") 普通
        Button(type="error" size="small" v-else) 加急
      template(slot="ddly" slot-scope="{ row, index }")
        span(v-for="index of typeDdly" v-if="row.ddly === index.value" :key="index.value") {{ index.label }}
      template(slot="ddlx" slot-scope="{ row, index }")
        span(v-for="index of typeXdlx" v-if="row.ddlx === index.value" :key="index.value") {{ index.label }}
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
    editDataModal(ref="editDataModal")
    accessoryModal(ref="accessoryModal")
    delModal(ref="delModal")
</template>

<script>
import { mapGetters } from 'vuex';
import { YKL_XDXX_COLUMNS } from '@store/common/khxd/ykl/jryxd/module.js';
import { ORDER_DDLX, ORDER_DDLY } from '@store/common/common/module.js';
import { GET_DATA_BY_BH } from '@store/common/khxd/ykl/jryxd/index';
import { GET_DATA, GETTER_DATA, SUBMIT_ORDER_DATA } from '@store/common/khxd/ykl/zclb/index';
export default {
  inject: ['reload'],
  components: {
    'editDataModal': (resolve) => require(['./modal/edit-data'], resolve),
    'accessoryModal': (resolve) => require(['../../common/accessory-detail'], resolve),
    'delModal': (resolve) => require(['../../common/del-detail'], resolve)
  },
  data () {
    return {
      data: [],
      columns: YKL_XDXX_COLUMNS,
      typeXdlx: ORDER_DDLX,
      typeDdly: ORDER_DDLY
    };
  },
  computed: {
    ...mapGetters({
      mapData: 'commonKhxdYklZclbIndex/' + GETTER_DATA
    })
  },
  mounted() {
    this.getDataByTemporary();
  },
  methods: {
    /** 获取暂存列表列表 */
    getDataByTemporary() {
      this.$store.dispatch('commonKhxdYklZclbIndex/' + GET_DATA).then(res => {
        if (this.mapData.status !== 200) {
          this.$Message.error(this.mapData.info);
        } else {
          this.data = this.mapData.map.data;
        }
      });
    },
    /** 修改记录 */
    editInfo(row) {
      this.$store.dispatch('commonKhxdYklJryxdIndex/' + GET_DATA_BY_BH, row.ddbh).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.showEditPage(res.data.map.data);
        }
      });
    },
    /** 提交-正式下单 */
    submitInfo(row) {
      this.$store.dispatch('commonKhxdYklZclbIndex/' + SUBMIT_ORDER_DATA, {ddbh: row.ddbh, zt: 1}).then(res => {
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
    /** 编辑页面 */
    showEditPage(data) {
      this.$refs.editDataModal.show(data);
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
