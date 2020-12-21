<template lang='pug'>
  div.table-edit-cupboard-size
    //- Button.operate-button(@click="addRow" :disabled="isUpdate") 添加行
    //- Input.operate-button.input-ls(v-model="handleSize.handleHeight" placeholder="拉手高度" @on-change="handleHeightChange")
    //- Input.operate-button.input-ls(v-model="handleSize.handleWidth" placeholder="拉手宽度" @on-change="handleWidthChange")
    //- Button.operate-button(@click="updateData" type="success" style="float:right;" v-if="isUpdate") 修改订单
    //- Button.operate-button(@click="addData" type="success" style="float:right;" v-else) 添加订单
    //- Poptip(@on-ok="storageData" title="是否暂存?" style="float:right;" confirm transfer)
    //-   Button.operate-button(:disabled="isUpdate" type="warning") 暂存订单
    Table(:columns="columns" :data="data" size="small" border)
      template(slot="lx" slot-scope="{ row, index }")
        Select(v-model="row.lx" transfer=true v-if="editIndex === index")
          Option(v-for="item in typeColumns" :value="item.value" :key="item.value") {{ item.label }}
        span(v-else) {{ row.lx === 0 ? '地柜' : '吊柜' }}
      template(slot="mbgd" slot-scope="{ row, index }")
        Input(v-model="row.mbgd" v-if="editIndex === index" @on-change="computedSquare(row)" @keyup.native="handleKeyup($event, index, 'mbgd_1')"  class="mbgd_1")
        span(v-else) {{ row.mbgd }}
      template(slot="mbkd" slot-scope="{ row, index }")
        Input(v-model="row.mbkd" v-if="editIndex === index" @on-change="computedSquare(row)" @keyup.native="handleKeyup($event, index, 'mbkd_1')"  class="mbkd_1")
        span(v-else) {{ row.mbkd }}
      template(slot="sl" slot-scope="{ row, index }")
        Input(v-model="row.sl" v-if="editIndex === index" @on-change="computedSquare(row)" @keyup.native="handleKeyup($event, index, 'sl_1')"  class="sl_1")
        span(v-else) {{ row.sl }}
      template(slot="mbpf" slot-scope="{ row, index }")
        Input(v-model="row.mbpf" v-if="editIndex === index" readonly=true @keyup.native="handleKeyup($event, index, 'mbpf_1')"  class="mbpf_1")
        span(v-else) {{ row.mbpf }}
      template(slot="bz" slot-scope="{ row, index }")
        Input(v-model="row.bz" v-if="editIndex === index" @keyup.native="handleKeyup($event, index, 'bz_1')"  class="bz_1")
        span(v-else) {{ row.bz }}
      template(slot="blgd" slot-scope="{ row, index }")
        Input(v-model="row.blgd" v-if="editIndex === index" readonly=true @keyup.native="handleKeyup($event, index, 'blgd_1')"  class="blgd_1")
        span(v-else) {{ row.blgd }}
      template(slot="blkd" slot-scope="{ row, index }")
        Input(v-model="row.blkd" v-if="editIndex === index" readonly=true @keyup.native="handleKeyup($event, index, 'blkd_1')" class="blkd_1")
        span(v-else) {{ row.blkd }}
      template(slot="blpf" slot-scope="{ row, index }")
        Input(v-model="row.blpf" v-if="editIndex === index" readonly=true @keyup.native="handleKeyup($event, index, 'blpf_1')" class="blpf_1")
        span(v-else) {{ row.blpf }}
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
import { KHXD_JGM_CCLX, KHXD_JGM_CCXX } from '@store/common/khxd/jgm/xjbd/module';
export default {
  inject: ['reload'],
  data () {
    return {
      data: [],
      copyTableData: [],
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
      handleSize: {
        handleHeight: '',
        handleWidth: ''
      },
      typeColumns: KHXD_JGM_CCLX,
      columns: KHXD_JGM_CCXX,
      orderStatus: 1,
      editIndex: -1,
      editEnd: true,
      isUpdate: false
    };
  },
  mounted () {
    this.addRow();
  },
  methods: {
    /** 导入拉手尺寸 */
    getHandleSize(data) {
      this.handleSize = _.cloneDeep(data);
      if (this.data.length !== 0) {
        this.handleHeightAndWidthChange();
      }
    },
    /** 由于拉手尺寸更改，重新计算 */
    handleHeightAndWidthChange() {
      let newData = _.cloneDeep(this.data);
      // 清空原有数据，重新渲染表格
      this.data = [];
      newData.forEach((e) => {
        e.blgd = e.mbgd - this.handleSize.handleHeight;
        e.blkd = e.mbkd - this.handleSize.handleWidth;
        e.blpf = (e.blgd * 0.001 * e.blkd * 0.001 * e.sl).toFixed(3);
        this.data.push(e);
      });
      this.computeTotal();
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
      this.tableData.mbgd = row.mbgd;
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
      this.addData();
    },
    /** 计算平方 */
    computedSquare(row) {
      row.mbpf = (row.mbgd * 0.001 * row.mbkd * 0.001 * row.sl).toFixed(3);
      row.blgd = row.mbgd - this.handleSize.handleHeight;
      row.blkd = row.mbkd - this.handleSize.handleWidth;
      row.blpf = (row.blgd * 0.001 * row.blkd * 0.001 * row.sl).toFixed(3);
    },
    /** 统计计算，回显到父组件 */
    computeTotal() {
      let totalData = {
        hjpf: 0.00,
        blpf: 0.00,
        hjsl: 0,
        kd: 0.00
      };
      this.data.forEach((e) => {
        totalData.hjpf = parseFloat(e.mbpf) + parseFloat(totalData.hjpf);
        totalData.blpf = parseFloat(e.blpf) + parseFloat(totalData.blpf);
        totalData.hjsl = parseFloat(e.sl) + parseFloat(totalData.hjsl);
        totalData.kd = parseFloat(e.mbkd) * 0.001 * parseFloat(e.sl) + parseFloat(totalData.kd);
      });
      this.$emit('computeTotal', totalData);
    },
    /** 更换拉手尺寸-高度 */
    handleHeightChange() {
      let newData = _.cloneDeep(this.data);
      this.data = [];
      newData.forEach((e) => {
        e.blgd = e.mbgd - this.handleSize.handleHeight;
        e.blpf = (e.blgd * 0.001 * e.blkd * 0.001 * e.sl).toFixed(3);
        this.data.push(e);
      });
      this.computeTotal();
    },
    /** 更换拉手尺寸-宽度 */
    handleWidthChange() {
      let newData = _.cloneDeep(this.data);
      this.data = [];
      newData.forEach((e) => {
        e.blkd = e.mbkd - this.handleSize.handleWidth;
        e.blpf = (e.blgd * 0.001 * e.blkd * 0.001 * e.sl).toFixed(3);
        this.data.push(e);
      });
      this.computeTotal();
    },
    /** 删除行 */
    delRow(index) {
      // 判断是否是最后一行数据
      if (this.data.length === 1) {
        this.reload();
        // this.addRow();
      } else {
        this.data.splice(index, 1);
        this.computeTotal();
      }
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
    /** 内框尺寸计算-传入原始数据 */
    showSize(data) {
      this.data = data;
    },
    // 按键切换
    handleKeyup (event, index, key) {
      // console.log(event);
      // console.log(index);
      // console.log(key);
      // this.copyTableData = _.cloneDeep(this.data);
      // // 向上键
      // if (event.keyCode === 38) {
      //   // 获取到所有class为[key]的dom列表
      //   let doms = document.getElementsByClassName(key);
      //   if (!index) {
      //     console.log(this.copyTableData);
      //     index = this.copyTableData.length;
      //   }
      //   // 选中类表中第index个，向上故而减1，dom里头包含的input，获取焦点以及选中input里的内容
      //   let dom = doms[index - 1].getElementsByTagName('input')[0];
      //   dom.focus();
      //   dom.select();
      // }
      // // 向下键
      // if (event.keyCode === 40) {
      //   console.log(document);
      //   let doms = document.getElementsByClassName(key);
      //   console.log(doms);
      //   console.log(this.copyTableData);
      //   console.log('---');
      //   console.log(+index);
      //   if (+index === this.copyTableData.length - 1) {
      //     index = -1;
      //   }
      //   console.log(index);
      //   console.log(doms[index + 1].getElementsByTagName('input')[0]);
      //   let dom = doms[index + 1].getElementsByTagName('input')[0];
      //   dom.focus();
      //   dom.select();
      // }
      // // 小键盘回车键
      // if (event.keyCode === 13) {
      //   // 小键盘回车因为需要根据class判断下一个，故而有input输入框的全部需要在这按顺序声明
      //   let keyName = ['lx_1', 'mbgd_1', 'mbkd_1', 'sl_1', 'mbpf_1', 'bz_1', 'blgd_1', 'blkd_1', 'blpf_1'];
      //   let num = 0;
      //   if (key === keyName[keyName.length - 1]) {
      //     if (index === this.copyTableData.length - 1) {
      //       index = 0;
      //     } else {
      //       ++index;
      //     }
      //   } else {
      //     keyName.map((v, i) => {
      //       if (v === key) {
      //         num = i + 1;
      //       }
      //     });
      //   }
      //   let doms = document.getElementsByClassName(keyName[num]);
      //   let dom = doms[index].getElementsByTagName('input')[0];
      //   dom.focus();
      //   dom.select();
      // }
    }
  }
};
</script>
<style lang='less' scoped>
.operate-button {
  margin-right: 5px;
  margin-bottom: 5px;
  // margin-top: -20px;
}
.input-ls {
  width: 80px;
  padding: 0 10px 0px 0;
}
// 深度监听样式，输入框无边框
/deep/ .ivu-input {
  border: none!important;
}
</style>
