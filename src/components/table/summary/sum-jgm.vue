<template lang='pug'>
  div.table-summary-jgm
    table.jgm-table-style(border)
      tr
        td.jgm-table-style-title(colspan="11") 艺合橱柜门生产订单
      tr
        th(width="100px") 编号：
        td(colspan="2" style="margin-left: 5px;") {{ data.bh }}
        th(width="100px") 客户：
        td(colspan="2" style="margin-left: 5px;") {{ data.khxm }}
        th(width="100px") 地址：
        td(colspan="4") {{ data.dz }}
      tr
        th(width="100px") 类型：
        td(colspan="1") {{ data.xdlx }}
        th(width="100px") 制单人：
        td(colspan="1") {{ data.cjr }}
        th(width="100px") 日期：
        td(colspan="2") {{ data.cjsj }}
        th(width="100px") 备注：
        td(colspan="4") {{ data.bz }}
      tr
        th(width="100px") 名称
        th 拉手
        th(width="100px") 颜色
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
      tbody(v-for="(tr_item, index) in data.fl" :key="index")
        tr
          td(:rowspan = "cc_length") {{ tr_item.cclx === 0 ? '地柜' : '吊柜' }}
          td(:rowspan = "cc_length") {{ tr_item.ls }}
          td(:rowspan = "cc_length") {{ tr_item.ys }}
        tr(v-for="(item_0, index) in tr_item.cc" :key="index")
          td {{ item_0.lhjgd }}
          td {{ item_0.lhjkd }}
          td {{ item_0.lhjpf }}
          td {{ item_0.ps }}
          td {{ item_0.bz }}
          td {{ item_0.blgd }}
          td {{ item_0.blkd }}
          td {{ item_0.blpf }}
      tr
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
import { KHXD_JGM_XDLX } from '@store/common/khxd/jgm/xjbd/module';
export default {
  data () {
    return {
      cc_length: 10,
      time: '2019-03-13',
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
        hjps: 0,
        fl: []
      },
      jbxx: {
        cclx: '',
        ls: '',
        ys: '',
        cc: []
      },
      sumIdx: 0,
      sumJudge: true,
      xdlx: KHXD_JGM_XDLX
    };
  },
  methods: {
    show(data) {
      this.computedData(data);
    },
    computedData(data) {
      let idx = 0;
      this.data.bh = data.xdxx.bh;
      this.data.khxm = data.xdxx.khxm;
      this.data.dz = data.xdxx.dz;
      this.data.dh = data.xdxx.dh;
      this.xdlx.forEach((e) => {
        if (data.xdxx.xdlx === e.value) {
          this.data.xdlx = e.label;
        }
      });
      this.data.gq = data.xdxx.gq;
      this.data.cjr = data.xdxx.cjr;
      this.data.cjsj = data.xdxx.cjsj;
      this.data.bz = data.xdxx.bz;
      this.data.hjlhjpf = data.xdxx.hjlhjpf;
      this.data.hjblpf = data.xdxx.hjblpf;
      this.data.hjps = data.xdxx.hjps;
      data.ccxx.forEach((e) => {
        if (this.sumJudge) {
          this.addJbxx(e, idx);
          this.sumIdx = this.sumIdx + 1;
          idx = idx + 1;
          this.sumJudge = false;
        } else {
          if (this.jbxx.cclx === e.cclx) {
            this.jbxx.cc[idx] = _.cloneDeep(e);
            idx = idx + 1;
          } else {
            this.data.fl[this.sumIdx - 1] = _.cloneDeep(this.jbxx);
            this.cc_length = this.cc_length < this.jbxx.cc.length ? this.jbxx.cc.length : this.cc_length;
            idx = 1;
            this.sumJudge = true;
            this.jbxx.cc = [];
            this.addJbxx(e, 0);
          }
        }
      }, this);
      this.data.fl[this.sumIdx - 1] = _.cloneDeep(this.jbxx);
      this.cc_length = this.cc_length < this.jbxx.cc.length ? this.jbxx.cc.length : this.cc_length;
    },
    addJbxx(e, idx) {
      this.jbxx.cclx = e.cclx;
      this.jbxx.ls = e.ls;
      this.jbxx.ys = e.ys;
      this.jbxx.cc[idx] = _.cloneDeep(e);
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
  color:#444;
}
.jgm-table-style td {
  width: 100px;
  text-align: center;
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
