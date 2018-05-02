<template>
  <Col :sm="18" :lg="21">
  <Row type="flex">
    <Col :sm="24" :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
      <TabPane label="轮播图设置" name="name1">
        <Tabs value="first" class="demo-tabs-style2" :animated="animated">
          <TabPane label="banner1" name="first">
            <banner1></banner1>
          </TabPane>
          <TabPane label="banner2" name="second">
            <banner2></banner2>
          </TabPane>
          <TabPane label="banner3" name="thread">
            <banner3></banner3>
          </TabPane>
        </Tabs>
      </TabPane>
      <TabPane label="背景图" name="name2">
        <Form :label-width="60">
          <FormItem label="背景图" prop="bgImg" v-if="bgImgs!=''">
            <image-upload :defaultList="bgImgs" :target="'bgImg'" :num="1" :index="'notUse'"
                          @getImgList="getImgList" :width="400" :height="200"></image-upload>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="bgSubmit()">提交</Button>
          </FormItem>
        </Form>
      </TabPane>

      <TabPane label="常见问题" name="name3">
        <Form :label-width="60">
          <FormItem label="常见问题">
            <vue-editor id="editor1"
                        useCustomImageHandler
                        @imageAdded="handleImageAdded" v-model="commonProblem">
            </vue-editor>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="problemSubmit()">提交</Button>
          </FormItem>
        </Form>
      </TabPane>
    </Tabs>
    </Col>
  </Row>
  </Col>
</template>
<script>
  import { VueEditor } from 'vue2-editor'
  import imageUpload from '@/components/imageUpload'
  import banner1 from '@/components/setting/banner1'
  import banner2 from '@/components/setting/banner2'
  import banner3 from '@/components/setting/banner3'
  export default {
    components: {
      VueEditor,
      imageUpload,
      banner1,
      banner2,
      banner3,
    },
    data () {
      return {
        animated:false,
        bgImgs:[],
        bgImg:'',
        commonProblem:'',
        loading:false
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      getImgList(target){
        if (target[0] == 'bgImg') {
          this.bgImg = target[1][0].name;
        }
      },
      fetchData(){
        this.$ajax.get("/student/page").then(function (res) {
          if(res.data=='noData'){
            window.location.href='https://sheshouzuo.mengotech.com'
          }
          var data=res.data.data;
          this.bgImg = data.bgImg;
          this.commonProblem = data.problem;
          this.bgImgs = [{
            name:data.bgImg,
            url:data.bgImg,
          }];
        }.bind(this)).catch(function (err) {
          console.log("error")
        });
      },
      //提交表单
      bgSubmit() {
        this.$ajax.post("/student/addbgImg", {bgImg:this.bgImg}).then(function (res) {
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
      /*富文本上传图片*/
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
      problemSubmit(){
        this.$ajax.post("/student/addProblem", {problem:this.commonProblem}).then(function (res) {
          if(res.data.error=='0'){
            this.$Message.success('添加成功!');
          }else if(res.data.error=='3'){
            this.$Message.error('服务器不稳定!');
          }
        }.bind(this))
          .catch(function (err) {
            console.log(err);
          })
      }
    },
  }
</script>
