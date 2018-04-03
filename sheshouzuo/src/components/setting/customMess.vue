<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <i-col :lg="21">
  <Row type="flex">
    <i-col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
      <TabPane label="客服消息设置" name="name1">
        <Form :label-width="100" style="width: 60%">
          <FormItem label="设置客服问候语" prop="customMess">
            <Input v-model="customMess" placeholder="请输入"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="submit">保存设置</Button>
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
        customMess:''
      }
    },
    created () {
      this.loading = true;
      this.fetchData()
    },
    methods: {
      fetchData(){
        this.$ajax.get("/shopInfo/customer").then(function (res) {
          let data = res.data.data;
          console.log(data)
          this.customMess = data.customerGreeting
        }.bind(this)).catch(function (err) {
          console.log(err)
        });
      },
      submit(){
        this.$ajax.post("/shopInfo/customer_ajax",{
          customer:this.customMess
        }).then(function (res) {
          if(res.data.error=='0'){
            this.$Message.success('修改成功!');
          }else {
            this.$Message.error('修改失败!');
          }
        }.bind(this)).catch(function (err) {
          console.log(err)
        });
      }
    }
  }
</script>
