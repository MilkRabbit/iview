<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <i-col :lg="21">
    <Row type="flex">
      <i-col :lg="22" offset="1">
        <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
          <TabPane label="积分设置" name="name1">
            <Form :label-width="90" style="width: 60%">
              <FormItem label="积分功能">
                <i-switch size="large" v-model="isIntegration" true-value='1' false-value="0">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>

              <FormItem label="设置积分" prop="integrationNum" v-if="isIntegration=='1'">
                1元 = <Input v-model="integrationNum" placeholder="请输入积分" style="width: 20%"></Input> 积分
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
        isIntegration:'0',
        integrationNum:0
      }
    },
    created () {
      this.loading = true;
      this.fetchData()
    },
    methods: {
      fetchData(){
        this.$ajax.get("/shopInfo/integration").then(function (res) {
          let data = res.data.data;
          this.integration = data.isIntegration.toString()
          this.integrationNum = data.integrationNum
        }.bind(this)).catch(function (err) {
          console.log(err)
        });
      },
      submit(){
        this.$ajax.post("/shopInfo/integration_ajax",{
          isIntegration:parseInt(this.isIntegration),
          integrationNum:this.integrationNum
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
