<template>
    <div id="setUsername">            
        <mt-header title="修改用户名">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)"></mt-button>
            </router-link>
        </mt-header>
        <div class="set_username">
            <input type="text" placeholder="请输入用户名" v-model="newusername" :class="{warn:warnusername}">
            <p v-if="warnusername || false">用户名长度不合法</p>
            <p v-else>用户名长度必须在5-10字符之间</p>
        </div>
        <mt-button type="primary" class="profile_info_exit" @click="resetUsername">确认修改</mt-button>      
    </div>
</template>
<script>
import { getStore } from '../../../../config/mUtils' 
import {mapMutations} from 'vuex'
export default {
    data(){
        return {
            newusername:'',
            warnusername:'',
            newUserInfo:{}
        }
    },
    watch:{
        newusername(){           
            if(this.newusername.length>10 || this.newusername.length<5){
                this.warnusername = true
            }else{
                this.warnusername = false
            }
        }
    },
    mounted(){
        this.newUserInfo = JSON.parse(getStore('userInfo'))
    },
    methods:{
        ...mapMutations(['RECORD_USERINFO']),
        //修改用户名后存入localStorage
        resetUsername(){
            if(!this.warnusername&&this.newusername.length){
                this.newUserInfo = Object.assign({},this.newUserInfo,{username:this.newusername});
                this.RECORD_USERINFO(this.newUserInfo);
                this.$router.go(-1);
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .warn{
        border: 1px solid red;
    }
    #setUsername{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f2f2f2;
        z-index: 203;
    }
    .set_username{
        height: 6rem;
        padding: 1rem;
        input{
            height: 2.5rem;
            width: 100%;
            font-size: 1.2rem;
            text-indent: 1rem;
        }
    }
    .profile_info_exit{
        width: 100%;
        margin-top: 1rem;
    }
</style>
