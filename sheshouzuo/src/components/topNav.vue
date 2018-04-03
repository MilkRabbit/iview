<style scoped lang="less">
  @import "~less/topNav.less";
</style>
<template>
    <Col span="24" class="layout-menu-right">
    <div class="layout">
      <div class="layout-ceiling">
        <div class="layout-ceiling-left">
          <img class="layout-img" src="static/favicon.ico">
          <span class="layout-title">小橙云商家后台</span>
          <span class="layout-type">{{packageName}}</span>
        </div>
        <div class="layout-ceiling-main">
          <a href="https://staticfiles.xiaochengyun.cn/chooseShop" @click="clearLockr">返回店铺列表</a> |
          <a target="_blank" href="http://bbs.xiaochengyun.cn/category/1/%E5%B8%AE%E5%8A%A9%E6%96%87%E6%A1%A3">帮助中心</a> |
        </div>
      </div>
    </div>
    </Col>
</template>
<script>
  export default {
    data () {
      return {
        packageName: ''
      }
    },
    created () {
      this.packageName = this.Lockr.get("packageName");
    },
    methods: {
      clearLockr(){
        this.Lockr.flush();
      }
    }
  }
</script>
