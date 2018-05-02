<style>
  .demo-tabs-style1 {
    width: 100%;
  }

  .demo-tabs-style1 .ivu-tabs-tab {
    margin: 10px 0px;
  }
  .adduser{
    margin-bottom: 10px;
  }
  .adduser label{
    display: inline-block;
    width: 80px;
    margin-left: 30px;
  }
</style>
<template>
  <i-col :md="19" :sm="18" :xs="22">
    <Row type="flex">
      <i-col span="22" offset="1">
        <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
          <TabPane label="管理员管理" name="name1">
            <div style="margin: 10px;overflow: hidden">
              <Table border :columns="columns" :data="data" :loading="loading" :border=false style="margin: 15px 0"></Table>
              <div style="float: right;">
                <Page :current="current" :total="pageTotal" @on-change="changePage"></Page>
              </div>
            </div>
          </TabPane>
          <TabPane label="添加管理人员" name="name2">
            <Modal
              v-model="modal8"
              title="修改权限"
              @on-ok="changePower">
              <div class="adduser">
                <!--<label>姓名：</label>-->
                <CheckboxGroup v-model="power">
                  <Checkbox :value="item.rolePower" :key="index" v-for="(item,index) in userPower"  :label="item.rolePower">{{item.roleName}}</Checkbox>
                </CheckboxGroup>
                <!--<Input v-model="userName" placeholder="请输入姓名" style="width: 320px"></Input>-->
              </div>
            </Modal>

            <Form ref="addAdmin" :model="addAdmin"  :label-width="80">
                <FormItem label="用户名" prop="userName">
                  <Input v-model="addAdmin.userName" placeholder="请输入"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                  <Input v-model="addAdmin.password" placeholder="请输入" type="password"></Input>
                </FormItem>
                <FormItem label="用户权限" prop="rolePower">
                  <CheckboxGroup v-model="addAdmin.rolePower" :value="item.rolePower" :key="index" v-for="(item,index) in userPower" >
                    <Checkbox :label="item.rolePower">{{item.roleName}}</Checkbox>
                  </CheckboxGroup>
                </FormItem>
                <FormItem style="margin-left: 20px;">
                  <Button type="primary" @click="addUser('addAdmin')">确定</Button>
                </FormItem>
            </Form>
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
        id:'',
        modal8:false,
        power:[],

        userPower:[],
        totalData:[],
        animated: false,

        addAdmin:{
          userName:'',
//          phone:'',
          rolePower:[],
        },

        columns: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '用户名',
            key: 'userName',
          },
          {
            title: '权限',
            key: 'rolePower',
            render: (h, params) => {
              return h('div',[
                h('div', this.data[params.index].power.map(item => {
                  return h('span',item+'  ')
                }))
              ])
            }
          },
          {
            title: '加入时间',
            key: 'createTime',
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              if((params.row.rolePower.length==1)&&(params.row.rolePower[0]==1)){
                return h('div');
              }else {
                return h('div', [
                  h('Button', {
                    props: {
                      size: 'small'
                    },
                    attrs:{
                      style: 'color:#f90;border:0;background:none'
                    },
                    on: {
                      click: () => {

                        this.modal8 = true;
                        this.id = params.row._id;
//                      this.rePass(params.row._id)
                      }
                    }
                  }, '修改权限'),
                  h('Button', {
                    props: {
                      size: 'small'
                    },
                    attrs: {
                      style: 'color:#ed3f14;border:0;background:none'
                    },
                    on: {
                      click: () => {
                        this.remove(params.row._id,params.index)
                      }
                    }
                  }, '删除')
                ]);
              }

            }
          },
        ],
        data: [],
        pageTotal: 0,
        loading: false,
        current: 1,
      }
    },
    created () {
//      this.loading = true;
      this.fetchData()
    },
    methods: {
      addUser () {
        var that=this;
          if(this.addAdmin.userName==''){
            this.$Message.error('请填写用户名');
            return false;
          }
          if(this.addAdmin.password==''){
            this.$Message.error('请填写密码');
            return false;
          }
          if(this.addAdmin.rolePower.length==0){
            this.$Message.error('请选择用户权限');
            return false;
          }
          this.$ajax.post("user/addAdmin",this.addAdmin).then(function(res){
            if (res.data.error == '0') {
              that.$Message.success('添加成功!');
              location.reload()
            }else if (res.data.error == '10001') {
              that.$Message.error('该用户名已存在');
            }else {
              that.$Message.error('请重试')
            }
          })
            .catch(function(err){
              console.log(err);
            })
      },
      fetchData(){
        let that = this;
        /*获取用户权限*/
        this.$ajax.get("/user/rolePower").then(function (res) {
          that.userPower=res.data.data
        }).catch(function (err) {
          console.log("error")
        })
//        //获取用户表格
        this.$ajax.get("/user/getUser/1").then(function (res) {
          if(res.data=='noData'){
            window.location.href='https://sheshouzuo.mengotech.com'
          }
          that.loading = false;
          that.data = res.data.data.data;
          that.pageTotal = res.data.data.count;
        }).catch(function (err) {
          console.log("error")
        })
      },
      changePage (index) {
        this.current = index;
        let that = this;
        this.$ajax.get("/user/getUser/" + index).then(function (res) {
          that.loading = false;
          that.data = res.data.data.data;
          that.pageTotal = res.data.data.count;
        }).catch(function (err) {
          console.log("error")
        })
      },
      changePower(){
        let that = this;
        this.$ajax.post("/user/changePower", {
          _id: this.id,
          rolePower:this.power,
        }).then(function (res) {
          if (res.data.error == '0') {
            that.$Message.success('修改成功!');
            that.fetchData()
          }if (res.data.error == '3') {
            that.$Message.error('数据库操作失败!');
          }
        }).catch(function (err) {
          console.log("error")
        })
      },
      remove (id,index) {
        let that = this;
        this.$Modal.confirm({
          title: '确认删除',
          content: '<p>确认删除吗?</p>',
          onOk: () => {
            this.$ajax.post("/user/delUser", {"id": id}).then(function (res) {
              console.log(res.data)
              if (res.data.error == '0') {
                that.$Message.success('删除成功!');
                that.data.splice(index, 1);
                that.fetchData()
              }else if(res.data.error == '3'){
                that.$Message.error('请重试!');
              }
            }).catch(function (err) {
              console.log("error")
            })
          }
        });
      },
    }
  }
</script>
