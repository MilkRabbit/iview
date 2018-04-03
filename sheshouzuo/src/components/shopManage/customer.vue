<template>
  <i-col :xs="18">
    <Row type="flex">
      <i-col span="22" offset="1">
        <h2 style="margin:20px 0 ">客服消息设置</h2>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
          <FormItem label="设置客服问候语" prop="title">
            <Input v-model="formValidate.customer" placeholder="请输入问候语"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
          </FormItem>
        </Form>
      </i-col>
    </Row>
  </i-col>
</template>
<script>
  import axios from 'axios';
  axios.defaults.baseURL = 'https://staticfiles.xiaochengyun.cn/adminapi';
  export default {
    data () {
      return {
        formValidate: {
          customer: '',
        },
        ruleValidate: {
          customer: [
            { required: true, message: '消息语不能为空', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      //提交表单
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            axios.post("/shopInfo/customer", {
              customer: this.formValidate.customer,
            }).then(function (res) {
//              console.log(res.data)
            })
              .catch(function (err) {
                console.log(err);
              })
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      }
    },
    created () {
      var that = this
      axios.get("/shopInfo/customer").then(function (res) {
        var customer=res.data.data[0].customerGreeting
        that.formValidate.customer=customer
      })
        .catch(function (err) {
          console.log(err);
        })
    },
  }
</script>
