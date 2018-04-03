<template>
  <div id="app">
    <Row type="flex">
      <top-nav></top-nav>
      <left-nav></left-nav>
      <router-view></router-view>
    </Row>
  </div>
</template>


<script>
  import leftNav from '@/components/leftNav'
  import topNav from '@/components/topNav'
  export default {
    name: 'app',
    components: {
      leftNav,
      topNav
    },
    created () {
    },
    methods :{
    }
  }
</script>

<style>
  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  #app {
    font-family: "Microsoft Yahei", sans-serif;
  }

  .main_content {
    position: relative;
    top: 80px;
    width: 100%;
    margin-bottom: 135px;
    padding-left: 248px;
    box-sizing: border-box;
  }

  @media screen and (max-width: 964px) {
    .main_content {
      padding-left: 0;
    }
  }
  .ivu-tabs{
    overflow: inherit;
  }
</style>
