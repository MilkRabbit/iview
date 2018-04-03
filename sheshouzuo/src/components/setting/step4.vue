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
    <div class="form-group">交易<span class="paySuccess">成功</span>：<span class="yellowT">小橙云店</span></div>
    <div class="form-group center" style="margin-top: 80px;margin-bottom: 80px">
      <img :src="paySuccessIcon" alt="支付成功" class="payTipImg paySuccess"/>
      <p class="payTipText paySuccess">支付成功！</p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import VueQArt from 'vue-qart'
  axios.defaults.baseURL = 'https://staticfiles.xiaochengyun.cn/adminapi';
  export default {
    components: {
      VueQArt
    },
    props: [
      "result",
    ],
    data () {
      return {
        data: [],
        paySuccessIcon : '/static/img/pay_success.png',
      }
    },
    methods: {
      bindThis () {
        let that = this;
      }
    }
  }
</script>
