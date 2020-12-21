/** 订单类型 */
export const ORDER_DDLX = [
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

/** 商品类型 */
export const ORDER_SPLX = [
  {
    value: 1,
    label: '晶钢门'
  },
  {
    value: 2,
    label: '亚克力门'
  },
  {
    value: 3,
    label: '钛合金-平开门'
  },
  {
    value: 4,
    label: '钛合金-吊趟门'
  },
  {
    value: 5,
    label: '吸塑门'
  },
  {
    value: 6,
    label: '衣柜移门'
  },
  {
    value: 7,
    label: '强化门'
  },
  {
    value: 8,
    label: '实木贴面门'
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

/** 订单来源 */
export const ORDER_DDLY = [
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

/** 生产速率 */
export const ORDER_SCSL = [
  {
    value: 0,
    label: '正常'
  },
  {
    value: 1,
    label: '加急'
  }
];

/** 订单状态 */
export const ORDER_DDZT = [
  {
    value: 0,
    label: '暂存'
  },
  {
    value: 1,
    label: '已下单'
  },
  {
    value: 2,
    label: '已发货'
  },
  {
    value: 3,
    label: '安装中'
  }
];

/** 有效状态 */
export const ORDER_YXZT = [
  {
    value: 0,
    label: '无效'
  },
  {
    value: 1,
    label: '正常'
  }
];

/** 橱柜门内框计算-位置 */
export const CGM_NKWZ = [
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

/** 橱柜门内框计算-表头 */
export const CGM_NKJS = [
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

/** 配件信息-表头 */
export const ACCESSORY_COLUMNS = [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '编号',
    key: 'bh',
    align: 'center'
  },
  {
    title: '名称',
    key: 'mc',
    align: 'center'
  },
  {
    title: '规格',
    key: 'gg',
    align: 'center'
  },
  {
    title: '数量',
    key: 'pjsl',
    align: 'center'
  },
  {
    title: '单位',
    key: 'dw',
    align: 'center'
  },
  {
    title: '单价',
    key: 'pjdj',
    align: 'center'
  },
  {
    title: '金额',
    key: 'pjje',
    align: 'center'
  },
  {
    title: '操作',
    align: 'center',
    slot: 'action'
  }
];

/** 通用材料报价信息-表头 */
export const BOARD_COLUMNS = [
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
    title: '编号',
    key: 'bh',
    align: 'center',
    slot: 'bh'
  },
  {
    title: '单价',
    key: 'dj',
    align: 'center',
    slot: 'dj'
  },
  {
    title: '规格',
    key: 'gg',
    align: 'center',
    slot: 'gg'
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
