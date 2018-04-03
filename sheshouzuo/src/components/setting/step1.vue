<template>
  <table class="quotationTable">
    <thead>
    <tr class="greyBg">
      <td colspan="2">功能/版本</td>
      <td class="orangeBg whiteT">免费版</td>
      <td class="greenBg whiteT">创业版</td>
      <td class="purpleBg whiteT">企业版</td>
      <td class="blueBg whiteT">至尊版</td>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td colspan="2">店铺数量</td>
      <td>1</td>
      <td>1</td>
      <td>5</td>
      <td>20</td>
    </tr>
    <tr class="greyBg">
      <td colspan="2">商品数量</td>
      <td>{{packageType[0].productCount}}</td>
      <td>{{packageType[1].productCount}}</td>
      <td>{{packageType[2].productCount}}</td>
      <td>{{packageType[3].productCount}}</td>
    </tr>
    <tr>
      <td colspan="2">每日免费短信条数</td>
      <td>0</td>
      <td>20</td>
      <td>50</td>
      <td>100</td>
    </tr>
    <tr class="greyBg">
      <td colspan="2">商户APP</td>
      <td>有</td>
      <td>有</td>
      <td>有</td>
      <td>有</td>
    </tr>
    <tr>
      <td colspan="2">配送员APP</td>
      <td>无</td>
      <td>有</td>
      <td>有</td>
      <td>有</td>
    </tr>
    <tr class="greyBg">
      <td rowspan="5">营销功能</td>
      <td>新用户立减</td>
      <td>无</td>
      <td>有</td>
      <td>有</td>
      <td>有</td>
    </tr>
    <tr>
      <td>满减</td>
      <td>无</td>
      <td>有</td>
      <td>有</td>
      <td>有</td>
    </tr>
    <tr class="greyBg">
      <td>返代金券</td>
      <td>无</td>
      <td>有</td>
      <td>有</td>
      <td>有</td>
    </tr>
    <tr>
      <td>红包</td>
      <td>无</td>
      <td>有</td>
      <td>有</td>
      <td>有</td>
    </tr>
    <tr class="greyBg">
      <td>满赠</td>
      <td>无</td>
      <td>有</td>
      <td>有</td>
      <td>有</td>
    </tr>
    <tr>
      <td colspan="2">价格(元/月)</td>
      <td>{{packageType[0].money}}</td>
      <td>{{packageType[1].money}}</td>
      <td>{{packageType[2].money}}</td>
      <td>{{packageType[3].money}}</td>
    </tr>
    <tr>
      <td colspan="2">立即购买</td>
      <td class="td"><button class="mySubBtnChart disabled" data-code="0" disabled>默认套餐！</button></td>
      <td class="td"><button class="mySubBtnChart" data-code="1"
                             @click="bindThis(1)"
                             :class="userInfo.packageType=='1'?'disabled':''"
                             v-text="userInfo.packageType=='1'?'已拥有此套餐':'选择套餐'"></button></td>
      <td class="td"><button class="mySubBtnChart" data-code="2"
                             @click="bindThis(2)"
                             :class="userInfo.packageType=='2'?'disabled':''"
                             v-text="userInfo.packageType=='2'?'已拥有此套餐':'选择套餐'">选择套餐</button></td>
      <td class="td"><button class="mySubBtnChart" data-code="3"
                             @click="bindThis(3)"
                             :class="userInfo.packageType=='3'?'disabled':''"
                             v-text="userInfo.packageType=='3'?'已拥有此套餐':'选择套餐'">选择套餐</button></td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    props:[
      'packageType',
      "userData",
      "userInfo"
    ],
    data () {
      return {
        data: [],
      }
    },
    methods: {
      bindThis (index) {
        let that = this;
        let packageType = parseInt(this.userInfo.packageType);
        if(packageType>index){
          this.$Modal.confirm({
            content: '<p>您已拥有更高级的套餐服务，是否想更换套餐?</p>',
            onOk: () => {
              that.$emit("toStep2",index)
            }
          });
        }else if(packageType==index){
          this.$Modal.confirm({
            content: '<p>您已拥有此套餐服务，是否想要续费?</p>',
            onOk: () => {
              that.$emit("toStep2",index)
            }
          });
        }else {
          that.$emit("toStep2",index)
        }
      }
    }
  }
</script>
