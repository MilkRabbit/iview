<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <Col :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1">
      <TabPane label="评价管理" name="name1">
        <Form ref="evaluationSearch" :model="evaluationSearch" :label-width="80" inline>
          <FormItem label="评价等级：">
            <Select class="inline-select" style="width: 200px" v-model="evaluationSearch.searchCommentGrade">
              <Option value="0">全部</Option>
              <Option value="1">好评</Option>
              <Option value="2">中评</Option>
              <Option value="3">差评</Option>
            </Select>
          </FormItem>
          <FormItem label="状态：">
            <Select class="inline-select" style="width: 200px" v-model="evaluationSearch.searchIsReply">
              <Option value="2">全部</Option>
              <Option value="0">未回复</Option>
              <Option value="1">已回复</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="searchSubmit('evaluationSearch')">筛选</Button>
          </FormItem>
        </Form>
        <Table :columns="evaluationColumns" :data="evaluationData" :loading="loading"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :current="current" :total="total" @on-change="changePage"></Page>
          </div>
        </div>
        <Modal
          v-model="replyModel"
          title="回复"
          @on-ok="replySubmit" width="300">
          <Input v-model.trim="replyCnt" placeholder="请输入回复内容"></Input>
        </Modal>
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
        replyModel:false,
        replyCnt:'',
        current:1,
        total:1,
        animated: false,
        evaluationSearch: {
          searchIsReply:'2',
          searchCommentGrade:'0'
        },
        loading:false,
        evaluationData:[],
        evaluationColumns:[
          {
            title: '商品图片',
            key: 'action',
            render: function (h, params){
              var renderCnt = [];
              if(params.row.goodsImg){
                renderCnt.push(h('img',{attrs: {src: params.row.goodsImg, style: 'margin:10px 0;width: 60px;height:60px;float:left'}}))
              }
              renderCnt.push(h('div',{style:'float:left;marginLeft:10px;marginTop:10px'},params.row.goodsName));
              return h('div', renderCnt);
            }
          },
          {
            title: '客户头像',
            key: 'action',
            render: function (h, params){
              if(params.row.isAnonymous==0){
                var renderCnt = [];
                renderCnt.push(h('img',{attrs: {src: params.row.avatarUrl, style: 'width: 30px;height:30px;float:left'}}))
                renderCnt.push(h('div',{style:'float:left;marginTop:10px'},params.row.nickName));
                return h('div', renderCnt);
              }else {
                return h('div', '匿名')
              }

            }
          },
          {
            title: '评价内容',
            key: 'action',
            render: function (h, params){
              var renderCnt = [];
              for(var i in params.row.commentImg){
                if(params.row.commentImg[i]!=''){
                  renderCnt.push(h('img',{attrs: {src: params.row.commentImg[i], style: 'width: 50px;height:50px;margin:5px'}}))
                }
              }
              renderCnt.push(h('div',{style:{}},params.row.commentText));
              if(params.row.isReply==1){
                renderCnt.push(h('div',{style:{}},"商家回复："+ params.row.replyContent));
              }else {
                renderCnt.push(h('Button', {props: {type: 'text', size: 'small'}, style: { color: '#2d8cf0'}, on: {click: function() {this.reply(params.row._id, params.index)}.bind(this)}}, '回复'));
              }
              return h('div', renderCnt);
            }.bind(this)
          },
          {
            title: '评价等级/时间',
            key: 'action',
            render: function (h, params){
              var renderCnt = [];
              switch (parseInt(params.row.commentGrade)){
                case 0:
                  renderCnt.push(h('div',params.row.createTime));
                  break;
                case 1:
                  renderCnt.push(h('img', {attrs: {src: "static/images/commentlv.png", style: 'width: 20px;height:20px'}}));
                  renderCnt.push(h('div',params.row.createTime));
                  break;
                case 2:
                  renderCnt.push(h('img', {attrs: {src: "static/images/commentlv.png", style: 'width: 20px;height:20px'}}));
                  renderCnt.push(h('img', {attrs: {src: "static/images/commentlv.png", style: 'width: 20px;height:20px'}}));
                  renderCnt.push(h('div',params.row.createTime));
                  break;
                case 3:
                  renderCnt.push(h('img', {attrs: {src: "static/images/commentlv.png", style: 'width: 20px;height:20px'}}));
                  renderCnt.push(h('img', {attrs: {src: "static/images/commentlv.png", style: 'width: 20px;height:20px'}}));
                  renderCnt.push(h('img', {attrs: {src: "static/images/commentlv.png", style: 'width: 20px;height:20px'}}));
                  renderCnt.push(h('div',params.row.createTime));
                  break;
                case 4:
                  renderCnt.push(h('img', {attrs: {src: "static/images/commentlv.png", style: 'width: 20px;height:20px'}}));
                  renderCnt.push(h('img', {attrs: {src: "static/images/commentlv.png", style: 'width: 20px;height:20px'}}));
                  renderCnt.push(h('img', {attrs: {src: "static/images/commentlv.png", style: 'width: 20px;height:20px'}}));
                  renderCnt.push(h('img', {attrs: {src: "static/images/commentlv.png", style: 'width: 20px;height:20px'}}));
                  renderCnt.push(h('div',params.row.createTime));
                  break;
                case 5:
                  renderCnt.push(h('img', {attrs: {src: "static/images/commentlv.png", style: 'width: 20px;height:20px'}}));
                  renderCnt.push(h('img', {attrs: {src: "static/images/commentlv.png", style: 'width: 20px;height:20px'}}));
                  renderCnt.push(h('img', {attrs: {src: "static/images/commentlv.png", style: 'width: 20px;height:20px'}}));
                  renderCnt.push(h('img', {attrs: {src: "static/images/commentlv.png", style: 'width: 20px;height:20px'}}));
                  renderCnt.push(h('img', {attrs: {src: "static/images/commentlv.png", style: 'width: 20px;height:20px'}}));
                  renderCnt.push(h('div',params.row.createTime));
                  break;
              }
              return h('div', renderCnt);
            }
          },
        ],
      }
    },
    created () {
      this.loading = true;
      this.fetchData()
    },
    methods: {
      fetchData(){
        this.$ajax.get("/admin/getCommentData/1",{
          params:this.evaluationSearch
        }).then(function (res) {
          this.loading = false;
          this.evaluationData = res.data.data.data;
          this.total = res.data.data.count;
          console.log(this.evaluationData)
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      changePage (index) {
        this.current = index;
        this.$ajax.get("/admin/getCommentData/" + index,{
          params:this.evaluationSearch
        }).then(function (res) {
          this.loading = false;
          this.data = res.data.data.data;
          this.total = res.data.data.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      reply(_id,index){
        this.replyModel = true;
        this.Lockr.set("commentId",_id);
        this.Lockr.set("commentIndex",index);
      },
      replySubmit(){
        this.$ajax.post("/admin/reply",{
          id:this.Lockr.get("commentId"),
          replyCnt:this.replyCnt
        }).then(function (res) {
          if (res.data.error == "0") {
            this.$Message.info('商家回复成功');
            setTimeout(function () {
              location.reload()
            }, 500)
            this.Lockr.rm("commentId");
          } else {
            this.$Message.error('商家回复失败');
          }
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      searchSubmit(){
        this.$ajax.get("/admin/getCommentData/1",{
          params:this.evaluationSearch
        }).then(function (res) {
          this.loading = false;
          this.evaluationData = res.data.data.data;
          this.total = res.data.data.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
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
