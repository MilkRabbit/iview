<style lang="less">
  @import "~less/public.less";
</style>
<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
      <FormItem label="项目名称" prop="itemName">
        <Input v-model="formValidate.itemName" placeholder="请输入项目名称"></Input>
      </FormItem>
      <FormItem label="项目类别" prop="itemTypeId">
          <Select v-model="formValidate.itemTypeId" style="width: 400px;margin-right: 10px">
            <Option v-for="(item,index) in itemclasses" :value="item._id" :key="index">
              {{ item.className }}
            </Option>
          </Select>
      </FormItem>
      <FormItem label="项目简介" prop="itemDescription">
        <Input v-model="formValidate.itemDescription" placeholder="请输入项目简介"></Input>
      </FormItem>
      <FormItem label="学生价格" prop="priceToStu">
        <Input v-model="formValidate.priceToStu" placeholder="请输入学生价格"></Input>
      </FormItem>
      <FormItem label="后台价格" prop="priceToAdmin">
        <Input v-model="formValidate.priceToAdmin" placeholder="请输入后台价格"></Input>
      </FormItem>
      <FormItem label="初稿截止时间" prop="draftEndTime">
        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择初稿截止时间" style="width: 200px" @on-change="formValidate.draftEndTime=$event"></DatePicker>
      </FormItem>
      <FormItem label="终稿截止时间" prop="finalEndTime">
        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择初稿截止时间" style="width: 200px" @on-change="formValidate.finalEndTime=$event"></DatePicker>
      </FormItem>
      <FormItem label="初稿文件要求" prop="draftRequest">
        <Input v-model="formValidate.draftRequest" placeholder="请输入初稿文件要求"></Input>
      </FormItem>
      <FormItem label="终稿文件要求" prop="finalRequest">
        <Input v-model="formValidate.finalRequest" placeholder="请输入终稿文件要求"></Input>
      </FormItem>
      <FormItem label="需求公司" prop="customerId">
        <Select v-model="formValidate.customerId" style="width: 400px;margin-right: 10px">
          <Option v-for="(x,index) in customers" :value="x._id" :key="index">
            {{ x.name }}
          </Option>
        </Select>
      </FormItem>
      <FormItem label="项目负责人" prop="itemLeader">
        <Input v-model="formValidate.itemLeader" placeholder="请输入项目负责人姓名"></Input>
      </FormItem>
      <FormItem label="负责人邮箱" prop="itememail">
        <Input v-model="formValidate.itememail" placeholder="请输入负责人邮箱"></Input>
      </FormItem>
      <FormItem label="负责人手机号" prop="itemphone">
        <Input v-model="formValidate.itemphone" placeholder="请输入负责人手机号"></Input>
      </FormItem>
      <FormItem label="微信二维码" prop="codeImg">
        <image-upload :defaultList="defaultList" :target="'codeImg'" :num="1" :index="'notUse'"
                      @getImgList="getImgList" :width="200" :height="200"></image-upload>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
</template>
<script>
  import { VueEditor } from 'vue2-editor'
  import imageUpload from '@/components/imageUpload'
  export default {
    data () {
      return {
        animated:false,
        defaultList: [],
        itemclasses:[],
        customers:[],
        formValidate:{
          itemName:'',
          itemTypeId:'',
          itemDescription:'',
          priceToStu:'',
          priceToAdmin:'',
          draftEndTime:'',
          finalEndTime:'',
          draftRequest:'',
          finalRequest:'',
          customerId:'',
          itemLeader:'',
          itememail:'',
          itemphone:'',
          codeImgForm: '',
        },
        ruleValidate: {
          itemName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ],
          itemTypeId: [
            { required: true, message: '请输入项目类别',  }
          ],
          itemDescription: [
            { required: true, message: '请输入项目简介', trigger: 'blur' }
          ],
          priceToStu: [
            { required: true, message: '请输入学生价格', trigger: 'blur' }
          ],
          priceToAdmin: [
            { required: true, message: '请输入后台价格', trigger: 'blur' }
          ],
          draftRequest: [
            { required: true, message: '请输入初稿文件要求', trigger: 'blur' }
          ],
          finalRequest: [
            { required: true, message: '请输入终稿文件要求', trigger: 'blur' }
          ],
          itemLeader: [
            { required: true, message: '请输入负责人姓名', trigger: 'blur' }
          ],
          itememail: [
            { required: true, message: '请输入负责人邮箱', trigger: 'blur' }
          ],
          itemphone: [
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
      this.getData();
    },
    methods: {
      getData(){
        this.$ajax.get("/demand/itemclass").then(function (res) {
        this.itemclasses=res.data.data
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
        this.$ajax.get("/demand/customer").then(function (res) {
        this.customers=res.data.data
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      getImgList(target){
          this.formValidate.codeImgForm = target[1][0].name;
      },
      //提交表单
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            var that=this;
            if(this.formValidate.itemTypeId==''){
              this.$Message.error('请选择项目类别');
              return false;
            }
            if(this.formValidate.draftEndTime==''){
              this.$Message.error('请选择初稿截止时间');
              return false;
            }
            if(this.formValidate.finalEndTime==''){
              this.$Message.error('请选择终稿截止时间');
              return false;
            }
            if(this.formValidate.customerId==''){
              this.$Message.error('请选择需求公司');
              return false;
            }
            if (!(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.formValidate.itememail))) {
              this.$Message.error('请填写正确的邮箱地址');
              return false;
            }
            if ((!(/^((0\d{2,3})-?)(\d{7,8})(-(\d{3,}))?$/.test(this.formValidate.itemphone)))&&(!(/^1[3,4,5,7,8]\d{9}$/.test(this.formValidate.itemphone)))) {
              this.$Message.error('请填写正确的手机号');
              return false;
            }
            if(this.formValidate.codeImgForm==''){
              this.$Message.error('请上传微信二维码');
              return false;
            }
            this.$ajax.post("/demand/addDemand", this.formValidate).then(function (res) {
              if(res.data.error=='0'){
                that.$Message.success('添加成功!');
                setTimeout(function () {
                  location.reload()
//                  location.href="#/demand"
                },400)

              }else if(res.data.error=='20003'){
                that.$Message.error('项目名称重复!');

              }else if(res.data.error=='3'){
                that.$Message.error('服务器不稳定!');
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
