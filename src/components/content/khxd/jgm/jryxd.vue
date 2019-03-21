<template lang='pug'>
  div.khxd-jgm-jryxd
    Table(border ref="selection" :columns="jgmXdxxColumns" :data="data")
</template>

<script>
import { JGM_XDXX_COLUMNS } from '@store/common/khxd/jgm/jryxd/module.js';
export default {
  components: {

  },
  data () {
    return {
      data: [],
      jgmXdxxColumns: JGM_XDXX_COLUMNS
    };
  },
  computed: {

  },
  mounted() {

  },
  methods: {

  }
};
</script>
<style lang='less' scoped>

</style>
