<template lang='pug'>
  div.table-edit-wardrobe-slide-size
    Button.operate-button(@click="addRow" :disabled="isUpdate") 添加行
    Button.operate-button(@click="updateData" type="success" style="float:right;" v-if="isUpdate") 修改订单
    Button.operate-button(@click="addData" type="success" style="float:right;" v-else) 添加订单
    Poptip(@on-ok="storageData" title="是否暂存?" style="float:right;" confirm transfer)
      Button.operate-button(:disabled="isUpdate" type="warning") 暂存订单
    Table(:columns="columns" :data="data" size="small" border)
      template(slot="cz" slot-scope="{ row, index }")
        Select(v-model="row.cz" transfer=true v-if="editIndex === index" @on-change="boardImport(row)")
          Option(v-for="item in boardInfo" :value="item.label" :key="item.value") {{ item.label }}
        span(v-else) {{ row.cz }}
      template(slot="zx" slot-scope="{ row, index }")
        Input(v-model="row.zx" v-if="editIndex === index")
        span(v-else) {{ row.zx }}
      template(slot="ys" slot-scope="{ row, index }")
        Input(v-model="row.ys" v-if="editIndex === index")
        span(v-else) {{ row.ys }}
      template(slot="bkxz" slot-scope="{ row, index }")
        Select(v-model="row.bkxz" transfer=true v-if="editIndex === index" @on-change="boardShapeImport(row)")
          Option(v-for="item in boardShapeInfo" :value="item.label" :key="item.value") {{ item.label }}
        span(v-else) {{ row.bkxz }}
      template(slot="bkkd" slot-scope="{ row, index }")
        Input(v-model="row.bkkd" v-if="editIndex === index" @on-change="computeSize(row)")
        span(v-else) {{ row.bkkd }}
      template(slot="nkgd" slot-scope="{ row, index }")
        Input(v-model="row.nkgd" v-if="editIndex === index" @on-change="computeSize(row)")
        span(v-else) {{ row.nkgd }}
      template(slot="nkkd" slot-scope="{ row, index }")
        Input(v-model="row.nkkd" v-if="editIndex === index" @on-change="computeSize(row)")
        span(v-else) {{ row.nkkd }}
      template(slot="pf" slot-scope="{ row, index }")
        Input(v-model="row.pf" v-if="editIndex === index"  @on-change="computeMoney(row)")
        span(v-else) {{ row.pf }}
      template(slot="mssl" slot-scope="{ row, index }")
        Input(v-model="row.mssl" v-if="editIndex === index" @on-change="computeSize(row)")
        span(v-else) {{ row.mssl }}
      template(slot="sf" slot-scope="{ row, index }")
        Input(v-model="row.sf" v-if="editIndex === index"  @on-change="computeSize(row)")
        span(v-else) {{ row.sf }}
      template(slot="sxf" slot-scope="{ row, index }")
        Input(v-model="row.sxf" v-if="editIndex === index")
        span(v-else) {{ row.sxf }}
      template(slot="xbgd" slot-scope="{ row, index }")
        Input(v-model="row.xbgd" v-if="editIndex === index")
        span(v-else) {{ row.xbgd }}
      template(slot="xbkd" slot-scope="{ row, index }")
        Input(v-model="row.xbkd" v-if="editIndex === index")
        span(v-else) {{ row.xbkd }}
      template(slot="xbpf" slot-scope="{ row, index }")
        Input(v-model="row.xbpf" v-if="editIndex === index")
        span(v-else) {{ row.xbpf }}
      template(slot="msgd" slot-scope="{ row, index }")
        Input(v-model="row.msgd" v-if="editIndex === index")
        span(v-else) {{ row.msgd }}
      template(slot="mskd" slot-scope="{ row, index }")
        Input(v-model="row.mskd" v-if="editIndex === index")
        span(v-else) {{ row.mskd }}
      template(slot="dj" slot-scope="{ row, index }")
        Input(v-model="row.dj" v-if="editIndex === index" @on-change="computeMoney(row)")
        span(v-else) {{ row.dj }}
      template(slot="ts" slot-scope="{ row, index }")
        InputNumber(v-model="row.ts" v-if="editIndex === index" :min="1"  @on-change="computeMoney(row)")
        span(v-else) {{ row.ts }}
      template(slot="je" slot-scope="{ row, index }")
        Input(v-model="row.je" v-if="editIndex === index")
        span(v-else) {{ row.je }}
      template(slot="bz" slot-scope="{ row, index }")
        Input(v-model="row.bz" v-if="editIndex === index")
        span(v-else) {{ row.bz }}
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
import { KHXD_YGM_CCXX, KHXD_YGM_BKKD } from '@store/common/khxd/ygm/xjbd/module';
export default {
  props: ['boardInfo', 'boardShapeInfo'],
  data () {
    return {
      data: [],
      tableData: {
        cz: '',
        zx: '',
        ys: '',
        bkxz: '',
        bkkd: '',
        nkgd: '',
        nkkd: '',
        pf: '',
        mssl: '',
        sf: '',
        sxf: '',
        xbgd: '',
        xbkd: '',
        xbpf: '',
        msgd: '',
        mskd: '',
        dj: '',
        ts: 1,
        je: '',
        bz: ''
      },
      columns: KHXD_YGM_CCXX,
      bkkdType: KHXD_YGM_BKKD,
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
        if (e.label === row.cz) {
          row.dj = e.dj;
          this.computeMoney(row);
        }
      });
    },
    /** 导入边框类型 */
    boardShapeImport(row) {
      this.boardShapeInfo.forEach((e) => {
        if (e.label === row.bkxz) {
          row.bkkd = e.kd;
          this.computeSize(row);
        }
      });
    },
    /** 金额计算 */
    computeMoney(row) {
      row.je = (parseFloat(row.ts) * parseFloat(row.dj) * parseFloat(row.pf)).toFixed(1);
    },
    /** 尺寸计算 */
    computeSize(row) {
      row.sf = Math.floor(parseFloat(row.nkgd) - 35);
      row.sxf = Math.floor((parseFloat(row.nkkd) - parseFloat(row.bkkd) * (parseFloat(row.mssl) + 1)) / parseFloat(row.mssl));
      row.xbgd = parseFloat(row.sf) - 60;
      row.xbkd = parseFloat(row.sxf) + 14;
      row.xbpf = (row.xbgd * 0.001 * row.xbkd * 0.001 * row.mssl).toFixed(3);
      row.pf = (row.nkgd * 0.001 * row.nkkd * 0.001).toFixed(3);
      row.msgd = parseFloat(row.sf) + 30;
      row.mskd = parseFloat(row.sxf) + 16;
      this.computeMoney(row);
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
        xbpf: 0.00,
        hjje: 0.00,
        hjsl: 0
      };
      this.data.forEach((e) => {
        totalData.hjpf = parseFloat(e.pf) + parseFloat(totalData.hjpf);
        totalData.xbpf = parseFloat(e.xbpf) + parseFloat(totalData.xbpf);
        totalData.hjsl = parseFloat(e.mssl) * parseFloat(e.ts) + parseFloat(totalData.hjsl);
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
