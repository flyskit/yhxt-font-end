// 使用级联显示
export const DOOR_TYPE = [
  {
    value: 'jgm',
    label: '晶钢门'
  },
  {
    value: 'ymm',
    label: '原木门',
    children: [
      {
        value: 'ympkm',
        label: '平开门'
      },
      {
        value: 'ymym',
        label: '移门'
      }
    ]
  },
  {
    value: 'tzm',
    label: '套装门',
    children: [
      {
        value: 'tzpkm',
        label: '平开门'
      },
      {
        value: 'tzstm',
        label: '双推门'
      },
      {
        value: 'tzddm',
        label: '单吊门'
      },
      {
        value: 'tzkt',
        label: '空套'
      }
    ]
  },
  {
    value: 'gt',
    label: '柜体',
    children: [
      {
        value: 'gtdig',
        label: '地柜'
      },
      {
        value: 'gtdg',
        label: '吊柜'
      },
      {
        value: 'gtch',
        label: '抽盒'
      }
    ]
  },
  {
    value: 'kqm',
    label: '高密度中纤烤漆门',
    children: [
      {
        value: 'kqpkm',
        label: '平开门'
      },
      {
        value: 'kqym',
        label: '移门'
      }
    ]
  }
];
