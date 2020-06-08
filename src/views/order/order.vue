<template>
    <div id="order">      
        <mt-header title="我的订单">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
            </router-link>
        </mt-header>
        <div v-if="hasGetData">
            <ul>
                <li v-for="(item,index) in orderList" :key="index" class="order_item">
                    <header>
                        <h3>{{item.restaurant_name}}</h3>
                        <span>{{item.formatted_created_at}}</span>
                    </header>
                    <section>                 
                        <div v-for="(item,index) in item.basket.group[0]" :key="index" class="order_food">
                            <h4 class="ellipsis">{{item.name}}</h4>
                            <span>{{item.price}}</span>
                            <span>{{item.quantity}}</span>
                        </div>
                        <p class="order_status">                            
                            <timer :time="time - item.time_pass" v-if="(time - item.time_pass)>0"></timer>
                            <span>{{item.status_bar.title}}</span>
                            <router-link to="/">再来一单</router-link>
                        </p>
                    </section>
                </li>
            </ul>
        </div>
        <div style="height:3rem"></div>
        <footer-guide></footer-guide>
    </div>
</template>
<script>
import footerGuide from '@/components/footerGuide.vue'
import timer from './components/timer.vue'
import {getStore} from '@/config/mUtils.js'
export default {
    data(){
        return {
            offset:0,
            orderList:[],
            time:900,
            hasGetData:false
        }
    },
    created(){
        this.userId = JSON.parse(getStore('user_id')) || '';
        this.initData()
    },
    methods:{
        async initData(){
            if(this.userId){            
                await this.axios.get(`/bos/v2/users/${this.userId}/orders`,{
                    params:{
                        limit:10,
                        offset:this.offset
                    }
                }).then(res=>{
                    this.orderList = res.data;
                    this.hasGetData = true
                })
            }
        }
    },
    components:{
        footerGuide,
        timer
    }
}
</script>
<style lang="less" scoped>
    .fl{
        display: flex;
        justify-content: space-between;
    }
    .order_item{
        padding: 1rem;
        margin: 1rem;
        background: #26a2ff;
        border-radius: 1rem;
        header{
            height: 2rem;
            .fl
        }
        .order_food{
            height: 1.5rem;
            .fl;
            h4{
                width: 30%;
            }
            span{
                margin-right: 2rem;
            }
        }
    }
    .order_status{
        .fl;
        a{
            color: #f60;
        }
    }
</style>