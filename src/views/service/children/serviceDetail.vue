<template>
    <div id="serviceDetail">
        <mt-header :title="question.title">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)"></mt-button>
            </router-link>
        </mt-header>
        <section v-html="question.content"></section>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{

        }
    },
    computed:{
        ...mapState(['question'])
    }
}
</script>
<style lang="less" scoped>
#serviceDetail{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 202;
    overflow: scroll;
    section{
        padding: 1rem;
        font-size: 1.2rem;
        font-family: Helvetica Neue,Tahoma,Arial;
    }
}
</style>