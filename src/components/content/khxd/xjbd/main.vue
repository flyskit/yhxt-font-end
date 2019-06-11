<template lang='pug'>
  div.xjbd
    Form(ref="data" :model="data" :label-width="80" inline)
      FormItem(label="日期" prop="createTime")
        DatePicker.input-form(v-model="data.createTime" type="date" placeholder="输入下单日期")
      FormItem(label="客户" prop="customerName")
        Input.input-form(v-model="data.customerName" placeholder="输入客户名称")
      FormItem(label="地址" prop="customerAddr")
        Input.input-form(v-model="data.customerAddr" placeholder="输入客户地址")
      FormItem(label="电话" prop="customerTel")
        Input.input-form(v-model="data.customerTel" placeholder="输入联系方式")
      FormItem(label="下单" prop="orderType")
        Select.input-form(v-model="data.orderType" @on-change="getForm" clearable filterable remote)
          Option(v-for="item in orderType" :value="item.value" :key="item.value") {{ item.label }}
    Component(:is="formType" @getFormData="getFormData")
    Component(:is="tableType" @getFormData="getFormData")
</template>

<script>
import { GET_DOOR_TYPE } from '@store/common/static-fields/index';
import {mapGetters} from 'vuex';
import jgm from '@component_form/jgm';
import tableJgm from '@component_table/summary/sum-jgm.vue';
export default {
  data () {
    return {
      data: {
        createTime: '',
        customerName: '',
        customerAddr: '',
        customerTel: '',
        orderTypeValue: []
      },
      formType: '',
      tableType: '',
      cc_length: '5',
      fl: [],
      test_data: {
        kh: '李四',
        dz: '四川省成都市龙泉驿区成龙大道二段1819号',
        bh: '1001',
        scsj: '2018-01-01',
        ddbz: '注意质量，切勿漏单',
        hj_lhj_pf: 3.08,
        hj_lhj_ps: 10,
        hj_bl_pf: 3.00,
        fl: [
          {
            lx: '吊柜',
            ys: 'YH-669',
            ls: '2号银白隐框',
            cc: [
              {
                cc_hight: 660,
                cc_width: 320,
                cc_pf: 0.235,
                ps: 1,
                bz: '',
                bl_hight: 660,
                bl_width: 320,
                bl_pf: 0.235
              },
              {
                cc_hight: 660,
                cc_width: 320,
                cc_pf: 0.235,
                ps: 1,
                bz: '开孔',
                bl_hight: 660,
                bl_width: 320,
                bl_pf: 0.235
              },
              {
                cc_hight: 660,
                cc_width: 320,
                cc_pf: 0.235,
                ps: 4,
                bz: '',
                bl_hight: 660,
                bl_width: 320,
                bl_pf: 0.235
              },
              {
                cc_hight: 660,
                cc_width: 320,
                cc_pf: 0.235,
                ps: 2,
                bz: '阿斯顿发明是东方马山东两句话就我那',
                bl_hight: 660,
                bl_width: 320,
                bl_pf: 0.235
              }
            ]
          },
          {
            lx: '地柜',
            ys: 'YH-671',
            ls: '2号银白隐框',
            cc: [
              {
                cc_hight: 660,
                cc_width: 320,
                cc_pf: 0.235,
                ps: 1,
                bz: '',
                bl_hight: 660,
                bl_width: 320,
                bl_pf: 0.235
              },
              {
                cc_hight: 660,
                cc_width: 320,
                cc_pf: 0.235,
                ps: 1,
                bz: '开孔',
                bl_hight: 660,
                bl_width: 320,
                bl_pf: 0.235
              },
              {
                cc_hight: 660,
                cc_width: 320,
                cc_pf: 0.235,
                ps: 4,
                bz: '',
                bl_hight: 660,
                bl_width: 320,
                bl_pf: 0.235
              },
              {
                cc_hight: 660,
                cc_width: 320,
                cc_pf: 0.235,
                ps: 2,
                bz: '阿斯顿发明是东方马山东两句话就我那',
                bl_hight: 660,
                bl_width: 320,
                bl_pf: 0.235
              }
            ]
          }
        ]
      }
    };
  },
  components: {
    jgm, tableJgm
  },
  computed: {
    ...mapGetters({
      orderType: GET_DOOR_TYPE
    })
  },
  mounted() {
    this.tableType = 'tableJgm';
  },
  methods: {
    getForm (value) {
      if (value === undefined) {
        this.$Message.info('清空选择');
        this.formType = '';
      }
      this.formType = value;
    },
    getFormData () {
      console.log('1');
    }
  }
};
</script>
<style lang='less' scoped>
@import '../../../../style/mixin.less';
.jgm-table-style {
  width:90%;
  margin-left:5%;
  border:solid #333;
  border-width:1px 0px 0px 1px;
  font-size: 1.2em;
  border-collapse: collapse;
  border-spacing: 0;
  text-align:center;
  font-family: 'FangSong';
  color: #444;
}
.jgm-table-style td {
  width: 100px;
}
.jgm-table-style-title {
  font-size: 2.5em;
  letter-spacing: 6px;
  font-weight: lighter;
}
// 内部左边边框框线
.jgm-table-style .inline-style-left {
  border-left-style:none;
  border-bottom-style:none;
}
// 内部右边边框框线
.jgm-table-style .inline-style-right {
  border-right-style:none;
  border-left-style:none;
  border-bottom-style:none
}
</style>
