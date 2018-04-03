<template>
  <i-col :xs="18">
    <Row type="flex">
      <i-col span="22" offset="1">
        <h3 style="margin:20px 0 ">积分功能设置</h3>
        <Form ref="formValidate"  :label-width="120">
          <FormItem label="是否开启积分功能" prop="isIntegration">
            <div v-on:change='selectintegrate'>
              <RadioGroup v-model="isIntegration" vertical>
                <i-col span="12">
                  <Radio label="1">
                    <span>是</span>
                  </Radio>
                </i-col>
                <i-col span="12">
                  <Radio label="0">
                    <span>否</span>
                  </Radio>
                </i-col>
              </RadioGroup>
            </div>
          </FormItem>
          <FormItem label="设置积分" prop="integration" class="integration" style="display: none">
            1元 = <Input v-model="integration" placeholder="请输入积分" style="width: 20%"></Input> 积分
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
  import axios from 'axios'
  axios.defaults.baseURL = 'https://staticfiles.xiaochengyun.cn/adminapi';
  export default {
    data () {
      return {
        isIntegration: '',
        integration:''
      }
    },
    methods: {
      //提交表单
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            axios.post("/shopInfo/integration", {
              isIntegration: parseInt(this.isIntegration),
              integration: parseInt(this.integration),
            }).then(function (res) {
              console.log(res.data)
            })
              .catch(function (err) {
                console.log(err);
              })
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      selectintegrate(){
        console.log(this.isIntegration)
        if(this.isIntegration==1){
          $('.integration').show()
        }else {
          $('.integration').hide()
        }
      }
    },
    created () {
      var that = this
      axios.get("/shopInfo/integration").then(function (res) {
        var integration=res.data.data[0]
        that.isIntegration=integration.isIntegration
        that.integration=integration.integrationNum
        if(that.isIntegration==1){
          $('.integration').show()
        }else {
          $('.integration').hide()
        }
      })
        .catch(function (err) {
          console.log(err);
        })
    },
  }
</script>
