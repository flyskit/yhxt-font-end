<template lang='pug'>
  div.khxd-jgm-jryxd
    printModal(ref="printModal")
    Table(border ref="selection" :columns="jgmXdxxColumns" :data="data" highlight-row)
      template(slot="scsl" slot-scope="{ row, index }")
        Button(size="small" v-if="row.scsl === 0") 普通
        Button(type="error" size="small" v-else) 加急
      template(slot="ddly" slot-scope="{ row, index }")
        span(v-if="row.scsl === 0") 线下
        span.span-error-color(v-else) 1688
      template(slot="xdlx" slot-scope="{ row, index }")
        Button(type="success" size="small" v-if="row.xdlx === 0") 新订单
        Button(type="warning" size="small" v-else-if="row.xdlx === 1") 补单
        Button(type="error" size="small" v-else) 返工重做
      template(slot="action" slot-scope="{ row, index }")
        Tooltip(placement="top" content="查看详细信息" transfer)
          Button(@click="viewInfo(row, index)" style="padding: 6px 2px;" type="text")
            Icon(type="ios-more")
        Tooltip(placement="top" content="修改" transfer)
          Button(@click="changeInfo(row, index)" style="padding: 6px 2px;" type="text")
            Icon(type="md-create")
        Tooltip(placement="top" content="提交" transfer)
          Button(@click="submitInfo(row, index)" style="padding: 6px 2px;" type="text")
            Icon(type="md-checkmark")
        Tooltip(placement="top" content="删除" transfer)
          Poptip(@on-ok="delInfo(row, index)" confirm title="是否删除?" transfer)
            Button(style="padding: 6px 2px;" type="text")
              Icon(type="md-close")
</template>

<script>
import { mapGetters } from 'vuex';
import { JGM_XDXX_COLUMNS } from '@store/common/khxd/jgm/jryxd/module.js';
import { GET_DATA_BY_BH } from '@store/common/khxd/jgm/jryxd/index';
import { GET_DATA, GETTER_DATA, SUBMIT_ORDER_DATA } from '@store/common/khxd/jgm/zclb/index';
export default {
  inject: ['reload'],
  components: {
    'printModal': (resolve) => require(['./modal/print-data'], resolve)
  },
  data () {
    return {
      data: [],
      jgmXdxxColumns: JGM_XDXX_COLUMNS,
      isReload: false,
      isPrint: false
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
    getDataByTemporary() {
      this.$store.dispatch('commonKhxdJgmZclbIndex/' + GET_DATA).then(res => {
        if (this.mapData.status !== 200) {
          this.$Notice.error({
            title: '通知提醒',
            desc: '暂存列表：' + this.mapData.info,
            duration: 0
          });
        } else {
          this.data = this.mapData.map.data;
        }
      });
    },
    viewInfo(row) {
      this.$store.dispatch('commonKhxdJgmJryxdIndex/' + GET_DATA_BY_BH, row.bh).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
          this.$Notice.error({
            title: '通知提醒',
            desc: '暂存列表：' + res.data.info,
            duration: 0
          });
        } else {
          this.isReload = false;
          this.isPrint = false;
          this.showPrintPage(res.data.map.data);
        }
      });
    },
    changeInfo(idx) {
      console.log(idx);
    },
    submitInfo(row) {
      this.$store.dispatch('commonKhxdJgmZclbIndex/' + SUBMIT_ORDER_DATA, row.bh).then(res => {
        if (res.data.status !== 200) {
          this.$Notice.error({
            title: '通知提醒',
            desc: '暂存列表：' + res.data.info,
            duration: 0
          });
        } else {
          // 重载
          this.$Notice.success({
            title: res.data.info
          });
          this.isReload = true;
          this.isPrint = true;
          this.showPrintPage(res.data.map.data);
        }
      });
    },
    delInfo(idx) {
      console.log(idx);
    },
    /** 打印页面 */
    showPrintPage(data) {
      this.$refs.printModal.show(data, this.isReload, this.isPrint);
    }
  }
};
</script>
<style lang='less' scoped>
.span-error-color {
  color: #ff0000;
}
</style>
