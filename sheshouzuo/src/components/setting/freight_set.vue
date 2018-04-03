<style lang="less">
  @import "~less/public.less";
</style>
<template>
  <i-col :lg="21">
  <Row type="flex">
    <i-col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
      <TabPane label="运费设置" name="name1">
        <Form :label-width="100">
          <FormItem label="运费计算方式">
            <Select class="inline-select" style="width: 500px" v-model="freightStyle">
              <Option value="0">同城速递（根据地域不同制定不同的运费）</Option>
              <Option value="1">快递（根据地域，商品单位不同制定不同的运费）</Option>
            </Select>
            <div style="margin: 5px 0">
              <span class="label label-danger">注意</span>
              <span>只能选择一种运费模式，如果设置了新的模式，之前旧的模式的设置将会失效</span>
            </div>
          </FormItem>
          <div v-show="freightStyle=='0'">
            <Modal
              v-model="freightModal0"
              title="新增配送区域"
              @on-ok="ok0"  width="760">
              <Form :label-width="100">
              <FormItem label="选择区域">
                <Select v-model="prov" style="width: 120px;margin-right: 10px">
                  <Option v-for="(option,index) in arr" :value="option.name" :key="index">
                    {{ option.name }}
                  </Option>
                </Select>
                <Select v-model="shi" style="width: 120px;margin-right: 10px">
                  <Option v-for="(option,index) in cityArr" :value="option.name" :key="index">
                    {{ option.name }}
                  </Option>
                </Select>
                <Select v-model="district" v-if="district" style="width: 120px">
                  <Option v-for="(option,index) in districtArr" :value="option.name" :key="index">
                    {{ option.name }}
                  </Option>
                </Select>
              </FormItem>
              <FormItem label="速递基础运费">
                <Input v-model="model0Val" style="width: 300px" placeholder="请输入速递基础运费（单位：元）"></Input>
              </FormItem>
              </Form>
            </Modal>
          <FormItem label="配送区域">
            <Button type="primary" @click="freightModal0 = true">新增区域方案</Button>
            <div style="margin: 5px 0">
              <span class="label label-danger">注意</span>
              <span>区域方案可以根据建立的省份不同，产生不同的运费。如果您设置的单位运费，那么总运费为所对应的省份运费加上单位运费</span>
            </div>
            <Table :columns="freightColumns0" :data="freightData0" :loading="freightLoading0"></Table>
          </FormItem>
          <FormItem label="免邮费消费门槛">
            <Input v-model="freeFreight0" style="width: 300px"></Input>
            <div style="margin: 5px 0">
              <span class="label label-danger">注意</span>
              <span>请谨慎设置免邮费消费门槛，订单金额如果大于此门槛设定金额时会不计算邮费！</span>
            </div>
          </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit0">提交</Button>
            </FormItem>
          </div>
          <div v-show="freightStyle=='1'">
            <Modal
              v-model="freightModal1"
              title="新增配送区域"
              @on-ok="ok1"  width="760">
              <Form :label-width="220">
                <FormItem label="选择区域">
                  <Select v-model="prov1" style="width: 120px;margin-right: 10px">
                    <Option v-for="(option,index) in arr" :value="option.name" :key="index">
                      {{ option.name }}
                    </Option>
                  </Select>
                </FormItem>
                <FormItem label="速递基础运费">
                  <Input v-model="model1Val1" style="width: 300px" placeholder="请输入速递基础运费（单位：元）"></Input>
                </FormItem>
                <FormItem label="运费价格单位变更门槛（单位倍数）">
                  <Input v-model="model1Val2" style="width: 300px" placeholder="运费价格单位变更门槛（单位：单位倍数）"></Input>
                </FormItem>
                <FormItem label="每单位价格（元）">
                  <Input v-model="model1Val3" style="width: 300px" placeholder="请输入每单位价格（单位：元）"></Input>
                </FormItem>
              </Form>
            </Modal>
            <FormItem label="配送区域">
              <Button type="primary" @click="freightModal1 = true">新增区域方案</Button>
              <div style="margin: 5px 0">
                <span class="label label-danger">注意</span>
                <span>区域方案可以根据建立的省份不同，产生不同的运费。如果您设置的单位运费，那么总运费为所对应的省份运费加上单位运费</span>
              </div>
              <Table :columns="freightColumns1" :data="freightData1" :loading="freightLoading1"></Table>
            </FormItem>
            <FormItem label="免邮费消费门槛">
              <Input v-model="freeFreight1" style="width: 300px"></Input>
              <div style="margin: 5px 0">
                <span class="label label-danger">注意</span>
                <span>请谨慎设置免邮费消费门槛，订单金额如果大于此门槛设定金额时会不计算邮费！</span>
              </div>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit1">提交</Button>
            </FormItem>
          </div>
        </Form>
      </TabPane>
    </Tabs>
    </i-col>
  </Row>
  </i-col>
</template>
<script>
  import arrAll from 'static/js/chinesecity'
  export default {
    data () {
      return {
        freightModal0:false,
        model0Val:'',
        freightModal1:false,
        model1Val1:'',
        model1Val2:'',
        model1Val3:'',
        prov: '北京市',
        prov1:'北京市',
        shi: '北京市',
        district: '东城区',
        arr: arrAll,
        cityArr: [],
        districtArr: [],
        animated:false,
        freightStyle:"1",
        freightLoading0:false,
        freightData0:[],
        freightColumns0:[
          {
            title: '省',
            key: 'deliveryProvince',
          },
          {
            title: '市',
            key: 'deliveryCity',
          },
          {
            title: '区',
            key: 'deliveryDistinct',
          },
          {
            title: '运费价格（元）',
            key: 'deliveryCostArea',
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: function(h, params){
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
                    click: function() {
                      this.remove0(params.row.deliveryProvince+'/'+params.row.deliveryCity+'/'+params.row.deliveryDistinct, params.index)
                    }.bind(this)
                  }
                }, '删除')
              ]);
            }.bind(this)
          }
        ],
        freeFreight0:'',
        freightLoading1:false,
        freightData1:[],
        freightColumns1: [
          {
            title: '省',
            key: 'deliveryProvince',
          },
          {
            title: '运费价格（元）',
            key: 'deliveryCostArea',
          },
          {
            title: '运费单位价格变更门槛（单位倍数）',
            key: 'deliveryCostUnitCut',
          },
          {
            title: '每单位价格（元）',
            key: 'deliveryCostUnit',
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: function(h, params)  {
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
                    click: function() {
                      this.remove1(params.row.deliveryProvince, params.index)
                    }.bind(this)
                  }
                }, '删除')
              ]);
            }.bind(this)
          }
        ],
        freeFreight1:''
      }
    },
    created () {
      this.loading = true;
      this.fetchData()
    },
    beforeMount: function () {
      this.updateCity();
      this.updateDistrict();
    },
    watch: {
      prov: function () {
        this.updateCity();
        this.updateDistrict();
      },
      shi: function () {
        this.updateDistrict();
      }
    },
    methods: {
      updateCity () {
        for (var i in this.arr) {
          var obj = this.arr[i];
          if (obj.name == this.prov) {
            this.cityArr = obj.sub;
            this.shi = this.cityArr[1].name;
            break;
          }
        }
      },
      updateDistrict () {
        for (var i in this.cityArr) {
          var obj = this.cityArr[i];
          if (obj.name == this.shi) {
            this.districtArr = obj.sub;
            break;
          }
        }
        if (this.districtArr && this.districtArr.length > 0 && this.districtArr[1].name) {
          this.district = this.districtArr[1].name;
        } else {
          this.district = '';
        }
      },
      fetchData(){
        this.$ajax.get("/shopInfo/freight_set").then(function (res) {
          console.log(res.data.data)
          let data = res.data.data;
          this.freightStyle = data.freightStyle.toString();
          this.freightData0 = data.freightInfo_0.area;
          this.freeFreight0 = data.freightInfo_0.freeFreight;
          this.freightData1 = data.freightInfo_1.area;
          this.freeFreight1 = data.freightInfo_1.freeFreight;
        }.bind(this)).catch(function (err) {
          console.log(err)
        });
      },
      ok0(){
        if(!/^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/.test(this.model0Val.trim())){
          this.$Message.warning('速递运费必须为数字,最小单位为分!');
          return false;
        }else {
          this.$ajax.post("/shopInfo/addFreightInfoArea0",{
            address:this.prov + '/' + this.shi + '/' + this.district,
            deliveryCostArea:this.model0Val
          }).then(function (res) {
            let data = res.data;
            if ('3' == data.error) {
              this.$Message.warning('数据库错误!');
              return false;
            }
            if ('0' == data.error) {
              this.$Message.success('速递运费设置成功!');
              this.freightData0.push({
                deliveryProvince:this.prov,
                deliveryCity:this.shi,
                deliveryDistinct:this.district,
                deliveryCostArea:this.model0Val,
              })
              return false;
            }
            if('20002'==data.error){
              this.$Message.warning('区域重复!');
              return false;
            }
          }.bind(this)).catch(function (err) {
            console.log(err)
          });
        }
      },
      ok1(){
        if(!/^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/.test(this.model1Val1.trim())){
          this.$Message.warning('速递运费必须为数字,最小单位为分!');
          return false;
        }
        if(this.model1Val2.trim()!=''&&this.model1Val3.trim()==''||this.model1Val2.trim()==''&&this.model1Val3.trim()!=''){
          this.$Message.warning('单位门槛和快递单位配送费必须同时填写!');
          return false;
        }
        if(this.model1Val2.trim()!=''&&!/^[0-9]*$/.test(this.model1Val2.trim())){
          this.$Message.warning('单位门槛必须为数字!');
          return false;
        }
        if(this.model1Val3.trim()!=''&&!/^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/.test(this.model1Val3.trim())){
          this.$Message.warning('快递单位配送费必须为数字,最小单位为分');
          return false;
        }
        this.$ajax.post("/shopInfo/addFreightInfoArea1",{
          address:this.prov1,
          deliveryCostArea:this.model1Val1,
          deliveryCostUnitCut:this.model1Val2, //快递单位门槛
          deliveryCostUnit:this.model1Val3 //快递单位配送费(分)
        }).then(function (res) {
          let data = res.data;
          if ('3' == data.error) {
            this.$Message.warning('数据库错误!');
            return false;
          }
          if ('0' == data.error) {
            this.$Message.success('速递运费设置成功!');
            this.freightData1.push({
              deliveryProvince:this.prov1,
              deliveryCostArea:this.model1Val1,
              deliveryCostUnitCut:this.model1Val2,
              deliveryCostUnit:this.model1Val3,
            })
            return false;
          }
          if('20002'==data.error){
            this.$Message.warning('区域重复!');
            return false;
          }
        }.bind(this)).catch(function (err) {
          console.log(err)
        });
      },
      remove0(address,index){
        this.$ajax.post("/shopInfo/deleteArea0",{
          address:address,
        }).then(function (res) {
          let data = res.data;
          if ('3' == data.error) {
            this.$Message.warning('数据库错误!');
            return false;
          }
          if ('0' == data.error) {
            this.$Message.success('删除成功!');
            this.freightData0.splice(index,1)
            return false;
          }
        }.bind(this)).catch(function (err) {
          console.log(err)
        });
      },
      remove1(address,index){
        this.$ajax.post("/shopInfo/deleteArea1",{
          address:address,
        }).then(function (res) {
          let data = res.data;
          if ('3' == data.error) {
            this.$Message.warning('数据库错误!');
            return false;
          }
          if ('0' == data.error) {
            this.$Message.success('删除成功!');
            this.freightData1.splice(index,1)
            return false;
          }
        }.bind(this)).catch(function (err) {
          console.log(err)
        });
      },
      handleSubmit0(){
        if(!/^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/.test(this.freeFreight0)){
          this.$Message.warning('免邮费消费门槛必须为数字,最小单位为分!');
          return false;
        }else {
          this.$ajax.post("/shopInfo/freight_set_0",{
            freightStyle:parseInt(this.freightStyle),
            freeFreight:this.freeFreight0
          }).then(function (res) {
            let data = res.data;
            if ('3' == data.error) {
              this.$Message.warning('数据库错误!');
              return false;
            }
            if ('0' == data.error) {
              this.$Message.success('速递运费设置成功!');
              return false;
            }
          }.bind(this)).catch(function (err) {
            console.log(err)
          });
        }
      },
      handleSubmit1(){
        if(!/^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/.test(this.freeFreight1)){
          this.$Message.warning('免邮费消费门槛必须为数字,最小单位为分!');
          return false;
        }else {
          this.$ajax.post("/shopInfo/freight_set_1",{
            freightStyle:parseInt(this.freightStyle),
            freeFreight:this.freeFreight0
          }).then(function (res) {
            let data = res.data;
            if ('3' == data.error) {
              this.$Message.warning('数据库错误!');
              return false;
            }
            if ('0' == data.error) {
              this.$Message.success('速递运费设置成功!');
              return false;
            }
          }.bind(this)).catch(function (err) {
            console.log(err)
          });
        }
      },
    }
  }
</script>
