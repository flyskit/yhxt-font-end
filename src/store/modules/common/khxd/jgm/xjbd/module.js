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
    label: '新订单',
    disabled: false
  },
  {
    value: 1,
    label: '补单',
    disabled: false
  },
  {
    value: 2,
    label: '返工',
    disabled: true
  }
];

/** 生产速率 */
export const KHXD_JGM_SCSL = [
  {
    value: 0,
    label: '正常'
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

/** 订单信息-表头 */
export const KHXD_JGM_DDXX = [
  {
    title: '订单信息',
    align: 'center',
    children: [
      {
        title: '订单编号',
        align: 'center',
        slot: 'ddbh',
        width: 100
      },
      {
        title: '订单类型',
        align: 'center',
        slot: 'ddlx',
        width: 100
      },
      {
        title: '订单来源',
        align: 'center',
        slot: 'ddly',
        width: 100
      },
      {
        title: '生产速率',
        align: 'center',
        slot: 'scsl',
        width: 100
      },
      {
        title: '工期',
        align: 'center',
        slot: 'gq',
        width: 80
      },
      {
        title: '客户姓名',
        align: 'center',
        slot: 'khxm',
        width: 120
      },
      {
        title: '地址',
        align: 'center',
        slot: 'dz',
        width: 150
      },
      {
        title: '电话',
        align: 'center',
        slot: 'dh',
        width: 100
      },
      {
        title: '拉手',
        align: 'center',
        slot: 'ls',
        width: 100
      },
      {
        title: '单价',
        align: 'center',
        slot: 'dj',
        width: 100
      },
      {
        title: '颜色',
        align: 'center',
        slot: 'ys',
        width: 80
      },
      {
        title: '合计平方',
        align: 'center',
        slot: 'hjpf',
        width: 80
      },
      {
        title: '玻璃平方',
        align: 'center',
        slot: 'blpf',
        width: 80
      },
      {
        title: '合计数量',
        align: 'center',
        slot: 'hjsl',
        width: 80
      },
      {
        title: '金额',
        align: 'center',
        slot: 'je',
        width: 80
      },
      {
        title: '预计打包',
        align: 'center',
        slot: 'yjdb',
        width: 80
      },
      {
        title: '备注',
        align: 'center',
        slot: 'bz',
        width: 150
      }
    ]
  }
];

/** 尺寸信息-表头 */
export const KHXD_JGM_CCXX = [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '类型',
    align: 'center',
    slot: 'lx'
  },
  {
    title: '门板尺寸',
    align: 'center',
    children: [
      {
        title: '高度',
        align: 'center',
        slot: 'mbgd'
      },
      {
        title: '宽度',
        align: 'center',
        slot: 'mbkd'
      }
    ]
  },
  {
    title: '片数',
    align: 'center',
    slot: 'sl'
  },
  {
    title: '门板平方',
    align: 'center',
    slot: 'mbpf'
  },
  {
    title: '备注',
    align: 'center',
    slot: 'bz'
  },
  {
    title: '玻璃尺寸',
    align: 'center',
    children: [
      {
        title: '高度',
        align: 'center',
        slot: 'blgd'
      },
      {
        title: '宽度',
        align: 'center',
        slot: 'blkd'
      }
    ]
  },
  {
    title: '玻璃平方',
    align: 'center',
    slot: 'blpf'
  },
  {
    title: '操作',
    align: 'center',
    slot: 'action'
  }
];

/** 拉手信息-表头 */
export const HANDLE_COLUMNS = [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '名称',
    key: 'mc',
    align: 'center',
    slot: 'mc'
  },
  {
    title: '高度',
    key: 'gd',
    align: 'center',
    slot: 'gd'
  },
  {
    title: '宽度',
    key: 'kd',
    align: 'center',
    slot: 'kd'
  },
  {
    title: '单价',
    key: 'dj',
    align: 'center',
    slot: 'dj'
  },
  {
    title: '备注',
    key: 'bz',
    align: 'center',
    slot: 'bz'
  },
  {
    title: '操作',
    align: 'center',
    slot: 'action'
  }
];

/** 内框位置信息 */
export const KHXD_JGM_NKWZ = [
  {
    value: 0,
    label: '中间'
  },
  {
    value: 1,
    label: '边沿'
  },
  {
    value: 2,
    label: '转角'
  }
];

/** 尺寸信息-内框计算 */
export const KHXD_JGM_NKJS = [
  {
    title: '类型',
    align: 'center',
    slot: 'lx'
  },
  {
    title: '门板高度',
    align: 'center',
    slot: 'mbgd'
  },
  {
    title: '左立柱',
    align: 'center',
    children: [
      {
        title: '位置',
        align: 'center',
        slot: 'lwz'
      },
      {
        title: '厚度',
        align: 'center',
        slot: 'lhd'
      }
    ]
  },
  {
    title: '右立柱',
    align: 'center',
    children: [
      {
        title: '位置',
        align: 'center',
        slot: 'rwz'
      },
      {
        title: '厚度',
        align: 'center',
        slot: 'rhd'
      }
    ]
  },
  {
    title: '内框宽度',
    align: 'center',
    slot: 'nkkd'
  },
  {
    title: '门板数量',
    align: 'center',
    slot: 'sl'
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
