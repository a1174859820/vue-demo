<template>
    <div id="city">
      <mt-header :title="cityname">
         <router-link to="" slot="left">
            <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
         </router-link>
         <mt-button slot="right">切换城市</mt-button>
      </mt-header>

      <mt-search v-model="cityaddr" placeholder="请输入地址" @input="getpois">
            <div>
                <ul class="getposi">
                    <router-link 
                    v-for="(item,index) in placeList" 
                    :key="index" 
                    @click.native="setHistory(item)"
                    :to="{path:'/msite',query:{geohash:item.geohash}}" 
                    tag="li">
                        <h4 class="ellipsis">{{item.name}}</h4>
                        <p class="ellipsis">{{item.address}}</p>
                    </router-link>
                </ul>
            </div>
       </mt-search>
        <div class="show_history" v-if="showHistory">
            <h4 class="history_header">搜索历史</h4>
            <ul class="history_list">
                <router-link class="history_item" 
                v-for="(item,index) in historyList" 
                :key="index" 
                :to="{path:'/msite',query:{geohash:item.geohash}}"
                @click.native="changeGeohash(item)"
                tag="li">
                    <h4 class="ellipsis">{{item.name}}</h4>
                    <p class="ellipsis">{{item.address}}</p>
                </router-link>
            </ul>
            <h4 class="history_footer" @click="removeHistory">清空所有</h4>
        </div>     
        <h3 class="history_none" v-if="noHistory">暂无历史记录</h3>
    </div>
</template>
<script>
import {getStore,setStore,removeStore} from '../../config/mUtils'
import {mapMutations} from 'vuex'
export default {
    data(){
        return {
            cityaddr:'',    //搜索地址
            cityname:'',    //当前城市名字
            cityid:'',      //当前id
            placeList:[],   //搜索城市列表
            historyList:[] //历史搜索记录列表
        }
    },
    computed:{
        //判断显示历史记录列表
        showHistory(){
            if(!this.cityaddr){
                return this.historyList.length ? true : false
            }else{
                return false
            }
        },
        noHistory(){
            if(!this.cityaddr){
                return !this.historyList.length ? true :false
            }else{
                return false
            }
        }
    },
    async mounted(){
        this.cityid = this.$route.params.cityid;
        await this.axios.get('/v1/cities/' + this.cityid).then(res=>{
            this.cityname = res.data.name
        });
        this.historyList = JSON.parse(getStore('placeHistory')) || [];//刷新页面获取历史记录
    },
    methods:{
        ...mapMutations(['SAVE_GEOHASH']),
        //发送信息搜索城市地址
        async getpois(){
            //判断输入值是否为空
            if(this.cityaddr){
                await this.axios.get('/v1/pois',{
                    params:{
                    type:'search',
                    city_id:this.cityid,
                    keyword:this.cityaddr
                    }
                }).then(res=>{
                    this.historyTitle = false;
                    this.placeList = res.data;
                    this.placeNone = res.data.length ? false : true
                })
            }
        },
        //点击搜索后存入搜索历史，不重复存储,然后跳转指定地址,将指定城市坐标存入localStorage
        setHistory(cityItem){
            let history = getStore('placeHistory');
            if(history){
                this.historyList = JSON.parse(history)
            }
            let checkrepeat = false;

            //判断是否重复添加
            this.historyList.forEach(item =>{
                if(item.name == cityItem.name){
                    checkrepeat = true
                }
            })
            if(!checkrepeat){
                this.historyList.push(cityItem)
            }
            this.cityaddr = ''
            setStore('placeHistory',this.historyList)
            this.SAVE_GEOHASH(cityItem.geohash);
        },
        //点击历史记录列表改变之前存储的geohash
        changeGeohash(cityItem){
            this.SAVE_GEOHASH(cityItem.geohash)
        },
        //清除历史信息
        removeHistory(){
            this.historyList=[];
            removeStore('placeHistory')
        }
    }
}
</script>
<style lang="less" scoped>
.show_history{ 
    .history_header,.history_footer{
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        background: #fff;
    }
    .history_footer{
        color: red;
    }
    .history_list{
        li{
            padding: .5rem;
            height: 4.5rem;
            border-bottom: 1px solid #ccc;
            text-indent: 1rem;
            p{
                color: #c3c3c3;
                margin-top: .2rem;
            }
        }
    }
}
.history_none{
    height: 3.5rem;
    line-height: 3.5rem;
    text-align: center;
}
.getposi{
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