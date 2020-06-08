<template>
    <div id="addAddress">               
        <mt-header title="新增地址">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)"></mt-button>
            </router-link>
        </mt-header>
        <form action="" v-on:submit.prevent>
            <section>
                <div class="addAddress_item" v-for="(item,index) in commitAddress" :key="index">
                    <input type="text" 
                    :placeholder="item.placeholder" 
                    :class="{warn:vertify}" 
                    :readonly="item.readonly"
                    v-model="item.text" 
                    @input="vertifyInput(index,item)" 
                    @click="addDetail(index)">
                    <p v-if="item.vertify">{{item.warnText}}</p>
                </div>
            </section>
            <section>
                <mt-button type="primary" class="profile_info_exit" :disabled="!canCommit" @click="submitAddress">新增地址</mt-button> 
            </section>
        </form>
        <transition name="router-slide">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import {getStore} from '@/config/mUtils.js'
export default {
    data(){
        return{
            userId:'',
            geohash:'',
            vertify:true,//验证输入内容
            commitAddress:{
                'name':{
                    text:'',
                    placeholder:'请填写您的姓名'
                },
                'address':{
                    text:'',
                    placeholder:'小区/写字楼/学校等',
                    readonly:'readonly'
                },
                'address_detail':{
                    text:'',
                    placeholder:'请填写详细送餐地址',
                    warnText:'',
                    vertify:false,
                    commit:false
                },
                'phone':{
                    text:'',
                    placeholder:'请填写您的联系手机',
                    warnText:'',
                    vertify:false,
                    commit:false
                },
                'phone_bk':{
                    text:'',
                    placeholder:'备用联系电话(选填)'
                }
            }
        }
    },
    beforeUpdate(){
        this.commitAddress.address.text = this.addAddress;
    },
    created(){
        this.userId = JSON.parse(getStore('user_id'));
        this.geohash = getStore('geohash');
    },
    computed:{
        ...mapState(['addAddress']),
        //按钮样式判断,是否可以发送地址信息
        canCommit(){
            let c = this.commitAddress;
            if(c.name.text&&c.address.text){
                if(c.address_detail.commit&&c.phone.commit){
                    return true
                }
            }
            return false
        }
    },
    methods:{
        //跳转地址搜索页面
        addDetail(name){
            if(name=="address"){
                this.$router.push('/profile/profileInfo/saveAddress/addAddress/addDetail')
            }
        },
        //详细地址,手机号输入验证
        vertifyInput(val,item){
            switch (val){
                case "address_detail":
                    item.vertify = true;
                    item.commit = false;
                    if(item.text.length == 0){
                        item.warnText = "请填写详细的送餐地址";
                    }else if(item.text.length>0&&item.text.length<=2){
                        item.warnText = "送餐地址太短了,无法辨识"
                    }else{
                        item.warnText = '';
                        item.vertify = false;
                        item.commit = true
                    }
                    break;
                case "phone":
                    item.vertify = true;
                    item.commit = false;
                    if((/^[1][358][0-9]{9}$/).test(item.text)){
                        item.vertify = false;
                        item.commit = true
                    }else if(item.text == ''){
                        item.warnText = '手机号不能为空'
                    }else{
                        item.warnText = '请输入正确的手机号'
                    }
                    break;             
            }
        },
        async submitAddress(){
            let data = {               
                name: this.commitAddress.name.text,
                address: this.commitAddress.address.text,
                address_detail: this.commitAddress.address_detail.text,
                geohash:this.geohash,             
                phone: this.commitAddress.phone.text,
                phone_bk: this.commitAddress.phone_bk.text,
                poi_type:0, 
                sex:1, 
                tag:'公司', 
                tag_type:4
            }
            await this.axios.post(`/v1/users/${this.userId}/addresses`,data).then(res=>{
                if(res.data.status){
                    alert('添加地址成功');
                    this.$router.go(-1)
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
#addAddress{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f2f2f2;
    z-index: 203;
}
.warn{
    border: 1px solid red;
}
.addAddress_item{
    padding: 1rem;
    height: 5rem;
    border-bottom: 1px solid #ccc;
    input{
        width: 100%;
        height: 2rem;
        font-size: 1rem;
        text-indent: 1rem;
        background: #ccc;
        border-radius: .5rem;
    }
    p{
        height: 1rem;
        color:red;
        font-size:0.8rem
    }
}
.profile_info_exit{
    width: 100%;
    margin-top: 1rem;
}
</style>