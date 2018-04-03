<style scoped lang="less">
  @import "~less/workspace.less";

  .demo-tabs-style1 {
    width: 100%;
  }

  .demo-tabs-style1 .ivu-tabs-tab {
    margin-top:10px;margin-bottom:10px;
  }

  .ivu-card {
    margin-bottom: 30px;
  }

  .cardstyle .ivu-card-head {
    border-radius: 5px 5px 0 0;
    background-color: #f7b039;
  }

  .cardstyle .ivu-card-head p {
    color: #fff !important;
  }

  .cardstyle .ivu-card-body p {
    color: #495060 !important;
  }
</style>
<template>
  <Col :lg="21" :md="21">
  <div class="orange-tip" v-show="unreadOrder > 0">
    <Icon type="ios-information" style="margin-right: 5px" size="20"></Icon>
    您有{{unreadOrder}}个订单未接单<span>立即接单</span>
  </div>
  <div class="orange-tip" v-show="unreadReply > 0">
    <Icon type="ios-information" style="margin-right: 5px" size="20"></Icon>
    您有{{unreadReply}}个评价未回复<span>立即回复</span>
  </div>
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Row :gutter="24">
      <Col span="8">
      <div class="st-title green-bg" @click="toChoose">
        <div class="st-1">当前版本：<span class="st-type">{{packageName}}</span></div>
        <div class="st-2">{{packageTime}}</div>
        <div class="st-3"><span class="st-btn">续费</span><span class="st-btn">升级</span></div>
      </div>
      </Col>
      <Col span="8">
      <div class="nd-title blue-bg">
        <div class="nd-left">
          <span class="left-title">商品总数：</span>
          <span class="left-cnt">{{goodsCount.total}}</span>
        </div>
        <div class="nd-left">
          <span class="left-title">出售中：</span>
          <span class="left-cnt">{{goodsCount.saleCount}}</span>
        </div>
        <div class="nd-left bottom-title">
          <span class="left-title">即将售罄：</span>
          <span class="left-cnt">{{goodsCount.willBeSoldOutCount}}</span>
        </div>
        <div class="nd-left bottom-title">
          <span class="left-title">已售罄：</span>
          <span class="left-cnt">{{goodsCount.soldOutCount}}</span>
        </div>
      </div>
      </Col>
      <Col span="8">
      <div class="nd-title orange-bg">
        <div class="nd-left">
          <span class="left-title">待接单：</span>
          <span class="left-cnt">{{orderInfoCount.orderB10002Count}}</span>
        </div>
        <div class="nd-left">
          <span class="left-title">代发货：</span>
          <span class="left-cnt">{{orderInfoCount.orderB10003Count}}</span>
        </div>
        <div class="nd-left bottom-title">
          <span class="left-title">待评价：</span>
          <span class="left-cnt">{{orderInfoCount.orderU10001Count}}</span>
        </div>
        <div class="nd-left bottom-title">
          <span class="left-title">已完成：</span>
          <span class="left-cnt">{{orderInfoCount.orderU10002Count}}</span>
        </div>
      </div>
      </Col>
    </Row>
    </Col>
  </Row>
  <Row>
    <Col :lg="22" offset="1">
    <div class="total-data area-border">
      <div class="grey-bg">数据统计</div>
      <div class="total-area">
        <Row :gutter="24">
          <Col span="4">
          <div class="total-top">昨日订单数</div>
          <div class="total-down">{{dataInfo.orderYesterdayCount}}</div>
          </Col>
          <Col span="4">
          <div class="total-top">昨日交易额（元）</div>
          <div class="total-down">{{dataInfo.shopFinanceYesterdayCount}}</div>
          </Col>
          <Col span="4">
          <div class="total-top">总订单数</div>
          <div class="total-down">{{dataInfo.orderCount}}</div>
          </Col>
          <Col span="4">
          <div class="total-top">总交易额（元）</div>
          <div class="total-down">{{dataInfo.shopFinanceTotalCount}}</div>
          </Col>
          <Col span="4">
          <div class="total-top">总用户数</div>
          <div class="total-down">{{dataInfo.userTotalCount}}</div>
          </Col>
          <Col span="4">
          <div class="total-top">活跃用户数</div>
          <div class="total-down">{{dataInfo.userActiveCount}}</div>
          </Col>
        </Row>
      </div>
    </div>
    </Col>
  </Row>
  <Row type="flex" style="margin-top: 20px">
    <Col :lg="10" offset="1">
    <div>
      <p class="x-bar">
      <p :id="option1Id"
         :option="option1"></p>
      </p>
    </div>
    </Col>
    <Col :lg="10" offset="1">
    <div>
      <p class="x-bar">
      <p :id="option2Id"
         :option="option2"></p>
      </p>
    </div>
    </Col>
  </Row>
  <Row type="flex" style="margin-bottom: 30px">
    <Col :lg="22" offset="1">
    <Row :gutter="24">
      <Col span="12">
      <div class="area-border bottom-table">
        <div class="table-title">用户消费排行</div>
        <Table :columns="columns1" :data="userData" class="table-body"></Table>
      </div>
      </Col>
      <Col span="12">
      <div class="area-border bottom-table">
        <div class="table-title">积分排行</div>
        <Table :columns="columns2" :data="integralNumData" class="table-body"></Table>
      </div>
      </Col>
    </Row>
    </Col>
  </Row>
  </Col>
</template>
<script>
  // 导入chart组件
  import XChart from '@/components/admin/chart.vue'
  import HighCharts from 'highcharts'
  export default {
    components: {
      XChart
    },
    data () {
      return {
        id: '',
        option1Id: '1',
        option2Id: '2',
        option1: {
          title: {
            text: ''
          },
          xAxis: {
            categories: []
          },
          yAxis: {
            title: {
              text: '个数',
            },
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }],
            allowDecimals: false

          },
          subtitle: {
            text: '7日订单数据',
            align: 'left',
            x: -10
          },
          tooltip: {
            valueSuffix: '个'
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
          },
          series: [{
            name: '个数',
            data: []
          }],
          credits: {
            enabled: false
          }
        },
        option2: {
          chart: {
            type: 'line'//指定图表的类型，默认是折线图（line）
          },
          title: {
            text: ''
          },
          xAxis: {
            categories: ''
          },
          yAxis: {
            title: {
              text: '元'
            },
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }],
          },
          subtitle: {
            text: '7日交易数据',
            align: 'left',
            x: -10
          },
          tooltip: {
            valueSuffix: '元'
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
          },
          series: [{ //指定数据列
            name: '钱数',
            data: [] //数据
          }],
          credits: {
            enabled: false
          }
        },
        unreadOrder: 0,
        unreadReply: 0,
        columns1: [
          {
            title: '名次',
            type: 'index'
          },
          {
            title: '用户名',
            key: 'nickName'
          },
          {
            title: '用户头像',
            key: 'avatarUrl',
            render: (h, params) => {
              return h('img', {
                attrs: {
                  src: params.row.avatarUrl, style: 'width: 40px;border-radius:20px'
                },
              });
            }
          },
          {
            title: '消费金额',
            key: 'money'
          },
        ],
        columns2: [
          {
            title: '名次',
            type: 'index'
          },
          {
            title: '用户名',
            key: 'nickName'
          },
          {
            title: '用户头像',
            key: 'avatarUrl',
            render: (h, params) => {
              return h('img', {
                attrs: {
                  src: params.row.avatarUrl, style: 'width: 40px;border-radius:20px'
                },
              });
            }
          },
          {
            title: '积分',
            key: 'integralNum'
          },
        ],
        packageName: '',
        packageTime: '',
        goodsCount: {
          total: 0,
          saleCount: 0,
          willBeSoldOutCount: 0,
          soldOutCount: 0
        },
        orderInfoCount: {
          orderB10002Count: 0,
          orderB10003Count: 0,
          orderU10001Count: 0,
          orderU10002Count: 0,
        },
        dataInfo: {
          orderYesterdayCount: 0,
          shopFinanceYesterdayCount: 0,
          orderCount: 0,
          shopFinanceTotalCount: 0,
          userTotalCount: 0,
          userActiveCount: 0
        },
        userData: [],
        integralNumData: [],
      }
    },
    created () {
      var search = window.location.search;
      var shopId = search.replace("?shopId=", "");
      if (this.Lockr.get("shopId") == undefined) {
        this.$ajax.post("/admin/setSession", {shopId: shopId}).then(function (res) {
          let data = res.data.data;
          this.Lockr.set("shopId", data._id);
          this.Lockr.set("userId", data.userId);
          this.Lockr.set("shopType", data.shopType);
          this.Lockr.set("identity", data.identity);
          this.Lockr.set("createTime", data.createTime);
        }.bind(this)).then(function () {
          this.getData()
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      } else {
        this.getData()
      }
    },
    methods: {
      toChoose(){
        this.$router.push({path:"/11-2&choosePackages"})
      },
      toGoods(){
        this.$router.push({path:"/3-2&product_list"})
      },
      toOrder(){
        this.$router.push({path:"/4-1&order_list"})
      },
      clear(){
        this.Lockr.flush();
      },
      formatDateYMD(date) {
        var myyear = date.getFullYear();
        var mymonth = date.getMonth() + 1;
        var myweekday = date.getDate();

        if (mymonth < 10) {
          mymonth = "0" + mymonth;
        }
        if (myweekday < 10) {
          myweekday = "0" + myweekday;
        }
        return (myyear + "年" + mymonth + "月" + myweekday + "日");
      },
      getData(){
        this.$ajax.get("/admin/getData").then(function (res) {
          let data = res.data;
          this.option1.xAxis.categories = data.data.data1[0];
          this.option1.series[0].data = data.data.data1[1];
          this.option2.xAxis.categories = data.data.data2[0];
          this.option2.series[0].data = data.data.data2[1];
          let goodsCount = res.data.goodsCount;
          this.goodsCount = {
            total: goodsCount.total,
            saleCount: goodsCount.saleCount,
            willBeSoldOutCount: goodsCount.willBeSoldOutCount,
            soldOutCount: goodsCount.soldOutCount
          };
          let orderInfoCount = res.data.orderInfoCount;
          this.orderInfoCount = {
            orderB10002Count: orderInfoCount.orderB10002Count,
            orderB10003Count: orderInfoCount.orderB10003Count,
            orderU10001Count: orderInfoCount.orderU10001Count,
            orderU10002Count: orderInfoCount.orderU10002Count,
          };
          let dataInfo = res.data.dataInfo;
          this.dataInfo = {
            orderYesterdayCount: dataInfo.orderYesterdayCount,
            shopFinanceYesterdayCount: dataInfo.shopFinanceYesterdayCount,
            orderCount: dataInfo.orderCount,
            shopFinanceTotalCount: dataInfo.shopFinanceTotalCount,
            userTotalCount: dataInfo.userTotalCount,
            userActiveCount: dataInfo.userActiveCount
          }
          this.userData = res.data.userData;
          this.integralNumData = res.data.integralNumData;
          let shopInfo = res.data.shopinfo;
          let lastBuyTimeStamp = shopInfo.lastBuyTimeStamp;
          let packageTimeStamp = shopInfo.packageTimeStamp;//格局化日期：年月日
          let utilDate = lastBuyTimeStamp+packageTimeStamp;
          if(new Date().getTime() - utilDate > 0){
            this.packageTime = '无期限'
          }else {
            this.packageTime = this.formatDateYMD(new Date(lastBuyTimeStamp+packageTimeStamp)) + '到期'
          }
          switch (shopInfo.packageType) {
            case "0":
              this.packageName = '免费版';
              break;
            case "1":
              this.packageName = '创业版';
              break;
            case "2":
              this.packageName = '企业版';
              break;
            case "3":
              this.packageName = '至尊版';
              break;
            default:
              this.packageName = '免费版';
              break;
          }
          this.Lockr.set("packageName",this.packageName)
        }.bind(this)).then(function () {
          HighCharts.chart(this.option1Id, this.option1)
          HighCharts.chart(this.option2Id, this.option2)
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      }
    }
  }
</script>
