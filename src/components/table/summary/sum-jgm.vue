<template lang='pug'>
  div.table-sum-jgm
    table.jgm-table-style(border)
      tr
        td.jgm-table-style-title(colspan="11" cellspacing="0" cellpadding="0") 艺合橱柜门生产订单
      tr(style="height:30px;")
        th 编号：
        td(colspan="2" style="margin-left: 5px;") {{ data.bh }}
        th 客户：
        td(colspan="2" style="margin-left: 5px;") {{ data.khxm }}
        th 地址：
        td(colspan="2") {{ data.dz }}
        th 是否加急：
        td {{ data.scsl }}
      tr(style="height:30px;")
        th 类型：
        td {{ data.xdlx }}
        th 制单人：
        td {{ data.cjr }}
        th 制单日期：
        td(colspan="2") {{ data.cjsj }}
        th 备注：
        td(colspan="3") {{ data.bz }}
      tr
        tr(style="height:30px;")
          th(rowspan="2") 名称
          th(rowspan="2") 拉手
          th(rowspan="2") 颜色
          th(colspan="2") 铝合金尺寸
          th(rowspan="2") 平方
          th(rowspan="2") 片数
          th(rowspan="2") 备注
          th(colspan="2") 玻璃尺寸
          th(rowspan="2") 平方
        tr(style="height:30px;")
          th 高
          th 宽
          th 高
          th 宽
      tr(v-for="item in ccxx" style="height:30px;")
        td(:rowspan="item.cclxspan" :style="{ display: item.cclxdis }") {{ item.cclx === 0 ? '地柜' : '吊柜' }}
        td(:rowspan="item.lsspan" :style="{ display: item.lsdis }") {{ item.ls }}
        td(:rowspan="item.ysspan" :style="{ display: item.ysdis }") {{ item.ys }}
        td {{ item.lhjgd }}
        td {{ item.lhjkd }}
        td {{ item.lhjpf }}
        td {{ item.ps }}
        td {{ item.bz }}
        td {{ item.blgd }}
        td {{ item.blkd }}
        td {{ item.blpf }}
      tr(style="height:30px;")
        td 合计
        td
        td
        td
        td
        td {{ data.hjlhjpf }}
        td {{ data.hjps }}
        td
        td
        td
        td {{ data.hjblpf }}
</template>

<script>
import _ from 'lodash';
import { KHXD_JGM_XDLX, KHXD_JGM_SCSL } from '@store/common/khxd/jgm/xjbd/module';
export default {
  data () {
    return {
      data: {
        bh: '',
        khxm: '',
        dz: '',
        dh: '',
        xdlx: '',
        gq: '',
        cjr: '',
        cjsj: '',
        bz: '',
        hjlhjpf: 0.000,
        hjblpf: 0.000,
        hjps: 0
      },
      ccxx: [],
      xdlx: KHXD_JGM_XDLX,
      scsl: KHXD_JGM_SCSL
    };
  },
  methods: {
    show(data) {
      this.changeData(data.xdxx);
      this.combineCell(data.ccxx);
    },
    /** 数据处理-合并单元格 */
    combineCell(list) {
      for (var field in list[0]) {
        if (field === 'cclx' || field === 'ls' || field === 'ys') {
          var k = 0;
          while (k < list.length) {
            list[k][field + 'span'] = 1;
            list[k][field + 'dis'] = '';
            for (var i = k + 1; i <= list.length - 1; i++) {
              if (list[k][field] === list[i][field] && list[k][field] !== '' && list[k]['cclx'] === list[i]['cclx']) {
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
    /** value转换label */
    changeData(data) {
      this.data = _.cloneDeep(data);
      this.xdlx.forEach((e) => {
        if (this.data.xdlx === e.value) {
          this.data.xdlx = e.label;
        }
      });
      this.scsl.forEach((e) => {
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
.jgm-table-style {
  // 调整打印样式
  width:79%;
  margin-left:2%;
  border:solid #333;
  border-width:1px 0px 0px 1px;
  font-size: 1.2em;
  border-collapse: collapse;
  border-spacing: 0;
  text-align:center;
  font-family: 'FangSong';
  color:#000;
  font-weight: bolder;
  table-layout:fixed;
}
.jgm-table-style tr {
  min-width: 200px;
}
.jgm-table-style th td {
  width: 100px;
  text-align: center;
}
.jgm-table-style-title {
  font-size: 2.5em;
  letter-spacing: 6px;
  font-weight: lighter;
}
</style>
