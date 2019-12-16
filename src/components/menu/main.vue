<template lang="pug">
  div.app-menu
    Menu(accordion :active-name="path" theme="light" width="auto" ref="path" :open-names="['1']")
      Menu-item(name="home" @click.native="routerevent('/home')")
        Icon(type="ios-home")
        span 首页
      //- Submenu(name="6")
      //-   template(slot="title")
      //-     Icon(type="ios-infinite")
      //-     span 生产流程
      //-   Menu-item(name="6-1" @click.native="routerevent('/produce-budget')") 预算计算
      //-   Menu-item(name="6-2" @click.native="routerevent('/produce-down')") 客户下单
      //-   Menu-item(name="6-3" @click.native="routerevent('/produce-summer')") 项目结算
      //-   Menu-item(name="6-4" @click.native="routerevent('/produce-deliver')") 当日发货
      Submenu(name="khxd")
        template(slot="title")
          Icon(type="ios-infinite")
          span 客户下单
        Menu-item(name="khxd-jgm" @click.native="routerevent('/khxd-jgm')")
          Icon(type="md-radio-button-off")
          span 晶钢门
        Menu-item(name="khxd-ykl" @click.native="routerevent('/khxd-ykl')")
          Icon(type="md-radio-button-off")
          span 亚克力门
        Menu-item(name="khxd-xsm" @click.native="routerevent('/khxd-xsm')")
          Icon(type="md-radio-button-off")
          span 吸塑平开门
        Menu-item(name="khxd-thj" @click.native="routerevent('/khxd-thj')")
          Icon(type="md-radio-button-off")
          span 钛合金门
        Menu-item(name="khxd-ygm" @click.native="routerevent('/khxd-ygm')")
          Icon(type="md-radio-button-off")
          span 衣柜移门
        Menu-item(name="khxd-tzm" @click.native="routerevent('/khxd-tzm')")
          Icon(type="md-radio-button-off")
          span 套装门
      Submenu(name="ddgl")
        template(slot="title")
          Icon(type="ios-infinite")
          span 订单管理
        Menu-item(name="ddgl-ddjl" @click.native="routerevent('/ddgl-ddjl')")
          Icon(type="md-radio-button-off")
          span 订单记录
      //- Submenu(name="3")
      //-   template(slot="title")
      //-     Icon(type="ios-cart")
      //-     span 材料管理
      //-   Menu-item(name="3-1" @click.native="routerevent('/asset-stock')") 库存记录
      //-   Menu-item(name="3-2" @click.native="routerevent('/asset-purchase')") 采购入库
      //-   Menu-item(name="3-3" @click.native="routerevent('/asset-purchase-statistics')") 采购统计
      //- Submenu(name="4")
      //-   template(slot="title")
      //-     Icon(type="ios-infinite")
      //-     span 发货管理
      //-   Menu-item(name="4-1" @click.native="routerevent('/deliver-everyday')") 每日发货
      //-   Menu-item(name="4-2" @click.native="routerevent('/deliver-statistics')") 发货统计
      //- Submenu(name="5")
      //-   template(slot="title")
      //-     Icon(type="ios-keypad")
      //-     span 财务管理
      //-   Menu-item(name="5-1" @click.native="routerevent('/finance-everyday')") 每日收支
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
      path: '',
      isCollapsed: false
    };
  },
  mounted () {
    this.pathChange();
  },
  methods: {
    routerevent(path) {
      this.$router.push({ path: path });
    },
    pathChange() {
      this.$nextTick(() => {
        this.path = this.$route.path.slice(1);
        this.$refs.path.updateActiveName();
      });
    }
  }
};
</script>

<style lang="less">
</style>
