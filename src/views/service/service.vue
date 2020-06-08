<template>
    <div id="service">  
        <mt-header title="服务中心">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)"></mt-button>
            </router-link>
        </mt-header>
        <div class="service">          
            <header>
                <h3>热门问题</h3>
            </header>
            <nav class="service_list">
                <router-link to="/service/serviceDetail" 
                v-for="(item,index) in questionList" 
                :key="index" tag="li" 
                class="service_list_item"
                @click.native="saveQuestion(item)">
                    <span>{{item.title}}</span>
                    <span>></span>
                </router-link>
            </nav>
        </div>
        <transition name="router-slide">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
    data(){
        return{
            questionList:[]
        }
    },
    mounted(){
        this.initData()
    },
    methods:{
        ...mapMutations(['SAVE_QUESTION']),
        async initData(){
            let serviceData;
            await this.axios.get('/v3/profile/explain').then(res=>{
                serviceData = res.data;
            })
            //将后台返回的对象放入数组
            let list = [];
            let itemData = {title:'',content:''};
            Object.keys(serviceData).forEach(item=>{
                let isCaption = item.indexOf('Caption') !== -1;
                if(isCaption){
                    itemData.title = serviceData[item];
                }else{             
                    itemData.content = serviceData[item];
                }
                if(itemData.title&&itemData.content){
                    list.push(itemData);
                    itemData = {title:'',content:''}
                }
            })
            this.questionList = list
        },
        saveQuestion(item){
            this.SAVE_QUESTION(item);
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
.service{
    padding:1rem;
}
.service_list{
    margin-top: 1rem;
    .service_list_item{
        height: 3rem;
        border-bottom: 1px solid #ccc;
        line-height: 3rem;
        display: flex;
        justify-content: space-between;
    }
}
</style>