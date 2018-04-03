<style>
  .packageInfo>div label {
    margin: 5px 0;
  }
</style>
<template>
  <div>
    <table class="quotationTable">
      <thead>
      <tr class="greyBg">
        <td>套餐种类</td>
        <td>套餐详情</td>
        <td>选择购买时长</td>
        <td>费用</td>
      </tr>
      </thead>
      <tbody class="fullCutArea">
      <tr class="fullCut">
        <td>{{packageType[result].name}}</td>
        <td class="packageInfo" id="productInfo" data-code="<%= @data.code %>">
          <div>店铺数量:{{packageType[result].shopCount}}</div>
          <div>商品数量:{{packageType[result].productCount}}</div>
          <div>每日免费短信条数:{{packageType[result].freeSMS}}</div>
          <div>商户APP:{{packageType[result].shopAPP}}</div>
          <div>配送员APP:{{packageType[result].diliveryApp}}</div>
          <div>营销功能-新用户立减:{{packageType[result].newCut}}</div>
          <div>营销功能-满减:{{packageType[result].fullCut}}</div>
          <div>营销功能-返代金券:{{packageType[result].voucher}}</div>
          <div>营销功能-红包:{{packageType[result].redpacket}}</div>
          <div>营销功能-满赠:{{packageType[result].fullFree}}</div>
        </td>
        <td class="packageInfo">
          <div><input type="radio" name="time" id="time1" class="authSelRad" :value="value1" checked @change="getResultMoney(value1)"><label
            for="time1">1月</label></div>
          <div><input type="radio" name="time" id="time2" class="authSelRad" :value="value2" @change="getResultMoney(value2)"><label for="time2">3月<i
            class="rate">95折</i></label></div>
          <div><input type="radio" name="time" id="time3" class="authSelRad" :value="value3" @change="getResultMoney(value3)"><label for="time3">6月<i
            class="rate">91折</i></label></div>
          <div><input type="radio" name="time" id="time4" class="authSelRad" :value="value4" @change="getResultMoney(value4)"><label for="time4">1年<i
            class="rate">83折</i></label></div>
        </td>
        <td id="money" style="width: 300px">
          {{ paidMoney }}元
        </td>
      </tr>
      </tbody>
    </table>
    <div class="payTitle tlr">
      <span class="payArea">总付费：<span class="moneyArea">¥ {{ paidMoney }}</span></span>
      <button class="myInsideBtn" @click="bindThis(paidMoney)">立即支付</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'packageType',
      "userData",
      "userInfo",
      "result",
      "resultMoney"
    ],
    data () {
      return {
        data: [],
        value1: 1,
        value2: 3*0.95,
        value3: 6*0.91,
        value4: 12*0.83,
        paidMoney: 0
      }
    },
    created () {
      this.paidMoney = (this.packageType[this.result].money-this.resultMoney) > 0 ? this.packageType[this.result].money-this.resultMoney : 0.01;
    },
    methods: {
      getResultMoney (rate) {
        this.paidMoney = (this.packageType[this.result].money * rate -this.resultMoney) > 0 ? (this.packageType[this.result].money * rate - this.resultMoney).toFixed(2): 0.01;;
      },
      bindThis (paidMoney) {
        this.$emit("toStep3",paidMoney)
      }
    }
  }
</script>
