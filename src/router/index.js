import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App'
import Home from '../views/home/home.vue'
import City from '../views/city/city.vue'
import Msite from '../views/msite/msite.vue'
import Login from '../views/login/login.vue'
import Shop from '../views/shop/shop.vue'
import shopInfo from '../views/shop/children/shopInfo.vue'
import foodInfo from '../views/shop/children/foodInfo.vue'
import shopSafe from '../views/shop/children/children/shopSafe.vue'
import Order from '../views/order/order.vue'
import Search from '../views/search/search.vue'
import Profile from '../views/profile/profile.vue'
import profileInfo from '../views/profile/children/profileInfo.vue'
import setUsername from '../views/profile/children/children/setUsername.vue'
import saveAddress from '../views/profile/children/children/saveAddress.vue'
import addAddress from '../views/profile/children/children/children/addAddress.vue'
import addDetail from '../views/profile/children/children/children/children/addDetail.vue'
import service from '../views/service/service.vue'
import serviceDetail from '../views/service/children/serviceDetail.vue'
import vip from '../views/vip/vip.vue'
import pay from '../views/pay/pay.vue'
import confirmOrder from '../views/confirmOrder/confirmOrder.vue'
import remark from '../views/confirmOrder/children/remark.vue'
import resetpsw from '../views/resetpsw/resetpsw.vue'
import redpaper from '../views/redpaper/redpaper.vue'
Vue.use(VueRouter)

const routes = [{
  path:'/',
  component:App,
  children:[{
    path:'',
    redirect:'/home'
  },{
    path:'/home',
    component:Home
  },{
    path:'/city/:cityid',
    component:City
  },{
    path:'/msite',
    component:Msite
  },{
    path:'/login',
    component:Login
  },{
    path:'/shop',
    component:Shop,
    children:[{
      path:'foodInfo',//食物详情页
      component:foodInfo
    },{
      path:'shopInfo',//商铺信息页
      component:shopInfo,
      children:[{
        path:'shopSafe',
        component:shopSafe
      }]
    }]
  },{
    path:'/order',
    component:Order
  },{
    path:'/search',
    component:Search
  },{
    path:'/profile',
    component:Profile,
    children:[{
      path:'profileInfo',
      component:profileInfo,
      children:[{
        path:'setUsername',
        component:setUsername
      },{
        path:'saveAddress',
        component:saveAddress,
        children:[{
          path:'addAddress',
          component:addAddress,
          children:[{
            path:'addDetail',
            component:addDetail
          }]
        }]
      }]
    }]
  },{
    path:'/service',
    component:service,
    children:[{
      path:'serviceDetail',
      component:serviceDetail
    }]
  },{
    path:'confirmOrder',
    component:confirmOrder,
    children:[{
      path:'remark',
      component:remark
    }]
  },{
    path:'/pay',
    component:pay
  },{
    path:'/vip',
    component:vip
  },{
    path:'resetpsw',
    component:resetpsw
  },{
    path:'/redpaper',
    component:redpaper
  }]
}]

const router = new VueRouter({
  mode:'hash',
  routes
})
export default router
