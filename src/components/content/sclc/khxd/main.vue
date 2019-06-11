<template lang='pug'>
  div.khxd
    Form(ref="data" :model="data" :rules="rules" :label-width="80" inline)
      FormItem(label="编号" prop="num" )
        Input.input-form(v-model="data.num" placeholder="输入编号")
      FormItem(label="创建日期" prop="createTime")
        DatePicker.input-form(v-model="data.createTime" type="date" placeholder="输入订单日期")
      FormItem(label="客户" prop="customerName")
        Input.input-form(v-model="data.customerName" placeholder="输入客户名称")
      FormItem(label="地址" prop="customerAddr")
        Input.input-form(v-model="data.customerAddr" placeholder="输入客户地址")
      FormItem(label="出货日期" prop="deliverTime")
        DatePicker.input-form(v-model="data.deliverTime" type="date" placeholder="输入订单日期")
      FormItem(label="下单类型" prop="doorType")
        Cascader.input-form(v-model="data.doorType" :data="doorType" @on-change="getForm" trigger="hover")
      pre
      FormItem(label="备注" prop="bz")
        Input(v-model="data.bz" placeholder="备注" type="textarea" :rows="3" style="width: 76vw")
      FormItem
        Button.button-position-in-form(@click="reset('data')") 重置
        Button(type="primary" @click="ok") 下单
    Divider
      span {{ dividerSpan }}
    Component(:is="formType" @getFormData="getFormData")
    Divider
      span 下单记录
    Table(ref="selection" :columns="addButton" :data="dataTable1" size="small" no-data-text="暂无数据显示" border)
    Table(ref="selection" :columns="kqmpkColumns" :data="dataTable" size="small" no-data-text="暂无数据显示" border)
    Table(ref="selection" :columns="tzmpkColumns" :data="dataTable" size="small" no-data-text="暂无数据显示" border)
    Table(ref="selection" :columns="tzmsdColumns" :data="dataTable" size="small" no-data-text="暂无数据显示" border)
    Table(ref="selection" :columns="tzmktColumns" :data="dataTable" size="small" no-data-text="暂无数据显示" border)
    addForm(ref="addForm" @getTableData="getTableData")
</template>

<script>
import {GET_DATA, GETTER_RULES} from '@store/sclc/index';
import {GET_COLUMNS_YMM_PKM, GET_DATA_KQM_PKM, GET_DATA_TZM_PKM, GET_DATA_TZM_STM_DDM, GET_DATA_TZM_KT} from '@store/common/static-data/index';
import {GET_DOOR_TYPE, GET_CLASSIFY_YMM_PKM, GET_COLOR_TYPE} from '@store/common/static-fields/index';
// import {GET_CLASSIFY_YMM_PKM, GET_COLOR_TYPE} from '@store/common/static-fields/index';
import {mapGetters} from 'vuex';
import _ from 'lodash';
import addForm from './add-form';
import ympkm from '@component_form/ymm/pkm';
import ymym from '@component_form/ymm/ym';
import kqpkm from '@component_form/kqm/pkm';
import tzpkm from '@component_form/tzm/pkm';
import tzstm from '@component_form/tzm/stm';
import tzddm from '@component_form/tzm/ddm';
import tzkt from '@component_form/tzm/kt';
export default {
  data () {
    return {
      // https://www.jb51.net/article/121563.htm
      data: {

      },
      dividerSpan: '',
      formType: '',
      dataTable1: [
        {
          xdlx: '原木门/平开门',
          fl: '柜体',
          yslx: 'H1001',
          ys: '红色',
          zx: '无',
          ccHigh: '550',
          ccWidth: '420',
          sl: '1'
        }
      ],
      dataTable: [],
      actionButton: {
        title: '操作',
        align: 'center',
        width: 150,
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.change(params.index);
                }
              }
            }, '修改'),
            h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.remove(params.index);
                }
              }
            }, '删除')
          ]);
        }
      }
    };
  },
  components: {
    addForm, ympkm, ymym, kqpkm, tzpkm, tzstm, tzddm, tzkt
  },
  computed: {
    ...mapGetters({
      ymmpkColumns: GET_COLUMNS_YMM_PKM,
      kqmpkColumns: GET_DATA_KQM_PKM,
      tzmpkColumns: GET_DATA_TZM_PKM,
      tzmsdColumns: GET_DATA_TZM_STM_DDM,
      tzmktColumns: GET_DATA_TZM_KT,
      classifyType: GET_CLASSIFY_YMM_PKM,
      processType: GET_COLOR_TYPE,
      rules: GETTER_RULES,
      doorType: GET_DOOR_TYPE
    }),
    addButton () {
      this.ymmpkColumns.push(
        this.actionButton
      );
      return this.ymmpkColumns;
    }
  },
  mounted() {

  },
  methods: {
    getForm(value, selectedData) {
      // 获取级联最后一个类型
      // this.$refs.addForm.viewForm(value[1]);
      if (selectedData.length === 0) {
        this.$Message.info('清空选择');
      } else {
        this.formType = value[1];
        this.dividerSpan = selectedData[1].__label;
      }
    },
    getTableData(data) {
      console.log(_.values(data));
      // 将对象转换为数组
      this.dataTable = _.values(data);
    },
    getFormData(formData) {
      // this.dataTable1.push(formData);
      // this.classifyType.forEach(function(element) {
      //   if (elementTable.fl === element.value) {
      //     elementTable.fl = element.label;
      //   }
      // }, this);
      // console.log(this.dataTable1);
    },
    // 删除行
    remove (index) {
      this.dataTable1.splice(index, 1);
    },
    // 修改信息
    change (index) {
      console.log(this.dataTable1[index]);
      this.$refs.addForm.viewForm(ympkm, this.dataTable1[index]);
    },
    reset(name) {
      this.$refs[name].resetFields();
    },
    ok() {
      this.$store.dispatch(GET_DATA).then(() => {
        console.log(this.testData);
      });
    }
  }
};
</script>
<style lang='less' scoped>
@import '../../../../style/mixin.less';
</style>
