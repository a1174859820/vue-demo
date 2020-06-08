<template>
    <div id="redpaper">             
        <mt-header title="我的红包">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)"></mt-button>
            </router-link>
        </mt-header>
        <div class="redpaper_container" v-if="userId">            
            <header>可用红包</header>
            <redpaper-item :redpaperList="redpaperUse"></redpaper-item>
            <header>过期红包</header>
            <redpaper-item :redpaperList="redpaperEnd"></redpaper-item>
        </div>
    </div>
</template>
<script>
import redpaperItem from './components/redpaperItem.vue'
import {getStore} from '@/config/mUtils.js';
export default {
    data(){
        return {
            redpaperUse:[],
            redpaperEnd:[]
        }
    },
    created(){
        this.userId = JSON.parse(getStore('user_id')) || '';
        if(this.userId){
            this.initData()
        }
    },
    components:{
        redpaperItem
    },
    methods:{
        async initData(){
            //获取所有红包
            await this.axios.get(`/promotion/v2/users/${this.userId}/hongbaos?limit=20&offset=0`).then(res=>{
                this.redpaperUse = res.data
            })
            //获取过期红包
            await this.axios.get(`/promotion/v2/users/${this.userId}/expired_hongbaos?limit=20&offset=0`).then(res=>{
                this.redpaperEnd = res.data;
                this.redpaperEnd.length = 3;
            })
        }
    }
}
</script>
<style lang="less" scoped>
.redpaper_container{
    margin: 1rem;
    border: 1px solid #ccc;
    header{
        height: 2rem;
        line-height: 2rem;
        background: #ccc;
        text-align: center;
    }
}
</style>