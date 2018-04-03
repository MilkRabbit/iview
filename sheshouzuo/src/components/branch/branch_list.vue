<style lang="less">
  @import "~less/public.less";
  @import "~less/shopInfo.less";
</style>
<style>
  #allmap{
    width: 1000px;
  }
</style>
<template>
  <Col :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs :value="tabValue" class="demo-tabs-style1" :animated="animated" @on-click="changeTabVal">
      <TabPane label="分店列表" name="name1">
        <Form :label-width="10" inline class="inlineForm">
          <div class="leftFloat" style="margin-bottom: 20px">
            <Button @click="gotoSort" type="primary">添加分店</Button>
          </div>
        </Form>
        <Table :columns="columns" :data="data" :loading="loading"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :current="1" :total="pageTotal" @on-change="changePage"></Page>
          </div>
        </div>
      </TabPane>
      <TabPane label="添加分店" name="name2">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="130">
          <Row>
            <Col :lg="6">
            <FormItem label="分店管理员手机号" prop="linkPhone">
              <Input v-model="formValidate.linkPhone" placeholder="请输入"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :lg="6">
            <FormItem label="分店名称" prop="shopName">
              <Input v-model="formValidate.shopName" placeholder="请输入"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :lg="12">
            <FormItem label="分店说明" prop="shopExplain">
              <Input v-model="formValidate.shopExplain" placeholder="请输入"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :lg="24">
            <FormItem label="店铺地址">
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
              <div id="city" style="display: none;">{{prov}}{{shi}}{{district}}</div>
              <div class="address">
                <div id="allmap"></div>
                <div  @click="selectmap()">
                  <div @click="theLocation()">
                    <Input type="text" id="suggestId" v-on:input="writeAddress()"  placeholder="请填写详细地址"  v-model="formValidate.address" class="input_style"  style="display: inline-block; width: 300px;"></Input>
                  </div>
                </div>
                <input type="hidden" v-model="gps">
              </div>
            </FormItem>
            </Col>
          </Row>
          <Modal
            v-model="recodeModel"
            title="重置密码"
            @on-ok="recode">
            <Input v-model="newCode" placeholder="请输入新密码"></Input>
          </Modal>
          <Row>
            <Col :lg="12">
            <FormItem label="">
              <CheckboxGroup >
                <Checkbox label="我已阅读并同意《小橙云店服务用户协议》" v-model="agree"></Checkbox>
              </CheckboxGroup>
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
  import {MP} from 'static/js/map'
  import arrAll from 'static/js/chinesecity'
  export default {
    data () {
      return {
        newCode:'',
        userPhone:'',
        index:0,
        recodeModel:false,
        agree:false,
        arr: arrAll,
        cityArr: [],
        districtArr: [],
        prov: '北京',
        shi: '北京',
        district: '东城区',
        tabValue: 'name1',
        animated: false,
        gps: [],
        formValidate: {
          linkPhone: '',
          shopName:'',
          shopExplain:'',
          address:null,
          userlocation: {lng: "", lat: ""},
        },
        ruleValidate: {
          linkPhone: [
            {required: true, message: '管理员手机号不能为空', trigger: 'blur'}
          ],
          shopName: [
            {required: true, message: '分店名称不能为空', trigger: 'blur'}
          ],
          shopExplain: [
            {required: true, message: '分店说明不能为空', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '店铺地址不能为空', trigger: 'blur'}
          ],
        },
        columns: [
          {
            title: '名称',
            key: 'shopName',
          },
          {
            title: '说明',
            key: 'shopExplain',
          },
          {
            title: '地址',
            key: 'address',
          },
          {
            title: '手机',
            key: 'userPhone',
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
                      this.show(params.row.userPhone,params.index)
                    }
                  }
                }, '重置密码'),
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
                      this.remove(params.row._id,params.row.userPhone, params.index)
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
    mounted(){
      this.$nextTick(function () {
        MP("GqRvdnS3qslFgShj5Gp1FKkwm5W8pqDz").then( BMap => {
          var th = this
          var map = new BMap.Map("allmap");            // 创建Map实例
          var point = new BMap.Point(116.404269,39.915931); // 创建点坐标
          map.centerAndZoom(point,15);
          map.enableScrollWheelZoom(true);
          // 将地址解析结果显示在地图上,并调整地图视野
          function bd09togcj02(bd_lon, bd_lat) {
            var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
            var x = bd_lon - 0.0065;
            var y = bd_lat - 0.006;
            var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
            var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
            var gg_lng = z * Math.cos(theta);
            var gg_lat = z * Math.sin(theta);
            return [gg_lng, gg_lat]
          }
          var geoc = new BMap.Geocoder();
          var gcj02;
          var address;
          map.addEventListener("click", function (e) {
            var pt = e.point;
            map.clearOverlays();
            var marker = new BMap.Marker(pt);  // 创建标注
            map.addOverlay(marker);               // 将标注添加到地图中
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            geoc.getLocation(pt, function (rs) {

              var addComp = rs.addressComponents;
              gcj02 = bd09togcj02(pt.lng, pt.lat);
              th.gps=gcj02
              th.formValidate.userlocation={lng:pt.lng,lat:pt.lat};
              th.prov=addComp.province;
              th.shi=addComp.city;
              th.district=addComp.district;
              if (addComp.street != '' && addComp.streetNumber != '') {
                address=addComp.street + addComp.streetNumber;
                th.formValidate.address=address
              } else {
                this.$Message.error('抱歉，你选的位置暂时没有定位信息，请手动在下方输入框输入！')

              }
            });
          });
        })
      })
    },
    methods: {
      writeAddress(){
        $('#allmap').show()
        this.$nextTick(function () {
          MP("GqRvdnS3qslFgShj5Gp1FKkwm5W8pqDz").then( BMap => {
            var th = this
            var map = new BMap.Map("allmap");            // 创建Map实例
            map.centerAndZoom("西安", 12);
            map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
            map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用

            map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
            map.addControl(new BMap.OverviewMapControl()); //添加默认缩略地图控件
            map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT }));   //右下角，打开

            var localSearch = new BMap.LocalSearch(map);
            localSearch.enableAutoViewport(); //允许自动调节窗体大小
            searchByStationName()
            function searchByStationName() {
              map.clearOverlays();//清空原来的标注
              var keyword = th.address;
              localSearch.setSearchCompleteCallback(function (searchResult) {
                var poi = searchResult.getPoi(0);
                var addressArr=[];
                var lng=poi.point.lng;
                addressArr.push(lng);
                var lat=poi.point.lat;
                addressArr.push(lat);
                th.gps=addressArr;
                map.centerAndZoom(poi.point, 13);
                var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat));  // 创建标注，为要查询的地方对应的经纬度
                map.addOverlay(marker);
              });
              localSearch.search(keyword);
            }

          })
        })
      },
      theLocation(){
        MP("GqRvdnS3qslFgShj5Gp1FKkwm5W8pqDz").then( BMap => {
          var th = this
          var map = new BMap.Map("allmap");            // 创建Map实例
          var point = new BMap.Point(116.404269,39.915931); // 创建点坐标
          map.centerAndZoom(point,15);

          var city = $("#city").html();
          if(city != ""){
            map.centerAndZoom(city,15);      // 用城市名设置地图中心点
          }
          map.enableScrollWheelZoom(true);
          // 将地址解析结果显示在地图上,并调整地图视野
          function bd09togcj02(bd_lon, bd_lat) {
            var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
            var x = bd_lon - 0.0065;
            var y = bd_lat - 0.006;
            var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
            var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
            var gg_lng = z * Math.cos(theta);
            var gg_lat = z * Math.sin(theta);
            return [gg_lng, gg_lat]
          }
          var geoc = new BMap.Geocoder();
          var gcj02;
          var address;
          map.addEventListener("click", function (e) {
            var pt = e.point;
            map.clearOverlays();
            var marker = new BMap.Marker(pt);  // 创建标注
            map.addOverlay(marker);               // 将标注添加到地图中
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            geoc.getLocation(pt, function (rs) {

              var addComp = rs.addressComponents;
              gcj02 = bd09togcj02(pt.lng, pt.lat);
              th.gps=gcj02
              th.formValidate.userlocation={lng:pt.lng,lat:pt.lat};
              th.prov=addComp.province;
              th.shi=addComp.city;
              th.district=addComp.district;
              if (addComp.street != '' && addComp.streetNumber != '') {
                address=addComp.street + addComp.streetNumber;
                th.formValidate.address=address
              } else {
                this.$Message.error('抱歉，你选的位置暂时没有定位信息，请手动在下方输入框输入！')

              }
            });
          });
        })
      },
      selectmap(){
        $('#allmap').show()
      },
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
        this.$ajax.get("/admin/getBranchData/1").then(function (res) {
          console.log(res.data)
          this.loading = false;
          this.data = res.data.data.data;
          this.pageTotal = res.data.data.count;
        }.bind(this)).catch(function (err) {
          console.log(err)
        })
      },
      show (userPhone,index) {
        this.recodeModel = true;
        this.userPhone = userPhone;
        this.index = index;
      },
      recode(){
        if(this.newCode.trim().length<6||this.newCode.trim().length>30){
          this.$Message.error("新密码不能少于6位")
        }else {
          this.$ajax.post("/admin/recode",{
            userPhone:this.userPhone,
            newCode:this.newCode,
          }).then(function (res) {
            if (res.data.error == '0') {
              this.$Message.success('修改成功!');
              this.newCode = ''
            }
          }.bind(this)).catch(function (err) {
            console.log(err)
          })
        }

      },
      remove (_id,bindPhone, index) {
        this.$layer.confirm('确认删除吗?', function () {
            this.$ajax.post("/branch/deleteShop", {id: _id,bindPhone:bindPhone}).then(function (res) {
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
          if (valid && this.agree == true && /^1[3|4|5|8][0-9]\d{4,8}$/.test(this.formValidate.linkPhone)) {
            this.$ajax.post("/branch/branch_new", {
              userPhone: this.formValidate.linkPhone,
              shopName: this.formValidate.shopName,
              shopExplain: this.formValidate.shopExplain,
              shopAddress: this.formValidate.address,
              address: this.prov + '/' + this.shi + '/' + this.district,
              identity:2,
              gcj02: JSON.stringify(this.gps)
            }).then(function (res) {
              if (res.data.error == '0') {
                let data = res.data.data;
                this.$Message.success('添加成功!');
                this.data.push({
                  _id:data._id,
                  shopName:data.shopName,
                  shopExplain:data.shopExplain,
                  address:data.shopProvince + data.shopCity + data.shopDistrict + data.shopAddress,
                  userPhone:data.userPhone,
                });
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
        this.$ajax.get("/admin/getBranchData/" + index).then(function (res) {
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
