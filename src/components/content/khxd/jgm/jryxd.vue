<template lang='pug'>
  div.khxd-jgm-jryxd
    Table(border ref="selection" :columns="addColumn" :data="data")
</template>

<script>
import { JGM_XDXX_COLUMNS } from '@store/common/khxd/jgm/jryxd/module.js';
export default {
  components: {

  },
  data () {
    return {
      data: [
        {
          bh: '20132',
          zt: '普通',
          khxm: '张三',
          xdlx: '新订单',
          dz: '四川省',
          dh: '3133',
          gq: '7',
          bz: '发达',
          cjr: '李四',
          cjsj: '2019'
        }
      ],
      jgmXdxxColumns: JGM_XDXX_COLUMNS,
      actionColumn: {
        title: '操作',
        align: 'center',
        width: 120,
        render: (h, params) => {
          return h('div', [
            h('Icon', {
              props: {
                type: 'md-information-circle',
                size: '15',
                color: '#19be6b'
              },
              style: {
                padding: '6px 4px',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.change(params.index);
                }
              }
            }),
            h('Icon', {
              props: {
                type: 'md-create',
                size: '15',
                color: '#2db7f5'
              },
              style: {
                padding: '6px 4px',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.change(params.index);
                }
              }
            }),
            h('Icon', {
              props: {
                type: 'md-return-left',
                size: '15',
                color: '#ed4014'
              },
              style: {
                padding: '6px 4px',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.remove(params.index);
                }
              }
            })
          ]);
        }
      }
    };
  },
  computed: {
    addColumn () {
      this.jgmXdxxColumns.push(
        this.actionColumn
      );
      return this.jgmXdxxColumns;
    }
  },
  mounted() {

  },
  methods: {
    change(idx) {
      console.log(idx);
    }
  }
};
</script>
<style lang='less' scoped>

</style>
