<template lang='pug'>
  div.khxd-jgm-jryxd
    printModal(ref="printModal")
    Table(border ref="selection" :columns="jgmXdxxColumns" :data="data" highlight-row)
      template(slot="scsl" slot-scope="{ row, index }")
        Button(type="info" size="small" v-if="row.scsl === 0") 普通
        Button(type="error" size="small" v-else) 加急
      template(slot="xdlx" slot-scope="{ row, index }")
        Button(type="success" size="small" v-if="row.xdlx === 0") 新订单
        Button(type="warning" size="small" v-else-if="row.xdlx === 1") 补单
        Button(type="error" size="small" v-else) 返工重做
      template(slot="action" slot-scope="{ row, index }")
        Tooltip(placement="top" content="查看详细信息" transfer)
          Button(@click="viewInfo(row, index)" style="padding: 6px 4px;" type="text")
            Icon(type="ios-more")
        Tooltip(placement="top" content="修改" transfer)
          Button(@click="changeInfo(row, index)" style="padding: 6px 4px;" type="text")
            Icon(type="md-create")
        Tooltip(placement="top" content="删除" transfer)
          Poptip(@on-ok="delInfo(row, index)" confirm title="是否删除?" transfer)
            Button(style="padding: 6px 4px;" type="text")
              Icon(type="md-close")
</template>

<script>
import { mapGetters } from 'vuex';
import { JGM_XDXX_COLUMNS } from '@store/common/khxd/jgm/jryxd/module.js';
import { GET_DATA, GETTER_DATA, GET_DATA_BY_BH } from '@store/common/khxd/jgm/jryxd/index';
export default {
  components: {
    'printModal': (resolve) => require(['./modal/print-data'], resolve)
  },
  data () {
    return {
      data: [],
      jgmXdxxColumns: JGM_XDXX_COLUMNS,
      isReload: false
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
    getDataByToDay() {
      this.$store.dispatch('commonKhxdJgmJryxdIndex/' + GET_DATA).then(res => {
        this.data = this.mapData;
      });
    },
    viewInfo(row) {
      this.$store.dispatch('commonKhxdJgmJryxdIndex/' + GET_DATA_BY_BH, row.bh).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.showPrintPage(res.data.map.data);
        }
      });
    },
    changeInfo(idx) {
      console.log(idx);
    },
    delInfo(idx) {
      console.log(idx);
    },
    /** 打印页面 */
    showPrintPage(data) {
      this.$refs.printModal.show(data, this.isReload);
    }
  }
};
</script>
<style lang='less' scoped>

</style>
