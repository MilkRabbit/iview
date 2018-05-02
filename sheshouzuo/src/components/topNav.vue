<style scoped lang="less">
  @import "~less/topNav.less";
</style>
<template>
    <Col span="24" class="layout-menu-right">
    <div class="layout">
      <div class="layout-ceiling">
        <div class="layout-ceiling-left">
          <img class="layout-img" src="static/logo.png" >
          <span class="layout-title">设手座后台管理系统</span>
        </div>
        <div class="layout-ceiling-main">
          <a href="https://sheshouzuo.mengotech.com" @click="quit">退出登录&nbsp;&nbsp;&nbsp;</a>
        </div>
      </div>
    </div>
    </Col>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    created () {
    },
    methods: {
      quit() {
        this.$ajax.get("/quit").then(function (res) {

        }).catch(function (err) {
          console.log("error")
        })
      },
    }
  }
</script>
