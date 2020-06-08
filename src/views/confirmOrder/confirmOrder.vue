<template>
    <div id="confirmOrder" v-if="hasGetData">
        <mt-header title="确认订单">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)"></mt-button>
            </router-link>
            <mt-button slot="right" v-if="userId">
                <router-link to="/order">订单</router-link>
            </mt-button>       
            <mt-button slot="right" v-else>
                <router-link to="/login">登录</router-link>
            </mt-button>
        </mt-header>

        <router-link :to="addressToPath" class="add_address" v-if="!addressList.length">
            <div>
                >>>请添加一个收货地址
            </div>
            <div>
                >
            </div>
        </router-link>
        <div class="address" v-else>
            <header>
                <span>{{addressList[0].name}}</span>
                <span>{{addressList[0].phone}}</span>
                <span style="color:#f60">(默认收货地址)</span>
            </header>
            <section>
                <span>{{addressList[0].address}}</span>
                <span>{{addressList[0].address_detail}}</span>
            </section>
        </div>
        <div class="deliver_time">
            <div>
                <strong>送达时间</strong>
            </div>
            <div>
                <p>尽快送达 | 预计 {{checkoutData.delivery_reach_time}}</p>
                <p class="deliver_time_mode" v-if="checkoutData.cart.is_deliver_by_fengniao">蜂鸟专送</p>
            </div>
        </div>

        <div class="pay_way">
            <div>
                <p>支付方式</p>
                <span>在线支付></span>
            </div>
            <div>
                <span>红包</span>
                <span>暂时只在饿了么app中支持</span>
            </div>
        </div>

        <div class="order_list">
            <header v-if="checkoutData.cart.restaurant_info">
                <strong>{{checkoutData.cart.restaurant_info.name}}</strong>
            </header>
            <ul v-if="checkoutData.cart.groups">
                <li v-for="item in checkoutData.cart.groups[0]" :key="item.id">
                    <p>{{item.name}}</p>
                    <p class="order_list_price">
                        <span class="order_list_num">x{{item.quantity}}</span>
                        <span>￥{{item.price}}</span>
                    </p>
                </li>
                <li v-if="checkoutData.cart.extra">
                    <p>{{checkoutData.cart.extra[0].name}}</p>
                    <p>￥{{checkoutData.cart.extra[0].price}}</p>
                </li>
                <li>
                    <p>配送费</p>
                    <p>￥{{checkoutData.cart.deliver_amount || 0}}</p>
                </li>
                <li>
                    <p>总计</p>
                    <p class="order_list_num">待支付￥{{checkoutData.cart.total}}</p>
                </li>
            </ul>
        </div>

        <div class="order_other">
            <router-link :to="{path:'/confirmOrder/remark',query:{id: checkoutData.cart.id, sig: checkoutData.sig}}">
                <p>订单备注</p>
                <span v-if="remarks.label&&(remarks.label.length)>1">
                    {{remarks.label[0]}}                
                    {{remarks.label[1]}}...                
                </span>
                <span v-else>口味、偏好等></span>
            </router-link>
            <div @click="showInvoice = !showInvoice" class="order_invoice">
                <span>发票抬头</span>
                <span v-if="invoice">不需要开发票></span>  
                <span v-else>已开发票></span>
            </div>
                        
            <mt-popup popup-transition="popup-fade" v-model="showInvoice" position="bottom">
                <div class="show_invoice">
                    <span>不需要开发票</span>
                    <input type="checkbox" v-model="invoice" />
                </div>
            </mt-popup>
        </div>
        <div style="height:4rem"></div>
        <section class="shop_cart">
            <div class="shop_cart_total">
                <span>待支付:￥{{checkoutData.cart.total}}</span>
            </div>
            <div class="shop_cart_pay">
                <div>                 
                    <span @click="confirmOrder">去结算</span>
                </div>
            </div>
        </section>
        <transition name="router-slide">
            <router-view></router-view>         
        </transition>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import {getStore} from '@/config/mUtils.js'
export default {
    data(){
        return{
            userId:'',
            shopId:'',
            geohash:'',
            addressList:[],//收货地址列表
            checkShopCartList:[],//检验订单数据,发给后台
            checkoutData:[],//购物列表数据
            hasGetData:false,
            showInvoice:false,
            invoice:true,
        }
    },
    created(){
        this.userId = getStore('user_id');
        this.initData();
    },
    computed:{
        ...mapState(['shopCartList','shopCartNumber','remarks']),
        addressToPath(){
            if(this.userId){
                return '/profile/profileInfo/saveAddress'
            }else{
                return '/login'
            }
        }
    },
    methods:{
        ...mapMutations(['INIT_CART','REMOVE_CART']),
        async initData(){
            //获取收货地址列表
            if(this.userId){
                await this.axios.get(`/v1/users/${this.userId}/addresses`).then(res=>{
                    this.addressList = res.data;
                })
            }
            //购物车数据初始化
            this.INIT_CART();
            //获取所需参数shopId,geohash;
            this.shopId = this.$route.query.shopId;
            this.geohash = this.$route.query.geohash;
            //将购物车数据整理后发给后台
            this.shopCartList.forEach(item=>{
                item = item.specfoods[0];
                let cartlistItem = {
                        attrs: [],
                        extra: {},
                        id: item.food_id,
                        name: item.name,
                        packing_fee: item.packing_fee,
                        price: item.price,
                        quantity: this.shopCartNumber[item.item_id],
                        sku_id: item.sku_id,
                        specs: [item.specs],
                        stock: item.stock
                };
                this.checkShopCartList.push(cartlistItem)
            })
            //后台返回购车对应的结算数据
            await this.axios.post('/v1/carts/checkout',{
                come_from: "web",
                geohash:this.geohash,
                entities:[this.checkShopCartList],
                restaurant_id: this.shopId,
            }).then(res=>{
                this.checkoutData = res.data;
                this.hasGetData = true
            })
        },
        async confirmOrder(){
            //用户未登录时弹出提示框
            if(!this.userId){
                alert('未登录,请登录')
                return 
            }else if(!this.addressList.length){
                alert('请添加收货地址')
                return
            }         
            //保存订单          
            let user_id = this.userId;
            let cart_id = this.checkoutData.cart.id;
            let data = {
                address_id: this.addressList[0].id,
                description: this.remarks,
                entities: this.checkoutData.cart.groups,
                geohash: this.geohash,
                sig: this.checkoutData.sig,
                come_from: "mobile_web",
                deliver_time: "",             
                paymethod_id: 1,
            }
            //提交订单信息,跳转支付页面
            await this.axios.post(`/v1/users/${user_id}/carts/${cart_id}/orders`,data).then(res=>{
                if(res.data.status == 1){
                    this.REMOVE_CART()
                    this.$router.push('/pay')
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.router-slide-enter-active, .router-slide-leave-active {
        transition: all .4s;
    }
.router-slide-enter, .router-slide-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
    .container{
        background: #fff;
        padding: 1rem;
        margin-top: .5rem;
    }
    .fl{
        display: flex;
        justify-content: space-between
    }
    .add_address{
        .container;
        .fl;
        margin-top: 0;
        height: 5rem;
        border-bottom: 1px dashed #26a2ff;
        div{
            line-height: 3rem;
        }
    }
    .address{     
        .container;
        border-bottom: 1px dashed #26a2ff;
        margin-top: 0;
        height: 5rem;
        header{
            height: 2rem;
            span{
                margin-right: 1rem
            }
        }
        section{
            height: 3rem;
            span{
                color: #666;
                margin-right: 1rem
            }
        }
    }
    .deliver_time{
        .container;
        .fl;
        height: 6rem;
        border-left: .5rem solid #26a2ff;
        align-items: center;
        div{
            strong{
                font-size: 1.2rem;
            }
            .deliver_time_mode{
                color: #26a2ff;
                text-align: right;
            }
        }
    }
    .pay_way{      
        height: 7rem;
        .container;
        div{
            .fl;
            margin-top: 1rem;
            span{
                color: #666;
            }
        }
    }
    .order_list{
        .container;
        header{
            font-size: 1.4rem;
        }
        li{
            .fl;
            margin-top: 1rem;
            .order_list_price{
                width: 30%;
                display: flex;
                justify-content: space-between;
            }
            .order_list_num{
                color: #f60;
            }
        }
    }
    .order_other{
        .container;
        a,.order_invoice{
            .fl;
            margin-top: 1rem;
            p{
                font-size: 1.2rem;
            }
            span{
                color: #666;
            }
        }
        .show_invoice{
            .fl;
            align-items: center;
            height: 4rem;
            font-size: 1.2rem;
            padding: 1rem;
        }
    }
    .shop_cart{
        height: 4rem;
        position: fixed;
        width: 100%;
        bottom: 0;
        display: flex;
        font-size: 1rem;
        text-align: center;
        line-height: 4rem;
        .shop_cart_total{
            width: 70%;
            background: rgb(49, 43, 43);
            span{
                color: white;
            }
        }
        .shop_cart_pay{
            width: 30%;
            background: #26a2ff;
            span{
                color: white;
            }
        }
    }
</style>