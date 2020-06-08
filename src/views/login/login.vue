<template>
    <div id="login">
        <mt-header title="密码登录">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
            </router-link>
        </mt-header>
        <form class="login" v-if="loginWay">
            <section>
                <input type="text" name="user_name" placeholder="账号" v-model.lazy="userId" />
            </section>

            <section>
                <input type="password" name="user_pwd" placeholder="密码" v-model="passWord" />
            </section>
            
            <section>
                <input type="text" name="user_captcha_code" placeholder="验证码" maxlength="4" v-model="captchaCode"/>
            </section>
            <div class="change_captcha_code">
                <img :src="captchaCodeImg" />
                <span>看不清?</span>
                <span @click="getCaptchaCode" style="color:red;text-decoration:underline">换一个</span>
            </div>         
        </form>
        <form class="login" v-else>
            <section>
                <input type="text" name="user_name" placeholder="手机号" v-model.lazy="phoneNumber" />
            </section>

             <section>
                <input type="text" name="user_captcha_code" placeholder="验证码" maxlength="4" v-model="captchaCode"/>
            </section>

            <button v-show="!computedTime" @click.prevent="getVertifyCode">点击获取验证码</button>
            <button v-show="computedTime" @click.prevent>剩余{{computedTime}}s</button>
        </form>
        <p class="login_tips">
            未注册的账号，首次登陆时将自动注册
        </p>
        <button class="login_btn" @click="mobileLogin" style="background:#26a2ff">登录</button>
        <router-link tag="p" to="/resetpsw" class="reset_psw">
            重置密码
        </router-link>
        <p class="change_login" @click="changeLoginWay">
            切换登录方式
        </p>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
    data(){
        return {
            userId:'',
            userInfo:'',
            passWord:'',
            captchaCode:'',//图片验证码
            captchaCodeImg:null,//图片验证码地址
            loginWay:true,//登录方式
            phoneNumber:null,//电话号码
            computedTime:0//短信倒数计时
        }
    },
    computed:{
        rightPhoneNumber(){
            return /^1\d{10}$/gi.test(this.phoneNumber)
        }
    },
    created(){
        this.getCaptchaCode()
    },
    methods:{
        ...mapMutations(['RECORD_USERINFO']),
        //获取验证码，开发环境使用固定的图片，生产环境使用真实的验证码
        getCaptchaCode(){
            this.axios({
                method:'post',
                url:'/v1/captchas'
            }).then(res=>{
                this.captchaCodeImg = res.data.code
            })
        },
        //切换登录方式
        changeLoginWay(){
            this.loginWay = ! this.loginWay
        },
        //用户名登录
        async mobileLogin(){
            //表单输入简单验证
            if(!this.userId || !this.passWord || !this.captchaCode){
                alert("必须填写完整");
                this.getCaptchaCode()
                return
            }
            //请求用户信息
            await this.axios.post('/v2/login',{
                "username":this.userId,
                "password":this.passWord,
                "captcha_code":this.captchaCode
            }).then(res =>{
                this.userInfo = res.data;
            })
            //判断请求返回值，如果正确则将用户id存入localStorage
            if(this.userInfo.user_id){
                this.RECORD_USERINFO(this.userInfo);
                this.$router.go(-1);
            }else{                
                this.getCaptchaCode();
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .login{
        width: 100%;
        section{
            margin-top: 1rem;
            input{
                width: 100%;
                height: 3rem;
                font-size: 1.2rem;
                text-indent: 0.5rem;
            }
        }
        button{
            width: 100%;
            height: 3rem;
            font-size: 1.2rem;
            margin-top: 1rem;
        }
    }
    .login_tips{
        width: 100%;
        height: 1rem;
        font-size: 0.5rem;
        text-indent: 0.6rem;
        color: #666;
    }
    .change_captcha_code{
        .login_btn
    }
    .login_btn{
        width: 100%;
        height: 3rem;
        font-size: 1.2rem;
        text-indent: 0.5rem;
        margin-top: 1rem;
    }
    .reset_psw{
        .login_btn;
        text-align:center;
        font-size: 1rem;
        color: red
    }
    .change_login{
        .reset_psw;
    }
</style>