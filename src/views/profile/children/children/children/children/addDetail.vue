<template>
    <div id="addDetail">               
        <mt-header title="搜索地址">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)"></mt-button>
            </router-link>
        </mt-header>
        <mt-search placeholder="请输入小区/写字楼/学校等" @input="getSearchList" v-model="address">
            <div>
                <ul class="getposi">
                    <li v-for="(item,index) in addressList" :key="index" @click="saveAddress(index)">
                        <h4 class="ellipsis">{{item.name}}</h4>
                        <p class="ellipsis">{{item.address}}</p>
                    </li>
                </ul>
            </div>
        </mt-search>
    </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
    data(){
        return{
            address:'',
            addressList:[]
        }
    },
    methods:{
        ...mapMutations(['SAVE_ADDDETAIL']),
        async getSearchList(){
            if(this.address){
                await this.axios.get('/v1/pois',{
                    params:{
                        type:'nearby',
                        keyword:this.address
                    }
                }).then(res=>{
                    this.addressList = res.data
                })
            }
        },
        saveAddress(index){
            this.SAVE_ADDDETAIL(this.addressList[index].name);
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less" scoped>
#addDetail{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f2f2f2;
    z-index: 204;
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