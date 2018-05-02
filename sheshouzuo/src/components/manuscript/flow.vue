<style lang="less">
  @import "~less/public.less";
</style>
<style>
  p.typename{
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #666;
    margin-top: 40px;
  }
  .flowbox{
    width: 100%;
    padding: 50px 80px;
  }
  .flowInfo{
    font-size: 16px;
    padding:5px 0;
    padding-left: 20px;
  }
  .flowInfo:before{
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #bbb;
    left: 0;
    margin-top: 10px;
  }
</style>
<template>
  <Col :lg="21" :sm="20">
  <Row type="flex">
    <Col span="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
      <TabPane label="确定项目流程" name="name1" style="min-height: 700px">
        <Form ref="formValidate" :model="formValidate" :label-width="120">
          <p class="typename">{{ itemType }}</p>
          <div class="flowbox">
            <Row v-if="flowStep[0]" style="margin-bottom: 8px">
              <i-col span="9" offset="2">
                <div class="flowLeft">
                  <DatePicker type="date" placeholder="选择日期" format="yyyy-MM-dd" style="width: 200px" @on-change="formValidate.time1=$event" :value="formValidate.time1"></DatePicker>
                </div>
              </i-col>
              <i-col span="9" offset="2">
                <div class="flowRight">
                  <p style="font-size: 22px;color: #555">{{flowStep[0].flowName}}</p>
                  <div v-if="flowStep[0].flowInfo"  v-for="(item,index) in flowStep[0].flowInfo" :value="item" :key="index">
                    <p class="flowInfo">{{item}}</p>
                  </div>
                </div>
              </i-col>
              <Button v-if="flowTime.length>0&&isComplete==0" type="primary" size="small" @click="state(0)">完成</Button>
            </Row>
            <Row v-if="flowStep[1]" style="margin-bottom: 8px">
              <i-col span="9" offset="2">
                <div class="flowLeft">
                  <DatePicker type="date" placeholder="选择日期" format="yyyy-MM-dd" style="width: 200px" @on-change="formValidate.time2=$event" :value="formValidate.time2"></DatePicker>
                </div>
              </i-col>
              <i-col span="9" offset="2">
                <div class="flowRight">
                  <p style="font-size: 22px;color: #555">{{flowStep[1].flowName}}</p>
                  <div v-if="flowStep[1].flowInfo"  v-for="(item,index) in flowStep[1].flowInfo" :value="item" :key="index">
                    <p class="flowInfo">{{item}}</p>
                  </div>
                </div>
              </i-col>
              <Button v-if="flowTime.length>0&&isComplete==1" type="primary" size="small" @click="state(1)">完成</Button>
            </Row>
            <Row v-if="flowStep[2]" style="margin-bottom: 8px">
              <i-col span="9" offset="2">
                <div class="flowLeft">
                  <DatePicker type="date" placeholder="选择日期" format="yyyy-MM-dd" style="width: 200px" @on-change="formValidate.time3=$event" :value="formValidate.time3"></DatePicker>
                </div>
              </i-col>
              <i-col span="9" offset="2">
                <div class="flowRight">
                  <p style="font-size: 22px;color: #555">{{flowStep[2].flowName}}</p>
                  <div v-if="flowStep[2].flowInfo"  v-for="(item,index) in flowStep[2].flowInfo" :value="item" :key="index">
                    <p class="flowInfo">{{item}}</p>
                  </div>
                </div>
              </i-col>
              <Button v-if="flowTime.length>0&&isComplete==2" type="primary" size="small" @click="state(2)">完成</Button>
            </Row>
            <Row v-if="flowStep[3]" style="margin-bottom: 8px">
              <i-col span="9" offset="2">
                <div class="flowLeft">
                  <DatePicker type="date" placeholder="选择日期" format="yyyy-MM-dd" style="width: 200px" @on-change="formValidate.time4=$event" :value="formValidate.time4"></DatePicker>
                </div>
              </i-col>
              <i-col span="9" offset="2">
                <div class="flowRight">
                  <p style="font-size: 22px;color: #555">{{flowStep[3].flowName}}</p>
                  <div v-if="flowStep[3].flowInfo"  v-for="(item,index) in flowStep[3].flowInfo" :value="item" :key="index">
                    <p class="flowInfo">{{item}}</p>
                  </div>
                </div>
              </i-col>
              <Button v-if="flowTime.length>0&&isComplete==3" type="primary" size="small" @click="state(3)">完成</Button>
            </Row>
            <Row v-if="flowStep[4]" style="margin-bottom: 8px">
              <i-col span="9" offset="2">
                <div class="flowLeft">
                  <DatePicker type="date" placeholder="选择日期" format="yyyy-MM-dd" style="width: 200px" @on-change="formValidate.time5=$event" :value="formValidate.time5"></DatePicker>
                </div>
              </i-col>
              <i-col span="9" offset="2">
                <div class="flowRight">
                  <p style="font-size: 22px;color: #555">{{flowStep[4].flowName}}</p>
                  <div v-if="flowStep[4].flowInfo"  v-for="(item,index) in flowStep[4].flowInfo" :value="item" :key="index">
                    <p class="flowInfo">{{item}}</p>
                  </div>
                </div>
              </i-col>
              <Button v-if="flowTime.length>0&&isComplete==4" type="primary" size="small" @click="state(4)">完成</Button>
            </Row>
          </div>
          <FormItem style="text-align: center" v-if="flowTime.length==0">
            <Button type="primary" @click="handleSubmit('formValidate')" style="margin-top: 20px">提交</Button>
          </FormItem>
        </Form>
        <!--评价-->
        <div v-if="isComplete==6">
          <p style="color:#888;font-size: 18px;font-weight: bold">请评价本次设计</p>
          <Form :label-width="120" style="margin-top: 30px">
            <FormItem label="评价等级" prop="starlv">
                 <span v-for="(item,index) in starNum" :key="index">
                  <img class="commentlv" src="static/img/star.png" alt="" style="cursor: pointer;padding: 0 5px;width: 35px" :data-index=item @click="changlv(item)">
                </span>
            </FormItem>
            <FormItem label="评价内容" prop="comment" v-if="allcomment.length>0">
              <CheckboxGroup v-model="comment">
                <Checkbox  v-for="(item,index) in allcomment" :key="index" :label="item"></Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem v-if="evaluate.length==0">
              <Button type="primary" @click="commentSubmit()" style="margin-top: 20px">提交</Button>
            </FormItem>
          </Form>
        </div>
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
        starNum:[1,2,3,4,5],
        demandId:'',
        _id:'',
        animated:false,
        itemType:'',
        flowStep: [],
        flowTime:[],
        isComplete:0,
        formValidate:{
          time1:'',
          time2:'',
          time3:'',
          time4:'',
          time5:'',
        },

        starlv:1,
        allcomment:[],
        comment:[],
        evaluate:[]
      }
    },
    created () {
      this.getData()
    },
    methods: {
      changlv(e){
        this.starlv=e
        if(e==5){
          this.allcomment=['巧夺天工','神来之笔','文思泉涌','佛系设计师','御用高手','赞不绝口','旷世奇才','五星好评']
        }
        if(e==4){
          this.allcomment=['游刃有余','别具匠心','行云流水','劳模代表','期待下次合作','皆大欢喜','气宇轩昂','四星好评']
        }
        if(e==3){
          this.allcomment=['炉火纯青','标新立异','全心全意','有待磨合','期待下次合作','基本满意','处变不惊','顺利完成']
        }
        if(e==2){
          this.allcomment=['有待提高','跑偏的逗比','等的花儿都谢了','针尖对麦芒','继续进步','差强人意','涉世不深','磕磕绊绊']
        }
        if(e==1){
          this.allcomment=['一塌糊涂','眼高手低','老牛拉破车','不知所云','一锤子买卖','众怒难犯','尬的一匹','半途而废']
        }
        var commentlv=document.querySelectorAll('.commentlv')
        commentlv.forEach(function (val,index) {
          if($(val).attr('data-index')<=e){
            $(val).attr('src','static/img/star1.png')
          }else {
            $(val).attr('src','static/img/star.png')
          }
        })
      },
      state(state){
        this.$ajax.post("/draft/flowState",{
          id:this._id,
          isComplete:state,
          length:this.flowTime.length
        }).then(function (res) {
          if(res.data.error=='0'){
            this.$Message.success('成功!');
            this.getData()
          }
        }.bind(this)).catch(function (err) {
          console.log("error")
        });
      },
      getData(){
        var url=location.href;
        var str=url.substr(url.indexOf('?')+1)
        var arr=str.split("&"); //得到&分割的参数，放入数组中
        var demandId=arr[0].substr(arr[0].indexOf('=')+1)
        var _id=arr[1].substr(arr[1].indexOf('=')+1)
        this.demandId=demandId
        this._id=_id
        this.$ajax.get("/draft/getFlow/"+demandId).then(function (res) {
          this.itemType=res.data.className;
          this.flowStep=res.data.flow;
        }.bind(this)).catch(function (err) {
          console.log("error")
        });

        this.$ajax.get("/draft/comment/"+_id).then(function (res) {
          var data=res.data.data
          this.evaluate=data.evaluate

          this.comment=data.evaluate
          var that=this
          setTimeout(function () {

            that.changlv(data.commentlv)
          },50)


        }.bind(this)).catch(function (err) {
          console.log("error")
        });

        this.$ajax.get("/draft/getFlowTime/"+_id).then(function (res) {
          this.flowTime=res.data.flowTime
          this.formValidate.time1=this.flowTime[0];
          this.formValidate.time2=this.flowTime[1];
          this.formValidate.time3=this.flowTime[2];
          this.formValidate.time4=this.flowTime[3];
          if(this.flowTime.length==5){
            this.formValidate.time5=this.flowTime[4]
          }
          this.isComplete=res.data.isComplete;
          if(this.flowTime.length>0){
            setTimeout(function () {
              $('input').attr('disabled','disabled')
            },50)
          }
        }.bind(this)).catch(function (err) {
          console.log("error")
        });
      },
      //提交表单
      handleSubmit() {
        let id = this._id;
        if(this.formValidate.time1==''||this.formValidate.time2==''||this.formValidate.time3==''||this.formValidate.time4==''){
          this.$Message.warning('请选择时间');
          return false;
        }
        if(this.formValidate.time1>this.formValidate.time2 || this.formValidate.time1>this.formValidate.time3 || this.formValidate.time1>this.formValidate.time4 ||this.formValidate.time2>this.formValidate.time3 || this.formValidate.time2>this.formValidate.time4 || this.formValidate.time3>this.formValidate.time4 ){
          this.$Message.warning('时间格式错误');
          return false;
        }
        if(this.flowStep.length==5){
          if(this.formValidate.time5==''){
            this.$Message.warning('请选择时间');
            return false;
          }
          if(this.formValidate.time1>this.formValidate.time5 || this.formValidate.time2>this.formValidate.time5 || this.formValidate.time3>this.formValidate.time5 ||this.formValidate.time4>this.formValidate.time5 ){
            this.$Message.warning('时间格式错误');
            return false;
          }
        }
        var time = []
        if(this.flowStep.length==4){
          time=[this.formValidate.time1,this.formValidate.time2,this.formValidate.time3,this.formValidate.time4]
        }else if(this.flowStep.length==4){
          time=[this.formValidate.time1,this.formValidate.time2,this.formValidate.time3,this.formValidate.time4,this.formValidate.time5]
        }
        this.$ajax.post("/draft/addFlowTime", {time:time,id:id}).then(function (res) {
          if(res.data.error=='0'){
            this.$Message.success('成功!');
            location.reload()
          }
        }.bind(this))
          .catch(function (err) {
            console.log(err);
          })
      },

      commentSubmit(){
        let id = this._id;
        this.$ajax.post("/draft/addComment", {commentlv:this.starlv,evaluate:this.comment,id:id}).then(function (res) {
          if(res.data.error=='0'){
            this.$Message.success('成功!');
            location.reload()
          }
        }.bind(this))
          .catch(function (err) {
            console.log(err);
          })
      }
    },
  }
</script>
