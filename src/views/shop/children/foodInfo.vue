<template>
    <div id="foodInfo">
        <mt-header :title="foodInfo.name">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="foodInfo" v-if="foodInfo">
            <section class="food_info_img">
                <div>
                    <img src="#" alt="">                   
                </div>
                <p>
                    超级无敌好吃的:
                    <strong>{{foodInfo.description}}</strong>
                </p>
            </section>
            <section class="food_info_detail">
                <div class="food_info_name">
                    {{foodInfo.name}}
                </div>
                <div>
                    评分:{{foodInfo.rating}}
                </div>
                <div>
                    <span>月售{{foodInfo.month_sales}}单</span>
                    <span>售价￥{{foodInfo.specfoods[0].price}}</span>
                </div>
                <div>
                    <span>评论数:{{foodInfo.rating_count}}</span>
                    <span>好评率:{{foodInfo.satisfy_rate}}%</span>
                </div>
            </section>
        </div>
        <shop-cart :isFoodInfo="isFoodInfo" :foodInfo="foodInfo"></shop-cart>
    </div>
</template>
<script>
import shopCart from '../components/shopCart.vue'
export default {
    data(){
        return{
            isFoodInfo:true,
            foodInfo:{}
        }
    },
    created(){
        this.foodInfo = this.$route.query.foodInfo;
    },
    components:{
        shopCart
    }
}
</script>
<style lang="less" scoped>
    #foodInfo{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		z-index: 12;
    }
    .food_info_img{
        width: 100%;
        height: 20rem;
        background: red;
        div{
            height: 18rem;
        }
        p{
            height: 2rem;
            line-height: 2rem;
            text-align: center;
            background: yellow;
        }
    }
    .food_info_detail{
        margin-top: 1rem;
        div{
            text-indent: 1rem;
            height: 3rem;
            line-height: 3rem;
            span{
                margin-right: 1rem;
            }
        }
        .food_info_name{
            font-size: 1.5rem;
        }
    }
</style>