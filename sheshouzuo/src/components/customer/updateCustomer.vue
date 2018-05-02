<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <Col :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
      <TabPane label="编辑客户" name="name1">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
          <FormItem label="公司名称" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入公司名称"></Input>
          </FormItem>
          <FormItem label="公司简介" prop="description">
            <Input v-model="formValidate.description" placeholder="请输入公司简介"></Input>
          </FormItem>
          <FormItem label="公司地址" prop="address">
            <Input v-model="formValidate.address" placeholder="请输入公司地址"></Input>
          </FormItem>
          <FormItem label="负责人" prop="leaderName">
            <Input v-model="formValidate.leaderName" placeholder="请输入负责人姓名"></Input>
          </FormItem>
          <FormItem label="负责人邮箱" prop="email">
            <Input v-model="formValidate.email" placeholder="请输入负责人邮箱"></Input>
          </FormItem>
          <FormItem label="负责人手机号" prop="phone">
            <Input v-model="formValidate.phone" placeholder="请输入负责人手机号"></Input>
          </FormItem>
          <FormItem label="公司logo" prop="logo" v-if="goodsPicList!=''">
            <image-upload :defaultList="goodsPicList" :target="'goodsPic'" :num="1" :index="'notUse'"
                          @getImgList="getImgList" :width="200" :height="200"></image-upload>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')" style="margin-top: 20px">提交</Button>
            <!--<Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>-->
          </FormItem>
        </Form>
      </TabPane>
    </Tabs>
    </Col>
  </Row>
  </Col>
</template>
<script>
  import { VueEditor } from 'vue2-editor'
  import imageUpload from '@/components/imageUpload'
  export default {
    data () {
      return {
        animated:false,
        goodsPicList: [],
        formValidate:{
          name:'',
          description:'',
          address:'',
          leaderName:'',
          email:'',
          phone:'',
          logoForm: '',
        },
        ruleValidate: {
          name: [
            { required: true, message: '请输入公司名称', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入公司简介', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入公司地址', trigger: 'blur' }
          ],
          leaderName: [
            { required: true, message: '请输入负责人姓名', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入负责人邮箱', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入负责人手机号', trigger: 'blur' },
            { type: 'string', min: 11,max: 12, message: '请填写正确的手机号', trigger: 'blur' }
          ],
        }
      }
    },
    components: {
      VueEditor,
      imageUpload
    },

    created () {
      this.getData()
    },
    methods: {
      getImgList(target){
        if (target[0] == 'goodsPic') {
          this.formValidate.logoForm = target[1][0].name;
        }
      },
      getData(){
        let id = this.$route.params.id;
        this.$ajax.get("/customer/updateCustomer/"+id).then(function (res) {
          console.log(res.data.data)
          let data=res.data.data
          this.formValidate.name= data.name;
          this.formValidate.description= data.description;
          this.formValidate.address= data.address;
          this.formValidate.leaderName= data.leaderName;
          this.formValidate.email= data.email;
          this.formValidate.phone= data.phone;
          this.formValidate.logoForm = data.logo;
          this.goodsPicList = [{
            name:data.logo,
            url:data.logo,
          }];
        }.bind(this)).catch(function (err) {
          console.log("error")
        });
      },
      //提交表单
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            var that=this;
            if ((!(/^((0\d{2,3})-?)(\d{7,8})(-(\d{3,}))?$/.test(this.formValidate.phone)))&&(!(/^1[3,4,5,7,8]\d{9}$/.test(this.formValidate.phone)))) {
              this.$Message.error('请填写正确的手机号');
              return false;
            }
            if (!(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.formValidate.email))) {
              this.$Message.error('请填写正确的邮箱地址');
              return false;
            }

            if(this.formValidate.logoForm==''){
              this.$Message.error('请上传微信二维码');
              return false;
            }
            var obj={
              name: this.formValidate.name,
              description: this.formValidate.description,
              address: this.formValidate.address,
              leaderName:this.formValidate.leaderName,
              email:this.formValidate.email ,
              phone: this.formValidate.phone,
              logo: this.formValidate.logoForm,
            }
            let id = this.$route.params.id;
            this.$ajax.post("/customer/updateCustomer_ajax/"+id, obj).then(function (res) {
              if(res.data.error=='0'){
                that.$Message.success('编辑成功!');
                setTimeout(function () {
                  location.href='#/customer'
                },300)
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

    },
  }
</script>
