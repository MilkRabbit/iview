<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <Col :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1">
      <TabPane label="客户管理" name="name1">
        <Form ref="userSearch" :model="userSearch" :label-width="100" inline>
          <FormItem label="微信昵称：">
            <Input v-model.trim="userSearch.userName" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="手机号：">
            <Input v-model.trim="userSearch.tel" placeholder="请输入"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="searchSubmit('userSearch')">筛选</Button>
            <Button type="ghost" @click="resetSubmit('userSearch')">清空筛选条件</Button>
          </FormItem>
        </Form>
        <Table :columns="userColumns" :data="userData" :loading="loading"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :current="userCurrent" :total="userTotal" @on-change="userChangePage"></Page>
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
        animated: false,
        userSearch: {
          userName:'',
          tel:''
        },
        loading:false,
        userData:[],
        userColumns:[
          {
            title: '客户信息',
            key: 'goodsName',
          },
          {
            title: '手机号码',
            key: 'goodsPrice',
          },
          {
            title: '地区',
            key: 'buyNum',
          },
          {
            title: '购买次数',
            key: 'finalPrice',
          },
          {
            title: '积分',
            key: 'finalPrice',
          },
          {
            title: '来源',
            key: 'finalPrice',
          },
          {
            title: '客户身份',
            key: 'finalPrice',
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
                    color: '#2d8cf0'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '给积分'),
              ]);
            }
          }
        ],
        userTotal:1,
        userCurrent: 1,
      }
    },
    created () {
    },
    methods: {
      show (index) {
        this.$Modal.info({
          title: '分类信息',
          content: `分类名：${this.data[index].className}`
        })
      },
      getName (name) {
        console.log(name)
        this.name = name
      },
      remove (_id, index) {
        let that = this;
        this.$Modal.confirm({
          title: '确认删除',
          content: '<p>确认删除吗?</p>',
          onOk: () => {
            this.$ajax.post("/server/deleteServerSort", {"id": _id}).then(function (res) {
              console.log(res)
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
    }
  }
</script>
