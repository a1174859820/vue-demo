import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'


Vue.use(Vuex)

const state = {
  geohash: '',//地址geohash值
  latitude:'',//当前位置经度
  longitude:'',//当前位置维度
  shopDetail:null,//商家详情信息
  shopCartList:[],//购物车商品列表
  shopCartNumber:{},//购物车商品数量
  userInfo:null,//用户信息
  login:false,//是否登录
  addAddress:'',//用户详细地址
  question:{},//服务页面问题详情
  remarks:{}//备注详情
}
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
