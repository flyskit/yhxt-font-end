<template lang='pug'>
  div.khxd-tzm-size
    Tabs(type="card" v-model="currentTab" @on-click="currentTabChange" :animated="false")
      TabPane(label="平开门" name="swingTab" icon="md-add")
        <keep-alive>
          swingTab(ref="swingTab" :boardInfo="boardInfo" @submitDataSwing="submitDataSwing" @computeTotalSwing="computeTotalSwing")
        </keep-alive>
      TabPane(label="推门" name="hangingTab" icon="md-add")
        <keep-alive>
          hangingTab(ref="hangingTab" :boardInfo="boardInfo" @submitDataHanging="submitDataHanging" @computeTotalHanging="computeTotalHanging")
        </keep-alive>
      TabPane(label="空套" name="pocketTab" icon="md-add")
        <keep-alive>
          pocketTab(ref="pocketTab" :boardInfo="boardInfo" @submitDataPocket="submitDataPocket" @computeTotalPocket="computeTotalPocket")
        </keep-alive>
      TabPane(label="线条" name="lineTab" icon="md-add")
        <keep-alive>
          lineTab(ref="lineTab" :boardInfo="boardInfo" @submitDataLine="submitDataLine" @computeTotalLine="computeTotalLine")
        </keep-alive>
</template>

<script>
import _ from 'lodash';
export default {
  props: ['boardInfo'],
  components: {
    'swingTab': (resolve) => require(['./suit-tab/suit-swing'], resolve),
    'hangingTab': (resolve) => require(['./suit-tab/suit-hanging'], resolve),
    'pocketTab': (resolve) => require(['./suit-tab/suit-pocket'], resolve),
    'lineTab': (resolve) => require(['./suit-tab/suit-line'], resolve)
  },
  data () {
    return {
      currentTab: 'swingTab',
      currentTabComponent: 'swingTab',
      totalData: {
        pkmms: 0,
        pkmts: 0,
        tmms: 0,
        tmts: 0,
        hjmt: 0,
        hjxt: 0,
        je: 0.00
      },
      totalDataSwing: {
        pkmms: 0,
        pkmts: 0,
        hjmt: 0,
        je: 0.00
      },
      totalDataHanging: {
        tmms: 0,
        tmts: 0,
        hjmt: 0,
        je: 0.00
      },
      totalDataPocket: {
        hjmt: 0,
        je: 0.00
      },
      totalDataLine: {
        hjxt: 0,
        je: 0.00
      },
      sizeDetail: {
        swingSizes: [],
        hangingSizes: [],
        pocketDetails: [],
        lineDetails: []
      }
    };
  },
  methods: {
    currentTabChange(name) {
      this.currentTab = name;
      this.currentTabComponent = name;
    },
    computeTotalSwing(data) {
      this.totalDataSwing = data;
      this.computeTotal();
    },
    computeTotalHanging(data) {
      this.totalDataHanging = data;
      this.computeTotal();
    },
    computeTotalPocket(data) {
      this.totalDataPocket = data;
      this.computeTotal();
    },
    computeTotalLine(data) {
      this.totalDataLine = data;
      this.computeTotal();
    },
    submitDataSwing(data) {
      this.sizeDetail.swingSizes = _.cloneDeep(data);
      this.submitData();
    },
    submitDataHanging(data) {
      this.sizeDetail.hangingSizes = _.cloneDeep(data);
      this.submitData();
    },
    submitDataPocket(data) {
      this.sizeDetail.pocketDetails = _.cloneDeep(data);
      this.submitData();
    },
    submitDataLine(data) {
      this.sizeDetail.lineDetails = _.cloneDeep(data);
      this.submitData();
    },
    computeTotal() {
      this.totalData.pkmms = this.totalDataSwing.pkmms;
      this.totalData.pkmts = this.totalDataSwing.pkmts;
      this.totalData.tmms = this.totalDataHanging.tmms;
      this.totalData.tmts = this.totalDataHanging.tmts;
      this.totalData.hjmt = this.totalDataSwing.hjmt + this.totalDataHanging.hjmt + this.totalDataPocket.hjmt;
      this.totalData.hjxt = this.totalDataLine.hjxt;
      this.totalData.je = this.totalDataSwing.je + this.totalDataHanging.je + this.totalDataPocket.je + this.totalDataLine.je;
      this.$emit('computeTotal', this.totalData);
    },
    submitData() {
      this.$emit('submitData', this.sizeDetail);
    },
    /** 修改信息 */
    showEdit(isTemporary, swingSizeList, hangingSizeList, suitPocketDetailList, suitLineDetailList) {
      this.sizeDetail.swingSizes = swingSizeList;
      this.sizeDetail.hangingSizes = hangingSizeList;
      this.sizeDetail.pocketDetails = suitPocketDetailList;
      this.sizeDetail.lineDetails = suitLineDetailList;
      this.$refs.swingTab.showEdit(isTemporary, swingSizeList);
      this.$refs.hangingTab.showEdit(isTemporary, hangingSizeList);
      this.$refs.pocketTab.showEdit(isTemporary, suitPocketDetailList);
      this.$refs.lineTab.showEdit(isTemporary, suitLineDetailList);
    }
  }
};
</script>
<style lang='less' scoped>

</style>
