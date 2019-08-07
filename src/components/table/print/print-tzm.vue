<template lang='pug'>
  div.table-print-tzm
    div
      table.print-table-style
        tr
          td.print-table-style-title(align="center" colspan="14") 艺合({{ data.mblx }})生产订单-{{ isNext ? '主单' : '次单'}}
        tr(style="height:30px;")
          th 编号:
          td(style="color:red") {{ data.ddbh }}
          th 客户:
          td {{ data.khxm }}
          th 地址:
          td(colspan="2") {{ data.dz }}
          th 类型:
          td {{ data.ddlx }}
          th 工期:
          td(style="color:red") {{ data.gq }}天
          th 出货日期:
          td(colspan="2" style="color:red") {{ data.wgsj }}
        tr(style="height:30px;")
          th 备注:
          td(colspan="11") {{ data.bz }}
        tr(style="height:30px;")
          th 开门扇数:
          td {{ data.pkmms }}
          th 开门套数:
          td {{ data.pkmts }}
          th 推门扇数:
          td {{ data.tmms }}
          th 推门套数:
          td {{ data.tmts }}
          th 合计门套:
          td {{ data.hjmt }}
          th 合计线条:
          td(colspan="3") {{ data.hjxt }}
    div
      span.span-print-tzm(:style="{ display: isSwing ? '' : 'none' }") 平开门
      table.print-table-style-border(border :style="{ display: isSwing ? '' : 'none' }")
        tr
          tr(style="height:30px;")
            th(rowspan="2") 材质
            th(rowspan="2") 造型
            th(rowspan="2") 颜色
            th(rowspan="2") 面板
            th(rowspan="2") 油漆
            th(rowspan="2") 墙体
            th(rowspan="2") 门类型
            th(colspan="3") 门洞尺寸
            th(colspan="2") 门扇尺寸
            th(rowspan="2") 门扇数量
            th(rowspan="2") 套子
            th(rowspan="2") 尺寸个数
            th(rowspan="2") 备注
          tr(style="height:30px;")
            th 高
            th 宽
            th 厚
            th 高
            th 宽
        tr(v-for="item in swingSizeList" style="height:30px;")
          td {{ item.cz }}
          td {{ item.zx }}
          td {{ item.ys }}
          td {{ item.mb }}
          td {{ item.yq }}
          td {{ item.qt }}
          td {{ item.kmlx }}
          td {{ item.mdgd }}
          td {{ item.mdkd }}
          td {{ item.mdhd }}
          td {{ item.msgd }}
          td {{ item.mskd }}
          td {{ item.mssl }}
          td {{ item.mtsl }}
          td {{ item.ts }}
          td {{ item.bz }}
        tr(style="height:30px;")
          td 合计
          td(colspan="10")
          td {{ data.pkmms }}
          td
          td {{ data.pkmts }}
          td
          td
      pre
    div(:style="{ display: isHanging ? '' : 'none' }")
      span.span-print-tzm 推拉门
      table.print-table-style-border(border)
        tr
          tr(style="height:30px;")
            th(rowspan="2") 材质
            th(rowspan="2") 造型
            th(rowspan="2") 颜色
            th(rowspan="2") 面板
            th(rowspan="2") 油漆
            th(rowspan="2") 墙体
            th(rowspan="2") 门类型
            th(rowspan="2") 玻璃
            th(colspan="3") 门洞尺寸
            th(colspan="2") 门扇尺寸
            th(rowspan="2") 门扇数量
            th(rowspan="2") 套子
            th(rowspan="2") 尺寸个数
            th(rowspan="2") 备注
          tr(style="height:30px;")
            th 高
            th 宽
            th 厚
            th 高
            th 宽
        tr(v-for="item in hangingSizeList" style="height:30px;")
          td {{ item.cz }}
          td {{ item.zx }}
          td {{ item.ys }}
          td {{ item.mb }}
          td {{ item.yq }}
          td {{ item.qt }}
          td {{ item.tmlx }}-{{ item.tmwz }}
          td {{ item.bl }}
          td {{ item.mdgd }}
          td {{ item.mdkd }}
          td {{ item.mdhd }}
          td {{ item.msgd }}
          td {{ item.mskd }}
          td {{ item.mssl }}
          td {{ item.mtsl }}
          td {{ item.ts }}
          td {{ item.bz }}
        tr(style="height:30px;")
          td 合计
          td(colspan="11")
          td {{ data.tmms }}
          td
          td {{ data.tmts }}
          td
          td
      pre
    div(:style="{ display: isPocket ? '' : 'none' }")
      span.span-print-tzm 空套
      table.print-table-style-border(border)
        tr
          tr(style="height:30px;")
            th(rowspan="2") 材质
            th(rowspan="2") 造型
            th(rowspan="2") 颜色
            th(rowspan="2") 面板
            th(rowspan="2") 油漆
            th(rowspan="2") 类别
            th(colspan="3") 尺寸
            th(rowspan="2") 套子
            th(rowspan="2") 尺寸个数
            th(rowspan="2") 备注
          tr(style="height:30px;")
            th 高
            th 宽
            th 厚
        tr(v-for="item in pocketSizeList" style="height:30px;")
          td {{ item.cz }}
          td {{ item.zx }}
          td {{ item.ys }}
          td {{ item.mb }}
          td {{ item.yq }}
          td {{ item.lb }}
          td {{ item.gd }}
          td {{ item.kd }}
          td {{ item.hd }}
          td {{ item.mtsl }}
          td {{ item.ts }}
          td {{ item.bz }}
      pre
    div(:style="{ display: isLine ? '' : 'none' }")
      span.span-print-tzm 线条
      table.print-table-style-border(border)
        tr
          tr(style="height:30px;")
            th 材质
            th 造型
            th 颜色
            th 面板
            td 油漆
            th 类别
            th 规格
            th 数量
            th 备注
        tr(v-for="item in lineSizeList" style="height:30px;")
          td {{ item.cz }}
          td {{ item.zx }}
          td {{ item.ys }}
          td {{ item.mb }}
          td {{ item.yq }}
          td {{ item.lb }}
          td {{ item.gg }}
          td {{ item.ts }}
          td {{ item.bz }}
      pre
    div(:style="{ display: isNext ? '' : 'none' }")
      table.print-table-style
        tr(style="height:20px;")
          td 下单时间:
          td {{ data.czsj }}
          td 木工接收日期:
          td
          td 木工完工日期:
          td
          td 雕花日期:
          td
        tr(style="height:30px;")
          td 打磨接收日期:
          td
          td 打磨完工日期:
          td
          td 喷底漆接收日期:
          td
          td 喷底漆完工日期:
          td
        tr(style="height:30px;")
          td 打磨接收日期:
          td
          td 打磨完工日期:
          td
          td 喷面漆接收日期:
          td
          td 喷面漆完工日期:
          td
        tr(style="height:30px;")
          td 出货打包日期:
          td
          td(style="color:red") 返工原因:
          td(colspan="5")
</template>

<script>
import _ from 'lodash';
import { ORDER_DDLX, ORDER_SCSL } from '@store/common/common/module';
import { KHXD_TZM_MBLX } from '@store/common/khxd/tzm/xjbd/module';
export default {
  data () {
    return {
      data: {
        ddbh: '',
        ddlx: '',
        dz: '',
        gq: '',
        bz: '',
        czr: '',
        czsj: '',
        wgsj: '',
        mblx: '',
        pkmms: '',
        pkmts: '',
        tmms: '',
        tmts: '',
        hjmt: '',
        hjxt: ''
      },
      swingSizeList: [],
      hangingSizeList: [],
      pocketSizeList: [],
      lineSizeList: [],
      accessoryListInfo: '',
      typeDdlx: ORDER_DDLX,
      typeScsl: ORDER_SCSL,
      typeMblx: KHXD_TZM_MBLX,
      isSwing: false,
      isHanging: false,
      isPocket: false,
      isLine: false,
      isNext: true
    };
  },
  methods: {
    show(data, czr, czsj, isMain) {
      this.isNext = isMain;
      this.data.czr = czr;
      this.data.czsj = czsj;
      this.accessoryListInfo = data.accessoryListInfo;

      this.data.ddbh = data.orderDetail.ddbh;
      this.data.ddlx = data.orderDetail.ddlx;
      this.data.khxm = data.orderDetail.khxm;
      this.data.gq = data.orderDetail.gq;
      this.data.bz = data.orderDetail.bz;
      this.data.dz = data.orderDetail.dz;
      this.data.wgsj = (data.orderDetail.wgsj).substring(0, 10);

      this.data.mblx = data.suitDetail.mblx;
      this.data.pkmms = data.suitDetail.pkmms;
      this.data.pkmts = data.suitDetail.pkmts;
      this.data.tmms = data.suitDetail.tmms;
      this.data.tmts = data.suitDetail.tmts;
      this.data.hjmt = data.suitDetail.hjmt;
      this.data.hjxt = data.suitDetail.hjxt;
      this.changeData();
      if (data.swingSizeList.length !== 0) {
        this.isSwing = true;
        this.swingSizeList = _.cloneDeep(data.swingSizeList);
      }
      if (data.hangingSizeList.length !== 0) {
        this.isHanging = true;
        this.hangingSizeList = _.cloneDeep(data.hangingSizeList);
      }
      if (data.suitPocketDetailList.length !== 0) {
        this.isPocket = true;
        this.pocketSizeList = _.cloneDeep(data.suitPocketDetailList);
      }
      if (data.suitLineDetailsList.length !== 0) {
        this.isLine = true;
        this.lineSizeList = _.cloneDeep(data.suitLineDetailsList);
      }
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
      this.typeMblx.forEach((e) => {
        if (this.data.mblx === e.value) {
          this.data.mblx = e.label;
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
  width:98%;
  margin-left:1%;
  font-size: 1.5em;
  border-collapse: collapse;
  border-spacing: 0;
  text-align:left;
  font-family: 'FangSong';
  color:#000;
  font-weight: bolder;
  table-layout:fixed;
  position: relative;
}
.print-table-style-title {
  font-size: 2.5em;
  letter-spacing: 6px;
  font-weight: lighter;
  text-align: center;
}
.print-table-style th {
  width: 60px;
  min-width: 30px;
  text-align: right;
}
.print-table-style-border {
  // 调整打印样式
  width:98%;
  margin-left:1%;
  border:solid #333;
  border-width:1px 0px 0px 1px;
  font-size: 1.4em;
  border-collapse: collapse;
  border-spacing: 0;
  text-align:center;
  font-family: 'FangSong';
  background-color: rgb(225, 241, 232);
  color:#000;
  font-weight: bolder;
  table-layout:fixed;
  position: relative;
}
.span-print-tzm {
  font-size: 2em;
  font-family: 'FangSong';
  color:#000;
  font-weight: bolder;
}
</style>
