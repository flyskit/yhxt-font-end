<template lang='pug'>
  div.khxd-jgm-handle-detail
    Modal(v-model="visible" width="70vw" @on-ok="ok" @on-cancel="ok")
      p(slot="header" style="color:#f60")
        Icon(type="ios-information-circle")
        span 拉手管理
      div(class="edit")
        Form(ref="handleDetail" :model="handleDetail" :label-width="80" inline)
          FormItem(label="拉手名称" prop="mc")
            Input.input-small(v-model="handleDetail.mc" placeholder="输入拉手名称")
          FormItem(label="高度" prop="gd")
            Input.input-small(v-model="handleDetail.gd" placeholder="输入高度")
          FormItem(label="宽度" prop="kd")
            Input.input-small(v-model="handleDetail.kd" placeholder="输入宽度")
          FormItem(label="单价" prop="dj")
            Input.input-small(v-model="handleDetail.dj" placeholder="输入单价")
          FormItem(label="备注" prop="bz")
            Input.input-small(v-model="handleDetail.bz" placeholder="输入备注")
          FormItem
            Button(type="primary" style="margin-right: 8px" @click="addHandle") 添加
            Button(@click="reset('handleDetail')") 重置
        Divider 拉手列表
        Table(:columns="handleColumns" :data="handleTable" size="small" border)
          template(slot="mc" slot-scope="{ row, index }")
            Input(v-model="row.mc" v-if="editIndex === index")
            span(v-else) {{ row.mc }}
          template(slot="gd" slot-scope="{ row, index }")
            Input(v-model="row.gd" v-if="editIndex === index")
            span(v-else) {{ row.gd }}
          template(slot="kd" slot-scope="{ row, index }")
            Input(v-model="row.kd" v-if="editIndex === index")
            span(v-else) {{ row.kd }}
          template(slot="dj" slot-scope="{ row, index }")
            Input(v-model="row.dj" v-if="editIndex === index")
            span(v-else) {{ row.dj }}
          template(slot="bz" slot-scope="{ row, index }")
            Input(v-model="row.bz" v-if="editIndex === index")
            span(v-else) {{ row.bz }}
          template(slot="action" slot-scope="{ row, index }")
            div(v-if="editIndex === index")
              Button(@click="updateHandle(row, index)" style="padding: 6px 4px;" type="text")
                Icon(type="md-checkmark")
              Poptip(@on-ok="delRow(row)" confirm title="是否删除?" transfer)
                Button(style="padding: 6px 4px;" type="text")
                  Icon(type="md-close")
            div(v-else)
              Button(@click="editRow(index)" style="padding: 6px 4px;" type="text")
                Icon(type="md-create")
              Poptip(@on-ok="delRow(row)" confirm title="是否删除?" transfer)
                Button(style="padding: 6px 4px;" type="text")
                  Icon(type="md-close")
      div(slot="footer")
        Button(@click="ok") 关闭
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';
import { mixin } from '@component/mixins/mixin';
import { HANDLE_COLUMNS } from '@store/common/khxd/jgm/xjbd/module';
import { ADD_HANDLE, UPDATE_HANDLE, DEL_HANDLE, GET_LS, GETTER_LS } from '@store/common/khxd/jgm/xjbd/index';
export default {
  mixins: [mixin],
  data () {
    return {
      handleDetail: {
        lx: '',
        mc: '',
        gd: '',
        kd: '',
        dj: '',
        bz: ''
      },
      handleColumns: HANDLE_COLUMNS,
      handleTable: [],
      visible: false,
      editIndex: -1,
      editEnd: true
    };
  },
  computed: {
    ...mapGetters({
      handleList: 'commonKhxdJgmXjbdIndex/' + GETTER_LS
    })
  },
  methods: {
    /** 显示 */
    show(lx) {
      this.handleDetail.lx = lx;
      this.getHandleList();
      this.visible = true;
    },
    /** 获取拉手列表 */
    getHandleList() {
      this.$store.dispatch('commonKhxdJgmXjbdIndex/' + GET_LS, this.handleDetail.lx).then(() => {
        this.handleTable = _.cloneDeep(this.handleList);
      });
    },
    /** 添加拉手 */
    addHandle() {
      this.$store.dispatch('commonKhxdJgmXjbdIndex/' + ADD_HANDLE, this.handleDetail).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.$Notice.success({
            title: res.data.info
          });
          this.reset('handleDetail');
          this.getHandleList();
        }
      });
    },
    /** 删除拉手 */
    delRow(row) {
      this.$store.dispatch('commonKhxdJgmXjbdIndex/' + DEL_HANDLE, row.id).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.$Notice.success({
            title: res.data.info
          });
          this.reset('handleDetail');
          this.getHandleList();
        }
      });
    },
    /** 编辑行 */
    editRow(index) {
      this.editIndex = index;
      this.editEnd = false;
    },
    /** 完成编辑-更新记录 */
    updateHandle(row, index) {
      this.handleTable[index] = _.cloneDeep(row);
      this.$store.dispatch('commonKhxdJgmXjbdIndex/' + UPDATE_HANDLE, this.defineProperty(row, '_index', '_rowKey')).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.$Notice.success({
            title: res.data.info
          });
          this.reset('handleDetail');
          this.getHandleList();
        }
      });
      this.editIndex = -1;
      this.editEnd = true;
    },
    /** 重置 */
    reset(name) {
      this.$refs[name].resetFields();
    },
    /** 关闭 */
    ok() {
      this.reset('handleDetail');
      this.visible = false;
    }
  }
};
</script>
<style lang='less' scoped>

</style>
