<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <Col :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs :value="tabValue" class="demo-tabs-style1" :animated="animated" @on-click="changeTabVal">
      <TabPane label="配送员列表" name="name1">
        <Form :label-width="10" inline class="inlineForm">
          <div class="leftFloat" style="margin-bottom: 20px">
            <Button @click="gotoSort" type="primary">新增配送员</Button>
            <!--<span class="blueText">商品分类介绍及使用说明</span>-->
          </div>
        </Form>
        <Table :columns="columns" :data="data" :loading="loading"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :current="1" :total="pageTotal" @on-change="changePage"></Page>
          </div>
        </div>
      </TabPane>
      <TabPane label="添加配送员" name="name2">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <Row>
            <Col :lg="6">
            <FormItem label="配送员姓名" prop="classOrder">
              <Input v-model="formValidate.diliverymanName" placeholder="请输入"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :lg="6">
            <FormItem label="配送员电话" prop="className">
              <Input v-model="formValidate.diliverymanPhone" placeholder="请输入"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :lg="4">
            <FormItem label="配送员性别" prop="className">
              <Select v-model="formValidate.diliverymanSex" placeholder="请选择" style="width: 200px">
                <Option value="男">男</Option>
                <Option value="女">女</Option>
              </Select>
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
        tabValue: 'name1',
        animated: false,
        formValidate: {
          diliverymanName: '',
          diliverymanPhone: '',
          diliverymanSex: '男',
        },
        ruleValidate: {
          name: [
            {required: true, message: '配送员名称不能为空', trigger: 'blur'}
          ],
          tel: [
            {required: true, message: '配送员手机号不能为空', trigger: 'blur'}
          ],
        },
        columns: [
          {
            title: '序号',
            type: 'index',
          },
          {
            title: '配送员姓名',
            key: 'diliverymanName',
          },
          {
            title: '配送员电话',
            key: 'diliverymanPhone',
          },
          {
            title: '配送员性别',
            key: 'diliverymanSex',
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
//                h('Button', {
//                  props: {
//                    type: 'text',
//                    size: 'small'
//                  },
//                  style: {
//                    marginRight: '5px',
//                    color: '#2d8cf0'
//                  },
//                  on: {
//                    click: () => {
//                      this.show(params.index)
//                    }
//                  }
//                }, '查看'),
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
        this.$ajax.get("/shopInfo/getDiliverymanData/1").then(function (res) {
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
            this.$ajax.post("/shopInfo/deleteDiliveryman", {"id": _id}).then(function (res) {
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
            this.$ajax.post("/shopInfo/addDiliveryman", this.formValidate).then(function (res) {
              if (res.data.error == '0') {
                this.$Message.success('添加成功!');
                this.data.push(res.data.data);
                this.formValidate = {
                  diliverymanName: '',
                  diliverymanPhone: '',
                  diliverymanSex: '男',
                };
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
        this.$ajax.get("/shopInfo/getDiliverymanData/" + index).then(function (res) {
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
