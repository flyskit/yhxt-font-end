<template lang='pug'>
  div.khxd-jgm-edit-data
    Modal(v-model="visible" width="90vw" @on-ok="ok" @on-cancel="ok")
      p(slot="header" style="color:#f60" class="noprint")
        Icon(type="ios-information-circle")
        span 修改
      div(class="edit")
        Table(:columns="orderColumns" :data="orderDetail" size="small" border)
          template(slot="ddbh" slot-scope="{ row, index }")
            Input(v-model="row.ddbh" readonly=true @on-change="change(row)")
          template(slot="ddlx" slot-scope="{ row, index }")
            Select(v-model="row.ddlx" transfer=true  @on-change="change(row)")
              Option(v-for="item in typeDdlx" :value="item.value" :key="item.value" :disabled="item.disabled") {{ item.label }}
          template(slot="ddly" slot-scope="{ row, index }")
            Select(v-model="row.ddly" transfer=true  @on-change="change(row)")
              Option(v-for="item in typeDdly" :value="item.value" :key="item.value") {{ item.label }}
          template(slot="scsl" slot-scope="{ row, index }")
            Select(v-model="row.scsl" transfer=true  @on-change="change(row)")
              Option(v-for="item in typeScsl" :value="item.value" :key="item.value") {{ item.label }}
          template(slot="gq" slot-scope="{ row, index }"  @on-change="change(row)")
            InputNumber(v-model="row.gq" :min="1"  @on-change="change(row)")
          template(slot="khxm" slot-scope="{ row, index }")
            AutoComplete(v-model="row.khxm"  @on-search="getCustomerList" @on-change="customerImport(row)" clearable)
              Option(v-for="item in customerInfo" :value="item.label" :key="item.value") {{ item.label }}
          template(slot="dz" slot-scope="{ row, index }")
            Input(v-model="row.dz"  @on-change="change(row)")
          template(slot="dh" slot-scope="{ row, index }")
            Input(v-model="row.dh"  @on-change="change(row)")
          template(slot="ls" slot-scope="{ row, index }")
            AutoComplete(v-model="row.ls" @on-search="getHandleList" @on-change="handleImport(row)")
              Option(v-for="item in handleInfo" :value="item.label" :key="item.value") {{ item.label }}
          template(slot="ys" slot-scope="{ row, index }")
            Input(v-model="row.ys"  @on-change="change(row)")
          template(slot="dj" slot-scope="{ row, index }")
            Input(v-model="row.dj"  @on-change="change(row)")
              span(slot="append") /m²
          template(slot="hjpf" slot-scope="{ row, index }")
            Input(v-model="row.hjpf" readonly=true  @on-change="change(row)")
          template(slot="blpf" slot-scope="{ row, index }")
            Input(v-model="row.blpf" readonly=true  @on-change="change(row)")
          template(slot="hjsl" slot-scope="{ row, index }")
            Input(v-model="row.hjsl" readonly=true  @on-change="change(row)")
          template(slot="je" slot-scope="{ row, index }")
            Input(v-model="row.je"  @on-change="change(row)")
          template(slot="yjdb" slot-scope="{ row, index }")
            Input(v-model="row.yjdb" readonly=true  @on-change="change(row)")
              span(slot="append") 件
          template(slot="bz" slot-scope="{ row, index }")
            Input(v-model="row.bz"  @on-change="change(row)")
        Divider 尺寸信息
        editCupboardSize(ref="editCupboardSize" @submitData="submitData" @computeTotal="computeTotal")
      div(slot="footer" class="noprint")
        Button(@click="ok") 关闭
</template>

<script>
import { mapGetters } from 'vuex';
import { mixin } from '@component/mixins/mixin';
import editCupboardSize from '@component_table/edit/edit-cupboard-size.vue';
import { KHXD_JGM_DDXX } from '@store/common/khxd/jgm/xjbd/module';
import { ORDER_DDLX, ORDER_SCSL, ORDER_DDLY } from '@store/common/common/module';
import { UPDATE_DATA } from '@store/common/khxd/jgm/jryxd/index';
import { GET_HANDLE_BY_TYPE, GET_CUSTOMER_BY_NAME, GETTER_HANDLE_BY_TYPE, GETTER_CUSTOMER_BY_NAME } from '@store/common/common/index';
export default {
  inject: ['reload'],
  mixins: [mixin],
  components: {
    editCupboardSize
  },
  data () {
    return {
      orderDetail: [{
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
      }],
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
      visible: false
    };
  },
  computed: {
    ...mapGetters({
      handleList: 'commonCommonIndex/' + GETTER_HANDLE_BY_TYPE,
      customerList: 'commonCommonIndex/' + GETTER_CUSTOMER_BY_NAME
    })
  },
  methods: {
    /** 显示 */
    show(data, isTemporary) {
      this.orderDetail[0].ddbh = data.orderDetail.ddbh;
      this.orderDetail[0].ddlx = data.orderDetail.ddlx;
      this.orderDetail[0].ddly = data.orderDetail.ddly;
      this.orderDetail[0].scsl = data.orderDetail.scsl;
      this.orderDetail[0].khxm = data.orderDetail.khxm;
      this.orderDetail[0].dz = data.orderDetail.dz;
      this.orderDetail[0].dh = data.orderDetail.dh;
      this.orderDetail[0].gq = data.orderDetail.gq;
      this.orderDetail[0].bz = data.orderDetail.bz;
      this.orderDetail[0].ddzt = data.orderDetail.ddzt;

      this.orderDetail[0].ls = data.crystalSteelDoorDetail.ls;
      this.orderDetail[0].ys = data.crystalSteelDoorDetail.ys;
      this.orderDetail[0].dj = data.crystalSteelDoorDetail.dj;
      this.orderDetail[0].je = data.crystalSteelDoorDetail.je;
      this.orderDetail[0].hjpf = data.crystalSteelDoorDetail.hjpf;
      this.orderDetail[0].blpf = data.crystalSteelDoorDetail.blpf;
      this.orderDetail[0].hjsl = data.crystalSteelDoorDetail.hjsl;
      this.orderDetail[0].yjdb = data.crystalSteelDoorDetail.yjdb;
      if (isTemporary) {
        this.$refs.editCupboardSize.showSize(data.cupboardDoorSizes);
      } else {
        this.$refs.editCupboardSize.showEdit(data.cupboardDoorSizes);
      }
      this.getLs();
      this.findHandle();
      this.visible = true;
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
    customerImport(row) {
      this.customerInfo.forEach((e) => {
        if (e.label === row.khxm) {
          row.dz = e.dz;
          row.dh = e.dh;
        }
      });
      this.orderDetail[0] = row;
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
    handleImport(row) {
      this.handleInfo.forEach((e) => {
        if (e.label === row.ls) {
          row.dj = e.dj;
          this.handleSize.handleHeight = e.gd;
          this.handleSize.handleWidth = e.kd;
          // 重新渲染尺寸表格
          this.$refs.editCupboardSize.getHandleSize(this.handleSize);
        }
      });
      this.orderDetail[0] = row;
    },
    /** 根据拉手名称查询拉手尺寸 */
    findHandle() {
      this.handleList.forEach((e) => {
        if (e.mc === this.orderDetail[0].ls) {
          this.handleSize.handleHeight = e.gd;
          this.handleSize.handleWidth = e.kd;
          // 重新渲染尺寸表格
          this.$refs.editCupboardSize.getHandleSize(this.handleSize);
        }
      });
    },
    /** 更改保证内容不变 */
    change(row) {
      this.orderDetail[0] = row;
    },
    /** 回显统计数值 */
    computeTotal(totalData) {
      this.orderDetail[0].hjpf = totalData.hjpf.toFixed(3);
      this.orderDetail[0].blpf = totalData.blpf.toFixed(3);
      this.orderDetail[0].hjsl = totalData.hjsl;
      this.orderDetail[0].yjdb = Math.ceil(this.orderDetail[0].hjsl / 10);
      this.orderDetail[0].je = (this.orderDetail[0].hjpf * parseFloat(this.orderDetail[0].dj)).toFixed(1);
    },
    /** 获取table表格数据-提交订单 */
    submitData(sizeDetail) {
      sizeDetail.forEach((e) => {
        this.defineProperty(e, '_index', '_rowKey');
      });
      this.defineProperty(this.orderDetail[0], '_index', '_rowKey');
      this.updateData(sizeDetail);
    },
    /** 关闭 */
    ok() {
      this.visible = false;
    },
    /** 提交数据 */
    updateData(sizeDetail) {
      this.$store.dispatch('commonKhxdJgmJryxdIndex/' + UPDATE_DATA, {...this.orderDetail[0], cupboardDoorSizes: sizeDetail}).then(res => {
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

</style>
