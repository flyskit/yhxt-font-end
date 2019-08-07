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
        title: '门板数量',
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
        title: '玻璃平方',
        align: 'center',
        slot: 'blpf',
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
