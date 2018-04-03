<template>
  <div id="app">
    <vue-editor id="editor"
                useCustomImageHandler
                @imageAdded="handleImageAdded" v-model="htmlForEditor">
    </vue-editor>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
  export default {
    components: {
      VueEditor
    },

    data() {
      return {
        htmlForEditor: ''
      }
    },

    methods: {
      handleImageAdded: function(file, Editor, cursorLocation) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)

        var formData = new FormData();
        formData.append('image', file)

        this.$ajax({
          url: 'https://staticfiles.xiaochengyun.cn/pic/uploadimages',
          method: 'POST',
          data: formData
        })
          .then((result) => {
            let url = result.data.data // Get url from response
            Editor.insertEmbed(cursorLocation, 'image', url);
          })
          .catch((err) => {
            console.log(err);
          })
      },
      setCnt: function () {
        console.log(this.htmlForEditor)
        this.$emit('getCnt',this.htmlForEditor)
      }
    }
  }
</script>
