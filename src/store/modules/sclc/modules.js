export const COLUMNS = [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '类型',
    key: 'xdlx',
    align: 'center'
  },
  {
    title: 'Age',
    key: 'age',
    align: 'center'
  },
  {
    title: '操作',
    key: 'address',
    align: 'center'
  }
];

export const rules = {
  num: [
    { required: true, message: 'num不能为空', trigger: 'blur' }
  ],
  createTime: [
    { required: true, type: 'date', message: 'Mailbox cannot be empty', trigger: 'change' }
  ],
  customerName: [
    { required: true, message: '客户姓名不能为空', trigger: 'blur' }
  ],
  customerAddr: [
    { required: true, message: 'Please select gender', trigger: 'blur' }
  ]
};
