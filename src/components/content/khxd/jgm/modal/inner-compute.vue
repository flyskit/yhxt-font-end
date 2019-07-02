<template lang='pug'>
  div.khxd-jgm-inner-compute
    Modal(v-model="visible" width="70vw" @on-ok="ok" @on-cancel="ok")
      p(slot="header" style="color:#f60")
        Icon(type="ios-information-circle")
        span 内框计算
      div(class="edit")
        Table(:columns="computeColumns" :data="computeDetail" size="small" border)
          template(slot="lx" slot-scope="{ row, index }")
            Select(v-model="row.lx" transfer=true @on-change="change(row)")
              Option(v-for="item in typeColumns" :value="item.value" :key="item.value") {{ item.label }}
          template(slot="mbgd" slot-scope="{ row, index }")
            Input(v-model="row.mbgd"  @on-change="change(row)")
          template(slot="lwz" slot-scope="{ row, index }")
            Select(v-model="row.lwz" transfer=true  @on-change="change(row)")
              Option(v-for="item in typePosition" :value="item.value" :key="item.value") {{ item.label }}
          template(slot="lhd" slot-scope="{ row, index }")
            Input(v-model="row.lhd"  @on-change="change(row)")
          template(slot="rwz" slot-scope="{ row, index }")
            Select(v-model="row.rwz" transfer=true  @on-change="change(row)")
              Option(v-for="item in typePosition" :value="item.value" :key="item.value") {{ item.label }}
          template(slot="rhd" slot-scope="{ row, index }")
            Input(v-model="row.rhd"  @on-change="change(row)")
          template(slot="nkkd" slot-scope="{ row, index }")
            Input(v-model="row.nkkd"  @on-change="change(row)")
          template(slot="sl" slot-scope="{ row, index }")
            Input(v-model="row.sl"  @on-change="change(row)")
          template(slot="bz" slot-scope="{ row, index }")
            Input(v-model="row.bz"  @on-change="change(row)")
          template(slot="action" slot-scope="{ row, index }")
            Button(@click="editComplete(row, index)" style="padding: 6px 4px;" type="text")
              Icon(type="md-add")
        Divider 尺寸信息
        Table(:columns="handleSizeColumns" :data="handleSizeData" size="small" border)
          template(slot="lx" slot-scope="{ row, index }")
            span {{ row.lx === 0 ? '地柜' : '吊柜' }}
          template(slot="mbgd" slot-scope="{ row, index }")
            span {{ row.mbgd }}
          template(slot="mbkd" slot-scope="{ row, index }")
            span {{ row.mbkd }}
          template(slot="sl" slot-scope="{ row, index }")
            span {{ row.sl }}
          template(slot="mbpf" slot-scope="{ row, index }")
            span {{ row.mbpf }}
          template(slot="bz" slot-scope="{ row, index }")
            span {{ row.bz }}
          template(slot="blgd" slot-scope="{ row, index }")
            span {{ row.blgd }}
          template(slot="blkd" slot-scope="{ row, index }")
            span {{ row.blkd }}
          template(slot="blpf" slot-scope="{ row, index }")
            span {{ row.blpf }}
          template(slot="action" slot-scope="{ row, index }")
            Button(style="padding: 6px 4px;" type="text" @click="delRow(index)")
              Icon(type="md-close")
      div(slot="footer")
        Button(type="success" @click="submitInnerData") 导出
        Button(@click="ok") 关闭
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';
import { KHXD_JGM_CCXX, KHXD_JGM_NKJS, KHXD_JGM_CCLX, KHXD_JGM_NKWZ } from '@store/common/khxd/jgm/xjbd/module';
export default {
  data () {
    return {
      handleSizeData: [],
      computeDetail: [{
        lx: '',
        mbgd: '',
        lwz: 0,
        lhd: '',
        rwz: 0,
        rhd: '',
        nkkd: '',
        sl: '',
        bz: ''
      }],
      tableData: {
        lx: '',
        mbgd: '',
        mbkd: '',
        sl: '',
        mbpf: '',
        bz: '',
        blgd: '',
        blkd: '',
        blpf: ''
      },
      computeColumns: KHXD_JGM_NKJS,
      handleSizeColumns: KHXD_JGM_CCXX,
      typeColumns: KHXD_JGM_CCLX,
      typePosition: KHXD_JGM_NKWZ,
      handleSize: {
        handleHight: '',
        handleWidth: ''
      },
      editIndex: -1,
      visible: false
    };
  },
  computed: {
    ...mapGetters({

    })
  },
  methods: {
    /** 显示 */
    show() {
      this.visible = true;
    },
    /** 更改保证内容不变 */
    change(row) {
      this.computeDetail[0] = row;
    },
    /** 删除行 */
    delRow(index) {
      this.handleSizeData.splice(index, 1);
    },
    /** 添加行 */
    addRow() {
      this.handleSizeData.push(this.tableData);
      this.editIndex = this.handleSizeData.length - 1;
    },
    editComplete(row) {
      this.addRow();
      let lhd = '';
      let rhd = '';
      this.tableData.lx = row.lx;
      this.tableData.mbgd = row.mbgd;
      this.tableData.sl = row.sl;
      this.tableData.bz = row.bz;
      // 左立柱
      if (row.lwz === 0) {
        // 中间立柱
        if (row.lhd >= 30) {
          lhd = 13;
        } else {
          lhd = (parseFloat(row.lhd / 2) - 2).toFixed(0);
        }
      } else if (row.lwz === 1) {
        // 边沿立柱
        if (row.lhd >= 15) {
          lhd = 13;
        } else if (row.lhd >= 8) {
          lhd = parseFloat(row.lhd) - 5;
        } else {
          lhd = (parseFloat(row.lhd / 2) - 2).toFixed(0);
        }
      } else {
        // 转角立柱
        if (row.lhd <= 33) {
          lhd = parseFloat(row.lhd) - 21;
        } else {
          lhd = 13;
        }
      }
      // 右立柱
      if (row.rwz === 0) {
        // 中间立柱
        if (row.rhd >= 30) {
          rhd = 13;
        } else {
          rhd = (parseFloat(row.rhd / 2) - 2).toFixed(1);
        }
      } else if (row.rwz === 1) {
        // 边沿立柱
        if (row.rhd >= 15) {
          rhd = 13;
        } else if (row.rhd >= 8) {
          rhd = parseFloat(row.rhd) - 5;
        } else {
          rhd = (parseFloat(row.rhd / 2) - 2).toFixed(0);
        }
      } else {
        // 转角立柱
        if (row.rhd <= 33) {
          rhd = parseFloat(row.rhd) - 21;
        } else {
          rhd = 13;
        }
      }
      this.tableData.mbkd = Math.floor((parseFloat(row.nkkd) + parseFloat(lhd) + parseFloat(rhd)) / parseFloat(this.tableData.sl));
      this.tableData.mbpf = (this.tableData.mbgd * 0.001 * this.tableData.mbkd * 0.001 * this.tableData.sl).toFixed(3);
      this.tableData.blgd = this.tableData.mbgd;
      this.tableData.blkd = this.tableData.mbkd;
      this.tableData.blpf = this.tableData.mbpf;
      this.handleSizeData[this.editIndex] = _.cloneDeep(this.tableData);
      this.computeDetail[0].nkkd = '';
      this.computeDetail[0].sl = '';
      this.computeDetail[0].bz = '';
    },
    /** 关闭 */
    ok() {
      this.reset();
      this.visible = false;
    },
    /** 导出数据 */
    submitInnerData() {
      this.$emit('submitInnerData', this.handleSizeData);
      this.reset();
      this.visible = false;
    },
    /** 重置 */
    reset() {
      this.computeDetail = [];
      this.computeDetail.push({
        lx: '',
        mbgd: '',
        lwz: 0,
        lhd: '',
        rwz: 0,
        rhd: '',
        nkkd: '',
        sl: '',
        bz: ''
      });
      this.tableData = {
        lx: '',
        mbgd: '',
        mbkd: '',
        sl: '',
        mbpf: '',
        bz: '',
        blgd: '',
        blkd: '',
        blpf: ''
      };
      this.handleSizeData = [];
    }
  }
};
</script>
<style lang='less' scoped>

</style>
