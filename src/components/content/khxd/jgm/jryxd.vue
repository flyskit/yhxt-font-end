<template lang='pug'>
  div.khxd-jgm-jryxd
    printModal(ref="printModal")
    editDataModal(ref="editDataModal")
    p
      span.span-color 订单总数：
      span {{ totalNum }}
      Divider(type="vertical")
      span.span-color 铝合金总平方：
      span {{ totalLhjpf }}
      Divider(type="vertical")
      span.span-color 玻璃总平方：
      span {{ totalBlpf }}
      Divider(type="vertical")
      span.span-color 总片数：
      span {{ totalPs }}
    Table(ref="selection" :columns="jgmXdxxColumns" :data="data" size="small" highlight-row border)
      template(slot="scsl" slot-scope="{ row, index }")
        Button(size="small" v-if="row.scsl === 0") 普通
        Button(type="error" size="small" v-else) 加急
      template(slot="ddly" slot-scope="{ row, index }")
        span(v-for="index of typeDdly" v-if="row.ddly === index.value" :key="index.value") {{ index.label }}
      template(slot="xdlx" slot-scope="{ row, index }")
        span(v-for="index of typeXdlx" v-if="row.xdlx === index.value" :key="index.value") {{ index.label }}
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
import { KHXD_JGM_XDLX, KHXD_JGM_DDLY } from '@store/common/khxd/jgm/xjbd/module.js';
import { GET_DATA, GETTER_DATA, GET_DATA_BY_BH, DEL_DATA } from '@store/common/khxd/jgm/jryxd/index';
export default {
  inject: ['reload'],
  components: {
    'printModal': (resolve) => require(['./modal/print-data'], resolve),
    'editDataModal': (resolve) => require(['./modal/edit-data'], resolve)
  },
  data () {
    return {
      data: [],
      jgmXdxxColumns: JGM_XDXX_COLUMNS,
      typeXdlx: KHXD_JGM_XDLX,
      typeDdly: KHXD_JGM_DDLY,
      totalLhjpf: 0,
      totalBlpf: 0,
      totalPs: 0,
      totalNum: 0,
      isReload: false,
      isPrint: true
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
          this.data = this.mapData.map.data.list;
          this.totalLhjpf = this.mapData.map.data.totalLhjpf;
          this.totalBlpf = this.mapData.map.data.totalBlpf;
          this.totalPs = this.mapData.map.data.totalPs;
          this.totalNum = this.mapData.map.data.totalNum;
        }
      });
    },
    /** 查看详细信息 */
    viewInfo(row) {
      this.$store.dispatch('commonKhxdJgmJryxdIndex/' + GET_DATA_BY_BH, row.bh).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.showPrintPage(res.data.map.data);
        }
      });
    },
    /** 修改记录 */
    changeInfo(row) {
      this.$store.dispatch('commonKhxdJgmJryxdIndex/' + GET_DATA_BY_BH, row.bh).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.showEditPage(res.data.map.data);
        }
      });
    },
    /** 删除记录 */
    delInfo(row) {
      this.$store.dispatch('commonKhxdJgmJryxdIndex/' + DEL_DATA, row.bh).then(res => {
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
    /** 打印页面 */
    showPrintPage(data) {
      this.$refs.printModal.show(data, this.isReload, this.isPrint);
    },
    /** 编辑页面 */
    showEditPage(data) {
      this.$refs.editDataModal.show(data);
    }
  }
};
</script>
<style lang='less' scoped>

</style>
