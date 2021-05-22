<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    
    <tab-control :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  ref="tabControl1"
                  v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" 
    :probe-type="3"  
    :pull-up-load="true" 
    @scroll="contentScroll" 
    @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <recommend-view :recommends="recommends"/>
        <feature-View/>
        <tab-control :titles="['流行','新款','精选']"
                     @tabClick="tabClick"
                     ref="tabControl2"/>
        <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
   
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import Scroll from '@/components/common/scroll/Scroll'
import BackTop from '@/components/content/backTop/BackTop'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'



import { getHomeMultidata, getHomeGoods } from '@/network/home'



export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return {
      banners:[],
      recommends:[],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,

    }
  },
  created(){
    this.getHomeMultidata();

    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  mounted(){
    
  },
  methods:{
    contentScroll(position) {
      // 1、判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000;

      // 2、决定tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop ;
    },
    loadMore() {
      console.log('上拉加载更多');
      this.getHomeGoods(this.currentType);
    },
    /*
    * 网络请求相关方法
    */
    async getHomeMultidata() {
      const res = await getHomeMultidata()
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    },
    async getHomeGoods(type) {
      const page = this.goods[type].page + 1
      const goodsRes =  await getHomeGoods(type, page)
      this.goods[type].list.push(...goodsRes.data.list)
      this.goods[type].page += 1

      this.$refs.scroll.finishPullUp()
      this.$nextTick(() => {
         this.$refs.scroll.refresh()
      }
     )
    },
    tabClick(index){
      console.log(index);
      switch(index) {
        case 0: 
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 700)
    },
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      console.log(this.tabOffsetTop);
    }
  }
}
</script>

<style scoped>
  #home {
    height: 100vh;
    /* position: relative; */
  }
  .home-nav{
    background-color: var(--color-tint);
    color: white;

    /* (比较好的方案)使用原生滚动时，为了不让导航跟随一起滚动 */
    /* position: sticky;
    position: -webkit-sticky;
    top: 0;
    z-index: 9;  */

    /* （老师的不完善解决方案）
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    */
  }
 
  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    height: calc(100vh - 93px);
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>