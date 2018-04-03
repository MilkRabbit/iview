<style>
  .ivu-upload{
    width: inherit !important;
  }
</style>
<template>
  <div>
    <div class="demo-upload-list" v-for="item in uploadList" :style="{width: width + 'px',height: height + 'px','line-height': height +'px'}">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png']"
      :max-size="512"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      multiple
      type="drag"
      action="https://staticfiles.xiaochengyun.cn/pic/uploadimages"
      style="display: inline-block;width:58px;"
    v-show="updateBtn">
      <div :style="{width: height + 'px',height: height + 'px','line-height': height +'px'}">
        <Icon type="camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="View Image" v-model="visible">
      <img :src="imgName" v-if="visible" style="width: 100%">
    </Modal>
    <div class="myFormTip" v-if="index=='notUse'">{{width}}*{{height}}像素。png、jpg、gif格式的图片，总大小不超过500kb</div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        imgName: '',
        visible: false,
        uploadList: [],
        updateBtn:true
      }
    },
    created() {
      console.log(this.defaultList)
    },
    props: [
      "defaultList",
      "target",
      "num",
      "index",
      "width",
      "height"
    ],
    methods: {
      handleView (name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        if(this.index!='notUse'){
          this.uploadList = []
        }else {
          this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        }
      },
      handleSuccess (res, file) {
        file.url = res.data;
        file.name = res.data;
        if(this.index!='notUse'&&this.uploadList.length==0){
          this.uploadList.push({
            url: res.data,
            name: res.data,
            status: 'finished'
          });
        }
        this.$emit("getImgList",[this.target,this.uploadList,this.index])
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 512kb。'
        });
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < this.num;
        if (!check) {
          this.$Notice.warning({
            title: '只能上传'+this.num+'张图片'
          });
        }
        return check;
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList;
    }
  }
</script>
<style lang="less" scoped>
  @import "~less/public.less";
  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
