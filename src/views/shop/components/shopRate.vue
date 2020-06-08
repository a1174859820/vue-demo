<template>
    <div id="shopRate">
        <section class="shop_rate">
            <div class="shop_rate_left">
                <h3>{{shopDetail.rating}}</h3>
                <p>综合评价</p>
                <p>高于周边商家{{(ratingScore.compare_rating * 100) | toFixed(2)}}%</p>
            </div>
            <div class="shop_rate_right">
                <p>服务态度:{{ratingScore.service_score | toFixed(1)}}</p>
                <p>菜品评价:{{ratingScore.food_score | toFixed(1)}}</p>
                <p>送达时间:{{ratingScore.deliver_time}}分钟</p>
            </div>
        </section>
        <section class="shop_rate_detail">
            <div class="shop_rate_classify">
                <li v-for="(item,index) in ratingClassify" :key="index" :class="{active:index==ratingClassifyIndex}" @click="shopRateClassifyActive(index)">{{item.name}}({{item.count}})</li>
            </div>
            <div class="shop_rate_list">
                <li class="shop_rate_item" v-for="(item,index) in ratingList" :key="index">
                    <header>
                        <div class="shop_rate_user">
                            <div class="shop_rate_img">
                                <img :src="getImgPath(item.avatar)" class="shop_rate_img_avatar">
                            </div>
                            <div class="shop_rate_userid">
                                {{item.username}}
                            </div>
                        </div>
                        <div class="shop_rate_time">
                            {{item.rated_at}}
                        </div>
                    </header>
                    <section>
                        <header>用户评分:{{item.rating_star}}</header>
                        <div>
                            我是评价内容我是评价内我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容容我是评价内容我是评价内容我是评价内容我是评价内容我是评价内容
                        </div>
                    </section>
                </li>
            </div>
        </section>
    </div>
</template>
<script>
import {getImgPath} from '../../../config/getImgPath'
export default {
    data(){
        return {
            ratingScore:[],//评分
            ratingClassify:[],//评论分类
            ratingClassifyIndex:0,//分类激活样式控制
            ratingList:[],//评论列表
        }
    },
    props:['shopDetail','shopId'],
    created(){
        this.initData()
    },
    filters:{
        toFixed(val,n){
            let numVal = Number(val);
            return numVal.toFixed(n)
        }
    },
    methods:{
        getImgPath,
        shopRateClassifyActive(index){
            this.ratingClassifyIndex = index
        },
        async initData(){
            //店铺评价信息
            await this.axios.get(`/ugc/v2/restaurants/${this.shopId}/ratings/scores`).then(res=>{
                this.ratingScore = res.data
            })
            //评论列表分类
            await this.axios.get(`/ugc/v2/restaurants/${this.shopId}/ratings/tags`).then(res=>{
                this.ratingClassify = res.data
            })
            //评论列表
            await this.axios.get(`/ugc/v2/restaurants/${this.shopId}/ratings`).then(res=>{
                this.ratingList = res.data
            })
        }
    }
}
</script>
<style lang="less" scoped>
    #shopRate{
        section{
            width: 100%;
        }
        .shop_rate{
            height: 8rem;
            display: flex;
            .shop_rate_left{
                width: 40%;
                text-align: center;
                padding: 1rem;
                h3{
                    height: 3rem;
                    font-size:2rem;
                    line-height: 3rem;
                    color: #26a2ff;
                }
                p{
                    height: 1.5rem;
                    font-size: 0.6rem;
                    line-height: 1.5rem;
                    color: #26a2ff;
                }
            }
            .shop_rate_right{
                width: 60%;
                padding: 1rem;
                p{
                    margin-left: 1rem;
                    height: 2rem;
                    line-height: 2rem;
                    color: #666;
                }
            }
        }
        .shop_rate_detail{
            margin-top: 1rem;
            .shop_rate_classify{
                height: 12rem;
                display: flex;
                flex-wrap: wrap;
                li{
                    width: 26%;
                    height: 2rem;
                    font-size: 0.8rem;
                    color: #666;
                    border:1px solid #26a2ff;
                    line-height: 2rem;
                    margin-left: 1rem;
                    margin-top: 1rem;
                    text-align: center;
                }
                .active{
                    color: #fff;
                    background: #26a2ff;
                }
            }
            .shop_rate_list{
                padding: 1rem;
                width: 100%;
                .shop_rate_item{
                    margin-top: 0.5rem;
                    header{
                        height: 3rem;
                        line-height: 3rem;
                        display: flex;
                        div{
                            height: 3rem;
                        }
                        .shop_rate_user{
                            width: 70%;
                            display: flex;
                            .shop_rate_img{
                                width: 3rem;
                                .shop_rate_img_avatar{
                                    width: 100%;
                                    height: 100%;
                                    border-radius: 50%;
                                }
                            }
                            .shop_rate_userid{
                                margin-left: 2rem;
                                width: 70%;
                            }
                        }
                        .shop_rate_time{
                            width: 30%;
                            color: #666;
                        }
                    }
                    section{
                        padding-top: 1rem;
                    }
                }
            }
        }
    }
</style>