<style lang="less">
  @import "~less/public.less";
</style>
<style scoped>
  .onekill-upload-list{
    display: inline-block;
    width: 300px;
    height: 150px;
    text-align: center;
    line-height: 150px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .onekill-upload-list img{
    width: 100%;
    height: 100%;
  }
  .onekill-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .onekill-upload-list:hover .onekill-upload-list-cover{
    display: block;
  }
  .onekill-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
  .ql-toolbar.ql-snow+.ql-container.ql-snow{
    min-height: 300px;
  }
  .reward .ivu-form-item .ivu-form-item-label{
    font-size: 14px;
    text-align: left;
  }

  .bBg{
    background: #38c6fb;
    border-radius: 10px;
    color:#fff;
  }
</style>
<template>
  <i-col :xs="18">
    <Row type="flex">
      <i-col span="22" offset="1">
        <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
          <TabPane label="一元购" name="name1">

            <div v-if="isVip=='0'">
              <Row type="flex">
                <Col span="8">
                <Card class="bBg" style="text-align: center">
                  <p slot="title" style="color: #fff">提示</p>
                  <p>设置会员页需先开启会员功能</p>
                </Card>
                </Col>
              </Row>
            </div>
            <div v-if="isVip=='1'">
              <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <FormItem label="一元购标题" prop="title">
                  <Input v-model="formValidate.title" placeholder="请输入一元购标题"></Input>
                </FormItem>
                <FormItem label="一元购封面" prop="cover">
                  <div class="onekill-upload-list" v-for="item in uploadList">
                    <template v-if="item.status === 'finished'">
                      <img :src="item.url">
                      <div class="onekill-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                      </div>
                    </template>
                    <template v-else>
                      <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template>
                  </div>
                  <Upload
                    ref="upload"
                    :show-upload-list="false"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="1024"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    action="https://staticfiles.xiaochengyun.cn/pic/apiuploadimages"
                    style="display: inline-block;width:58px;">
                    <div style="width: 300px;height:150px;line-height: 150px;border: 1px dotted #aaa;text-align: center;float: left;" class="onekillcovers">
                      <Icon type="camera" size="20"></Icon>
                    </div>
                  </Upload>
                  <Modal title="查看图片" v-model="visible">
                    <img :src=imgName v-if="visible" style="width: 100%">
                  </Modal>
                  <p><span style="color: red">*</span>会员页顶部图的尺寸为375*175;图片大小请控制在1M左右。</p>
                </FormItem>
                <FormItem label="一元购内容">
                  <vue-editor id="editor"
                              useCustomImageHandler
                              @imageAdded="handleImageAdded" v-model="htmlForEditor">
                  </vue-editor>
                </FormItem>

                <FormItem label="商品价格" prop="price">
                  <Input v-model="formValidate.price" placeholder="请输入商品价格"></Input>
                </FormItem>
                <FormItem label="已选商品" prop="selectServer" v-model="modal1" v-if="modal1==true">
                  <div>
                    <p v-for="item in selectServer" :value="item._id" :key="item._id" style="font-size: 15px;background: #eee;border-bottom: 1px solid #fff">{{ item.goodsName }}</p>
                    <Button type="info" @click="modal7 = true;modal1=false">修改一元购关联服务</Button>
                  </div>

                </FormItem>
                <FormItem v-model="modal7">
                  <div v-if="modal7==true">
                    <label>商品列表</label>
                    <Transfer
                      :data="data2"
                      :target-keys="targetKeys2"
                      filterable
                      :filter-method="filterMethod"
                      @on-change="handleChange2"></Transfer>
                  </div>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                </FormItem>
              </Form>
            </div>
          </TabPane>
        </Tabs>
      </i-col>
    </Row>
  </i-col>
</template>
<script>
  import { VueEditor } from 'vue2-editor'
  export default {
    data () {
      return {
        isVip:'0',
        animated:false,
        modal1:true,
        modal7: false,
        selectServer:[],
        imgName: '',
        visible: false,
        uploadList: [],
        htmlForEditor: '',
        data2: this.getMockData(),
        targetKeys2: this.getTargetKeys(),
        listStyle: {
          width: '250px',
          height: '300px'
        },
        formValidate: {
          title: '',
          cover:'',
          selectServer:[],

        },
        ruleValidate: {
          title: [
            { required: true, message: '一元购标题不能为空', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '商品价格不能为空' }
          ],
        }
      }
    },
    components: {
      VueEditor
    },
    methods: {
      //提交表单
      handleSubmit:function(t){var e=this;this.$refs[t].validate(function(t){if(t){var n=e,i=[];if(""==n.formValidate.price)return e.$Message.error("商品价格不能为空"),!1;if(1==n.modal7){if(i=n.targetKeys2,0==n.targetKeys2.length)return e.$Message.error("请选择相关服务"),!1}else for(var l=0;l<n.selectServer.length;l++)i.push(n.selectServer[l].goodsId);
      var obj={title:n.formValidate.title,cover:n.formValidate.cover,price:n.formValidate.price,content:n.htmlForEditor,goodsInfo:i}
      console.log(obj)
      e.$ajax.post("/vip/onekill_ajax",{title:n.formValidate.title,cover:n.formValidate.cover,price:n.formValidate.price,content:n.htmlForEditor,goodsInfo:i}).then(function(t){"0"==t.data.error?(n.$Message.success("一元购设置成功!")):"3"==t.data.error&&n.$Message.error("服务器不稳定")}).catch(function(t){console.log(t)})}else e.$Message.error("表单验证失败!")})},
      //上传图片
      handleView(name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove(file) {
        // 从 upload 实例删除数据
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        $(".onekillcovers").show()
      },
      handleSuccess(res, file) {
        // 因为上传过程为实例，这里模拟添加 url
        file.url = res.data;
        file.name = res.data;
        $(".onekillcovers").hide();
        this.formValidate.cover = res.data;
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        });
      },
      //富文本
      handleImageAdded: function (file, Editor, cursorLocation) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)

        var formData = new FormData();
        formData.append('image', file)

        this.$ajax({
          url: 'https://staticfiles.xiaochengyun.cn/pic/apiuploadimages',
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
      //穿梭框
      getMockData () {
        let mockData = [];
        this.$ajax.get("/special/getProduct",{
        }).then((result) => {
          var items=result.data.data
          for (let i = 0; i <items.length; i++) {
            mockData.push({
              key: items[i].goodsId,
              label: items[i].goodsName,
            });
          }
        })
          .catch((err) => {
            console.log(err);
          })
        return mockData;
      },
      getTargetKeys () {
        return this.getMockData().filter(() => Math.random() * 2 > 1)
          .map(item => item.label);
      },
      handleChange2 (newTargetKeys) {
        this.targetKeys2 = newTargetKeys;
      },
      filterMethod (data, query) {
        return data.label.indexOf(query) > -1;
      },
      getData(){
        let that = this;
        this.$ajax.get("/vip/onekill").then(function(n){
          console.log(n.data)
          that.selectServer=n.data.goodsInfo,that.selectServer.length>0&&(that.modal1=!0,that.modal7=!1),that.formValidate.title=n.data.data.title,that.formValidate.price=n.data.data.price;var i=[],l=n.data.data.cover;that.formValidate.cover=l,i.push({url:l,name:l,status:"finished"}),$(".onekillcovers").hide(),that.uploadList=i,that.$refs.upload.fileList=i,that.htmlForEditor=n.data.data.content}).catch(function(t){console.log(t)})

        this.$ajax.get("/vip/isVip").then(function(t){that.isVip=t.data.isVip}).catch(function(t){console.log("error")})

      }
    },
    mounted(){
      var t=this;setTimeout(function(){t.uploadList=t.$refs.upload.fileList},300)
    },
    created(){

      this.getData()
      this.getMockData()
    }

  }
</script>
