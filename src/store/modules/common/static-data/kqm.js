export const DATA_KQM_PKM = [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '类型',
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
    title: '单位',
    key: 'dw',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    }
  },
  {
    title: '平方',
    key: 'pf',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    }
  },
  {
    title: '操作',
    align: 'center',
    render: (h, params) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'success',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              // this.show(params.index);
            }
          }
        }, '查看'),
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              // this.remove(params.index)
            }
          }
        }, '修改'),
        h('Button', {
          props: {
            type: 'error',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              // this.remove(params.index)
            }
          }
        }, '删除')
      ]);
    }
  }
];
