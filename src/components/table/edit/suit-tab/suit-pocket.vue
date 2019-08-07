<template lang='pug'>
  div.table-edit-suit-pocket
    Button(@click="addPocketRow" :disabled="isUpdate" style="margin-bottom:5px;") 添加行
    Table(:columns="pocketColumns" :data="pocketDataList" size="small" border)
      template(slot="cz" slot-scope="{ row, index }")
        Select(v-model="row.cz" transfer=true v-if="editIndexPocket === index")
          Option(v-for="item in boardInfo" :value="item.label" :key="item.value") {{ item.label }}
        span(v-else) {{ row.cz }}
      template(slot="zx" slot-scope="{ row, index }")
        Input(v-model="row.zx" v-if="editIndexPocket === index")
        span(v-else) {{ row.zx }}
      template(slot="lb" slot-scope="{ row, index }")
        Input(v-model="row.lb" v-if="editIndexPocket === index")
        span(v-else) {{ row.lb }}
      template(slot="ys" slot-scope="{ row, index }")
        Input(v-model="row.ys" v-if="editIndexPocket === index")
        span(v-else) {{ row.ys }}
      template(slot="mb" slot-scope="{ row, index }")
        Input(v-model="row.mb" v-if="editIndexPocket === index")
        span(v-else) {{ row.mb }}
      template(slot="yq" slot-scope="{ row, index }")
        Input(v-model="row.yq" v-if="editIndexPocket === index")
        span(v-else) {{ row.yq }}
      template(slot="gd" slot-scope="{ row, index }")
        Input(v-model="row.gd" v-if="editIndexPocket === index" @on-change="computeMoney(row)")
        span(v-else) {{ row.gd }}
      template(slot="kd" slot-scope="{ row, index }")
        Input(v-model="row.kd" v-if="editIndexPocket === index" @on-change="computeMoney(row)")
        span(v-else) {{ row.kd }}
      template(slot="hd" slot-scope="{ row, index }")
        Input(v-model="row.hd" v-if="editIndexPocket === index")
        span(v-else) {{ row.hd }}
      template(slot="mtsl" slot-scope="{ row, index }")
        Input(v-model="row.mtsl" v-if="editIndexPocket === index")
        span(v-else) {{ row.mtsl }}
      template(slot="ts" slot-scope="{ row, index }")
        Input(v-model="row.ts" v-if="editIndexPocket === index" @on-change="computeMoney(row)")
        span(v-else) {{ row.ts }}
      template(slot="dj" slot-scope="{ row, index }")
        Input(v-model="row.dj" v-if="editIndexPocket === index" @on-change="computeMoney(row)")
        span(v-else) {{ row.dj }}
      template(slot="je" slot-scope="{ row, index }")
        Input(v-model="row.je" v-if="editIndexPocket === index")
        span(v-else) {{ row.je }}
      template(slot="bz" slot-scope="{ row, index }")
        Input(v-model="row.bz" v-if="editIndexPocket === index")
        span(v-else) {{ row.bz }}
      template(slot="action" slot-scope="{ row, index }")
        div(v-if="editIndexPocket === index")
          Button(@click="addPocketLastRow(row, index)" style="padding: 6px 4px;" type="text" :disabled="isUpdate")
            Icon(type="md-add")
          Poptip(@on-ok="delPocketRow(index)" confirm title="是否删除?" transfer)
            Button(style="padding: 6px 4px;" type="text" :disabled="isUpdate")
              Icon(type="md-close")
          Button(@click="editPocketComplete(row, index)" style="padding: 6px 4px;" type="text")
            Icon(type="md-checkmark")
        div(v-else)
          Button(@click="editPocketRow(index)" style="padding: 6px 4px;" type="text")
            Icon(type="md-create")
          Poptip(@on-ok="delPocketRow(index)" confirm title="是否删除?" transfer)
            Button(style="padding: 6px 4px;" type="text" :disabled="isUpdate")
              Icon(type="md-close")
    div(style="text-align:center;margin-top:15px")
      Button(v-if="!isSubmit" type="error" @click="submitData" ghost) 保存
      Button.operate-button-down(v-else type="success" ghost) 已提交
</template>

<script>
import _ from 'lodash';
import { KHXD_TZM_POCKET } from '@store/common/khxd/tzm/xjbd/module';
export default {
  props: ['boardInfo'],
  data () {
    return {
      pocketDataList: [],
      pocketData: {
        cz: '',
        zx: '',
        lb: '',
        ys: '',
        mb: '',
        yq: '',
        gd: '',
        kd: '',
        hd: '',
        mtsl: 3,
        ts: 1,
        dj: 0,
        je: '',
        bz: ''
      },
      pocketColumns: KHXD_TZM_POCKET,
      orderStatus: 1,
      editIndexPocket: -1,
      editEnd: true,
      isSubmit: false,
      isUpdate: false
    };
  },
  methods: {
    /** ---------------------------空套-------------------------- */
    /** 添加行 */
    addPocketRow() {
      this.pocketDataList.push(this.pocketData);
      this.editIndexPocket = this.pocketDataList.length - 1;
      this.isSubmit = false;
    },
    /** 添加最后一条数据 */
    addPocketLastRow(row, index) {
      this.pocketDataList[index] = _.cloneDeep(row);
      this.pocketData.cz = row.cz;
      this.pocketData.zx = row.zx;
      this.pocketData.lb = row.lb;
      this.pocketData.ys = row.ys;
      this.pocketData.mb = row.mb;
      this.pocketData.yq = row.yq;
      this.pocketData.dj = row.dj;
      this.addPocketRow();
      this.isSubmit = false;
    },
    /** 编辑行 */
    editPocketRow(index) {
      this.editIndexPocket = index;
      this.editEnd = false;
      this.isSubmit = false;
    },
    /** 完成编辑 */
    editPocketComplete(row, index) {
      this.pocketDataList[index] = _.cloneDeep(row);
      this.editIndexPocket = -1;
      this.editEnd = true;
      this.isSubmit = false;
    },
    /** 删除行 */
    delPocketRow(index) {
      this.pocketDataList.splice(index, 1);
      this.isSubmit = false;
    },
    /** ---------------------------总模块-------------------------- */
    /** 金额计算 */
    computeMoney(row) {
      row.je = Math.ceil(parseFloat(row.ts) * parseFloat(row.dj) * (parseFloat(row.gd) * 2 * 0.001 + parseFloat(row.kd) * 0.001));
    },
    /** 统计计算，回显到父组件 */
    computeTotal() {
      let totalData = {
        hjmt: 0,
        je: 0.00
      };
      this.pocketDataList.forEach((e) => {
        totalData.hjmt = parseFloat(e.mtsl) * parseFloat(e.ts) + parseFloat(totalData.hjmt);
        totalData.je = parseFloat(e.je) + parseFloat(totalData.je);
      });
      this.$emit('computeTotalPocket', totalData);
    },
    /** 把数据返回父组件 */
    submitData() {
      if (!this.editEnd) {
        this.$Message.error('请完成编辑再提交');
      } else {
        this.isSubmit = true;
        this.computeTotal();
        this.$emit('submitDataPocket', this.pocketDataList);
      }
    },
    /** 修改信息-传入原始数据 */
    showEdit(isUpdate, pocketDataList) {
      this.isUpdate = !isUpdate;
      this.pocketDataList = pocketDataList;
    }
  }
};
</script>
<style lang='less' scope>
</style>
