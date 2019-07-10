<template lang='pug'>
  div.khxd-jgm-ddjl
    printModal(ref="printModal")
    editDataModal(ref="editDataModal")
    div.khxd-jgm-ddjl-cond
      span.span-color 编号：
      Input.input-small(v-model="data.bh" placeholder="输入编号" @on-change="doSelect")
      span.span-color 客户：
      Input.input-small(v-model="data.khxm" placeholder="输入客户姓名" @on-change="doSelect")
      span.span-color 下单类型：
      Select.select-small(v-model="data.xdlx" @on-change="doSelect" clearable transfer=true)
        Option(v-for="item in typeDdlx" :value="item.value" :key="item.value") {{ item.label }}
      span.span-color 订单来源：
      Select.select-small(v-model="data.ddly" @on-change="doSelect" clearable transfer=true)
        Option(v-for="item in typeDdly" :value="item.value" :key="item.value") {{ item.label }}
      Button(type="primary" icon="ios-search" @click="doSelect") 查询
    pre
    div.khxd-jgm-ddjl-table
      Table(ref="selection" :row-class-name="rowClassName" :columns="columns" :data="mapData" size="small" highlight-row border)
        template(slot="scsl" slot-scope="{ row, index }")
          Button(size="small" v-if="row.scsl === 0") 普通
          Button(type="error" size="small" v-else) 加急
        template(slot="ddly" slot-scope="{ row, index }")
          span(v-for="index of typeDdly" v-if="row.ddly === index.value" :key="index.value") {{ index.label }}
        template(slot="xdlx" slot-scope="{ row, index }")
          span(v-for="index of typeDdlx" v-if="row.xdlx === index.value" :key="index.value") {{ index.label }}
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
    div(style="text-align:center;margin-top:10px;")
      Page(:total="totalElement" :page-size="page.pageSize" @on-change="pageChange" show-total)
</template>

<script>
import { mapGetters } from 'vuex';
import { JGM_XDXX_COLUMNS } from '@store/common/khxd/jgm/jryxd/module.js';
import { GET_DATA_BY_BH } from '@store/common/khxd/jgm/jryxd/index';
import { KHXD_JGM_XDLX, KHXD_JGM_DDLY } from '@store/common/khxd/jgm/xjbd/module.js';
import { GET_DATA, GETTER_DATA, GETTER_TOTAL_ELEMENT, DEL_DATA } from '@store/common/khxd/jgm/ddjl/index';
export default {
  inject: ['reload'],
  components: {
    'printModal': (resolve) => require(['./modal/print-data'], resolve),
    'editDataModal': (resolve) => require(['./modal/edit-data'], resolve)
  },
  data () {
    return {
      data: {
        bh: '', // 编号
        khxm: '', // 客户姓名
        xdlx: '', // 下单类型
        ddly: '' // 订单来源
      },
      page: {
        pageSize: 15,
        page: 1
      },
      typeDdlx: KHXD_JGM_XDLX,
      typeDdly: KHXD_JGM_DDLY,
      columns: JGM_XDXX_COLUMNS,
      nowDate: Date,
      outNum: 0
    };
  },
  computed: {
    ...mapGetters({
      mapData: 'commonKhxdJgmDdjlIndex/' + GETTER_DATA,
      totalElement: 'commonKhxdJgmDdjlIndex/' + GETTER_TOTAL_ELEMENT
    })
  },
  mounted() {
    this.doSelect();
  },
  methods: {
    /** 查询 */
    select() {
      /** 获取当前时间 */
      this.nowDate = new Date();
      this.$store.dispatch('commonKhxdJgmDdjlIndex/' + GET_DATA, {...this.data, page: this.page});
    },
    /** 初始重置页码，并查询 */
    doSelect() {
      this.page.page = 1;
      this.select();
    },
    /** 页码查询 */
    pageChange(value) {
      this.page.page = value;
      this.select();
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
    /** 更改记录 */
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
    delInfo(row, index) {
      // this.$store.dispatch('commonKhxdJgmDdjlIndex/' + DEL_DATA, row.bh).then(res => {
      //   if (res.data.status !== 200) {
      //     this.$Message.error(res.data.info);
      //   } else {
      //     this.$Notice.success({
      //       title: res.data.info
      //     });
      //     this.mapData.splice(index, 1);
      //   }
      // });
      this.$store.dispatch('commonKhxdJgmDdjlIndex/' + DEL_DATA, {param: row.bh, index: index});
    },
    /** 打印页面 */
    showPrintPage(data) {
      this.$refs.printModal.show(data, false, true);
    },
    /** 编辑页面 */
    showEditPage(data) {
      this.$refs.editDataModal.show(data);
    },
    /** 自定义表格行样式 */
    rowClassName(row, index) {
      /** 判断当前时间是否超过记录时间，超过那么特殊表示 */
      if (new Date(row.cjsj) < new Date(this.nowDate)) {
        return 'demo-table-error-row';
      }
      return '';
    }
  }
};
</script>
<style lang='less'>
.ivu-table .demo-table-error-row td {
  color: red;
}
</style>
