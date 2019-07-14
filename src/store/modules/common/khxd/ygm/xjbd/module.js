export const KHXD_YGM_BKKD = [
  {
    value: 0,
    label: 20
  },
  {
    value: 1,
    label: 35
  },
  {
    value: 2,
    label: 50
  }
];

/** 订单信息-表头 */
export const KHXD_YGM_DDXX = [
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
        slot: 'je'
      },
      {
        title: '预计打包',
        align: 'center',
        slot: 'yjdb'
      },
      {
        title: '芯板平方',
        align: 'center',
        slot: 'xbpf'
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
export const KHXD_YGM_CCXX = [
  {
    type: 'selection',
    align: 'center',
    width: 60
  },
  {
    title: '材质',
    align: 'center',
    slot: 'cz',
    width: 110
  },
  {
    title: '造型',
    align: 'center',
    slot: 'zx',
    width: 110
  },
  {
    title: '颜色',
    align: 'center',
    slot: 'ys',
    width: 80
  },
  {
    title: '边框形状',
    align: 'center',
    slot: 'bkxz',
    width: 100
  },
  {
    title: '边框宽度',
    align: 'center',
    slot: 'bkkd',
    width: 80
  },
  {
    title: '内框尺寸',
    align: 'center',
    children: [
      {
        title: '高度',
        align: 'center',
        slot: 'nkgd',
        width: 80
      },
      {
        title: '宽度',
        align: 'center',
        slot: 'nkkd',
        width: 80
      }
    ]
  },
  {
    title: '门扇数量',
    align: 'center',
    slot: 'mssl',
    width: 80
  },
  {
    title: '平方',
    align: 'center',
    slot: 'pf',
    width: 80
  },
  {
    title: '竖方',
    align: 'center',
    slot: 'sf',
    width: 80
  },
  {
    title: '上下方',
    align: 'center',
    slot: 'sxf',
    width: 80

  },
  {
    title: '芯板尺寸',
    align: 'center',
    children: [
      {
        title: '高度',
        align: 'center',
        slot: 'xbgd',
        width: 80
      },
      {
        title: '宽度',
        align: 'center',
        slot: 'xbkd',
        width: 80
      }
    ]
  },
  {
    title: '芯板平方',
    align: 'center',
    slot: 'xbpf',
    width: 80
  },
  {
    title: '单价',
    align: 'center',
    slot: 'dj',
    width: 80
  },
  {
    title: '套数',
    align: 'center',
    slot: 'ts',
    width: 80
  },
  {
    title: '金额',
    align: 'center',
    slot: 'je',
    width: 80
  },
  {
    title: '备注',
    align: 'center',
    slot: 'bz',
    width: 150
  },
  {
    title: '门扇尺寸',
    align: 'center',
    children: [
      {
        title: '高度',
        align: 'center',
        slot: 'msgd',
        width: 80
      },
      {
        title: '宽度',
        align: 'center',
        slot: 'mskd',
        width: 80
      }
    ]
  },
  {
    title: '操作',
    align: 'center',
    slot: 'action',
    width: 100,
    fixed: 'right'
  }
];
