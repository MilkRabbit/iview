<style>
  .demo-tabs-style1 {
    width: 100%;
  }

  .demo-tabs-style1 .ivu-tabs-tab {
    margin: 10px 0px;
  }
  .access{
    margin-top: 20px;
    background: #f8f8f8;
    overflow: hidden;
    padding: 30px 20px;
  }
</style>
<template>
  <Col :sm="18" :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1 cardstyle" :animated="animated">
      <TabPane label="概况统计" name="name1">
        <div class="access">
          <div>
            <label style="width: 100px;display: inline-block">概况统计选项</label>
            <Select v-model="selectValue" style="width:200px" @on-change="changeValue">
              <Option v-for="item in lists" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <div style="margin-top: 30px">
            <p class="x-bar">
            <p :id="option1Id"
               :option="option1"></p>
            </p>
          </div>
        </div>
        <div class="access">
          <div style="margin-top: 30px">
            <p style="padding-bottom:20px;font-size: 16px">累计项目数：<span style="font-size:18px;color: #9700ca">{{demandCount}}</span></p>
            <p class="x-bar">
            <p :id="option6Id"
               :option="option6"></p>
            </p>
          </div>
        </div>
        <div class="access">
          <div style="margin-top: 30px">
            <p style="padding-bottom:20px;font-size: 16px">累计投稿数：<span style="font-size: 18px;color: #9700ca">{{draftCount}}</span></p>
            <p class="x-bar">
            <p :id="option7Id"
               :option="option7"></p>
            </p>
          </div>
        </div>
      </TabPane>
      <TabPane label="访问分析" name="name2">
        <accessAnalysis>
        </accessAnalysis>
      </TabPane>
    </Tabs>
    </Col>
  </Row>
  </Col>
</template>
<script>
  // 导入chart组件
  import XChart from '@/components/admin/chart.vue'
  import accessAnalysis from '@/components/admin/accessAnalysis.vue'
  import HighCharts from 'highcharts'
  export default {
    components: {
      XChart,
      accessAnalysis
    },
    data () {
      return {
        selectValue:1,
        lists:[{value:1,label:'累计用户数'},{value:2,label:'转发次数'},{value:3,label:'转发人数'}],
        animated: false,
        data: [],
        loading: false,
        id: '',
        option1Id: '1',
        option1: {
          title: {
            text: '近一周概况统计'
          },
          xAxis: {
            categories: []
          },
          yAxis: {
            title: {
              text: '人数'
            },
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }],
            allowDecimals: false

          },
          tooltip: {
            valueSuffix: '人'
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
          },
          series: [{
            name: '人数',
            data: []
          }],
          credits: {
            enabled: false
          }
        },
        option6Id: '6',
        option6: {
          title: {
            text: '近一周项目数统计'
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
        option7Id: '7',
        option7: {
          title: {
            text: '近一周投稿数统计'
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
        draftCount:0,
        demandCount:0,
      }
    },
    created () {
      this.loading = true;
      this.fetchData(1)
    },
    methods: {
      changeValue(){
        this.fetchData(this.selectValue)
      },
      fetchData(type){
        let that = this;
        this.$ajax.get("/admin/summary").then(function (res) {
          that.loading = false;
          that.option1.xAxis.categories = res.data.ref_date;
          if(type==1){
            that.option1.series[0].data = res.data.visit_total;
            that.option1.series[0].name="人数";
            that.option1.tooltip.valueSuffix="人";
            that.option1.yAxis.title.text="人数"
          }else if(type==2){
            that.option1.series[0].data = res.data.share_pv;
            that.option1.series[0].name="次数";
            that.option1.tooltip.valueSuffix="次";
            that.option1.yAxis.title.text="次数"
          }else if(type==3){
            that.option1.series[0].data = res.data.share_uv;
            that.option1.series[0].name="人数";
            that.option1.tooltip.valueSuffix="人";
            that.option1.yAxis.title.text="人数"
          }
        }).then(function () {
          HighCharts.chart(that.option1Id, that.option1)
        }).catch(function (err) {
          console.log("error")
        })
        this.$ajax.get("/admin/getChart").then(function (res) {
          that.loading = false;
          that.option6.xAxis.categories = res.data.timeArr;
          that.option6.series[0].data = res.data.demandData;
          that.demandCount=res.data.demandCount

          that.option7.xAxis.categories = res.data.timeArr;
          that.option7.series[0].data = res.data.draftData;
          that.draftCount=res.data.draftCount
        }).then(function () {
          HighCharts.chart(that.option6Id, that.option6)
          HighCharts.chart(that.option7Id, that.option7)
        }).catch(function (err) {
          console.log("error")
        })
      },
    }
  }
</script>
