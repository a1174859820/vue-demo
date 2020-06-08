<template>
    <div id="shop_info">
        <mt-header title="商家详情">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
            </router-link>  
        </mt-header>
        <div class="shop_info_container">
            <section class="activities">
                <header>活动与属性</header>
                <li v-for="item in shopDetail.supports" :key="item.id">
                    <span :style='{backgroundColor: "#" + item.icon_color}'>{{item.icon_name}}</span>
                    <span>{{item.description}}(APP专享)</span>
                </li>
            </section>
            <section class="safe">
                <header>
                    <span>食品监督安全公示</span>
                    <router-link to="/shop/shopInfo/shopSafe" class="safe_show">企业认证详情></router-link>
                </header>
                <section class="safe_status">
                    <div class="safe_status_icon">
                        <img src="#" alt="">
                    </div>
                    <div class="safe_status_detail">
                        <p>监督检查结果:{{shopDetail.status?'良好':'差'}}</p>
                        <p>检查日期:</p>
                    </div>
                </section>
            </section>
            <section class="info">
                <header>商家信息</header>
                <section>
                    <li>{{shopDetail.name}}</li>
                    <li>{{shopDetail.address}}</li>
                    <li>营业时间:[{{shopDetail.opening_hours[0]}}]</li>
                    <li>营业执照</li>
                    <li>餐饮服务许可证</li>
                </section>
            </section>
        </div>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {
        }
    },
    computed:{
        ...mapState(['shopDetail'])
    },
    mounted(){
    }
}
</script>
<style lang="less" scoped>
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
    #shop_info{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;  
		background-color: #ebebeb;
        z-index: 18;
    }
    .shop_info_container{
        width: 100%;
    }
    .white_space{   
        padding: 1rem;
        width: 100%;
        background: #fff;
    }
    .header{        
        height: 2rem;
        font-size: 1.2rem;
    }
    .activities{
        .white_space;
        header{
            .header
        }
        li{
            font-size: 0.8rem;
            margin-top: 1rem;
        }
    }
    .safe{
        position: relative;
        .white_space;
        header{
            .header;
            .safe_show{
                position: absolute;
                right: 1rem;
                color: #ccc
            }
        };
        .safe_status{
            width: 100%;
            height: 6rem;
            display: flex;
            .safe_status_icon{
                width: 30%;
                height: 5rem;
            }
            .safe_status_detail{
                width: 70%;
                height: 5rem;
                p{
                    margin-top: 0.8rem;
                    color: #000;
                    font-size: 0.8rem;
                }
            }
        }
    }
    .info{
        .white_space;
        width: 100%;
        header{
            .header;
        }
        section{
            li{
                width: 100%;
                height: 2.5rem;
                line-height: 2.5rem;
                font-size: 0.8rem;
            }
        }
    }  
</style>