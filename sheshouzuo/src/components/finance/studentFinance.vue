
<template>
  <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
        <Form ref="companySearch" :model="demandSearch" :label-width="100" inline>
          <FormItem label="学生姓名：">
            <Input v-model.trim="demandSearch.studentName" placeholder="请输入"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="searchSubmit('demandSearch')">筛选</Button>
            <Button type="ghost" @click="resetSubmit('demandSearch')">清空筛选条件</Button>
          </FormItem>
        </Form>
        <Table :columns="userColumns" :data="data" :loading="loading"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :current="1" :total="pageTotal" @on-change="changePage"></Page>
          </div>
        </div>
  </Tabs>
</template>
<script>
  import addFinance from '@/components/finance/addFinance.vue'
  export default {
    components: {
      addFinance
    },
    data () {
      return {
        animated:false,
        demandSearch: {
          studentName:'',
//          time:[],
//          itemTime:[]
        },
        index:0,
        _id:'',
        loading:false,
        pageTotal:0,
        data:[],
        userColumns:[
          {
            title: '学生姓名',
            key: 'studentName',
          },
          {
            title: '学生电话',
            key: 'studentPhone',
          },
          {
            title: '项目名称',
            key: 'itemName',
          },
          {
            title: '学生收入',
            key: 'toStudent',
          },
          {
            title: '录入时间',
            key: 'createTime',
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
      getData(){
        this.$ajax.get("/finance/studentFinance/1").then(function (res) {
          console.log(res.data)
          this.loading = false;
          this.data = res.data.data.data;
          this.pageTotal = res.data.data.count;
          this.totalAmount = res.data.data.total;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      searchSubmit (name) {
        this.$ajax.get("/finance/studentFinance/1", {
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
          studentName:'',
//          time:[],
//          itemTime:[]
        }
      },
      changePage (index) {
        this.$ajax.get("/finance/studentFinance/" + index, {
          params: this.demandSearch
        }).then(function (res) {
          this.loading = false;
          this.data = res.data.data.data;
          this.pageTotal = res.data.data.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
    }
  }
</script>
