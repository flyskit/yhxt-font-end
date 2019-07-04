/** 板材类型 */
export const KHXD_YKL_BCLX = [
  {
    value: 0,
    label: '多层板'
  },
  {
    value: 1,
    label: '中纤板'
  },
  {
    value: 2,
    label: '颗粒板'
  }
];

/** 尺寸信息-表头 */
export const KHXD_YKL_DDXX = [
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
        title: '板材',
        align: 'center',
        slot: 'bcmc',
        width: 100
      },
      {
        title: '板材单价',
        align: 'center',
        slot: 'bcdj',
        width: 100
      },
      {
        title: '拉手',
        align: 'center',
        slot: 'lsmc',
        width: 100
      },
      {
        title: '拉手单价',
        align: 'center',
        slot: 'lsdj',
        width: 100
      },
      {
        title: '颜色',
        align: 'center',
        slot: 'ys',
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
