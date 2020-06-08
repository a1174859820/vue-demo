<template>
    <div id="shoplist" v-if="hasGetData">
        <router-link class="shoplist_container" 
        :to="{path:'shop',query:{geohash,shopId:item.id}}" 
        v-for="(item,index) in shopListAddr" :key="index" tag="li">
            <hgroup class="shop_detail">
                <header>
                    <h3 class="ellipsis">
                        <strong>{{item.name}}</strong>
                    </h3>
                    <div>
                        <span v-for="(i,index) in item.supports" :key="index">{{i.icon_name}}</span>
                    </div>
                </header>
                <section class="ellipsis">
                    <span>评分:{{item.rating}}</span>
                    <p>
                        <span class="deliveryMode" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
                        <span>月售{{item.recent_order_num}}单</span>
                    </p>
                </section>
                <section class="shop_detail_order ellipsis">
                    <span>{{item.float_minimum_order_amount}}起送/配送费约{{item.float_delivery_fee}}元</span>
                    <span>{{item.distance}}/{{item.order_lead_time}}</span>
                </section>
            </hgroup>
        </router-link>
    </div>
</template>
<script>
import{mapState} from 'vuex'
export default {
    data(){
        return {            
            shopListAddr:[],//店铺列表数据
            offset:0,
            hasGetData:false
        }
    },
    computed:{
        ...mapState(['latitude','longitude'])
    },
    async mounted(){
        await this.getShopListData(this.latitude,this.longitude)
    },
    props: ['restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds','geohash','confirmSieve'],
    watch:{
        //监听父级restaurantCategoryIds变化,重新渲染商店列表数据
        async restaurantCategoryIds(){
            await this.getShopListData(this.latitude, this.longitude, this.offset, '', this.restaurantCategoryIds, this.sortByType, this.deliveryMode, this.supportIds)
        },
        //监听父级sortByType变化,重新渲染商店列表数据
        async sortByType(){
            await this.getShopListData(this.latitude, this.longitude, this.offset, '', this.restaurantCategoryIds, this.sortByType, this.deliveryMode, this.supportIds)
        },
        //监听父级delivery_mode和support_ids变化,重新渲染商店列表数据
        async confirmSieve(){
            if(this.confirmSieve){
                await this.getShopListData(this.latitude, this.longitude, this.offset, '', this.restaurantCategoryIds, this.sortByType, this.deliveryMode, this.supportIds)
            }
        }
    },
    methods:{
         //获取商店列表,接口参数调整
         async getShopListData(latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []){
            this.hasGetData = false;
            let supportStr = '';
            support_ids.forEach(item => {
                if (item.status) {
                    supportStr += '&support_ids[]=' + item.id;
                }
            });
            let data = {
                latitude,
                longitude,
                offset,
                limit: '20',
                'extras[]': 'activities',
                keyword: '',
                restaurant_category_id,
                'restaurant_category_ids[]': restaurant_category_ids,
                order_by,
                'delivery_mode[]': delivery_mode + supportStr
            };
            await this.axios.get('/shopping/restaurants',{
                params:data
            }).then(res=>{
                this.shopListAddr = res.data;
                this.hasGetData = true
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .shoplist_container{
        padding: 1rem;
        border-bottom: 1px solid #26a2ff;
        .shop_detail{
            .deliveryMode{
                margin-right: 1rem;
                color: #26a2ff;
            }
            .shop_detail_order{
                span{
                    color: #666;
                }
            }
            header{
                display: flex;
                justify-content: space-between;
                div{
                    span{
                        color: #666;
                        font-size: 0.8rem;
                        border: 1px solid #666;
                    }
                }
                strong{
                    color: #26a2ff;
                }
            }
            section {
                margin-top: 0.6rem;
                color: #666;
                display: flex;
                justify-content: space-between;
                font-size: 0.8rem;
            }
        }
    }
</style>
