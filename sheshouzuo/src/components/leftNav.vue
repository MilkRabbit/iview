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

  import authority from 'static/data/leftNav.js';
  export default {
    data() {
      return {
        hash: '',
        items: authority,
        hashOpen: '',
        activeName: '',
        accordion: true,
      };
    },
    created() {
      this.fetchData();
      this.hash = this.$route.path.substring(1, this.$route.path.length);
      this.hashOpen = [parseInt(this.hash.split('&')[0].split('-')[0])];
      this.activeName = this.hash.split('&')[0];
    },
    methods: {
      fetchData() {
        this.$ajax.get("/admin/userInfo").then(function (res) {
          if(res.data=='noData'){
            window.location.href='https://sheshouzuo.mengotech.com'
          }
          var arr=res.data.rolePower
          var rolePower=[]
          if(arr[0]!=1){
            for (var i in arr){
              rolePower.push(arr[i]-1)
            }
            rolePower.push(0,7)
            var left=[]
            for (var a in (this.items)){
              for (var b in rolePower){
                if(rolePower[b]==a){
                  left.push((this.items)[a])
                }
              }
            }
            this.items=left
          }
        }.bind(this)).catch(function (err) {
          console.log(err)
        });
      },
    }
  }
</script>
