<template>
    <div id="vip">
        <mt-header title="会员中心">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)"></mt-button>
            </router-link>
        </mt-header>
        <div class="vip">
            <section class="vipinfo">
                <header>会员特权:</header>
                <section>
                    <p>>减免配送费</p>
                    <p>>每月减免30单，每日可减免3单，每单最高减4元</p>
                    <p>>蜂鸟专送专享</p>
                </section>
            </section>
            <section class="buy_vip">
                <header>开通会员:</header>
                <section>
                    <span>1个月</span>
                    <span>￥20</span>
                    <p>购买</p>
                </section>
            </section>
            <section class="vipcard">
                <header>兑换会员:</header>
                <input type="text" placeholder="请输入卡号">
                <input type="password" placeholder="请输入密码">
                <mt-button type="primary">确认兑换</mt-button>
            </section>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .fl{
        display: flex;
        justify-content: space-between;
    }
    .vip{
        padding: 1rem;
        .to_info{
            line-height: 2rem;
            display: block;
            height: 2rem;
            background: #ccc;
            padding: 0 1rem;
        }
        .container{          
            margin-top: 1rem;
            border: 1px solid #ccc;
            padding: 1rem;
        }
        .vipinfo{
            .container;
            p{
                color: #666;
                font-size: .9rem;
                margin-top: .5rem;
            }
        }
        .buy_vip{
            .container;
            section{
                .fl;
                margin-top: 1rem;
                p{
                    color: #f60;
                }
            }
        }
        .vipcard{
            .container;
            input{
                height: 2rem;
                border: 1px solid #ccc;
                margin-top: .5rem;
                text-indent: 1rem;
                width: 100%;
            }
            .mint-button{
                width: 100%;
                margin-top: 1rem;
            }
        }
    }
</style>