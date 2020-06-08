<template>
    <div id="timer" v-if="timeRemain>0">
        {{timeRemain | timeToDate}}
    </div>
</template>
<script>
export default {
    data(){
        return {
            timeRemain:this.time,      
        }
    },
    mounted(){
        this.remainingTime();
    },
    props:['time'],
    methods:{
        remainingTime(){
            clearInterval(this.timer);
            this.timer = setInterval(()=>{
                this.timeRemain --;
                if(this.timeRemain<=0){
                    clearInterval(this.timer);
                    this.timer = null
                }
            },1000)
        }
    }, 
    filters:{
        timeToDate(val){
            let hour = parseInt(val/3600);
            let min = parseInt(val/60);
            let sec = parseInt(val%60);
            if(min<10){
                min = '0' + min
            }
            if(sec<10){
                sec = '0' +sec
            }
            if(hour<10){
                hour = '0' + hour
            }
            return hour +':'+ min +':'+ sec
        }
    },
    computed:{

    }
}
</script>