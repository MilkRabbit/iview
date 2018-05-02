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
  <Tabs value="name1" class="demo-tabs-style1 cardstyle" :animated="animated">
    <div class="access">
      <div>
        <label style="width: 100px;display: inline-block">访问趋势选项</label>
        <Select v-model="trend" style="width:200px" @on-change="changetrend">
          <Option v-for="item in lists1" :value="item.type" :key="item.type">{{ item.label }}</Option>
        </Select>
      </div>
      <div style="margin-top: 30px">
        <p class="x-bar">
        <p :id="option2Id"
           :option="option2"></p>
        </p>
      </div>
    </div>

    <div class="access">
      <div>
        <label style="width: 100px;display: inline-block">访问方式</label>
        <Select v-model="selectWay" style="width:200px" @on-change="changeWay">
          <Option v-for="item in ways" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </div>
      <div style="margin-top: 30px">
        <p class="x-bar">
        <p :id="option3Id"
           :option="option3"></p>
        </p>
      </div>
    </div>
    <div class="access">
      <div>
        <label style="width: 100px;display: inline-block">访问页面路径</label>
        <Select v-model="selectPath" style="width:200px" @on-change="changePath">
          <Option v-for="item in paths" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
        <label style="width: 100px;display: inline-block">访问页面选项</label>
        <Select v-model="selectValue" style="width:200px" @on-change="changeValue">
          <Option v-for="item in lists4" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div style="margin-top: 30px">
        <p class="x-bar">
        <p :id="option5Id"
           :option="option5"></p>
        </p>
      </div>
    </div>
  </Tabs>
</template>
<script>
  // 导入chart组件
  import XChart from '@/components/admin/chart.vue'
  import HighCharts from 'highcharts'
  import distribution from '../../../static/data/distribution.json';
  export default {
    components: {
      XChart,
    },
    data () {
      return {
        trend:'session_cnt',
        selectWay:1,
        selectPath:'pages/index/index',
        selectValue:'page_visit_pv',
        lists1:[
          {value:1,type:'session_cnt',      label:'打开次数'},
          {value:2,type:'visit_pv',         label:'访问次数'},
          {value:3,type:'visit_uv',         label:'访问人数'},
          {value:4,type:'visit_uv_new',     label:'新用户数'},
          {value:5,type:'stay_time_uv',     label:'人均停留时长'},
          {value:6,type:'stay_time_session',label:'次均停留时长'},
          {value:7,type:'visit_depth',      label:'平均访问深度'},
          ],
        ways:distribution.data,
        paths:[
          {value:"pages/index/index",   			        name:'首页'},
          {value:"pages/detail/detail",   			      name:'项目详情'},
          {value:"pages/search/search",  		          name:'搜索页面'},
          {value:"pages/message/message", 	          name:'信息页面'},
          {value:"pages/mine/mine",                   name:'我的页面'},
          {value:"pages/authen/authen", 	            name:'认证页面'},
          {value:"pages/browse/browse",               name:'浏览记录'},
          {value:"pages/profit/profit", 		          name:'收益明细'},
          {value:"pages/setup/setup",			            name:'设置页面'},
          {value:"pages/filter/filter",			          name:'筛选页面'},
          {value:"pages/gather/gather", 			        name:'收款方式'},
          {value:"pages/resume/resume",		            name:'个人简历'},
          {value:"pages/classify/classify", 			    name:'项目类别'},
          {value:"pages/lable/lable",  			          name:'标签选择'},
          {value:"pages/mesubmit/mesubmit",           name:'我的投稿'},
          {value:"pages/firstdraft/firstdraft", 		  name:'提交初稿'},
          {value:"pages/Uploadingmes/Uploadingmes", 	name:'个人作品上传'},
          {value:"pages/abouts/abouts", 		          name:'关于设手座'},
          {value:"pages/share/share", 		            name:'分享红包'},
          {value:"pages/classDetail/classDetail", 		name:'项目列表页'},
          {value:"pages/collect/collect", 		        name:'收藏页面'},
          {value:"pages/party/party", 		            name:'甲方页面'},
        ],
        lists4:[
          {value:'page_visit_pv',label:'访问次数'},
          {value:'page_visit_uv',label:'访问人数'},
          {value:'page_staytime_pv',label:'次均停留时长'},
          {value:'entrypage_pv',label:'进入页次数'},
          {value:'exitpage_pv',label:'退出页次数'},
          {value:'page_share_pv',label:'转发次数'},
          {value:'page_share_uv',label:'转发人数'},
          ],
        animated: false,
        data: [],
        loading: false,
        id: '',
        option2Id: '2',
        option2: {
          title: {
            text: '访问趋势分析'
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
        option3Id: '3',
        option3: {
          title: {
            text: '访问分布分析'
          },
          xAxis: {
            categories: []
          },
          yAxis: {
            title: {
              text: '次数'
            },
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }],
            allowDecimals: false

          },
          tooltip: {
            valueSuffix: '次'
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
          },
          series: [{
            name: '次数',
            data: []
          }],
          credits: {
            enabled: false
          }
        },
        option5Id: '5',
        option5: {
          title: {
            text: '访问页面分析'
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
      }
    },
    created () {
      this.loading = true;
      this.fetchData(this.trend,this.selectWay,this.selectPath,this.selectValue)
    },
    methods: {
      changetrend(){
        this.fetchData(this.trend,this.selectWay,this.selectPath,this.selectValue)
      },
      changeWay(){
        this.fetchData(this.trend,this.selectWay,this.selectPath,this.selectValue)
      },
      changePath(){
        this.fetchData(this.trend,this.selectWay,this.selectPath,this.selectValue)
      },
      changeValue(){
        this.fetchData(this.trend,this.selectWay,this.selectPath,this.selectValue)
      },
      fetchData(type,way,path,selectvalue){
        let that = this;
        this.$ajax.get("admin/access").then(function (res) {
          that.loading = false;
          var data1=res.data.data1
          that.option2.xAxis.categories = data1.ref_date;
          for(var i in data1){
            if(i==type){
              that.option2.series[0].data = data1[i];
            }
          }
          if(type=='session_cnt'||type=='visit_pv'){
            that.option2.series[0].name="次数";
            that.option2.tooltip.valueSuffix="次";
            that.option2.yAxis.title.text="次数"
          }else if(type=='visit_uv'||type=='visit_uv_new'){
            that.option2.series[0].name="人数";
            that.option2.tooltip.valueSuffix="人";
            that.option2.yAxis.title.text="人数"
          }else if(type=='stay_time_uv'||type=='stay_time_session'){
            that.option2.series[0].name="秒";
            that.option2.tooltip.valueSuffix="秒";
            that.option2.yAxis.title.text="秒"
          }else if(type=='visit_depth'){
            that.option2.series[0].name="";
            that.option2.tooltip.valueSuffix="";
            that.option2.yAxis.title.text=""
          }
          var data2=res.data.data2
          that.option3.xAxis.categories = data2.ref_date;
          var item=data2.item_list
          var waysum=[]
          item.forEach(function (value,index) {
            var num=0
            value.forEach(function (val,ind) {
              if(val.key==way){
                num=val.value
              }
            })
            waysum.push(num)
          })
          that.option3.series[0].data = waysum;

          var data3=res.data.data3

          that.option5.xAxis.categories = data3.ref_date;
          var list=data3.list
          var brr=[]
          list.forEach(function (value,index) {
            value.forEach(function (val,ind) {
              if(path==val.page_path){
                for(var j in val){
                  if(j==selectvalue){
                    brr.push(val[j])
                  }
                }
              }
            })
          })
          that.option5.series[0].data = brr;
          if(selectvalue=='page_visit_pv'||selectvalue=='entrypage_pv'||selectvalue=='exitpage_pv'||selectvalue=='page_share_pv'){
            that.option5.series[0].name="次数";
            that.option5.tooltip.valueSuffix="次";
            that.option5.yAxis.title.text="次数"
          }else if(selectvalue=='page_visit_uv'||selectvalue=='page_share_uv'){
            that.option5.series[0].name="人数";
            that.option5.tooltip.valueSuffix="人";
            that.option5.yAxis.title.text="人数"
          }else if(selectvalue=='page_staytime_pv'){
            that.option5.series[0].name="秒";
            that.option5.tooltip.valueSuffix="秒";
            that.option5.yAxis.title.text="秒"
          }
        }).then(function () {
          HighCharts.chart(that.option2Id, that.option2)
          HighCharts.chart(that.option3Id, that.option3)
          HighCharts.chart(that.option5Id, that.option5)
        }).catch(function (err) {
          console.log("error")
        })
      },
    }
  }
</script>
