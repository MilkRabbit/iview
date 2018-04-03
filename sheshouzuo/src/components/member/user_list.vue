<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <Col :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1">
      <TabPane label="客户管理" name="name1">
        <Form ref="userSearch" :model="userSearch" :label-width="100" inline>
          <FormItem label="微信昵称：">
            <Input v-model.trim="userSearch.userName" placeholder="请输入"></Input>
          </FormItem>
          <!--<FormItem label="手机号：">-->
            <!--<Input v-model.trim="userSearch.tel" placeholder="请输入"></Input>-->
          <!--</FormItem>-->
          <FormItem label="首次使用时间">
            <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px" v-model="userSearch.time"></DatePicker>
          </FormItem>
          <FormItem label="客户性别：">
            <Select v-model="userSearch.sex"  style="width: 100px">
              <Option value="0">全部</Option>
              <Option value="1">男</Option>
              <Option value="2">女</Option>
            </Select>
          </FormItem>
          <!--<FormItem label="客户购次：">-->
            <!--<Select>-->
              <!--<Option value="all">全部</Option>-->
              <!--<Option value="0">0</Option>-->
              <!--<Option value="1">1+</Option>-->
              <!--<Option value="3">3+</Option>-->
              <!--<Option value="5">5+</Option>-->
              <!--<Option value="10">10+</Option>-->
            <!--</Select>-->
          <!--</FormItem>-->
          <!--<FormItem label="客户身份：">-->
            <!--<Select>-->
              <!--<Option value="0">全部</Option>-->
              <!--<Option value="1">会员</Option>-->
              <!--<Option value="2">非会员</Option>-->
            <!--</Select>-->
          <!--</FormItem>-->
          <!--<FormItem label="客户来源：">-->
            <!--<Input v-model.trim="userSearch.from" placeholder="请输入"></Input>-->
          <!--</FormItem>-->
          <FormItem>
            <Button type="primary" @click="searchSubmit('userSearch')">筛选</Button>
            <Button type="ghost" @click="resetSubmit('userSearch')">清空筛选条件</Button>
          </FormItem>
        </Form>
        <Table :columns="userColumns" :data="data" :loading="loading"></Table>

        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :current="1" :total="pageTotal" @on-change="changePage"></Page>
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
        score:0,
        scoreModel:false,
        animated: false,
        userSearch: {
          userName:'',
          time:[],
          sex:0
        },
        index:0,
        _id:'',
        loading:false,
        pageTotal:0,
        data:[],
        userColumns:[
          {
            title: '客户信息',
            key: 'nickName',
          },
          {
            title: '地区',
            key: 'city',
          },
          {
            title: '手机号',
            key: 'phone',
          },
          {
            title: '积分',
            key: 'integralNum',
          },
          {
            title: '性别',
            key: 'gender',
          },
          {
            title: '用户加入时间',
            key: 'createTime',
          },
          {
            title: '7日内可发消息数',
            key: 'formidNum',
            align: 'center'
          },
        ],
      }
    },
    created () {
      this.getData();
    },
    methods: {

      getData(){
        this.$ajax.get("/admin/getUserData/1").then(function (res) {
          this.loading = false;
          this.data = res.data.data.data;
          this.pageTotal = res.data.data.count;
          $("th").last().children("div").append("<span class='quest' style='display: inline-block;padding: 0px 5px;border: 1px solid #ccc;background: #eee;border-radius: 3px;cursor: pointer;'>?</span><p style='position: absolute;background: #fff; border: 1px solid #ddd; padding: 3px 5px;font-weight: normal;top: 35px; width: 255px; right: 5px; border-radius: 5px;color: #f90;display: none' class='interpret'>当用户进入各个版块时，可发消息数便会增加</p>");
          $(".quest").hover(function(){
            $(".interpret").show()
          },function () {
            $(".interpret").hide()
          })
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      searchSubmit (name) {
        this.$ajax.get("/admin/getUserData/1", {
          params: this.userSearch
        }).then(function (res) {
          console.log(res)
          if (res.data.error == '0') {
            this.loading = false;
            this.data = res.data.data.data;
            this.pageTotal = res.data.data.count;
          } else {
            this.$Message.error('服务器不稳定!');
          }
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      resetSubmit(){
        this.userSearch = {
          userName:'',
          time:[],
          sex:0
        }
      },
      changePage (index) {
        this.$ajax.get("/admin/getUserData/" + index, {
          params: this.userSearch
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
