<template lang='pug'>
  div.khxd-jgm-accessory
    Modal(v-model="visible" width="70vw" @on-ok="ok" @on-cancel="ok")
      p(slot="header" style="color:#f60")
        Icon(type="ios-information-circle")
        span 配件管理
      div(class="edit")
        Form(ref="accessoryDetail" :model="accessoryDetail" :label-width="80" inline)
          FormItem(label="配件名称" prop="mc")
            AutoComplete.input-small(v-model="accessoryDetail.mc"
              @on-search="getAccessoryList"
              @on-change="accessoryImport()"
              placeholder="输入配件名称"
              clearable)
              Option(v-for="item in accessoryInfo" :value="item.label" :key="item.value") {{ item.label }}
          FormItem(label="配件编号" prop="bh")
            Input.input-small(v-model="accessoryDetail.bh" placeholder="输入配件编号")
          FormItem(label="规格" prop="gg")
            Input.input-small(v-model="accessoryDetail.gg" placeholder="输入规格")
          FormItem(label="单价" prop="dj")
            Input.input-small(v-model="accessoryDetail.dj" placeholder="输入单价"  @on-change="numberChange")
          FormItem(label="单位" prop="dw")
            Input.input-small(v-model="accessoryDetail.dw" placeholder="输入单位")
          FormItem(label="配件数量" prop="pjsl")
            Input.input-small(v-model="accessoryDetail.pjsl" placeholder="输入配件数量" @on-change="numberChange")
          FormItem(label="金额" prop="pjje")
            Input.input-small(v-model="accessoryDetail.pjje" placeholder="输入金额")
          FormItem
            Button(type="primary" style="margin-right: 8px" @click="addAccessory") 添加
            Button(@click="reset('accessoryDetail')") 重置
        Divider 配件列表
        Table(:columns="accessoryColumns" :data="accessoryTable" size="small" border)
          template(slot="action" slot-scope="{ row, index }")
            Poptip(@on-ok="delRow(row)" confirm title="是否删除?" transfer)
              Button(style="padding: 6px 4px;" type="text")
                Icon(type="md-close")
      div(slot="footer")
        Button(@click="ok") 关闭
</template>

<script>
import { mapGetters } from 'vuex';
import { ACCESSORY_COLUMNS } from '@store/common/khxd/jgm/jryxd/module';
import { ADD_ACCESSORY, DEL_ACCESSORY, GET_PJ_LIST, GET_PJ_TABLE, GETTER_PJ_LIST, GETTER_PJ_TABLE } from '@store/common/khxd/jgm/jryxd/index';
export default {
  inject: ['reload'],
  data () {
    return {
      accessoryDetail: {
        ddbh: '',
        mc: '',
        bh: '',
        dj: '',
        dw: '',
        gg: '',
        pjsl: '',
        pjje: ''
      },
      accessoryInfo: [],
      accessoryColumns: ACCESSORY_COLUMNS,
      visible: false
    };
  },
  computed: {
    ...mapGetters({
      accessoryTable: 'commonKhxdJgmJryxdIndex/' + GETTER_PJ_TABLE,
      accessoryList: 'commonKhxdJgmJryxdIndex/' + GETTER_PJ_LIST
    })
  },
  methods: {
    /** 显示 */
    show(ddbh) {
      this.accessoryDetail.ddbh = ddbh;
      this.getAccessoryTable();
      this.visible = true;
    },
    /** 获取存在的配件列表 */
    getAccessoryTable() {
      this.$store.dispatch('commonKhxdJgmJryxdIndex/' + GET_PJ_TABLE, this.accessoryDetail.ddbh);
    },
    /** 根据配件名称获取配件信息 */
    getAccessoryList(value) {
      this.$store.dispatch('commonKhxdJgmJryxdIndex/' + GET_PJ_LIST, value).then(res => {
        const list = this.accessoryList.map(item => {
          return {
            value: item.id,
            label: item.mc,
            bh: item.bh,
            dj: item.dj,
            dw: item.dw,
            gg: item.gg
          };
        });
        this.accessoryInfo = list.filter(item => item.label.indexOf(value) > -1);
      });
    },
    /** 导入配件信息 */
    accessoryImport() {
      this.accessoryInfo.forEach((e) => {
        if (e.label === this.accessoryDetail.mc) {
          this.accessoryDetail.bh = e.bh;
          this.accessoryDetail.dj = e.dj;
          this.accessoryDetail.dw = e.dw;
          this.accessoryDetail.gg = e.gg;
        }
      });
    },
    /** 导入金额 */
    numberChange() {
      this.accessoryDetail.pjje = this.accessoryDetail.pjsl * this.accessoryDetail.dj;
    },
    /** 删除配件 */
    delRow(row) {
      this.$store.dispatch('commonKhxdJgmJryxdIndex/' + DEL_ACCESSORY, row.id).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.$Notice.success({
            title: res.data.info
          });
          this.reset('accessoryDetail');
          this.getAccessoryTable(this.accessoryDetail.ddbh);
        }
      });
    },
    /** 重置 */
    reset(name) {
      this.$refs[name].resetFields();
    },
    /** 关闭 */
    ok() {
      this.reset('accessoryDetail');
      this.reload();
      this.visible = false;
    },
    /** 提交数据 */
    addAccessory() {
      this.$store.dispatch('commonKhxdJgmJryxdIndex/' + ADD_ACCESSORY, this.accessoryDetail).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.$Notice.success({
            title: res.data.info
          });
          this.reset('accessoryDetail');
          this.getAccessoryTable(this.accessoryDetail.ddbh);
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>

</style>
