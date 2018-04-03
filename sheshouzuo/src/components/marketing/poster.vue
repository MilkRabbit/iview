<style scoped>
  .demo-tabs-style1 {
    width: 100%;
  }
  .demo-tabs-style1 .ivu-tabs-tab {
    margin-top:10px;margin-bottom:10px;
  }
  .posterformat{
    height: 400px;
  }
  .posterformat img{
    min-width: 160px;
    width: 80%;
    display: block;
  }
  .demo-upload-list{
    display: inline-block;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .poster-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }

  .preview {
    width: 465px;
    height: 730px;
    position: absolute;
    right: 20px;
    top: 80px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 6px #bbb;
    overflow: hidden;
  }
  .previewBox {
    display: none;
    width: 100%;
    height: 100%;
    position: relative;
    top: 0;
    left: 0;
  }
  .color{
    height: 200px;
  }
</style>
<template>
  <i-col :xs="18" :lg="21" style="background: #fff">
    <Row type="flex" justify="center" align="top">
      <i-col span="22" offset="1">
        <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
          <TabPane label="新建海报" name="name1">
            <div class="new">
              <div style="margin-bottom: 10px;margin-right: 50px">
                <router-link to="/myActivity"><Button type="info">海报列表</Button></router-link>
              </div>
              <i-col span="12">
                <Form ref="haibao" :model="haibao" :rules="haibaoRuleValidate" :label-width="120" style="margin-bottom: 50px">
                  <FormItem label="选择海报版式" prop="format" class="posterformat">
                    <div v-on:change='selectformat'>
                      <RadioGroup v-model="haibao.format" vertical>
                        <i-col span="12">
                          <Radio label="format1">
                            <span>版式1</span>
                            <img src="../../../static/images/posterOne.png">
                          </Radio>
                        </i-col>
                        <i-col span="12">
                          <Radio label="format2">
                            <span>版式2</span>
                            <img src="../../../static/images/postertwo.png">
                          </Radio>
                        </i-col>
                      </RadioGroup>
                    </div>
                  </FormItem>
                  <FormItem label="店铺logo" prop="shoplogo">
                    <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
                      <template v-if="item.status === 'finished'">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                      </template>
                      <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                      </template>
                    </div>
                    <Upload
                      ref="uploadlogo"
                      :show-upload-list="false"
                      :on-success="handleSuccess"
                      :format="['jpg','jpeg','png']"
                      :max-size="500"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      action="https://staticfiles.xiaochengyun.cn/pic/adminapiuploadimages"
                      style="display: inline-block;width:100px;">
                      <div style="width: 100px;height:100px;line-height: 100px;border: 1px dotted #aaa;text-align: center;float: left;" class="shoplogo">
                        <Icon type="camera" size="20"></Icon>
                      </div>
                    </Upload>
                    <Modal title="查看图片" v-model="visible">
                      <img :src=imgName v-if="visible" style="width: 100%">
                    </Modal>
                    <input type="hidden" v-model="haibao.shoplogo">
                  </FormItem>
                  <FormItem label="店铺展示图" prop="shopimg">
                    <div class="poster-upload-list"  style="width: 280px;height: 280px;line-height: 280px" v-for="(item, index) in uploadList1" :key="index">
                      <template v-if="item.status === 'finished'">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView1(item.name)"></Icon>
                          <Icon type="ios-trash-outline" @click.native="handleRemove1(item)"></Icon>
                        </div>
                      </template>
                      <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                      </template>
                    </div>
                    <Upload
                      ref="uploadimg"
                      :show-upload-list="false"
                      :on-success="handleSuccess1"
                      :format="['jpg','jpeg','png']"
                      :max-size="1024"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      action="https://staticfiles.xiaochengyun.cn/pic/adminapiuploadimages"
                      style="display: inline-block;width:280px;">
                      <div style="width: 280px;height:280px;line-height: 280px;border: 1px dotted #aaa;text-align: center;float: left;" class="shopimg">
                        <Icon type="camera" size="20"></Icon>
                      </div>
                    </Upload>
                    <Modal title="查看图片" v-model="visible1">
                      <img :src=imgName1 v-if="visible1" style="width: 100%">
                    </Modal>
                    <input type="hidden" v-model="haibao.shopimg">
                  </FormItem>
                  <FormItem label="店铺介绍" prop="desc">
                    <Input v-model="haibao.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."  v-on:input ="description"></Input>
                  </FormItem>
                  <FormItem label="字体颜色" prop="fontcolor" class="color">
                    <ColorPicker v-model="haibao.fontcolor" v-on:input ="color"/>
                  </FormItem>
                  <FormItem>
                    <Button type="primary" @click="posterSubmit('haibao')">提交</Button>
                    <Button type="ghost" @click="handleReset('haibao')" style="margin-left: 8px">重置</Button>
                  </FormItem>
                </Form>
              </i-col>
              <i-col span="12">
                <div class="preview" id="preview">
                  <div class="previewBox">
                    <img src="" alt="" class="showPic posterBg">
                    <div style="display:none">
                      <img src="" alt="" class="showPic targetImg shopLogo"/>
                    </div>
                    <img src="" alt="" class="showPic targetImg shopPicture" style="display:none">
                    <p class="shopIntro"></p>
                    <img src="../../../static/images/mengocode.jpg" id="pcode">
                    <img src="../../../static/images/posterUser.jpg" id="userphoto">
                    <span class="iam">我是</span><span id="name">小橙云</span>
                    <p class="shopname">我为<span class="shopName"></span>代言</p>
                    <img src="../../../static/images/support.png" alt="" id="support" >
                  </div>
                </div>
                <input type="hidden" class="showcanvas" >
              </i-col>
            </div>
          </TabPane>
        </Tabs>
      </i-col>
    </Row>
  </i-col>
</template>

<script>
  export default {
    data () {
      return {
        animated:false,
        imgName: '',
        visible: false,
        uploadList: [],
        imgName1: '',
        visible1: false,
        uploadList1: [],
        haibao:{
          format:'',
          shoplogo:'',
          shopimg:'',
          desc:'',
          fontcolor:''
        },
        haibaoRuleValidate: {
          desc: [
            { required: true, message: '请输入店铺介绍', trigger: 'blur' },
            { type: 'string', min: 10, message: '介绍不能少于10字', trigger: 'blur' }
          ]
        },
      }
    },
    methods:{
      posterSubmit(name) {
        var pcode,codewidth,namepos,namecolor,namesize,userpos;
        pcode=$("#pcode").position()
        codewidth=$("#pcode").width()
        namepos=$("#name").position()
        userpos=$("#userphoto").position()
        namecolor=$("#name").css("color")
        namesize=$("#name").css("font-size")
        $("#pcode,#name,#userphoto").css("display","none")
        $("#support").css("display","")
        let that = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            var targetDom = $("#preview");
            var copyDom = targetDom.clone();
            copyDom.width(targetDom.width() + "px");
            copyDom.height(targetDom.height() + "px");
            copyDom.css({'position': 'fixed', 'top': '56px', 'z-index': '-1111'})
            $('.new').append(copyDom);
            html2canvas(copyDom, {
              allowTaint: true,
              taintTest: false,
              onrendered: function (canvas) {
                //导出base64格式的图片数据
                $('.showcanvas').val( canvas.toDataURL("image/png"));
                var imgData=$(".showcanvas").val()
                console.log(canvas.toDataURL("image/png"))
                that.$ajax.post("/marketing/poster", {
                  imgData:imgData,
                  shopLogo:that.haibao.shoplogo,
                  shopPicture:that.haibao.shopimg,
                  pcode:pcode,
                  codewidth:codewidth,
                  namepos:namepos,
                  namecolor:namecolor,
                  userpos:userpos
                }).then(function (res) {
                  if (res.data.error == '0') {
                    that.$Message.success('海报生成成功!');
                    that.posterData.push(res.data.data);
                    that.haibao.format=''
                    that.haibao.shoplogo=''
                    that.haibao.shopimg=''
                    that.haibao.desc=''
                    that.haibao.fontcolor=''
                    $(".previewBox .showPic").attr("src","").css("display","none")
                    $(".previewBox div").css("display","none")
                    $(".previewBox .shopIntro").html("")
                    $(".previewBox span,.shopname,#userphoto,.pcode").css("display","none")
                    $("#support").css("display","none")
                    $(".previewBox").css({"background":"#fff","diaplay":"none"})
                  } else if (res.data.error == '3') {
                    that.$Message.error('服务器不稳定!');
                  }
                }).catch(function (err) {
                  console.log(err)
                })
              }
            });
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },

      handleReset(name) {
        this.$refs[name].resetFields();
      },

      //上传logo和展示图
      handleView (name) {
        this.imgName = name;
        this.visible = true;
      },
      handleView1 (name) {
        this.imgName1 = name;
        this.visible1 = true;
      },
      handleRemove (file) {
        // 从 upload 实例删除数据
        const fileList = this.$refs.uploadlogo.fileList;
        this.$refs.uploadlogo.fileList.splice(fileList.indexOf(file), 1);
        $(".shoplogo").show()
        $("#name").show()
        $('.shopLogo').attr('src','')
      },
      handleRemove1 (file) {
        // 从 upload 实例删除数据
        const fileList = this.$refs.uploadimg.fileList;
        this.$refs.uploadimg.fileList.splice(fileList.indexOf(file), 1);
        $(".shopimg").show()
        $('.shopPicture').show().attr('src','')
      },
      handleSuccess (res, file) {
        // 因为上传过程为实例，这里模拟添加 url
        file.url = res.data;
        file.name = res.data;
        $(".shoplogo").hide();
        this.haibao.shoplogo=res.data;
        $(".iam,#pcode,#name,.shopname,#userphoto,#support").css("display","")
        if(this.haibao.format=='format1'){
          $('.posterBg').attr('src','./static/images/posterBg1.png')
        }else if(this.haibao.format=='format2'){
          $('.posterBg').attr('src','./static/images/posterBg2.png')
        }
        $('.shopLogo').parent().show()
        $('.shopLogo').attr('src',res.data)
        var width=$(".shopname").width()
        $(".shopname").css("margin-left","-"+width/2+"px")
//       this. DownLoadReportIMG(res.data)
      },
      handleSuccess1 (res, file) {
        // 因为上传过程为实例，这里模拟添加 url
        file.url = res.data;
        file.name = res.data;
        $(".shopimg").hide();
        this.haibao.shopimg=res.data;

        $('.shopPicture').show().attr('src',res.data)
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        });
      },
      //预览海报
      selectformat(e){
        if(this.haibao.format=='format1'){
          $('.previewStyle').attr('href','./static/css/posterStyle0.css');
          $('.posterBg').attr('src',"./static/images/posterOne.png")
        }else if(this.haibao.format=='format2'){
          $('.previewStyle').attr('href','./static/css/posterStyle1.css');
          $('.posterBg').attr('src',"./static/images/postertwo.png")
        }
        $('.previewBox').show()
        $(".iam,#pcode,#name,.shopname,#userphoto,#support").css("display","none")
      },
      description(){
        $('.shopIntro').html(this.haibao.desc)
      },
      color(){
        $('.shopIntro').css('color',this.haibao.fontcolor)
      },
      fatchData(){
        this.$ajax.get("/marketing/poster").then(function (res) {
          $('.shopName').html(res.data.data)
        })
          .catch(function(err){
            console.log(err);
          })
      }
    },
    mounted(){
      this.uploadList = this.$refs.uploadlogo.fileList;
      this.uploadList1 = this.$refs.uploadimg.fileList;
    },
    created: function () {
      this.fatchData()
    }

  }
</script>
