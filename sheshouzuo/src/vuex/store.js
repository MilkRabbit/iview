/**
 * Created by Administrator on 2017/10/27.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  // 定义状态
  state: {
    shopType: '',
    queryChinese:'',
    searchText:'',
    userInfo:{}
  },
  mutations: {
    setShopType (state, shopType){
      state.shopType = shopType;
    },
    newQueryChinese (state, queryChinese){
      state.queryChinese = queryChinese;
    },
    newSearchText(state, searchText) {
      state.searchText = searchText
    },
    newUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
  }
})

export default store
