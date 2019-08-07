<template lang='pug'>
  div.table-edit-suit-swing
    Button(@click="addSwingRow" :disabled="isUpdate" style="margin-bottom:5px;") 添加行
    Table(:columns="swingColumns" :data="swingDataList" size="small" border)
      template(slot="cz" slot-scope="{ row, index }")
        Select(v-model="row.cz" transfer=true v-if="editIndexSwing === index" @on-change="boardImport(row)")
          Option(v-for="item in boardInfo" :value="item.label" :key="item.value") {{ item.label }}
        span(v-else) {{ row.cz }}
      template(slot="zx" slot-scope="{ row, index }")
        Input(v-model="row.zx" v-if="editIndexSwing === index")
        span(v-else) {{ row.zx }}
      template(slot="ys" slot-scope="{ row, index }")
        Input(v-model="row.ys" v-if="editIndexSwing === index")
        span(v-else) {{ row.ys }}
      template(slot="mb" slot-scope="{ row, index }")
        Input(v-model="row.mb" v-if="editIndexSwing === index")
        span(v-else) {{ row.mb }}
      template(slot="yq" slot-scope="{ row, index }")
        Input(v-model="row.yq" v-if="editIndexSwing === index")
        span(v-else) {{ row.yq }}
      template(slot="qt" slot-scope="{ row, index }")
        Select(v-model="row.qt" transfer=true v-if="editIndexSwing === index" clearable)
          Option(v-for="item in qtType" :value="item.label" :key="item.value") {{ item.label }}
        span(v-else) {{ row.qt }}
      template(slot="kmlx" slot-scope="{ row, index }")
        Select(v-model="row.kmlx" transfer=true v-if="editIndexSwing === index" clearable)
          Option(v-for="item in kmlxType" :value="item.label" :key="item.value") {{ item.label }}
        span(v-else) {{ row.kmlx }}
      template(slot="mdgd" slot-scope="{ row, index }")
        Input(v-model="row.mdgd" v-if="editIndexSwing === index")
        span(v-else) {{ row.mdgd }}
      template(slot="mdkd" slot-scope="{ row, index }")
        Input(v-model="row.mdkd" v-if="editIndexSwing === index")
        span(v-else) {{ row.mdkd }}
      template(slot="mdhd" slot-scope="{ row, index }")
        Input(v-model="row.mdhd" v-if="editIndexSwing === index")
        span(v-else) {{ row.mdhd }}
      template(slot="msgd" slot-scope="{ row, index }")
        Input(v-model="row.msgd" v-if="editIndexSwing === index")
        span(v-else) {{ row.msgd }}
      template(slot="mskd" slot-scope="{ row, index }")
        Input(v-model="row.mskd" v-if="editIndexSwing === index")
        span(v-else) {{ row.mskd }}
      template(slot="mssl" slot-scope="{ row, index }")
        Input(v-model="row.mssl" v-if="editIndexSwing === index")
        span(v-else) {{ row.mssl }}
      template(slot="mtsl" slot-scope="{ row, index }")
        Input(v-model="row.mtsl" v-if="editIndexSwing === index")
        span(v-else) {{ row.mtsl }}
      template(slot="ts" slot-scope="{ row, index }")
        Input(v-model="row.ts" v-if="editIndexSwing === index" @on-change="computeMoney(row)")
        span(v-else) {{ row.ts }}
      template(slot="dj" slot-scope="{ row, index }")
        Input(v-model="row.dj" v-if="editIndexSwing === index" @on-change="computeMoney(row)")
        span(v-else) {{ row.dj }}
      template(slot="je" slot-scope="{ row, index }")
        Input(v-model="row.je" v-if="editIndexSwing === index")
        span(v-else) {{ row.je }}
      template(slot="bz" slot-scope="{ row, index }")
        Input(v-model="row.bz" v-if="editIndexSwing === index")
        span(v-else) {{ row.bz }}
      template(slot="action" slot-scope="{ row, index }")
        div(v-if="editIndexSwing === index")
          Button(@click="addSwingLastRow(row, index)" style="padding: 6px 4px;" type="text" :disabled="isUpdate")
            Icon(type="md-add")
          Poptip(@on-ok="delSwingRow(index)" confirm title="是否删除?" transfer)
            Button(style="padding: 6px 4px;" type="text" :disabled="isUpdate")
              Icon(type="md-close")
          Button(@click="editSwingComplete(row, index)" style="padding: 6px 4px;" type="text")
            Icon(type="md-checkmark")
        div(v-else)
          Button(@click="editSwingRow(index)" style="padding: 6px 4px;" type="text")
            Icon(type="md-create")
          Poptip(@on-ok="delSwingRow(index)" confirm title="是否删除?" transfer)
            Button(style="padding: 6px 4px;" type="text" :disabled="isUpdate")
              Icon(type="md-close")
    div(style="text-align:center;margin-top:15px")
      Button(v-if="!isSubmit" type="error" @click="submitData" ghost) 保存
      Button(v-else type="success" ghost) 已提交
</template>

<script>
import _ from 'lodash';
import { KHXD_TZM_SWING, KHXD_TZM_QT, KHXD_TZM_KMLX } from '@store/common/khxd/tzm/xjbd/module';
export default {
  props: ['boardInfo'],
  data () {
    return {
      swingDataList: [],
      swingData: {
        cz: '',
        zx: '',
        ys: '',
        mb: '',
        yq: '',
        qt: '',
        kmlx: '',
        mdgd: '',
        mdkd: '',
        mdhd: '',
        msgd: '',
        mskd: '',
        mssl: 1,
        mtsl: 3,
        ts: 1,
        dj: '',
        je: '',
        bz: ''
      },
      swingColumns: KHXD_TZM_SWING,
      qtType: KHXD_TZM_QT,
      kmlxType: KHXD_TZM_KMLX,
      orderStatus: 1,
      editIndexSwing: -1,
      editEnd: true,
      isSubmit: false,
      isUpdate: false
    };
  },
  methods: {
    /** ---------------------------平开门-------------------------- */
    /** 添加行 */
    addSwingRow() {
      this.swingDataList.push(this.swingData);
      this.editIndexSwing = this.swingDataList.length - 1;
      this.isSubmit = false;
    },
    /** 添加最后一条数据 */
    addSwingLastRow(row, index) {
      this.swingDataList[index] = _.cloneDeep(row);
      this.swingData.cz = row.cz;
      this.swingData.zx = row.zx;
      this.swingData.ys = row.ys;
      this.swingData.mb = row.mb;
      this.swingData.yq = row.yq;
      this.swingData.qt = row.qt;
      this.swingData.dj = row.dj;
      this.addSwingRow();
      this.isSubmit = false;
    },
    /** 编辑行 */
    editSwingRow(index) {
      this.editIndexSwing = index;
      this.editEnd = false;
      this.isSubmit = false;
    },
    /** 完成编辑 */
    editSwingComplete(row, index) {
      this.swingDataList[index] = _.cloneDeep(row);
      this.editIndexSwing = -1;
      this.editEnd = true;
      this.isSubmit = false;
    },
    /** 删除行 */
    delSwingRow(index) {
      this.swingDataList.splice(index, 1);
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
        pkmms: 0,
        pkmts: 0,
        hjmt: 0,
        je: 0.00
      };
      this.swingDataList.forEach((e) => {
        totalData.pkmms = parseFloat(e.mssl) * parseFloat(e.ts) + parseFloat(totalData.pkmms);
        totalData.hjmt = parseFloat(e.mtsl) * parseFloat(e.ts) + parseFloat(totalData.hjmt);
        totalData.pkmts = parseFloat(e.ts) + parseFloat(totalData.pkmts);
        totalData.je = parseFloat(e.je) + parseFloat(totalData.je);
      });
      this.$emit('computeTotalSwing', totalData);
    },
    /** 把数据返回父组件 */
    submitData() {
      if (!this.editEnd) {
        this.$Message.error('请完成编辑再保存');
      } else {
        this.isSubmit = true;
        this.computeTotal();
        this.$emit('submitDataSwing', this.swingDataList);
      }
    },
    /** 修改信息-传入原始数据 */
    showEdit(isUpdate, swingDataList) {
      this.isUpdate = !isUpdate;
      this.swingDataList = swingDataList;
    }
  }
};
</script>
<style lang='less' scope>
</style>
