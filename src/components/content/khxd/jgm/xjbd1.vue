<template lang='pug'>
  div.khxd-jgm-xjbd
    Button.khxd-operate-button(@click="getHandle") 拉手信息
    Button.khxd-operate-button(@click="innerCompute") 内框计算
    Button.khxd-operate-button(@click="createRework") 返工订单
    Divider
      span 订单信息
    orderDetailModal(ref="orderDetailModal" v-bind:totalMoney="totalMoney" @getOrderDetail="getOrderDetail")
    Divider
      span 门板信息
    Form(ref="doorDetail" :model="doorDetail" :label-width="80" inline)
      FormItem(label="拉手" prop="ls")
        //- AutoComplete.input-small(v-model="doorDetail.ls")
        //-   Option(v-for="item in handleInfo" :value="item.label" :key="item.value") {{ item.label }}
        Input.input-small(v-model="doorDetail.ls")
      FormItem(label="颜色" prop="ys")
        Input.input-small(v-model="doorDetail.ys")
      FormItem(label="单价" prop="dj")
        Input.input-small(v-model="doorDetail.dj" @on-change="computeMoney")
          span(slot="append") /m²
      FormItem(label="门板金额" prop="mbje")
        Input.input-small( v-model="doorDetail.mbje")
      FormItem(label="预计打包" prop="yjdb")
        Input.input-small(v-model="doorDetail.yjdb")
          span(slot="append") 件
    Table(:columns="columns" :data="sizeData" size="small" border show-summary :summary-method="sizeHandleSummary")
      template(slot="lx" slot-scope="{ row, index }")
        Select(v-model="row.lx" transfer=true v-if="editIndex === index")
          Option(v-for="item in doorType" :value="item.value" :key="item.value") {{ item.label }}
        span(v-else) {{ row.lx === 0 ? '地柜' : '吊柜' }}
      template(slot="mbgd" slot-scope="{ row, index }")
        Input(v-model="row.mbgd" v-if="editIndex === index" @on-change="computedSquare(row)")
        span(v-else) {{ row.mbgd }}
      template(slot="mbkd" slot-scope="{ row, index }")
        Input(v-model="row.mbkd" v-if="editIndex === index" @on-change="computedSquare(row)")
        span(v-else) {{ row.mbkd }}
      template(slot="sl" slot-scope="{ row, index }")
        Input(v-model="row.sl" v-if="editIndex === index" @on-change="computedSquare(row)")
        span(v-else) {{ row.sl }}
      template(slot="mbpf" slot-scope="{ row, index }")
        Input(v-model="row.mbpf" v-if="editIndex === index" readonly=true)
        span(v-else) {{ row.mbpf }}
      template(slot="bz" slot-scope="{ row, index }")
        Input(v-model="row.bz" v-if="editIndex === index")
        span(v-else) {{ row.bz }}
      template(slot="blgd" slot-scope="{ row, index }")
        Input(v-model="row.blgd" v-if="editIndex === index" readonly=true)
        span(v-else) {{ row.blgd }}
      template(slot="blkd" slot-scope="{ row, index }")
        Input(v-model="row.blkd" v-if="editIndex === index" readonly=true)
        span(v-else) {{ row.blkd }}
      template(slot="blpf" slot-scope="{ row, index }")
        Input(v-model="row.blpf" v-if="editIndex === index" readonly=true)
        span(v-else) {{ row.blpf }}
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
    div(:style="{ display: surchargeDisplay }")
      Divider
        span 额外附加费用
      Table(:columns="surchargeColumns" :data="surchargeData" size="small" border show-summary :summary-method="surchargeHandleSummary")
        template(slot="mc" slot-scope="{ row, index }")
          Input(v-model="row.mc" v-if="surchargeEditIndex === index")
          span(v-else) {{ row.mc }}
        template(slot="sslx" slot-scope="{ row, index }")
          Select(v-model="row.sslx" transfer=true v-if="surchargeEditIndex === index")
            Option(v-for="item in surchargeType" :value="item.value" :key="item.value") {{ item.label }}
          span(v-else) {{ row.sslx === 0 ? '五金配件' : '加工费' }}
        template(slot="sl" slot-scope="{ row, index }")
          Input(v-model="row.sl" v-if="surchargeEditIndex === index" @on-change="computedSurchargeMoney(row)")
          span(v-else) {{ row.sl }}
        template(slot="dw" slot-scope="{ row, index }")
          Select(v-model="row.dw" transfer=true v-if="surchargeEditIndex === index")
            Option(v-for="item in unitType" :value="item.label" :key="item.value") {{ item.label }}
          span(v-else) {{ row.dw }}
        template(slot="dj" slot-scope="{ row, index }")
          Input(v-model="row.dj" v-if="surchargeEditIndex === index" @on-change="computedSurchargeMoney(row)")
          span(v-else) {{ row.dj }}
        template(slot="je" slot-scope="{ row, index }")
          Input(v-model="row.je" v-if="surchargeEditIndex === index")
          span(v-else) {{ row.je }}
        template(slot="bz" slot-scope="{ row, index }")
          Input(v-model="row.bz" v-if="surchargeEditIndex === index")
          span(v-else) {{ row.bz }}
        template(slot="action" slot-scope="{ row, index }")
          div(v-if="surchargeEditIndex === index")
            Button(@click="addSurchargeLastRow(row, index)" style="padding: 6px 4px;" type="text")
              Icon(type="md-add")
            Poptip(@on-ok="delSurchargeRow(index)" confirm title="是否删除?" transfer)
              Button(style="padding: 6px 4px;" type="text")
                Icon(type="md-close")
            Button(@click="editSurchargeComplete(row, index)" style="padding: 6px 4px;" type="text")
              Icon(type="md-checkmark")
          div(v-else)
            Button(@click="editSurchargeRow(index)" style="padding: 6px 4px;" type="text")
              Icon(type="md-create")
            Poptip(@on-ok="delSurchargeRow(index)" confirm title="是否删除?" transfer)
              Button(style="padding: 6px 4px;" type="text")
                Icon(type="md-close")
    div(style="width:100%;text-align:center")
      Button(type="info" style="margin-right: 8px;margin-top: 50px;width:100px;" @click="showPreSaleModal" ghost) 销售预览
      Button(type="info" style="margin-right: 8px;margin-top: 50px;width:100px;" @click="showSurcharge" ghost) 附加费用
      Button(type="warning" style="margin-right: 8px;margin-top: 50px;width:100px;" ghost) 暂存
      Button(type="success" style="margin-top: 50px;width:100px;" @click="addData" ghost) 下单
    printModal(ref="printModal")
    innerComputeModal(ref="innerComputeModal" @submitInnerData="submitInnerData")
    reworkModal(ref="reworkModal")
    handleModal(ref="handleModal")
    saleSlipModal(ref="saleSlipModal")
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';
import { mixin } from '@component/mixins/mixin';
import { KHXD_JGM_CCLX, KHXD_JGM_CCXX, KHXD_JGM_SURCHARGE, SURCHARGE_TYPE } from '@store/common/khxd/jgm/xjbd/module';
import { UNIT_NAME } from '@store/common/common/module';
// import { GET_HANDLE_BY_TYPE, GETTER_HANDLE_BY_TYPE } from '@store/common/common/index';
import { ADD_DATA } from '@store/common/khxd/jgm/xjbd/index';
export default {
  inject: ['reload'],
  mixins: [mixin],
  components: {
    'orderDetailModal': (resolve) => require(['@component_content/khxd/common/order-detail'], resolve),
    'saleSlipModal': (resolve) => require(['./modal/sale-slip'], resolve),
    'printModal': (resolve) => require(['./modal/print-data'], resolve),
    'reworkModal': (resolve) => require(['./modal/rework-main'], resolve),
    'innerComputeModal': (resolve) => require(['../../common/inner-size-compute'], resolve),
    'handleModal': (resolve) => require(['../../common/handle-detail'], resolve)
  },
  data () {
    return {
      columns: KHXD_JGM_CCXX,
      surchargeColumns: KHXD_JGM_SURCHARGE,
      surchargeType: SURCHARGE_TYPE,
      doorType: KHXD_JGM_CCLX,
      unitType: UNIT_NAME,
      orderDetail: {},
      doorDetail: {
        ls: '',
        ys: '',
        dj: 0,
        hjpf: '',
        blpf: '',
        hjsl: '',
        mbje: 0,
        yjdb: ''
      },
      // 尺寸信息
      sizeData: [],
      sizeTableData: {
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
      handleType: 1,
      handleInfo: [],
      handleSize: {
        handleHeight: '',
        handleWidth: ''
      },
      editIndex: -1,
      editEnd: true,
      // 附加费用信息
      surchargeData: [],
      surchargeTableData: {
        mc: '',
        sslx: '',
        sl: '',
        dw: '',
        dj: '',
        je: '',
        bz: ''
      },
      surchargeEditIndex: -1,
      surchargeEditEnd: true,
      surchargeMoney: 0,
      surchargeDisplay: 'none',
      totalMoney: 0
    };
  },
  computed: {
    ...mapGetters({
      // handleList: 'commonCommonIndex/' + GETTER_HANDLE_BY_TYPE
      // storeSizeData: 'commonKhxdJgmXjbdIndex/' + GETTER_STORE_DATA
    })
  },
  mounted () {
    this.addRow();
  },
  methods: {
    getOrderDetail(orderDetail) {
      this.orderDetail = orderDetail;
    },
    /** ------------------------------------弹窗辅助相关计算---------------------------------- */
    /** 拉手详细信息-弹窗 */
    getHandle() {
      this.$refs.handleModal.show(this.handleType);
    },
    /** 内框计算-弹窗 */
    innerCompute() {
      this.$refs.innerComputeModal.show();
    },
    /** 内框计算-提交数据 */
    submitInnerData(data, type) {
      if (type === 0) {
        data.forEach(e => {
          this.sizeData.push(e);
        });
      } else if (type === 1) {
        this.sizeData = _.cloneDeep(data);
      }
    },
    /** 内框尺寸计算-传入原始数据(重新修改) */
    showSize(data) {
      this.sizeData = data;
    },
    /** 创建返工订单-弹窗 */
    createRework() {
      this.$refs.reworkModal.show(this.handleType);
    },
    /** --------------------------------------------------------------------------------------- */
    /** ------------------------------------尺寸表格信息相关计算-------------------------------- */
    /** 添加行 */
    addRow() {
      this.computeMoney();
      this.sizeData.push(this.sizeTableData);
      this.editIndex = this.sizeData.length - 1;
    },
    /** 添加最后一条数据 */
    addLastRow(row, index) {
      this.sizeData[index] = _.cloneDeep(row);
      this.sizeTableData.lx = row.lx;
      this.sizeTableData.mbgd = row.mbgd;
      this.computeMoney();
      this.addRow();
    },
    /** 编辑行 */
    editRow(index) {
      this.editIndex = index;
      this.editEnd = false;
    },
    /** 完成编辑 */
    editComplete(row, index) {
      this.sizeData[index] = _.cloneDeep(row);
      this.editIndex = -1;
      this.editEnd = true;
      this.computeMoney();
    },
    /** 删除行 */
    delRow(index) {
      // 判断是否是最后一行数据
      if (this.sizeData.length === 1) {
        this.reload();
        this.addRow();
      } else {
        this.sizeData.splice(index, 1);
        this.computeMoney();
      }
    },
    /** 计算平方 */
    computedSquare(row) {
      row.mbpf = (row.mbgd * 0.001 * row.mbkd * 0.001 * row.sl).toFixed(3);
      row.blgd = row.mbgd - this.handleSize.handleHeight;
      row.blkd = row.mbkd - this.handleSize.handleWidth;
      row.blpf = (row.blgd * 0.001 * row.blkd * 0.001 * row.sl).toFixed(3);
    },
    /** 合计处理 */
    sizeHandleSummary({ columns, data }) {
      const sums = {};
      columns.forEach((column, index) => {
        const key = column.key;
        if (index === 0) {
          sums[key] = {
            key,
            value: '合计'
          };
          return;
        }
        const values = data.map(item => Number(item[key]));
        if (!values.every(value => isNaN(value))) {
          const v = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (index === 4) {
            sums[key] = {
              key,
              value: v
            };
            this.doorDetail.hjsl = sums[key].value;
          } else if (index === 5) {
            sums[key] = {
              key,
              value: v.toFixed(3)
            };
            this.doorDetail.hjpf = sums[key].value;
          } else if (index === 9) {
            sums[key] = {
              key,
              value: v.toFixed(3)
            };
          }
        } else {
          sums[key] = {
            key,
            value: ''
          };
        }
      });
      this.computeMoney();
      return sums;
    },
    /** 计算门板金额 */
    computeMoney() {
      this.doorDetail.yjdb = Math.ceil(this.doorDetail.hjsl / 10);
      this.doorDetail.mbje = (this.doorDetail.hjpf * parseFloat(this.doorDetail.dj)).toFixed(1);
      this.computeTotalMoney();
    },
    /** --------------------------------------------------------------------------------------- */
    /** ------------------------------------附加费用相关计算-------------------------------- */
    showSurcharge() {
      this.surchargeDisplay = '';
      this.addSurchargeRow();
    },
    /** 添加行 */
    addSurchargeRow() {
      this.surchargeData.push(this.surchargeTableData);
      this.surchargeEditIndex = this.surchargeData.length - 1;
    },
    /** 添加最后一行 */
    addSurchargeLastRow(row, index) {
      this.surchargeData[index] = _.cloneDeep(row);
      this.addSurchargeRow();
    },
    /** 编辑行 */
    editSurchargeRow(index) {
      this.surchargeEditIndex = index;
      this.surchargeEditEnd = false;
    },
    /** 完成编辑 */
    editSurchargeComplete(row, index) {
      this.surchargeData[index] = _.cloneDeep(row);
      this.surchargeEditIndex = -1;
      this.editSurchargeEnd = true;
    },
    /** 删除行 */
    delSurchargeRow(index) {
      // 判断是否是最后一行数据
      if (this.surchargeData.length === 1) {
        this.surchargeData = [];
        this.surchargeTableData = {
          mc: '',
          sslx: '',
          sl: '',
          dw: '',
          dj: '',
          je: '',
          bz: ''
        };
        this.surchargeDisplay = 'none';
      } else {
        this.surchargeData.splice(index, 1);
      }
    },
    /** 计算金额 */
    computedSurchargeMoney(row) {
      row.je = (row.sl * row.dj).toFixed(1);
    },
    /** 合计处理 */
    surchargeHandleSummary({ columns, data }) {
      const sums = {};
      columns.forEach((column, index) => {
        const key = column.key;
        if (index === 0) {
          sums[key] = {
            key,
            value: '合计'
          };
          return;
        }
        const values = data.map(item => Number(item[key]));
        if (!values.every(value => isNaN(value))) {
          const v = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (index === 6) {
            sums[key] = {
              key,
              value: v.toFixed(1)
            };
            this.surchargeMoney = v;
            this.computeTotalMoney();
          }
        } else {
          sums[key] = {
            key,
            value: ''
          };
        }
      });
      return sums;
    },
    /** 销售单预览 */
    showPreSaleModal() {
      this.$refs.saleSlipModal.show(this.orderDetail, this.doorDetail, this.sizeData, this.surchargeData, this.surchargeMoney);
    },
    /** 计算订单总金额 */
    computeTotalMoney() {
      this.totalMoney = parseFloat(this.surchargeMoney) + parseFloat(this.doorDetail.mbje);
    },
    /** 提交数据 */
    addData() {
      // 去除table表格中多余字段
      this.sizeData.forEach((e) => {
        this.defineProperty(e, '_index', '_rowKey');
      });
      this.$store.dispatch('commonKhxdJgmXjbdIndex/' + ADD_DATA, {...this.orderDetail, ...this.doorDetail, crystalSteelDoorSizes: this.sizeData}).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.$Notice.success({
            title: res.data.info
          });
          this.reload();
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
.khxd-operate-button {
  margin: 0 5px 5px 0;
}
</style>
