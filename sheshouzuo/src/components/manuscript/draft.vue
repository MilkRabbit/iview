<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <Col :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1">
      <TabPane label="稿件管理" name="name1">
        <Form ref="draftSearch" :model="draftSearch" :label-width="100" inline>
          <FormItem label="项目名称：">
            <Input v-model.trim="draftSearch.name" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="项目类别：">
            <Input v-model.trim="draftSearch.type" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="学生姓名：">
            <Input v-model.trim="draftSearch.studentName" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="投稿时间：">
            <DatePicker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 200px" v-model="draftSearch.time"></DatePicker>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="searchSubmit('draftSearch')">筛选</Button>
            <Button type="ghost" @click="resetSubmit('draftSearch')">清空筛选条件</Button>
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
        draftSearch: {
          name:'',
          type:'',
          studentName:'',
          time:[]
        },
        index:0,
        _id:'',
        loading:false,
        pageTotal:0,
        data:[],
        userColumns:[
          {
            width:90,
            title: '项目名称',
            key: 'itemName',
          },
          {
            width:90,
            title: '项目类型',
            key: 'itemType',
          },
          {
            title: '初稿截止时间',
            key: 'draftEndTime',
          },
          {
            title: '负责人邮箱',
            key: 'itememail',
          },
          {
            title: '负责人手机',
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
            width:90,
            title: '学生姓名',
            key: 'studentName',
            render: (h, params) => {
              return h('p',{
                attrs: {
                  style:'color:#2D8CF0; cursor: pointer;'
                },
                on: {
                  click: () => {
                    this.searchStudent(params.row.studentName)
                  }
                }
              },params.row.studentName)
            }
          },
          {
            title: '学生手机',
            key: 'studentPhone',
          },
          {
            title: '投稿简介',
            key: 'draftIntro',
          },
          {
            title: '初稿作品',
            key: 'studentImg',
            width:300,
            render: (h, params) => {
              var that=this;
              return h('div',[
                h('div', this.data[params.index].draftImgs.map(item => {
                  return h('img', {
                    attrs: {
                      src:item,
                      style: 'width: 50px;box-shadow:0 0 5px #bbb;cursor: pointer;margin:6px'
                    },
                    on: {
                      click: () => {
                        that.proview(item,params.row._id)
                      }
                    }
                  });
                }))
              ])
            }
          },
          {
            title: '投稿时间',
            key: 'createTime',
          },
          {
            title: '发送初稿链接',
            key: 'action',
            width: 80,
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
                      this.sendDraft(params.row._id,params.row.itememail,params.row.itemphone,params.row.itemName,params.row.studentName)
                    }
                  }
                }, '发送'),
              ]);
            }
          },
          {
            title: '是否通过初稿',
            key: 'isSelect',
            width:90,
            align:'center',
            render: (h, params) => {
              if(params.row.isSelect==0||params.row.isSelect==1){
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
                  }, '不通过'),
                ]);
              } else if(params.row.isSelect==2){
                return h('div', [
                  h('p', {}, '被选中'),
                  h('Button', {
                    props: {
                      size: 'small'
                    },
                    attrs:{
                      style:'margin:5px;color:#f90;border:0;background:none'
                    },
                    on: {
                      click: () => {
                        location.href="#/flow?demandId="+params.row.demandId+"&_id="+params.row._id
//                        this.flow(params.row.demandId)
                      }
                    }
                  }, '确认流程'),
                ])
              }else if(params.row.isSelect==3){
                return h('div', [
                  h('p', {attrs:{
                    style:'color:#acacac'
                  },}, '未选中'),
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
      sendDraft(id,email,phone,itemName,studentName){
        this.$ajax.post("/draft/sendDraft",{
          id:id,
          email:email,
          phone:phone,
          itemName:itemName,
          studentName:studentName,
        }).then(function (res) {
          if(res.data.error == '0'){
            this.$Message.info('发送成功');
          }
        }.bind(this)).catch(function (err) {
          console.log("error")
        })
      },
      // 查看图片
      proview(name,id) {
        this.imgsrc = name;
        this.showimg = true;
        this.$ajax.post("/draft/selectStatus",{
          id:id,
          isSelect:1,
        }).then(function (res) {

          if(res.data.error == '0'){
            this.getData()
          }
        }.bind(this)).catch(function (err) {
          console.log("error")
        })
      },
      state (id,isSelect,index){
        this.$ajax.post("draft/state",{
          id:id,
          isSelect:isSelect,
        }).then(function (res) {
          this.loading = false;
          if(res.data.error == '0'){
            this.$Message.info('已选择初稿');
            this.getData()
          }
        }.bind(this)).catch(function (err) {
          console.log("error")
        })
      },
      getData(){

        var url=location.href;
        var id =url.substr(-24);
        this.id=id;
        this.$ajax.get("/draft/getDraft/"+id+"/1").then(function (res) {
          this.loading = false;
          this.data = res.data.data.data;
          this.pageTotal = res.data.data.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      searchSubmit (name) {
        this.$ajax.get("/draft/getDraft/"+id+"/1", {
          params: this.draftSearch
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
        this.draftSearch = {
          name:'',
          type:'',
          studentName:'',
          time:[]
        }
      },
      changePage (index) {
        this.$ajax.get("/draft/getDraft/"+id+"/" + index, {
          params: this.draftSearch
        }).then(function (res) {
          this.loading = false;
          this.data = res.data.data.data;
          this.pageTotal = res.data.data.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      searchStudent(studentName){
        this.$router.push({
          path: '/students',
          name: 'students',
          params: {
            studentName: studentName,
          }
        })
      },
    }
  }
</script>
