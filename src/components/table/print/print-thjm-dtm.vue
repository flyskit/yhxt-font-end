<template lang='pug'>
  div.table-print-thjm-dtm(v-if="!isShow")
    div
      table.print-table-style(border)
        tr
          td.print-table-style-title(colspan="12" cellspacing="0" cellpadding="0") 艺合钛合金-吊趟门生产订单
        tr(style="height:40px;")
          th 编号：
          td(colspan="2" style="margin-left: 5px;") {{ data.ddbh }}
          th 客户：
          td(colspan="2" style="margin-left: 5px;") {{ data.khxm }}
          th 地址：
          td(colspan="5") {{ data.dz }}
        tr(style="height:40px;")
          th 类型：
          td {{ data.ddlx }}
          th 工期：
          td {{ data.gq }}天
          th 速度：
          td {{ data.scsl }}
          th 备注：
          td(colspan="5") {{ data.bz }}
        tr
          tr(style="height:30px;")
            th(rowspan="2") 料型颜色
            th(rowspan="2") 造型
            th(rowspan="2") 玻璃
            th(rowspan="2") 推门
            th(rowspan="2") 门锁
            th(rowspan="2") 包套
            th(colspan="3") 尺寸
            th(rowspan="2") 门扇
            th(rowspan="2") 备注
            th(rowspan="2") 数量
          tr(style="height:30px;")
            th 高度
            th 宽度
            th 厚度
        tr(v-for="item in ccxx" style="height:50px;")
          td {{ item.lxys }}
          td {{ item.zx }}
          td {{ item.bl }}
          td {{ item.tm }}{{ item.gm }}
          td {{ item.ms }}
          td {{ item.bt }}
          td {{ item.gd }}
          td {{ item.kd }}
          td {{ item.hd }}
          td {{ item.mssl }}
          td {{ item.bz }}
          td {{ item.sl }}
        tr(style="height:30px;")
          td 发货配件
          td(colspan="11") {{ accessoryListInfo }}
    div.print-span-div
      p
        span.print-span-th 制单人:
        span.print-span-content {{ data.czr }}
        span.print-span-th 制单时间:
        span.print-span-content {{ data.czsj }}
        span.print-span-th 完工时间:
        span.print-span-content {{ data.wgsj }}
      p
        span.print-span-content 库管签字:
        span.print-span-content
        span.print-span-content 客户签字:
        span.print-span-content
        span.print-span-content 财务签字:
      p
        span.print-span-th 尊敬的客户：1.发物流情况下，取货时默认验收签字，未付清账款则此单自动变为欠账凭证。
      p
        span.print-span-th 2.收货后三天内确认货的质量，三天之后无异议即为合格，本公司不予负责。电话：13540425238
      p
        span.print-span-th 附：艺合门业(卖方) 地址：成都市郫都区团结镇石桥村十一组
</template>

<script>
import { ORDER_DDLX, ORDER_SCSL } from '@store/common/common/module';
export default {
  props: ['isShow'],
  data () {
    return {
      data: {
        ddbh: '',
        ddlx: '',
        scsl: '',
        khxm: '',
        dz: '',
        gq: '',
        bz: '',
        czr: '',
        czsj: '',
        wgsj: '',
        hjpf: 0.000,
        hjsl: 0
      },
      ccxx: [],
      accessoryListInfo: '',
      typeDdlx: ORDER_DDLX,
      typeScsl: ORDER_SCSL
    };
  },
  methods: {
    show(data, czr, czsj) {
      this.data.czr = czr;
      this.data.czsj = czsj;
      this.accessoryListInfo = data.accessoryListInfo;

      this.data.ddbh = data.orderDetail.ddbh;
      this.data.ddlx = data.orderDetail.ddlx;
      this.data.scsl = data.orderDetail.scsl;
      this.data.khxm = data.orderDetail.khxm;
      this.data.dz = data.orderDetail.dz;
      this.data.gq = data.orderDetail.gq;
      this.data.bz = data.orderDetail.bz;
      this.data.wgsj = data.orderDetail.wgsj;

      this.data.hjpf = data.titaniumAlloyDoorDetail.hjpf;
      this.data.hjsl = data.titaniumAlloyDoorDetail.hjsl;
      this.ccxx = data.hangingSizeList;
      this.changeData();
    },
    /** value转换label */
    changeData() {
      this.typeDdlx.forEach((e) => {
        if (this.data.ddlx === e.value) {
          this.data.ddlx = e.label;
        }
      });
      this.typeScsl.forEach((e) => {
        if (this.data.scsl === e.value) {
          this.data.scsl = e.label;
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
@import '../../../style/mixin.less';
.print-table-style {
  // 调整打印样式
  width:94%;
  margin-left:2.5%;
  border:solid #333;
  border-width:1px 0px 0px 1px;
  font-size: 1.4em;
  border-collapse: collapse;
  border-spacing: 0;
  text-align:center;
  font-family: 'FangSong';
  color:#000;
  font-weight: bolder;
  table-layout:fixed;
}
.print-table-style-title {
  font-size: 2.5em;
  letter-spacing: 6px;
  font-weight: lighter;
}
.print-table-style tr {
  min-width: 200px;
}
.print-table-style th td {
  width: 120px;
  height: 50px;
  text-align: center;
}
.print-span-div {
  margin-left: 35px;
  width: 73vw;
  height: 120px;
  text-align: left;
}
.print-span-th {
  font-family: 'FangSong';
  font-weight: bolder;
  color:#000;
  font-size: 1.3em;
  padding: 0 10px 0 0;
}
.print-span-content {
  font-family: 'FangSong';
  font-weight: bolder;
  color:#000;
  font-size: 1.3em;
  margin: 0 30px 0 0;
}
</style>
