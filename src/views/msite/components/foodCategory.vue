<template>
    <div id="foodCategory">
        <!-- 切换头部 -->
        <div class="food_category">
            <header>
                <li v-for="(item,index) in headerList" :key="index" @click="switchType(index)" :class="{switch_active:type==index}">
                    {{item}}
                    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                        <polygon points="0,3 10,3 5,8"/>
                    </svg>
                </li>
            </header>
            <transition name="food-fade">
                <section class="food_category_detail" v-if="type == 0">
                    <section class="food_category_detail_title">
                        <li v-for="(item,index) in foodCategory" 
                            :key="index" 
                            @click="showCategorySub(index)"
                            :class="{active:showCategorySubActive == index}">
                            <div>
                                <img :src="getImgPath(item.image_url)" alt="">
                            </div>
                            <span>{{item.name}}</span>
                            <span>({{item.count}})</span>
                        </li>        
                    </section>                       
                    <section class="food_category_detail_sub">
                        <li v-for="(item,index) in foodCategorySub" :key="index" @click="sortById(item.id)">
                            <span>{{item.name}}</span>
                            <span>{{item.count}}</span>
                        </li>
                    </section>
                </section>
            </transition>
            <!--  切换头部对应列表 -->
            <transition name="food-fade">
                <section class="food_category_sort" v-if="type == 1">
                    <li v-for="(item,index) in foodCategorySort" :key="index" @click="sortByType(item.type)">{{item.name}}</li>
                </section>
            </transition>
            <transition name="food-fade">
                <section class="food_category_sieve" v-if="type == 2">
                    <section>
                        <h4>配送方式</h4>
                        <p v-for="(item,index) in sieveDelivery" :key="index" @click="sortBySieve(item)" :class="{select_active:delivery_mode}">
                            <span>#</span>
                            <span>{{item.text}}</span>
                        </p>
                    </section>
                    <section>
                        <h4>商家属性(多选)</h4>
                        <ul>
                            <li v-for="(item,index) in sieveActivity" 
                            :key="index" 
                            @click="sortBySieve(item,index)" 
                            :class="{select_active:support_ids[index]}">
                                <span class="filter_icon" :style="{color: '#' + item.icon_color, borderColor: '#' + item.icon_color}">{{item.icon_name}}</span>
                                <span>{{item.name}}</span>
                            </li>
                        </ul>
                    </section>
                    <footer>
                        <mt-button type="danger" class="food_category_sieve_btn" @click="clearSieve">清空</mt-button>
                        <mt-button type="primary" class="food_category_sieve_btn" 
                        @click.stop="sortConfirmSieve">确定 ( {{sieveCount}} )</mt-button>
                    </footer>
                </section>
            </transition>
            <!-- 商店列表展示 -->
            <transition name="food-fade">
                <shop-list 
                :geohash="geohash" 
                :restaurantCategoryIds="restaurant_category_ids"
                :sortByType="restaurant_type"
                :deliveryMode="delivery_mode" 
                :supportIds="support_ids"
                :confirmSieve = "confirmSieve">
                </shop-list>
            </transition>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import shopList from './shoplist'
import {getImgPath} from '../../../config/getImgPath.js'
export default {
    data(){
        return{
            headerList:['分类','排序','筛选'],
            type:3,
            foodCategory:[],
            foodCategorySub:[],
            showCategorySubActive:true,//二级级菜单激活样式
            foodCategorySort:[{name:'智能排序',type:0},
            {name:'起送价最低',type:1},
            {name:'配送速度最快',type:2},
            {name:'评分最高',type:3},
            {name:'距离最近',type:5},
            {name:'销量最高',type:6}],
            sieveDelivery:[],//筛选列表配送方式
            sieveActivity:[],//筛选列表商家属性
            sieveCount:0,//选择商家属性数量
            confirmSieve:false,
            restaurant_category_ids: "", //商店类型
            restaurant_type: null, // 排序方式
            delivery_mode: null, // 配送方式
            support_ids: [], // 商家属性
        }
    },
    components:{
        shopList
    },
    props:['geohash'],
    computed:{
        ...mapState(['latitude','longitude'])
    },
    mounted(){
        this.initData();
    },
    methods:{
        getImgPath,
        //切换分类头部导航
        switchType(index){
            if(this.type==index){
                this.type = 3
            }else{
                this.type = index
                if(index==2){
                    this.confirmSieve=false
                }
            }
        },
        //根据id分类店铺
        sortById(id){
            this.restaurant_category_ids = id;
            this.switchType(4)
        },
        //根据方式排序店铺
        sortByType(type){
            this.restaurant_type = type;
            this.switchType(4)
        },
        //根据筛选分类店铺(样式控制)
        sortBySieve(item,index){
            this.$forceUpdate();
            if(item.text){
                this.delivery_mode = this.delivery_mode ? null : item.id;
            }else{
                this.support_ids[index] = this.support_ids[index] ? '' : {status:true,id:item.id};
            }
            let newSupport_ids = this.support_ids.filter(item=>{
                return item
            })
            this.sieveCount = this.delivery_mode + newSupport_ids.length    
        },
        //清空筛选选项
        clearSieve(){
            this.delivery_mode = null;
            this.support_ids = [];
            this.support_ids.length = this.sieveActivity.length;
            this.sieveCount = 0;
            this.confirmSieve = false
        },
        //点击确认按钮刷新页面
        sortConfirmSieve(){
            this.confirmSieve = true;
            this.switchType(4)
        },
        //二级分类切换
        showCategorySub(index){
            this.foodCategorySub = this.foodCategory[index].sub_categories;
            this.showCategorySubActive = index
        },
        async initData(){
            //获取分类食品列表
            await this.axios.get('/shopping/v2/restaurant/category',{
                params:{
                    latitude:this.latitude,
                    longitude:this.longitude
                }
            }).then(res=>{
                this.foodCategory = res.data;
                this.showCategorySub(0);
            })
            //筛选列表配送方式
            await this.axios.get('/shopping/v1/restaurants/delivery_modes',{
                params:{
                    latitude:this.latitude,
                    longitude:this.longitude
                }
            }).then(res=>{
                this.sieveDelivery = res.data
            })
            //筛选列表商家属性
            await this.axios.get('/shopping/v1/restaurants/activity_attributes',{
                params:{
                    latitude:this.latitude,
                    longitude:this.longitude
                }
            }).then(res=>{
                this.sieveActivity = res.data;
                this.support_ids.length = this.sieveActivity.length;
            })
        }
    }
}
</script>
<style lang="less" scoped>
.food-fade-enter,.food-fade-leave-active{
    opacity: 0;
}
.food-fade-enter-active,.food-fade-leave-active{
    transition:all 0.4s;
}
.food_category{
    background: #fff;
    position: relative;
    header{
        .switch_active{
            color: #26a2ff;           
            .sort_icon {
                transform: rotate(180deg);
                fill: #26a2ff;
            }
        }
        display: flex;
        height: 3rem;
        line-height: 3rem;
        justify-content: space-around;
        border-bottom: 1px solid #ccc;
        li{
            text-align: center;
        }
    }
    .food_category_common{   
        background: #fff;
        z-index: 203;
        position: absolute;
        width: 100%;
    }
    .food_category_detail{      
        .active{
            background: #26a2ff;
            border-radius: .8rem;
            span{
                color: #fff
            }
        };
        .food_category_common;
        display: flex;
        height: 25rem;
        section{
            overflow:scroll;
            padding: 1rem;
            li{
                height: 2rem;
                line-height: 2rem;
                margin-top: .5rem;
                display: flex;
                font-size: .8rem;
                div{
                    width: .8rem;
                    height: .8rem;
                    margin-left: .5rem;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .food_category_detail_title{
            width: 50%;
            span{
                margin-left: .5rem;
            }
        }
        .food_category_detail_sub{
            width: 50%;
            li{
                display: flex;
                justify-content: space-between;
            }
        }
    }
    .food_category_sort{
        .food_category_common;
        li{
            height: 3.5rem;
            line-height: 3.5rem;
            border-bottom: 1px solid #ccc;
            padding: 0 2rem;
        }
    }
    .food_category_sieve{      
        .select_active{
            border: 1px solid #26a2ff;
            span{
                color: #26a2ff;
            }
        }
        .food_category_common;   
        .food_category_sieve_btn{
            width: 45%;
            height: 3rem;
            margin: 2.5%;
        }
        section{
            padding: .5rem 2rem;
            p,li{
                font-size: .8rem;
                width: 6rem;
                height: 2rem;
                text-indent: .5rem;
                line-height: 2rem;
                margin-top: .5rem;
                border: 1px solid #666;
            }
            ul{
                display: flex;
                flex-wrap: wrap;
                li{
                    margin-right: .3rem;
                    .filter_icon{
                        border-radius: 0.2rem;
                        margin-right: 0.25rem;
                        border: 1px solid;
                    }
                }
            }
        }
    }
}
</style>