<template>
    <div id="profileInfo">      
        <mt-header title="账户信息">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)"></mt-button>
            </router-link>
        </mt-header>
        <div class="profile_info_list">
            <section class="profile_info_avatar">
                <input type="file" class="upload-avatar">
                <div>
                    <h3>头像</h3>
                    <img src="#" alt="">
                </div>
            </section>
            <section class="profile_info_username">
                <span>用户名</span>
                <router-link to="/profile/profileInfo/setUsername">
                    <span class="profile_info_tousername">{{userInfo.username}}</span>       
                </router-link>
            </section>
            <section class="profile_info_username">
                <router-link to="/profile/profileInfo/saveAddress">
                    <span>收货地址</span>
                </router-link>
            </section>
            <section>
                <router-link to="/resetpsw">
                    <span>修改密码</span>
                </router-link>
            </section>
            <mt-button type="danger" class="profile_info_exit" @click="signout">退出登录</mt-button> 
        </div>
        <transition name="router-slide">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import { getStore,removeStore } from '@/config/mUtils'
export default {
    data(){
        return{
            userInfo:{},//用户信息
            avatar:'',//用户头像
        }
    },
    beforeMount(){
        this.getUserInfo();
    },
    methods:{
        async getUserInfo(){
            let userId = JSON.parse(getStore('user_id'));
            if(userId){              
                await this.axios.get('/v1/user',{
                    params:{
                        user_id:userId
                    }
                }).then(res=>{
                    this.userInfo = res.data;
                })
            }
        },
        async signout(){
            await this.axios.get('/v2/signout').then(res=>{
                if(res.data.status==1){
                    removeStore('user_id');
                    alert('退出登录成功');
                    this.$router.go(-1)
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
    #profileInfo{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f2f2f2;
        z-index: 202;
    }
    .profile_info_list{
        section{
            border-bottom: 1px solid #c3c3c3;
            padding:1rem;
        }
        .profile_info_avatar{  
            height: 6rem;
            position: relative;
            input{
                width: 100%;
                height: 4rem;
                position: absolute;
                left: 0;
                opacity: 0;
            }
            div{
                height: 4rem;
                display: flex;
                justify-content: space-between;
                line-height: 4rem;
                img{
                    width: 4rem;
                    height: 4rem;
                    background: red;
                    border-radius: 2rem;
                }
            }
        }
        .profile_info_username{
            height: 4rem;
            line-height: 2rem;
            display: flex;
            justify-content: space-between;
            .profile_info_tousername{
                color: blueviolet;
            }
        }
        .profile_info_exit{
            width: 100%;
            margin-top: 1rem;
        }
    }
</style>