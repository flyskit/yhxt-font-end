<template lang='pug'>
  div.khxd-jgm-jryxd
    //- Table(ref="selection" :columns="columns" :data="data" size="small" highlight-row border)
    //-   template(slot="scsl" slot-scope="{ row, index }")
    //-     Button(size="small" v-if="row.scsl === 0") 普通
    //-     Button(type="error" size="small" v-else) 加急
    //-   template(slot="ddly" slot-scope="{ row, index }")
    //-     span(v-for="index of typeDdly" v-if="row.ddly === index.value" :key="index.value") {{ index.label }}
    //-   template(slot="ddlx" slot-scope="{ row, index }")
    //-     span(v-for="index of typeXdlx" v-if="row.ddlx === index.value" :key="index.value") {{ index.label }}
    //-   template(slot="action" slot-scope="{ row, index }")
    //-     Tooltip(placement="top" content="查看详细信息" transfer)
    //-       Button(@click="viewInfo(row, index)" style="padding: 6px 2px;" type="text")
    //-         Icon(type="ios-more")
    //-     Tooltip(placement="top" content="修改" transfer)
    //-       Button(@click="changeInfo(row, index)" style="padding: 6px 2px;" type="text")
    //-         Icon(type="md-create")
    //-     Tooltip(placement="top" content="提交" transfer)
    //-       Button(@click="submitInfo(row, index)" style="padding: 6px 2px;" type="text")
    //-         Icon(type="md-checkmark")
    //-     Tooltip(placement="top" content="删除" transfer)
    //-       Poptip(@on-ok="delInfo(row, index)" confirm title="是否删除?" transfer)
    //-         Button(style="padding: 6px 2px;" type="text")
    //-           Icon(type="md-close")
    //-   printModal(ref="printModal")
    //-   editDataModal(ref="editDataModal")
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
import { JGM_XDXX_COLUMNS } from '@store/common/khxd/jgm/jryxd/module.js';
import { KHXD_JGM_XDLX, KHXD_JGM_DDLY } from '@store/common/khxd/jgm/xjbd/module.js';
import { GET_DATA_BY_BH } from '@store/common/khxd/jgm/jryxd/index';
import { GET_DATA, GETTER_DATA, SUBMIT_ORDER_DATA } from '@store/common/khxd/jgm/zclb/index';
export default {
  inject: ['reload'],
  components: {
    'editDataModal': (resolve) => require(['./modal/edit-data'], resolve),
    'accessoryModal': (resolve) => require(['./modal/accessory'], resolve),
    'delModal': (resolve) => require(['./modal/del-data'], resolve)
  },
  data () {
    return {
      data: [],
      columns: JGM_XDXX_COLUMNS,
      typeXdlx: KHXD_JGM_XDLX,
      typeDdly: KHXD_JGM_DDLY
    };
  },
  computed: {
    ...mapGetters({
      mapData: 'commonKhxdJgmZclbIndex/' + GETTER_DATA
    })
  },
  mounted() {
    this.getDataByTemporary();
  },
  methods: {
    /** 获取全部记录 */
    getDataByTemporary() {
      this.$store.dispatch('commonKhxdJgmZclbIndex/' + GET_DATA).then(() => {
        if (this.mapData.data.status !== 200) {
          this.$Message.error(this.mapData.data.info);
        } else {
          this.data = this.mapData.data.map.data;
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
    /** 提交-正式下单 */
    submitInfo(row) {
      this.$store.dispatch('commonKhxdJgmZclbIndex/' + SUBMIT_ORDER_DATA, row.ddbh).then(res => {
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
