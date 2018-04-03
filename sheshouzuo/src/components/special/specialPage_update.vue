<style lang="less">
  @import "~less/public.less";
</style>
<style scoped>
  .specialPage-upload-list{
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
  .specialPage-upload-list img{
    width: 100%;
    height: 100%;
  }
  .specialPage-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .specialPage-upload-list:hover .specialPage-upload-list-cover{
    display: block;
  }
  .specialPage-upload-list-cover i{
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
</style>
<template>
  <i-col :xs="18">
    <Row type="flex">
      <i-col span="22" offset="1">
        <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
          <TabPane label="编辑专题页" name="name1">
            <div style="margin-bottom: 10px">
              <a href="#/10-1&specialPage_list">
                <Button type="info">专题页列表</Button>
              </a>
            </div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
              <FormItem label="专题页标题" prop="title">
                <Input v-model="formValidate.title" placeholder="请输入专题页标题"></Input>
              </FormItem>
              <FormItem label="专题页封面" prop="cover">
                <div class="specialPage-upload-list" v-for="item in uploadList">
                  <template v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="specialPage-upload-list-cover">
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
                  <div style="width: 300px;height:150px;line-height: 150px;border: 1px dotted #aaa;text-align: center;float: left;" class="cover">
                    <Icon type="camera" size="20"></Icon>
                  </div>
                </Upload>
                <Modal title="查看图片" v-model="visible">
                  <img :src=imgName v-if="visible" style="width: 100%">
                </Modal>
              </FormItem>
              <FormItem label="专题页内容">
                <vue-editor id="editor"
                            useCustomImageHandler
                            @imageAdded="handleImageAdded" v-model="htmlForEditor">
                </vue-editor>
              </FormItem>
              <FormItem label="已选服务" prop="selectServer" v-model="modal1" v-if="modal1==true">
                <div>
                  <p v-for="item in selectServer" :value="item._id" :key="item._id" style="font-size: 15px;background: #eee;border-bottom: 1px solid #fff">{{ item.goodsName }}</p>
                  <Button type="info" @click="modal7 = true;modal1=false">修改专题页关联服务</Button>
                </div>

              </FormItem>
              <FormItem v-model="modal7">
                <div v-if="modal7==true">
                  <label>服务列表</label>
                  <Transfer
                    :data="data2"
                    :target-keys="targetKeys2"
                    filterable
                    :filter-method="filterMethod"
                    @on-change="handleChange2"></Transfer>
                </div>
              </FormItem>
              <FormItem label="分享奖励">
                <i-switch v-model="formValidate.isReward" true-value='1' false-value="0"></i-switch>
                <div class="reward" v-if="formValidate.isReward=='1'">
                  <FormItem label="奖励方式:" :label-width="1000">
                    <div>
                      分享给微信群，并被该群<Input v-model="formValidate.shareGroupAmount" placeholder="请输入人数" style="width: 120px"></Input>以上阅览，奖励<Input v-model="formValidate.shareGroupReward" placeholder="请输入积分数" style="width: 120px"></Input>积分
                    </div>
                    <div>
                      分享给好友，被好友阅览后，奖励<Input v-model="formValidate.shareFriendReward" placeholder="请输入积分数" style="width: 120px"></Input>积分
                    </div>
                    <div>
                      每位用户最多从该专题页分享中获取<Input v-model="formValidate.fullReward" placeholder="请输入积分数" style="width: 120px"></Input>积分
                    </div>
                  </FormItem>
                </div>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
              </FormItem>
            </Form>
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
          isReward:'0',
          shareGroupAmount:'',
          shareGroupReward:'',
          shareFriendReward:'',
          fullReward:'',
        },
        ruleValidate: {
          title: [
            { required: true, message: '专题页标题不能为空', trigger: 'blur' }
          ],
        }
      }
    },
    components: {
      VueEditor
    },
    methods: {
      //提交表单
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            var that=this;
            var goodsInfo=[];
            if(that.modal7==true){
              goodsInfo=that.targetKeys2
            }else{
              for(var i=0;i<that.selectServer.length;i++){
                goodsInfo.push(that.selectServer[i].goodsId)
              }
            }
            let id = this.$route.params.id;
            this.$ajax.post("/special/specialPage_update_ajax/"+id, {
              title: that.formValidate.title,
              cover: that.formValidate.cover,
              content:that.htmlForEditor,
              goodsInfo:goodsInfo,
              isReward: that.formValidate.isReward,
              shareGroupAmount: that.formValidate.shareGroupAmount,
              shareGroupReward: that.formValidate.shareGroupReward,
              shareFriendReward: that.formValidate.shareFriendReward,
              fullReward: that.formValidate.fullReward,
            }).then(function (res) {
              if(res.data.error=='0'){
                that.$Message.success('专题页编辑成功!');
              }else if(res.data.error=='2'){
                that.$Message.success('该标题已存在');
              }else{
                that.$Message.success('专题页编辑失败');
              }
            })
              .catch(function (err) {
                console.log(err);
              })
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      //上传图片
      handleView(name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove(file) {
        // 从 upload 实例删除数据
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        $(".cover").show()
      },
      handleSuccess(res, file) {
        // 因为上传过程为实例，这里模拟添加 url
        file.url = res.data;
        file.name = res.data;
        $(".cover").hide();
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
        let id = this.$route.params.id;
        this.$ajax.get("/special/updateSpecialPage/"+id).then(function (res) {
           that.formValidate.title=res.data.data.title
          let newList = [];
          let cover = res.data.data.cover;
          that.formValidate.cover=cover
            newList.push({
              url: cover,
              name: cover,
              status: 'finished'
            })
          $('.cover').hide()
          that.uploadList = newList;
          that.$refs.upload.fileList = newList;
          that.htmlForEditor = res.data.data.content;
           that.formValidate.isReward=res.data.data.isReward+'';
            if (that.formValidate.isReward=='1'){
               $('.reward').show()
            }
            var share=res.data.data.shareRewardInfo;
           that.formValidate.shareGroupAmount=share.shareGroup.amount
           that.formValidate.shareGroupReward=share.shareGroup.reward
           that.formValidate.shareFriendReward=share.shareFriend.reward
           that.formValidate.fullReward=share.fullReward
           that.selectServer=res.data.data.goodsInfo
        }).catch(function (err) {
          console.log("error")
        });
      }
    },
    mounted(){
      this.uploadList = this.$refs.upload.fileList;
    },
    created(){
      this.getData()
      this.getMockData()
    }

  }
</script>
