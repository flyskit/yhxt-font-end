<template lang='pug'>
  div.table-print-ykl
    div
      table.print-table-style(border)
        tr
          td.print-table-style-title(colspan="11" cellspacing="0" cellpadding="0") 艺合亚克力门生产订单
        tr(style="height:30px;")
          th 编号：
          td(colspan="2" style="margin-left: 5px;") {{ data.ddbh }}
          th 客户：
          td(colspan="2" style="margin-left: 5px;") {{ data.khxm }}
          th 地址：
          td(colspan="4") {{ data.dz }}
        tr(style="height:30px;")
          th 类型：
          td {{ data.ddlx }}
          th 工期：
          td {{ data.gq }}天
          th 速度：
          td {{ data.scsl }}
          th 备注：
          td(colspan="4") {{ data.bz }}
        tr
          tr(style="height:30px;")
            th(rowspan="2") 名称
            th(rowspan="2") 拉手
            th(rowspan="2") 颜色
            th(colspan="2") 门板尺寸
            th(rowspan="2") 平方
            th(rowspan="2") 片数
            th(rowspan="2") 备注
            th(colspan="2") 板材尺寸
            th(rowspan="2") 平方
          tr(style="height:30px;")
            th 高
            th 宽
            th 高
            th 宽
        tr(v-for="item in ccxx" style="height:30px;")
          td(:rowspan="item.cclxspan" :style="{ display: item.cclxdis }") {{ item.cclx === 0 ? '地柜' : '吊柜' }}
          td {{ data.lsmc }}
          td {{ data.ys }}
          td {{ item.mbgd }}
          td {{ item.mbkd }}
          td {{ item.mbpf }}
          td {{ item.sl }}
          td {{ item.bz }}
          td {{ item.blgd }}
          td {{ item.blkd }}
          td {{ item.blpf }}
        tr(style="height:30px;")
          td 合计
          td(colspan="4")
          td {{ data.hjpf }}
          td {{ data.hjsl }}
          td(colspan="3")
          td {{ data.bcpf }}
        tr(style="height:30px;")
          td 配件
          td(colspan="10") {{ accessoryListInfo }}
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
        span.print-span-content 客户签字:
        span.print-span-content 财务签字:
      p
        span.print-span-th 尊敬的客户：1.发物流情况下，取货时默认验收签字，未付清账款则此单自动变为欠账凭证。
      p
        span.print-span-th 2.收货后三天内确认货的质量，三天之后无异议即为合格，本公司不予负责。电话：13540425238
      p
        span.print-span-th 附：艺合门业(卖方) 地址：成都市郫都区团结镇石桥村十一组
</template>

<script>
import _ from 'lodash';
import { ORDER_DDLX, ORDER_SCSL } from '@store/common/common/module';
export default {
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
        bcpf: 0.000,
        hjsl: 0,
        lsmc: '',
        ys: ''
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

      this.data.lsmc = data.acrylicDetail.lsmc;
      this.data.ys = data.acrylicDetail.ys;
      this.data.hjpf = data.acrylicDetail.hjpf;
      this.data.bcpf = data.acrylicDetail.bcpf;
      this.data.hjsl = data.acrylicDetail.hjsl;
      this.changeData();
      this.combineCell(data.cupboardDoorSizes);
    },
    /** 数据处理-合并单元格 */
    combineCell(list) {
      for (var field in list[0]) {
        if (field === 'lx') {
          var k = 0;
          while (k < list.length) {
            list[k][field + 'span'] = 1;
            list[k][field + 'dis'] = '';
            for (var i = k + 1; i <= list.length - 1; i++) {
              if (list[k][field] === list[i][field] && list[k][field] !== '' && list[k]['lx'] === list[i]['lx']) {
                list[k][field + 'span']++;
                list[k][field + 'dis'] = '';
                list[i][field + 'span'] = 1;
                list[i][field + 'dis'] = 'none';
              } else {
                break;
              }
            }
            k = i;
          }
        }
      }
      this.ccxx = _.cloneDeep(list);
    },
    // combineCell(list) {
    //   for (var field in list[0]) {
    //     var k = 0;
    //     while (k < list.length) {
    //       list[k][field + 'span'] = 1;
    //       list[k][field + 'dis'] = '';
    //       for (var i = k + 1; i <= list.length - 1; i++) {
    //         if (list[k][field] === list[i][field] && list[k][field] !== '') {
    //           list[k][field + 'span']++;
    //           list[k][field + 'dis'] = '';
    //           list[i][field + 'span'] = 1;
    //           list[i][field + 'dis'] = 'none';
    //         } else {
    //           break;
    //         }
    //       }
    //       k = i;
    //     }
    //   }
    //   this.ccxx = _.cloneDeep(list);
    // },
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
