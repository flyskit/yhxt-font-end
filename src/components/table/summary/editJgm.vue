<template lang='pug'>
  div.table-jgm-edit
    Button.operate-button(@click="addRow") 添加行
    Input.operate-button(v-model="kjcc" style="width:100px;" placeholder="玻璃扣减尺寸")
    Button.operate-button(@click="addData" style="float:right;") 添加订单
    Poptip(@on-ok="storageData" confirm title="是否暂存?" style="float:right;" transfer)
      Button.operate-button 暂存订单
    Table(border :columns="columns" size="small" :data="data")
      template(slot="cclx" slot-scope="{ row, index }")
        Select(v-model="row.cclx" clearable transfer=true v-if="editIndex === index")
          Option(v-for="item in cclxColumns" :value="item.value" :key="item.value") {{ item.label }}
        span(v-else) {{ row.cclx === 0 ? '地柜' : '吊柜' }}
      template(slot="ls" slot-scope="{ row, index }")
        Input(v-model="row.ls" v-if="editIndex === index")
        span(v-else) {{ row.ls }}
      template(slot="ys" slot-scope="{ row, index }")
        Input(v-model="row.ys" v-if="editIndex === index")
        span(v-else) {{ row.ys }}
      template(slot="lhjgd" slot-scope="{ row, index }")
        Input(v-model="row.lhjgd" v-if="editIndex === index" @on-change="computedPf(row)")
        span(v-else) {{ row.lhjgd }}
      template(slot="lhjkd" slot-scope="{ row, index }")
        Input(v-model="row.lhjkd" v-if="editIndex === index" @on-change="computedPf(row)")
        span(v-else) {{ row.lhjkd }}
      template(slot="ps" slot-scope="{ row, index }")
        Input(v-model="row.ps" v-if="editIndex === index" @on-change="computedPf(row)")
        span(v-else) {{ row.ps }}
      template(slot="lhjpf" slot-scope="{ row, index }")
        Input(v-model="row.lhjpf" v-if="editIndex === index")
        span(v-else) {{ row.lhjpf }}
      template(slot="bz" slot-scope="{ row, index }")
        Input(v-model="row.bz" v-if="editIndex === index")
        span(v-else) {{ row.bz }}
      template(slot="action" slot-scope="{ row, index }")
        div(v-if="editIndex === index")
          Button(@click="addLastRow(row, index)" style="padding: 6px 4px;" type="text")
            Icon(type="md-add")
          Poptip(@on-ok="delRow(index)" confirm title="是否删除?" transfer)
            Button(style="padding: 6px 4px;" type="text")
              Icon(type="md-close")
          Button(@click="editComplete(row, index)" style="padding: 6px 4px;" type="text")
            Icon(type="md-checkmark")
        div(v-else)
          Button(@click="editRow(index)" style="padding: 6px 4px;" type="text")
            Icon(type="md-create")
          Poptip(@on-ok="delRow(index)" confirm title="是否删除?" transfer)
            Button(style="padding: 6px 4px;" type="text")
              Icon(type="md-close")
</template>

<script>
import _ from 'lodash';
import { KHXD_JGM_CCLX } from '@store/common/khxd/jgm/xjbd/module';
export default {
  data () {
    return {
      data: [],
      tableData: {
        cclx: '',
        ls: '',
        ys: '',
        lhjgd: '',
        lhjkd: '',
        ps: '',
        lhjpf: '',
        bz: '',
        kjcc: '',
        blgd: '',
        blkd: '',
        blpf: ''
      },
      kjcc: '',
      editIndex: -1,
      editEnd: false,
      status: 0,
      cclxColumns: KHXD_JGM_CCLX,
      columns: [
        {
          title: '尺寸类型',
          align: 'center',
          slot: 'cclx'
        },
        {
          title: '拉手',
          align: 'center',
          slot: 'ls'
        },
        {
          title: '颜色',
          align: 'center',
          slot: 'ys'
        },
        {
          title: '铝合金尺寸',
          align: 'center',
          children: [
            {
              title: '高度',
              align: 'center',
              slot: 'lhjgd'
            },
            {
              title: '宽度',
              align: 'center',
              slot: 'lhjkd'
            }
          ]
        },
        {
          title: '片数',
          align: 'center',
          slot: 'ps'
        },
        {
          title: '铝合金平方',
          align: 'center',
          slot: 'lhjpf'
        },
        {
          title: '备注',
          align: 'center',
          slot: 'bz'
        },
        {
          title: '操作',
          align: 'center',
          slot: 'action'
        }
      ]
    };
  },
  methods: {
    /** 删除行 */
    delRow(index) {
      this.data.splice(index, 1);
    },
    /** 添加最后一条数据 */
    addLastRow(row, index) {
      this.data[index] = _.cloneDeep(row);
      this.tableData.cclx = row.cclx;
      this.tableData.ls = row.ls;
      this.tableData.ys = row.ys;
      this.addRow();
    },
    /** 编辑行 */
    editRow(index) {
      this.editIndex = index;
      this.editEnd = false;
    },
    /** 完成编辑 */
    editComplete(row, index) {
      this.data[index] = _.cloneDeep(row);
      this.editIndex = -1;
      this.editEnd = true;
    },
    /** 计算平方 */
    computedPf(row) {
      if (this.kjcc === '') {
        this.$Message.error('请输入玻璃扣减尺寸');
      } else {
        row.kjcc = this.kjcc;
        row.lhjpf = (row.lhjgd * 0.001 * row.lhjkd * 0.001 * row.ps).toFixed(3);
        row.blgd = row.lhjgd - this.kjcc;
        row.blkd = row.lhjkd - this.kjcc;
        row.blpf = (row.blgd * 0.001 * row.blkd * 0.001 * row.ps).toFixed(3);
      }
    },
    /** 添加行 */
    addRow() {
      this.data.push(this.tableData);
      this.editIndex = this.data.length - 1;
    },
    /** 提交订单 */
    addData() {
      this.status = 1;
      this.returnData();
    },
    /** 暂存订单 */
    storageData() {
      this.status = 0;
      this.returnData();
    },
    /** 把数据返回父组件 */
    returnData() {
      if (this.data.length === 0) {
        this.$Message.error('请填写尺寸信息');
      } else if (!this.editEnd) {
        this.$Message.error('请完成编辑再提交');
      } else {
        this.$emit('getTableData', this.data, this.status);
      }
    }
  }
};
</script>
<style lang='less' scoped>
.operate-button {
  margin-right: 5px;
  margin-bottom: 5px;
  margin-top: -20px;
}
</style>
