<template>
  <div id="home">
    <mt-header title="选择城市">
    </mt-header>
    <section>
        <header>
          <span>当前定位城市:</span>
          <span class="tip">定位不准时,请在城市列表手动选择</span>
        </header>
        <router-link :to="`/city/${guessCityid}`">
          <p>{{guessCity}}</p>
        </router-link>
    </section>
    <section>
      <header>热门城市</header>
      <ul>
         <router-link tag="li" 
         v-for="(item,index) in hotCity" 
         :key="index"
         :to="`/city/${item.id}`">{{item.name}}</router-link>
      </ul>
    </section>
    <section>
      <mt-spinner type="fading-circle" v-if="!hasGetData"></mt-spinner>
      <div v-for="(item,index) in sortGroupCity" :key="index" v-else>
        <header>{{item}}</header>
        <ul class="ellipsis">
          <router-link tag="li" v-for="item in groupCity[item]" :key="item.id" class="ellipsis" :to="`/city/${item.id}`">{{item.name}}</router-link>
        </ul>     
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      hasGetData:false,
      guessCity:'',   //当前城市
      guessCityid:'', //当前城市id
      hotCity:[],     //热门城市
      groupCity:{},   //所有城市
    }
  },
  computed:{
    sortGroupCity(){
      return Object.keys(this.groupCity).sort()
    }
  },
  mounted(){
    //获取默认城市猜测
    this.axios.get('/v1/cities?type=guess').then(res => {
        this.guessCity = res.data.name;
        this.guessCityid = res.data.id
    });
    //获取热门城市
    this.axios.get('/v1/cities?type=hot').then(res =>{
        this.hotCity = res.data;
    });
    //获取所有城市
    this.axios.get('/v1/cities?type=group').then(res =>{
        this.groupCity = res.data;
        this.hasGetData = true
    })
  }
}
</script>
<style lang="less" scoped>
    section{
      padding: 1rem;
      margin-bottom: .5rem;
      border-bottom: 1px solid #ccc;
      background: #fff;
      header{
        display: flex;
        justify-content: space-between;
        font-size: .8rem;
        .tip{
          color: #666;
        };
        height: 3rem;
        line-height: 3rem;
      }
      a{
        display: block;
        padding: .5rem;
        background: #ccc;
        p{
          color: #26a2ff;
        }
      }
      ul{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3,1fr);
        grid-template-rows: repeat(3,auto);
        gap: 1rem;
        li{
          height: 2rem;
          line-height: 2rem;
          color: #26a2ff;
          text-align: center;
          border: 1px solid #26a2ff;
        }
      }
    }
</style>