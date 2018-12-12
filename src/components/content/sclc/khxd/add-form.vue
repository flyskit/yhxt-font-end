<template lang='pug'>
  div.add-form
    Modal(v-model="visible" footer-hide width="1100px")
      p(slot="header" style="color:#f60")
        Icon(type="ios-information-circle")
        span 修改记录
      Keep-alive
        Component(:is="formType" :getData="formData" @getFormData="getFormData")
</template>

<script>
import ympkm from '@component_form/ymm/pkm';
import ymym from '@component_form/ymm/ym';
import kqpkm from '@component_form/kqm/pkm';
import tzpkm from '@component_form/tzm/pkm';
import tzstm from '@component_form/tzm/stm';
import tzddm from '@component_form/tzm/ddm';
import tzkt from '@component_form/tzm/kt';
export default {
  components: {
    ympkm, ymym, kqpkm, tzpkm, tzstm, tzddm, tzkt
  },
  data () {
    return {
      visible: false,
      formType: '',
      formData: null
    };
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    viewForm(key, data) {
      if (key === undefined) {
        this.visible = false;
      } else {
        this.visible = true;
        // 赋值表单key，用于动态注入表单
        this.formType = key;
        this.formData = data;
        console.log('form:' + this.formData);
      }
    },
    getFormData(data) {
      // 给父组件传参，对应@getTableData,传回的是一个对象
      this.$emit('getTableData', data);
      this.visible = false;
    }
  }
};
</script>
<style lang='less' scoped>

</style>
