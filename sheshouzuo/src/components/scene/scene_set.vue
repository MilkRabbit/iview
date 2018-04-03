<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <Col :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1">
      <TabPane label="场景管理" name="name1">
        <Row class="cnt-des">
          场景指您展示小程序码的地方，如X展架上、业务员的名片上等。您可以为不同场景生成不同的小程序码，虽然小程序码不同，但无论客户扫那个码都能打开您的小程序。<br>
          分场景的目的就是为了便于您统计获取客户的数量，及为业务员计算业绩。
        </Row>
        <Tabs type="card" :animated="animated">
          <TabPane label="展示位" name="1">
            <Button type="primary" style="margin-bottom: 20px" @click="addSceneName">增加展示位</Button>
            <Table :columns="displayColumns" :data="displayData" :loading="displayLoading"></Table>
            <div style="margin: 10px;overflow: hidden">
              <div style="float: right;">
                <Page :current="displayCurrent" :total="displayTotal" @on-change="displayChangePage"></Page>
              </div>
            </div>
            <Modal
              v-model="sceneNameModel"
              title="添加展示位"
              @on-ok="addSceneNamePost">
              <Input v-model="scene" placeholder="请输入展示位名称。例如：X展架" :maxlength="25"></Input>
            </Modal>
          </TabPane>
          <TabPane label="业务员" name="2">
            <Button type="primary" style="margin-bottom: 20px" @click="addSceneMan">增加业务员</Button>
            <Table :columns="salesmanColumns" :data="salesmanData" :loading="salesmanLoading"></Table>
            <div style="margin: 10px;overflow: hidden">
              <div style="float: right;">
                <Page :current="salesmanCurrent" :total="salesmanTotal" @on-change="salesmanChangePage"></Page>
              </div>
            </div>
            <Modal
              v-model="sceneManModel"
              title="添加业务员"
              @on-ok="addSceneManPost">
              <Input v-model="sceneMan" placeholder="请输入业务员姓名" :maxlength="10"></Input>
              <Input v-model="sceneManTel" placeholder="请输入业务员手机号" :maxlength="11" style="margin-top: 20px"></Input>
            </Modal>
          </TabPane>
        </Tabs>
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
        animated: false,
        name: 1,
        displayTotal: 1,
        displayCurrent: 1,
        displayLoading: false,
        displayData: [],
        displayColumns: [
          {
            title: '展示位描述',
            key: 'sceneName',
          },
          {
            title: '3日内获客数',
            key: 'threeDayCount',
          },
          {
            title: '7日内获客数',
            key: 'SevenDayCount',
          },
          {
            title: '总获客数',
            key: 'allDayCount',
          },
          {
            title: '生成时间',
            key: 'createTime',
          },
          {
            title: '操作',
            key: 'action',
            width: 250,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('a', {attrs: {href: params.row.url, style: 'color:#2d8cf0;display:inline-block;position:relative;top:2px;margin-right:3px'}}, '小程序码'),
//                h('Button', {
//                  props: {
//                    type: 'text',
//                    size: 'small'
//                  },
//                  style: {
//                    color: '#2d8cf0',
//                  },
//                  on: {
//                    click: () => {
//                      this.show(params.index)
//                    }
//                  }
//                }, '客户信息'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#2d8cf0',
                  },
                  on: {
                    click: () => {
                      this.displayRemove(params.row._id,params.index)
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
        salesmanTotal: 1,
        salesmanCurrent: 1,
        salesmanLoading: false,
        salesmanData: [],
        salesmanColumns: [
          {
            title: '姓名',
            key: 'sceneMan',
          },
          {
            title: '电话',
            key: 'sceneManTel',
          },
          {
            title: '3日内获客数',
            key: 'threeDayCount',
          },
          {
            title: '7日内获客数',
            key: 'SevenDayCount',
          },
          {
            title: '总获客数',
            key: 'allDayCount',
          },
          {
            title: '生成时间',
            key: 'createTime',
          },
          {
            title: '操作',
            key: 'action',
            width: 250,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('a', {attrs: {href: params.row.url, style: 'color:#2d8cf0;display:inline-block;position:relative;top:2px;margin-right:3px'}}, '小程序码'),
//                h('Button', {
//                  props: {
//                    type: 'text',
//                    size: 'small'
//                  },
//                  style: {
//                    color: '#2d8cf0',
//                  },
//                  on: {
//                    click: () => {
//                      this.show(params.index)
//                    }
//                  }
//                }, '客户信息'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#2d8cf0',
                  },
                  on: {
                    click: () => {
                      this.salemanRemove(params.row._id,params.index)
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
        sceneNameModel: false,
        scene: '',
        sceneManModel: false,
        sceneMan: '',
        sceneManTel: ''
      }
    },
    created () {
      this.loading = true;
      this.fetchData()
    },
    methods: {
      fetchData(){
        this.$ajax.get("/marketing/scene/1/0").then(function (res) {
          this.loading = false;
          this.displayData = res.data.displayData.data;
          this.displayTotal = res.data.displayData.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        });
        this.$ajax.get("/marketing/scene/1/1").then(function (res) {
          this.loading = false;
          this.salesmanData = res.data.salesmanData.data;
          this.salesmanTotal = res.data.salesmanData.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      addSceneName(){
        this.sceneNameModel = true;
      },
      addSceneNamePost(){
        if (this.scene.trim() == "") {
          this.$Message.info('请先填写展示位描述!');
        } else {
          this.$ajax.post("/marketing/scene", {
            scene: this.scene,
          }).then(function (res) {
            console.log(res)
            if (res.data.error == '0') {
              let data = res.data;
              this.$Message.success('添加展示位成功!');
              this.displayData.push({
                _id: data._id,
                url: data.url,
                sceneName: data.sceneName,
                createTime: data.createTime,
                'threeDayCount': 0,
                'SevenDayCount': 0,
                'allDayCount': 0,
              });
              this.scene = ''
            } else if (res.data.error == '1') {
              this.$Message.error('展示位描述重复，请重新输入!');
            } else {
              this.$Message.error('服务器出错，请稍后重试!');
            }
          }.bind(this)).catch(function (err) {
            console.log(err)
          });
        }
      },
      addSceneMan(){
        this.sceneManModel = true;
      },
      addSceneManPost(){
        if (this.sceneMan == "" || this.sceneManTel == "") {
          this.$Message.info('请先填写业务员姓名和电话!');
        } else if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.sceneManTel))) {
          this.$Message.info('请输入正确的手机号!');
        } else
          this.$ajax.post("/marketing/scene", {
            sceneMan: this.sceneMan,
            sceneManTel: this.sceneManTel,
          }).then(function (res) {
            console.log(res)
            if (res.data.error == '0') {
              let data = res.data;
              this.$Message.success('添加业务员成功!');
              this.salesmanData.push({
                _id: data._id,
                url: data.url,
                sceneMan: data.sceneMan,
                sceneManTel: data.sceneManTel,
                createTime: data.createTime,
                'threeDayCount': 0,
                'SevenDayCount': 0,
                'allDayCount': 0,
              });
              this.sceneMan = ''
              this.sceneManTel = ''
            } else if (res.data.error == '1') {
              this.$Message.error('业务员信息重复，请重新输入!');
            } else {
              this.$Message.error('服务器出错，请稍后重试!');
            }
          }.bind(this)).catch(function (err) {
            console.log(err)
          });
      },
      displayRemove (id, index) {
        this.$Modal.confirm({
          title: '确认删除',
          content: '<p>确认删除吗?</p>',
          onOk: function(){
            this.$ajax.post("/marketing/deleteScene", {"id": id}).then(function (res) {
              if (res.data.error == '0') {
                this.$Message.success('删除成功!');
                this.displayData.splice(index, 1);
              }
            }.bind(this)).catch(function (err) {
              console.log(err)
            })
          }.bind(this)
        });
      },
      salemanRemove (id, index) {
        this.$Modal.confirm({
          title: '确认删除',
          content: '<p>确认删除吗?</p>',
          onOk: function(){
            this.$ajax.post("/marketing/deleteScene", {"id": id}).then(function (res) {
              if (res.data.error == '0') {
                this.$Message.success('删除成功!');
                this.salesmanData.splice(index, 1);
              }
            }.bind(this)).catch(function (err) {
              console.log(err)
            })
          }.bind(this)
        });
      },
      displayChangePage(index){
        this.$ajax.get("/marketing/scene/"+index+"/0").then(function (res) {
          this.loading = false;
          this.displayData = res.data.displayData.data;
          this.displayTotal = res.data.displayData.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      salesmanChangePage(index){
        this.$ajax.get("/marketing/scene/"+index+"/1").then(function (res) {
          this.loading = false;
          this.salesmanData = res.data.salesmanData.data;
          this.salesmanTotal = res.data.salesmanData.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      }
    },
  }
</script>
