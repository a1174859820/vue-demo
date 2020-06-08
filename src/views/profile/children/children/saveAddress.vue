<template>
    <div id="saveAddress">          
        <mt-header title="编辑收货地址">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)"></mt-button>
            </router-link>
            <mt-button slot="right" @click="deleteAddressList">编辑</mt-button>
        </mt-header>
        <div class="save_address">          
            <router-link to="/profile/profileInfo/saveAddress/addAddress">
                <span>新增地址</span>
                <span>+</span>
            </router-link>
            <li v-for="(item,index) in addressList" :key="index">
                <p>
                    <span>{{item.name}}</span>
                    <span v-if="deleteAddress" @click="deleteAddressItem(item,index)">x</span>                    
                    
                </p>
                <p class="address_detail">
                    <span>{{item.address}}</span>
                    <span>{{item.phone}}</span>
                </p>
            </li>
        </div>
        <transition name="router-slide">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import {getStore} from '@/config/mUtils'
export default {
    data(){
        return{
            userId:'',
            addressList:[],
            deleteAddress:false
        }
    },
    created(){
        this.userId = JSON.parse(getStore('user_id'))
    },
    mounted(){
        this.getAddressList()
    },
    beforeUpdate(){
        this.getAddressList()        
    },
    methods:{
        async getAddressList(){
            await this.axios.get(`/v1/users/${this.userId}/addresses`).then(res=>{
                this.addressList = res.data;
            })
        },
        deleteAddressList(){
            if(this.addressList){
                this.deleteAddress = !this.deleteAddress
            }else{
                this.deleteAddress = false
            }
        },
        async deleteAddressItem(item,index){
            await this.axios.delete(`/v1/users/${this.userId}/addresses/${item.id}`).then(res=>{
                if(res.data.status){
                    this.addressList.splice(index,1)
                }
            })
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
#saveAddress{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f2f2f2;
    z-index: 203;
}
.save_address{
    a{
        display: flex;
        height: 3rem;
        padding: 1rem;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
    }
    li{     
        height: 4rem;
        padding: .5rem 1rem;
        border-bottom: 1px solid #ccc;
        margin-top: .5rem;
        .address_detail{
            span{
                color: #666;
                font-size: .8rem;
            }
        }
        p{
            height: 1.5rem;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>