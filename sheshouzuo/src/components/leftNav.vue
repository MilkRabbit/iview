<style scoped lang="less">
  a{
    color: inherit;
  }

  li.ivu-menu-submenu{position:relative}
  li.ivu-menu-submenu .notice{position:absolute;width:9px;height:9px;border-radius:50%;background:#d61616;display:none}
  /*li.ivu-menu-submenu-title{position:relative}*/
  /*li.ivu-menu-submenu-title .notice{*/
    /*position:absolute;*/
    /*width:10px;*/
    /*height:10px;*/
    /*border-radius:50%;*/
    /*background:#d61616;*/
    /*!*display:none*!*/
  /*}*/
</style>
<template>
  <Col :lg="3" class="layout-menu-left">
  <audio id="MyAudio">
    <source src="../../static/sound/tip.mp3" type="audio/mp3">
    <p>您的浏览器不支持该音频格式。</p>
  </audio>
  <audio id="MyAudio1">
    <source src="../../static/sound/tip1.mp3" type="audio/mp3">
    <p>您的浏览器不支持该音频格式。</p>
  </audio>
  <Menu :active-name="activeName" width="auto" :open-names="hashOpen" :accordion="accordion">
    <router-link :to="'/'+item.url" :key="index" v-for="(item,index) in items" v-if="item.class.length==0">
      <MenuItem :name="item.url">
        <Icon :type="item.icon"></Icon>
        <span class="layout-text">{{item.name}}</span>
      </MenuItem>
    </router-link>

    <Submenu :name="item.id" v-if="item.class.length!=0" :key="index" v-for="(item,index) in items">
      <template slot="title">
        <Icon :type="item.icon"></Icon>
        <span class="layout-text">{{item.name}}</span>
        <span class="notice"></span>
      </template>
      <router-link :to="'/'+subItem.url" :key="subIndex" v-for="(subItem,subIndex ) in item.class">
        <MenuItem :name="subItem.id">{{subItem.name}}
        </MenuItem>
      </router-link>
    </Submenu>
  </Menu>
  </Col>
</template>
<script>

  console.log(location.search)
  if(location.search.indexOf("?")==-1){
    location.href += "?myurl";
  }
  else{
    if(location.search.indexOf("myurl")==-1) location.search += "&myurl";
  }
  import authority from 'static/data/leftNav_mall.js';
  import authority1 from 'static/data/leftNav_mallFree.js';
  export default {
    data () {
      return {
        hash: '',
        items: authority,
        hashOpen: '',
        activeName: '',
        accordion: true,
        shopAvatar:'',
        shopName:'',
        shopPackage:'',
      };
    },
    created () {
      this.fetchData();
      this.hash = this.$route.path.substring(1, this.$route.path.length);
      this.hashOpen = [parseInt(this.hash.split('&')[0].split('-')[0])];
      this.activeName = this.hash.split('&')[0];
      this.isOrder();
      this.isOrderCancer();
    },
    mounted:function(){
      var t=this;
      setInterval(function(){
        t.isOrder();
        t.isOrderCancer()
      },30000)},
    methods :{
      isOrder(){
        var MyAudio=document.querySelector("#MyAudio");
        this.$ajax.get("/order/countOrder").then(function(n){
          if("change"==n.data.data) {
            MyAudio.play()
            $("li.ivu-menu-submenu").eq(2).children(".ivu-menu-submenu-title").children(".notice").show()
          }else {
            $("li.ivu-menu-submenu").eq(2).children(".ivu-menu-submenu-title").children(".notice").hide()
          }
          $("li.ivu-menu-submenu").eq(2).click(function(){
            $("li.ivu-menu-submenu").eq(2).children(".ivu-menu-submenu-title").children(".notice").hide()
          })
          $("li.ivu-menu-item").eq(9).click(function(){
            $("li.ivu-menu-submenu").eq(2).children(".ivu-menu-submenu-title").children(".notice").hide()
          })
        })
          .catch(function(t){console.log("error")})
      },
      isOrderCancer(){
        var e=document.querySelector("#MyAudio1");
        this.$ajax.get("/order/countOrderCancer").then(function(n){
          if("change"==n.data.data) {
            e.play()
            $("li.ivu-menu-submenu").eq(2).children(".ivu-menu-submenu-title").children(".notice").show()
          }else {
            $("li.ivu-menu-submenu").eq(2).children(".ivu-menu-submenu-title").children(".notice").hide()
          }
          $("li.ivu-menu-submenu").eq(2).click(function(){
            $("li.ivu-menu-submenu").eq(2).children(".ivu-menu-submenu-title").children(".notice").hide()
          })
          $("li.ivu-menu-item").eq(9).click(function(){
            $("li.ivu-menu-submenu").eq(2).children(".ivu-menu-submenu-title").children(".notice").hide()
          })
        })
          .catch(function(t){
            console.log("error")
          })
      },
      fetchData(){
        this.$ajax.get("/admin/shopInfo").then(function (res) {
          console.log('!!!!!!!!!!!')
          this.shopAvatar = res.data.shopLogo;
          this.shopName = res.data.shopName;
          console.log(res.data.packageType)
          switch (parseInt(res.data.packageType)){
            case 0:
              this.shopPackage = '免费版';
              this.items=authority1
              break;
            case 1:
              this.shopPackage = '创业版';
              this.items=authority
              break;
            case 2:
              this.shopPackage = '企业版';
              this.items=authority
              break;
            case 3:
              this.shopPackage = '至尊版';
              this.items=authority
              break;
          }
        }.bind(this)).catch(function (err) {
          console.log(err)
        });
      },
    }
  }
</script>
