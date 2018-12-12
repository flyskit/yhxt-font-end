export const DATA_TZM_PKM = [
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
    title: '花型',
    key: 'hx',
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
    title: '洞口尺寸',
    key: 'dkcc',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    },
    children: [
      {
        title: '高',
        key: 'dkccHigh',
        align: 'center'
      },
      {
        title: '宽',
        key: 'dkccWidth',
        align: 'center'
      }
    ]
  },
  {
    title: '门扇尺寸',
    key: 'mscc',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    },
    children: [
      {
        title: '高',
        key: 'msccHigh',
        align: 'center'
      },
      {
        title: '宽',
        key: 'msccWidth',
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
    title: '套板',
    key: 'tb',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    }
  },
  {
    title: '线条类型',
    key: 'xtlx',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    }
  },
  {
    title: '线条宽度',
    key: 'xtkd',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    }
  },
  {
    title: '线条数量',
    key: 'xtsl',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    }
  },
  {
    title: '面板',
    key: 'mb',
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

export const DATA_TZM_STM_DDM = [
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
    title: '花型',
    key: 'hx',
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
    title: '悬挂方式',
    key: 'xgfs',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    }
  },
  {
    title: '洞口尺寸',
    key: 'dkcc',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    },
    children: [
      {
        title: '高',
        key: 'dkccHigh',
        align: 'center'
      },
      {
        title: '宽',
        key: 'dkccWidth',
        align: 'center'
      }
    ]
  },
  {
    title: '门扇尺寸',
    key: 'mscc',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    },
    children: [
      {
        title: '高',
        key: 'msccHigh',
        align: 'center'
      },
      {
        title: '宽',
        key: 'msccWidth',
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
    title: '套板',
    key: 'tb',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    }
  },
  {
    title: '线条类型',
    key: 'xtlx',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    }
  },
  {
    title: '线条宽度',
    key: 'xtkd',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    }
  },
  {
    title: '线条数量',
    key: 'xtsl',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    }
  },
  {
    title: '面板',
    key: 'mb',
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

export const DATA_TZM_KT = [
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
    title: '洞口尺寸',
    key: 'dkcc',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    },
    children: [
      {
        title: '高',
        key: 'dkccHigh',
        align: 'center'
      },
      {
        title: '宽',
        key: 'dkccWidth',
        align: 'center'
      }
    ]
  },
  {
    title: '单双丁',
    key: 'dsd',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    }
  },
  {
    title: '套板类型',
    key: 'tblx',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    }
  },
  {
    title: '套板数量',
    key: 'tbsl',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    }
  },
  {
    title: '线条类型',
    key: 'xtlx',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    }
  },
  {
    title: '线条宽度',
    key: 'xtkd',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    }
  },
  {
    title: '线条数量',
    key: 'xtsl',
    align: 'center',
    rules: {
      required: true,
      message: 'num不能为空',
      trigger: 'blur'
    }
  },
  {
    title: '面板',
    key: 'mb',
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
