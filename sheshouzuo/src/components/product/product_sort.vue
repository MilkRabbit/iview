<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <Col :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs :value="tabValue" class="demo-tabs-style1" :animated="animated" @on-click="changeTabVal">
      <TabPane label="分类列表" name="name1">
        <Form ref="formInline" :model="formInline" :label-width="10" inline class="inlineForm">
          <div class="leftFloat">
            <Button @click="gotoSort" type="primary">新增分类</Button>
            <!--<span class="blueText">商品分类介绍及使用说明</span>-->
          </div>
          <div class="rightFloat">
            <FormItem prop="classOrder">
              <Input v-model="formInline.classOrder" placeholder="序号"></Input>
            </FormItem>
            <FormItem prop="account">
              <Input v-model="formInline.className" placeholder="分类名称"></Input>
            </FormItem>
            <FormItem style="margin-left: 20px;">
              <Button @click="searchSubmit('formInline')" type="primary" icon="ios-search">搜索</Button>
            </FormItem>
          </div>
        </Form>
        <Table :columns="columns" :data="data" :loading="loading"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :current="1" :total="pageTotal" @on-change="changePage"></Page>
          </div>
        </div>
      </TabPane>
      <TabPane label="添加分类" name="name2">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <Row>
            <Col :lg="6">
            <FormItem label="分类序号" prop="classOrder">
              <Input v-model="formValidate.classOrder" placeholder="请输入分类序号"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :lg="6">
            <FormItem label="分类名称" prop="className">
              <Input v-model="formValidate.className" placeholder="请输入分类明后才能"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
              <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Row>
        </Form>
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
        tabValue:'name1',
        animated: false,
        formInline: {
          className: '',
          classOrder: ''
        },
        formValidate: {
          className: '',
          classOrder: ''
        },
        ruleValidate: {
          className: [
            {required: true, message: '分类名不能为空', trigger: 'blur'}
          ],
          classOrder: [
            {required: true, message: '分类序号只能为数字', trigger: 'blur'}
          ],
        },
        columns: [
          {
            title: '分类序号',
            key: 'classOrder',
          },
          {
            title: '分类名',
            key: 'className',
          },
          {
            title: '创建时间',
            key: 'createTime',
          },
          {
            title: '商品数',
            key: 'goodsCount',
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    color: '#2d8cf0'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#ed3f14'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row._id, params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data: [],
        pageTotal: 0,
        loading: false
      }
    },
    created () {
      this.loading = true;
      this.fetchData()
    },
    methods: {
      fetchData(){
        this.$ajax.get("/server/serverSort/1").then(function (res) {
          this.loading = false;
          this.data = res.data.data.data;
          this.pageTotal = res.data.data.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      searchSubmit(){
        this.$ajax.get("/server/serverSort/1",{
          params:this.formInline
        }).then(function (res) {
          this.loading = false;
          this.data = res.data.data.data;
          this.pageTotal = res.data.data.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      show (index) {
        this.$Modal.info({
          title: '分类信息',
          content: `分类名：${this.data[index].className}`
        })
      },
      remove (_id, index) {
        this.$layer.confirm('确认删除吗?', function () {
            this.$ajax.post("/server/deleteServerSort", {"id": _id}).then(function (res) {
              if (res.data.error == '0') {
                this.$Message.success('删除成功!');
                this.data.splice(index, 1);
              }
            }.bind(this)).catch(function (err) {
              console.log(err)
            });
            this.$layer.closeAll()
          }.bind(this)
        );
      },
      handleSubmit (name) {
        this.$refs[name].validate(function (valid) {
          if (valid) {
            this.$ajax.post("/server/addServerSort", this.formValidate).then(function (res) {
              if (res.data.error == '0') {
                this.$Message.success('添加成功!');
                this.data.push(res.data.data)
                this.handleReset(name)
              } else if (res.data.error == '1') {
                this.$Message.warning('分类名重复!');
              } else if (res.data.error == '3') {
                this.$Message.error('服务器不稳定!');
              }
            }.bind(this)).catch(function (err) {
              console.log(err)
            })
          } else {
            this.$Message.error('表单验证失败!');
          }
        }.bind(this))
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      gotoSort(){
        this.tabValue = 'name2'
      },
      changeTabVal(index){
        this.tabValue = index;
      },
      changePage (index) {
        this.$ajax.get("/server/serverSort/" + index).then(function (res) {
          this.loading = false;
          this.data = res.data.data.data;
          this.pageTotal = res.data.data.count;
        }.bind(this)).catch(function (err) {
          console.log("error")
        })
      }
    }
  }
</script>
