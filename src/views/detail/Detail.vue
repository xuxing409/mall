<template>
  <div id="detail">
     <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="titlenavbar"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imgload="imgload"/>
      <detail-param-info :paramInfo="paramInfo" ref="param"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommends"/>
      <!-- <detail-recommend-info :commentInfo="recommends"/> -->
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailRecommendInfo from './childComps/DetailRecommendInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from '@/network/detail'

import { mapActions } from 'vuex'

// import Toast from 'components/common/toast/Toast'
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    GoodsList,
    DetailBottomBar,
    Scroll,
    BackTop,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends:[],
      isLoad: false,
      isTitleClick: false,
      isShowBackTop: false,
      tabBarRef: null,
    }
  },
  methods: {
    ...mapActions(['addCart']),
    async getDetail(iid){
      // 1.根据iid请求数据
      const res =  await getDetail(this.iid)
      console.log(res);
      const data = res.result;
      // 2.获取顶部信息
      this.topImages = data.itemInfo.topImages
      // 3.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 4.获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 5.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 6.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      
      // 7.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    },
    contentScroll(position) {
      // 功能1：是否展示 backtop
      this.isShowBackTop = (-position.y) > 1000;

      // 功能2：顶栏和滚动联动
      // 1.获取y值
      const positionY  = -position.y;
      
      // 2.对比
     
        if (positionY >= 0 && positionY < this.$refs.param.$el.offsetTop){
          
          if(this.$refs.titlenavbar.currentIndex !== 0){
            this.$refs.titlenavbar.currentIndex = 0;
          }

        }
        else if (positionY >= this.$refs.param.$el.offsetTop && positionY < this.$refs.comment.$el.offsetTop){
          
          if(this.$refs.titlenavbar.currentIndex !== 1){
            this.$refs.titlenavbar.currentIndex = 1;
          }

        }
        else if (positionY >= this.$refs.comment.$el.offsetTop && positionY < this.$refs.recommends.$el.offsetTop){

          if(this.$refs.titlenavbar.currentIndex !== 2){
            this.$refs.titlenavbar.currentIndex = 2;
          }

        }
        else if (positionY >= this.$refs.recommends.$el.offsetTop){
       
          if(this.$refs.titlenavbar.currentIndex !== 3){
            this.$refs.titlenavbar.currentIndex = 3;
          }

        }
      
    },
    // tabBar顶栏点击
    titleClick(index){
      console.log(index);
      // 图片没加载完时，保存点击的哪个tarbar，图片加载完毕后，再跳转到那个位置
      if(this.isTitleClick === false){
        switch(index){
          case 0: 
            break;
          case 1:
            this.tabBarRef = this.$refs.param
            break;
          case 2:
            this.tabBarRef = this.$refs.comment
            break;
          case 3:
            this.tabBarRef = this.$refs.recommends
            break;
        }
      }
      this.isTitleClick = true

      this.$nextTick(() => {
         this.$refs.scroll.refresh()
        switch(index){
          case 0: 
            this.$refs.scroll.scrollTo(0, 0, 600)
            break;
          case 1:
            this.$refs.scroll.scroll.scrollToElement(this.$refs.param.$el, 600,0,0);
            break;
          case 2:
            this.$refs.scroll.scroll.scrollToElement(this.$refs.comment.$el, 600, 0, 0);
            break;
          case 3:
            this.$refs.scroll.scroll.scrollToElement(this.$refs.recommends.$el, 600, 0, 0);
            break;
        }
      })
      
      // this.$nextTick(() => {
      //    this.$refs.scroll.refresh()
      //   switch(index){
      //     case 0: 
      //       this.$refs.scroll.scrollTo(0, 0, 1000)
      //       break;
      //     case 1:
      //       this.$refs.scroll.scroll.scrollToElement(this.$refs.param.$el,1000,0,0);
      //       this.tabBarRef = this.$refs.param
      //       break;
      //     case 2:
      //       this.$refs.scroll.scroll.scrollToElement(this.$refs.comment.$el, 1000, 0, 0);
      //       this.tabBarRef = this.$refs.comment
      //       break;
      //     case 3:
      //       this.$refs.scroll.scroll.scrollToElement(this.$refs.recommends.$el, 1000, 0, 0);
      //       this.tabBarRef = this.$refs.recommends
      //       break;
      //   }
      // })   
    },
    imgload(){
      console.log('imgload');
      
      this.isLoad = true;
      console.log(this.isTitleClick);

      if(this.isTitleClick === true){
        console.log(this.tabBarRef);
        this.$refs.scroll.refresh()
        this.$refs.scroll.scroll.scrollToElement(this.tabBarRef.$el, 1000, 0, 0)
        console.log('isTitleClick');
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 700)
    },
    addToCart() {
      // 1. 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.newPrice = this.goods.realPrice;
      product.iid = this.iid;

      // 2.添加到购物车
      // this.$store.commit('addCart', product)
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })

      // mapActions方式
       this.addCart(product).then(res => {
        console.log(res);

        this.$toast.show(res)
      })
    }
  },
  created() {
    //1. 获取传入的iid
    this.iid = this.$route.params.iid

    //2. 根据iid请求详情数据
    this.getDetail(this.iid);

    //3. 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

  
  },
  mounted(){
    //1. 获取navBarTitle的长度
    // this.titleNavbarLength =  this.$refs.titlenavbar.titles.length
  }
}
</script>

<style scoped>
 #detail {
   position: relative;
   z-index: 9;
   background-color: #fff;
   height: 100vh;
   overflow:hidden
 }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

 .content {
   height: calc(100% - 93px);
 }

</style>