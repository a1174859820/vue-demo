<template>
    <div id="msite">        
      <mt-header :title="msiteTitle">
         <router-link to="/search" slot="left">
            <mt-button icon="search">搜索</mt-button>
         </router-link>
         
         <mt-button slot="right">
            <router-link to="/home">切换城市</router-link>
         </mt-button>
      </mt-header>
      <nav>
          <food-category :geohash="geohash"></food-category>
      </nav>
      <footer-guide></footer-guide>
    </div>
</template>
<script>
import foodCategory from './components/foodCategory'
import {mapMutations} from 'vuex'
import footerGuide from '../../components/footerGuide'
import { getStore } from '../../config/mUtils'
export default {
    data(){
        return {
            geohash:'',
            msiteTitle:'' 
        }
    },
    methods:{
        ...mapMutations(['RECORD_ADDRESS']),
        async initData(){
            //获取位置信息 
            await this.axios.get(`/v2/pois/${this.geohash}`).then(res =>{
                this.RECORD_ADDRESS(res.data);
                this.msiteTitle = res.data.name;
            })
        }
    },
    created(){
        this.geohash = getStore('geohash');
        this.initData()
    },
    components:{
        foodCategory,
        footerGuide
    }
}
</script>
<style lang="less" scoped>
    nav{
        margin-bottom: 3rem;
    }
</style>