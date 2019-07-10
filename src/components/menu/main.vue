<template lang="pug">
  div.app-menu
    Menu(accordion active-name="1" theme="dark" width="auto")
      Menu-item(name="1" @click.native="routerevent('/home')")
        Icon(type="ios-home")
        span 首页
      Submenu(name="6")
        template(slot="title")
          Icon(type="ios-infinite")
          span 生产流程
        Menu-item(name="6-1" @click.native="routerevent('/produce-budget')") 预算计算
        Menu-item(name="6-2" @click.native="routerevent('/produce-down')") 客户下单
        Menu-item(name="6-3" @click.native="routerevent('/produce-summer')") 项目结算
        Menu-item(name="6-4" @click.native="routerevent('/produce-deliver')") 当日发货
      Submenu(name="2")
        template(slot="title")
          Icon(type="ios-infinite")
          span 客户下单
        Menu-item(name="2-1" @click.native="routerevent('/khxd-jgm')") 晶钢门
        Menu-item(name="2-2" @click.native="routerevent('/khxd-ykl')") 亚克力门
        Menu-item(name="2-3" @click.native="routerevent('/khxd-thj')") 钛合金门
      Submenu(name="3")
        template(slot="title")
          Icon(type="ios-cart")
          span 材料管理
        Menu-item(name="3-1" @click.native="routerevent('/asset-stock')") 库存记录
        Menu-item(name="3-2" @click.native="routerevent('/asset-purchase')") 采购入库
        Menu-item(name="3-3" @click.native="routerevent('/asset-purchase-statistics')") 采购统计
      Submenu(name="4")
        template(slot="title")
          Icon(type="ios-infinite")
          span 发货管理
        Menu-item(name="4-1" @click.native="routerevent('/deliver-everyday')") 每日发货
        Menu-item(name="4-2" @click.native="routerevent('/deliver-statistics')") 发货统计
      Submenu(name="5")
        template(slot="title")
          Icon(type="ios-keypad")
          span 财务管理
        Menu-item(name="5-1" @click.native="routerevent('/finance-everyday')") 每日收支
      //- Submenu(name="5")
      //-   template(slot="title")
      //-     Icon(type="ios-people")
      //-     span 员工管理
      //-   Menu-item(name="5-1" @click.native="routerevent('/employee-distribute')") 人员分布
      //-   Menu-item(name="5-2" @click.native="routerevent('/employee-salary')") 工资发放
      //-   Menu-item(name="5-3" @click.native="routerevent('/employee-leave')") 请假事宜
      //- Submenu(name="6")
      //-   template(slot="title" )
      //-     Icon(type="ios-paper")
      //-     span 数字字典
      //-   Menu-item(name="6-1" @click.native="routerevent('/purchase-address')") 进货单位
      //-   Menu-item(name="6-2" @click.native="routerevent('/deliver-address')") 发货地址
      //-   Menu-item(name="6-3" @click.native="routerevent('/customer-info')") 客户信息
      //-   Menu-item(name="6-4" @click.native="routerevent('/collection-logistics')") 代收物流
      //- Submenu(name="7")
      //-   template(slot="title")
      //-     Icon(type="ios-cog-outline")
      //-     span 系统管理
      //-   Menu-item(name="7-1" @click.native="routerevent('/system-role')") 角色管理
      //-   Menu-item(name="7-2" @click.native="routerevent('/system-authority')") 权限管理
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false
    };
  },
  methods: {
    routerevent(path) {
      this.$router.push({ path: path });
    }
  }
};
</script>

<style lang="less">
</style>
