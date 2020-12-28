<template lang='pug'>
  div.table-print-jgm
    Modal(v-model="visible" @on-ok="ok" @on-cancel="ok" fullscreen footer-hide)
      p(slot="header" style="color:#f60")
        Icon(type="ios-information-circle")
        span 预览
        div(style="width:100%;text-align:center;margin-bottom:20px;")
          span(style="font-size:2em;letter-spacing: 6px;font-weight: lighter;") 成都柯迈家具(艺合门业)晶钢门销售单
        div
          table.print-table-style
            tr(style="height:30px;")
              th(colspan="2") 订单编号：{{ orderDetail.ddbh }}
              th 客户姓名：{{ orderDetail.khxm }}
              th(colspan="4") 地址： {{ orderDetail.dz }}
              th 电话：{{ orderDetail.dh }}
              th 工期：{{ orderDetail.gq }} 天
        div
          Table(:columns="columns" :data="sizeData" size="small" border)
            template(slot="lx" slot-scope="{ row, index }")
              span {{ row.lx === 0 ? '地柜' : '吊柜' }}
            template(slot="mbgd" slot-scope="{ row, index }")
              span {{ row.mbgd }}
            template(slot="mbkd" slot-scope="{ row, index }")
              span {{ row.mbkd }}
            template(slot="sl" slot-scope="{ row, index }")
              span {{ row.sl }}
            template(slot="mbpf" slot-scope="{ row, index }")
              span {{ row.mbpf }}
            template(slot="bz" slot-scope="{ row, index }")
              span {{ row.bz }}
        div(:style="{ display: surchargeDisplay }")
          Divider
            span 额外附加费用
          Table(:columns="surchargeColumns" :data="surchargeData" size="small" border)
            template(slot="mc" slot-scope="{ row, index }")
              span {{ row.mc }}
            template(slot="sslx" slot-scope="{ row, index }")
              span {{ row.sslx === 0 ? '五金配件' : '加工费' }}
            template(slot="sl" slot-scope="{ row, index }")
              span {{ row.sl }}
            template(slot="dw" slot-scope="{ row, index }")
              span {{ row.dw }}
            template(slot="dj" slot-scope="{ row, index }")
              span {{ row.dj }}
            template(slot="je" slot-scope="{ row, index }")
              span {{ row.je }}
            template(slot="bz" slot-scope="{ row, index }")
              span {{ row.bz }}
        div
          table.print-table-style
            tr(style="height:30px;")
              th
                span 门板拉手：
                span(style="color:red;") {{ doorDetail.ls }}
              th
                span 门板颜色：
                span(style="color:red;") {{ doorDetail.ys }}
              th
                span 合计平方：
                span(style="color:red;") {{ doorDetail.hjpf }}
              th
                span 门板数量：
                span(style="color:red;") {{ doorDetail.hjsl }} 扇
              th
                span 门板单价：
                span(style="color:red;") {{ doorDetail.dj }} 元/平方
              th
                span 门板费用：
                span(style="color:red;") {{ doorDetail.mbje }} 元
              th
                span 附加费用：
                span(style="color:red;") {{ surchargeMoney }} 元
              th
                span 合计金额：
                span(style="color:red;") {{ orderDetail.zje }} 元
        div.print-span-div
          p
            span 尊敬的客户：
          p
            span 1.发物流情况下，客户取货时默认验收签字，未付清账款则此单自动变为欠账凭证;
          p
            span 2.收货后三天内确认货的质量，三天之后无异议即为合格，本公司不予负责。电话：178-8238-9475;
          p
            span 3.色卡颜色仅供参考，请以实物为准;
          p
            span(style="margin-right: 30px;") 制单人: 张奇
            span 制单时间:{{ cjsj }}
</template>

<script>
import _ from 'lodash';
import { KHXD_JGM_CCLX, KHXD_JGM_CCXX_DYYL, KHXD_JGM_SURCHARGE_DYYL, SURCHARGE_TYPE } from '@store/common/khxd/jgm/xjbd/module';
export default {
  inject: ['reload'],
  data () {
    return {
      columns: KHXD_JGM_CCXX_DYYL,
      surchargeColumns: KHXD_JGM_SURCHARGE_DYYL,
      surchargeType: SURCHARGE_TYPE,
      doorType: KHXD_JGM_CCLX,
      orderDetail: {
        ddbh: '',
        ddlx: 0,
        ddly: 0,
        scsl: 0,
        gq: 5,
        khxm: '',
        dz: '',
        dh: '',
        zje: 0.0,
        bz: ''
      },
      doorDetail: {
        ls: '',
        ys: '',
        dj: 0,
        hjpf: '',
        blpf: '',
        hjsl: '',
        mbje: 0,
        yjdb: ''
      },
      // 尺寸信息
      sizeData: [],
      // 附加费用信息
      surchargeData: [],
      surchargeMoney: 0,
      surchargeDisplay: 'none',
      cjsj: '',
      visible: false
    };
  },
  methods: {
    show(orderDetail, doorDetail, sizeData, surchargeData, surchargeMoney) {
      this.orderDetail = _.clone(orderDetail);
      this.doorDetail = _.clone(doorDetail);
      this.sizeData = _.clone(sizeData);
      this.surchargeData = _.clone(surchargeData);
      this.surchargeMoney = _.clone(surchargeMoney);
      if (this.surchargeData.length === 0) {
        this.surchargeDisplay = 'none';
      } else {
        this.surchargeDisplay = '';
      }
      this.getCurrentTime();
      this.visible = true;
    },
    getCurrentTime() {
      let currentTime = new Date();
      let yy = currentTime.getFullYear();
      let mm = currentTime.getMonth() + 1;
      let dd = currentTime.getDate();
      let hh = currentTime.getHours();
      let mf = currentTime.getMinutes() < 10 ? '0' + currentTime.getMinutes() : currentTime.getMinutes();
      let ss = currentTime.getSeconds() < 10 ? '0' + currentTime.getSeconds() : currentTime.getSeconds();
      this.cjsj = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
    },
    /** ------------------------------------尺寸表格信息相关计算-------------------------------- */
    /** 合计处理 */
    sizeHandleSummary({ columns, data }) {
      const sums = {};
      columns.forEach((column, index) => {
        const key = column.key;
        if (index === 0) {
          sums[key] = {
            key,
            value: '合计'
          };
          return;
        }
        const values = data.map(item => Number(item[key]));
        if (!values.every(value => isNaN(value))) {
          const v = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (index === 4) {
            sums[key] = {
              key,
              value: v
            };
            this.doorDetail.hjsl = sums[key].value;
          } else if (index === 5) {
            sums[key] = {
              key,
              value: v.toFixed(3)
            };
            this.doorDetail.hjpf = sums[key].value;
          }
        } else {
          sums[key] = {
            key,
            value: ''
          };
        }
      });
      return sums;
    },
    /** --------------------------------------------------------------------------------------- */
    /** ------------------------------------附加费用相关计算-------------------------------- */
    /** 合计处理 */
    surchargeHandleSummary({ columns, data }) {
      const sums = {};
      columns.forEach((column, index) => {
        const key = column.key;
        if (index === 0) {
          sums[key] = {
            key,
            value: '合计'
          };
          return;
        }
        const values = data.map(item => Number(item[key]));
        if (!values.every(value => isNaN(value))) {
          const v = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (index === 6) {
            sums[key] = {
              key,
              value: v.toFixed(1)
            };
            this.surchargeMoney = v;
          }
        } else {
          sums[key] = {
            key,
            value: ''
          };
        }
      });
      return sums;
    },
    /** 关闭页面 */
    ok() {
      this.visible = false;
    }
  }
};
</script>
<style lang='less' scoped>
.span-th {
  font-size: 1.1em;
  letter-spacing: 2px;
  font-weight: lighter;
}
// @import '../../../style/mixin.less';
.print-table-style {
  // 调整打印样式
  width:100%;;
  font-size: 1em;
  border-collapse: collapse;
  border-spacing: 0;
  text-align:center;
  // font-family: 'FangSong';
  // color:#000;
  font-weight: bolder;
  table-layout:fixed;
}
// .print-table-style-title {
//   font-size: 2.5em;
//   letter-spacing: 6px;
//   font-weight: lighter;
// }
// .print-table-style tr {
//   min-width: 200px;
// }
// .print-table-style th td {
//   width: 120px;
//   height: 50px;
//   text-align: center;
// }
// .print-span-div {
//   margin-left: 35px;
//   width: 73vw;
//   height: 120px;
//   text-align: left;
// }
// .print-span-th {
//   font-family: 'FangSong';
//   font-weight: bolder;
//   color:#000;
//   font-size: 1.3em;
//   padding: 0 10px 0 0;
// }
// .print-span-content {
//   font-family: 'FangSong';
//   font-weight: bolder;
//   color:#000;
//   font-size: 1.3em;
//   margin: 0 30px 0 0;
// }
</style>
