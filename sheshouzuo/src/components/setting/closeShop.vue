<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <Col :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
      <TabPane label="删除商铺" name="name1" style="text-align: center">
        <br>
        <div>
          删除店铺后，店铺相关的所有信息将会清除，是否确认删除店铺?
        </div>
        <br>
        <Button type="error" long @click="remove" style="width: 60%">确认删除</Button>
      </TabPane>
    </Tabs>
    </Col>
  </Row>
  </Col>
</template>
<script>
  export default {
    data () {
      return {
        animated:false,
        data: [],
        loading:false
      }
    },
    created () {
      this.loading = true;
    },
    methods: {
      remove (name) {
        this.$Modal.confirm({
          title: '确认删除',
          content: '<p>确认删除吗?</p>',
          onOk: function() {
            this.$ajax.post("/setting/deleteShop").then(function (res) {
              if (res.data.error == '0') {
                this.$Message.success('删除成功!');
                this.Lockr.flush();
                window.location.href = 'https://www.xiaochengyun.cn/chooseShop'
              }else {
                this.$Message.error('服务器错误，请稍后重试!');
              }
            }).catch(function (err) {
              console.log(err)
            })
          }.bind(this)
        });
      },
    }
  }
</script>
