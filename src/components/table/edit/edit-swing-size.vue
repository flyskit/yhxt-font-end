<template lang='pug'>
  div.table-edit-swing-size
    Button.operate-button(@click="addRow" :disabled="isUpdate") 添加行
    Button.operate-button(@click="updateData" type="success" style="float:right;" v-if="isUpdate") 修改订单
    Button.operate-button(@click="addData" type="success" style="float:right;" v-else) 添加订单
    Poptip(@on-ok="storageData" title="是否暂存?" style="float:right;" confirm transfer)
      Button.operate-button(:disabled="isUpdate" type="warning") 暂存订单
    Table(:columns="columns" :data="data" size="small" border)
      template(slot="lxys" slot-scope="{ row, index }")
        Select(v-model="row.lxys" transfer=true v-if="editIndex === index" @on-change="boardImport(row)")
          Option(v-for="item in boardInfo" :value="item.label" :key="item.value") {{ item.label }}
        span(v-else) {{ row.lxys }}
      template(slot="zx" slot-scope="{ row, index }")
        Input(v-model="row.zx" v-if="editIndex === index")
        span(v-else) {{ row.zx }}
      template(slot="bl" slot-scope="{ row, index }")
        Select(v-model="row.bl" transfer=true v-if="editIndex === index")
          Option(v-for="item in blType" :value="item.label" :key="item.value") {{ item.label }}
        span(v-else) {{ row.bl }}
      template(slot="fx" slot-scope="{ row, index }")
        Select(v-model="row.fx" transfer=true v-if="editIndex === index")
          Option(v-for="item in fxType" :value="item.label" :key="item.value") {{ item.label }}
        span(v-else) {{ row.fx }}
      template(slot="bd" slot-scope="{ row, index }")
        Select(v-model="row.bd" transfer=true v-if="editIndex === index")
          Option(v-for="item in bdType" :value="item.label" :key="item.value") {{ item.label }}
        span(v-else) {{ row.bd }}
      template(slot="gd" slot-scope="{ row, index }")
        Input(v-model="row.gd" v-if="editIndex === index")
        span(v-else) {{ row.gd }}
      template(slot="kd" slot-scope="{ row, index }")
        Input(v-model="row.kd" v-if="editIndex === index")
        span(v-else) {{ row.kd }}
      template(slot="hd" slot-scope="{ row, index }")
        Input(v-model="row.hd" v-if="editIndex === index")
        span(v-else) {{ row.hd }}
      template(slot="sl" slot-scope="{ row, index }")
        Input(v-model="row.sl" v-if="editIndex === index" @on-change="computeMoney(row)")
        span(v-else) {{ row.sl }}
      template(slot="bz" slot-scope="{ row, index }")
        Input(v-model="row.bz" v-if="editIndex === index")
        span(v-else) {{ row.bz }}
      template(slot="dj" slot-scope="{ row, index }")
        Input(v-model="row.dj" v-if="editIndex === index" @on-change="computeMoney(row)")
        span(v-else) {{ row.dj }}
      template(slot="je" slot-scope="{ row, index }")
        Input(v-model="row.je" v-if="editIndex === index")
        span(v-else) {{ row.je }}
      template(slot="action" slot-scope="{ row, index }")
        div(v-if="editIndex === index")
          Button(@click="addLastRow(row, index)" style="padding: 6px 4px;" type="text" :disabled="isUpdate")
            Icon(type="md-add")
          Poptip(@on-ok="delRow(index)" confirm title="是否删除?" transfer)
            Button(style="padding: 6px 4px;" type="text" :disabled="isUpdate")
              Icon(type="md-close")
          Button(@click="editComplete(row, index)" style="padding: 6px 4px;" type="text")
            Icon(type="md-checkmark")
        div(v-else)
          Button(@click="editRow(index)" style="padding: 6px 4px;" type="text")
            Icon(type="md-create")
          Poptip(@on-ok="delRow(index)" confirm title="是否删除?" transfer)
            Button(style="padding: 6px 4px;" type="text" :disabled="isUpdate")
              Icon(type="md-close")
</template>

<script>
import _ from 'lodash';
import { THJ_PKM, THJ_BLLX, THJ_PKM_FX, THJ_PKM_BD } from '@store/common/khxd/thjm/xjbd/module';
export default {
  props: ['boardInfo'],
  data () {
    return {
      data: [],
      tableData: {
        lxys: '',
        zx: '',
        bl: '',
        fx: '',
        bd: '',
        gd: '',
        kd: '',
        hd: '',
        sl: '',
        bz: '',
        dj: '',
        je: ''
      },
      columns: THJ_PKM,
      blType: THJ_BLLX,
      fxType: THJ_PKM_FX,
      bdType: THJ_PKM_BD,
      orderStatus: 1,
      editIndex: -1,
      editEnd: true,
      isUpdate: false
    };
  },
  methods: {
    /** 重新计算 */
    computeDataAgain() {
      let newData = _.cloneDeep(this.data);
      // 清空原有数据，重新渲染表格
      this.data = [];
      newData.forEach((e) => {
        this.data.push(e);
      });
      this.computeTotal();
    },
    /** 导入板材单价 */
    boardImport(row) {
      this.boardInfo.forEach((e) => {
        if (e.label === row.lxys) {
          row.dj = e.dj;
          this.computeMoney(row);
        }
      });
    },
    /** 金额计算 */
    computeMoney(row) {
      row.je = parseFloat(row.sl) * parseFloat(row.dj);
    },
    /** 添加行 */
    addRow() {
      this.computeTotal();
      this.data.push(this.tableData);
      this.editIndex = this.data.length - 1;
    },
    /** 添加最后一条数据 */
    addLastRow(row, index) {
      this.data[index] = _.cloneDeep(row);
      this.tableData.lx = row.lx;
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
      this.computeTotal();
      this.editIndex = -1;
      this.editEnd = true;
    },
    /** 统计计算，回显到父组件 */
    computeTotal() {
      let totalData = {
        hjpf: 0.00,
        hjje: 0.00,
        hjsl: 0
      };
      this.data.forEach((e) => {
        let pf = (e.gd * 0.001 * e.kd * 0.001 * e.sl).toFixed(3);
        totalData.hjpf = parseFloat(pf) + parseFloat(totalData.hjpf);
        totalData.hjsl = parseFloat(e.sl) + parseFloat(totalData.hjsl);
        totalData.hjje = parseFloat(e.je) + parseFloat(totalData.hjje);
      });
      this.$emit('computeTotal', totalData);
    },
    /** 删除行 */
    delRow(index) {
      this.data.splice(index, 1);
      this.computeTotal();
    },
    /** 提交订单 */
    addData() {
      this.orderStatus = 1;
      this.returnData();
    },
    /** 暂存订单 */
    storageData() {
      this.orderStatus = 0;
      this.returnData();
    },
    /** 把数据返回父组件 */
    returnData() {
      if (this.data.length === 0) {
        this.$Message.error('请填写尺寸信息');
      } else if (!this.editEnd) {
        this.$Message.error('请完成编辑再提交');
      } else {
        this.$emit('submitData', this.data, this.orderStatus);
      }
    },
    /** 修改信息-传入原始数据 */
    showEdit(data) {
      this.isUpdate = true;
      this.data = data;
    },
    /** 修改订单 */
    updateData() {
      if (!this.editEnd) {
        this.$Message.error('请完成编辑再提交');
      } else {
        this.$emit('submitData', this.data);
      }
    },
    /** 传入原始数据 */
    showSize(data) {
      this.data = data;
    }
  }
};
</script>
<style lang='less' scope>
.operate-button {
  margin-right: 5px;
  margin-bottom: 5px;
  margin-top: -20px;
}
.input-ls {
  width: 80px;
  padding: 0 10px 0px 0;
}
</style>
