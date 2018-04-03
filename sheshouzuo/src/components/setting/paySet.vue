<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <i-col :lg="21">
  <Row type="flex">
    <i-col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
      <TabPane label="支付设置" name="name1">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="微信支付">
            <span>目前小程序只支持微信自有支付，你可以在「小程序后台-微信支付」页面下申请开通并完成相关配置
小程序的主体必须为企业，才可以申请微信支付；如果你的小程序不是企业主体，请另注册一个，重新授权给小橙云
完成设置后，请在本页填写你的商户号和商户密钥</span>
          </FormItem>
          <FormItem label="商户号" prop="mchId">
            <Input v-model="formValidate.mchId" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="商户密钥" prop="wxPayKey">
            <Input v-model="formValidate.wxPayKey" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="上传证书" prop="certFile">
            <Upload action="https://staticfiles.xiaochengyun.cn/pic/uploadcertificate">
              <Button type="ghost" icon="ios-cloud-upload-outline">上传证书</Button>
            </Upload>
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
  import axios from 'axios'
  axios.defaults.baseURL = 'https://staticfiles.xiaochengyun.cn/adminapi';
  export default {
    data () {
      return {
        animated:false,
        formValidate: {
          mchId: '',
          wxPayKey: '',
          certFile: '',
        },
        ruleValidate: {
          mchId: [
            {required: true, message: '商户号不能为空', trigger: 'blur'}
          ],
          wxPayKey: [
            {required: true, message: '商户密钥不能为空', trigger: 'blur'}
          ],
          certFile: [
            {required: true, message: '证书不能为空', trigger: 'blur',type:'file'}
          ],
        },
        data: [],
        pageTotal: 0,
        goodsClasses: [],
        defaultList: [],
        imgName: '',
        visible: false,
        uploadList: [],
        loading:false
      }
    },
    created () {
      this.loading = true;
      this.fetchData()
    },
    methods: {
      fetchData(){
        let that = this;
        axios.get("/setting/pay").then(function (res) {
          console.log(res.data.shopinfo)
          that.formValidate.mchId = res.data.shopinfo.mchId
          that.formValidate.wxPayKey = res.data.shopinfo.wxPayKey
          that.formValidate.certFile = res.data.shopinfo.certFile
        }).catch(function (err) {
          console.log("error")
        });
      },
      handleSubmit (name) {
        this.current = 1;
        let that = this;
        axios.post("/setting/pay", {
          mchId :that.formValidate.mchId,
          wxPayKey:that.formValidate.wxPayKey,
          certFile:that.formValidate.certFile
        }).then(function (res) {
          if (res.data.error == '0') {
            that.$Message.success('设置成功!');
          }else {
            that.$Message.error('服务器不稳定!');
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
    }
  }
</script>
