<template>
    <div id="payment">       
        <mt-header title="支付">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)"></mt-button>
            </router-link>
        </mt-header>
        <div class="payment_time">
            <span>
                剩余支付时间    
            </span>
            <p>
                {{time | timeToDate}}
            </p>
        </div>
        <div class="payment_type">
            <section>
                <span>支付宝支付</span>
            </section>
            <section>
                <span>微信支付</span>
            </section>
        </div>
        <mt-button type="primary" class="confirmPay" @click="confirmPay">确认支付</mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            time:900,//倒计时
        }
    },
    filters:{
        timeToDate(val){
            let hour = parseInt(val/3600);
            let min = parseInt(val/60);
            let sec = parseInt(val%60);
            if(min<10){
                min = '0' + min
            }
            if(sec<10){
                sec = '0' +sec
            }
            if(hour<10){
                hour = '0' + hour
            }
            return hour +':'+ min +':'+ sec
        }
    },
    mounted(){
        this.remainingTime()
    },
    beforeDestroy(){     
        this.timer = null;     
    },
    methods:{
        remainingTime(){//倒计时
            clearInterval(this.timer);
            this.timer = setInterval(()=>{
                this.time--;
                if(this.time==0){
                    clearInterval(this.timer);
                    alert('支付超时')
                }
            },1000)
        },
        confirmPay(){//点击支付后,支付成功(未实现),跳转订单页面
            this.$router.push('/order')
        }
    }
}
</script>
<style lang="less" scoped>
    #payment{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f2f2f2;
        z-index: 202;
    }
    .payment_time{
        text-align: center;
        padding: 1rem;
        p{
            font-size: 2rem;
            margin-top: 1rem;
        }
    }
    .payment_type{
        padding: 1rem;
        section{      
            height: 3rem;
            border-radius: 1rem;
            padding: 0 1rem;
            margin-top: 1rem;
            line-height: 3rem;
            background: #26a2ff;   
            display: flex;
            justify-content: space-between;
            span{
                color: #fff;
            }
        }
    }
    .confirmPay{
        width: 100%;
        margin-top: 1rem;
    }
</style>