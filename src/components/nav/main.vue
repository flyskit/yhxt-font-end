<template lang="pug">
  div
    div.bread-crumb-style
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-if="this.$route.fullPath === '/home'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/order-new'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 客户下单
        BreadcrumbItem 新建表单
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/khxd-jgm'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 客户下单
        BreadcrumbItem(style="color: #3CB371;font-family:Hiragino Sans GB") 晶钢门
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/khxd-ykl'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 客户下单
        BreadcrumbItem(style="color: #3CB371;font-family:Hiragino Sans GB") 亚克力门
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/khxd-xsm'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 客户下单
        BreadcrumbItem(style="color: #3CB371;font-family:Hiragino Sans GB") 吸塑平开门
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/khxd-thj'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 客户下单
        BreadcrumbItem(style="color: #3CB371;font-family:Hiragino Sans GB") 钛合金门
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/khxd-ygm'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 客户下单
        BreadcrumbItem(style="color: #3CB371;font-family:Hiragino Sans GB") 衣柜移门
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/khxd-tzm'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 客户下单
        BreadcrumbItem(style="color: #3CB371;font-family:Hiragino Sans GB") 套装门
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/ddgl-ddjl'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 订单管理
        BreadcrumbItem(style="color: #3CB371;font-family:Hiragino Sans GB") 订单记录
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/produce-down'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 生产流程
        BreadcrumbItem 客户下单
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/produce-summer'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 生产流程
        BreadcrumbItem 项目结算
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/produce-deliver'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 生产流程
        BreadcrumbItem 当日发货
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/asset-stock'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 材料管理
        BreadcrumbItem 库存记录
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/asset-purchase'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 材料管理
        BreadcrumbItem 采购入库
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/asset-purchase-statistics'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 材料管理
        BreadcrumbItem 采购统计
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/deliver-everyday'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 发货管理
        BreadcrumbItem 每日发货
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/deliver-statistics'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 发货管理
        BreadcrumbItem 发货统计
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/finance-everyday'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 财务管理
        BreadcrumbItem 每日收支
      //- Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/finance-purchase'")
      //-   Icon(type="ios-pin")
      //-   BreadcrumbItem(to="/home")  首页
      //-   BreadcrumbItem 财务管理
      //-   BreadcrumbItem 进货应付已付
      //- Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/finance-deliver'")
      //-   Icon(type="ios-pin")
      //-   BreadcrumbItem(to="/home")  首页
      //-   BreadcrumbItem 财务管理
      //-   BreadcrumbItem 发货应收已收
      //- Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/finance-statistics'")
      //-   Icon(type="ios-pin")
      //-   BreadcrumbItem(to="/home")  首页
      //-   BreadcrumbItem 财务管理
      //-   BreadcrumbItem 财务统计
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/employee-distribute'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 员工管理
        BreadcrumbItem 人员分布
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/employee-salary'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 员工管理
        BreadcrumbItem 工资发放
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/employee-leave'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 员工管理
        BreadcrumbItem 请假事宜
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/purchase-address'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 数据字典
        BreadcrumbItem 进货单位
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/deliver-address'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 数据字典
        BreadcrumbItem 发货地址
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/customer-info'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 数据字典
        BreadcrumbItem 客户信息
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/collection-logistics'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 数据字典
        BreadcrumbItem 代收物流
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else-if="this.$route.fullPath === '/system-role'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 系统管理
        BreadcrumbItem 角色管理
      Breadcrumb(separator="<b class='breadcrumb-separator'>/</b>" v-else="this.$route.fullPath === '/system-authority'")
        Icon(type="ios-pin")
        BreadcrumbItem(to="/home")  首页
        BreadcrumbItem 系统管理
        BreadcrumbItem 权限管理
    div.exist-icon-style
      Tooltip(placement="bottom" content="注销")
        Icon(type="ios-power" size=20 color="#ff5500" @click.native="powerOff" style="cursor: pointer;")
</template>

<script>
export default {
  data() {
    return {

    };
  },
  mounted() {

  },
  methods: {
    powerOff() {
      alert('zhux');
    }
  }
};
</script>

<style lang="less">
@import '../../style/mixin.less';
.bread-crumb-style{
  position: relative;
  float: left;
}
.exist-icon-style{
  position: relative;
  float: right;
  padding:0 10px 0 0;
}
//面包屑分割符样式
.breadcrumb-separator{
  color: #3CB371;
  padding: 0 1px;
}
</style>
