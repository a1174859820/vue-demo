import { setStore, removeStore, getStore } from '../config/mUtils'
import {RECORD_SHOPDETAIL, SAVE_GEOHASH,RECORD_USERINFO,ADD_CART,ADD_CART_NUMBER,REMOVE_CART,INIT_CART,SAVE_ADDDETAIL,SAVE_QUESTION,SAVE_REMARKS} from './mutation-type.js'
export default{
    //获取商店详情
    [RECORD_SHOPDETAIL](state,detail){
        state.shopDetail = detail
    },
    //保存geohash
    [SAVE_GEOHASH](state,geohash){
        state.geohash = geohash;
        setStore('geohash',geohash)
    },
    //保存用户数据
    [RECORD_USERINFO](state,info){
        state.userInfo = info;
        state.login = true;
        setStore('user_id',info.user_id);
    },
    //初始化购物车数据
    [INIT_CART](state){
        let num = JSON.parse(getStore('shopCartNumber'));
        let list = JSON.parse(getStore('shopCartList'));
        if(!list){
            return
        }
        state.shopCartList = list;
        state.shopCartNumber = num;
    },
    //保存购物车商品列表
    [ADD_CART](state,list){
        state.shopCartList = list;
        setStore('shopCartList',state.shopCartList)
    },
    //记录购物车商品数量
    [ADD_CART_NUMBER](state,num){
        state.shopCartNumber = num;
        setStore('shopCartNumber',state.shopCartNumber)
    },
    //移除购物车
    [REMOVE_CART](state){
        removeStore('shopCartList')
        removeStore('shopCartNumber')
        state.shopCartList = [];
        state.shopCartNumber = {}
    },
    //保存用户详细地址信息
    [SAVE_ADDDETAIL](state,addAddress){
        state.addAddress = addAddress
    },
    //保存问题详情
    [SAVE_QUESTION](state,question){
        state.question = question
    },
    //保存备注详情
    [SAVE_REMARKS](state,remarks){
        state.remarks = remarks
    }
}