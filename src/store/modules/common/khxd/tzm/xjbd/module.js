/** 门板类型 */
export const KHXD_TZM_MBLX = [
  {
    value: 7,
    label: '强化门'
  },
  {
    value: 8,
    label: '实木门贴面'
  },
  {
    value: 9,
    label: '原木门'
  },
  {
    value: 10,
    label: '非常规门'
  }
];

/** 墙体 */
export const KHXD_TZM_QT = [
  {
    value: 0,
    label: '单丁墙'
  },
  {
    value: 1,
    label: '双丁墙'
  }
];

/** 开门类型 */
export const KHXD_TZM_KMLX = [
  {
    value: 0,
    label: '双开门'
  },
  {
    value: 1,
    label: '子母门'
  },
  {
    value: 2,
    label: '其他'
  }
];

/** 推门类型 */
export const KHXD_TZM_TMLX = [
  {
    value: 0,
    label: '双推门'
  },
  {
    value: 1,
    label: '单推门'
  }
];

/** 推门位置 */
export const KHXD_TZM_TMWZ = [
  {
    value: 0,
    label: '外挂'
  },
  {
    value: 1,
    label: '内挂'
  }
];

/** 玻璃类型 */
export const KHXD_TZM_BLLX = [
  {
    value: 0,
    label: '透明钢化'
  },
  {
    value: 1,
    label: '磨砂钢化'
  }
];

/** 空套类别 */
export const KHXD_TZM_KTLB = [
  {
    value: 0,
    label: '单面套'
  },
  {
    value: 1,
    label: '双面套'
  }
];

/** 线条类别 */
export const KHXD_TZM_XTLB = [
  {
    value: 0,
    label: '卡扣'
  },
  {
    value: 1,
    label: '平口'
  }
];

/** 订单信息-表头 */
export const KHXD_TZM_DDXX = [
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
        title: '门板类型',
        align: 'center',
        slot: 'mblx',
        width: 100
      },
      {
        title: '平开门',
        align: 'center',
        children: [
          {
            title: '门扇',
            align: 'center',
            slot: 'pkmms',
            width: 80
          },
          {
            title: '套数',
            align: 'center',
            slot: 'pkmts',
            width: 80
          }
        ]
      },
      {
        title: '推门',
        align: 'center',
        children: [
          {
            title: '门扇',
            align: 'center',
            slot: 'tmms',
            width: 80
          },
          {
            title: '套数',
            align: 'center',
            slot: 'tmts',
            width: 80
          }
        ]
      },
      {
        title: '合计门套',
        align: 'center',
        slot: 'hjmt',
        width: 80
      },
      {
        title: '合计线条',
        align: 'center',
        slot: 'hjxt',
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

/** 尺寸信息：套装-平开门 */
export const KHXD_TZM_SWING = [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '材质',
    align: 'center',
    slot: 'cz',
    width: 100
  },
  {
    title: '造型',
    align: 'center',
    slot: 'zx'
  },
  {
    title: '颜色',
    align: 'center',
    slot: 'ys'
  },
  {
    title: '面板',
    align: 'center',
    slot: 'mb'
  },
  {
    title: '油漆',
    align: 'center',
    slot: 'yq'
  },
  {
    title: '墙体',
    align: 'center',
    slot: 'qt'
  },
  {
    title: '开门类型',
    align: 'center',
    slot: 'kmlx'
  },
  {
    title: '洞口尺寸',
    align: 'center',
    children: [
      {
        title: '高度',
        align: 'center',
        slot: 'mdgd'
      },
      {
        title: '宽度',
        align: 'center',
        slot: 'mdkd'
      },
      {
        title: '厚度',
        align: 'center',
        slot: 'mdhd'
      }
    ]
  },
  {
    title: '门扇尺寸',
    align: 'center',
    children: [
      {
        title: '高度',
        align: 'center',
        slot: 'msgd'
      },
      {
        title: '宽度',
        align: 'center',
        slot: 'mskd'
      }
    ]
  },
  {
    title: '门扇数量',
    align: 'center',
    slot: 'mssl'
  },
  {
    title: '门套数量',
    align: 'center',
    slot: 'mtsl'
  },
  {
    title: '尺寸个数',
    align: 'center',
    slot: 'ts'
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

/** 尺寸信息：套装-推门 */
export const KHXD_TZM_HANGING = [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '材质',
    align: 'center',
    slot: 'cz',
    width: 100
  },
  {
    title: '造型',
    align: 'center',
    slot: 'zx'
  },
  {
    title: '颜色',
    align: 'center',
    slot: 'ys'
  },
  {
    title: '面板',
    align: 'center',
    slot: 'mb'
  },
  {
    title: '油漆',
    align: 'center',
    slot: 'yq'
  },
  {
    title: '墙体',
    align: 'center',
    slot: 'qt'
  },
  {
    title: '推门类型',
    align: 'center',
    slot: 'tmlx'
  },
  {
    title: '推门位置',
    align: 'center',
    slot: 'tmwz'
  },
  {
    title: '玻璃',
    align: 'center',
    slot: 'bl',
    width: 100
  },
  {
    title: '洞口尺寸',
    align: 'center',
    children: [
      {
        title: '高度',
        align: 'center',
        slot: 'mdgd'
      },
      {
        title: '宽度',
        align: 'center',
        slot: 'mdkd'
      },
      {
        title: '厚度',
        align: 'center',
        slot: 'mdhd'
      }
    ]
  },
  {
    title: '门扇尺寸',
    align: 'center',
    children: [
      {
        title: '高度',
        align: 'center',
        slot: 'msgd'
      },
      {
        title: '宽度',
        align: 'center',
        slot: 'mskd'
      }
    ]
  },
  {
    title: '门扇数量',
    align: 'center',
    slot: 'mssl'
  },
  {
    title: '门套数量',
    align: 'center',
    slot: 'mtsl'
  },
  {
    title: '尺寸个数',
    align: 'center',
    slot: 'ts'
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

/** 尺寸信息：套装门-空套 */
export const KHXD_TZM_POCKET = [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '材质',
    align: 'center',
    slot: 'cz',
    width: 100
  },
  {
    title: '造型',
    align: 'center',
    slot: 'zx'
  },
  {
    title: '颜色',
    align: 'center',
    slot: 'ys'
  },
  {
    title: '面板',
    align: 'center',
    slot: 'mb'
  },
  {
    title: '油漆',
    align: 'center',
    slot: 'yq'
  },
  {
    title: '类别',
    align: 'center',
    slot: 'lb'
  },
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
  },
  {
    title: '门套数量',
    align: 'center',
    slot: 'mtsl'
  },
  {
    title: '尺寸个数',
    align: 'center',
    slot: 'ts'
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

/** 尺寸信息：套装门-线条 */
export const KHXD_TZM_LINE = [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '材质',
    align: 'center',
    slot: 'cz',
    width: 100
  },
  {
    title: '造型',
    align: 'center',
    slot: 'zx'
  },
  {
    title: '颜色',
    align: 'center',
    slot: 'ys'
  },
  {
    title: '面板',
    align: 'center',
    slot: 'mb'
  },
  {
    title: '油漆',
    align: 'center',
    slot: 'yq'
  },
  {
    title: '类别',
    align: 'center',
    slot: 'lb'
  },
  {
    title: '规格',
    align: 'center',
    slot: 'gg'
  },
  {
    title: '数量',
    align: 'center',
    slot: 'ts'
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
