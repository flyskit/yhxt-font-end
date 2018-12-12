<template lang='pug'>
  div.ym
    Form(ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80")
      FormItem(label="移门编号" prop="id")
        Input(v-model="formValidate.id" placeholder="输入编号")
      FormItem(label="日期" prop="createTime")
        Input(v-model="formValidate.createTime" placeholder="输入订单日期")
      FormItem(label="客户" prop="customerName")
        Input(v-model="formValidate.customerName" placeholder="输入客户名称")
      FormItem(label="地址" prop="customerAddr")
        Input(v-model="formValidate.customerAddr" placeholder="输入客户地址")
      FormItem
        Button(@click="reset('formValidate')" style="margin-right:8px") 重置
        Button(type="primary" @click="ok") 确认下单
</template>

<script>
export default {
  data () {
    return {
      formValidate: {
        id: '',
        createTime: '',
        customerName: '',
        customerAddr: ''
      },
      ruleValidate: {
        id: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' }
        ],
        customerName: [
          { required: true, message: 'Please select the city', trigger: 'change' }
        ],
        customerAddr: [
          { required: true, message: 'Please select gender', trigger: 'blur' }
        ]
      }
    };
  },
  components: {

  },
  computed: {

  },
  mounted() {

  },
  methods: {
    yesData() {
      console.log(this.formValidate);
    },
    reset(name) {
      this.$refs[name].resetFields();
    },
    ok() {
      console.log(this.formValidate);
    }
  }
};
</script>
<style lang='less' scoped>

</style>
