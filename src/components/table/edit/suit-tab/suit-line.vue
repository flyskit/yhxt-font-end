<template lang='pug'>
  div.table-edit-suit-line
    Button(@click="addLineRow" :disabled="isUpdate" style="margin-bottom:5px;") 添加行
    Table(:columns="lineColumns" :data="lineDataList" size="small" border)
      template(slot="cz" slot-scope="{ row, index }")
        Select(v-model="row.cz" transfer=true v-if="editIndexLine === index")
          Option(v-for="item in boardInfo" :value="item.label" :key="item.value") {{ item.label }}
        span(v-else) {{ row.cz }}
      template(slot="zx" slot-scope="{ row, index }")
        Input(v-model="row.zx" v-if="editIndexLine === index")
        span(v-else) {{ row.zx }}
      template(slot="lb" slot-scope="{ row, index }")
        Select(v-model="row.lb" transfer=true v-if="editIndexLine === index" clearable)
          Option(v-for="item in xtType" :value="item.label" :key="item.value") {{ item.label }}
        span(v-else) {{ row.lb }}
      template(slot="ys" slot-scope="{ row, index }")
        Input(v-model="row.ys" v-if="editIndexLine === index")
        span(v-else) {{ row.ys }}
      template(slot="mb" slot-scope="{ row, index }")
        Input(v-model="row.mb" v-if="editIndexLine === index")
        span(v-else) {{ row.mb }}
      template(slot="yq" slot-scope="{ row, index }")
        Input(v-model="row.yq" v-if="editIndexLine === index")
        span(v-else) {{ row.yq }}
      template(slot="gg" slot-scope="{ row, index }")
        Input(v-model="row.gg" v-if="editIndexLine === index")
        span(v-else) {{ row.gg }}
      template(slot="ts" slot-scope="{ row, index }")
        Input(v-model="row.ts" v-if="editIndexLine === index" @on-change="computeMoney(row)")
        span(v-else) {{ row.ts }}
      template(slot="dj" slot-scope="{ row, index }")
        Input(v-model="row.dj" v-if="editIndexLine === index" @on-change="computeMoney(row)")
        span(v-else) {{ row.dj }}
      template(slot="je" slot-scope="{ row, index }")
        Input(v-model="row.je" v-if="editIndexLine === index")
        span(v-else) {{ row.je }}
      template(slot="bz" slot-scope="{ row, index }")
        Input(v-model="row.bz" v-if="editIndexLine === index")
        span(v-else) {{ row.bz }}
      template(slot="action" slot-scope="{ row, index }")
        div(v-if="editIndexLine === index")
          Button(@click="addLineLastRow(row, index)" style="padding: 6px 4px;" type="text" :disabled="isUpdate")
            Icon(type="md-add")
          Poptip(@on-ok="delLineRow(index)" confirm title="是否删除?" transfer)
            Button(style="padding: 6px 4px;" type="text" :disabled="isUpdate")
              Icon(type="md-close")
          Button(@click="editLineComplete(row, index)" style="padding: 6px 4px;" type="text")
            Icon(type="md-checkmark")
        div(v-else)
          Button(@click="editLineRow(index)" style="padding: 6px 4px;" type="text")
            Icon(type="md-create")
          Poptip(@on-ok="delLineRow(index)" confirm title="是否删除?" transfer)
            Button(style="padding: 6px 4px;" type="text" :disabled="isUpdate")
              Icon(type="md-close")
    div(style="text-align:center;margin-top:15px")
      Button(v-if="!isSubmit" type="error" @click="submitData" ghost) 保存
      Button(v-else type="success" ghost) 已提交
</template>

<script>
import _ from 'lodash';
import { KHXD_TZM_LINE, KHXD_TZM_XTLB } from '@store/common/khxd/tzm/xjbd/module';
export default {
  props: ['boardInfo'],
  data () {
    return {
      lineDataList: [],
      lineData: {
        cz: '',
        zx: '',
        lb: '',
        ys: '',
        mb: '',
        yq: '',
        gg: '',
        ts: 1,
        dj: 0,
        je: 0,
        bz: ''
      },
      lineColumns: KHXD_TZM_LINE,
      xtType: KHXD_TZM_XTLB,
      orderStatus: 1,
      editIndexLine: -1,
      editEnd: true,
      isSubmit: false,
      isUpdate: false
    };
  },
  methods: {
    /** ---------------------------线条-------------------------- */
    /** 添加行 */
    addLineRow() {
      this.lineDataList.push(this.lineData);
      this.editIndexLine = this.lineDataList.length - 1;
      this.isSubmit = false;
    },
    /** 添加最后一条数据 */
    addLineLastRow(row, index) {
      this.lineDataList[index] = _.cloneDeep(row);
      this.lineData.cz = row.cz;
      this.lineData.zx = row.zx;
      this.lineData.lb = row.lb;
      this.lineData.ys = row.ys;
      this.lineData.mb = row.mb;
      this.lineData.yq = row.yq;
      this.lineData.dj = row.dj;
      this.addLineRow();
      this.isSubmit = false;
    },
    /** 编辑行 */
    editLineRow(index) {
      this.editIndexLine = index;
      this.editEnd = false;
      this.isSubmit = false;
    },
    /** 完成编辑 */
    editLineComplete(row, index) {
      this.lineDataList[index] = _.cloneDeep(row);
      this.editIndexLine = -1;
      this.editEnd = true;
      this.isSubmit = false;
    },
    /** 删除行 */
    delLineRow(index) {
      this.lineDataList.splice(index, 1);
      this.isSubmit = false;
    },
    /** ---------------------------总模块-------------------------- */
    /** 金额计算 */
    computeMoney(row) {
      row.je = parseFloat(row.ts) * parseFloat(row.dj);
    },
    /** 统计计算，回显到父组件 */
    computeTotal() {
      let totalData = {
        hjxt: 0,
        je: 0.00
      };
      this.lineDataList.forEach((e) => {
        totalData.hjxt = parseFloat(e.ts) + parseFloat(totalData.hjxt);
        totalData.je = parseFloat(e.je) + parseFloat(totalData.je);
      });
      this.$emit('computeTotalLine', totalData);
    },
    /** 把数据返回父组件 */
    submitData() {
      if (!this.editEnd) {
        this.$Message.error('请完成编辑再保存');
      } else {
        this.isSubmit = true;
        this.computeTotal();
        this.$emit('submitDataLine', this.lineDataList);
      }
    },
    /** 修改信息-传入原始数据 */
    showEdit(isUpdate, lineDataList) {
      this.isUpdate = !isUpdate;
      this.lineDataList = lineDataList;
    }
  }
};
</script>
<style lang='less' scope>

</style>
