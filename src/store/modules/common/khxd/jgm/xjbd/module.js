export const KHXD_JGM_CCLX = [
  {
    value: 0,
    label: '地柜'
  },
  {
    value: 1,
    label: '吊柜'
  }
];

export const KHXD_JGM_XDLX = [
  {
    value: 0,
    label: '新订单'
  },
  {
    value: 1,
    label: '返工重做'
  }
];

// 客户下单-晶钢门-列表字段
export const KHXD_JGM_COLUMNS = [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '尺寸类型',
    key: 'cclx',
    align: 'center',
    render: function (h, v) {
      KHXD_JGM_CCLX.forEach(function (element) {
        if (v.row.cclx === element.value) {
          v.row.cclx = element.label;
        }
      });
      return h('div', v.row.cclx);
    }
  },
  {
    title: '拉手',
    key: 'ls',
    align: 'center'
  },
  {
    title: '颜色',
    key: 'ys',
    align: 'center'
  },
  {
    title: '铝合金尺寸',
    key: 'lhjcc',
    align: 'center',
    children: [
      {
        title: '高度',
        key: 'lhjgd',
        align: 'center'
      },
      {
        title: '宽度',
        key: 'lhjkd',
        align: 'center'
      }
    ]
  },
  {
    title: '片数',
    key: 'ps',
    align: 'center'
  },
  {
    title: '铝合金平方',
    key: 'lhjpf',
    align: 'center'
  },
  {
    title: '备注',
    key: 'bz',
    align: 'center',
    tooltip: true
  },
  {
    title: '玻璃尺寸',
    key: 'blcc',
    align: 'center',
    children: [
      {
        title: '高度',
        key: 'blgd',
        align: 'center'
      },
      {
        title: '宽度',
        key: 'blkd',
        align: 'center'
      }
    ]
  },
  {
    title: '玻璃平方',
    key: 'blpf',
    align: 'center'
  }
];
