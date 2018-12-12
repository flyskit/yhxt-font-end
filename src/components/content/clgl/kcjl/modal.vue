<template lang='pug'>
  div.modalView
    Modal(v-model="visible" footer-hide width="80%")
      p(slot="header" style="color:#f60")
        Icon(type="ios-information-circle")
        span 表单信息
      ymm
</template>

<script>
import ymm from '@component_form/ymm/pkm';
export default {
  components: {
    ymm
  },
  data () {
    return {
      visible: false
    };
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    cil() {
      this.visible = true;
    }
  }
};
</script>
<style lang='less' scoped>

</style>
