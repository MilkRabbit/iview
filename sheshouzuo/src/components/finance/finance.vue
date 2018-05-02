<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <Col :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
      <TabPane label="后台流水" name="name1">

        <Form ref="companySearch" :model="demandSearch" :label-width="100" inline>
          <FormItem label="项目名称：">
            <Input v-model.trim="demandSearch.itemName" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="录入时间：">
            <DatePicker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 200px" v-model="demandSearch.time"></DatePicker>
          </FormItem>
          <FormItem label="项目建立时间：">
            <DatePicker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 200px" v-model="demandSearch.itemTime"></DatePicker>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="searchSubmit('demandSearch')">筛选</Button>
            <Button type="ghost" @click="resetSubmit('demandSearch')">清空筛选条件</Button>
          </FormItem>
        </Form>

        <div style="margin-bottom: 20px;margin-left: 20px;overflow: hidden">
          <div style="">
            总计金额 <span class="blueT f20">¥  {{totalAmount}}</span>
          </div>
        </div>
        <Table :columns="userColumns" :data="data" :loading="loading"></Table>

        <Modal title="查看图片" v-model="showimg">
          <img :src=imgsrc v-if="showimg" style="width: 100%">
        </Modal>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :current="1" :total="pageTotal" @on-change="changePage"></Page>
          </div>
        </div>
      </TabPane>

      <TabPane label="学生收入表" name="name2">
        <studentFinance></studentFinance>
      </TabPane>

      <TabPane label="打款信息录入" name="name3">
        <addFinance></addFinance>
      </TabPane>
    </Tabs>
    </Col>
  </Row>
  </Col>
</template>
<script>
  import addFinance from '@/components/finance/addFinance.vue'
  import studentFinance from '@/components/finance/studentFinance.vue'
  export default {
    components: {
      addFinance,
      studentFinance,
    },
    data () {
      return {
        animated:false,
        imgsrc: '',
        showimg: false,
        totalAmount:0,
        demandSearch: {
          itemName:'',
          time:[],
          itemTime:[]
        },
        index:0,
        _id:'',
        loading:false,
        pageTotal:0,
        data:[],
        userColumns:[
          {
            title: '项目名称',
            key: 'itemName',
          },
          {
            title: '项目类型',
            key: 'itemType',
          },
          {
            title: '后台价格',
            key: 'toAdmin',
          },
          {
            title: '学生价格',
            key: 'toStudent',
          },
          {
            title: '后台转账截图',
            key: 'toAdminImg',
            render: (h, params) => {
              return h('img', {
                attrs: {
                  src:params.row.toAdminImg,
                  style: 'width: 50px;box-shadow:0 0 5px #bbb;cursor: pointer;margin:6px'
                },
                on: {
                  click: () => {
                    this.proview(params.row.toAdminImg)
                  }
                }
              });
            }
          },
          {
            title: '学生转账截图',
            key: 'toStudentImg',
            render: (h, params) => {
              return h('img', {
                attrs: {
                  src:params.row.toStudentImg,
                  style: 'width: 50px;box-shadow:0 0 5px #bbb;cursor: pointer;margin:6px'
                },
                on: {
                  click: () => {
                    this.proview(params.row.toStudentImg)
                  }
                }
              });
            }
          },
          {
            title: '收入',
            key: 'income',
          },
          {
            title: '录入时间',
            key: 'createTime',
          },
        ],
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
        this.$ajax.get("/finance/getFinance/1").then(function (res) {
          if(res.data=='noData'){
            window.location.href='https://sheshouzuo.mengotech.com'
          }
          this.loading = false;
          this.data = res.data.data.data;
          this.pageTotal = res.data.data.count;
          this.totalAmount = res.data.data.total;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      searchSubmit (name) {
        this.$ajax.get("/finance/getFinance/1", {
          params: this.demandSearch
        }).then(function (res) {
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
        this.demandSearch = {
          itemName:'',
          time:[],
          itemTime:[]
        }
      },
      changePage (index) {
        this.$ajax.get("/finance/getFinance/" + index, {
          params: this.demandSearch
        }).then(function (res) {
          this.loading = false;
          this.data = res.data.data.data;
          this.pageTotal = res.data.data.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
    }
  }
</script>
