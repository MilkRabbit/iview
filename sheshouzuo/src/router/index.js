import Vue from 'vue'
import Router from 'vue-router'


import workspace from '@/components/admin/workspace'

import students from '@/components/students/students'
import works from '@/components/students/works'

import customer from '@/components/customer/customer'
import updateCustomer from '@/components/customer/updateCustomer'

import demand from '@/components/demand/demand'
import updateDemand from '@/components/demand/updateDemand'

import manuscript from '@/components/manuscript/manuscript'
import draft from '@/components/manuscript/draft'
import flow from '@/components/manuscript/flow'

import finance from '@/components/finance/finance'

import administrator from '@/components/administrator/administrator'

import recode from '@/components/setting/recode'
import page from '@/components/setting/page'

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
      path: '/students',
      name: 'students',
      component: students
    },
    {
      path: '/customer',
      name: 'customer',
      component: customer
    },
    {
      path: '/updateCustomer',
      name: 'updateCustomer',
      component: updateCustomer
    },
    {
      path: '/demand',
      name: 'demand',
      component: demand
    },
    {
      path: '/updateDemand',
      name: 'updateDemand',
      component: updateDemand
    },
    {
      path: '/manuscript',
      name: 'manuscript',
      component: manuscript
    },
    {
      path: '/finance',
      name: 'finance',
      component: finance
    },
    {
      path: '/administrator',
      name: 'administrator',
      component: administrator
    },
    {
      path: '/recode',
      name: 'recode',
      component: recode
    },
    {
      path: '/page',
      name: 'page',
      component: page
    },
    {
      path: '/draft/:demandId',
      name: 'draft',
      component: draft
    },
    {
      path: '/flow',
      name: 'flow',
      component: flow
    },
    {
      path: '/works/:id',
      name: 'works',
      component: works
    },
  ]
})
