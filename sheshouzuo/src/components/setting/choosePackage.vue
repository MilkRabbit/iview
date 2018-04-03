<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <Col :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
      <TabPane label="我的套餐" name="name1">
        <Table border :columns="columns" :data="data" :loading="loading"></Table>
      </TabPane>
      <TabPane label="选择套餐" name="name2">
        <step :packageType="packageType" :userData="userData" :userInfo="userInfo" :resultMoney="resultMoney"></step>
      </TabPane>
    </Tabs>
    </Col>
  </Row>
  </Col>
</template>
<script>
  import step from '@/components/setting/step.vue'
  export default {
    components:{
      step
    },
    data () {
      return {
        animated:false,
        columns: [
          {
            title: '套餐种类',
            key: 'type',
          },
          {
            title: '版本信息',
            key: 'info',
          },
          {
            title: '到期时间',
            key: 'date',
          }
        ],
        data: [],
        userData:{},
        userInfo:{},
        loading: false,
        packageType:[{
          money: '',
          productCount:''
        },{
          money: '',
          productCount:''
        },{
          money: '',
          productCount:''
        },{
          money: '',
          productCount:''
        }],
        resultMoney:''
      }
    },
    created () {
      this.loading = true;
      this.fetchData()
    },
    methods: {
      fetchData(){
        this.$ajax.get("/setting/choosePackages").then(function (res) {
          this.loading = false;
          console.log(res)
          let data = this.userData =  res.data.data;
          let info = this.userInfo =  res.data.info;
          this.resultMoney = res.data.resultMoney;
          this.packageType = res.data.packageType;
          let lastBuyTimeStamp = info.lastBuyTimeStamp;
          let packageTimeStamp = info.packageTimeStamp;//格局化日期：年月日
          let formatDateYMD = function(date) {
            let myyear = date.getFullYear();
            let mymonth = date.getMonth() + 1;
            let myweekday = date.getDate();
            if (mymonth < 10) {
              mymonth = "0" + mymonth;
            }
            if (myweekday < 10) {
              myweekday = "0" + myweekday;
            }
            return (myyear + "年" + mymonth + "月" + myweekday+ "日");
          };
          let utilDate = lastBuyTimeStamp+packageTimeStamp;
          let date;
          if(new Date().getTime() - utilDate > 0){
            date = '无期限'
          }else {
            date = formatDateYMD(new Date(lastBuyTimeStamp+packageTimeStamp))
          }
          this.data = [{
            type:data.name,
            info:'小橙云店'+data.name,
            date:date
          }];
//          this.pageTotal = res.data.data.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      show (index) {
        this.$Modal.info({
          title: '分类信息',
          content: `分类名：${this.data[index].className}`
        })
      },
      remove (_id, index) {
        this.$Modal.confirm({
          title: '确认删除',
          content: '<p>确认删除吗?</p>',
          onOk: () => {
            this.$ajax.post("/server/deleteServerSort", {"id": _id}).then(function (res) {
              console.log(res)
              if (res.data.error == '0') {
                this.$Message.success('删除成功!');
                this.data.splice(index, 1);
              }
            }.bind(this)).catch(function (err) {
              console.log("error")
            })
          }
        });
      },
      changePage (index) {
        this.$ajax.get("/server/serverSort/" + index).then(function (res) {
          this.loading = false;
          this.data = res.data.data.data;
          this.pageTotal = res.data.data.count;
        }.bind(this)).catch(function (err) {
          console.log("error")
        })
      }
    }
  }
</script>
