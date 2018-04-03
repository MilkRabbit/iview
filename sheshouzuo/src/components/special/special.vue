<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <i-col :sm="18" :lg="21">
    <Row type="flex">
      <i-col span="22" offset="1">
        <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
          <TabPane label="专题列表" name="name1">
            <div style="margin-bottom: 10px">
              <a href="#/special_new">
                <Button type="info">新建专题</Button>
              </a>
            </div>
            <Table :data="tableData1" :columns="tableColumns1"></Table>
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
            title: '专题标题',
            key: 'title',
          },
          {
            title: '专题图标',
            key: 'icon',
            render: (h, params) => {
              return h('img', {
                attrs: {
                  src: params.row.icon, style: 'width: 20px;box-shadow:0 0 5px #bbb'
                },
              });
            }
          },
          {
            title: '关联的专题页',
            key: 'specialPageTitle',
            render:(h,params) => {
              return h('ul', this.tableData1[params.index].specialPageTitle.map(item => {
                return h('li', {
                  style: {
                    padding: '4px'
                  }
                }, item)
              }))
            }
          },
          {
            title: '专题风格',
            key: 'style',
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
                      this.updateSpecial(params.row._id,params.index)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.specialRemove(params.row._id, params.index)
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
      mockTableData1 () {
        var data=[]
        var that = this;
        this.$ajax.get("/special/special_list/1")
          .then(function(res){
            that.loading = false;
            var items=res.data.data.data
            that.tableData1 = items;
            that.total = res.data.data.count;
//            }
          })
          .catch(function(err){
            console.log(err);
          })
      },
      specialRemove(_id, index) {
        let that = this;
        this.$Modal.confirm({
          title: '确认删除',
          content: '<p>确认删除吗?</p>',
          onOk: () => {
            this.$ajax.post("/special/deleteSpecial", {"id": _id}).then(function (res) {
              if (res.data.error == '0') {
                that.$Message.success('删除成功!');
                that.tableData1.splice(index, 1);
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
        let that = this;
        this.$ajax.get("/special/special_list/"+index).then(function (res) {
          that.loading = false;
          that.tableData1 = res.data.data.data;
          that.total = res.data.data.count;
        }).catch(function (err) {
          console.log(err)
        })
      },
      updateSpecial(id,index){
        this.$router.push({
          path: '/special_update',
          name: 'special_update',
          params: {
            id: id,
          }
        })
      }
    }
  }
</script>
