<style lang="less">
  @import "~less/public.less";
</style>
<style>
  .worksBox{
    width: 100%;
    background: #f8f8f8;
    margin-bottom: 15px;
    font-size: 16px;
  }
  .worksBox {
  }
</style>
<template>
  <Col :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1">
      <TabPane label="学生作品
" name="name1">
        <div class="works" v-if="worksInfo.length>0"  v-for="(item,index) in worksInfo" :key="index">
          <div class="worksBox" style="padding: 20px;border-radius: 10px">
            <p style="color: #9700ca;font-size: 18px">#{{ index+1 }}</p>
            <span>作品名称：<span style="color: #9700ca;margin-right: 30px">{{ item.names }}</span></span>
            <span>作品介绍：<span style="margin-right: 20px">{{ item.explain }}</span></span>
            <p style="margin: 10px 0">获奖情况：<span>{{ item.prize }}</span></p>
            <p style="margin: 10px 0">作品时间：<span>{{ item.time }}</span></p>
            <span v-for="(x,index) in (item.allphotos)" :key="index">
              <img :src="x" alt="" style="height: 120px;margin: 10px" @click="proview(x)">
            </span>
          </div>
        </div>
        <div v-if="worksInfo.length==0" style="text-align: center;font-size: 14px;padding: 15px 0">
          <p>暂无学生作品信息</p>
        </div>
        <Modal title="查看图片" v-model="showimg">
          <img :src=imgsrc v-if="showimg" style="width: 100%">
        </Modal>
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
        imgsrc: '',
        showimg: false,
        animated: false,
        worksInfo:[],
//        worksImg:[],
      }
    },
    created () {
      this.getData();
    },
    methods: {
      // 查看图片
      proview(name) {
        this.imgsrc = name;
        this.showimg = true;
      },
      getData(){
        var url=location.href;
        var id=url.substr(-24)
        console.log(id)
        this.$ajax.get("/student/getWork/"+id).then(function (res) {
          console.log(res.data)
          this.worksInfo=res.data
//          var imgs=res.data.worksInfo.allphotos
//          console.log(imgs)
//          this.worksImg=JSON.parse(.allphotos)
//          console.log(this.worksImg)
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
    }
  }
</script>
