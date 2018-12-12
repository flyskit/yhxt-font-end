export const COLUMNS_YMM_PKM = [
  {
    title: '下单类型',
    key: 'xdlx',
    align: 'center',
    rules: {
      required: false,
      trigger: 'blur'
    }
  },
  {
    title: '分类',
    key: 'fl',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    }
  },
  {
    title: '颜色',
    key: 'ys',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    }
  },
  {
    title: '颜色类型',
    key: 'yslx',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    }
  },
  {
    title: '造型',
    key: 'zx',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    }
  },
  {
    title: '数量',
    key: 'sl',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    }
  },
  {
    title: '尺寸',
    key: 'cc',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    },
    children: [
      {
        title: '高',
        key: 'ccHigh',
        align: 'center'
      },
      {
        title: '宽',
        key: 'ccWidth',
        align: 'center'
      }
    ]
  }
];

export const DATA_YMM_PKM = {
  xdlx: {
    type: String,
    required: true
  },
  fl: {
    type: String,
    required: true
  },
  ys: {
    type: String,
    required: true
  },
  yslx: {
    type: String,
    required: true
  },
  zx: {
    type: String,
    required: true
  },
  sl: {
    type: String,
    required: true
  },
  ccHigh: {
    type: String,
    required: true
  },
  ccWidth: {
    type: String,
    required: true
  }
};
