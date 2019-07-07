/** 订单类型 */
export const ORDER_DDLX = [
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
