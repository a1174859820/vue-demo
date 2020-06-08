<template>
    <div id="shopCart">
        <transition name="slide-cart">
            <section class="shop_cart_list" v-if="showShopCartList&&shopCartList.length">                 
                <header>
                    <span class="shop_cart_title">购物车</span>
                    <span class="clearAll" @click="removeShopCart">清空</span>
                </header>
                <section>
                    <ul>
                        <li>
                            <div>商品名称</div>
                            <div>商品总价</div>
                            <div>+/-</div>
                        </li>
                        <li v-for="(item,index) in shopCartList" :key="index">
                            <div class="ellipsis">{{item.name}}</div>
                            <div>{{item.specfoods[0].price * shopCartNumber[item.item_id]   }}</div>
                            <div class="shop_cart_num">
                                <p class="shop_cart_num_btn" @click="addShopNumber(1,item.item_id,index)">+</p>
                                <p>{{shopCartNumber[item.item_id]}}</p>
                                <p class="shop_cart_num_btn" @click="addShopNumber(-1,item.item_id,index)">-</p>
                            </div>
                        </li>
                    </ul>
                </section>
            </section>
        </transition>
        <section class="shop_cart">
            <div class="shop_cart_total" @click="toggleCart">
                <span>商品的总价为:￥{{totalPrice}}</span>
                <span v-if="deliveryFee">(含配送费￥{{deliveryFee}})</span>
            </div>
            <div class="shop_cart_pay">
                <span v-if="isFoodInfo" @click="addShopCart(foodInfo)">购买</span>
                <div v-else>                 
                    <router-link :to="{path:'/confirmOrder',query:{geohash,shopId}}" v-if="totalPrice>shopDetail.float_minimum_order_amount">
                        <span>去结算</span>
                    </router-link>
                    <span v-else>还差{{shopDetail.float_minimum_order_amount}}起送</span>
                </div>
            </div>
        </section>
        <div class="screen_cover" v-show="showShopCartList&&shopCartList.length" @click="showShopCartList = false"></div>
    </div>
</template>
<script>
import {mapMutations,mapState} from 'vuex'
export default {
    data(){
        return {
            showShopCartList:false,//控制购物车列表显示隐藏
            shopId:'',
            geohash:''
        }
    },
    computed:{
        ...mapState(['shopCartList','shopCartNumber','shopDetail']),
        //配送费
        deliveryFee(){
            return this.shopDetail.float_delivery_fee || false
        },
        //计算购物车总价
        totalPrice(){
            let sum = 0;
            this.shopCartList.forEach(item=>{
                let price = item.specfoods[0].price;
                let num = this.shopCartNumber[item.item_id];
                sum += price*num;
            })
            return sum + this.deliveryFee
        }     
    },
    created(){
        this.INIT_CART();
        this.shopId = this.$route.query.shopId;
        this.geohash = this.$route.query.geohash
    },
    watch:{
        shopId(){
            this.removeShopCart()
        }
    },
    props:['isFoodInfo','foodInfo'],
    methods:{
        ...mapMutations(['REMOVE_CART','ADD_CART_NUMBER','ADD_CART','INIT_CART']),
        //点击购物车显示购物车列表
        toggleCart(){
            if(this.shopCartList.length){
                this.showShopCartList = !this.showShopCartList
            }
        },
        //添加删除商品,数量为0时移出购物车列表
        addShopCart(item){
            //控制购物车最多商品数量
            let isFull = this.shopCartList.length >=10;
            if(isFull){
                alert('一次最多可添加10种商品')
                return 
            }
            //重复添加检测
            let checkrepeat = false;
            this.shopCartList.forEach(v=>{
                if(v.item_id==item.item_id){
                    checkrepeat = true;
                    this.shopCartNumber[item.item_id] ++
                }
            })
            if(!checkrepeat){
                this.shopCartList.push(item);
                //添加属性到shopCartNumber
                this.$set(this.shopCartNumber,item.item_id,1)
                this.ADD_CART(this.shopCartList)
            }
            this.ADD_CART_NUMBER(this.shopCartNumber)
        },
        //购物车各商品数量控制
        addShopNumber(num,name,index){
            this.shopCartNumber[name] +=num;
            let isNone = this.shopCartNumber[name] <= 0;
            if(isNone){
                this.shopCartList.splice(index,1)
            }
            this.ADD_CART(this.shopCartList)
            this.ADD_CART_NUMBER(this.shopCartNumber)
            this.$forceUpdate();
        },
        //清空购物车
        removeShopCart(){
            this.REMOVE_CART()
            this.showShopCartList = false
        }
    }
}
</script>
<style lang="less">
    .slide-cart-enter,.slide-cart-leave-to{
        transform: translateY(100%);
        opacity: 0;
    }
    .slide-cart-enter-active,.slide-cart-leave-active{
         transition: all .3s ease;
    }
    .screen_cover{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0,0,0,.3);
        z-index: -1;
    }
    #shopCart{
        width: 100%;
        position: absolute;
        bottom: 0;
        z-index: 12;
        background: #fff;
    }
    .shop_cart_list{
        header{
            display: flex;
            justify-content: space-between;
            height: 3rem;
            background: #c3c3c3;
            line-height: 3rem;
            .shop_cart_title{
                font-size: 1.4rem;
                margin-left: 2rem;
            }
            .clearAll{
                margin-right: 2rem
            }
        }
        section{
            width: 100%;
            text-align: center;
            li{
                border-bottom: 1px solid #ccc;
                line-height: 3rem;
                height: 3rem;
                display: flex;
                background: #fff;
                font-size: 1.2rem;
                div{
                    flex: 1;
                }
                .shop_cart_num{
                    display: flex;
                    p{
                        flex: 1;
                        text-align: center;
                    };
                    .shop_cart_num_btn{
                        background: #c3c3c3;
                    }
                }
            }
        }
    }
    .shop_cart{
        height: 4rem;
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