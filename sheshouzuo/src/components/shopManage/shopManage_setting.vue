<style lang="less">
  @import "~less/public.less";
  @import "~less/shopInfo.less";
</style>
<template>

  <Col :lg="21">
  <Row type="flex">
    <Col :lg="22" offset="1">
    <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
      <TabPane label="店铺设置" name="name1">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90" style="width: 60%">
          <FormItem label="店铺状态">
            <i-switch size="large" v-model="formValidate.isClose" true-value='0' false-value="1">
              <span slot="open">营业</span>
              <span slot="close">关闭</span>
            </i-switch>
          </FormItem>
          <FormItem label="店铺分类" prop="name">
            <Row>
              <Col :lg="8">
              <Select v-model="shopClassId" style="width: 120px;margin-right: 10px">
                <Option v-for="(shopClass,index) in shopClassArr" :value="shopClass.classId" :key="index">
                  {{ shopClass.className }}
                </Option>
              </Select>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="店铺名称" prop="name">
            <Row>
              <Col :lg="8">
              <Input v-model="formValidate.name" placeholder="请输入店铺名称"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="店铺logo" prop="shoplogo">
            <div class="demo-upload-list" v-for="item in uploadList" style="width: 100px;height: 100px;line-height: 100px">
              <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
            <Upload
              ref="upload"
              :show-upload-list="false"
              :default-file-list="defaultList"
              :on-success="handleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="500"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              action="https://staticfiles.xiaochengyun.cn/pic/apiuploadimages"
              style="display: inline-block;">
              <div
                style="width: 100px;height:100px;line-height: 100px;border: 1px dotted #aaa;text-align: center;float: left;"
                class="shoplogo">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
            <Modal title="查看图片" v-model="visible">
              <img :src=imgName v-if="visible" style="width: 100%">
            </Modal>
            <div class="myFormTip">*店铺logo的尺寸为100*100;图片大小请控制在500k左右。</div>
          </FormItem>
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
          </FormItem>
          <FormItem label="详细地址">
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
          <FormItem label="客服电话" prop="phone">
            <Input v-model="formValidate.phone" placeholder="请输入联系电话/手机号码"></Input>
          </FormItem>
          <FormItem label="店铺说明" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入店铺说明"></Input>
          </FormItem>
          <FormItem label="营业时间">
            <Row>
              <i-col span="5">
                <FormItem prop="timestart">
                  <TimePicker format="HH:mm" placeholder="选择开始时间" v-model="formValidate.timestart"></TimePicker>
                </FormItem>
              </i-col>
              <i-col span="1" style="text-align: center">
                <span>至</span>
              </i-col>
              <i-col span="5">
                <FormItem prop="timeend">
                  <TimePicker format="HH:mm" placeholder="选择开始时间" v-model="formValidate.timeend"></TimePicker>
                </FormItem>
              </i-col>
              <!--<Checkbox v-model="formValidate.allTime" style="margin-left: 20px;">24小时营业</Checkbox>-->
            </Row>
          </FormItem>
          <FormItem label="配送时间">
            <Row>
              <i-col span="5">
                <FormItem prop="timestart">
                  <TimePicker format="HH:mm" placeholder="选择开始时间" v-model="formValidate.timestart"></TimePicker>
                </FormItem>
              </i-col>
              <i-col span="1" style="text-align: center">
                <span>至</span>
              </i-col>
              <i-col span="5">
                <FormItem prop="timeend">
                  <TimePicker format="HH:mm" placeholder="选择开始时间" v-model="formValidate.timeend"></TimePicker>
                </FormItem>
              </i-col>
            </Row>
          </FormItem>
          <FormItem label="信誉保障">
            <CheckboxGroup>
              <Checkbox label="100%正品保障,7天无理由退换货,48小时快速退款" v-model="formValidate.isShowWarranty"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="店铺展示图" prop="shopimg">
            <div class="demo-upload-list" style="width: 300px;height: 200px;line-height: 200px"
                 v-for="item in uploadList1">
              <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView1(item.name)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove1(item)"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
            <Upload
              ref="uploadshopimg"
              :show-upload-list="false"
              :default-file-list="defaultList"
              :on-success="handleSuccess1"
              :format="['jpg','jpeg','png']"
              :max-size="1024"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              action="https://staticfiles.xiaochengyun.cn/pic/apiuploadimages"
              style="display: inline-block;">
              <div
                style="width: 300px;height:200px;line-height: 200px;border: 1px dotted #aaa;text-align: center;float: left;"
                class="shopimg">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
            <Modal title="查看图片" v-model="visible1">
              <img :src=imgName1 v-if="visible1" style="width: 100%">
            </Modal>
            <div class="myFormTip">*店铺展示图的尺寸为600*400;图片大小请控制在1M左右。</div>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
          </FormItem>
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
        animated: false,
        arr: arrAll,
        cityArr: [],
        districtArr: [],
        prov: '北京',
        shi: '北京',
        district: '东城区',
        imgName: '',
        visible: false,
        uploadList: [],
        defaultList: [],
        imgName1: '',
        visible1: false,
        uploadList1: [],
        gps: [],
        formValidate: {
          isClose: '0',
          name: '',
          address: null, //详细地址
          userlocation: {lng: "", lat: ""},
          phone: '',
          timestart: '',
          timeend: '',
          desc: '',
          shoplogo: '',
          shopimg: [],
          allTime: false,
          isShowWarranty:false
        },
        ruleValidate: {
          name: [
            {required: true, message: '店铺名称不能为空', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请填写详细地址', trigger: 'change'},
          ],
          phone: [
            {required: true, message: '请填写联系手机号', trigger: 'change'},
            {type: 'string', min: 11, max: 11, message: '请填写正确的手机号', trigger: 'blur'}
          ],
          timestart: [
            {required: true, type: 'date', message: '请选择开始时间', trigger: 'change'}
          ],
          timeend: [
            {required: true, type: 'date', message: '请选择结束时间', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请输入店铺介绍', trigger: 'blur'},
            {type: 'string', min: 10, message: '介绍不能少于10字', trigger: 'blur'}
          ]
        },
        shopClassId:'',
        shopClassArr:[]
      }
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
          console.log(city)
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
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$ajax.post("/shopInfo/setting", {
              isCloseShop: parseInt(this.formValidate.isClose),
              shopName: this.formValidate.name,
              shopProvince: this.prov,
              shopCity: this.shi,
              shopDistrict: this.district,
              shopAddress: this.formValidate.address,
              gcj02:JSON.stringify(this.gps),
              linkPhone: this.formValidate.phone,
              shopHours: this.formValidate.timestart + "-" + this.formValidate.timeend,
              shopExplain: this.formValidate.desc,
              shopLogo: this.formValidate.shoplogo,
              isShowWarranty: this.formValidate.isShowWarranty,
              shopImgs: JSON.stringify(this.formValidate.shopimg),
              shopclassid:this.shopClassId,
            }).then(function (res) {
              if (res.data.error == '0') {
                this.$Message.success('修改成功!')
                setTimeout(function () {
                  location.reload()
                }, 500)
              } else if (res.data.error == '3') {
                this.$Message.error('数据库错误!')
              }
            }.bind(this))
              .catch(function (err) {
                console.log(err);
              })
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
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
      handleView (name) {
        this.imgName = name;
        this.visible = true;
      },
      handleView1 (name) {
        this.imgName1 = name;
        this.visible1 = true;
      },
      handleRemove (file) {
        // 从 upload 实例删除数据
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        this.formValidate.shoplogo = ''
        $(".shoplogo").show()
      },
      handleRemove1 (file) {
        // 从 upload 实例删除数据
        const fileList = this.$refs.uploadshopimg.fileList;
        this.$refs.uploadshopimg.fileList.splice(fileList.indexOf(file), 1);
        this.formValidate.shopimg.splice(fileList.indexOf(file), 1)
        console.log(this.$refs.uploadshopimg.fileList)
        console.log(this.formValidate.shopimg)
        $(".shopimg").show()
      },
      handleSuccess (res, file) {
        // 因为上传过程为实例，这里模拟添加 url
        file.url = res.data;
        file.name = res.data;
        let newList = [];
        newList.push({
          url: res.data,
          name: res.data,
          status: 'finished'
        })
        this.uploadList = newList;
        this.$refs.upload.fileList = newList;
        this.formValidate.shoplogo = res.data;
      },
      handleSuccess1 (res, file) {
        // 因为上传过程为实例，这里模拟添加 url
        file.url = res.data;
        file.name = res.data;
        this.formValidate.shopimg.push(res.data);
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        });
      },
      fatchData(){
        this.$ajax.get("/shopInfo/setting").then(function (res) {
          var shopinfo = res.data.data;
          this.formValidate.isClose = shopinfo.isCloseShop.toString();
            this.formValidate.name = shopinfo.shopName;
            this.prov = shopinfo.shopProvince;
            this.shi = shopinfo.shopCity;
            this.district = shopinfo.shopDistrict;
            this.formValidate.address = shopinfo.shopAddress;
            this.formValidate.timestart = shopinfo.timestart;
            this.formValidate.timeend = shopinfo.timeend;
            this.gps = shopinfo.gps;
            this.formValidate.phone = shopinfo.linkPhone;
            this.formValidate.desc = shopinfo.shopExplain;
          this.shopClassId = parseInt(shopinfo.shopclassid);
          console.log(shopinfo)
          this.formValidate.isShowWarranty = shopinfo.isShowWarranty;
          let newList = [];
          let shoplogo = shopinfo.shopLogo;
          this.formValidate.shoplogo = shoplogo;
          newList.push({
            url: shoplogo,
            name: shoplogo,
            status: 'finished'
          })
          this.uploadList = newList;
          this.$refs.upload.fileList = newList;

          let newList1 = [];
          let shopimg = res.data.data.shopImgs;
          this.formValidate.shopimg = shopimg;
          for (var i in shopimg) {
            newList1.push({
              url: shopimg[i],
              name: shopimg[i],
              status: 'finished'
            })
          }
          this.uploadList1 = newList1;
          this.$refs.uploadshopimg.fileList = newList1;
        }.bind(this))
          .catch(function (err) {
            console.log(err);
          })
        this.$ajax.get("/shopInfo/getShopClass").then(function (res) {
          this.shopClassArr = res.data.data
          console.log(this.shopClassArr)
        }.bind(this))
          .catch(function (err) {
            console.log(err);
          })
      }
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
      this.uploadList = this.$refs.upload.fileList;
      this.uploadList1 = this.$refs.uploadshopimg.fileList;
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
    created: function () {
      this.fatchData()
    }
  }
</script>
