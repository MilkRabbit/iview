<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <Col :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
      <TabPane label="出售中" name="name1">
        <Form ref="formInline" :model="formInline" :label-width="10" inline class="inlineForm" v-if="productState==0">
          <div class="leftFloat">
            <Button @click="addProduct" type="primary">新增商品</Button>
          </div>
          <div class="rightFloat">
            <FormItem prop="goodsName">
              <Input v-model.trim="formInline.goodsName" placeholder="商品名称"></Input>
            </FormItem>
            <FormItem prop="goods">
              <Select v-model="formInline.goodsClassId" placeholder="请选择" style="width: 200px">
                <Option :value="goodsClass._id" :key="index" v-for="(goodsClass,index) in goodsClasses">{{
                  goodsClass.className }}
                </Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="searchSubmit('formInline')" icon="ios-search">搜索</Button>
            </FormItem>
          </div>
        </Form>
        <Table @on-selection-change="selectChange" ref="selection" :columns="columns" :data="data"
               :loading="loading" v-if="productState==0"></Table>
        <div style="margin: 10px 0;overflow: hidden" v-if="productState==0" class="inlineForm">
          <div class="leftFloat">
            <Button type="ghost" @click="changeSort">改分类</Button>
            <Button type="ghost" @click="toUnSale">下架</Button>
            <Button type="ghost" @click="deleteGoods">删除</Button>
          </div>
          <div class="rightFloat">
            <Page :current="1" :total="pageTotal" @on-change="changePage"></Page>
          </div>
        </div>
        <Modal
          v-model="changeSortModel"
          title="修改分类"
          @on-ok="changeSortSubmit" width="300">
          <Select v-model="changedClassId" placeholder="请选择">
            <Option :value="goodsClass._id" :key="index" v-for="(goodsClass,index) in goodsClasses">{{
              goodsClass.className }}
            </Option>
          </Select>
        </Modal>
      </TabPane>
      <TabPane label="已售罄" name="name2">
        <Form ref="formInline" :model="formInline" :label-width="10" inline class="inlineForm" v-if="productState==0">
          <div class="leftFloat">
            <Button @click="addProduct" type="primary">新增商品</Button>
          </div>
          <div class="rightFloat">
            <FormItem prop="goodsName">
              <Input v-model.trim="formInline.goodsName" placeholder="商品名称"></Input>
            </FormItem>
            <FormItem prop="goods">
              <Select v-model="formInline.goodsClassId" placeholder="请选择" style="width: 200px">
                <Option :value="goodsClass._id" :key="index" v-for="(goodsClass,index) in goodsClasses">{{
                  goodsClass.className }}
                </Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="searchSubmit('formInline')" icon="ios-search">搜索</Button>
            </FormItem>
          </div>
        </Form>
        <Table @on-selection-change="selectChange" ref="selection" :columns="columnsEmpty" :data="dataEmpty"
               :loading="loading" v-if="productState==0"></Table>
        <div style="margin: 10px 0;overflow: hidden" v-if="productState==0" class="inlineForm">
          <div class="leftFloat">
            <Button type="ghost" @click="changeSort">改分类</Button>
            <Button type="ghost" @click="deleteGoods">删除</Button>
          </div>
          <div class="rightFloat">
            <Page :current="1" :total="pageTotalEmpty" @on-change="changePage1"></Page>
          </div>
        </div>
      </TabPane>
      <TabPane label="仓库中" name="name3">
        <Form ref="formInline" :model="formInline" :label-width="10" inline class="inlineForm" v-if="productState==0">
          <div class="leftFloat">
            <Button @click="addProduct" type="primary">新增商品</Button>
          </div>
          <div class="rightFloat">
            <FormItem prop="goodsName">
              <Input v-model.trim="formInline.goodsName" placeholder="商品名称"></Input>
            </FormItem>
            <FormItem prop="goods">
              <Select v-model="formInline.goodsClassId" placeholder="请选择" style="width: 200px">
                <Option :value="goodsClass._id" :key="index" v-for="(goodsClass,index) in goodsClasses">{{
                  goodsClass.className }}
                </Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="searchSubmit('formInline')" icon="ios-search">搜索</Button>
            </FormItem>
          </div>
        </Form>
        <Table @on-selection-change="selectChange" ref="selection" :columns="columnsUnder" :data="dataUnder"
               :loading="loading" v-if="productState==0"></Table>
        <div style="margin: 10px 0;overflow: hidden" v-if="productState==0" class="inlineForm">
          <div class="leftFloat">
            <Button type="ghost" @click="changeSort">改分类</Button>
            <Button type="ghost" @click="toSale">上架</Button>
            <Button type="ghost" @click="deleteGoods">删除</Button>
          </div>
          <div class="rightFloat">
            <Page :current="1" :total="pageTotalEmpty" @on-change="changePage1"></Page>
          </div>
        </div>
      </TabPane>
    </Tabs>
    </Col>
  </Row>
  </Col>
</template>
<script>
  import {VueEditor} from 'vue2-editor'
  export default {
    components: {
      VueEditor
    },
    data () {
      return {
        changeSortModel: false,
        selectIdArr: [],
        changedClassId: '',
        productState: 0,
        animated: false,
        formInline: {
          goodsName: '',
          goodsClassId: ''
        },
        htmlForEditor: '',
        formValidate: {
          goodsOrder: '',
          goodsName: '',
          goodsDescribe: '',
          goodsClassId: '',
          costPrice: '',
          price: '',
          goodsUnit: '',
          goodsImgs: [],
          goodsInfo: '',
        },
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '序号',
            width: 70,
            key: 'goodsOrder',
          },
          {
            title: '商品',
            key: 'goodsName',
          },
          {
            title: '分类',
            key: 'goodsSort',
          },
          {
            title: '统计',
            key: 'action',
            width: 200,
            align: 'center',
            render: function (h, params) {
              return h('div', "访问量： " + params.row.readCount);
            }
          },
          {
            title: '库存',
            key: 'stockNum',
          }
          ,
          {
            title: '创建时间',
            key: 'createTime',
          }
          ,
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: function (h, params) {
              var renderCnt = [];
              renderCnt.push(
                h('div', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px',
                      color: '#2d8cf0',
                      cursor: "pointer",
                    },
                    on: {
                      click: ()=> {
                        this.updateServer(params.row._id, params.index)
                      }
                    }
                  }, '编辑')
              );
              renderCnt.push(
              h('Button', {
                props:{type:"text",size:"small"},
                style:{color:"#f90"},
                on:{
                  click: () => {
                    this.groupSend(params.row._id,params.row.goodsName,params.row.price,params.row.linkPhone)
                  }
                }
              }, '推送给用户')
            );
              if (params.row.isRecommend == 0) {
                renderCnt.push(
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
                        this.toRecommend(params.row._id, params.row.isRecommend, params.index)
                      }
                    }
                  }, '设为推荐')
                )
              } else {
                renderCnt.push(
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
                        this.toRecommend(params.row._id, params.row.isRecommend, params.index)
                      }
                    }
                  }, '推荐商品')
                )
              }
              if (params.row.isHot == 0) {
                renderCnt.push(
                  h('Button', {
                      props: {
                        type: 'text',
                        size: 'small'
                      },
                      style: {
                        color: '#2d8cf0',
                        outline:0,
                      },
                      on: {
                        click: ()=> {
                          this.toHot(params.row._id, params.row.isHot, params.index)
                        }
                      }
                    },
                    '设为热销'
                  )
                )
              } else {
                renderCnt.push(
                  h('Button', {
                      props: {
                        type: 'text',
                        size: 'small'
                      },
                      style: {
                        color: '#ed3f14'
                      },
                      on: {
                        click: ()=> {
                          this.toHot(params.row._id, params.row.isHot, params.index)
                        }
                      }
                    },
                    '热销商品'
                  )
                )
              }
              return h('div', renderCnt);
            }.bind(this)
          }
        ],
        columnsEmpty: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '序号',
            width: 70,
            key: 'goodsOrder',
          },
          {
            title: '商品',
            key: 'goodsName',
          },
          {
            title: '分类',
            key: 'goodsSort',
          },
          {
            title: '统计',
            key: 'action',
            width: 200,
            align: 'center',
            render: function (h, params) {
              return h('div', "访问量： " + params.row.readCount);
            }
          },
          {
            title: '库存',
            key: 'stockNum',
          }
          ,
          {
            title: '创建时间',
            key: 'createTime',
          }
          ,
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: function (h, params) {
              var renderCnt = [];
              renderCnt.push(
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
                      click: ()=> {
                        this.updateServer(params.row._id, params.index)
                      }
                    }
                  },
                  '编辑'
                )
              )
              ;
              return h('div', renderCnt);
            }.bind(this)
          }
        ],
        columnsUnder: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '序号',
            width: 70,
            key: 'goodsOrder',
          },
          {
            title: '商品',
            key: 'goodsName',
          },
          {
            title: '分类',
            key: 'goodsSort',
          },
          {
            title: '统计',
            key: 'action',
            width: 200,
            align: 'center',
            render: function (h, params) {
              return h('div', "访问量： " + params.row.readCount);
            }
          },
          {
            title: '库存',
            key: 'stockNum',
          }
          ,
          {
            title: '创建时间',
            key: 'createTime',
          }
          ,
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: function (h, params) {
              var renderCnt = [];
              renderCnt.push(
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
                      click: ()=> {
                        this.updateServer(params.row._id, params.index)
                      }
                    }
                  }, '编辑'),
              )
              ;
              return h('div', renderCnt);
            }.bind(this)
          }
        ],
        data: [],
        dataEmpty: [],
        dataUnder: [],
        pageTotal: 0,
        pageTotalEmpty: 0,
        pageTotalUnder: 0,
        goodsClasses: [],
        defaultList: [],
        imgName: '',
        visible: false,
        uploadList: [],
        loading: false
      }
    },
    created () {
      this.loading = true;
      this.fetchData()
    },
    methods: {
      groupSend(t,e,n,i){
        var l=this,a={type:"商品选购成功通知",templateId:"AT1149",keyword_id_list:[1,2,4],goodsId:t,goodsName:e,price:n,linkPhone:i};this.$ajax.post("/server/groupSend",a).then(function(t){l.loading=!1,"0"==t.data.error?l.$Message.info("发送成功"):"50001"==t.data.error?l.$Message.warning("微信小程序端操作错误"):"3"==t.data.error&&l.$Message.error("服务器不稳定!")}).catch(function(t){console.log("error")})
      },
      fetchData(){
        this.$ajax.get("/server/serverSort").then(function (res) {
          this.goodsClasses = res.data;
        }.bind(this)).catch(function (err) {
          console.log(err)
        });
        this.$ajax.get("/server/server/1/0", {
          params: this.formInline
        }).then(function (res) {
          this.loading = false;
          this.data = res.data.data.data;
          this.pageTotal = res.data.data.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        });
        this.$ajax.get("/server/server/1/1", {
          params: this.formInline
        }).then(function (res) {
          this.loading = false;
          this.dataEmpty = res.data.data.data;
          this.pageTotalEmpty = res.data.data.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        });
        this.$ajax.get("/server/server/1/2", {
          params: this.formInline
        }).then(function (res) {
          this.loading = false;
          this.dataUnder = res.data.data.data;
          this.pageTotalUnder = res.data.data.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        });
      },
      searchSubmit (name) {
        this.current = 1;
        this.$ajax.get("/server/server/1/0", {
          params: this.formInline
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
        this.$ajax.get("/server/server/1/1", {
          params: this.formInline
        }).then(function (res) {
          if (res.data.error == '0') {
            this.loading = false;
            this.dataEmpty = res.data.data.data;
            this.pageTotalEmpty = res.data.data.count;
          } else {
            this.$Message.error('服务器不稳定!');
          }
        }.bind(this)).catch(function (err) {
          console.log(err)
        });
        this.$ajax.get("/server/server/1/2", {
          params: this.formInline
        }).then(function (res) {
          if (res.data.error == '0') {
            this.loading = false;
            this.dataUnder = res.data.data.data;
            this.pageTotalUnder = res.data.data.count;
          } else {
            this.$Message.error('服务器不稳定!');
          }
        }.bind(this)).catch(function (err) {
          console.log(err)
        });
      },
      remove (index) {
        this.$Modal.confirm({
          title: '确认删除',
          content: '<p>确认删除吗?</p>',
          onOk: function () {
            this.$ajax.post("/server/deleteServer", {"id": index}).then(function (res) {
              if (res.data.error == '0') {
                this.$Message.success('删除成功!');
                this.data.splice(index, 1);
              }
            }.bind(this)).catch(function (err) {
              console.log(err)
            })
          }
        })
        ;
      },
      changePage (index) {
        this.$ajax.get("/server/server/" + index+"/0").then(function (res) {
          this.loading = false;
          this.data = res.data.data.data;
          this.pageTotal = res.data.data.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      changePage1 (index) {
        this.$ajax.get("/server/server/" + index+"/1").then(function (res) {
          this.loading = false;
          this.dataEmpty = res.data.data.data;
          this.pageTotalEmpty = res.data.data.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      changePage2 (index) {
        this.$ajax.get("/server/server/" + index+"/2").then(function (res) {
          this.loading = false;
          this.dataUnder = res.data.data.data;
          this.pageTotalUnder = res.data.data.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      handleImageAdded: function (file, Editor, cursorLocation) {
        var formData = new FormData();
        formData.append('image', file)
        this.$ajax({
          url: 'https://staticfiles.xiaochengyun.cn/pic/uploadimages',
          method: 'POST',
          data: formData
        }).then(function (result) {
            let url = result.data.data // Get url from response
            Editor.insertEmbed(cursorLocation, 'image', url);
          }
        ).catch(function (err) {
            console.log(err);
          }
        )
      },
      toHot (id, isHot, index){
        this.$ajax.post("/server/toHot", {
          id: id,
          isHot: isHot
        }).then(function (res) {
          this.loading = false;
          if (res.data.data == 1) {
            this.$Message.info('设置热销成功');
            this.data[index].isHot = res.data.data;
          } else {
            this.$Message.info('取消热销成功');
            this.data[index].isHot = res.data.data;
          }
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      toRecommend (id, isRecommend, index){
        this.$ajax.post("/server/toRecommend", {
          id: id,
          isRecommend: isRecommend
        }).then(function (res) {
          this.loading = false;
          if (res.data.data == 1) {
            this.$Message.info('设置推荐成功');
            this.data[index].isRecommend = res.data.data;
          } else {
            this.$Message.info('取消推荐成功');
            this.data[index].isRecommend = res.data.data;
          }
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      changeSort(){
        if (this.selectIdArr.length > 0) {
          this.changeSortModel = true;
        } else {
          this.$Message.info('未选取任何商品');
        }
      },
      changeSortSubmit(){
        this.$ajax.post("/server/changeSort", {
          selectIdArr: this.selectIdArr,
          changedClassId: this.changedClassId
        }).then(function (res) {
          this.loading = false;
          if (res.data.error == "0") {
            this.$Message.info('修改分类成功');
            setTimeout(function () {
              location.reload()
            }, 500)
          } else {
            this.$Message.error('修改分类失败');
          }
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      toUnSale (){
        if (this.selectIdArr.length > 0) {
          this.$ajax.post("/server/changeUnSale", {
            selectIdArr: this.selectIdArr,
            isUnSale: "1"
          }).then(function (res) {
            this.loading = false;
            if (res.data.error == "0") {
              this.$Message.info('下架商品成功');
              setTimeout(function () {
                location.reload()
              }, 500)
            } else {
              this.$Message.info('下架商品失败');
            }
          }.bind(this)).catch(function (err) {
            console.log(err)
          })
        } else {
          this.$Message.info('未选取任何商品');
        }
      },
      toSale (){
        if (this.selectIdArr.length > 0) {
          this.$ajax.post("/server/changeUnSale", {
            selectIdArr: this.selectIdArr,
            isUnSale: "0"
          }).then(function (res) {
            this.loading = false;
            if (res.data.error == "0") {
              this.$Message.info('上架商品成功');
              setTimeout(function () {
                location.reload()
              }, 500)
            } else {
              this.$Message.info('上架商品失败');
            }
          }.bind(this)).catch(function (err) {
            console.log(err)
          })
        } else {
          this.$Message.info('未选取任何商品');
        }
      },
      deleteGoods(){
        if (this.selectIdArr.length > 0) {
          this.$layer.confirm('确认删除吗?', function () {
              this.$ajax.post("/server/deleteGoods", {
                selectIdArr: this.selectIdArr,
              }).then(function (res) {
                this.loading = false;
                if (res.data.error == "0") {
                  this.$Message.info('删除商品成功');
                  setTimeout(function () {
                    location.reload()
                  }, 500)
                } else {
                  this.$Message.info('删除商品失败');
                }
              }.bind(this)).catch(function (err) {
                console.log(err)
              });
              this.$layer.closeAll()
            }.bind(this)
          );
        } else {
          this.$Message.info('未选取任何商品');
        }
      },
      updateServer(id, index){
        this.$router.push({
          path: '/3-2&product_update',
          name: 'product_update',
          params: {
            id: id,
          }
        })
        this.Lockr.set("goodsId",id)
      },
      addProduct() {
        this.$router.push({
          path: '/3-2&product_new',
          name: 'product_new',
        })
      },
      selectChange(selection){
        for (var i in selection) {
          this.selectIdArr.push(selection[i]._id)
        }
      }
    }
  }
</script>
