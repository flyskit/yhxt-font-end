/** 尺寸类型 */
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

/** 下单类型 */
export const KHXD_JGM_XDLX = [
  {
    value: 0,
    label: '新订单'
  },
  {
    value: 1,
    label: '补单'
  },
  {
    value: 2,
    label: '返工'
  }
];

/** 生产速率 */
export const KHXD_JGM_SCSL = [
  {
    value: 0,
    label: '普通'
  },
  {
    value: 1,
    label: '加急'
  }
];

// 订单来源
export const KHXD_JGM_DDLY = [
  {
    value: 0,
    label: '线下'
  },
  {
    value: 1,
    label: '1688'
  },
  {
    value: 2,
    label: '淘宝'
  }
];

/** 尺寸信息-表头 */
export const KHXD_JGM_CCXX = [
  {
    title: '尺寸类型',
    align: 'center',
    slot: 'cclx'
  },
  {
    title: '拉手',
    align: 'center',
    slot: 'ls'
  },
  {
    title: '颜色',
    align: 'center',
    slot: 'ys'
  },
  {
    title: '铝合金尺寸',
    align: 'center',
    children: [
      {
        title: '高度',
        align: 'center',
        slot: 'lhjgd'
      },
      {
        title: '宽度',
        align: 'center',
        slot: 'lhjkd'
      }
    ]
  },
  {
    title: '片数',
    align: 'center',
    slot: 'ps'
  },
  {
    title: '铝合金平方',
    align: 'center',
    slot: 'lhjpf'
  },
  {
    title: '备注',
    align: 'center',
    slot: 'bz'
  },
  {
    title: '操作',
    align: 'center',
    slot: 'action'
  }
];
