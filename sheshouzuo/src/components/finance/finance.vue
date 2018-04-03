<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <Col :lg="21" :sm="18">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
      <TabPane label="财务管理" name="name1">
        <Form ref="formInline" :model="formInline" :label-width="80">
          <Row type="flex">
            <FormItem label="类型" prop="payType">
              <Select v-model="formInline.payType" style="width:200px">
                <Option value="0">不限</Option>
                <Option value="1">收入</Option>
                <Option value="2">支出</Option>
              </Select>
            </FormItem>
            <FormItem label="时间范围" prop="time">
              <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px"
                          v-model="formInline.time"></DatePicker>
            </FormItem>
            <FormItem prop="orderNo" label="订单号">
              <Input v-model="formInline.orderNo" placeholder="序号"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="searchSubmit('formInline')">搜索</Button>
              <Button type="ghost" @click="handleReset('formInline')" style="margin-left: 8px">重置搜索内容</Button>
            </FormItem>
          </Row>
        </Form>
        <div style="margin-bottom: 20px;margin-left: 20px;overflow: hidden">
          <div style="">
            总计金额 <span class="blueT f20">¥  {{totalAmount}}</span>
          </div>
        </div>
        <Table border :columns="columns" :data="data" :loading="loading"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :current="current" :total="pageTotal" @on-change="changePage"></Page>
          </div>
        </div>
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
        animated: false,
        formInline: {
          payType: '',
          time: [],
          orderNo: ''
        },
        columns: [
          {
            title: '序号',
            width: 100,
            type: 'index',
          },
          {
            title: '订单号',
            key: 'orderNo',
          },
          {
            title: '财务类型',
            key: 'payType',
          },
          {
            title: '金额（元）',
            key: 'amount',
          },
          {
            title: '时间',
            key: 'createTime',
          },
        ],
        data: [],
        pageTotal: 0,
        loading: false,
        current: 1,
        totalAmount: 0
      }
    },
    created()
    {
      this.loading = true;
      this.fetchData()
    }
    ,
    methods: {
      fetchData()
      {
        this.$ajax.get("/finance/finance/1").then(function (res) {
          this.loading = false;
          this.data = res.data.data.data;
          this.pageTotal = res.data.data.count;
          this.totalAmount = res.data.data.totalAmount;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      }
      ,
      searchSubmit(name)
      {
        this.$ajax.get("/finance/finance/1", {
          params: this.formInline
        }).then(function (res) {
          if (res.data.error == '0') {
            this.loading = false;
            this.data = res.data.data.data;
            this.pageTotal = res.data.data.count;
            this.totalAmount = res.data.data.totalAmount;
          } else if (res.data.error == '3') {
            this.$Message.error('服务器不稳定!');
          }
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      }
      ,
      handleReset(name)
      {
        this.$refs[name].resetFields();
      }
      ,
      changePage(index)
      {
        this.current = index;
        this.$ajax.get("/finance/finance/" + index, {
          params: this.formInline
        }).then(function (res) {
          this.loading = false;
          this.data = res.data.data.data;
          this.pageTotal = res.data.data.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      }
    }
  }
</script>
