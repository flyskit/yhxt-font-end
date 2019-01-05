<template lang='pug'>
  div.khxd-jgm-xjbd
    Form(ref="data" :model="data" :label-width="63" inline)
      FormItem(label="编号" prop="bh")
        Input.input-width-in-form(v-model="data.bh" clearable  placeholder="输入编号")
      FormItem(label="客户" prop="khxm")
        Input.input-width-in-form(v-model="data.khxm" placeholder="输入客户名称")
      FormItem(label="地址" prop="dz")
        Input.input-width-in-form(v-model="data.dz" placeholder="输入客户地址")
      FormItem(label="电话" prop="dh")
        Input.input-width-in-form(v-model="data.dh" placeholder="输入联系方式")
      FormItem(label="下单类型" prop="xdlx")
        Select.input-width-in-form(v-model="data.xdlx" @on-change="changeXdlx"  style="width:85px" clearable)
          Option(v-for="item in xdlx" :value="item.value" :key="item.value") {{ item.label }}
      FormItem(label="备注" prop="bz")
        Input.input-width-in-form(v-model="data.bz" type="textarea" :rows="2" style="width: 75vw" placeholder="备注")
      Divider 尺寸信息
    Form(ref="ccxx" :model="ccxx" :label-width="63" inline)
      FormItem(label="尺寸类型" prop="cclx")
        Select.input-width-in-form(v-model="ccxx.cclx" @on-change="changeCclx" clearable)
          Option(v-for="item in cclx" :value="item.value" :key="item.value") {{ item.label }}
      FormItem(label="拉手" prop="ls")
        Input.input-width-in-form(v-model="ccxx.ls" placeholder="输入拉手")
      FormItem(label="颜色" prop="ys")
        Input.input-width-in-form(v-model="ccxx.ys" placeholder="输入颜色")
      FormItem(label="备注" prop="bz")
        Input.input-width-in-form(v-model="ccxx.bz" placeholder="输入备注")
      FormItem(label="高度" prop="lhjgd")
        Input.input-width-in-form(v-model="ccxx.lhjgd" placeholder="输入高度")
      FormItem(label="宽度" prop="lhjkd")
        Input.input-width-in-form(v-model="ccxx.lhjkd" placeholder="输入宽度")
      FormItem(label="片数" prop="ps")
        Input.input-width-in-form(v-model="ccxx.ps" placeholder="输入片数")
      FormItem(label="平方" prop="lhjpf")
        Input.input-width-in-form(v-model="ccxx.lhjpf" placeholder="输入平方")
      FormItem
        Button(type="primary" @click="ok") 插入
    Table(:columns="tableColumns" :data="data.cc" border)
    //- tableJgm(refs="tableJgm")
</template>

<script>
import { mapGetters } from 'vuex';
import tableJgm from '@component_table/summary/jgm.vue';
import { KHXD_JGM_COLUMNS, KHXD_JGM_CCLX, KHXD_JGM_XDLX } from '@store/common/khxd/jgm/xjbd/module';
export default {
  components: {
    tableJgm
  },
  data () {
    return {
      data: {
        bh: '',
        khxm: '',
        dz: '',
        dh: '',
        xdlx: '',
        bz: '',
        hjlhjpf: '',
        hjblpf: '',
        hjps: '',
        cc: []
      },
      ccxx: {
        cclx: '',
        ls: '',
        ys: '',
        lhjgd: '',
        lhjkd: '',
        lhjpf: '',
        ps: '',
        bz: '',
        kjcc: '',
        blgd: '',
        blkd: '',
        blpf: ''
      },
      xdlx: KHXD_JGM_XDLX,
      cclx: KHXD_JGM_CCLX,
      tableColumns: KHXD_JGM_COLUMNS
    };
  },
  computed: {
    ...mapGetters({
      // tableColumns: GETTER_TABLE_COLUMNS
    })
  },
  mounted() {

  },
  methods: {
    changeXdlx(value) {
      console.log(value);
      this.data.xdlx = value;
    },
    changeCclx(value) {
      console.log(value);
      this.data.xdlx = value;
    },
    pushData(data) {
      this.data.cc.push(data);
    },
    reset(name) {
      this.$refs[name].fields.forEach((e) => {
        if (e.prop === 'lhjgd' || e.prop === 'lhjkd' || e.prop === 'lhjpf' || e.prop === 'bz' || e.prop === 'ps') {
          e.resetField();
        }
      });
    },
    ok() {
      console.log(this.ccxx);
      this.pushData(this.ccxx);
    }
  }
};
</script>
<style lang='less' scoped>

</style>
