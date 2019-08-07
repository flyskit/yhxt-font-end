<template lang='pug'>
  div.table-edit-suit-hanging
    Button(@click="addHangingRow" :disabled="isUpdate" style="margin-bottom:5px;") 添加行
    Table(:columns="hangingColumns" :data="hangingDataList" size="small" border)
      template(slot="cz" slot-scope="{ row, index }")
        Select(v-model="row.cz" transfer=true v-if="editIndexHanging === index" @on-change="boardImport(row)")
          Option(v-for="item in boardInfo" :value="item.label" :key="item.value") {{ item.label }}
        span(v-else) {{ row.cz }}
      template(slot="zx" slot-scope="{ row, index }")
        Input(v-model="row.zx" v-if="editIndexHanging === index")
        span(v-else) {{ row.zx }}
      template(slot="ys" slot-scope="{ row, index }")
        Input(v-model="row.ys" v-if="editIndexHanging === index")
        span(v-else) {{ row.ys }}
      template(slot="mb" slot-scope="{ row, index }")
        Input(v-model="row.mb" v-if="editIndexHanging === index")
        span(v-else) {{ row.mb }}
      template(slot="yq" slot-scope="{ row, index }")
        Input(v-model="row.yq" v-if="editIndexHanging === index")
        span(v-else) {{ row.yq }}
      template(slot="qt" slot-scope="{ row, index }")
        Select(v-model="row.qt" transfer=true v-if="editIndexHanging === index" clearable)
          Option(v-for="item in qtType" :value="item.label" :key="item.value") {{ item.label }}
        span(v-else) {{ row.qt }}
      template(slot="tmlx" slot-scope="{ row, index }")
        Select(v-model="row.tmlx" transfer=true v-if="editIndexHanging === index" clearable)
          Option(v-for="item in tmlxType" :value="item.label" :key="item.value") {{ item.label }}
        span(v-else) {{ row.tmlx }}
      template(slot="tmwz" slot-scope="{ row, index }")
        Select(v-model="row.tmwz" transfer=true v-if="editIndexHanging === index" clearable)
          Option(v-for="item in tmwzType" :value="item.label" :key="item.value") {{ item.label }}
        span(v-else) {{ row.tmwz }}
      template(slot="bl" slot-scope="{ row, index }")
        Select(v-model="row.bl" transfer=true v-if="editIndexHanging === index" clearable)
          Option(v-for="item in blType" :value="item.label" :key="item.value") {{ item.label }}
        span(v-else) {{ row.bl }}
      template(slot="mdgd" slot-scope="{ row, index }")
        Input(v-model="row.mdgd" v-if="editIndexHanging === index")
        span(v-else) {{ row.mdgd }}
      template(slot="mdkd" slot-scope="{ row, index }")
        Input(v-model="row.mdkd" v-if="editIndexHanging === index")
        span(v-else) {{ row.mdkd }}
      template(slot="mdhd" slot-scope="{ row, index }")
        Input(v-model="row.mdhd" v-if="editIndexHanging === index")
        span(v-else) {{ row.mdhd }}
      template(slot="msgd" slot-scope="{ row, index }")
        Input(v-model="row.msgd" v-if="editIndexHanging === index")
        span(v-else) {{ row.msgd }}
      template(slot="mskd" slot-scope="{ row, index }")
        Input(v-model="row.mskd" v-if="editIndexHanging === index")
        span(v-else) {{ row.mskd }}
      template(slot="mssl" slot-scope="{ row, index }")
        Input(v-model="row.mssl" v-if="editIndexHanging === index")
        span(v-else) {{ row.mssl }}
      template(slot="mtsl" slot-scope="{ row, index }")
        Input(v-model="row.mtsl" v-if="editIndexHanging === index")
        span(v-else) {{ row.mtsl }}
      template(slot="ts" slot-scope="{ row, index }")
        Input(v-model="row.ts" v-if="editIndexHanging === index" @on-change="computeMoney(row)")
        span(v-else) {{ row.ts }}
      template(slot="dj" slot-scope="{ row, index }")
        Input(v-model="row.dj" v-if="editIndexHanging === index" @on-change="computeMoney(row)")
        span(v-else) {{ row.dj }}
      template(slot="je" slot-scope="{ row, index }")
        Input(v-model="row.je" v-if="editIndexHanging === index")
        span(v-else) {{ row.je }}
      template(slot="bz" slot-scope="{ row, index }")
        Input(v-model="row.bz" v-if="editIndexHanging === index")
        span(v-else) {{ row.bz }}
      template(slot="action" slot-scope="{ row, index }")
        div(v-if="editIndexHanging === index")
          Button(@click="addHangingLastRow(row, index)" style="padding: 6px 4px;" type="text" :disabled="isUpdate")
            Icon(type="md-add")
          Poptip(@on-ok="delHangingRow(index)" confirm title="是否删除?" transfer)
            Button(style="padding: 6px 4px;" type="text" :disabled="isUpdate")
              Icon(type="md-close")
          Button(@click="editHangingComplete(row, index)" style="padding: 6px 4px;" type="text")
            Icon(type="md-checkmark")
        div(v-else)
          Button(@click="editHangingRow(index)" style="padding: 6px 4px;" type="text")
            Icon(type="md-create")
          Poptip(@on-ok="delHangingRow(index)" confirm title="是否删除?" transfer)
            Button(style="padding: 6px 4px;" type="text" :disabled="isUpdate")
              Icon(type="md-close")
    div(style="text-align:center;margin-top:15px")
      Button(v-if="!isSubmit" type="error" @click="submitData" ghost) 保存
      Button(v-else type="success" ghost) 已提交
</template>

<script>
import _ from 'lodash';
import { KHXD_TZM_HANGING, KHXD_TZM_QT, KHXD_TZM_TMLX, KHXD_TZM_TMWZ, KHXD_TZM_BLLX } from '@store/common/khxd/tzm/xjbd/module';
export default {
  props: ['boardInfo'],
  data () {
    return {
      hangingDataList: [],
      hangingData: {
        cz: '',
        zx: '',
        ys: '',
        mb: '',
        yq: '',
        qt: '',
        tmlx: '',
        tmwz: '',
        bl: '',
        mdgd: '',
        mdkd: '',
        mdhd: '',
        msgd: '',
        mskd: '',
        mssl: 2,
        mtsl: 3,
        ts: 1,
        dj: '',
        je: '',
        bz: ''
      },
      hangingColumns: KHXD_TZM_HANGING,
      qtType: KHXD_TZM_QT,
      tmlxType: KHXD_TZM_TMLX,
      tmwzType: KHXD_TZM_TMWZ,
      blType: KHXD_TZM_BLLX,
      orderStatus: 1,
      editIndexHanging: -1,
      editEnd: true,
      isSubmit: false,
      isUpdate: false
    };
  },
  methods: {
    /** ---------------------------推门-------------------------- */
    /** 添加行 */
    addHangingRow() {
      this.hangingDataList.push(this.hangingData);
      this.editIndexHanging = this.hangingDataList.length - 1;
      this.isSubmit = false;
    },
    /** 添加最后一条数据 */
    addHangingLastRow(row, index) {
      this.hangingDataList[index] = _.cloneDeep(row);
      this.hangingData.cz = row.cz;
      this.hangingData.zx = row.zx;
      this.hangingData.ys = row.ys;
      this.hangingData.mb = row.mb;
      this.hangingData.yq = row.yq;
      this.hangingData.qt = row.qt;
      this.hangingData.dj = row.dj;
      this.addHangingRow();
      this.isSubmit = false;
    },
    /** 编辑行 */
    editHangingRow(index) {
      this.editIndexHanging = index;
      this.editEnd = false;
      this.isSubmit = false;
    },
    /** 完成编辑 */
    editHangingComplete(row, index) {
      this.hangingDataList[index] = _.cloneDeep(row);
      this.editIndexHanging = -1;
      this.editEnd = true;
      this.isSubmit = false;
    },
    /** 删除行 */
    delHangingRow(index) {
      this.hangingDataList.splice(index, 1);
      this.isSubmit = false;
    },
    /** ---------------------------总模块-------------------------- */
    /** 导入板材单价 */
    boardImport(row) {
      this.boardInfo.forEach((e) => {
        if (e.label === row.cz) {
          row.dj = e.bcdj;
          this.computeMoney(row);
        }
      });
    },
    /** 金额计算 */
    computeMoney(row) {
      row.je = parseFloat(row.ts) * parseFloat(row.dj);
    },
    /** 统计计算，回显到父组件 */
    computeTotal() {
      let totalData = {
        tmms: 0,
        tmts: 0,
        hjmt: 0,
        je: 0.00
      };
      this.hangingDataList.forEach((e) => {
        totalData.tmms = parseFloat(e.mssl) * parseFloat(e.ts) + parseFloat(totalData.tmms);
        totalData.hjmt = parseFloat(e.mtsl) * parseFloat(e.ts) + parseFloat(totalData.hjmt);
        totalData.tmts = parseFloat(e.ts) + parseFloat(totalData.tmts);
        totalData.je = parseFloat(e.je) + parseFloat(totalData.je);
      });
      this.$emit('computeTotalHanging', totalData);
    },
    /** 把数据返回父组件 */
    submitData() {
      if (!this.editEnd) {
        this.$Message.error('请完成编辑再保存');
      } else {
        this.isSubmit = true;
        this.computeTotal();
        this.$emit('submitDataHanging', this.hangingDataList);
      }
    },
    /** 修改信息-传入原始数据 */
    showEdit(isUpdate, hangingDataList) {
      this.isUpdate = !isUpdate;
      this.hangingDataList = hangingDataList;
    }
  }
};
</script>
<style lang='less' scope>

</style>
