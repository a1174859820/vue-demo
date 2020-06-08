<template>
    <div id="resetpsw">
        <mt-header title="修改密码">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
            </router-link>
        </mt-header>
        <form class="reset_psw">
            <section>
                <input type="text" name="user_name" placeholder="账号" v-model.lazy="userId" />
            </section>

            <section>
                <input type="password" name="user_pwd" placeholder="旧密码" v-model="oldPassWord" />
            </section>
            
            <section>
                <input type="password" name="user_newpwd" placeholder="新密码" v-model="newPassWord" />
            </section>

            <section>
                <input type="password" name="user_newpwd" placeholder="确认密码" v-model="confirmPassWord" />
            </section>

            <section>
                <input type="text" name="user_captcha_code" placeholder="验证码" maxlength="4" v-model="captchaCode"/>
            </section>
            <div class="change_captcha_code">
                <img :src="captchaCodeImg" />
            </div>
            <button class="reset_psw_btn" @click.prevent="commitReset">确认</button>
        </form>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
    data(){
        return {
            userId:'',
            userInfo:'',
            oldPassWord:'',
            newPassWord:'',
            confirmPassWord:'',
            captchaCode:'',//图片验证码
            captchaCodeImg:null,//图片验证码地址
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
        async commitReset(){
            let data = {
                username:this.userId,
                oldpassWord:this.oldPassWord,
                newpassword:this.newPassWord,
                confirmpassword:this.confirmPassWord,
                captcha_code:this.captchaCode
            }
            await this.axios.post('/v2/changepassword',data).then(res=>{
                if(res.data.status == 1){
                    alert('修改密码成功');
                    this.$router.go(-1)
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .reset_psw{
        width: 100%;
        height: 15rem;
        section{
            margin-top: 1rem;
            input{
                width: 100%;
                height: 3rem;
                font-size: 1.5rem;
                text-indent: 0.5rem;
            }
        }
        button{
            width: 100%;
            height: 3rem;
            font-size: 1.5rem;
            margin-top: 1rem;
        }
    }
    .reset_psw_btn{
        width: 100%;
        height: 3rem;
        font-size: 1.5rem;
        text-indent: 0.5rem;
        margin-top: 1rem;
    }
    .change_captcha_code{
       .reset_psw_btn
    }
</style>