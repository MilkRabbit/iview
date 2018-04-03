<style lang="less">
  @import "~less/public.less";
</style>
<style>
  @import "/static/css/auth.css";
</style>
<style>
  .vipIcon img{
    width: 45px;
    padding: 5px;
    margin-right: 25px;
  }
  .boxShadow{
    transform: scale(1.15);
    box-shadow: 0 0 8px #aaa;
  }
  .inputbox {
    margin: 0 8px;
    height: 28px;
    line-height: 28px;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dddee1;
    border-radius: 4px;
    color: #495060;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
  }
  .bBg{
    background: #38c6fb;
    border-radius: 10px;
    color:#fff;
  }
  .vipTop-upload-list{
    display: inline-block;
    width: 375px;
    height: 175px;
    text-align: center;
    line-height: 175px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .vipTop-upload-list img{
    width: 100%;
    height: 100%;
  }
  .vipBottom-upload-list img{
    width: 100%;
    height: 100%;
  }
  .vipTop-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .vipTop-upload-list:hover .vipTop-upload-list-cover{
    display: block;
  }
  .vipTop-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
<template>
  <i-col :xs="18" :lg="21">
    <Row type="flex">
      <i-col span="22" offset="1">
        <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
          <TabPane label="会员设置" name="name1">
            <Form ref="addMember" :model="addMember" :label-width="120">
              <FormItem label="会员功能">
                <i-switch size="large" v-model="isVip" true-value='1' false-value="0">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>
              <div v-if="isVip=='1'">
                <FormItem label="会员名称" prop="vipName">
                  <Input v-model="addMember.vipName" placeholder="请输入会员名称"></Input>
                </FormItem>
                <FormItem label="设置会员图标" prop="vipIcon" class="vipIcon">
                  <div @click="selecticon">
                    <img src="https://xiaochengyun-1251009371.cossh.myqcloud.com/15087514220530.png">
                    <img src="https://xiaochengyun-1251009371.cossh.myqcloud.com/15087514610307.png">
                    <img src="https://xiaochengyun-1251009371.cossh.myqcloud.com/15087514800280.png">
                    <img src="https://xiaochengyun-1251009371.cossh.myqcloud.com/15087514976847.png">
                    <img src="https://xiaochengyun-1251009371.cossh.myqcloud.com/15087515094527.png">
                  </div>
                </FormItem>
                <FormItem label="设置会员权益" prop="vipRights">
                  <CheckboxGroup v-model="addMember.vipRights">
                    <div>
                      通用权益：<Checkbox label="0">产品包邮</Checkbox>
                    </div>
                    <div>
                      折扣权益：<Checkbox label="1">所有商品享受会员价</Checkbox>
                    </div>
                    <div>
                      关联权益：<Checkbox label="2">可享受一元购</Checkbox>
                    </div>
                  </CheckboxGroup>
                </FormItem>
                <FormItem label="成为会员的要求" prop="vipRequire">
                  <CheckboxGroup v-model="addMember.vipRequire">
                    <Checkbox label="0" style="display: block">充值<input class="inputbox" v-model="addMember.recharge" />元</Checkbox>
                    <Checkbox label="1" style="display: block">分享一元购并被浏览<input class="inputbox" v-model="addMember.shareNum" />次</Checkbox>
                  </CheckboxGroup>
                </FormItem>
              </div>

              <FormItem>
                <Button type="primary" @click="vipHandleSubmit('addMember')">提交</Button>
              </FormItem>
            </Form>
          </TabPane>
          <TabPane label="会员页设置" name="name2">
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
              <Row type="flex">
                <i-col span="11">
                  <div class="preview" id="preview">
                    <div class="vipBg"></div>
                    <div class="previewBox">
                      <p class="title"></p>
                      <div class="rights">
                        <p style="font-size: 14px;margin-bottom: 8px">会员权益：</p>
                        <div class="card vipcard" v-for="(item,index) in vipRightsData" :value="item.status" :key="index">
                          <span>{{ item.status+1 }}.</span>
                          <span>{{ item.content }}</span>
                        </div>
                      </div>
                      <div class="require">
                        <p style="text-align: center"><img src="https://xiaochengyun-1251009371.cossh.myqcloud.com/15087514220530.png" style="width: 20px">如何成为会员</p>
                        <div class="card vipcard" v-for="(n,index) in vipRequireData" :value="n.type" :key="index">
                          <p v-if="n.type==0">
                            <span>{{ n.content  }}</span>
                            <span>{{ n.recharge }}元</span>
                          </p>
                          <p v-if="n.type==1">
                            <span>{{ n.content  }}</span>
                            <span>{{ n.shareNum }}次</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="vipBottom"></div>
                    <div class="payNow">立即支付</div>
                  </div>
                </i-col>
                <i-col span="11" offset="1">
                  <Form ref="vipPage" :model="vipPage" :rules="vipPageRuleValidate" :label-width="120">
                    <FormItem label="会员页顶部图" prop="backgroundImg">
                      <div class="vipTop-upload-list" v-for="(item, index) in uploadList" :key="index">
                        <template v-if="item.status === 'finished'">
                          <img :src="item.url">
                          <div class="vipTop-upload-list-cover">
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
                        :max-size="500"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        action="https://staticfiles.xiaochengyun.cn/pic/apiuploadimages"
                        style="display: inline-block;width:375px;">
                        <div style="width: 375px;height:175px;line-height: 175px;border: 1px dotted #aaa;text-align: center;float: left;" class="backgroundImg">
                          <Icon type="camera" size="20"></Icon>
                        </div>
                      </Upload>
                      <Modal title="查看图片" v-model="visible">
                        <img :src=imgName v-if="visible" style="width: 100%">
                      </Modal>
                      <p><span style="color: red">*</span>会员页顶部图的尺寸为375*175;图片大小请控制在500k左右。</p>
                    </FormItem>
                    <FormItem label="会员页标题" prop="title">
                      <Input v-model="vipPage.title" placeholder="请输入会员名称"></Input>
                    </FormItem>
                    <FormItem label="会员权益" prop="isRights">
                      <i-switch size="large" v-model="vipPage.isRights" true-value='1' false-value="0">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                      </i-switch>
                    </FormItem>
                    <FormItem label="成为会员的要求" prop="isRequire">
                      <i-switch size="large" v-model="vipPage.isRequire" true-value='1' false-value="0">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                      </i-switch>
                    </FormItem>
                    <FormItem label="会员页底部图" prop="showImg">
                      <div class="vipBottom-upload-list"  style="width: 375px;height:135px;line-height: 135px;" v-for="(item, index) in uploadList1" :key="index">
                        <template v-if="item.status === 'finished'">
                          <img :src="item.url">
                          <div class="vipTop-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView1(item.name)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove1(item)"></Icon>
                          </div>
                        </template>
                        <template v-else>
                          <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                      </div>
                      <Upload
                        ref="uploads"
                        :show-upload-list="false"
                        :on-success="handleSuccess1"
                        :format="['jpg','jpeg','png']"
                        :max-size="500"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        action="https://staticfiles.xiaochengyun.cn/pic/apiuploadimages"
                        style="display: inline-block;width:375px;">
                        <div style="width: 375px;height:135px;line-height: 135px;border: 1px dotted #aaa;text-align: center;float: left;" class="showImg">
                          <Icon type="camera" size="20"></Icon>
                        </div>
                      </Upload>
                      <Modal title="查看图片" v-model="visible1">
                        <img :src=imgName1 v-if="visible1" style="width: 100%">
                      </Modal>
                      <p><span style="color: red">*</span>会员页底部图的尺寸为375*135;图片大小请控制在500k左右。</p>
                    </FormItem>
                    <FormItem>
                      <Button type="primary" @click="vipPageSubmit('vipPage')">提交</Button>
                    </FormItem>
                  </Form>
                </i-col>
              </Row>
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

        vipRightsData:[],
        vipRequireData:[],

        isVip:'1',
        addMember: {
          vipName: '',
          vipIcon:'',
          vipRights:[],
          vipRequire:[],
          recharge:'',
          shareNum:'',
        },
        vipPage:{
          backgroundImg:'',
          title:'',
          isRights:'',
          isRequire:'',
          showImg:'',
        },
        vipPageRuleValidate:{
          title: [
            { required: true, message: '请输入会员页标题', trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      //icon
      selecticon(e) {
        var that =this
        if (e.target.tagName == 'IMG') {
          var icon = e.target
          $('.vipIcon img').removeClass('boxShadow')
          $(icon).addClass('boxShadow')
          var imgsrc = icon.src
          that.addMember.vipIcon = imgsrc
        }
      },
      vipHandleSubmit(t) {
        var e, n = this;
        if ("1" == n.isVip) {
          if ("" == n.addMember.vipName)
            return n.$Message.warning("会员名称不能为空"),
              !1;
          if ("" == n.addMember.vipIcon)
            return n.$Message.warning("未选择会员图标"),
              !1;
          if (0 == n.addMember.vipRights.length)
            return n.$Message.warning("未选择会员权益"),
              !1;
          if (0 == n.addMember.vipRequire.length)
            return n.$Message.warning("未选择会员要求"),
              !1;
          for (var i = n.addMember.vipRequire, l = 0; l < i.length; l++) {
            if ("0" == i[l] && "" == n.addMember.recharge)
              return n.$Message.warning("请填写充值金额"),
                !1;
            if ("1" == i[l] && "" == n.addMember.shareNum)
              return n.$Message.warning("请填写转发次数"),
                !1
          }
          e = {
            isVip: n.isVip,
            name: n.addMember.vipName,
            icon: n.addMember.vipIcon,
            status: n.addMember.vipRights,
            type: n.addMember.vipRequire,
            recharge: n.addMember.recharge,
            shareNum: n.addMember.shareNum
          }
        } else
          e = {isVip: n.isVip};
        this.$ajax.post("/vip/vip_ajax",e).then(function(t){
          "0"==t.data.error?n.$Message.success("会员设置成功!"):"0"==t.data.error&&n.$Message.error("数据库出错")
        })
          .catch(function(t){
            console.log(t)
          })
      },
      fetchData() {
        var e = this;
        this.$ajax.get("/vip/vip").then(function (res) {
          var i = res.data.data;
          if (0 == i.isVip) {
            e.isVip = '0'
          } else {
            e.isVip = '1'
            e.addMember.vipName = i.name
            e.addMember.vipRights = i.status
            e.addMember.vipRequire = i.type
            e.addMember.recharge = i.recharge
            e.addMember.shareNum = i.shareNum
            e.addMember.vipIcon = i.icon
            setTimeout(function () {
                for (var n = $(".vipIcon img").get(), i = 0; i < n.length; i++)
                  n[i].src == e.addMember.vipIcon && $(n[i]).addClass("boxShadow")
              }
              , 150)
            e.icon = i.icon
            e.vipRightsData = i.vip.vipRights
            e.vipRequireData = i.vip.vipRequire
          }
        })
          .catch(function (t) {
            console.log("error")
          })

        this.$ajax.get("/vip/vipPage").then(function(n){
          e.vipPage.title=n.data.title
          if(e.vipPage.title!=""){
            $("p.title").show().html(e.vipPage.title)
          }
          e.vipPage.isRights=n.data.isRights+""

          if(1==e.vipPage.isRights){
            $(".rights").show()
          }else{
            $(".rights").hide()
          }
          e.vipPage.isRequire=n.data.isRequire+""
          if(1==e.vipPage.isRequire){
            $(".require").show()
          }else{
            $(".require").hide()
          }

          e.vipPage.backgroundImg=n.data.backgroundImg;
          var i=[],l=n.data.backgroundImg;
          if(""!=n.data.backgroundImg){
            i.push({url:l,name:l,status:"finished"})
            $(".backgroundImg").hide()
            e.uploadList=i
            e.$refs.upload.fileList=i
            $(".vipBg").show().css({backgroundImage:"url("+l+")",backgroundSize:"cover",backgroundPosition:"center"})
          }

          e.vipPage.showImg=n.data.showImg
          var a=[],o=n.data.showImg;
          if(""!=n.data.showImg){
            a.push({url:o,name:o,status:"finished"})

            $(".showImg").hide()
            e.uploadList1=a
            e.$refs.uploads.fileList=a
            $(".vipBottom").show().css({backgroundImage:"url("+o+")",backgroundSize:"cover",backgroundPosition:"center"})
          }
        })
          .catch(function(t){
            console.log(t)
          })
      },
      vipPageSubmit(t){
        var e=this;
        this.$refs[t].validate(function(t){
          if(t){
            var n=e;
            if(""==n.vipPage.backgroundImg)
              return n.$Message.warning("请选择会员页顶部图")
                !1;
            if(""==n.vipPage.showImg)
              return n.$Message.warning("请选择会员页底部图")
                !1;
            e.$ajax.post("/vip/vipPage_ajax", {
                backgroundImg:n.vipPage.backgroundImg,
                title:n.vipPage.title,
                isRights:parseInt(n.vipPage.isRights),
                isRequire:n.vipPage.isRequire,
                showImg:n.vipPage.showImg
              }).then(function(t){
                if("0"==t.data.error){
                  n.$Message.success("会员页设置成功!")
                }else if("3"==t.data.error){
                  n.$Message.error("服务器不稳定!")
                }
              })
              .catch(function(t){
                console.log(t)
              })
          } else {
            e.$Message.error("表单验证失败!")
          }
        })
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
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        $(".backgroundImg").show()
      },
      handleRemove1 (file) {
        // 从 upload 实例删除数据
        const fileList = this.$refs.uploads.fileList;
        this.$refs.uploads.fileList.splice(fileList.indexOf(file), 1);
        $(".showImg").show()
      },
      handleSuccess (res, file) {
        // 因为上传过程为实例，这里模拟添加 url
        file.url = res.data;
        file.name = res.data;
        $(".backgroundImg").hide();
        this.vipPage.backgroundImg=res.data;
      },
      handleSuccess1 (res, file) {
        // 因为上传过程为实例，这里模拟添加 url
        file.url = res.data;
        file.name = res.data;
        $(".showImg").hide();
        this.vipPage.showImg=res.data;
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
    },
    created(){
      this.fetchData()
    },
    mounted(){
        this.uploadList = this.$refs.upload.fileList;
        this.uploadList1 = this.$refs.uploads.fileList;
    },
  }
</script>
