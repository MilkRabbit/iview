<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <Col :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1">
      <TabPane label="订单列表" name="name1">
        <div>
          <a id="excelDownload" style="display: none;">
            <button type="button" class="ivu-btn ivu-btn-primary" style="margin-bottom: 10px;" @click="excelDownload()"><span>下载订单信息</span></button>
          </a>
          <button type="button" class="ivu-btn ivu-btn-primary" id="excelMake" style="margin-bottom: 10px;" @click="excelMake()">
            <span>导出订单信息</span>
          </button>
        </div>
        <Form ref="orderSearch" :model="orderSearch" :label-width="200" inline>
          <div class="inline-area">
            <Select class="inline-select" style="width: 186px" v-model="orderSearch.searchChoose">
              <Option value="orderNo">订单号</Option>
              <Option value="orderUserName">下单人昵称</Option>
              <Option value="orderTel">下单人手机号</Option>
            </Select>
            <Input type="text" class="inline-input" style="width: 200px" v-model.trim="orderSearch.searchVal">
            </Input>
          </div>
          <FormItem label="时间范围">
            <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px" v-model="orderSearch.time"></DatePicker>
          </FormItem>
          <!--<FormItem label="配送方式">-->
            <!--<Select class="inline-select" style="width: 200px" v-model="orderSearch.searchPostageType">-->
              <!--<Option value="all">全部</Option>-->
              <!--<Option value="1">同城限时达</Option>-->
              <!--<Option value="2">快递发货</Option>-->
              <!--<Option value="3">到店自提</Option>-->
            <!--</Select>-->
          <!--</FormItem>-->
          <FormItem>
            <Button type="primary" @click="searchSubmit('orderSearch')">筛选</Button>
            <!--<Button type="ghost" @click="handleReset('orderSearch')" style="margin-left: 8px">导出</Button>-->
          </FormItem>
        </Form>
        <Tabs type="card" :animated="animated" @on-click="getName">
          <TabPane label="全部" name="1">
            <order-list :name="name" :orderSearch="orderSearch"></order-list>
          </TabPane>
          <TabPane label="待付款" name="2">
            <order-list :name="name" :orderSearch="orderSearch"></order-list>
          </TabPane>
          <TabPane label="待确认" name="3">
            <order-list :name="name" :orderSearch="orderSearch"></order-list>
          </TabPane>
          <TabPane label="待发货" name="4">
            <order-list :name="name" :orderSearch="orderSearch"></order-list>
          </TabPane>
          <TabPane label="已发货" name="5">
            <order-list :name="name" :orderSearch="orderSearch"></order-list>
          </TabPane>
          <TabPane label="已完成" name="6">
            <order-list :name="name" :orderSearch="orderSearch"></order-list>
          </TabPane>
          <TabPane label="已关闭" name="7">
            <order-list :name="name" :orderSearch="orderSearch"></order-list>
          </TabPane>
          <TabPane label="退款中" name="8">
            <order-list :name="name" :orderSearch="orderSearch"></order-list>
          </TabPane>
        </Tabs>
      </TabPane>
    </Tabs>
    </Col>
  </Row>
  </Col>
</template>
<script>
  import orderList from '@/components/order/orderList.vue'
  export default {
    components: {
      orderList
    },
    data () {
      return {
        animated: false,
        name:1,
        orderSearch: {
          searchChoose:'orderNo',
          searchVal:'',
          time:[],
//          searchPostageType:'all',
          searchState:0,
        }
      }
    },
    created () {
    },
    methods: {
      excelMake(){
        this.$ajax.post("/order/orderExcel",{
          orderNo:"不限",
          orderStatus:"不限",
          userName:"不限"}
          ).then(function(e){
            "3"==e.data.error&&this.$Message.error("生成失败，请刷新页面再试!"),
            "0"==e.data.error&&(
              $("#excelDownload").show(),
              $("#excelDownload").get(0).href="https://staticfiles.xiaochengyun.cn/adminapiC/order/excelDownload/"+e.data.shopName,
              this.$Message.success("生成订单信息列表成功！请点击下载"))
          }.bind(this))
          .catch(function(t){console.log(t)})
      },
      excelDownload(){
        $("#excelDownload").hide()
      },
      searchSubmit(){
        this.orderSearch.searchState = 1;
      },
      getName (name) {
        this.name = name
      },
    }
  }
</script>
