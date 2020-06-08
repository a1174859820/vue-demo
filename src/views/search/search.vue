<template>
<div id="search">              
    <mt-header title="搜索">
        <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
        </router-link>
    </mt-header>

    <mt-search v-model="searchInput" placeholder="请输入要搜索的商店名称" @input="getSearchList">
        <div>
            <ul class="getposi">
                <li v-for="(item,index) in searchList" :key="index" @click="setSearchHistory(item)">
                    <h4 class="ellipsis">{{item.name}}</h4>
                    <p class="ellipsis">{{item.address}}</p>
                </li>
            </ul>
        </div>
    </mt-search>
    
    <div class="show_history" v-if="showHistory">
        <h3 class="history_header">搜索历史</h3>
        <ul class="history_list">
            <li class="history_item" v-for="(item,index) in searchHistory" :key="index" @click="historyHash(item)">
                <h4>{{item.name}}</h4>
                <p>{{item.address}}</p>
            </li>
        </ul>
        <h3 class="history_footer" @click="removeSearchHistory">清空所有</h3>
    </div>     
    <h3 class="history_none" v-if="noHistory">暂无历史记录</h3>
</div>
</template>
<script>
import { getStore,setStore, removeStore } from '../../config/mUtils'
export default {
    data(){
        return {
            geohash:'',
            searchInput:'',//搜索商店
            searchList:'',//商店列表
            searchHistory:[],//历史记录列表
        }
    },
    computed:{
        //判断显示历史记录列表
        showHistory(){
            if(!this.searchInput){
                return this.searchHistory.length ? true : false
            }else{
                return false
            }
        },
        noHistory(){
            if(!this.searchInput){
                return !this.searchHistory.length ? true :false
            }else{
                return false
            }
        }
    },
    
    methods:{
        async getSearchList(){
            //判断输入值是否为空
            if(this.searchInput){ 
                await this.axios.get('/v4/restaurants',{
                    params:{
                        'extras[]': 'restaurant_activity',
                        geohash:this.geohash,
                        keyword:this.searchInput,
                        type: 'search'
                    }
                }).then(res=>{
                    this.searchList = res.data
                })
            }
        },
        //历史记录跳转
        historyHash(shopItem){
            this.$router.push({
                path:'shop',
                query:{
                    geohash:this.geohash,
                    id:shopItem.id
                }
            })
        },
        //点击搜索结果，将该条搜索记录存入历史记录
        setSearchHistory(shopItem){
            let history = getStore('searchHistory');
            if(history){
                this.searchHistory = JSON.parse(history);
            }
            let checkrepeat = false;
            
            //判断是否重复添加
            this.searchHistory.forEach(item => {
                if(item.name == shopItem.name){
                    checkrepeat = true
                }
            })

            if(!checkrepeat){
                this.searchHistory.push(shopItem)
            }
            this.searchInput = ''
            setStore('searchHistory',this.searchHistory)
            this.historyHash(shopItem)      
        },
        //删除本条历史记录
        deleteHistory(index){
            this.searchHistory.splice(index,1);
            setStore('searchHistory',this.searchHistory)
        },
        //清空历史记录
        removeSearchHistory(){
            this.searchHistory = [];
            removeStore('searchHistory')
        }
    },
    mounted(){
        this.geohash = getStore('geohash');
        this.searchHistory = JSON.parse(getStore('searchHistory')) || [];
    }
}
</script>
<style lang="less" scoped>
.mint-search{
    height: 3.5rem;
}
.show_history{
    width: 100%;
    background: #ccc;  
    .history_header,.history_footer{
        width: 100%;
        height: 3.5rem;
        line-height: 3.5rem;
        text-align: center;
    }
    .history_list{
        width: 100%;
        li{
            width: 100%;
            height: 3.5rem;
            border: 1px solid red;
        }
    }
}
.history_none{
    width: 100%;
    height: 3.5rem;
    line-height: 3.5rem;
    text-align: center;
}
.getposi{
    width: 100%;
    li{      
        margin: 1rem auto;
        text-indent: 1rem;
        h4{
            height: 2rem;
        }
        p{
            font-size: 0.8rem;
            color: #c4c4c4;
            height: 1.5rem;
        }
    }
}
</style>