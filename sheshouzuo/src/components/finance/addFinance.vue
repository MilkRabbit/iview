<style>

</style>

<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
      <FormItem label="项目名称" prop="itemName" style="margin-bottom: 30px">
        <Input v-model="formValidate.itemName" placeholder="请输入项目名称"  @on-blur="searchUser"></Input>
      </FormItem>
      <FormItem label="学生姓名" prop="itemTypeId">
        <Select v-model="formValidate.studentId" style="width: 400px;margin-right: 10px">
          <Option v-for="(item,index) in student" :value="item._id" :key="index">
            {{ item.studentName }}
          </Option>
        </Select>
      </FormItem>
      <FormItem label="学生转账价格" prop="studentPrice">
        <Input v-model="formValidate.studentPrice" placeholder="请输入学生转账价格"></Input>
      </FormItem>
      <FormItem label="客户转账截图" prop="customerImg">
        <image-upload :defaultList="customerList" :target="'customerImg'" :num="1" :index="'notUse'"
                      @getImgList="getImgList" :width="200" :height="300"></image-upload>
      </FormItem>
      <FormItem label="给学生转账截图" prop="studentImg">
        <image-upload :defaultList="studentList" :target="'studentImg'" :num="1" :index="'notUse'"
                      @getImgList="getImgList" :width="200" :height="300"></image-upload>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
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
        student:[],
        customerList: [],
        studentList: [],
        formValidate:{
          itemName:'',
          studentId:'',
          studentPrice:'',
          customerImg:'',
          studentImg:'',
        },
        ruleValidate: {
          itemName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ],
          studentPrice: [
            { required: true, message: '请输入学生转账价格', trigger: 'blur' }
          ],
        }
      }
    },
    components: {
      VueEditor,
      imageUpload
    },
    methods: {
      getImgList(target){
//        console.log(target[1])
        if (target[0] == 'customerImg') {
          this.formValidate.customerImg = target[1][0].name;
        }
        if (target[0] == 'studentImg') {
          this.formValidate.studentImg = target[1][0].name;
        }
      },

      searchUser(){
        var that=this
        var itemName=this.formValidate.itemName
        $('.adminuser').show()
        this.$ajax.get("/finance/searchUser/"+itemName).then(function (res) {
          that.student=res.data
        }).catch(function (err) {
          console.log("error")
        })
      },
      //提交表单
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            var that=this;
            if(this.formValidate.studentId==''){
              this.$Message.error('请选择学生');
              return false;
            }
            if(this.formValidate.customerImg==''){
              this.$Message.error('请上传客户转账截图');
              return false;
            }
            if(this.formValidate.studentImg==''){
              this.$Message.error('请上传转账给学生截图');
              return false;
            }
            this.$ajax.post("/finance/addFinance", this.formValidate).then(function (res) {
              if(res.data.error=='0'){
                that.$Message.success('录入成功!');
                setTimeout(function () {
                  location.reload()
                },400)
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
    },
  }
</script>
