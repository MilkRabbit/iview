import Vue from 'vue'
import Router from 'vue-router'


import workspace from '@/components/admin/workspace'


import product_list from '@/components/product/product_list'
import product_sort from '@/components/product/product_sort'


import shopManage_setting from '@/components/shopManage/shopManage_setting'
import diliveryman_list from '@/components/shopManage/diliveryman_list'
import customer from '@/components/shopManage/customer'
import Integration from '@/components/shopManage/integration'


import specialPage from '@/components/special/specialPage'
import specialPage_new from '@/components/special/specialPage_new'
import special from '@/components/special/special'
import special_new from '@/components/special/special_new'

import Activity from '@/components/marketing/activity'
import MyActivity from '@/components/marketing/myActivity'

import Finance from '@/components/finance/finance'

import Order from '@/components/order/order'
import orderDetail from '@/components/order/orderDetail'
import evaluation from '@/components/order/evaluation'
import user_list from '@/components/member/user_list'


import scene_set from '@/components/scene/scene_set'
import scene_user_list from '@/components/scene/scene_user_list'

import branch_list from '@/components/branch/branch_list'

import AuthorityPage from '@/components/setting/authorityPage'
import ChoosePackage from '@/components/setting/choosePackage'
import freight_set from '@/components/setting/freight_set'
import integration from '@/components/setting/integration'
import customMess from '@/components/setting/customMess'
import CloseShop from '@/components/setting/closeShop'


import product_update from '@/components/product/product_update'
import product_new from '@/components/product/product_new'
import Poster from '@/components/marketing/poster'
import SpecialPageUpdate from '@/components/special/specialPage_update'
import SpecialUpdate from '@/components/special/special_update'

import Vip from '@/components/event/vip'
import Event from '@/components/event/event'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/workspace'
    },
    {
      path: '/workspace',
      name: 'workspace',
      component: workspace
    },
    {
      path: '/2-1&shopManage_setting',
      name: 'shopManage_setting',
      component: shopManage_setting
    },
    {
      path: '/2-2&diliveryman_list',
      name: 'diliveryman_list',
      component: diliveryman_list
    },
    {
      path: '/2-3&integration',
      name: 'integration',
      component: Integration
    },
    {
      path: '/2-4&customer',
      name: 'customer',
      component: customer
    },
    {
      path: '/3-1&product_sort',
      name: 'product_sort',
      component: product_sort
    },
    {
      path: '/3-2&product_list',
      name: 'product_list',
      component: product_list
    },
    {
      path: '/3-2&product_new',
      name: 'product_new',
      component: product_new
    },
    {
      path: '/3-2&product_update',
      name: 'product_update',
      component: product_update
    },
    {
      path: '/4-1&order_list',
      name: 'order',
      component: Order
    },
    {
      path: '/4-1&orderDetail',
      name: 'orderDetail',
      component: orderDetail
    },
    {
      path: '/4-2&evaluation',
      name: 'evaluation',
      component: evaluation
    },
    {
      path: '/finance',
      name: 'finance',
      component: Finance
    },
    {
      path: '/myActivity',
      name: 'myActivity',
      component: MyActivity
    },
    {
      path: '/8-2&activity',
      name: 'activity',
      component: Activity
    },
    {
      path: '/poster',
      name: 'poster',
      component: Poster
    },
    {
      path: '/10-1&specialPage_list',
      name: 'specialPage',
      component: specialPage
    },
    {
      path: '/specialPage_update',
      name: 'specialPage_update',
      component: SpecialPageUpdate
    },
    {
      path: '/special_update',
      name: 'special_update',
      component: SpecialUpdate
    },
    {
      path: '/10-2&special_list',
      name: 'special',
      component: special
    },
    {
      path: '/special_new',
      name: 'special_new',
      component: special_new
    },
    {
      path: '/specialPage_new',
      name: 'specialPage_new',
      component: specialPage_new
    },
    {
      path: '/11-1&authorityPage',
      name: 'authorityPage',
      component: AuthorityPage
    },
    {
      path: '/11-2&choosePackages',
      name: 'choosePackage',
      component: ChoosePackage
    },
    {
      path: '/11-3&freight_set',
      name: 'freight_set',
      component: freight_set
    },
    {
      path: '/11-4&integration',
      name: 'integration',
      component: integration
    },
    {
      path: '/11-5&customMess',
      name: 'customMess',
      component: customMess
    },
    {
      path: '/11-6&closeShop',
      name: 'closeShop',
      component: CloseShop
    },
    {
      path: '/user_list',
      name: 'user_list',
      component: user_list
    },
    {
      path: '/6-1&scene_set',
      name: 'scene_set',
      component: scene_set
    },
    {
      path: '/6-1&scene_user_list',
      name: 'scene_user_list',
      component: scene_user_list
    },
    {
      path: '/branch_list',
      name: 'branch_list',
      component: branch_list
    },
    {
      path: '/12-1&vip',
      name: 'vip',
      component: Vip
    },
    {
      path: '/12-2&events',
      name: 'event',
      component: Event
    },
  ]
})
