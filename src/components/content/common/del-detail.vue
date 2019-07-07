<template lang='pug'>
  div.del-detail
    Modal(v-model="visible" @on-ok="ok" style="width:500px" @on-cancel="ok")
      p(slot="header" style="color:#f60")
        Icon(type="ios-information-circle")
        span 删除
      div(class="edit")
        Form(ref="data" :model="data" :label-width="80" inline)
          FormItem(label="删除原因" prop="scyy")
            Input(v-model="data.scyy" type="textarea" :rows="4" style="width:350px" placeholder="请填写删除原因...")
      div(slot="footer")
        Button(type="error" @click="delData") 提交
        Button(type="primary" @click="ok") 放弃
</template>

<script>
import { DEL_ORDER } from '@store/common/common/index';
export default {
  inject: ['reload'],
  data () {
    return {
      data: {
        ddbh: '',
        scyy: ''
      },
      visible: false
    };
  },
  methods: {
    /** 显示 */
    show(ddbh) {
      this.data.ddbh = ddbh;
      this.visible = true;
    },
    /** 删除记录 */
    delData() {
      this.$store.dispatch('commonCommonIndex/' + DEL_ORDER, this.data).then(res => {
        if (res.data.status !== 200) {
          this.$Message.error(res.data.info);
        } else {
          this.$Notice.success({ title: res.data.info });
          this.reload();
        }
      });
    },
    /** 关闭 */
    ok() {
      this.$refs.data.resetFields();
      this.visible = false;
    }
  }
};
</script>
<style lang='less' scoped>

</style>
