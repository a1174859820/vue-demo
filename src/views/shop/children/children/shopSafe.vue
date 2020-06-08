<template>
    <div id="shopSafe">
        <div class="shop_safe_container">
            <mt-header title="食品监督安全公示">
                <router-link to="" slot="left">
                    <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
                </router-link>  
            </mt-header>
            
            <section class="safe">
                <header>
                    <span>食品监督安全公示</span>
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

            <section class="register_show">
                <header>工商登记信息</header>
                <li>
                    <span>企业名称</span>
                    <span></span>
                </li>
                <li>
                    <span>工商执照注册号</span>
                    <span></span>
                </li>
                <li>
                    <span>注册资本</span>
                    <span></span>
                </li>
                <li>
                    <span>注册地址</span>
                    <span></span>
                </li>
                <li>
                    <span>属地监管所</span>
                    <span></span>
                </li>
                <li>
                    <span>法定代表人</span>
                    <span></span>
                </li>
                <li>
                    <span>经营范围</span>
                    <span></span>
                </li>
            </section>
            <section class="catering_permit">
                <header>餐饮许可证</header>
                <li>
                    <span>营业范围</span>
                    <span></span>
                </li>
                <li>
                    <span>许可证有效期</span>
                    <span></span>
                </li>
                <li>
                    <span>许可证号</span>
                    <span></span>
                </li>
                <li>
                    <span>发证时间</span>
                    <span></span>
                </li>
            </section>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
    data(){
        return {
        }
    },
    computed:{
        ...mapState(['shopDetail'])
    }
}
</script>
<style lang="less" scoped>
    #shopSafe{
		position: fixed;
		top: 0;
		left: 0;
        right: 0;
        bottom: 0;
		background-color: #ebebeb;
        z-index: 102;
        overflow: auto;
    }
    .shop_safe_container{
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
    .register_show{
        header{
            .header
        };
        .white_space;
        li{
                width: 100%;
                height: 2.5rem;
                line-height: 2.5rem;
                font-size: 0.8rem;
        }
    }
    .catering_permit{
        .register_show
    }
</style>