/**
 * Created by cc on 2016/8/29 0029.
 */
module.exports = [
  {
    id: 1,
    code: "A",
    name: "工作台",
    url: "workspace",
    icon: "ios-home",
    class: []
  },
  {
    id: 2,
    code: "B",
    name: "店铺管理",
    url: "",
    icon: "clipboard",
    class: [
      {
        id:"2-1",
        code: "Ba",
        name: "店铺信息",
        url: "2-1&shopManage_setting"
      },
      {
        id:"2-2",
        code: "Bb",
        name: "配送员设置",
        url: "2-2&diliveryman_list"
      },
    ]
  },
  {
    id: 3,
    code: "C",
    name: "商品管理",
    url: "",
    icon: "ios-rose",
    class: [
      {
        id:"3-1",
        code: "Ca",
        name: "分类管理",
        url: "3-1&product_sort"
      },
      {
        id:"3-2",
        code: "Cb",
        name: "商品列表",
        url: "3-2&product_list"
      },
    ]
  },
  {
    id: 4,
    code: "D",
    name: "订单管理",
    url: "",
    icon: "ios-list",
    class: [
      {
        id:"4-1",
        code: "Da",
        name: "订单列表",
        url: "4-1&order_list"
      },
      {
        id:"4-2",
        code: "Db",
        name: "评价管理",
        url: "4-2&evaluation"
      },
    ]
  },
  {
    id: 5,
    code: "E",
    name: "客户管理",
    url: "user_list",
    icon: "ios-people",
    class: []
  },
  {
    id: 6,
    code: "F",
    name: "场景管理",
    url: "",
    icon: "chatbox-working",
    class: [
      {
        id:"6-1",
        code: "Da",
        name: "场景列表",
        url: "6-1&scene_set"
      },
    ]
  },
  // {
  //   id: 7,
  //   code: "G",
  //   name: "营销管理",
  //   url: "myActivity",
  //   icon: "ios-cart",
  //   class: [
  //   ]
  // },
  {
    id: 8,
    code: "H",
    name: "财务管理",
    url: "finance",
    icon: "social-yen",
    class: []
  },
  {
    id: 9,
    code: "I",
    name: "分店管理",
    url: "branch_list",
    icon: "ios-book",
    class: []
  },
  // {
  //   id: 10,
  //   code: "J",
  //   name: "个人中心",
  //   url: "profile",
  //   icon: "chatbox-working",
  //   class: []
  // },
  // {
  //   id: 10,
  //   code: "K",
  //   name: "专题管理",
  //   url: "",
  //   icon: "aperture",
  //   class: [
  //     {
  //       id:"10-1",
  //       code: "Ka",
  //       name: "专题页管理",
  //       url: "10-1&specialPage_list"
  //     },
  //     {
  //       id:"10-2",
  //       code: "Kb",
  //       name: "专题管理",
  //       url: "10-2&special_list"
  //     },
  //   ]
  // },
  // {
  //   id: 12,
  //   code: "M",
  //   name: "活动管理",
  //   url: "",
  //   icon: "fireball",
  //   class: [
  //     {
  //       id:"12-1",
  //       code: "Ma",
  //       name: "会员管理",
  //       url: "12-1&vip"
  //     },
  //     {
  //       id:"12-2",
  //       code: "Mb",
  //       name: "活动管理",
  //       url: "12-2&events"
  //     },
  //   ]
  // },
  {
    id: 11,
    code: "L",
    name: "设置",
    url: "",
    icon: "settings",
    class: [
      {
        id:"11-1",
        code: "Ma",
        name: "小程序",
        url: "11-1&authorityPage"
      },
      {
        id:"11-2",
        code: "Mb",
        name: "版本套餐",
        url: "11-2&choosePackages"
      },
      {
        id:"11-3",
        code: "Mc",
        name: "运费",
        url: "11-3&freight_set"
      },
      {
        id:"11-4",
        code: "Md",
        name: "积分",
        url: "11-4&integration"
      },
      {
        id:"11-5",
        code: "Me",
        name: "客服",
        url: "11-5&customMess"
      },
      {
        id:"11-6",
        code: "Mf",
        name: "删除店铺",
        url: "11-6&CloseShop"
      },

    ]
  },
];
