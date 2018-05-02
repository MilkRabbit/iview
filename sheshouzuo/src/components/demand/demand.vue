<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <Col :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
      <TabPane label="需求管理" name="name1">
        <Form ref="companySearch" :model="demandSearch" :label-width="100" inline>
          <FormItem label="项目名称：">
            <Input v-model.trim="demandSearch.itemName" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="项目类别：">
            <Input v-model.trim="demandSearch.type" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="项目负责人：">
            <Input v-model.trim="demandSearch.itemLeader" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="手机号：">
            <Input v-model.trim="demandSearch.tel" placeholder="请输入"></Input>
          </FormItem>

          <FormItem label="入驻时间：">
            <DatePicker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 200px" v-model="demandSearch.time"></DatePicker>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="searchSubmit('demandSearch')">筛选</Button>
            <Button type="ghost" @click="resetSubmit('demandSearch')">清空筛选条件</Button>
          </FormItem>
        </Form>
        <Table :columns="demandColumns" :data="data" :loading="loading"></Table>

        <Modal title="查看图片" v-model="showimg">
          <img :src=imgsrc v-if="showimg" style="width: 100%">
        </Modal>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :current="1" :total="pageTotal" @on-change="changePage"></Page>
          </div>
        </div>
      </TabPane>

      <TabPane label="添加需求" name="name2">
        <addDemand></addDemand>
      </TabPane>
    </Tabs>
    </Col>
  </Row>
  </Col>
</template>
<script>
  import addDemand from '@/components/demand/addDemand.vue'
  export default {
    components: {
      addDemand
    },
    data () {
      return {
        animated:false,
        imgsrc: '',
        showimg: false,
        demandSearch: {
          itemName:'',
          type:'',
          itemLeader:'',
          tel:'',
          time:[]
        },
        index:0,
//        _id:'',
        loading:false,
        pageTotal:0,
        data:[],
        demandColumns:[
          {
            title: '项目名称',
            key: 'itemName',
          },
          {
            title: '项目类型',
            key: 'itemType',
          },
          {
            title: '项目简介',
            key: 'itemDescription',
          },
          {
            title: '学生价格',
            width: 85,
            key: 'priceToStu',
          },
          {
            title: '后台价格',
            width: 85,
            key: 'priceToAdmin',
          },
          {
            title: '初稿截止时间',
            key: 'draftEndTime',
          },
          {
            title: '终稿截止时间',
            key: 'finalEndTime',
          },
          {
            title: '公司名称',
            key: 'customerName',
          },
          {
            title: '项目负责人',
            key: 'itemLeader',
          },
          {
            title: '邮箱',
            key: 'itememail',
          },
          {
            title: '手机号',
            key: 'itemphone',
          },
          {
            title: '微信二维码',
            key: 'codeImg',
            render: (h, params) => {
              return h('div', {
                attrs: {
                  style: 'background-image:url('+params.row.codeImg+');background-size: cover;background-position:center;width: 50px;height:50px;box-shadow:0 0 5px #bbb;cursor: pointer;margin:6px'
                },
                on: {
                  click: () => {
                    this.proview(params.row.codeImg)
                  }
                }
              });
            }
          },
          {
            title: '项目建立时间',
            key: 'createTime',
          },
          {
            title: '查看初稿',
            key: 'createTime',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    size: 'small'
                  },
                  attrs:{
                    style:'color:#f90;border:0;background:none;'
                  },
                  on: {
                    click: () => {
                      location.href="#/draft/"+params.row._id
//                      this.updateDemand(params.row._id)
                    }
                  }
                }, '查看初稿'),
              ])
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 90,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    size: 'small'
                  },
                  attrs:{
                    style:'color:#2D8CF0;border:0;background:none;margin:5px 0;'
                  },
                  on: {
                    click: () => {
                      this.updateDemand(params.row._id)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    size: 'small'
                  },
                  attrs: {
                    style: 'color:#ed3f14;border:0;background:none;margin:5px 0;'
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
        this.$ajax.get("/demand/getDemand/1").then(function (res) {
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
        this.$ajax.get("/demand/getDemand/1", {
          params: this.demandSearch
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
        this.demandSearch = {
          itemName:'',
          type:'',
          itemLeader:'',
          tel:'',
          time:[]
        }
      },
      changePage (index) {
        this.$ajax.get("/demand/getDemand/" + index, {
          params: this.demandSearch
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
            this.$ajax.post("/demand/delDemand", {"id": id}).then(function (res) {
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

      updateDemand(id){
        this.$router.push({
          path: '/updateDemand',
          name: 'updateDemand',
          params: {
            id: id,
          }
        })
      },
    }
  }
</script>
