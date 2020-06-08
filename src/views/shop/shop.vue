<template>
    <div id="shop" v-if="shopDetail">
        <mt-header :title="shopDetail.name">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
            </router-link>
            
            <mt-button slot="right">
                <router-link to="/order">订单</router-link>
            </mt-button>
        </mt-header>
        <div class="shop_detail_header" v-if="shopDetail">
            <router-link to="/shop/shopInfo"> 
                <p>{{shopDetail.promotion_info}}</p>
                <p>商家地址:{{shopDetail.address}}</p>
                <p>
                    <span v-if="shopDetail.delivery_mode">{{shopDetail.delivery_mode.text}}:</span>
                    <span v-else>商家专送:</span>
                    {{shopDetail.float_minimum_order_amount}}分钟送达(配送费￥{{shopDetail.float_delivery_fee}})
                </p>
            </router-link>
        </div>
        <div class="change_show_type">
            <section @click="showType=true" :class="{change_show_type_active:showType}">商品</section>
            <section @click="showType=false" :class="{change_show_type_active:!showType}">评价</section>
        </div>
        <div class="show_type">
            <transition name="fade-change">      
                <shop-menu v-if="showType&&menuList.length" :menuList="menuList"></shop-menu>
                <shop-rate v-if="!showType" :shopDetail="shopDetail" :shopId="shopId"></shop-rate>
            </transition>
        </div>
        <transition name="router-slide" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex';
import shopMenu from './components/shopMenu.vue'
import shopRate from './components/shopRate.vue'
export default {
    data(){
        return {
            geohash:'',//位置信息
            shopId:'',//店铺id
            shopDetail:null,//店铺详情信息
            menuList:[],//食品列表
            showType:true,//切换商品和评论
        }
    },
    components:{
        shopMenu,
        shopRate
    },
    created(){
        this.geohash = this.$route.query.geohash;
        this.shopId = this.$route.query.shopId;
    },
    mounted(){
        this.initData();
    },
    computed:{
        ...mapState(['latitude','longitude'])
    },
    methods:{    
        ...mapMutations(['RECORD_ADDRESS','RECORD_SHOPDETAIL']),
        async initData(){
            if(!this.latitude){
                //获取位置信息
                await this.axios.get(`/v2/pois/${this.geohash}`).then(res=>{
                    this.RECORD_ADDRESS(res.data)
                })
            }
            //获取商铺信息
            await this.axios.get(`/shopping/restaurant/${this.shopId}`,{
                params:{
                    latitude:this.latitude,
                    longitude:this.longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics'
                }
            }).then(res=>{
                this.shopDetail = res.data;
                this.RECORD_SHOPDETAIL(this.shopDetail);
            })
            //获取商铺食品列表
            await this.axios.get('/shopping/v2/menu',{
                params:{
                    restaurant_id:this.shopId
                }
            }).then(res=>{
                this.menuList = res.data;
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .shop_detail_header{
        height: 6rem;
        background: #26a2ff;
        a{
            display: block;
            font-size: .8rem;
            padding: .5rem;
            p{
                color: #fff;
                margin-top: .2rem;
                span{
                    color: #fff;
                }
            }
        }
    }

    .change_show_type{
        display: flex;
        height: 3rem;
        border-bottom: 1px solid #ccc;
        section{
            width:50%;
            height:3rem;
            font-size: 1.1rem;
            line-height: 3rem;
            text-align: center;
        }
    }
    .change_show_type_active{
        color:#26a2ff;
    }

    .fade-change-enter-active,.fade-change-leave-active{
        transition: .5s all;
    }
    .fade-change-enter,.fade-change-leave{
        opacity: 0;
    }

    .router-slide-enter-active, .router-slide-leave-active {
        transition: all .4s;
    }
    .router-slide-enter, .router-slide-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>