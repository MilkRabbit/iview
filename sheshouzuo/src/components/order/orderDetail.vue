<style lang="less">
  @import "~less/public.less";
  @import "~less/orderDetail.less";
</style>
<template>
  <Col :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1">
      <TabPane label="订单详情" name="name1">
        <Steps :current="current" v-show="orderStatus=='B10001'||orderStatus=='B10002'||orderStatus=='B10003'||orderStatus=='U10001'||orderStatus=='U10002'">
          <Step title="买家买单"></Step>
          <Step title="待发货"></Step>
          <Step title="商家发货"></Step>
          <Step title="交易完成"></Step>
        </Steps>
        <div class="order-area">
          <div class="order-info">
            <div class="order-title">
              <div class="order-left">订单信息：</div>
              <div class="order-right"></div>
            </div>
            <div class="order-single">
              <div class="order-left">订单号：</div>
              <div class="order-right">{{orderNo}}</div>
            </div>
            <div class="order-single">
              <div class="order-left">订单类型：</div>
              <div class="order-right">{{orderClass}}</div>
            </div>
            <div class="order-single">
              <div class="order-left">买家：</div>
              <div class="order-right">{{userName}}</div>
            </div>
            <div class="order-single">
              <div class="order-left">买家留言：</div>
              <div class="order-right">{{remark}}</div>
            </div>
            <div class="order-single" style="margin-top: 30px">
              <div class="order-left">派送方式：</div>
              <div class="order-right">{{postageType}}</div>
            </div>
            <div class="order-single" style="margin-bottom: 30px">
              <div class="order-left">收货信息：</div>
              <div class="order-right">{{addressInfo}}</div>
            </div>
            <div class="order-single">
              <div class="order-left">下单时间：</div>
              <div class="order-right">{{createTime}}</div>
            </div>
            <div class="order-single">
              <div class="order-left">发货时间：</div>
              <div class="order-right">{{deliverTime}}</div>
            </div>
            <div class="order-single">
              <div class="order-left">完成时间：</div>
              <div class="order-right">{{receiptTime}}</div>
            </div>
          </div>
          <div class="order-state">
            <div class="order-title">
              <div class="order-left">订单状态：</div>
              <div class="order-right">{{orderStatusText}}</div>
            </div>
            <div class="order-title" style="margin-top: 30px">
              <div class="order-left">物流信息：</div>
              <div class="order-right"></div>
            </div>
            <div class="order-single">
              <div class="order-left">配送方式：</div>
              <div class="order-right">{{postageType}}</div>
            </div>
            <div class="order-single">
              <div class="order-left">服务商：</div>
              <div class="order-right">{{dilivery}}</div>
            </div>
            <!--<div class="order-single">-->
              <!--<div class="order-left">单号：</div>-->
              <!--<div class="order-right">{{orderNo}}</div>-->
            <!--</div>-->
          </div>
        </div>
        <Table :columns="orderColumns" :data="orderData" :loading="loading" style="margin-top: 30px;"></Table>
        <div class="order-result">
          <div class="result-cnt" style="width: 200px">
            <div class="result-single">
              <div class="result-left">满减：</div>
              <div class="result-right">{{fullFreeFee}}</div>
            </div>
            <div class="result-single" v-if="complimentary">
              <div class="result-left">满赠：</div>
              <div class="result-right">
                <span>{{complimentary}}</span>
              </div>
            </div>
            <div class="result-single">
              <div class="result-left">优惠券：</div>
              <div class="result-right">{{discountFee}}</div>
            </div>
            <div class="result-single">
              <div class="result-left">积分抵扣：</div>
              <div class="result-right">{{integralFee}}</div>
            </div>
            <div class="result-single">
              <div class="result-left">运费：</div>
              <div class="result-right">{{shopPostage}}</div>
            </div>
            <div class="result-single">
              <div class="result-left" style="font-size: 16px;color:#f90;">合计：</div>
              <div class="result-right" style="font-size: 16px;">￥{{finalPrice}}</div>
            </div>
          </div>
        </div>
      </TabPane>
    </Tabs>
    </Col>
  </Row>
  </Col>
</template>
<script>
  import orderList from '@/components/order/orderList.vue'
  export default {
    data () {
      return {
        current: 0,
        loading:false,
        orderData:[],
        orderColumns: [
          {
            title: '商品',
            key: 'goodsName',
          },
          {
            title: '价格',
            key: 'goodsPrice',
          },
          {
            title: '数量',
            key: 'buyNum',
          },
          {
            title: '小计',
            key: 'action',
            width: 200,
            align: 'center',
            render: function (h, params) {
              return h('div', parseFloat(params.row.goodsPrice)*parseFloat(params.row.buyNum));
            }
          },
        ],
        orderNo:'',
        orderStatus:'',
        orderStatusText:'',
        userName:'',
        remark:'',
        postageType:'',
        addressInfo:'',
        createTime:'',
        deliverTime:'',
        receiptTime:'',
        orderClass:'',
        dilivery:'',
        expressInfo:'',
        shopPostage:'',
        integralFee:'',
        integralNum:'',
        finalPrice:'',
        fullFreeFee:'',
        discountFee:'',
        complimentary:'',
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      next () {
        if (this.current == 3) {
          this.current = 0;
        } else {
          this.current += 1;
        }
      },
      fetchData(){
        this.$ajax.get("/order/getOrderDetail/"+this.Lockr.get("updateOrderId")).then(function (res) {
          let data = res.data.data;
          this.orderNo = data.orderNo;
          this.orderStatus = data.orderStatus;
          this.orderStatusText = data.orderStatusText;
          this.userName = data.userName;
          this.remark = data.remark;
          this.postageType = data.postageType;
          this.addressInfo = data.addressInfo;
          this.createTime = data.createTime;
          this.deliverTime = data.deliverTime;
          this.receiptTime = data.receiptTime;
          this.orderClass = data.orderClass;
          this.dilivery = data.dilivery;
          this.expressInfo = data.expressInfo;
          this.orderData = data.orderInfoArr;
          this.shopPostage = data.shopPostage;
          this.integralFee = data.integralFee;
          this.integralNum = data.integralNum;
          this.finalPrice = data.finalPrice;
          this.fullFreeFee = data.fullFreeFee;
          this.discountFee = data.discountFee;
          this.complimentary = data.complimentary;
          if(data.orderStatus=='B10001'){
            this.current = 0;
          }else if(data.orderStatus=='B10002'){
            this.current = 1;
          }else if(data.orderStatus=='B10003'){
            this.current = 2;
          }else if(data.orderStatus=='U10001'||data.orderStatus=='U10002'){
            this.current = 3;
          }
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
    }
  }
</script>
