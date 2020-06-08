<template>
    <div id="profile">      
      <mt-header title="个人中心">
         <router-link to="" slot="left">
            <mt-button icon="back" @click="$router.go(-1)"></mt-button>
         </router-link>
      </mt-header>
      <div class="profile_user" @click="profileLink">
          <section class="profile_user_photo">
              <div></div>
          </section>
          <section class="profile_user_login">
              <p v-if="!userInfo.id">登录/注册</p>
              <p v-else>{{userInfo.username}}</p>
              <span>暂无绑定手机号</span>
          </section>
          <section class="profile_user_arrow">
              >
          </section>
      </div>
      <div class="profile_list">   
            <li v-for="(item,index) in profileList" :key="index">
                <router-link :to="item.path">
                    <span>*</span>
                    <span>{{item.name}}</span>
                    <span class="profile_list_arrow">></span>
                </router-link>
            </li>
      </div>
      <transition name="router-slide">
        <router-view></router-view>
      </transition>
      <footer-guide></footer-guide>
    </div>
</template>
<script>
import footerGuide from '../../components/footerGuide.vue'
import {getStore} from '../../config/mUtils'
export default {
    data(){
        return{
            userInfo:{},
            profileList:[{
                name:'我的订单',
                path:'/order'
            },{
                name:'服务中心',
                path:'/service'
            },{
                name:'会员中心',
                path:'/vip'
            },{
                name:'我的红包',
                path:'/redpaper'
            }]
        }
    },
    mounted(){
        this.getUserInfo();  
    },
    methods:{
        profileLink(){
            let isRegister = Boolean(this.userInfo.id);
            if(isRegister){
                this.$router.push({path:'/profile/profileInfo'})
            }else{
                this.$router.push({path:'/login'})
            }
        },
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
        }
    },
    components:{
        footerGuide
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
    .profile_user{
        height: 7rem;
        background: #007aff;
        display: flex;
        .profile_user_photo{
            width: 7rem;
            padding: 1rem;
            div{
                width: 5rem;
                height: 5rem;
                background: white;
                border-radius: 50%;
            }
        }
        .profile_user_login{
            width: 60%;
            padding-top: 1.5rem;
            p{
                font-size: 1.2rem;
                margin-bottom: 0.2rem;
                color: #fff;
            }
            span{
                color: #fff;
            }
        }
        .profile_user_arrow{
            width: 10%;
            text-align: center;
            line-height: 7rem;
            color: white;
        }
    }
    .profile_list{
        margin-top: 1rem;
        li{
            padding-left: 1rem;
            height: 3rem;
            border-bottom: 1px solid gray;
            line-height: 3rem;
            position: relative;
            span{
                margin-right: 0.5rem;
            }
            .profile_list_arrow{
                position: absolute;
                right: 0;
            }
        }      
    }
</style>