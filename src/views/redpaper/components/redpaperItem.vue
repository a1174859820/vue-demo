<template>
    <div id="redpaperItem">       
        <section class="container">
            <li v-for="(item,index) in redpaperList" :key="index" class="redpaper_item">
                <header>
                    <span>{{item.name}}</span>
                </header>
                <nav>
                    <p>{{item.description_map.online_paid_only}}</p>
                    <p>{{item.description_map.phone}}</p>
                    <p>{{item.description_map.sum_condition}}</p>
                </nav>               
                <footer>
                    {{item.end_date}}到期
                </footer>
            </li>
        </section>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props:['redpaperList']
}
</script>
<style lang="less" scoped>
    .container{
        margin: 1rem;
        li{
            border: 1px solid #ccc;
            margin-top: 1rem;
            padding: 1rem;
            header{
                font-size: 1.2rem;
            }
            nav{
                p{
                    color: #666;
                }
            }
            footer{
                text-align: right;
                color: #666;
            }
        }
    }
</style>