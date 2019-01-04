// 收入字段

// 每日收支-收入类型
export const MRSZ_SR_LX = [
  {
    value: 1,
    label: '每日代收'
  },
  {
    value: 2,
    label: '彭州发货'
  },
  {
    value: 3,
    label: '下单定金'
  },
  {
    value: 4,
    label: '项目结算'
  },
  {
    value: 5,
    label: '网上下单'
  },
  {
    value: 6,
    label: '其他费用'
  }
];

// 每日收支-收入字段
export const MRSZ_SR_COLUMNS = [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '编号',
    key: 'bh',
    sortable: true,
    align: 'center'
  },
  {
    title: '录入日期',
    key: 'lrrq',
    width: 200,
    sortable: true,
    align: 'center'
  },
  {
    title: '收账日期',
    key: 'szrq',
    sortable: true,
    align: 'center'
  },
  {
    title: '客户姓名',
    key: 'khxm',
    align: 'center'
  },
  {
    title: '收入类型',
    key: 'srlx',
    sortable: true,
    align: 'center',
    render: function (h, v) {
      MRSZ_SR_LX.forEach(function(element) {
        if (v.row.srlx === element.value) {
          v.row.srlx = element.label;
        }
      });
      return h('div', v.row.srlx);
    }
  },
  {
    title: '收入金额',
    key: 'srje',
    sortable: true,
    align: 'center'
  },
  {
    title: '备注',
    key: 'bz',
    width: 240,
    align: 'center',
    tooltip: true
  }
];
