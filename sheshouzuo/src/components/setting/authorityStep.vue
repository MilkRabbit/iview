<style>
  @import "auth.css";
  td, th {
    padding: 0;
  }
</style>
<template>
  <div>
    <br>
    <Steps :current="current">
      <Step title="授权"></Step>
      <Step title="提交信息"></Step>
      <Step title="发布结果"></Step>
    </Steps>
    <div v-if="show1">
      <Form :label-width="80">
        <br>
        <br>
        <FormItem label="">
          <span>选择你拥有的小程序授权给小橙云，授权完成后，当有新版本的小程序时，系统会自动将最新的程序包提交给微信，不需要您在手动提交审核，请尽快授权</span>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="toStep2">授权微信小程序</Button>
        </FormItem>
      </Form>
    </div>
    <div v-if="show2">
      <Form ref="formValidate" :model="formValidate" :label-width="80">
        <br>
        <br>
        <FormItem label="AppSecret" prop="appsecret">
          <Input v-model="formValidate.appsecret" placeholder="请输入AppSecret"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="toStep3" >提交审核</Button>
        </FormItem>
      </Form>
    </div>
    <div :result="result2" :code="result1" v-if="show3">
      <div v-if="publishStatus==1">
        <div style="margin-top: 20px">
          <label style="margin-bottom: 10px;font-size: 14px">体验二维码</label>
          <div class="col-lg-2 m-bot15">
            <img :src="imgsrc" style='width:120px;height:120px'/>
          </div>
        </div>
        <div style="font-size: 14px">
          <label>发布状态</label>
          <div style="margin: 15px 0">
            <label style="color:#f7b039;margin: 10px 0">已提交给微信审核,请耐心等待</label>
          </div>
        </div>
        <Button type="primary" @click="show2=true;show3=false;current=1" >修改AppScrect</Button>
      </div>
      <div v-if="publishStatus==2">
        <div style="margin-top: 20px">
          <label style="margin-bottom: 10px;font-size: 14px">小程序码</label>
          <div class="col-lg-2 m-bot15">
            <img :src="imgsrc" style='width:120px;height:120px'/>
          </div>
        </div>
        <div style="font-size: 14px">
          <label>发布状态</label>
          <div style="margin: 15px 0">
            <label style="color:#f7b039;margin: 10px 0">已通过审核！</label>
          </div>
        </div>
        <Button type="primary" @click="show2=true;show3=false;current=1" >修改AppScrect</Button>

        <div class="form-group center" style="margin-top: 100px;">
          <Button type="primary" @click="anewpublish" >重新发布</Button>
          <Button type="warning" @click="returnLast" style="margin-left: 20px">返回上一版本</Button>
        </div>
      </div>
      <div v-if="publishStatus==3">
        <div style="margin-top: 20px">
          <label style="margin-bottom: 10px;font-size: 14px">体验二维码</label>
          <div class="col-lg-2 m-bot15">
            <img :src="imgsrc" style='width:120px;height:120px'/>
          </div>
        </div>
        <div style="font-size: 14px">
          <label>发布状态</label>
          <div style="margin: 15px 0">
            <label style="color:#f7b039;margin: 10px 0">未通过审核！</label>
          </div>
        </div>
        <div>
          <label>未通过原因</label>
          <div style="margin-bottom: 15px">
            <p v-model="refuseReason"></p>
          </div>
        </div>
        <Button type="primary" @click="show2=true;show3=false;current=1" >修改AppScrect</Button>

        <div class="form-group center" style="margin-top: 100px;">
          <Button type="primary" @click="anewpublish" >重新发布</Button>
        </div>
      </div>
    </div>
    <br>

  </div>
</template>
<script>
  export default {
    data () {
      return {
        imgsrc:'',
        refuseReason:'',
        formValidate:{
          appsecret:''
        },
        current: 0,
        data: [],
        show1: false,
        result1: '',
        show2: false,
        result2: 0,
        show3: false,
        publishStatus:0
      }
    },
    methods: {
      next () {
        if (this.current == 2) {
          this.current = 0;
        } else {
          this.current += 1;
        }
      },
      before () {
        if (this.current == 0) {
          this.current = 2;
        } else {
          this.current -= 1;
        }
      },
      toStep2 () {
        this.$ajax.get("/marketing/getcode",{}).then(function (res) {
//          console.log(res.data)
          window.location.href = res.data
        })
          .catch(function (err) {
            console.log(err);
          })
      },
      toStep3 () {
        var that=this
        this.$ajax.post("/marketing/publishxcx", {
          appSecret:that.formValidate.appsecret
        }).then(function (res) {
          window.location.reload()
        })
          .catch(function (err) {
            console.log(err);
          })

        this.next();
        this.show2 = false;
        this.show3 = true
      },

      anewpublish () {
        this.$ajax.get("/marketing/anewpublish", {}).then(function (res) {
          window.location.reload()
//          console.log(res)
        })
          .catch(function (err) {
            console.log(err);
          })
      },
      fetchData(){
        var that=this
        this.$ajax.get("/marketing/authorityPage",{

        }).then(function (res) {
          if((res.data.isShouquan=='0')){
            that.current = 0;
            that.show1 = true;
            that.show2 = false;
            that.show3 = false
          }
          if((res.data.isShouquan=='1')&&(res.data.appSecret=='')){
            that.current = 1;
            that.show1 = false;
            that.show2 = true;
          }
          if((res.data.isShouquan=='1')&&(res.data.publishStatus=='0')){
            that.current = 1;
            that.show1 = false;
            that.show2 = true;
          }
          if((res.data.isShouquan=='1')&&(res.data.appSecret!='')&&(res.data.publishStatus!='0')){
            that.current = 2;
            that.show1 = false;
            that.show2 = false;
            that.show3 = true
            that.publishStatus=res.data.publishStatus
//            if(res.data.refuseReason){
//              that.refuseReason=res.data.refuseReason
//            }
            that.imgsrc=res.data.img
          }
        })
          .catch(function (err) {
            console.log(err);
          })
      },
      returnLast(){
        var that=this
        this.$ajax.get("/marketing/returnLast").then(function (res) {
          if (res.data.error == '0'){

            that.$Message.success('返回上一版本成功!');
            setTimeout(function () {
              location.reload()
            },300)
          }else if (res.data.error == '50002'){
            that.$Message.warning('返回上一版本失败!');
            setTimeout(function () {
              location.reload()
            },300)
          }
        })
          .catch(function (err) {
            console.log(err);
          })
      },
    },
    created(){
      this.fetchData()
    }
  }
</script>
