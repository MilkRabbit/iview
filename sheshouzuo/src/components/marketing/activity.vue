<style lang="less">
  @import "~less/public.less";
  .demo-tabs-style1 {
    width: 100%;
  }

  div.ivu-card{
    text-align: center;
    margin-bottom: 30px;
    border-radius: 15px;
  }
  .ivu-card-head {
    border-radius: 5px 5px 0 0;
    background-color: rgba(0,0,0,0);
  }
  .ivu-card-head p, .ivu-card-head-inner {
    color: #fff !important;
  }
  .ivu-card-body p, .ivu-card-head-inner {
    color: #fff !important;
  }
  .orangeBg{
    background-color: #f7b039!important;
  }
  .greenBg{
    background-color: #3cd68a!important;
  }
  .purpleBg{
    background-color: #b0a2f8!important;
  }
  .blueBg{
    background-color: #38c6fb!important;
  }
  .redBg{
    background-color: #fb3894!important;
  }
</style>
<template>
  <Col :lg="21">
  <Row type="flex" justify="center" align="top">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1">
      <TabPane label="营销列表" name="name1">
        <Col span="5">
        <Card class="orangeBg">
          <p slot="title">满减</p>
          <p>设置小程序用户购买商品满足一定金额时进行金额减免</p>
        </Card>
        </Col>
        <Col span="5" offset="1">
        <Card class="greenBg">
          <p slot="title">新用户立减</p>
          <p>设置小程序用户第一次购买商品时减免金额</p>
        </Card>
        </Col>
        <Col span="5" offset="1">
        <Card class="purpleBg">
          <p slot="title">返代金券</p>
          <p>设置小程序用户购买商品时获得的代金券</p>
        </Card>
        </Col>
        <Col span="5" offset="1">
        <Card class="blueBg">
          <p slot="title">满赠</p>
          <p>设置小程序用户购买商品满足一定金额时进行商品赠送</p>
        </Card>
        </Col>
        <Col span="5">
        <Card class="purpleBg">
          <p slot="title">海报小程序码</p>
          <p>设置可以生成个性店铺海报，用户可以分享店铺海报</p>
        </Card>
        </Col>
        <Col span="5" offset="1">
        <Card class="redBg">
          <p slot="title">短信服务</p>
          <p>设置短信服务相关</p><br>
        </Card>
        </Col>
      </TabPane>
    </Tabs>
    </Col>
  </Row>
  </Col>
</template>
<script>
  export default {
    data () {
      return {

      }
    },
    created () {

    },
    methods: {

    }
  }
</script>
