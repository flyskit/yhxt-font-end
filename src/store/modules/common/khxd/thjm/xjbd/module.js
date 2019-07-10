/** 门类型 */
export const THJ_MLX = [
  {
    value: 0,
    label: '平开门'
  },
  {
    value: 1,
    label: '吊趟门'
  }
];

/** 玻璃类型 */
export const THJ_BLLX = [
  {
    value: 0,
    label: '无'
  },
  {
    value: 1,
    label: '透明钢化'
  },
  {
    value: 2,
    label: '玉砂钢化'
  },
  {
    value: 3,
    label: '透明不钢化'
  },
  {
    value: 4,
    label: '玉砂不钢化'
  }
];

/** 平开门-方向 */
export const THJ_PKM_FX = [
  {
    value: 0,
    label: '内开左锁'
  },
  {
    value: 1,
    label: '内开右锁'
  },
  {
    value: 2,
    label: '外开左锁'
  },
  {
    value: 3,
    label: '外开右锁'
  }
];

/** 平开门-包套 */
export const THJ_PKM_BD = [
  {
    value: 0,
    label: '无'
  },
  {
    value: 1,
    label: '全包套'
  },
  {
    value: 2,
    label: '半包套-外带边'
  },
  {
    value: 3,
    label: '半包套-内带边'
  }
];

/** 吊趟门-推门类型 */
export const THJ_DTM_TMLX = [
  {
    value: 0,
    label: '单推'
  },
  {
    value: 1,
    label: '双推'
  },
  {
    value: 2,
    label: '单吊'
  },
  {
    value: 3,
    label: '双吊'
  }
];

/** 吊趟门-包套 */
export const THJ_DTM_BT = [
  {
    value: 0,
    label: '无'
  },
  {
    value: 1,
    label: '全包套'
  },
  {
    value: 2,
    label: '半包套'
  }
];

/** 吊趟门-门锁位置 */
export const THJ_DTM_MS = [
  {
    value: 0,
    label: '左锁'
  },
  {
    value: 1,
    label: '右锁'
  }
];

/** 吊趟门-挂门位置 */
export const THJ_DTM_GM = [
  {
    value: 0,
    label: '外挂'
  },
  {
    value: 1,
    label: '内挂'
  }
];

/** 订单信息-表头 */
export const KHXD_THJ_DDXX = [
  {
    title: '订单信息',
    align: 'center',
    children: [
      {
        title: '订单编号',
        align: 'center',
        slot: 'ddbh'
      },
      {
        title: '订单类型',
        align: 'center',
        slot: 'ddlx'
      },
      {
        title: '订单来源',
        align: 'center',
        slot: 'ddly'
      },
      {
        title: '生产速率',
        align: 'center',
        slot: 'scsl'
      },
      {
        title: '工期',
        align: 'center',
        slot: 'gq'
      },
      {
        title: '客户姓名',
        align: 'center',
        slot: 'khxm'
      },
      {
        title: '地址',
        align: 'center',
        slot: 'dz'
      },
      {
        title: '电话',
        align: 'center',
        slot: 'dh'
      },
      {
        title: '备注',
        align: 'center',
        slot: 'bz'
      },
      {
        title: '合计平方',
        align: 'center',
        slot: 'hjpf'
      },
      {
        title: '合计数量',
        align: 'center',
        slot: 'hjsl'
      },
      {
        title: '合计金额',
        align: 'center',
        slot: 'hjje'
      },
      {
        title: '预计打包',
        align: 'center',
        slot: 'yjdb'
      }
    ]
  }
];

/** 平开门-表头 */
export const THJ_PKM = [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '料型颜色',
    align: 'center',
    slot: 'lxys'
  },
  {
    title: '造型',
    align: 'center',
    slot: 'zx'
  },
  {
    title: '玻璃',
    align: 'center',
    slot: 'bl'
  },
  {
    title: '方向',
    align: 'center',
    slot: 'fx'
  },
  {
    title: '门套',
    align: 'center',
    slot: 'bd'
  },
  {
    title: '尺寸',
    align: 'center',
    children: [
      {
        title: '高度',
        align: 'center',
        slot: 'gd'
      },
      {
        title: '宽度',
        align: 'center',
        slot: 'kd'
      },
      {
        title: '厚度',
        align: 'center',
        slot: 'hd'
      }
    ]
  },
  {
    title: '备注',
    align: 'center',
    slot: 'bz'
  },
  {
    title: '订单数量',
    align: 'center',
    slot: 'sl'
  },
  {
    title: '单价',
    align: 'center',
    slot: 'dj'
  },
  {
    title: '金额',
    align: 'center',
    slot: 'je'
  },
  {
    title: '操作',
    align: 'center',
    slot: 'action'
  }
];

/** 吊趟门-表头 */
export const THJ_DTM = [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '料型颜色',
    align: 'center',
    slot: 'lxys'
  },
  {
    title: '造型',
    align: 'center',
    slot: 'zx'
  },
  {
    title: '玻璃',
    align: 'center',
    slot: 'bl'
  },
  {
    title: '推门类型',
    align: 'center',
    slot: 'tm'
  },
  {
    title: '挂门位置',
    align: 'center',
    slot: 'gm'
  },
  {
    title: '门锁',
    align: 'center',
    slot: 'ms'
  },
  {
    title: '包套',
    align: 'center',
    slot: 'bt'
  },
  {
    title: '尺寸',
    align: 'center',
    children: [
      {
        title: '高度',
        align: 'center',
        slot: 'gd'
      },
      {
        title: '宽度',
        align: 'center',
        slot: 'kd'
      },
      {
        title: '厚度',
        align: 'center',
        slot: 'hd'
      }
    ]
  },
  {
    title: '门扇数量',
    align: 'center',
    slot: 'mssl'
  },
  {
    title: '备注',
    align: 'center',
    slot: 'bz'
  },
  {
    title: '订单数量',
    align: 'center',
    slot: 'sl'
  },
  {
    title: '平方',
    align: 'center',
    slot: 'pf'
  },
  {
    title: '单价',
    align: 'center',
    slot: 'dj'
  },
  {
    title: '金额',
    align: 'center',
    slot: 'je'
  },
  {
    title: '操作',
    align: 'center',
    slot: 'action'
  }
];
