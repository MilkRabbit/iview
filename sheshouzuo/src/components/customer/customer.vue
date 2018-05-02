<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <Col :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
      <TabPane label="客户管理" name="name1">
        <Form ref="companySearch" :model="companySearch" :label-width="100" inline>
          <FormItem label="公司名：">
            <Input v-model.trim="companySearch.comName" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="负责人：">
            <Input v-model.trim="companySearch.leaderName" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="手机号：">
            <Input v-model.trim="companySearch.tel" placeholder="请输入"></Input>
          </FormItem>

          <FormItem label="入驻时间：">
            <DatePicker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 200px" v-model="companySearch.time"></DatePicker>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="searchSubmit('companySearch')">筛选</Button>
            <Button type="ghost" @click="resetSubmit('companySearch')">清空筛选条件</Button>
          </FormItem>
        </Form>
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

      <TabPane label="添加客户" name="name2">
        <addCustomer></addCustomer>
      </TabPane>
    </Tabs>
    </Col>
  </Row>
  </Col>
</template>
<script>
  import addCustomer from '@/components/customer/addCustomer.vue'
  export default {
    components: {
      addCustomer
    },
    data () {
      return {
        animated:false,
        imgsrc: '',
        showimg: false,
        companySearch: {
          comName:'',
          leaderName:'',
          tel:'',
          time:[]
        },
        index:0,
        _id:'',
        loading:false,
        pageTotal:0,
        data:[],
        userColumns:[
          {
            title: '公司名称',
            key: 'name',
          },
          {
            title: '公司Logo',
            key: 'logo',
            render: (h, params) => {
              return h('div', {
                attrs: {
                  style: 'background-image:url('+params.row.logo+');background-size: cover;background-position:center;width: 50px;height:50px;box-shadow:0 0 5px #bbb;cursor: pointer;margin:6px'
                },
                on: {
                  click: () => {
                    this.proview(params.row.logo)
                  }
                }
              });
            }
          },
          {
            title: '公司简介',
            key: 'description',
          },
          {
            title: '公司地址',
            key: 'address',
          },
          {
            title: '负责人',
            key: 'leaderName',
          },
          {
            title: '邮箱',
            key: 'email',
          },
          {
            title: '手机号',
            key: 'phone',
          },

          {
            title: '用户加入时间',
            key: 'createTime',
          },
          {
            title: '操作',
            key: 'action',
            width: 120,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    size: 'small'
                  },
                  attrs:{
                    style:'color:#2D8CF0;border:0;background:none;margin-top:5px;margin-bottom:5px'
                  },
                  on: {
                    click: () => {
                      this.updateCustomer(params.row._id)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    size: 'small'
                  },
                  attrs: {
                    style: 'color:#ed3f14;border:0;background:none'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row._id, params.index)
                    }
                  }
                }, '删除'),
              ]);
            }
          }
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
        this.$ajax.get("/customer/getUser/1").then(function (res) {
          if(res.data=='noData'){
            window.location.href='https://sheshouzuo.mengotech.com'
          }
          this.loading = false;
          this.data = res.data.data.data;
          this.pageTotal = res.data.data.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      searchSubmit (name) {
        this.$ajax.get("/customer/getUser/1", {
          params: this.companySearch
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
        this.companySearch = {
          comName:'',
          leaderName:'',
          tel:'',
          time:[]
        }
      },
      changePage (index) {
        this.$ajax.get("/customer/getUser/" + index, {
          params: this.companySearch
        }).then(function (res) {
          this.loading = false;
          this.data = res.data.data.data;
          this.pageTotal = res.data.data.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },

      remove (id,index) {
        let that = this;
        this.$Modal.confirm({
          title: '确认删除',
          content: '<p>确认删除吗?</p>',
          onOk: () => {
            this.$ajax.post("/customer/delCustomer", {"id": id}).then(function (res) {
              if (res.data.error == '0') {
                that.$Message.success('删除成功!');
                that.data.splice(index, 1);
              }
            }).catch(function (err) {
              console.log("error")
            })
          }
        });
      },

      updateCustomer(id){
        this.$router.push({
          path: '/updateCustomer',
          name: 'updateCustomer',
          params: {
            id: id,
          }
        })
      },
    }
  }
</script>
