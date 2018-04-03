<style>
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

  .cardstyle .ivu-card-head p{
    color: #fff !important;
  }
  .cardstyle .ivu-card-body p{
    color:#495060!important;
  }
</style>
<template>
  <Col :sm="18" :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1 cardstyle" :animated="animated">
      <TabPane label="工作台" name="name1">
        <Row type="flex">
          <Col span="6">
          <Card>
            <p slot="title">今日收入</p>
            <p>今日收入: {{income}}元</p>
          </Card>
          </Col>
          <Col span="6" offset="1">
          <Card>
            <p slot="title">今日订单</p>
            <p>今日订单: {{order}}个</p>
          </Card>
          </Col>
          <Col span="6" offset="1">
          <Card>
            <p slot="title">今日用户</p>
            <p>今日用户: {{number}}个</p>
          </Card>
          </Col>

        </Row>
        <Row type="flex">
          <Col :lg="10">
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
          <Col :lg="10">
          <div>
            <p class="x-bar">
            <p :id="option3Id"
               :option="option3"></p>
            </p>
          </div>
          </Col>
          <Col :lg="10" offset="1">
          <div>
            <p class="x-bar">
            <p :id="option4Id"
               :option="option4"></p>
            </p>
          </div>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
    </Col>
  </Row>
  </Col>
</template>
<script>
  import axios from 'axios'
  axios.defaults.baseURL = 'https://staticfiles.xiaochengyun.cn/adminapi';
  // 导入chart组件
  import XChart from '@/components/admin/chart.vue'
  import HighCharts from 'highcharts'
  export default {
    components: {
      XChart
    },
    data () {
      return {
        animated: false,
        data: [],
        loading: false,
        id: '',
        option1Id: '1',
        option2Id: '2',
        option3Id: '3',
        option4Id: '4',
        option1: {
          title: {
            text: '近一周每日生成订单个数统计图'
          },
          xAxis: {
            categories: []
          },
          yAxis: {
            title: {
              text: '个数'
            },
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }],
            allowDecimals: false

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
            text: '近一周每日财务财务统计图'
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
        option3: {
          title: {
            text: '近半个小时生成订单个数统计图'
          },
          xAxis: {
            categories: ''
          },
          yAxis: {
            title: {
              text: '个'
            },
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }],
            allowDecimals: false
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
            data: ''
          }],
          credits: {
            enabled: false
          }
        },
        option4: {
          title: {
            text: '近半个小时财务财务统计图'
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
          tooltip: {
            valueSuffix: '元'
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
          },
          series: [{
            name: '钱数',
            data: ''
          }],
          credits: {
            enabled: false
          }
        },
        income:0,
        order:0,
        number:0,
      }
    },
    created () {
      this.loading = true;
      this.fetchData()
    },
    methods: {
      fetchData(){
        let that = this;
        axios.get("/admin/index").then(function (res) {
          that.loading = false;
          that.income = res.data.data.shopFinanceCount;
          that.order = res.data.data.orderCount;
          that.number = res.data.data.userCount;
            that.option1.xAxis.categories = res.data.data.data1[0];
            that.option1.series[0].data = res.data.data.data1[1];
            that.option2.xAxis.categories = res.data.data.data2[0];
            that.option2.series[0].data = res.data.data.data2[1];
            that.option3.xAxis.categories = res.data.data.data3[0];
            that.option3.series[0].data = res.data.data.data3[1];
            that.option4.xAxis.categories = res.data.data.data4[0];
            that.option4.series[0].data = res.data.data.data4[1];
        }).then(function () {
          HighCharts.chart(that.option1Id, that.option1)
          HighCharts.chart(that.option2Id, that.option2)
          HighCharts.chart(that.option3Id, that.option3)
          HighCharts.chart(that.option4Id, that.option4)
        }).catch(function (err) {
          console.log("error")
        })
      },
    }
  }
</script>
