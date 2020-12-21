<template lang='pug'>
  div.khxd-jgm-xjbd
    Button.khxd-operate-button(@click="getHandle") 拉手信息
    Button.khxd-operate-button(@click="innerCompute") 内框计算
    Button.khxd-operate-button(@click="createRework") 返工订单
    Form(ref="orderDetail" :model="orderDetail" :label-width="80" inline)
      FormItem(label="订单编号" prop="ddbh")
        Input.input-small(v-model="orderDetail.ddbh" readonly=true)
      FormItem(label="订单类型" prop="ddlx")
        Select.input-small(v-model="orderDetail.ddlx" transfer=true)
          Option(v-for="item in typeDdlx" :value="item.value" :key="item.value") {{ item.label }}
      FormItem(label="订单来源" prop="ddly")
        Select.input-small(v-model="orderDetail.ddly" transfer=true)
          Option(v-for="item in typeDdly" :value="item.value" :key="item.value") {{ item.label }}
      FormItem(label="生产速率" prop="scsl")
        Select.input-small(v-model="orderDetail.scsl" transfer=true)
          Option(v-for="item in typeScsl" :value="item.value" :key="item.value") {{ item.label }}
      FormItem(label="工期" prop="gq")
        InputNumber.input-small(v-model="orderDetail.gq" :min="1")
      FormItem(label="客户姓名" prop="khxm")
        AutoComplete.input-small(v-model="orderDetail.khxm"  @on-search="getCustomerList" clearable)
          Option(v-for="item in customerInfo" :value="item.label" :key="item.value") {{ item.label }}
      FormItem(label="地址" prop="dz")
        Input.input-small(v-model="orderDetail.dz")
      FormItem(label="电话" prop="dh")
        Input.input-small(v-model="orderDetail.dh")
      FormItem(label="备注" prop="bz")
        Input.input-small(v-model="orderDetail.bz" style="width:360px")
    Divider
      span 订单信息
    Form(ref="orderDetail" :model="orderDetail" :label-width="80" inline)
      FormItem(label="拉手" prop="ls")
        AutoComplete.input-small(v-model="orderDetail.ls" @on-search="getHandleList"  @on-change="handleImport()")
          Option(v-for="item in handleInfo" :value="item.label" :key="item.value") {{ item.label }}
      FormItem(label="颜色" prop="ys")
        Input.input-small(v-model="orderDetail.ys")
      FormItem(label="单价" prop="dj")
        Input.input-small(v-model="orderDetail.dj")
          span(slot="append") /m²
      FormItem(label="合计平方" prop="hjpf")
        Input.input-small(v-model="orderDetail.hjpf" readonly=true)
      FormItem(label="玻璃平方" prop="blpf")
        Input.input-small(v-model="orderDetail.blpf" readonly=true)
      FormItem(label="门板数量" prop="hjsl")
        Input.input-small(v-model="orderDetail.hjsl" readonly=true)
      FormItem(label="金额" prop="je")
        Input.input-small( v-model="orderDetail.je")
      FormItem(label="预计打包" prop="yjdb")
        Input.input-small(v-model="orderDetail.yjdb")
          span(slot="append") 件
    editCupboardSize(ref="editCupboardSize" @submitData="submitData" @computeTotal="computeTotal")
    div(style="width:100%;text-align:center")
      Button(type="warning" style="margin-right: 8px;margin-top: 50px;width:100px;") 暂存
      Button(type="success" style="margin-top: 50px;width:100px;" @click="addData") 下单
    printModal(ref="printModal")
    innerComputeModal(ref="innerComputeModal" @submitInnerData="submitInnerData")
    reworkModal(ref="reworkModal")
    handleModal(ref="handleModal")
</template>

<script>
import { mapGetters } from 'vuex';
import { mixin } from '@component/mixins/mixin';
import editCupboardSize from '@component_table/edit/edit-cupboard-size.vue';
import { KHXD_JGM_DDXX } from '@store/common/khxd/jgm/xjbd/module';
import { ORDER_DDLX, ORDER_SCSL, ORDER_DDLY } from '@store/common/common/module';
import { ADD_DATA } from '@store/common/khxd/jgm/xjbd/index';
import { GET_ORDER_NUMBER, GET_HANDLE_BY_TYPE, GET_CUSTOMER_BY_NAME, GETTER_ORDER_NUMBER, GETTER_HANDLE_BY_TYPE, GETTER_CUSTOMER_BY_NAME } from '@store/common/common/index';
export default {
  inject: ['reload'],
  mixins: [mixin],
  components: {
    editCupboardSize,
    'printModal': (resolve) => require(['./modal/print-data'], resolve),
    'reworkModal': (resolve) => require(['./modal/rework-main'], resolve),
    'innerComputeModal': (resolve) => require(['../../common/inner-size-compute'], resolve),
    'handleModal': (resolve) => require(['../../common/handle-detail'], resolve)
  },
  data () {
    return {
      orderDetail: {
        ddbh: '',
        ddlx: 0,
        ddly: 0,
        scsl: 0,
        gq: 5,
        khxm: '',
        dz: '',
        dh: '',
        ls: '',
        ys: '',
        dj: '',
        hjpf: '',
        blpf: '',
        hjsl: '',
        je: '',
        yjdb: '',
        bz: '',
        ddzt: ''
      },
      typeDdlx: ORDER_DDLX,
      typeScsl: ORDER_SCSL,
      typeDdly: ORDER_DDLY,
      orderColumns: KHXD_JGM_DDXX,
      handleSize: {
        handleHeight: '',
        handleWidth: ''
      },
      handleType: 1,
      handleInfo: [],
      customerInfo: [],
      sizeDetail: []
    };
  },
  computed: {
    ...mapGetters({
      orderNumber: 'commonCommonIndex/' + GETTER_ORDER_NUMBER,
      handleList: 'commonCommonIndex/' + GETTER_HANDLE_BY_TYPE,
      customerList: 'commonCommonIndex/' + GETTER_CUSTOMER_BY_NAME
    })
  },
  mounted () {
    this.getBh();
    this.getLs();
  },
  methods: {
    /** 获取编号 */
    getBh() {
      this.$store.dispatch('commonCommonIndex/' + GET_ORDER_NUMBER).then(res => {
        this.orderDetail.ddbh = this.orderNumber;
      });
    },
    /** 获取拉手列表 */
    getLs() {
      this.$store.dispatch('commonCommonIndex/' + GET_HANDLE_BY_TYPE, this.handleType);
    },
    /** 获取客户列表信息 */
    getCustomerList(value) {
      this.$store.dispatch('commonCommonIndex/' + GET_CUSTOMER_BY_NAME, value).then(res => {
        const list = this.customerList.map(item => {
          return {
            value: item.id,
            label: item.khxm,
            dz: item.dz,
            dh: item.dh
          };
        });
        this.customerInfo = list.filter(item => item.label.indexOf(value) > -1);
      });
    },
    /** 导入客户信息 */
    customerImport(orderDetail) {
      this.customerInfo.forEach((e) => {
        if (e.label === orderDetail.khxm) {
          orderDetail.dz = e.dz;
          orderDetail.dh = e.dh;
        }
      });
      this.orderDetail = orderDetail;
    },
    /** 获取拉手列表信息 */
    getHandleList(value) {
      const list = this.handleList.map(item => {
        return {
          value: item.id,
          label: item.mc,
          dj: item.dj,
          gd: item.gd,
          kd: item.kd
        };
      });
      this.handleInfo = list.filter(item => item.label.indexOf(value) > -1);
    },
    /** 导入拉手信息 */
    handleImport() {
      this.handleInfo.forEach((e) => {
        if (e.label === this.orderDetail.ls) {
          this.orderDetail.dj = e.dj;
          this.handleSize.handleHeight = e.gd;
          this.handleSize.handleWidth = e.kd;
          // 重新渲染尺寸表格
          this.$refs.editCupboardSize.getHandleSize(this.handleSize);
        }
      });
      this.computeMoney(this.orderDetail);
    },
    /** 金额计算 */
    computeMoney(orderDetail) {
      orderDetail.je = (orderDetail.hjpf * parseFloat(orderDetail.dj)).toFixed(1);
      this.orderDetail = orderDetail;
    },
    /** 回显统计数值 */
    computeTotal(totalData) {
      this.orderDetail.hjpf = totalData.hjpf.toFixed(3);
      this.orderDetail.blpf = totalData.blpf.toFixed(3);
      this.orderDetail.hjsl = totalData.hjsl;
      this.orderDetail.yjdb = Math.ceil(this.orderDetail.hjsl / 10);
      this.orderDetail.je = (this.orderDetail.hjpf * parseFloat(this.orderDetail.dj)).toFixed(1);
    },
    /** 获取table表格数据-提交订单 */
    submitData(sizeDetail, orderStatus) {
      this.orderDetail.ddzt = orderStatus;
      sizeDetail.forEach((e) => {
        this.defineProperty(e, '_index', '_rowKey');
      });
      this.defineProperty(this.orderDetail, '_index', '_rowKey');
      this.sizeDetail = sizeDetail;
    },
    /** 提交数据 */
    addData() {
      this.$store.dispatch('commonKhxdJgmXjbdIndex/' + ADD_DATA, {...this.orderDetail, cupboardDoorSizes: this.sizeDetail}).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.$Notice.success({
            title: res.data.info
          });
          this.reload();
        }
      });
    },
    /** 拉手详细信息-弹窗 */
    getHandle() {
      this.$refs.handleModal.show(this.handleType);
    },
    /** 内框计算-弹窗 */
    innerCompute() {
      this.$refs.innerComputeModal.show();
    },
    /** 内框计算-提交数据 */
    submitInnerData(data) {
      this.$refs.editCupboardSize.showSize(data);
    },
    /** 创建返工订单-弹窗 */
    createRework() {
      this.$refs.reworkModal.show(this.handleType);
    }
  }
};
</script>
<style lang='less' scoped>
.khxd-operate-button {
  margin: 0 5px 5px 0;
}
</style>
