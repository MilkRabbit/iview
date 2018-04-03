<style lang="less">
  @import "~less/public.less";
  @import "~less/product.less";
</style>
<template>
  <Col :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
      <TabPane label="编辑商品" name="name1">
        <div class="total-data area-border">
          <div class="grey-bg">基本信息</div>
          <div class="total-cnt">
            <Col :lg="20" offset="2">
            <Form ref="baseInfo" :model="baseInfo"  :label-width="80">
              <FormItem label="商品序号" prop="goodsNameForm">
                <Input v-model="goodsOrderForm" placeholder="请输入" :maxlength="6" style="width: 100px"></Input>
                <div class="myFormTip">商品序号决定商品的排列顺序（由大到小），请填写数字，相同数字排序按照建立的先后顺序</div>
              </FormItem>
              <FormItem label="商品名" prop="goodsNameForm">
                <Input v-model="goodsNameForm" placeholder="请输入" :maxlength="50" style="width: 300px"></Input>
                <div class="myFormTip">商品名最多输入50个字符</div>
              </FormItem>
              <FormItem label="商品分类" prop="goodsClassIdForm">
                <Select v-model="goodsClassIdForm" placeholder="请选择" style="width: 200px">
                  <Option :value="goodsClass._id" :key="index" v-for="(goodsClass,index) in goodsClasses">{{
                    goodsClass.className }}
                  </Option>
                </Select>
              </FormItem>
              <FormItem label="商品描述" prop="goodsDescribeForm">
                <Input v-model="goodsDescribeForm" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                       placeholder="请输入..." :maxlength="100"></Input>
                <div class="myFormTip">商品描述最多输入100个字符</div>
              </FormItem>
              <FormItem label="会员权益" prop="vipRightForm">
                <Checkbox v-model="vipRightForm">开启会员权益</Checkbox>
                <div class="myFormTip">开启会员权益后，会员下单将享受会员价</div>
              </FormItem>
              <FormItem label="展示图"  v-if="goodsPicList!=''">
                <image-upload :defaultList="goodsPicList" :target="'goodsPic'" :num="1" :index="'notUse'"
                              @getImgList="getImgList" :width="200" :height="200"></image-upload>
              </FormItem>
            </Form>
            </Col>
          </div>
        </div>
        </Form>
        <div class="total-data area-border">
          <div class="grey-bg">库存/规格</div>
          <div class="total-cnt">
            <Col :lg="20" offset="2">
            <Form ref="baseInfo" :label-width="80">
              <div class="stock-area">
                <label class="stock-name">规格</label>
                <div class="stock-face" v-if="stockInfo.length">
                  <div class="stock-single" v-for="(singleStock,index) in stockInfo">
                    <Row class="stock-title">
                      <Col span="4" class="inside-inline">
                      <Select v-model="singleStock.value" v-show="singleStock.valueConfirm==''">
                        <Option v-for="(item,index) in specData" :value="item" :key="index">{{ item }}</Option>
                      </Select>
                      </Col>
                      <Col span="4" class="inside-inline" v-if="singleStock.value=='自定义'"
                           v-show="singleStock.valueConfirm==''">
                      <Input placeholder="请输入自定义规格" v-model.trim="singleStock.valueCustom"></Input>
                      </Col>
                      <Col class="inside-inline" v-show="singleStock.valueConfirm!=''">
                      <span v-text="singleStock.valueConfirm" class="stock-confirm-value"></span>
                      </Col>
                      <Col span="4" class="inside-inline" v-show="singleStock.valueConfirm==''">
                      <Button @click="valueConfirm(index)">添加</Button>
                      </Col>
                      <div @click="deleteSpec(index)" class="deleteSpec" v-show="singleStock.display">x</div>
                    </Row>
                    <Row>
                      <div class="specAttach" v-for="(attach,attachIndex) in singleStock.attach" :key="attachIndex">
                        {{attach}}<i class="deleteSpecAttach" @click="deleteSpecAttach(index,attachIndex)">x</i></div>
                      <Col span="4" class="inside-inline">
                      <Poptip placement="bottom-start">
                        <Button type="text" class="newPlus" icon="plus">添加</Button>
                        <div class="api" slot="content">
                          <Input placeholder="请输入规格数值" style="width: 200px" autofocus :maxlength="10"
                                 v-model="specAttach"></Input>
                          <Button type="ghost" @click="addSpecAttach(index)">添加</Button>
                        </div>
                      </Poptip>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
              <FormItem>
                <Row class="stock-title">
                  <Col span="4" class="inside-inline">
                  <Button @click="stockAdd" v-show="stockInfo.length<3">添加规格项</Button>
                  </Col>
                </Row>
              </FormItem>
              <div class="stock-area" v-if="stockInfo.length>=1">
                <label class="stock-name">库存</label>
                <table class="stock-table">
                  <tr>
                    <th v-for="(singleStock,index) in stockInfo" v-if="singleStock.valueConfirm">
                      {{singleStock.valueConfirm}}
                    </th>
                    <th>价格</th>
                    <th>折扣价</th>
                    <th v-if="vipRightForm==true">会员价</th>
                    <th>库存</th>
                    <th>商品图片</th>
                  </tr>
                  <tr v-for="(finStock,index) in getNewChart" :key="index">
                    <td v-if="finStock.param1">{{finStock.param1.value}}</td>
                    <td v-if="finStock.param2">{{finStock.param2.value}}</td>
                    <td v-if="finStock.param3">{{finStock.param3.value}}</td>
                    <td><Input style="width: 80px" v-model="finStock.priceOri"></Input></td>
                    <td><Input style="width: 80px" v-model="finStock.price"></Input></td>
                    <td v-if="vipRightForm==true"><Input style="width: 100px" v-model="finStock.priceVip"></Input></td>
                    <td><Input style="width: 100px" v-model="finStock.num"></Input></td>
                    <td>
                      <image-upload :defaultList="finStock.newImg" :target="'specInfo'" :num="1"
                                    @getImgList="getImgList" :index="index" :width="60" :height="60"></image-upload>
                    </td>
                  </tr>
                </table>
              </div>
            </Form>
            </Col>
          </div>
        </div>
        <div class="total-data area-border">
          <div class="grey-bg">商品信息</div>
          <div class="total-cnt">
            <Col :lg="20" offset="2">
            <Form ref="baseInfo" :model="baseInfo"  :label-width="80">
              <FormItem label="商品轮播图" v-if="goodsImgsList.length!=0">
                <image-upload :defaultList="goodsImgsList" :target="'goodsImgs'" :num="8" @getImgList="getImgList"
                              :index="'notUse'" :width="200" :height="200"></image-upload>
              </FormItem>
              <FormItem label="商品详情">
                <vue-editor id="editor"
                            useCustomImageHandler
                            @imageAdded="handleImageAdded" v-model="htmlForEditor">
                </vue-editor>
              </FormItem>
            </Form>
            </Col>
          </div>
        </div>
        <Button type="primary" style="margin: 30px 0" @click="newGoods">保存信息</Button>
        <Button type="ghost" style="margin: 30px 0" @click="backToList">返回列表</Button>
      </TabPane>
    </Tabs>
    </Col>
  </Row>
  </Col>
</template>
<script>
  import {VueEditor} from 'vue2-editor'
  import imageUpload from '@/components/imageUpload'
  export default {
    components: {
      VueEditor,
      imageUpload
    },
    data () {
      return {
        specData: ["颜色", "尺寸", "尺码", "规格", "款式", "净含量", "种类", "版本", "重量", "套餐", "容量", "上市时间", "系列", "机芯", "适用", "包装", "口味", "产地", "自定义"],
        animated: false,
        goodsClasses: [],
        loading: false,
        baseInfo: {
          allTime: false,
        },
        stockInfo: [],
        finalStock: [],
        specAttach: '',
        index: 1,
        defaultList: [],
        goodsOrderForm: '',
        goodsNameForm: '',
        goodsClassIdForm: '',
        goodsDescribeForm: '',
        vipRightForm: false,
        goodsPicForm: '',
        goodsImgsForm: [],
        goodsDesForm: '',
        htmlForEditor: '',
        goodsPicList:[],
        goodsImgsList:[]
      }
    },
    created () {
      this.loading = true;
      this.fetchData();
    },
    computed: {
      getNewChart() {
        if(JSON.stringify(this.stockInfo) == this.Lockr.get("stockInfo")){
          return this.finalStock
        }else {
          this.finalStock = [];
          let stockInfo = this.stockInfo;
          let arr = []
          for (var i in stockInfo) {
            if (stockInfo[i].attach.length != 0) {
              arr.push(stockInfo[i].attach)
            }
          }
          let stockArr = this.doExchange(arr);
          for (let i in stockArr) {
            if (arr.length == 3) {
              this.finalStock.push({
                param1: {
                  name: stockInfo[0].valueConfirm,
                  value: stockArr[i][0]
                },
                param2: {
                  name: stockInfo[1].valueConfirm,
                  value: stockArr[i][1]
                },
                param3: {
                  name: stockInfo[2].valueConfirm,
                  value: stockArr[i][2]
                },
                price: 0,
                isPrice: false,
                priceOri: 0,
                priceVip: 0,
                num: 0,
                img: '',
                newImg: []
              })
            } else if (arr.length == 2) {
              this.finalStock.push({
                param1: {
                  name: stockInfo[0].valueConfirm,
                  value: stockArr[i][0]
                },
                param2: {
                  name: stockInfo[1].valueConfirm,
                  value: stockArr[i][1]
                },
                price: 0,
                isPrice: false,
                priceOri: 0,
                priceVip: 0,
                num: 0,
                img: '',
                newImg: []
              })
            } else if (arr.length == 1) {
              this.finalStock.push({
                param1: {
                  name: stockInfo[0].valueConfirm,
                  value: stockArr[i]
                },
                price: 0,
                isPrice: false,
                priceOri: 0,
                priceVip: 0,
                num: 0,
                img: '',
                newImg: []
              })
            }
          }
          return this.finalStock
        }
      },
    },
    methods: {
      fetchData(){
        this.$ajax.get("/server/serverSort").then(function (res) {
          this.goodsClasses = res.data;
        }.bind(this)).catch(function (err) {
          console.log(err)
        });
        this.$ajax.get("/server/getServer/"+this.Lockr.get("goodsId")).then(function (res) {
          let data = res.data.data;
          console.log(data)
          this.Lockr.set("stockInfo",data.stockInfo);
          let stockInfo = res.data.stockInfo;
          if(data.stockInfo){
            this.stockInfo = JSON.parse(data.stockInfo);
            for(var i in stockInfo){
              if(stockInfo[i].specInfo.param3){
                this.finalStock.push({
                  param1: {
                    name: stockInfo[i].specInfo.param1.name,
                    value: stockInfo[i].specInfo.param1.value
                  },
                  param2: {
                    name: stockInfo[i].specInfo.param2.name,
                    value: stockInfo[i].specInfo.param2.value
                  },
                  param3: {
                    name: stockInfo[i].specInfo.param3.name,
                    value: stockInfo[i].specInfo.param3.value
                  },
                  img: stockInfo[i].specInfo.img,
                  newImg:stockInfo[i].specInfo.newImg,
                  priceOri: parseFloat(stockInfo[i].specInfo.priceOri) / 100,         //商品原价(单位：分)
                  price: parseFloat(stockInfo[i].specInfo.price) / 100,                     //商品现价(单位：分)
                  priceVip: parseFloat(stockInfo[i].specInfo.vipPrice) / 100,                     //商品现价(单位：分)
                  isPrice: stockInfo[i].specInfo.isPrice,                     //商品现价(单位：分)
                  num: stockInfo[i].specInfo.num,
                })
              }else if(stockInfo[i].specInfo.param2&&!stockInfo[i].specInfo.param3){
                this.finalStock.push({
                  param1: {
                    name: stockInfo[i].specInfo.param1.name,
                    value: stockInfo[i].specInfo.param1.value
                  },
                  param2: {
                    name: stockInfo[i].specInfo.param2.name,
                    value: stockInfo[i].specInfo.param2.value
                  },
                  img: stockInfo[i].specInfo.img,
                  newImg:stockInfo[i].specInfo.newImg,
                  priceOri: parseFloat(stockInfo[i].specInfo.priceOri) / 100,         //商品原价(单位：分)
                  price: parseFloat(stockInfo[i].specInfo.price) / 100,                     //商品现价(单位：分)
                  priceVip: parseFloat(stockInfo[i].specInfo.vipPrice) / 100,                     //商品现价(单位：分)
                  isPrice: stockInfo[i].specInfo.isPrice,                     //商品现价(单位：分)
                  num: stockInfo[i].specInfo.num,
                })
              }else {
                this.finalStock.push({
                  param1: {
                    name: stockInfo[i].specInfo.param1.name,
                    value: stockInfo[i].specInfo.param1.value
                  },
                  img: stockInfo[i].specInfo.img,
                  newImg:stockInfo[i].specInfo.newImg,
                  priceOri: parseFloat(stockInfo[i].specInfo.priceOri) / 100,         //商品原价(单位：分)
                  price: parseFloat(stockInfo[i].specInfo.price) / 100,                     //商品现价(单位：分)
                  priceVip: parseFloat(stockInfo[i].specInfo.vipPrice) / 100,                     //商品现价(单位：分)
                  isPrice: stockInfo[i].specInfo.isPrice,                     //商品现价(单位：分)
                  num: stockInfo[i].specInfo.num,
                })
              }
            }
          }else {
            this.stockInfo = [];
            this.finalStock = [];
          }
          this.goodsOrderForm = data.goodsOrder;
          this.goodsNameForm = data.goodsName;
          this.goodsClassIdForm = data.goodsClassId;
          this.goodsDescribeForm = data.goodsDescribe;
          if(data.isVipGoods==1){
            this.vipRightForm = true;
          }else {
            this.vipRightForm = false;
          }
          this.goodsPicForm = data.goodsPic;
          this.goodsPicList = [{
            name:data.goodsPic,
            url:data.goodsPic,
          }];
          this.goodsImgsForm = data.goodsImgs;
          for(var i in data.goodsImgs){
            this.goodsImgsList.push({
              name:data.goodsImgs[i],
              url:data.goodsImgs[i],
            })
          }
          this.htmlForEditor = data.goodsDes;
        }.bind(this)).catch(function (err) {
          console.log(err)
        });
      },
      stockAdd () {
        if (this.stockInfo.length < 3) {
          this.stockInfo.push({
            value: '',
            valueCustom: '',
            valueConfirm: '',
            display: true,
            attach: []
          });
        } else {
          this.$Message.warning("最多添加3个规格！")
        }
      },
      valueConfirm(index) {
        let valueArr = [];
        for (let i in this.stockInfo) {
          valueArr.push(this.stockInfo[i].valueConfirm)
        }
        if (this.stockInfo[index].value == "自定义" && this.stockInfo[index].valueCustom != "") {
          if (valueArr.includes(this.stockInfo[index].valueCustom)) {
            this.$Message.warning("规格名称不能重复！")
          } else {
            this.stockInfo[index].valueConfirm = this.stockInfo[index].valueCustom
          }
        } else if (this.stockInfo[index].value != "自定义" && this.stockInfo[index].value != "") {
          if (valueArr.includes(this.stockInfo[index].value)) {
            this.$Message.warning("规格名称不能重复！")
          } else {
            this.stockInfo[index].valueConfirm = this.stockInfo[index].value
          }
        } else {
          this.$Message.warning("请输入规格名称！")
        }
      },
      addSpecAttach(index) {
        if (this.stockInfo[index].valueConfirm != '') {
          if (this.specAttach != '') {
            this.stockInfo[index].attach.push(this.specAttach)
            this.specAttach = '';
          } else {
            this.$Message.warning("请输入规格数值！")
          }
        } else {
          this.$Message.warning("请先添加规格名称！")
        }
      },
      deleteSpec(index) {
        this.stockInfo.splice(index, 1)
      },
      deleteSpecAttach(index, attachIndex) {
        this.stockInfo[index].attach.splice(attachIndex, 1)
      },
      /*返回组合的数组*/
      doExchange(arr){
        var len = arr.length;
        // 当数组大于等于2个的时候
        if (len >= 2) {
          // 第一个数组的长度
          var len1 = arr[0].length;
          // 第二个数组的长度
          var len2 = arr[1].length;
          // 2个数组产生的组合数
          var lenBoth = len1 * len2;
          //  申明一个新数组
          var items = new Array(lenBoth);
          // 申明新数组的索引
          var index = 0;
          for (var i = 0; i < len1; i++) {
            for (var j = 0; j < len2; j++) {
              if (arr[0][i] instanceof Array) {
                items[index] = arr[0][i].concat(arr[1][j]);
              } else {
                items[index] = [arr[0][i]].concat(arr[1][j]);
              }
              index++;
            }
          }
          var newArr = new Array(len - 1);
          for (var i = 2; i < arr.length; i++) {
            newArr[i - 1] = arr[i];
          }
          newArr[0] = items;
          return this.doExchange(newArr);
        } else {
          return arr[0];
        }
      },
      specGet (value, option) {
        return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
      },
      getImgList(target){
        if (target[0] == 'goodsPic') {
          this.goodsPicForm = target[1][0].name;
        } else if (target[0] == 'goodsImgs') {
          this.goodsImgsForm=[]
          for (var i in target[1]) {
            this.goodsImgsForm.push(target[1][i].name)
          }
        } else if (target[0] == 'specInfo' && target[2] != 'notUse') {
          this.finalStock[target[2]].img = target[1][0].name;
          this.finalStock[target[2]].newImg = [{"name": target[1][0].name, "url": target[1][0].name}];
        }
      },
      handleImageAdded: function (file, Editor, cursorLocation) {

        var formData = new FormData();
        formData.append('image', file)

        this.$ajax({
          url: 'https://staticfiles.xiaochengyun.cn/pic/uploadimages',
          method: 'POST',
          data: formData
        })
          .then((result) => {
          let url = result.data.data // Get url from response
          Editor.insertEmbed(cursorLocation, 'image', url);
        })
        .catch((err) => {
          console.log(err);
        })
      },
      newGoods(){
        if (this.goodsClasses.length == 0) {
          this.$Message.error('请先添加商品分类!');
          this.$layer.confirm('去添加商品分类?', function () {
              this.$router.push({path: '/3-1&product_sort'})
              this.$layer.closeAll()
            }.bind(this)
          );
        }
        if (this.goodsOrderForm == '') {
          this.$Message.error('请输入商品序号!');
          return false;
        }
        if (!/^[0-9]*$/.test(this.goodsOrderForm)) {
          this.$Message.error('商品序号必须为数字!');
          return false;
        }
        if(this.goodsNameForm.trim()==''){
          this.$Message.error('请输入商品名称!');
          return false;
        }
        if (this.goodsClassIdForm.trim() == '') {
          this.$Message.error('请选择商品分类!');
          return false;
        }
        if (this.goodsDescribeForm.trim() == '') {
          this.$Message.error('请输入商品描述!');
          return false;
        }
        if(this.goodsPicForm == ''){
          this.$Message.error('请上传展示图!');
          return false;
        }
        if(this.goodsImgsForm.length==0){
          this.$Message.error('请上传商品轮播图!');
          return false;
        }
        if (this.htmlForEditor.trim() == '') {
          this.$Message.error('请填写商品详情信息!');
          return false;
        }
        let isVipGoods;
        if (this.vipRightForm == true) {
          isVipGoods = 1;
        } else {
          isVipGoods = 0;
        }
        this.$ajax.post("/server/updateGoods", {
          goodsId:this.Lockr.get("goodsId"),
          goodsOrder: this.goodsOrderForm,
          goodsName: this.goodsNameForm,
          goodsClassId: this.goodsClassIdForm,
          goodsDescribe: this.goodsDescribeForm,
          isVipGoods: isVipGoods,
          goodsPic: this.goodsPicForm,
          goodsImgs: this.goodsImgsForm,
          goodsDes: this.htmlForEditor,
          stockInfo: JSON.stringify(this.stockInfo),
          finalStock: this.finalStock
        }).then(function (res) {
          console.log(res.data)
          if (res.data.error == '0') {
            this.$Message.success('修改成功!');
            this.$router.push({path:'/3-2&product_list'})
          } else if (res.data.error == '1') {
            this.$Message.warning('商品名重复!');
          } else if (res.data.error == '3') {
            this.$Message.error('服务器不稳定!');
          }
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      backToList(){
        this.$router.push({path:'/3-2&product_list'})
        this.Lockr.rm("goodsId")
      }
    },
    mounted () {

    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    }
  }
</script>
