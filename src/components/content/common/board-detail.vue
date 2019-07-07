<template lang='pug'>
  div.board-detail
    Modal(v-model="visible" width="70vw" @on-ok="ok" @on-cancel="ok")
      p(slot="header" style="color:#f60")
        Icon(type="ios-information-circle")
        span 板材管理
      div(class="edit")
        Form(ref="boardDetail" :model="boardDetail" :label-width="80" inline)
          FormItem(label="拉手名称" prop="mc")
            Input.input-small(v-model="boardDetail.mc" placeholder="输入材料名称")
          FormItem(label="编号" prop="bh")
            Input.input-small(v-model="boardDetail.bh" placeholder="输入编号")
          FormItem(label="单价" prop="dj")
            Input.input-small(v-model="boardDetail.dj" placeholder="输入单价")
          FormItem(label="规格" prop="gg")
            Input.input-small(v-model="boardDetail.gg" placeholder="输入规格")
          FormItem(label="备注" prop="bz")
            Input.input-small(v-model="boardDetail.bz" placeholder="输入备注")
          FormItem
            Button(type="primary" style="margin-right: 8px" @click="addBoard") 添加
            Button(@click="reset('boardDetail')") 重置
        Divider 拉手列表
        Table(:columns="boardColumns" :data="boardTable" size="small" border)
          template(slot="mc" slot-scope="{ row, index }")
            Input(v-model="row.mc" v-if="editIndex === index")
            span(v-else) {{ row.mc }}
          template(slot="bh" slot-scope="{ row, index }")
            Input(v-model="row.bh" v-if="editIndex === index")
            span(v-else) {{ row.bh }}
          template(slot="dj" slot-scope="{ row, index }")
            Input(v-model="row.dj" v-if="editIndex === index")
            span(v-else) {{ row.dj }}
          template(slot="gg" slot-scope="{ row, index }")
            Input(v-model="row.gg" v-if="editIndex === index")
            span(v-else) {{ row.gg }}
          template(slot="bz" slot-scope="{ row, index }")
            Input(v-model="row.bz" v-if="editIndex === index")
            span(v-else) {{ row.bz }}
          template(slot="action" slot-scope="{ row, index }")
            div(v-if="editIndex === index")
              Button(@click="updateBoard(row, index)" style="padding: 6px 4px;" type="text")
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
import { BOARD_COLUMNS } from '@store/common/khxd/ykl/xjbd/module';
import { ADD_BOARD, UPDATE_BOARD, DEL_BOARD, GET_BOARD_BY_TYPE, GETTER_BOARD_BY_TYPE } from '@store/common/common/index';
export default {
  inject: ['reload'],
  mixins: [mixin],
  data () {
    return {
      boardDetail: {
        splx: '',
        mc: '',
        bh: '',
        dj: '',
        gg: '',
        bz: ''
      },
      boardColumns: BOARD_COLUMNS,
      boardTable: [],
      editIndex: -1,
      editEnd: true,
      visible: false
    };
  },
  computed: {
    ...mapGetters({
      boardList: 'commonCommonIndex/' + GETTER_BOARD_BY_TYPE
    })
  },
  methods: {
    /** 显示 */
    show(lx) {
      this.boardDetail.splx = lx;
      this.getBoardList();
      this.visible = true;
    },
    /** 获取板材列表 */
    getBoardList() {
      this.$store.dispatch('commonCommonIndex/' + GET_BOARD_BY_TYPE, this.boardDetail.splx).then(() => {
        this.boardTable = _.cloneDeep(this.boardList);
        this.boardDetail.bh = parseInt(this.boardTable[this.boardTable.length - 1].bh) + 1;
      });
    },
    /** 添加板材信息 */
    addBoard() {
      this.$store.dispatch('commonCommonIndex/' + ADD_BOARD, this.boardDetail).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.$Notice.success({
            title: res.data.info
          });
          this.reset('boardDetail');
          this.getBoardList();
        }
      });
    },
    /** 删除拉手 */
    delRow(row) {
      this.$store.dispatch('commonCommonIndex/' + DEL_BOARD, row.id).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.$Notice.success({
            title: res.data.info
          });
          this.reset('boardDetail');
          this.getBoardList();
        }
      });
    },
    /** 编辑行 */
    editRow(index) {
      this.editIndex = index;
      this.editEnd = false;
    },
    /** 完成编辑-更新记录 */
    updateBoard(row, index) {
      // this.boardTable[index] = _.cloneDeep(row);
      this.$store.dispatch('commonCommonIndex/' + UPDATE_BOARD, this.defineProperty(row, '_index', '_rowKey')).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.$Notice.success({
            title: res.data.info
          });
          this.reset('boardDetail');
          this.getBoardList();
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
      this.reload();
      this.visible = false;
    }
  }
};
</script>
<style lang='less' scoped>

</style>
