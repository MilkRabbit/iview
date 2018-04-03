<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <i-col :xs="18" :lg="21">
  <Row type="flex">
    <i-col span="22" offset="1">
      <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
        <TabPane label="专题页列表" name="name1">
          <div style="margin-bottom: 10px">
            <a href="#/specialPage_new">
              <Button type="info">新建专题页</Button>
            </a>
          </div>
        <Table :data="tableData1" :columns="tableColumns1"  :loading="loading"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :current="1" :total="total" @on-change="changePage"></Page>
          </div>
        </div>
        </TabPane>
      </Tabs>
    </i-col>
  </Row>
  </i-col>
</template>
<script>
  export default {
    data () {
      return {
        animated:false,
        tableData1: [],
        total:0,
        tableColumns1: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '专题页标题',
            key: 'title',
          },
          {
            title: '专题页封面',
            key: 'cover',
            render: (h, params) => {
              return h('img', {
                attrs: {
                  src: params.row.cover, style: 'width: 80px;box-shadow:0 0 5px #bbb'
                },
              });
            }
          },
          {
            title: '浏览量',
            key: 'view',
            render:(h,params) => {
               return h('ul', this.tableData1[params.index].view.map(item => {
                  return h('li', {
                    style: {
                      textAlign: 'center',
                      padding: '4px'
                    }
                  }, item)
                }))
            }
          },
          {
            title: '访客量',
            key: 'visitor',
            render:(h,params) => {
              return h('ul', this.tableData1[params.index].visitor.map(item => {
                return h('li', {
                  style: {
                    textAlign: 'center',
                    padding: '4px'
                  }
                }, item)
              }))
            }
          },
          {
            title: '转发量',
            key: 'transmit',
            render:(h,params) => {
              return h('ul', this.tableData1[params.index].transmit.map(item => {
                return h('li', {
                  style: {
                    textAlign: 'center',
                    padding: '4px'
                  }
                }, item)
              }))
            }
          },
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.updateSpecialPage(params.row._id,params.index)
                    }
                  }
                }, '编辑'),

                h('Button', {
                  props:{type:"text",size:"small"},
                  style:{color:"#f90"},
                  on:{
                    click: () => {
                      this.groupSend(params.row._id,params.row.title,params.row.createTime)
                    }
                  }
                }, '推送给用户'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.specialPageRemove(params.row._id, params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        loading: false,
      }
    },
    created () {
      this.loading = true;
      this.mockTableData1()
    },
    methods: {
      groupSend(t,e,n){var i=this,l={type:"活动创建成功提醒",templateId:"AT0322",keyword_id_list:[1,2],specialPageId:t,title:e,createTime:n};this.$ajax.post("/server/groupSend",l).then(function(t){i.loading=!1,"0"==t.data.error?i.$Message.info("发送成功"):"50001"==t.data.error?i.$Message.warning("微信小程序端操作错误"):"3"==t.data.error&&i.$Message.error("服务器不稳定!")}).catch(function(t){console.log("error")})},
      mockTableData1 () {
        var that = this;
        this.$ajax.get("/special/specialPage_list/1")
          .then(function(res){
            that.loading = false;
            var items=res.data.data.data
            that.tableData1 = items;

            that.total = res.data.data.count;
          })
          .catch(function(err){
            console.log(err);
          })
      },
      specialPageRemove(_id, index) {
        let that = this;
        this.$Modal.confirm({
          title: '确认删除',
          content: '<p>确认删除吗?</p>',
          onOk: () => {
            this.$ajax.post("/special/deleteSpecialPage", {"id": _id}).then(function (res) {
              if (res.data.error == '0') {
                that.$Message.success('删除成功!');
                that.tableData1.splice(index, 1);
              } else if (res.data.error == '2') {
                that.$Message.error('该专题页已经被已创建的专题绑定，请先删除专题!');
              } else {
                that.$Message.error('请重试')
              }
            }).catch(function (err) {
              console.log("error")
            })
          }
        });
      },
      changePage () {
        // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
        let that = this;
        this.$ajax.get("/special/specialPage_list/" + index).then(function (res) {
          that.loading = false;
          that.tableData1 = res.data.data.data;

          that.total = res.data.data.count;
        }).catch(function (err) {
          console.log(err)
        })
      },
      updateSpecialPage(id,index){
        this.$router.push({
          path: '/specialPage_update',
          name: 'specialPage_update',
          params: {
            id: id,
          }
        })
      }
    }
  }
</script>
