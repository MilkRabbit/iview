<style>
  .form-group {
    margin-bottom: 15px;
    position:relative;
  }
  .greyBg {
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  img {
    vertical-align: middle;
  }
  .yellowT {
    color: #f7b039;
  }
  .panel-body{
    padding: 20px 0;
  }
</style>
<template>
  <div class="panel-body">
    <div class="form-group">交易对象：<span class="yellowT">小橙云店</span></div>
    <div class="form-group greyBg"><span class="titleLeft"><img :src="wxIcon">微信支付</span>
      <span class="titleRight" style="top: 10px;right: 10px;"><span class="payArea"
                                                                    style="margin-right: 0px;">总付费：<span
        class="moneyArea">¥ {{result}}</span></span></span></div>
    <div class="center mar40" id="qrArea" v-if="qrshow">
      <vue-q-art :config="config" :downloadButton="downloadButton" style="width:200px; height:200px; margin-top:15px;display: inline-block;"></vue-q-art>
      <p style="margin-top: 10px">请使用微信扫描屏幕中的二维码进行付款！</p>
    </div>
    <div class="row center mar40">
      <button class="mySubBtn" @click="bindThis">确认支付</button>
    </div>
  </div>
</template>

<script>
  import VueQArt from 'vue-qart'
  export default {
    components: {
      VueQArt
    },
    props: [
      "result",
      "code"
    ],
    data () {
      return {
        data: [],
        wxIcon : '../../static/img/wxIcon.png',
        msg: 'Welcome to Your Vue.js App',
        config: {
          value: 'https://www.baidu.com',
          imagePath: '../../static/img/wxIcon.png',
          filter: 'color'
        },
        downloadButton: false,
        qrshow:false
      }
    },
    methods: {
      bindThis () {
        this.$ajax.post("/setting/payStep2",{
          amount: this.result,
          code: this.code
        }).then(function (res) {
          let data = res.data.data;
          let orderNo = data.orderNo;
          let code = data.orderInfo[0].code;
          let times = data.price*0.01/parseFloat(data.orderInfo[0].money);
          let fee = data.price;
          let info = data.orderInfo[0].name
          this.$ajax.post("https://staticfiles.xiaochengyun.cn/shop/payTest/wxpayTest",{
            info: '小橙云店' + info,
            orderno: orderNo,
            amount: fee,
            code:code,
            times:times
          }).then(function (res) {
            this.config.value = res.data.data.code_url;
            console.log(this.config.value)
            this.qrshow = true;
            window.setInterval(function () {
              this.$ajax.post('/setting/payStep2_makeSure', {
                orderNo:orderNo,
                code:code,
                times:times,
                fee:fee
              }).then(function (res) {
                if(res.data.msg=='success'){
                  this.$emit("toStep4",res.data.msg)
                }
              }).catch(function (err) {
                console.log(err)
              });
            }.bind(this), 1000*5);
          }.bind(this)).catch(function (err) {
            console.log(err)
          });
        }.bind(this)).catch(function (err) {
          console.log(err)
        });
      }
    }
  }
</script>
