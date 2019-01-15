<template lang='pug'>
  div.table-jgm-edit
    Button.operate-button(@click="addDiGui") 添加地柜
    Button.operate-button(@click="addDiaoGui") 添加吊柜
    Button.operate-button(@click="addData" style="float:right;") 添加订单
    Poptip(@on-ok="addData" confirm title="是否暂存?" style="float:right;" transfer)
      Button.operate-button 暂存订单
    Table(ref="myTable" border :columns="columns" size="small" :data="data")
      template(slot="cclx" slot-scope="props")
        Input.editjgm-table-input-style(v-model="props.row.cclx")
      template(slot="ls" slot-scope="props")
        Input.editjgm-table-input-style(v-model="props.row.ls")
      template(slot="ys" slot-scope="props")
        Input.editjgm-table-input-style(v-model="props.row.ys")
      template(slot="lhjgd" slot-scope="props")
        Input.editjgm-table-input-style(v-model="props.row.lhjgd" @on-change="computedPf(props.idx)")
      template(slot="lhjkd" slot-scope="props")
        Input.editjgm-table-input-style(v-model="props.row.lhjkd" @on-change="computedPf(props.idx)")
      template(slot="ps" slot-scope="props")
        Input.editjgm-table-input-style(v-model="props.row.ps" @on-change="computedPf(props.idx)")
      template(slot="lhjpf" slot-scope="props")
        Input.editjgm-table-input-style(v-model="props.row.lhjpf")
      template(slot="bz" slot-scope="props")
        Input.editjgm-table-input-style(v-model="props.row.bz")
      template(slot="action" slot-scope="props")
        Button( @click="addLastRow(props.idx)" style="padding: 6px 4px;" type="text")
          Icon(type="md-add")
        Poptip(@on-ok="delRow(props.idx)" confirm title="是否删除?" transfer)
          Button(style="padding: 6px 4px;" type="text")
            Icon(type="md-close")
</template>

<script>
export default {
  components: {

  },
  data () {
    return {
      act: false,
      data: [],
      tableData: {
        cclx: '',
        ls: '',
        ys: '',
        lhjgd: '',
        lhjkd: '',
        ps: '',
        lhjpf: '',
        bz: ''
      },
      cclx: '',
      ys: '',
      ls: '',
      columns: [
        {
          title: '尺寸类型',
          key: 'cclx',
          align: 'center',
          render: (h, params) => {
            this.data[params.index] = params.row;
            return h(
              'div',
              this.$refs.myTable.$scopedSlots.cclx({
                row: params.row,
                idx: params.row._index
              })
            );
          }
        },
        {
          title: '拉手',
          key: 'ls',
          align: 'center',
          render: (h, params) => {
            this.data[params.index] = params.row;
            return h(
              'div',
              this.$refs.myTable.$scopedSlots.ls({
                row: params.row,
                idx: params.row._index
              })
            );
          }
        },
        {
          title: '颜色',
          key: 'ys',
          align: 'center',
          render: (h, params) => {
            this.data[params.index] = params.row;
            return h(
              'div',
              this.$refs.myTable.$scopedSlots.ys({
                row: params.row,
                idx: params.row._index
              })
            );
          }
        },
        {
          title: '铝合金尺寸',
          key: 'lhjcc',
          align: 'center',
          children: [
            {
              title: '高度',
              key: 'lhjgd',
              align: 'center',
              render: (h, params) => {
                this.data[params.index] = params.row;
                return h(
                  'div',
                  this.$refs.myTable.$scopedSlots.lhjgd({
                    row: params.row,
                    idx: params.row._index
                  })
                );
              }
            },
            {
              title: '宽度',
              key: 'lhjkd',
              align: 'center',
              render: (h, params) => {
                this.data[params.index] = params.row;
                return h(
                  'div',
                  this.$refs.myTable.$scopedSlots.lhjkd({
                    row: params.row,
                    idx: params.row._index
                  })
                );
              }
            }
          ]
        },
        {
          title: '片数',
          key: 'ps',
          align: 'center',
          render: (h, params) => {
            this.data[params.index] = params.row;
            return h(
              'div',
              this.$refs.myTable.$scopedSlots.ps({
                row: params.row,
                idx: params.row._index
              })
            );
          }
        },
        {
          title: '铝合金平方',
          key: 'lhjpf',
          align: 'center',
          render: (h, params) => {
            this.data[params.index] = params.row;
            return h(
              'div',
              this.$refs.myTable.$scopedSlots.lhjpf({
                row: params.row,
                idx: params.row._index
              })
            );
          }
        },
        {
          title: '备注',
          key: 'bz',
          align: 'center',
          render: (h, params) => {
            this.data[params.index] = params.row;
            return h(
              'div',
              this.$refs.myTable.$scopedSlots.bz({
                row: params.row,
                idx: params.row._index
              })
            );
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h(
              'div',
              this.$refs.myTable.$scopedSlots.action({
                idx: params.row._index
              })
            );
          }
        }
      ]
    };
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    /** 删除行 */
    delRow(idx) {
      console.log(this.data);
      this.data.splice(idx, 1);
      this.$nextTick(() => {
        this.act = !this.act;
      });
    },
    /** 添加地柜 */
    addDiGui() {
      this.tableData.cclx = '地柜';
      this.addRow();
    },
    /** 添加吊柜 */
    addDiaoGui() {
      this.tableData.cclx = '吊柜';
      this.addRow();
    },
    /** 添加最后一条数据 */
    addLastRow(idx) {
      this.tableData.cclx = this.data[idx].cclx;
      this.tableData.ls = this.data[idx].ls;
      this.tableData.ys = this.data[idx].ys;
      this.addRow();
    },
    /** 计算平方 */
    computedPf(idx) {
      this.data[idx].lhjpf = (this.data[idx].lhjgd * 0.001 * this.data[idx].lhjkd * 0.001 * this.data[idx].ps).toFixed(3);
    },
    /** 添加行 */
    addRow() {
      this.data.push(this.tableData);
      this.$nextTick(() => {
        this.act = !this.act;
      });
    },
    /** 提交订单-把数据返回父组件 */
    addData() {
      if (this.data.length === 0) {
        this.$Message.info('请填写尺寸信息');
      } else {
        this.$emit('getTableData', this.data);
      }
    }
  }
};
</script>
<style lang='less' scoped>
.editjgm-table-input-style {
  border:none;
  overflow:hidden;
  // margin-left:-20%;
}
.operate-button {
  margin-right: 5px;
  margin-bottom: 5px;
  margin-top: -20px;
}
</style>
