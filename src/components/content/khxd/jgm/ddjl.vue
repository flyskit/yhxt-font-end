<template lang='pug'>
  div.khxd-jgm-ddjl
    printModal(ref="printModal")
    editDataModal(ref="editDataModal")
    span.breadcrumb-separator 编号：
    Input.input-small(v-model="data.bh" placeholder="输入编号" @on-change="doSelect")
    span.breadcrumb-separator 客户：
    Input.input-small(v-model="data.khxm" placeholder="输入客户姓名" @on-change="doSelect")
    span.breadcrumb-separator 下单类型：
    Select.select-small(v-model="data.xdlx" @on-change="doSelect" clearable transfer=true)
      Option(v-for="item in xdlx" :value="item.value" :key="item.value") {{ item.label }}
    span.breadcrumb-separator 订单来源：
    Select.select-small(v-model="data.ddly" @on-change="doSelect" clearable transfer=true)
      Option(v-for="item in ddly" :value="item.value" :key="item.value") {{ item.label }}
    Button(type="primary" icon="ios-search" @click="doSelect") 查询
    Page(:total="totalElement" @on-change="pageChange" show-total style="float:right;")
    pre
    div.khxd-jgm-ddjl-table
      Table(ref="selection" :columns="columns" :data="mapData" highlight-row border)
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
import { GET_DATA_BY_BH, DEL_DATA } from '@store/common/khxd/jgm/jryxd/index';
import { GET_DATA, GETTER_DATA, GETTER_TOTAL_ELEMENT } from '@store/common/khxd/jgm/ddjl/index';
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
        pageSize: 13,
        page: 1
      },
      xdlx: [
        {
          value: '0',
          label: '新订单'
        },
        {
          value: '1',
          label: '补单'
        },
        {
          value: '2',
          label: '返工重做'
        }
      ],
      ddly: [
        {
          value: '0',
          label: '线下'
        },
        {
          value: '1',
          label: '1688'
        }
      ],
      columns: JGM_XDXX_COLUMNS
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
    select() {
      this.$store.dispatch('commonKhxdJgmDdjlIndex/' + GET_DATA, {...this.data, page: this.page});
    },
    // 获取后台数据
    doSelect() {
      this.page.page = 1;
      this.select();
    },
    // 分页查询页
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
.breadcrumb-separator {
  color: #ff5500;
  padding: 0 5px;
}
</style>
