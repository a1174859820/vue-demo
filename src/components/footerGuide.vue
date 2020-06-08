<template>
    <div id="footer_guide">
        <router-link tag="li" :to="item.toPath" v-for="(item,index) in footerList" :key="index">
            {{item.name}}
        </router-link>
    </div>
</template>
<script>
export default {
    data(){
        return{
            footerList:[{
                name:'外卖',
                toPath:'/msite',
                src:''
            },{
                name:'搜索',
                toPath:'/search',
                src:''
            },{
                name:'订单',
                toPath:'/order',
                src:''
            },{
                name:'我的',
                toPath:'/profile',
                src:''
            }]
        }
    }
}
</script>
<style lang="less" scoped>
     #footer_guide{
        background-color: #fff;
        position: fixed;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0;
        width:100%;
        height: 3rem;
        display: flex;
        box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
        li{
            width: 25%;
            height: 3rem;
            text-align: center;
            line-height: 3rem;
        }
    }
</style>
