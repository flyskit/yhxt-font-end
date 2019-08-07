export const TZM_XDXX_COLUMNS = [
  {
    type: 'selection',
    width: 60,
    align: 'center',
    fixed: 'left'
  },
  {
    title: '订单编号',
    key: 'ddbh',
    align: 'center',
    width: 100,
    fixed: 'left'
  },
  {
    title: '客户姓名',
    key: 'khxm',
    align: 'center',
    width: 120,
    fixed: 'left'
  },
  {
    title: '订单类型',
    key: 'ddlx',
    align: 'center',
    width: 100,
    slot: 'ddlx'
  },
  {
    title: '订单来源',
    key: 'ddly',
    align: 'center',
    width: 100,
    slot: 'ddly'
  },
  {
    title: '生产速率',
    key: 'scsl',
    align: 'center',
    width: 100,
    slot: 'scsl'
  },
  {
    title: '平开门',
    align: 'center',
    children: [
      {
        title: '门扇',
        align: 'center',
        key: 'pkmms',
        width: 80
      },
      {
        title: '套数',
        align: 'center',
        key: 'pkmts',
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
        key: 'tmms',
        width: 80
      },
      {
        title: '套数',
        align: 'center',
        key: 'tmts',
        width: 80
      }
    ]
  },
  {
    title: '合计门套',
    align: 'center',
    key: 'hjmt',
    width: 80
  },
  {
    title: '合计线条',
    align: 'center',
    key: 'hjxt',
    width: 80
  },
  {
    title: '备注',
    key: 'bz',
    align: 'center',
    width: 200,
    tooltip: true
  },
  {
    title: '配件',
    key: 'pj',
    align: 'center',
    width: 200,
    tooltip: true
  },
  {
    title: '配件金额',
    key: 'pjje',
    align: 'center',
    width: 80
  },
  {
    title: '金额',
    key: 'je',
    align: 'center',
    width: 80
  },
  {
    title: '预计打包',
    key: 'yjdb',
    align: 'center',
    width: 80
  },
  {
    title: '工期',
    key: 'gq',
    align: 'center',
    width: 80
  },
  {
    title: '发货时间',
    key: 'wgsj',
    align: 'center',
    width: 180
  },
  {
    title: '地址',
    key: 'dz',
    align: 'center',
    width: 120,
    tooltip: true
  },
  {
    title: '电话',
    key: 'dh',
    align: 'center',
    width: 140
  },
  {
    title: '制单人',
    key: 'czr',
    align: 'center',
    width: 100
  },
  {
    title: '制单时间',
    key: 'czsj',
    width: 180,
    align: 'center'
  },
  {
    title: '操作',
    align: 'center',
    slot: 'action',
    width: 140,
    fixed: 'right'
  }
];
