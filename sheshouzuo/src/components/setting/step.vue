<style lang="less">
  @import "~less/public.less";
  @import "~less/auth.less";
</style>
<template>
  <div>
    <br>
    <Steps :current="current">
      <Step title="步骤1"></Step>
      <Step title="步骤2"></Step>
      <Step title="步骤3"></Step>
      <Step title="步骤4"></Step>
    </Steps>
    <step1 :packageType="packageType" :userData="userData" :userInfo="userInfo" v-on:toStep2="toStep2"
           v-if="show1"></step1>
    <step2 :packageType="packageType" :userData="userData" :userInfo="userInfo" :resultMoney="resultMoney"
           :result="result1" v-on:toStep3="toStep3" v-if="show2"></step2>
    <step3 :result="result2" :code="result1" v-on:toStep3="toStep3" v-if="show3" v-on:toStep4="toStep4"></step3>
    <step4 :result="result3" v-if="show4"></step4>

    <br>
  </div>
</template>
<script>
  import step1 from '@/components/setting/step1.vue'
  import step2 from '@/components/setting/step2.vue'
  import step3 from '@/components/setting/step3.vue'
  import step4 from '@/components/setting/step4.vue'
  export default {
    components: {
      step1,
      step2,
      step3,
      step4
    },
    props: [
      "packageType",
      "userData",
      "userInfo",
      "resultMoney"
    ],
    data () {
      return {
        current: 0,
        data: [],
        show1: true,
        result1: '',
        show2: false,
        result2: 0,
        show3: false,
        result3: 0,
        show4: false,
      }
    },
    methods: {
      next () {
        if (this.current == 3) {
          this.current = 0;
        } else {
          this.current += 1;
        }
      },
      before () {
        if (this.current == 0) {
          this.current = 3;
        } else {
          this.current -= 1;
        }
      },
      toStep2 (index) {
        this.result1 = index;
        this.show1 = false;
        this.next();
        this.show2 = true;
      },
      toStep3 (paidMoney) {
        this.result2 = paidMoney;
        this.show2 = false;
        this.next();
        this.show3 = true;
      },
      toStep4 (state) {
        this.result3 = state;
        this.show3 = false;
        this.next();
        this.show4 = true;
      }
    }
  }
</script>
