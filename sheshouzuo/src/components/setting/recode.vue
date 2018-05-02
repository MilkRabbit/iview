<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <i-col :md="19" :sm="18" :xs="22">
    <Row type="flex">
      <i-col span="22" offset="1">
        <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
          <TabPane label="修改密码" name="name1">
            <Form ref="recodeValidate" :model="recodeValidate" :label-width="100"  :rules="recodeRuleValidate">
              <FormItem label="原密码" prop="oldpass">
                <Input v-model="recodeValidate.oldpass" placeholder="请输入原密码" type="password"></Input>
              </FormItem>
              <FormItem label="新密码" prop="newpass">
                <Input v-model="recodeValidate.newpass" placeholder="请输入新密码" type="password"></Input>
              </FormItem>
              <FormItem label="确认密码" prop="repass">
                <Input v-model="recodeValidate.repass" placeholder="请再次输入新密码" type="password"></Input>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="handleSubmit('recodeValidate')">保存</Button>
              </FormItem>
            </Form>
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
        recodeValidate:{
          oldpass:'',         //原密码
          newpass:'',         //新密码
          repass:'',         //确认密码
        },
        recodeRuleValidate:{
          oldpass: [
            { required: true, message: '请输入旧密码', trigger: 'blur' }
          ],
          newpass: [
            { required: true, message: '请输入新密码', trigger: 'blur' }
          ],
          repass: [
            { required: true, message: '请确认密码', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      //提交表单
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            var that=this;
            if(that.recodeValidate.newpass==that.recodeValidate.repass){
              this.$ajax.post("/user/recode", {
                oldpass: that.recodeValidate.oldpass,
                repass: that.recodeValidate.repass,
              }).then(function (res) {
                if (res.data.error == '0') {
                  that.$Message.success('修改成功!');
                  that.$refs[name].resetFields();
                }else if (res.data.error == '10002') {
                  that.$Message.error('原密码错误');
                }else {
                  that.$Message.error('请重试')
                }
              })
                .catch(function (err) {
                  console.log(err);
                })
            }else {
              that.$Message.error('两次输入密码不一致!');
            }
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      }
    }
  }
</script>
