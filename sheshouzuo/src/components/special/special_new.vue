<style lang="less">
  @import "~less/public.less";
</style>
<style>
  .specialicon img{
    width: 30px;
    padding: 5px;
    margin-right: 15px;
  }
  .boxShadow{
    transform: scale(1.15);
    box-shadow: 0 0 8px #aaa;
  }
  .specialstyle{
    height: 300px;
  }
  .specialstyle img{
    display: block;
    width: 80%;
    box-shadow: 0 0 8px #ccc;
  }
</style>
<template>
  <i-col :xs="18">
    <Row type="flex">
      <i-col span="22" offset="1">
        <Tabs value="name1" class="demo-tabs-style1" :animated="animated">
          <TabPane label="新建专题" name="name1">
            <div style="margin-bottom: 10px">
              <a href="#/10-2&special_list">
                <Button type="info">专题列表</Button>
              </a>
            </div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
              <FormItem label="设置标题" prop="title">
                <Input v-model="formValidate.title" placeholder="请输入标题内容"></Input>
              </FormItem>
              <FormItem label="设置标题图标" prop="icon" class="specialicon">
                <div @click="selecticon">
                  <img src="https://xiaochengyun-1251009371.cossh.myqcloud.com/15053848350728.png">
                  <img src="https://xiaochengyun-1251009371.cossh.myqcloud.com/15053849309394.png">
                  <img src="https://xiaochengyun-1251009371.cossh.myqcloud.com/15053849918300.png">
                  <img src="https://xiaochengyun-1251009371.cossh.myqcloud.com/15053850247181.png">
                  <img src="https://xiaochengyun-1251009371.cossh.myqcloud.com/15053850385008.png">
                  <img src="https://xiaochengyun-1251009371.cossh.myqcloud.com/15053850426912.png">
                  <img src="https://xiaochengyun-1251009371.cossh.myqcloud.com/15053850454462.png">
                  <img src="https://xiaochengyun-1251009371.cossh.myqcloud.com/15053850474899.png">
                  <img src="https://xiaochengyun-1251009371.cossh.myqcloud.com/15053850501057.png">
                </div>
              </FormItem>
              <FormItem label="设置专题风格" prop="style" class="specialstyle">
                <RadioGroup v-model="formValidate.style" vertical>
                  <i-col span="8">
                  <Radio label="lunbo">
                    <span>轮播风格</span>
                    <img src="../../../static/images/lunbo.png">
                  </Radio>
                  </i-col>
                  <i-col span="8">
                  <Radio label="bigimg">
                    <span>大图风格</span>
                    <img src="../../../static/images/bigImg.png">
                  </Radio>
                  </i-col>
                  <i-col span="8">
                  <Radio label="smallimg">
                    <span>小图风格</span>
                    <img src="../../../static/images/smallImg.png">
                  </Radio>
                  </i-col>
                </RadioGroup>
              </FormItem>
              <FormItem label="专题页列表">
                <Transfer
                  :data="data2"
                  :target-keys="targetKeys2"
                  filterable
                  :filter-method="filterMethod"
                  @on-change="handleChange2"></Transfer>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
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
        animated:false,
        data2: this.getMockData(),
        targetKeys2: this.getTargetKeys(),

        formValidate: {
          title: '',
          icon:'',
          style: 'lunbo'
        },
        ruleValidate: {
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      //提交表单
      handleSubmit(name) {
        var that=this
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$ajax.post("/special/special_new_ajax", {
              title: this.formValidate.title,
              icon: this.formValidate.icon,
              style:this.formValidate.style,
              specialPageId:this.targetKeys2 ,
            }).then(function (res) {
              if(res.data.error=='0'){
                that.$Message.success('专题添加成功!');
                setTimeout(function () {
                  location.reload()
                },400)
              }
            })
              .catch(function (err) {
                console.log(err);
              })
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      //icon
      selecticon(e){
        if(e.target.tagName == 'IMG'){
            var icon=e.target
          $('.specialicon img').removeClass('boxShadow')
          $(icon).addClass('boxShadow')
          var imgsrc=icon.src
          this.formValidate.icon=imgsrc
        }
      },
      //穿梭框
      getMockData () {
        let mockData = [];
        this.$ajax.get("/special/special_new",{
        }).then((result) => {
          var items=result.data.data
          for (let i = 0; i <items.length; i++) {
            mockData.push({
              key: items[i]._id,
              label: items[i].title,
            });
          }
        })
          .catch((err) => {
            console.log(err);
          })
        return mockData;
      },
      getTargetKeys () {
        return this.getMockData().filter(() => Math.random() * 2 > 1)
          .map(item => item.label);
      },
      handleChange2 (newTargetKeys) {
        this.targetKeys2 = newTargetKeys;
      },
      filterMethod (data, query) {
        return data.label.indexOf(query) > -1;
      }
    },
    created(){
      this.getMockData()
    }

  }
</script>
