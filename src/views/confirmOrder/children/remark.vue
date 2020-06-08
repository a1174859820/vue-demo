<template>
    <div id="remark">       
        <mt-header title="订单备注">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)"></mt-button>
            </router-link>
        </mt-header>

        <div class="remark_container">
            <header>快速备注</header>
            <section>
                <li v-for="(item,index) in remarkLabelList" :key="index">
                    <span v-for="(i,ind) in item" :key="ind" @click="addToRemark(i)">{{i}}</span>
                </li>
            </section>
        </div>

        <div class="remark_container">
            <header>其他备注</header>
            <div class="remark_label">
                <span v-for="(item,index) in remarkLabel" :key="index">
                    {{item}}
                    <a @click="deleteRemark(index)">x</a>
                </span>
            </div>
            <textarea placeholder="请输入备注内容(可不填)" v-model="remarkText">
            </textarea>
            <mt-button type="primary" @click="confirmRemark">确定</mt-button>
        </div>
    </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
    data(){
        return{
            id:'',
            sig:'',
            remarkLabelList:[],
            remarkLabel:[],
            remarkText:''
        }
    },
    computed:{
        remarks(){
            return {
                label:this.remarkLabel,
                text:this.remarkText
            }
        }
    },
    created(){
        this.id = this.$route.query.id;
        this.sig = this.$route.query.sig;
    },
    mounted(){
        this.initData();
    },
    methods:{
        ...mapMutations(['SAVE_REMARKS']),
        addToRemark(item){
            if(this.remarkLabel.indexOf(item)==-1){
                this.remarkLabel.push(item)
            }
        },
        deleteRemark(index){
            this.remarkLabel.splice(index,1)
        },
        async initData(){
            await this.axios.get(`/v1/carts/${this.id}/remarks`,{
                params:{
                    sig:this.sig
                }
            }).then(res=>{
                this.remarkLabelList = res.data.remarks;
            })
        },
        confirmRemark(){
            this.SAVE_REMARKS(this.remarks)
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less" scoped>
    #remark{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f2f2f2;
        z-index: 202;
    } 
    .label{            
        border: 1px solid #26a2ff;
        line-height: 2rem;
        padding: .2rem .3rem;
        border-radius: .2rem;
    }
    .remark_container{
        background: #fff;
        padding: 1rem;
        header{
            height: 3rem;
            line-height: 3rem;
        }   
        section{
            display: flex;
            flex-wrap: wrap;
            li{
                margin:.5rem;
                span{
                    .label
                } 
            }
        }
        .remark_label{
            overflow: hidden;
            span{
                .label;
                margin: .2rem;
                float: left;
                a{
                    color: #26a2ff;
                }
            } 
        }
        textarea{
            border: 1px solid #26a2ff;
            width: 100%;
            margin-top: 1rem;
            min-height: 8rem;
            padding: 1rem;
            background: #f9f9f9;
        }    
        .mint-button{
            width: 100%;
            margin-top: 1rem;
        }
    }
</style>