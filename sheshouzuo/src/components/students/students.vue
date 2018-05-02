<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <Col :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1">
      <TabPane label="学生管理" name="name1">
        <Form ref="stuSearch" :model="stuSearch" :label-width="100" inline>
          <FormItem label="学生姓名：">
            <Input v-model.trim="stuSearch.name" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="手机号：">
            <Input v-model.trim="stuSearch.tel" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="性别：">
            <Select v-model="stuSearch.sex"  style="width: 100px">
              <Option value="0">全部</Option>
              <Option value="1">男</Option>
              <Option value="2">女</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="searchSubmit('stuSearch')">筛选</Button>
            <Button type="ghost" @click="resetSubmit('stuSearch')">清空筛选条件</Button>
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
    </Tabs>
    </Col>
  </Row>
  </Col>
</template>
<script>
  export default {
    data () {
      return {
        imgsrc: '',
        showimg: false,
        animated: false,
        stuSearch: {
          name:'',
          tel:'',
          sex:0
        },
//        index:0,
//        _id:'',
        loading:false,
        pageTotal:0,
        data:[],
        userColumns:[
          {
            title: '学生姓名',
            key: 'studentName',
          },
          {
            title: '手机号',
            key: 'studentPhone',
          },
          {
            title: '性别',
            key: 'sex',
          },
          {
            title: '入学时间',
            key: 'entranceTime',
          },
          {
            title: '院校名称',
            key: 'collegeName',
          },
          {
            title: '专业',
            key: 'major',
          },
          {
            title: '学生证',
            key: 'studentImg',
            width:260,
            render: (h, params) => {
              var that=this;
              return h('div',[
                h('div', this.data[params.index].studentImg.map(item => {
                  return h('img', {
                    attrs: {
                      src:item,
                      style: 'width: 70px;box-shadow:0 0 5px #bbb;cursor: pointer;margin:6px'
                    },
                    on: {
                      click: () => {
                        that.proview(item)
                      }
                    }
                  });
                }))
              ])
            }
          },
          {
            title: '优秀作品',
            key: 'studentImg',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    size: 'small'
                  },
                  attrs: {
                    style: 'color:#2D8CF0;border:0;background:none'
                  },
                  on: {
                    click: () => {
                      location.href="#/works/"+params.row._id
                    }
                  }
                }, '查看学生作品'),
              ]);
            }
          },
          {
            title: '是否认证',
            key: 'isPass',
            render: (h, params) => {
              if(params.row.isPass==1){
                return h('div', [
                  h('Button', {
                    props: {
                      size: 'small'
                    },
                    attrs:{
                      style:'margin:5px;color:#19be6b;border:0;background:none'
                    },
                    on: {
                      click: () => {
                        this.state(params.row._id,2,params.index)
                      }
                    }
                  }, '通过'),
                  h('Button', {
                    props: {
                      size: 'small'
                    },
                    attrs:{
                      style:'margin:5px;color:#ed3f14;border:0;background:none'
                    },
                    on: {
                      click: () => {
                        this.state(params.row._id,3,params.index)
                      }
                    }
                  }, '驳回')
                ]);
              }else if(params.row.isPass==2){
                return h('div', [
                  h('p', {}, '认证成功'),
                ])
              }else if(params.row.isPass==3){
                return h('div', [
                  h('p', {}, '认证失败'),
                ])
              }
            }
          },
          {
            title: '皇冠',
            key: 'isPass',
            render: (h, params) => {
              if(params.row.isPass==2){
                if(params.row.crown==0) {
                  return h('div', [
                    h('Button', {
                      props: {
                        size: 'small'
                      },
                      attrs: {
                        style: 'margin:5px;color:#19be6b;border:0;background:none'
                      },
                      on: {
                        click: () => {
                          this.crown(params.row._id,1)
                        }
                      }
                    }, '设为皇冠'),
                  ]);
                }else {
                  return h('div', [
                    h('Button', {
                      props: {
                        size: 'small'
                      },
                      attrs: {
                        style: 'margin:5px;color:#f90;border:0;background:none'
                      },
                      on: {
                        click: () => {
                          this.crown(params.row._id,0)
                        }
                      }
                    }, '取消皇冠'),
                  ]);
                }
              }else {
                return h('div', [
                  h('p', {}, ''),
                ])
              }
            }
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
      state (id,isPass,index){
        let that = this;
        this.$ajax.post("/student/state",{
          id:id,
          isPass:isPass,
        }).then(function (res) {
          that.loading = false;
          if(res.data.data == 2){
            that.$Message.info('通过成功');
            that.getData()
          }
          if(res.data.data == 3){
            that.$Message.info('驳回成功');
            that.getData()
          }
        }).catch(function (err) {
          console.log("error")
        })
      },
      crown (id,crown){
        let that = this;
        this.$ajax.post("/student/crown",{
          id:id,
          crown:crown,
        }).then(function (res) {
          that.loading = false;
          if(res.data.data == 1){
            that.$Message.info('设置成功');
            that.getData()
          }
          if(res.data.data == 0){
            that.$Message.info('取消成功');
            that.getData()
          }
        }).catch(function (err) {
          console.log("error")
        })
      },
      getData(){
        this.$ajax.get("/student/getStudent/1").then(function (res) {
          if(res.data=='noData'){
            window.location.href='https://sheshouzuo.mengotech.com'
          }
          if(this.$route.params.studentName){
            var studentName=this.$route.params.studentName
            this.stuSearch={
              name:studentName,
              tel:'',
              sex:0
            }
            this.searchSubmit()
          }else {
            this.loading = false;
            this.data = res.data.data.data;
            this.pageTotal = res.data.data.count;
          }

        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      searchSubmit () {
        this.$ajax.get("/student/getStudent/1", {
          params: this.stuSearch
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
        this.stuSearch = {
          userName:'',
          tel:'',
          sex:0
        }
      },
      changePage (index) {
        this.$ajax.get("/student/getStudent/" + index, {
          params: this.stuSearch
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
