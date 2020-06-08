<template>
    <div id="shopMenu">
        <div class="menu_container" ref="maxHeight">
            <section class="menu_list">          
                <li class="ellipsis menu_item" v-for="(item,index) in menuList" :key="index" :class="{active:menuListIndex==index}">
                    <span @click="changeMenuClassify(index)">{{item.name}}</span>
                </li>
            </section>
            <transition name="menu-fade">                
                <section class="menu_food" v-if="showMenuClassify">
                    <ul>
                        <li v-for="(item,index) in menuListClassify.foods" :key="index" class="menu_food_container">
                            <router-link :to="{path:'/shop/foodInfo',query:{'foodInfo':item}}" class="menu_food_item">                      
                                <section>
                                    <h3 class="ellipsis">{{item.name}}</h3>
                                    <p class="ellipsis">{{item.description}}</p>
                                    <p class="ellipsis">月售{{item.month_sales}}份,好评{{item.satisfy_rate}}%</p>
                                </section>
                            </router-link>
                            <div class="menu_food_price">
                                <p>
                                    ￥<span>{{item.specfoods[0].price}}</span>
                                </p>
                                <p class="add_shop_cart" @click="addShopCart(item)">添加</p>
                            </div>
                        </li>
                    </ul>
                </section>
            </transition>
        </div>
        <shop-cart></shop-cart>
    </div>
</template>
<script>
import shopCart from './shopCart'
import {mapMutations,mapState} from 'vuex'
export default {
    data(){
        return {
            showMenuClassify:true,
            menuListIndex:0,
            menuListClassify:[]
        }
    },
    computed:{
        ...mapState(['shopCartList','shopCartNumber'])
    },
    components:{
        shopCart
    },
    methods:{
        ...mapMutations(['ADD_CART','ADD_CART_NUMBER']),
        changeMenuClassify(index){
            this.showMenuClassify = false;
            this.menuListIndex = index;
            this.$nextTick(()=>{
                this.menuListClassify = this.menuList[index];  
                this.showMenuClassify = true
            })
        },
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
                this.shopCartList.push(item)
                //vue无法监听对象的属性增删
                this.$set(this.shopCartNumber,item.item_id,1)
                this.ADD_CART(this.shopCartList)
            }
            this.ADD_CART_NUMBER(this.shopCartNumber)
        }
    },
    created(){
        this.menuListClassify = this.menuList[0];
    },
    mounted(){
        this.$nextTick(()=>{
            this.$refs.maxHeight.style.maxHeight = window.innerHeight - 16*16 + 'px'
        })
    },
    props:['menuList']
}
</script>
<style lang="less" scoped>
.menu-fade-enter,.food-fade-leave-active{
    opacity: 0;
}
.menu-fade-enter-active,.food-fade-leave-active{
    transition:all 0.4s;
}
    .menu_container{
        display: flex;
        overflow: hidden;     
        .menu_list{
            width: 25%;
            overflow: scroll;
            .active{
                background: #26a2ff;
                span{
                    color: #fff;
                }
            }
            .menu_item{
                height: 3rem;
                line-height: 3rem;
                text-align: center;
            }
        }
        .menu_food{
            width: 75%;
            overflow: scroll;
        }
    }
    .menu_food_container{    
        height: 8rem;
        border-bottom: 1px solid #ccc;
        .menu_food_price{
            padding: 0 1rem;
            height: 2rem;
            display: flex;
            justify-content: space-between;
            p{
                span{
                    font-size: 1.2rem;
                    color: #f60;
                }
            }
            .add_shop_cart{
                height: 1.8rem;
                background: #26a2ff;
                width: 3rem;
                text-align: center;
                border-radius: 1rem;
                color: white;
                font-size: .8rem;
                line-height: 1.8rem;
            }
        }
        .menu_food_item{
            height: 6rem;
            display: block;
            section{
                padding: 1rem;
                h3{
                    font-size: 1.2rem;
                    color: #26a2ff;
                }
                p{
                    margin-top: 0.2rem;
                    font-size: .8rem;
                    color: #666;
                }
            }
        }
    }
</style>