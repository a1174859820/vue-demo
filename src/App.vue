<template>
  <div id="app">
      <transition name="router-fade" mode="out-in">
          <router-view></router-view>
      </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
    }
  },
  components:{
    
  }
}
</script>

<style lang="less">
    @import './style/reset';
    @import './style/mint';
    .router-fade-enter-active,.router-fade-leave-active{
     transition: opacity .3s;
    }
    .router-fade-enter,.router-fade-leave-active{
      opacity: 0;
    }
</style>
