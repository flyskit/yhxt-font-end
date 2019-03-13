<template lang='pug'>
  div.table-summary-jgm
    table.jgm-table-style(border)
      tr
        td.jgm-table-style-title(colspan="11") 艺合橱柜门生产订单
      tr
        th(width="100px") 编号：
        td(align="left" style="margin-left: 5px;") {{ test_data.kh }}
        th(width="100px") 客户：
        td(align="left" style="margin-left: 5px;") {{ test_data.kh }}
        th(width="100px") 地址：
        td(align="left" colspan="6") {{ test_data.dz }}
      tr
        th(width="100px") 下单类型：
        td(align="left") {{ row.xdlx === 0 ? '新订单' : '返工重做' }}
        th(width="100px") 生产日期：
        td(align="left") {{ test_data.scsj }}
        th 备注：
        td(aling="left" colspan="6") {{ test_data.ddbz }}
      tr
        th(width="100px") 名称
        th 色号
        th(width="100px") 拉手
        th(colspan="2" width="100px") 铝合金尺寸
          tr
            th.inline-style-left(width="100px") 高
            th.inline-style-right(width="100px") 宽
        th(width="100px") 平方
        th(style="width:20px") 片数
        th(width="300px") 备注
        th(colspan="2" style="width=100px;") 玻璃尺寸
          tr
            th.inline-style-left(width="100px") 高
            th.inline-style-right(width="100px") 宽
        th(width="100px") 平方
      tbody(v-for="(tr_item, index) in test_data.fl" :key="index")
        tr
          td(:rowspan = "cc_length") {{ tr_item.lx }}
          td(:rowspan = "cc_length") {{ tr_item.ys }}
          td(:rowspan = "cc_length") {{ tr_item.ls }}
        tr(v-for="(item_0, index) in tr_item.cc" :key="index")
          td {{ item_0.cc_hight }}
          td {{ item_0.cc_width }}
          td {{ item_0.cc_pf }}
          td {{ item_0.ps }}
          td {{ item_0.bz }}
          td {{ item_0.bl_hight }}
          td {{ item_0.bl_width }}
          td {{ item_0.bl_pf }}
      tr
        td 合计
        td
        td
        td
        td
        td {{ test_data.hj_lhj_pf }}
        td {{ test_data.hj_lhj_ps }}
        td
        td
        td
        td {{ test_data.hj_bl_pf }}
</template>

<script>
export default {
  data () {
    return {
      cc_length: '5',
      data: {
        xdxx: {
          bh: '',
          khxm: '',
          dz: '',
          dh: '',
          xdlx: '',
          gq: '',
          bz: '',
          hjlhjpf: 0.000,
          hjblpf: 0.000,
          hjps: 0,
          zt: ''
        },
        ccxx: []
      },
      test_data: {
        kh: '李四',
        dz: '四川省成都市龙泉驿区成龙大道二段1819号',
        bh: '1001',
        scsj: '2018-01-01',
        ddbz: '注意质量，切勿漏单',
        hj_lhj_pf: 3.08,
        hj_lhj_ps: 10,
        hj_bl_pf: 3.00,
        fl: [
          {
            lx: '吊柜',
            ys: 'YH-669',
            ls: '2号银白隐框',
            cc: [
              {
                cc_hight: 660,
                cc_width: 320,
                cc_pf: 0.235,
                ps: 1,
                bz: '',
                bl_hight: 660,
                bl_width: 320,
                bl_pf: 0.235
              },
              {
                cc_hight: 660,
                cc_width: 320,
                cc_pf: 0.235,
                ps: 1,
                bz: '开孔',
                bl_hight: 660,
                bl_width: 320,
                bl_pf: 0.235
              },
              {
                cc_hight: 660,
                cc_width: 320,
                cc_pf: 0.235,
                ps: 4,
                bz: '',
                bl_hight: 660,
                bl_width: 320,
                bl_pf: 0.235
              },
              {
                cc_hight: 660,
                cc_width: 320,
                cc_pf: 0.235,
                ps: 2,
                bz: '阿斯顿发明是东方马山东两句话就我那',
                bl_hight: 660,
                bl_width: 320,
                bl_pf: 0.235
              }
            ]
          },
          {
            lx: '地柜',
            ys: 'YH-671',
            ls: '2号银白隐框',
            cc: [
              {
                cc_hight: 660,
                cc_width: 320,
                cc_pf: 0.235,
                ps: 1,
                bz: '',
                bl_hight: 660,
                bl_width: 320,
                bl_pf: 0.235
              },
              {
                cc_hight: 660,
                cc_width: 320,
                cc_pf: 0.235,
                ps: 1,
                bz: '开孔',
                bl_hight: 660,
                bl_width: 320,
                bl_pf: 0.235
              },
              {
                cc_hight: 660,
                cc_width: 320,
                cc_pf: 0.235,
                ps: 4,
                bz: '',
                bl_hight: 660,
                bl_width: 320,
                bl_pf: 0.235
              },
              {
                cc_hight: 660,
                cc_width: 320,
                cc_pf: 0.235,
                ps: 2,
                bz: '阿斯顿发明是东方马山东两句话就我那',
                bl_hight: 660,
                bl_width: 320,
                bl_pf: 0.235
              }
            ]
          }
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
    show(data) {
      console.log(data);
    }
  }
};
</script>
<style lang='less' scoped>
@import '../../../style/mixin.less';
.jgm-table-style {
  width:90%;
  margin-left:5%;
  border:solid #333;
  border-width:1px 0px 0px 1px;
  font-size: 1.2em;
  border-collapse: collapse;
  border-spacing: 0;
  text-align:center;
  font-family: 'FangSong';
  color: #444;
}
.jgm-table-style td {
  width: 100px;
}
.jgm-table-style-title {
  font-size: 2.5em;
  letter-spacing: 6px;
  font-weight: lighter;
}
// 内部左边边框框线
.jgm-table-style .inline-style-left {
  border-left-style:none;
  border-bottom-style:none;
}
// 内部右边边框框线
.jgm-table-style .inline-style-right {
  border-right-style:none;
  border-left-style:none;
  border-bottom-style:none
}
</style>
