<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <Col :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
      <TabPane label="授权小程序" name="name1">
        <step>

        </step>
      </TabPane>
    </Tabs>
    </Col>
  </Row>
  </Col>
</template>
<script>
  import step from '@/components/setting/authorityStep.vue'
  export default {
    components:{
      step
    },
    data () {
      return {
        animated:false,
        loading: false,
      }
    },
    created () {
      this.loading = true;
    },
    methods: {
    }
  }
</script>
