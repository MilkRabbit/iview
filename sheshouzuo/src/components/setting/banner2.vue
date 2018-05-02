<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <Form :label-width="60">
    <FormItem label="轮播图" prop="banner" v-if="banner!=''">
      <image-upload :defaultList="banner" :target="'banner'" :num="1" :index="'notUse'"
                    @getImgList="getImgList" :width="400" :height="200"></image-upload>
    </FormItem>
    <FormItem label="广告内容">
      <vue-editor id="editor2"
                  useCustomImageHandler
                  @imageAdded="handleImageAdded" v-model="bannerInfo2">
      </vue-editor>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit()">提交</Button>
    </FormItem>
  </Form>
</template>
<script>
  import { VueEditor } from 'vue2-editor'
  import imageUpload from '@/components/imageUpload'
  export default {
    data () {
      return {
        animated:false,
        banner:[],
        bannerImg:'',
        bannerInfo2: '',
        bannerNum:1,
      }
    },
    components: {
      VueEditor,
      imageUpload
    },
    created () {
      var that=this
      setTimeout(function () {
        that.fetchData();
      },80)

    },
    methods: {
      getImgList(target){
        if (target[0] == 'banner') {
          this.bannerImg = target[1][0].name;
        }
      },
      fetchData(){
        this.$ajax.get("/student/page").then(function (res) {
          var data=res.data.data;
          var arr=data.banner;
          var index=this.bannerNum
          this.bannerImg=arr[1].bannerImg
          this.bannerInfo2=arr[1].bannerInfo
          this.banner = [{
            name:this.bannerImg,
            url:this.bannerImg,
          }];
        }.bind(this)).catch(function (err) {
          console.log("error")
        });
      },
      handleImageAdded: function(file, Editor, cursorLocation) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)

        var formData = new FormData();
        formData.append('image', file);

        this.$ajax({
          url: 'https://sheshouzuo.mengotech.com/pic/uploadimages',
          method: 'POST',
          data: formData
        })
          .then((result) => {
            let url = result.data.data;  // Get url from response
            Editor.insertEmbed(cursorLocation, 'image', url);
          })
          .catch((err) => {
            console.log(err);
          })
      },
      //提交表单
      handleSubmit() {
        this.$ajax.post("/student/banner", {
          bannerImg:this.bannerImg,
          bannerInfo:this.bannerInfo2,
          num:this.bannerNum,
        }).then(function (res) {
          if(res.data.error=='0'){
            this.$Message.success('添加成功!');
          }else if(res.data.error=='3'){
            this.$Message.error('服务器不稳定!');
          }
        }.bind(this))
          .catch(function (err) {
            console.log(err);
          })
      },
    },
  }
</script>
