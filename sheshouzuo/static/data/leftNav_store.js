/**
 * Created by cc on 2016/8/29 0029.
 */
module.exports = [
  {
    code: "A",
    name: "工作台",
    url: "/shop/admin/index/shopId",
    icon: "fa fa-home",
    class: []
  },
  {
    code: "B",
    name: "店铺管理",
    url: "",
    icon: "fa fa-building-o",
    class: [
      {
        code: "Ba",
        name: "店铺设置",
        url: "/shop/shopInfo/setting"
      },
      {
        code: "Bb",
        name: "配送员设置",
        url: "/shop/shopInfo/diliveryman_list"
      },
      {
        code: "Bc",
        name: "运费设置",
        url: "/shop/shopInfo/freight_set"
      },
      {
        code: "Bd",
        name: "积分设置",
        url: "/shop/shopInfo/integration"
      },
      {
        code: "Be",
        name: "客服消息",
        url: "/shop/shopInfo/customerMess"
      }
    ]
  },
  {
    code: "C",
    name: "商品管理",
    url: "",
    icon: "fa fa-pencil",
    class: [
      {
        code: "Ca",
        name: "商品分类",
        url: "/shop/product/product_sort"
      },
      {
        code: "Cb",
        name: "商品列表",
        url: "/shop/product/product_list"
      },
    ]
  },
  {
    code: "D",
    name: "库存管理",
    url: "",
    icon: "fa fa-money",
    class: [
      {
        code: "Da",
        name: "设置商品库存",
        url: "/shop/stock/stock_set"
      },
      {
        code: "Db",
        name: "库存流水列表",
        url: "/shop/stock/stock_list"
      }
    ]
  },
  {
    code: "E",
    name: "订单管理",
    url: "order",
    icon: "fa fa-tasks",
    class: []
  },
  {
    code: "F",
    name: "财务管理",
    url: "",
    icon: "fa fa-money",
    class: [
      {
        code: "Fa",
        name: "流水列表",
        url: "/shop/finance/finance_list"
      },
    ]
  },
  {
    code: "G",
    name: "客户管理",
    url: "",
    icon: "fa fa-group",
    class: [
      {
        code: "Ga",
        name: "客户列表",
        url: "/shop/user/user_list"
      },
      {
        code: "Gb",
        name: "会员设置",
        url: "/shop/user/user_list"
      },
      {
        code: "Gc",
        name: "会员列表",
        url: "/shop/user/user_list"
      },
      {
        code: "Gd",
        name: "会员页设置",
        url: "/shop/user/user_list"
      }
    ]
  },
  {
    code: "H",
    name: "营销管理",
    url: "",
    icon: "fa fa-bullhorn",
    class: [
      {
        code: "Ha",
        name: "我的营销",
        url: "/shop/marketing/myActivity"
      },
      {
        code: "Hb",
        name: "营销中心",
        url: "/shop/marketing/activity"
      },
    ]
  },
  {
    code: "I",
    name: "专题管理",
    url: "",
    icon: "fa fa fa-picture-o",
    class: [
      {
        code: "Ia",
        name: "专题页列表",
        url: "/shop/special/specialPage_list"
      },
      {
        code: "Ib",
        name: "专题列表",
        url: "/shop/special/special_list"
      },
    ]
  },
  {
    code: "J",
    name: "评价管理",
    url: "",
    icon: "fa fa-file-text",
    class: [
      {
        code: "Ja",
        name: "评价列表",
        url: "/shop/comment/comment_list"
      }
    ]
  },
  {
    code: "K",
    name: "分店管理",
    url: "",
    icon: "fa fa-sitemap",
    class: [
      {
        code: "Ka",
        name: "添加分店",
        url: "/shop/branch/branch_new"
      },
      {
        code: "Kb",
        name: "分店列表",
        url: "/shop/branch/branch_list"
      },
    ]
  },
  {
    code: "L",
    name: "活动管理",
    url: "",
    icon: "fa fa-coffee",
    class: [
      {
        code: "La",
        name: "活动列表",
        url: "/shop/event/event_list"
      },
    ]
  },
  {
    code: "M",
    name: "设置",
    url: "",
    icon: "fa fa-gear",
    class: [
      {
        code: "Ma",
        name: "授权小程序",
        url: "/shop/marketing/authorityPage"
      },
      {
        code: "Mb",
        name: "选择套餐",
        url: "/shop/setting/choosePackages"
      },
      {
        code: "Mc",
        name: "支付方式",
        url: "/shop/setting/pay"
      },
      {
        code: "Md",
        name: "删除店铺",
        url: "/shop/setting/del"
      },

    ]
  },
];
