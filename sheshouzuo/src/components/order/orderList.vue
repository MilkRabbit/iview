<template>
  <div>
    <div class="myTable">
        <div class="table-th-tr">
          <div class="table-th" style="width: 40%">商品信息</div>
          <div class="table-th" style="width: 10%">单价/数量</div>
          <div class="table-th" style="width: 10%">实收款</div>
          <div class="table-th" style="width: 10%">配送方式</div>
          <div class="table-th" style="width: 15%">收货人</div>
          <div class="table-th" style="width: 15%">订单状态</div>
        </div>
      <div class="table-cnt noOrder" v-show="data.length==0">
        暂无订单数据
      </div>
      <div class="table-cnt" v-for="(singleData,index) in data" :key="index">
        <div class="table-top">
          订单号：{{singleData.orderNo}} 下单时间：{{singleData.createTime}} 客户：{{singleData.userName}}，{{singleData.phone}}
          <span class="rightFloat">
            <span class="orderDetail" @click="getOrderDetail(singleData._id)">订单详情</span>
            <!--<span class="orderCopy">打印小票</span>-->
          </span>
        </div>
        <div class="table-tr">
          <div style="width: 50%">
            <div class="table-info" v-for="(singleOrderInfo,orderInfoIndex) in singleData.orderInfo">
            <div class="table-td" style="width: 80%">{{singleOrderInfo.goodsName}}</div>
            <div class="table-td" style="width: 20%">{{singleOrderInfo.goodsPrice}}/{{singleOrderInfo.buyNum}}</div>
            </div>
          </div>
          <div class="table-td" style="width: 10%">{{singleData.finalPrice}}</div>
          <div class="table-td" style="width: 10%">{{singleData.postageTypeText}}</div>
          <div class="table-td" style="width: 15%">{{singleData.addressinfo}},{{singleData.userName}},{{singleData.phone}}</div>
          <div class="table-td" style="width: 15%">
            <div v-if="singleData.orderStatus=='B10001'">待确认订单</div>
            <div v-if="singleData.orderStatus=='B10002'">已确认，备货中</div>
            <div v-if="singleData.orderStatus=='B10003'">配送中</div>
            <div v-if="singleData.orderStatus=='B10004'">拒绝配送</div>
            <div v-if="singleData.orderStatus=='B10005'">超时未付款</div>
            <div v-if="singleData.orderStatus=='U10001'">客户收到货，待评价！</div>
            <div v-if="singleData.orderStatus=='U10002'">评价完成，订单关闭！</div>
            <div v-if="singleData.orderStatus=='U10003'">客户申请退货！</div>
            <div v-if="singleData.orderStatus=='T10001'">协商成功，退款中</div>
            <div v-if="singleData.orderStatus=='T10002'">协商退货失败</div>
            <div v-if="singleData.orderStatus=='T10003'">退货完成，订单关闭！</div>
            <div class="orderBtn" v-if="singleData.orderStatus=='B10001'" @click="changeOrderStatus(singleData._id,singleData.orderStatus,index)">确认订单</div>
            <div class="orderBtn" v-if="singleData.orderStatus=='B10002'&&singleData.postageType=='1'" @click="addDiliveryMan(singleData._id,singleData.orderStatus,index)">分配配送员</div>
            <div class="orderBtn" v-if="singleData.orderStatus=='B10002'&&singleData.postageType=='2'" @click="addExpressCompany(singleData._id,singleData.orderStatus,index)">分配快递公司</div>
            <div class="orderBtn" v-if="singleData.orderStatus=='B10003'" @click="changeOrderStatus(singleData._id,singleData.orderStatus,index)">确认送达</div>
            <div class="orderBtn" v-if="singleData.orderStatus=='U10003'" @click="cancelorder(singleData._id,singleData.orderStatus,index)">同意退货</div>
            <div class="orderBtn" v-if="singleData.orderStatus=='U10003'" @click="changeOrderStatus(singleData._id,singleData.orderStatus,index)">拒绝退货</div>
            <div class="orderBtn" v-if="singleData.orderStatus=='T10002'&&singleData.postageType=='1'" @click="addDiliveryMan(singleData._id,singleData.orderStatus,index)">分配配送员</div>
            <div class="orderBtn" v-if="singleData.orderStatus=='T10002'&&singleData.postageType=='2'" @click="addExpressCompany(singleData._id,singleData.orderStatus,index)">分配快递公司</div>
          </div>
        </div>
      </div>
    </div>
    <Modal
      v-model="diliverymanModel"
      title="添加配送员"
      @on-ok="addDiliveryManPost">
      <Select class="inline-select" style="width: 450px" v-model="diliverymaId">
        <Option :value="singleDiliveryman._id" v-for="(singleDiliveryman,index) in diliverymanData" :key="index">{{singleDiliveryman.diliverymanName}}</Option>
      </Select>
    </Modal>
    <Modal
      v-model="expressCompanyModel"
      title="添加快递公司"
      @on-ok="addExpressCompanyPost">
      <Select class="inline-select" style="width: 500px" v-model="expressCompanyCode">
        <Option :value="singleExpressCompany.code" v-for="(singleExpressCompany,index) in expressCompanyData" :key="index">{{singleExpressCompany.name}}</Option>
        <Option value="other">其他</Option>
      </Select>
      <Input v-model="otherExpressCompany" placeholder="请输入上方不存在的快递公司（只需要填写一项）" v-show="expressCompanyCode=='other'"></Input>
      <Input v-model="expressNo" placeholder="请输入快递单号"></Input>
    </Modal>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :current="current" :total="total" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  export default {
    props: [
      'name',
      'orderSearch'
    ],
    data () {
      return {
        data: [],
        total: 0,
        current: 1,
        loading: false,
        diliverymanModel:false,
        diliverymanData:[],
        diliverymaId:'',
        expressCompanyModel:false,
        expressCompanyData:[],
        expressCompanyCode:'',
        otherExpressCompany:'',
        expressNo:''
      }
    },
    watch:{
      // 通过这种语法来watch就行，文档里有。。。看需求，还可以直接watch data，使用deep:true来深度观察
      'name':{
        handler:function(val,oldVal){
          this.loading = true;
          this.fetchData();
          //要执行的任务
          //这里不知道怎么才能修改到this.data的数据，有知道的麻烦告知
          //现在知道的就是通过直接修改Store.state的方式来更新数据，当然效果和修改this.data是一样的
        },
        // 深度观察
        deep:true
      },
      'orderSearch.searchState':{
        handler:function(val,oldVal){
          this.loading = true;
          if(val == 1){
            this.searchData();
          }
        },
        // 深度观察
        deep:true
      }
    },
    created () {
      this.loading = true;
    },
    mounted () {
      this.fetchData();
    },
    methods: {
      changeOrderStatus(id,code,index){
        this.$layer.confirm('确认操作吗?一旦确认不可修改！', function () {
            this.$ajax.post("/order/changeOrderStatus", {
              id: id,
              code: code
            }).then(function (res) {
              if (res.data.error == '0') {
                this.$Message.success('修改订单状态成功!');
                if(this.name=='1'||this.name=='7'){
                  this.data[index].orderStatus = res.data.code;
                }else {
                  this.data.splice(index,1);
                }
              }else {
                this.$Message.error('服务器出错，请稍后重试!');
              }
            }.bind(this)).catch(function (err) {
              console.log(err)
            });
            this.$layer.closeAll()
          }.bind(this)
        );
      },
      addDiliveryMan(id,code,index){
        this.diliverymanModel = true;
        this.$ajax.get("/shopInfo/getDiliverymanDataAll").then(function (res) {
          if (res.data.error == '0') {
            if(res.data.data.length==0){
              this.$layer.confirm('请现在商品管理-配送员设置中添加配送员，点击确定前往！', function () {
                  this.$router.push({path:'/2-2&diliveryman_list'})
                  this.$layer.closeAll()
                }.bind(this)
              );
            }else {
              this.diliverymanData = res.data.data;
              this.diliverymaId = res.data.data[0]._id;
              this.Lockr.set("changedOrderId",id);
              this.Lockr.set("changedOrderCode",code);
              this.Lockr.set("changedOrderIndex",index);
            }
          }else {
            this.$Message.error('服务器出错，请稍后重试!');
          }
        }.bind(this)).catch(function (err) {
          console.log(err)
        });
      },
      addDiliveryManPost(){
        this.$layer.confirm('确认操作吗?一旦确认不可修改！', function () {
            this.$ajax.post("/order/addDiliveryMan", {
              id: this.Lockr.get("changedOrderId"),
              diliveryId: this.diliverymaId,
              code: this.Lockr.get("changedOrderCode")
            }).then(function (res) {
              console.log(res)
              if (res.data.error == '0') {
                this.$Message.success('修改订单状态成功!');
                if(this.name=='1'){
                  this.data[this.Lockr.get("changedOrderIndex")].orderStatus = res.data.code;
                }else {
                  this.data.splice(this.Lockr.get("changedOrderIndex"),1);
                }
                this.Lockr.rm("changedOrderId");
                this.Lockr.rm("changedOrderCode");
                this.Lockr.rm("changedOrderIndex");
              }else {
                this.$Message.error('服务器出错，请稍后重试!');
              }
            }.bind(this)).catch(function (err) {
              console.log(err)
            });
            this.$layer.closeAll()
          }.bind(this)
        );
      },
      addExpressCompany(id,code,index){
        this.expressCompanyModel = true;
        this.$ajax.get("/order/getExpressCompany").then(function (res) {
          if (res.data.error == '0') {
            this.expressCompanyData = res.data.data;
            this.expressCompanyCode = res.data.data[0].code;
            this.Lockr.set("changedOrderId",id);
            this.Lockr.set("changedOrderCode",code);
            this.Lockr.set("changedOrderIndex",index);
          }else {
            this.$Message.error('服务器出错，请稍后重试!');
          }
        }.bind(this)).catch(function (err) {
          console.log(err)
        });
      },
      addExpressCompanyPost(){
        let expressCode = this.expressCompanyCode;
        let expressName;
        let expressNo = this.expressNo;
        if(expressCode=='other'){
          expressName = this.otherExpressCompany;
          if (expressName.trim()=='') {
            this.$Message.info('请选择一个快递公司或者输入您自己的快递公司');
            return false;
          }
        }else {
          expressName = this.expressCompanyData.find(item => item.code === this.expressCompanyCode)['name'];
        }
        if (expressNo.trim()=='') {
          this.$Message.info('请输入快递单号');
          return false;
        }
        this.$layer.confirm('确认操作吗?一旦确认不可修改！', function () {
            this.$ajax.post("/order/addExpressCompany", {
              id: this.Lockr.get("changedOrderId"),
              expressCode: expressCode,
              expressName:expressName,
              expressNo:expressNo
            }).then(function (res) {
              if (res.data.error == '0') {
                this.$Message.success('修改订单状态成功!');
                if(this.name=='1'){
                  this.data[this.Lockr.get("changedOrderIndex")].orderStatus = res.data.code;
                }else {
                  this.data.splice(this.Lockr.get("changedOrderIndex"),1);
                }
                this.Lockr.rm("changedOrderId");
                this.Lockr.rm("changedOrderCode");
                this.Lockr.rm("changedOrderIndex");
              }else {
                this.$Message.error('服务器出错，请稍后重试!');
              }
            }.bind(this)).catch(function (err) {
              console.log(err)
            });
            this.$layer.closeAll()
          }.bind(this)
        );
      },
      cancelorder(id,code,index){
        this.$layer.confirm('确认操作吗?一旦确认不可修改！', function () {
            this.$ajax.post("/order/cancelorder", {
              id: id,
              code: code
            }).then(function (res) {
              if (res.data.error == '0') {
                this.$Message.success('修改订单状态成功!');
                if(this.name=='1'){
                  this.data[index].orderStatus = res.data.code
                }else {
                  this.data.splice(index,1);
                }
              }else {
                this.$Message.error('服务器出错，请稍后重试!');
              }
            }.bind(this)).catch(function (err) {
              console.log(err)
            });
            this.$layer.closeAll()
          }.bind(this)
        );
      },
      getOrderDetail(_id){
        this.Lockr.set("updateOrderId",_id);
        this.$router.push({
          path:'/4-1&orderDetail'
        })
      },
      fetchData(){
        this.$ajax.get("/order/order/"+this.name+"/1",{
          params:this.orderSearch
        }).then(function (res) {
          this.loading = false;
          this.data = res.data.data.data;
          this.total = res.data.data.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      searchData(){
        this.$ajax.get("/order/order/"+this.name+"/1",{
          params:this.orderSearch
        }).then(function (res) {
          this.loading = false;
          this.data = res.data.data.data;
          this.total = res.data.data.count;
          this.orderSearch.searchState = 0;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      changePage (index) {
        this.current = index;
        this.$ajax.get("/order/order/"+this.name+"/" + index,{
          params:this.orderSearch
        }).then(function (res) {
          this.loading = false;
          this.data = res.data.data.data;
          this.total = res.data.data.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
    }
  }
</script>
