<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <Col :lg="21">
  <Row type="flex" justify="center" align="top">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
      <TabPane label="满减" name="name1">
        <Form ref="fullCut" :model="fullCut" :rules="fullCutRuleValidate" :label-width="80">
          <Row>
            <Col :lg="10">
            <FormItem label="活动时间" prop="time">
              <DatePicker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 200px"
                          v-model="fullCut.time"></DatePicker>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :lg="6">
            <FormItem label="优惠门槛" prop="full">
              <Input v-model="fullCut.full" placeholder="请输入优惠门槛">
              <span slot="prepend">满</span>
              <span slot="append">元</span>
              </Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :lg="6">
            <FormItem label="优惠价格" prop="cut">
              <Input v-model="fullCut.cut" placeholder="请输入优惠价格">
              <span slot="prepend">减</span>
              <span slot="append">元</span>
              </Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :lg="10">
            <FormItem>
              <Button type="primary" @click="fullCutSubmit('fullCut')">提交</Button>
              <Button type="ghost" @click="handleReset('fullCut')" style="margin-left: 8px">重置</Button>
            </FormItem>
            </Col>
          </Row>
        </Form>
        <Table border :columns="fullCutColumns" :data="fullCutData" :loading="loading"></Table>
      </TabPane>
      <TabPane label="满赠" name="name2">
        <Form ref="fullFree" :model="fullFree" :rules="fullFreeRuleValidate" :label-width="80">
          <Row>
            <Col :lg="10">
            <FormItem label="活动时间" prop="time">
              <DatePicker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 200px"
                          v-model="fullFree.time"></DatePicker>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :lg="6">
            <FormItem label="优惠门槛" prop="full">
              <Input v-model="fullFree.full" placeholder="请输入优惠门槛">
              <span slot="prepend">满</span>
              <span slot="append">元</span>
              </Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :lg="6">
            <FormItem label="赠品信息" prop="cut">
              <Input v-model="fullFree.cut" placeholder="请输入赠品信息">
              </Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :lg="10">
            <FormItem>
              <Button type="primary" @click="fullFreeSubmit('fullFree')">提交</Button>
              <Button type="ghost" @click="handleReset('fullFree')" style="margin-left: 8px">重置</Button>
            </FormItem>
            </Col>
          </Row>
        </Form>
        <Table border :columns="fullFreeColumns" :data="fullFreeData" :loading="loading"></Table>
      </TabPane>
      <TabPane label="代金券" name="name3">
        <Form ref="voucher" :model="voucher" :rules="voucherRuleValidate" :label-width="80">
          <Row>
            <Col :lg="10">
            <FormItem label="活动时间" prop="time">
              <DatePicker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 200px"
                          v-model="voucher.time"></DatePicker>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :lg="10">
            <FormItem label="使用时间" prop="useTime">
              <DatePicker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 200px"
                          v-model="voucher.useTime"></DatePicker>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :lg="6">
            <FormItem label="优惠门槛" prop="full">
              <Input v-model="voucher.full" placeholder="请输入优惠门槛">
              <span slot="prepend">满</span>
              <span slot="append">元</span>
              </Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :lg="6">
            <FormItem label="代金券" prop="cut">
              <Input v-model="voucher.cut" placeholder="请输入代金券">
              <span slot="prepend">送</span>
              <span slot="append">元</span>
              </Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :lg="10">
            <FormItem>
              <Button type="primary" @click="voucherSubmit('voucher')">提交</Button>
              <Button type="ghost" @click="handleReset('voucher')" style="margin-left: 8px">重置</Button>
            </FormItem>
            </Col>
          </Row>
        </Form>
        <Table border :columns="voucherColumns" :data="voucherData" :loading="loading"></Table>
      </TabPane>
      <TabPane label="海报小程序码" name="name4">
        <div class="list">
          <div style="margin-bottom: 10px">
            <router-link to="/poster">
              <Button type="info">新建海报</Button>
            </router-link>
          </div>
          <div>
            <Form ref="poster" :model="poster" :rules="posterRuleValidate" :label-width="120">
              <Row>
                <Col :lg="8">
                <FormItem label="设置海报分销比例" prop="distribution">
                  <Input v-model="poster.distribution" placeholder="请填写1~99的数字" style="width: 120px;margin-right: 5px"></Input>%
                </FormItem>
                </Col>
                <Col :lg="10">
                <FormItem>
                  <Button type="primary" @click="posterSubmit('poster')">提交</Button>
                </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
          <Table :data="posterData" :columns="posterColumns" :loading="loading"></Table>
          <Modal title="查看图片" v-model="showposter">
            <img :src=postersrc v-if="showposter" style="width: 100%">
          </Modal>
        </div>
      </TabPane>
    </Tabs>
    </Col>
  </Row>
  </Col>
</template>

<script>
  import Qs from 'qs'
  export default {
    data () {
      return {
        postersrc: '',
        showposter: false,
        animated: false,
        fullCut: {
          time: '',
          full: '',
          cut: ''
        },
        fullCutRuleValidate: {
          time: [
            {required: true, type: 'array', message: '活动时间不能为空', trigger: 'blur', min: 2}
          ],
          full: [
            {required: true, message: '优惠门槛不能为空', trigger: 'blur'}
          ],
          cut: [
            {required: true, message: '优惠价格不能为空', trigger: 'blur'}
          ],
        },
        fullCutColumns: [
          {
            title: '活动开始时间',
            key: 'startTime',
          },
          {
            title: '活动结束时间',
            key: 'endTime',
          },
          {
            title: '优惠门槛',
            key: 'full',
          },
          {
            title: '优惠价格',
            key: 'cut',
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
                    color: '#ed3f14'
                  },
                  on: {
                    click: () => {
                      this.fullCutRemove(params.row._id, params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        fullCutData: [],
        fullFree: {
          time: '',
          full: '',
          Cnt: ''
        },
        fullFreeRuleValidate: {
          time: [
            {required: true, message: '活动时间不能为空', trigger: 'blur', type: 'array', min: 2}
          ],
          full: [
            {required: true, message: '优惠门槛不能为空', trigger: 'blur'}
          ],
          cut: [
            {required: true, message: '优惠价格不能为空', trigger: 'blur'}
          ],
        },
        fullFreeColumns: [
          {
            title: '活动开始时间',
            key: 'startTime',
          },
          {
            title: '活动结束时间',
            key: 'endTime',
          },
          {
            title: '优惠门槛',
            key: 'full',
          },
          {
            title: '赠品信息',
            key: 'cut',
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
                    color: '#ed3f14'
                  },
                  on: {
                    click: () => {
                      this.fullCutRemove(params.row._id, params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        fullFreeData: [],
        voucher: {
          time: '',
          useTime: '',
          full: '',
          cut: ''
        },
        voucherRuleValidate: {
          time: [
            {required: true, message: '活动时间不能为空', trigger: 'blur', type: 'array', min: 2}
          ],
          useTime: [
            {required: true, message: '使用时间不能为空', trigger: 'blur', type: 'array', min: 2}
          ],
          full: [
            {required: true, message: '优惠门槛不能为空', trigger: 'blur'}
          ],
          cut: [
            {required: true, message: '优惠价格不能为空', trigger: 'blur'}
          ],
        },
        voucherColumns: [
          {
            title: '活动开始时间',
            key: 'startTime',
          },
          {
            title: '活动结束时间',
            key: 'endTime',
          },
          {
            title: '使用时间',
            key: 'useStartTime',
          },
          {
            title: '使用时间',
            key: 'useEndTime',
          },
          {
            title: '优惠门槛（元）',
            key: 'full',
          },
          {
            title: '金额（元）',
            key: 'cut',
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
                    color: '#ed3f14'
                  },
                  on: {
                    click: () => {
                      this.voucherRemove(params.row._id, params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        voucherData: [],
        poster: {
          distribution:''
        },
        posterRuleValidate: {
          distribution: [
            {required: true, message: '分销比例不能为空', trigger: 'blur'}
          ],
        },
        posterData: [],
        posterColumns: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '海报缩略图',
            key: 'marketCnt',
            render: (h, params) => {
              return h('img', {
                attrs: {
                  src: params.row.marketCnt, style: 'width: 80px;box-shadow:0 0 5px #bbb;cursor: pointer;'
                },
                on: {
                  click: () => {
                    this.proview(params.row.marketCnt)
                  }
                }
              });
            }
          },
          {
            title: '海报创建时间',
            key: 'createTime',
          },
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              if (params.row.marketState == 1) {
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
                      this.posterStatus(params.row._id, params.row.marketState, params.index)
                  }
              }
              }, '开启'),
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
                        this.posterRemove(params.row._id, params.index)
                      }
                    }
                  }, '删除')
                ])
              } else {
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
                      this.posterStatus(params.row._id, params.row.marketState, params.index)
                  }
              }
              }, '关闭'),
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
                        this.posterRemove(params.row._id, params.index)
                      }
                    }
                  }, '删除')
                ])
              }
            }
          }
        ],
        loading: false
      }
    },
    created () {
      this.fetchData();
      this.loading = true;
    },
    methods: {
      fetchData() {
        let that = this;
        this.$ajax.get("/marketing/myActivity").then(function (res) {
          that.loading = false;
          that.fullCutData = res.data.data.fullCut;
          that.fullFreeData = res.data.data.fullFree;
          that.voucherData = res.data.data.voucher;
          that.posterData = res.data.data.poster;
          that.poster.distribution=res.data.data.distribution
        }).catch(function (err) {
          console.log("error")
        })
      },
      fullCutSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let that = this;
            this.$ajax.post("/marketing/addFullCut", Qs.stringify(this.fullCut)).then(function (res) {
              if (res.data.error == '0') {
                that.$Message.success('添加成功!');
                that.fullCutData.push(res.data.data);
                that.handleReset(name)
              } else if (res.data.error == '1') {
                that.$Message.warning('满减活动重复!');
              } else if (res.data.error == '3') {
                that.$Message.error('服务器不稳定!');
              }
            }).catch(function (err) {
              console.log(err)
            })
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      fullCutRemove(_id, index) {
        let that = this;
        this.$Modal.confirm({
          title: '确认删除',
          content: '<p>确认删除吗?</p>',
          onOk: () => {
            this.$ajax.post("/marketing/deleteFullCut", {"id": _id}).then(function (res) {
              if (res.data.error == '0') {
                that.$Message.success('删除成功!');
                that.fullCutData.splice(index, 1);
              }
            }).catch(function (err) {
              console.log("error")
            })
          }
        });
      },
      fullFreeSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let that = this;
            this.$ajax.post("/marketing/addFullFree", Qs.stringify(this.fullFree)).then(function (res) {
              if (res.data.error == '0') {
                that.$Message.success('添加成功!');
                that.fullFreeData.push(res.data.data);
                that.handleReset(name)
              } else if (res.data.error == '1') {
                that.$Message.warning('满赠活动重复!');
              } else if (res.data.error == '3') {
                that.$Message.error('服务器不稳定!');
              }
            }).catch(function (err) {
              console.log(err)
            })
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      fullFreeRemove(_id, index) {
        let that = this;
        this.$Modal.confirm({
          title: '确认删除',
          content: '<p>确认删除吗?</p>',
          onOk: () => {
            this.$ajax.post("/marketing/deleteFullFree", {"id": _id}).then(function (res) {
              if (res.data.error == '0') {
                that.$Message.success('删除成功!');
                that.fullFreeData.splice(index, 1);
              }
            }).catch(function (err) {
              console.log("error")
            })
          }
        });
      },
      voucherSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let that = this;
            this.$ajax.post("/marketing/addVoucher", Qs.stringify(this.voucher)).then(function (res) {
              if (res.data.error == '0') {
                that.$Message.success('添加成功!');
                that.voucherData.push(res.data.data);
                that.handleReset(name)
              } else if (res.data.error == '1') {
                that.$Message.warning('代金券重复!');
              } else if (res.data.error == '3') {
                that.$Message.error('服务器不稳定!');
              }
            }).catch(function (err) {
              console.log(err)
            })
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      voucherRemove(_id, index) {
        let that = this;
        this.$Modal.confirm({
          title: '确认删除',
          content: '<p>确认删除吗?</p>',
          onOk: () => {
            this.$ajax.post("/marketing/deleteVoucher", {"id": _id}).then(function (res) {
              if (res.data.error == '0') {
                that.$Message.success('删除成功!');
                that.voucherData.splice(index, 1);
              }
            }).catch(function (err) {
              console.log("error")
            })
          }
        });
      },
      posterRemove(_id, index) {
        let that = this;
        this.$Modal.confirm({
          title: '确认删除',
          content: '<p>确认删除吗?</p>',
          onOk: () => {
            this.$ajax.post("/marketing/deletePoster", {"id": _id}).then(function (res) {
              if (res.data.error == '0') {
                that.$Message.success('删除成功!');
                that.posterData.splice(index, 1);
              }
            }).catch(function (err) {
              console.log("error")
            })
          }
        });
      },
    posterSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let that = this;
            this.$ajax.post("/marketing/distribution",{distribution:that.poster.distribution}).then(function (res) {
              if (res.data.error == '0') {
                that.$Message.success('设置成功!');
              }
            }).catch(function (err) {
              console.log(err)
            })
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      posterStatus(_id, state, index) {
        let that = this;
        console.log('++++++')
//        console.log(item.target)
        this.$ajax.post("/marketing/state", {"id": _id, 'state': state}).then(function (res) {
          if (res.data.error == '0') {
            that.$Message.success('海报状态修改成功!');
//            that.posterData[index].marketState = res.data.status
            that.fetchData()
          }
        }).catch(function (err) {
          console.log("error")
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      // 查看海报
      proview(name) {
        this.postersrc = name;
        this.showposter = true;
      }
    }
  }
</script>
